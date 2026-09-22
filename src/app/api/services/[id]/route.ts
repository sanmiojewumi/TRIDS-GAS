import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const service = await db.service.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.name && { slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }),
        ...(body.category && { category: body.category }),
        ...(body.description && { description: body.description }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.active !== undefined && { active: Boolean(body.active) }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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
    await db.service.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
