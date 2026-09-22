import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { isValidAvailabilityDate, isValidAvailabilityTime } from '@/lib/availability';
import { cleanText } from '@/lib/security';

export async function GET() {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [days, blockedDates] = await Promise.all([
    db.availabilityDay.findMany({ orderBy: { dayOfWeek: 'asc' } }),
    db.blockedDate.findMany({ orderBy: { date: 'asc' } }),
  ]);
  return NextResponse.json({ days, blockedDates });
}

export async function PUT(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.days) || body.days.length !== 7) {
      return NextResponse.json({ error: 'All seven weekday settings are required' }, { status: 400 });
    }

    const days: Array<{
      dayOfWeek: number;
      enabled: boolean;
      startTime: string;
      endTime: string;
      slotDuration: number;
    }> = body.days.map((day: Record<string, unknown>) => {
      const dayOfWeek = Number(day.dayOfWeek);
      const startTime = cleanText(day.startTime, 5);
      const endTime = cleanText(day.endTime, 5);
      const slotDuration = Number(day.slotDuration);
      if (
        !Number.isInteger(dayOfWeek) ||
        dayOfWeek < 0 ||
        dayOfWeek > 6 ||
        !isValidAvailabilityTime(startTime) ||
        !isValidAvailabilityTime(endTime) ||
        startTime >= endTime ||
        !Number.isInteger(slotDuration) ||
        slotDuration < 15 ||
        slotDuration > 480
      ) {
        throw new Error('Invalid weekday availability');
      }
      return { dayOfWeek, enabled: Boolean(day.enabled), startTime, endTime, slotDuration };
    });

    await db.$transaction(
      days.map((day) =>
        db.availabilityDay.upsert({
          where: { dayOfWeek: day.dayOfWeek },
          update: day,
          create: day,
        }),
      ),
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Check the opening times and slot durations' }, { status: 400 });
  }
}

export async function POST(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const date = cleanText(body.date, 10);
    if (!isValidAvailabilityDate(date)) {
      return NextResponse.json({ error: 'Choose a future date within 180 days' }, { status: 400 });
    }
    const blockedDate = await db.blockedDate.upsert({
      where: { date },
      update: { reason: cleanText(body.reason, 200) || null },
      create: { date, reason: cleanText(body.reason, 200) || null },
    });
    return NextResponse.json({ success: true, blockedDate }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Could not block this date' }, { status: 400 });
  }
}
