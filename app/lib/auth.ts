import { cookies } from 'next/headers';
import crypto from 'node:crypto';

export const ADMIN_COOKIE = 'admin_session';

// The cookie stores a hash of the admin password, not the password itself.
// An attacker can't forge it without knowing ADMIN_PASSWORD, and we never
// expose the raw password to the client.
function tokenFor(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Returns the session token to store if the password is correct, else null.
export function verifyPassword(input: string): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !input) return null;
  if (!safeEqual(input, pw)) return null;
  return tokenFor(pw);
}

export async function isAuthenticated(): Promise<boolean> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, tokenFor(pw));
}
