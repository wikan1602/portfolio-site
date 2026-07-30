import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Proxies media so the admin console can display it, keeping the auth check
// in front of the actual bytes rather than exposing a raw storage URL.
//
// Prefers our permanent Vercel Blob archive (fast, always available). Falls
// back to live Meta resolution for older rows saved before archiving existed
// — those may already be expired, since Meta only guarantees media_id
// resolves for ~30 days.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;

  try {
    const pool = getPool();
    const r = await pool.query(
      'SELECT media_url FROM wa_chat_history WHERE media_id = $1 AND media_url IS NOT NULL LIMIT 1',
      [id]
    );
    const blobUrl = r.rows[0]?.media_url as string | undefined;
    if (blobUrl) {
      const blobRes = await fetch(blobUrl);
      if (blobRes.ok) {
        const contentType = blobRes.headers.get('content-type') || 'application/octet-stream';
        const buffer = await blobRes.arrayBuffer();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'private, max-age=31536000, immutable',
          },
        });
      }
    }
  } catch {
    // DB unavailable or query failed — fall through to the Meta path below.
  }

  // Legacy fallback: live Meta resolution.
  if (!WA_ACCESS_TOKEN) {
    return new NextResponse('WHATSAPP_ACCESS_TOKEN is not set', { status: 500 });
  }
  const auth = { Authorization: `Bearer ${WA_ACCESS_TOKEN}` };

  const metaRes = await fetch(`https://graph.facebook.com/v20.0/${id}`, { headers: auth });
  if (!metaRes.ok) {
    return new NextResponse('Media not found', { status: 404 });
  }
  const meta = await metaRes.json();
  if (!meta?.url) {
    return new NextResponse('Media URL unavailable', { status: 404 });
  }

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
