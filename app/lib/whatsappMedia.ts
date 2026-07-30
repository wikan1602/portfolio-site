import { uploadToBlob, extFromMime } from "@/app/lib/blob";

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Resolves a WhatsApp media id -> Meta's short-lived download URL -> raw bytes.
// Both steps require the access token. Returns null on any failure rather than
// throwing, since callers treat archival as best-effort.
async function fetchMetaMediaBytes(
  mediaId: string
): Promise<{ bytes: ArrayBuffer; contentType: string } | null> {
  if (!WA_ACCESS_TOKEN) return null;
  const auth = { Authorization: `Bearer ${WA_ACCESS_TOKEN}` };

  const metaRes = await fetch(`https://graph.facebook.com/v20.0/${mediaId}`, { headers: auth });
  if (!metaRes.ok) return null;
  const meta = await metaRes.json();
  if (!meta?.url) return null;

  const fileRes = await fetch(meta.url, { headers: auth });
  if (!fileRes.ok) return null;

  const contentType = meta.mime_type || fileRes.headers.get("content-type") || "application/octet-stream";
  const bytes = await fileRes.arrayBuffer();
  return { bytes, contentType };
}

// Downloads an inbound media item from Meta (while its media_id is still
// valid — Meta only guarantees ~30 days) and archives it permanently to
// Vercel Blob. Returns the permanent URL, or null if archival failed for any
// reason (network issue, expired media, missing token) — callers must
// tolerate null and fall back to storing just the media_id.
export async function archiveInboundMedia(mediaId: string): Promise<string | null> {
  const fetched = await fetchMetaMediaBytes(mediaId);
  if (!fetched) return null;
  const ext = extFromMime(fetched.contentType);
  return uploadToBlob(fetched.bytes, fetched.contentType, ext);
}
