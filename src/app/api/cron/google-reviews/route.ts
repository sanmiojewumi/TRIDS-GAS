import { NextResponse } from 'next/server';
import { checkGoogleReviews } from '@/lib/google-reviews';
import { notifyIndexNow } from '@/lib/indexnow';
import { isAuthorizedCronRequest } from '@/lib/security';
import { absoluteUrl, canonicalPublicPaths } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await checkGoogleReviews();
    await notifyIndexNow(
      canonicalPublicPaths().map((path) => absoluteUrl(path)),
      { force: true },
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('Google review check failed:', error);
    return NextResponse.json({ error: 'Google review check failed' }, { status: 500 });
  }
}
