import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  try {
    const isAuth = await verifyAdminAuth();
    const slides = await db.heroSlide.findMany({
      where: isAuth ? undefined : { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ slides });
  } catch (error: any) {
    console.error('Error fetching hero slides:', error);
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
    const { title, category, description, image, badge, techSpec, order, active } = body;

    if (!title || !image) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const slide = await db.heroSlide.create({
      data: {
        title,
        category: category || 'BOILER INSTALLATION',
        description: description || '',
        image,
        badge: badge || 'Boiler Service',
        techSpec: techSpec || 'Gas Safe Certified',
        order: order !== undefined ? Number(order) : 1,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json({ success: true, slide }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
