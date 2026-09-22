import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { cleanText } from '@/lib/security';
import { isValidAvailabilityTime } from '@/lib/availability';

const statuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

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
    const date = cleanText(body.date, 10);
    const time = cleanText(body.time, 5);

    if (!statuses.includes(status) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !isValidAvailabilityTime(time)) {
      return NextResponse.json({ error: 'Enter a valid status, date and time' }, { status: 400 });
    }

    const conflicting = await db.booking.findFirst({
      where: {
        id: { not: id },
        date,
        time,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      select: { id: true },
    });
    if (conflicting && ['PENDING', 'CONFIRMED'].includes(status)) {
      return NextResponse.json({ error: 'Another active booking already uses this time' }, { status: 409 });
    }

    const booking = await db.booking.update({
      where: { id },
      data: { date, time, status },
    });
    return NextResponse.json({ success: true, booking });
  } catch {
    return NextResponse.json({ error: 'Could not update booking' }, { status: 500 });
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
    await db.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Could not remove booking' }, { status: 500 });
  }
}
