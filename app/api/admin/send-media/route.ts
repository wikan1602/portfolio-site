import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';
import { getPhoneNumberId, ensureChatHistoryColumns } from '@/app/lib/conversation';

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const MAX_BYTES = 16 * 1024 * 1024; // 16MB — safe under WhatsApp's per-type limits

// Map a MIME type to the WhatsApp message type. Anything not a plain image/
// video/audio is sent as a document (safe fallback, avoids format rejections).
function waTypeFor(mime: string): 'image' | 'video' | 'audio' | 'document' {
  if (mime === 'image/jpeg' || mime === 'image/png') return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return 'document';
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!WA_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'WHATSAPP_ACCESS_TOKEN is not set' }, { status: 500 });
  }

  const form = await request.formData().catch(() => null);
  const phone = form?.get('phone');
  const file = form?.get('file');
  const caption = typeof form?.get('caption') === 'string' ? (form.get('caption') as string).trim() : '';
  const replyToRaw = form?.get('replyTo');
  const replyTo = typeof replyToRaw === 'string' && replyToRaw ? replyToRaw : null;

  if (typeof phone !== 'string' || !phone || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing phone or file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 16MB).' }, { status: 400 });
  }

  const pool = getPool();
  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID || (await getPhoneNumberId(pool, phone));
  if (!phoneNumberId) {
    return NextResponse.json(
      { error: 'No phone_number_id known yet for this conversation.' },
      { status: 400 }
    );
  }

  const auth = { Authorization: `Bearer ${WA_ACCESS_TOKEN}` };

  // 1. Upload the file to Meta to obtain a media id.
  const uploadForm = new FormData();
  uploadForm.append('messaging_product', 'whatsapp');
  uploadForm.append('type', file.type || 'application/octet-stream');
  uploadForm.append('file', file, file.name || 'upload');

  const upRes = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/media`, {
    method: 'POST',
    headers: auth,
    body: uploadForm,
  });
  const upData = await upRes.json().catch(() => ({}));
  if (!upRes.ok || !upData?.id) {
    const detail = upData?.error?.message || 'Media upload failed.';
    return NextResponse.json({ error: detail }, { status: 502 });
  }
  const mediaId: string = upData.id;
  const type = waTypeFor(file.type || '');

  // 2. Send the media message.
  const payload: Record<string, unknown> = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type,
    [type]: {
      id: mediaId,
      ...(caption && type !== 'audio' ? { caption } : {}),
      ...(type === 'document' && file.name ? { filename: file.name } : {}),
    },
    ...(replyTo ? { context: { message_id: replyTo } } : {}),
  };

  const sendRes = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const sendData = await sendRes.json().catch(() => ({}));
  if (!sendRes.ok) {
    const detail = sendData?.error?.message || 'WhatsApp API rejected the media.';
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  // 3. Log it so it shows in the thread (and stays in bot context if handed back).
  const outgoingId: string | null = sendData?.messages?.[0]?.id ?? null;
  try {
    await ensureChatHistoryColumns(pool);
    await pool.query(
      'INSERT INTO wa_chat_history (phone_number, role, content, media_type, media_id, wa_message_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [phone, 'assistant', caption || `[${type}]`, type, mediaId, outgoingId]
    );
  } catch {
    // Message was sent; a logging failure shouldn't fail the request.
  }

  return NextResponse.json({ ok: true });
}
