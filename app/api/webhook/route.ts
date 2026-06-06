import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. Ambil query parameter yang dikirim oleh Meta
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // 2. Tentukan token rahasia bebas pilihanmu
  const MY_VERIFY_TOKEN = "One0969";

  // 3. Proses validasi handshake dari Meta
  if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
    // Kembalikan hub.challenge dalam bentuk plain text dengan status 200 OK
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Jika token salah atau tidak sesuai
  return new NextResponse('Verification failed', { status: 403 });
}