import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { sendBookingEmailNotification } from '@/lib/email';
import {
  checkRateLimit,
  cleanText,
  isValidEmail,
  isValidPhone,
  isValidPostcode,
} from '@/lib/security';
import { getAvailableSlots } from '@/lib/availability';

export async function POST(req: Request) {
  const limit = checkRateLimit(req, 'booking', { windowMs: 60 * 60 * 1000, max: 3 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many booking requests. Please call us for assistance.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const customerName = cleanText(body.customerName, 100);
    const phone = cleanText(body.phone, 25);
    const email = cleanText(body.email, 254).toLowerCase();
    const postcode = cleanText(body.postcode, 12).toUpperCase();
    const service = cleanText(body.service, 120);
    const date = cleanText(body.date, 10);
    const time = cleanText(body.time, 5);
    const notes = cleanText(body.notes, 1500);

    if (!customerName || !phone || !email || !postcode || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (
      !isValidEmail(email) ||
      !isValidPhone(phone) ||
      !isValidPostcode(postcode) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^\d{2}:\d{2}$/.test(time)
    ) {
      return NextResponse.json({ error: 'Please enter valid booking details' }, { status: 400 });
    }

    const selectedDate = new Date(`${date}T${time}:00`);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Please select a future appointment' }, { status: 400 });
    }

    const availableSlots = await getAvailableSlots(date);
    if (!availableSlots.includes(time)) {
      return NextResponse.json(
        { error: 'That appointment is no longer available. Please select another time.' },
        { status: 409 },
      );
    }

    // Check double booking again immediately before creation.
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
        status: 'PENDING',
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

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch (error) {
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
