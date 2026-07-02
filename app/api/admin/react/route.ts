import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';
import { getPhoneNumberId } from '@/app/lib/conversation';

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Sends an emoji reaction to a specific message. Pass emoji: "" to remove one.
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!WA_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'WHATSAPP_ACCESS_TOKEN is not set' }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const messageId = typeof body.messageId === 'string' ? body.messageId : '';
  const emoji = typeof body.emoji === 'string' ? body.emoji : '';

  if (!phone || !messageId) {
    return NextResponse.json({ error: 'Missing phone or messageId' }, { status: 400 });
  }

  const pool = getPool();
  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID || (await getPhoneNumberId(pool, phone));
  if (!phoneNumberId) {
    return NextResponse.json({ error: 'No phone_number_id known for this conversation.' }, { status: 400 });
  }

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
      type: 'reaction',
      reaction: { message_id: messageId, emoji },
    }),
  });

  const waData = await waRes.json().catch(() => ({}));
  if (!waRes.ok) {
    const detail = waData?.error?.message || 'WhatsApp API rejected the reaction.';
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
