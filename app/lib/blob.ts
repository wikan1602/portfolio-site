import { put } from "@vercel/blob";

// Vercel Blob's public URLs include a long random suffix — effectively
// unguessable, but NOT auth-gated on their own. We still serve media to the
// browser through our authenticated /api/admin/media/[id] proxy rather than
// exposing these URLs directly, so the auth check stays in place.
export async function uploadToBlob(
  bytes: ArrayBuffer,
  contentType: string,
  ext: string
): Promise<string> {
  const blob = await put(`wa-media/${Date.now()}.${ext}`, bytes, {
    access: "public",
    contentType,
    addRandomSuffix: true,
  });
  return blob.url;
}

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/3gpp": "3gp",
  "audio/ogg": "ogg",
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "application/pdf": "pdf",
};

export function extFromMime(mime: string): string {
  return EXT_BY_MIME[mime] ?? "bin";
}
