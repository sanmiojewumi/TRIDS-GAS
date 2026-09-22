import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { cleanText, isSafeMediaUrl } from '@/lib/security';

export async function GET() {
  try {
    const isAuth = await verifyAdminAuth();
    const media = await db.mediaItem.findMany({
      where: isAuth ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ media });
  } catch (error: any) {
    console.error('Error fetching gallery media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, type, url, thumbnailUrl, category, description, location, featured } = body;
    const safeTitle = cleanText(title, 160);
    const safeUrl = cleanText(url, 500);
    const safeThumbnail = cleanText(thumbnailUrl, 500);

    if (
      !safeTitle ||
      !safeUrl ||
      !isSafeMediaUrl(safeUrl) ||
      (safeThumbnail && !isSafeMediaUrl(safeThumbnail))
    ) {
      return NextResponse.json({ error: 'A title and valid HTTPS or local media URL are required' }, { status: 400 });
    }

    const item = await db.mediaItem.create({
      data: {
        title: safeTitle,
        type: type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
        url: safeUrl,
        thumbnailUrl: safeThumbnail || null,
        category: cleanText(category, 80) || 'BOILER',
        description: cleanText(description, 3000) || null,
        location: cleanText(location, 120) || 'Crewe & Cheshire',
        published: true,
        featured: featured !== undefined ? Boolean(featured) : true,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gallery media item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
