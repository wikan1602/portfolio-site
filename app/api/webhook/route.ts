import { NextRequest, NextResponse } from 'next/server';

// 1. HANDSHAKE VERIFICATION (Fungsi GET yang sudah berhasil tadi)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const MY_VERIFY_TOKEN = "One0969";

  if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new NextResponse('Verification failed', { status: 403 });
}

// 2. RECEIVE MESSAGES (Fungsi POST Baru untuk Menangkap Chat Masuk)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log isi payload dari Meta agar bisa kita intip di Vercel Logs
    console.log('--- WhatsApp Webhook Payload Masuk ---');
    console.log(JSON.stringify(body, null, 2));
    console.log('--------------------------------------');

    // PENTING: Selalu kirim status 200 OK ke Meta secepat mungkin
    // Jika tidak merespon 200, Meta akan terus-menerus mengirim ulang pesan yang sama
    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menerima webhook:', error);
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}