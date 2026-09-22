import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.mediaItem.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Media item deleted' });
  } catch (error: any) {
    console.error('Error deleting media item:', error);
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 });
  }
}
