import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, ADMIN_COOKIE } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const token = verifyPassword(typeof body.password === 'string' ? body.password : '');

  if (!token) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ ok: true });
}
