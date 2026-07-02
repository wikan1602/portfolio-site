import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Proxies WhatsApp media so the admin console can display it. Meta media URLs
// require the access token (can't be used directly in <img src>), so we resolve
// the media id -> temporary URL -> bytes on the server and stream it back.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  if (!WA_ACCESS_TOKEN) {
    return new NextResponse('WHATSAPP_ACCESS_TOKEN is not set', { status: 500 });
  }

  const { id } = await params;
  const auth = { Authorization: `Bearer ${WA_ACCESS_TOKEN}` };

  // 1. Resolve media id -> short-lived download URL + mime type.
  const metaRes = await fetch(`https://graph.facebook.com/v20.0/${id}`, { headers: auth });
  if (!metaRes.ok) {
    return new NextResponse('Media not found', { status: 404 });
  }
  const meta = await metaRes.json();
  if (!meta?.url) {
    return new NextResponse('Media URL unavailable', { status: 404 });
  }

  // 2. Download the actual bytes (also requires the token).
  const fileRes = await fetch(meta.url, { headers: auth });
  if (!fileRes.ok) {
    return new NextResponse('Failed to fetch media', { status: 502 });
  }

  const contentType =
    meta.mime_type || fileRes.headers.get('content-type') || 'application/octet-stream';
  const buffer = await fileRes.arrayBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
