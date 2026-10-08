import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { syncGoogleReviews } from '@/lib/google-reviews';

export async function POST() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await syncGoogleReviews({ notifyNew: false, force: true });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Admin Google review import failed:', error);
    return NextResponse.json({ error: 'Could not import Google reviews' }, { status: 500 });
  }
}
