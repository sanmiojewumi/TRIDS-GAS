import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { cleanText } from '@/lib/security';

const statuses = ['NEW', 'CONTACTED', 'QUOTED', 'BOOKED', 'COMPLETED', 'ARCHIVED'];

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const status = cleanText(body.status, 20).toUpperCase();
    if (!statuses.includes(status)) {
      return NextResponse.json({ error: 'Select a valid enquiry status' }, { status: 400 });
    }

    const enquiry = await db.enquiry.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, enquiry });
  } catch {
    return NextResponse.json({ error: 'Could not update enquiry' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.enquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Could not remove enquiry' }, { status: 500 });
  }
}
