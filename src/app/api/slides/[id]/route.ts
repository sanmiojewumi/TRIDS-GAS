import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    const slide = await db.heroSlide.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.category && { category: body.category }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.image && { image: body.image }),
        ...(body.badge && { badge: body.badge }),
        ...(body.techSpec !== undefined && { techSpec: body.techSpec }),
        ...(body.order !== undefined && { order: Number(body.order) }),
        ...(body.active !== undefined && { active: Boolean(body.active) }),
      },
    });

    return NextResponse.json({ success: true, slide });
  } catch (error: any) {
    console.error('Error updating slide:', error);
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    await db.heroSlide.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Slide deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting slide:', error);
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 });
  }
}
