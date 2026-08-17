import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { sendBookingEmailNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, email, postcode, service, date, time, notes } = body;

    if (!customerName || !phone || !email || !postcode || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check double booking
    const existing = await db.booking.findFirst({
      where: {
        date,
        time,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `The time slot ${time} on ${date} is already booked. Please select another slot.` },
        { status: 409 }
      );
    }

    const booking = await db.booking.create({
      data: {
        customerName,
        phone,
        email,
        postcode,
        service,
        date,
        time,
        notes: notes || null,
        status: 'CONFIRMED',
      },
    });

    // Send instant notification email to official inbox tridsgasandplumbing@gmail.com
    await sendBookingEmailNotification({
      customerName,
      phone,
      email,
      postcode,
      service,
      date,
      time,
      notes,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
