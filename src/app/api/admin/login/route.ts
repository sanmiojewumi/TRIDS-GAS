import { NextResponse } from 'next/server';
import { loginAdmin } from '@/lib/auth';
import { checkRateLimit, cleanText } from '@/lib/security';

export async function POST(req: Request) {
  const limit = checkRateLimit(req, 'admin-login', {
    windowMs: 15 * 60 * 1000,
    max: 5,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    const email = cleanText(body.email, 254).toLowerCase();
    const password = cleanText(body.password, 256);
    if (!email || !password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const result = await loginAdmin(email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
