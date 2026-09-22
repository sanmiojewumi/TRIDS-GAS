import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';

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

    if (!title || !url) {
      return NextResponse.json({ error: 'Title and media URL are required' }, { status: 400 });
    }

    const item = await db.mediaItem.create({
      data: {
        title,
        type: type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
        url,
        thumbnailUrl: thumbnailUrl || null,
        category: category || 'BOILER',
        description: description || null,
        location: location || 'Crewe & Cheshire',
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
