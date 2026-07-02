import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';
import { getPool } from '@/app/lib/db';
import { setMode } from '@/app/lib/conversation';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const mode = body.mode === 'human' ? 'human' : 'bot';

  if (!phone) {
    return NextResponse.json({ error: 'Missing phone' }, { status: 400 });
  }

  try {
    await setMode(getPool(), phone, mode);
    return NextResponse.json({ ok: true, mode });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Failed to set mode';
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}
