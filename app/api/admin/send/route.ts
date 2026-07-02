import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';
import { getPhoneNumberId } from '@/app/lib/conversation';

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!phone || !message) {
    return NextResponse.json({ error: 'Missing phone or message' }, { status: 400 });
  }
  if (!WA_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'WHATSAPP_ACCESS_TOKEN is not set' }, { status: 500 });
  }

  const pool = getPool();

  // phone_number_id: prefer a fixed env value, else the one captured from inbound.
  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID || (await getPhoneNumberId(pool, phone));
  if (!phoneNumberId) {
    return NextResponse.json(
      { error: 'No phone_number_id known yet for this conversation. Set WHATSAPP_PHONE_NUMBER_ID or wait for an inbound message.' },
      { status: 400 }
    );
  }

  // Send via WhatsApp Cloud API. Free-form text only works within the 24-hour
  // customer service window; outside it Meta rejects with an error we surface.
  const waRes = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'text',
      text: { preview_url: false, body: message },
    }),
  });

  const waData = await waRes.json().catch(() => ({}));
  if (!waRes.ok) {
    const detail = waData?.error?.message || 'WhatsApp API rejected the message.';
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  // Log the human reply so it shows in history and stays in the bot's context
  // (role 'assistant') if the conversation is handed back to the bot later.
  try {
    await pool.query(
      'INSERT INTO wa_chat_history (phone_number, role, content) VALUES ($1, $2, $3)',
      [phone, 'assistant', message]
    );
  } catch {
    // Message was sent successfully; a logging failure shouldn't fail the request.
  }

  return NextResponse.json({ ok: true });
}
