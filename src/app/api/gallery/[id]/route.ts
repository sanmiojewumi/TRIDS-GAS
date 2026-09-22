import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { cleanText, isSafeMediaUrl } from '@/lib/security';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const title = cleanText(body.title, 160);
    const url = cleanText(body.url, 500);
    const thumbnailUrl = cleanText(body.thumbnailUrl, 500);

    if (!title || !url || !isSafeMediaUrl(url) || (thumbnailUrl && !isSafeMediaUrl(thumbnailUrl))) {
      return NextResponse.json({ error: 'A title and valid HTTPS or local media URL are required' }, { status: 400 });
    }

    const item = await db.mediaItem.update({
      where: { id },
      data: {
        title,
        type: body.type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
        url,
        thumbnailUrl: thumbnailUrl || null,
        category: cleanText(body.category, 80) || 'BOILER',
        description: cleanText(body.description, 3000) || null,
        location: cleanText(body.location, 120) || null,
        featured: Boolean(body.featured),
        published: body.published !== false,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating media item:', error);
    return NextResponse.json({ error: 'Failed to update media item' }, { status: 500 });
  }
}

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
