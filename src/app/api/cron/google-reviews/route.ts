import { NextResponse } from 'next/server';
import { checkGoogleReviews } from '@/lib/google-reviews';
import { isAuthorizedCronRequest } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await checkGoogleReviews();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('Google review check failed:', error);
    return NextResponse.json({ error: 'Google review check failed' }, { status: 500 });
  }
}
