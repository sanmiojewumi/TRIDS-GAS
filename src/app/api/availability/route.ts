import { NextResponse } from 'next/server';
import {
  getAvailableSlots,
  getMonthAvailability,
  isValidAvailabilityDate,
} from '@/lib/availability';
import { checkRateLimit } from '@/lib/security';

export async function GET(request: Request) {
  const limit = checkRateLimit(request, 'availability', { windowMs: 60 * 1000, max: 60 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const searchParams = new URL(request.url).searchParams;
  const month = searchParams.get('month') || '';

  if (month) {
    const parsedMonth = new Date(`${month}-01T12:00:00Z`);
    if (
      !/^\d{4}-\d{2}$/.test(month) ||
      Number.isNaN(parsedMonth.getTime()) ||
      parsedMonth.toISOString().slice(0, 7) !== month
    ) {
      return NextResponse.json({ error: 'Enter a valid month' }, { status: 400 });
    }
    try {
      const days = await getMonthAvailability(month);
      return NextResponse.json({ month, days });
    } catch (error) {
      console.error('Failed to load monthly availability:', error);
      return NextResponse.json({ error: 'Could not load calendar availability' }, { status: 500 });
    }
  }

  const date = searchParams.get('date') || '';
  if (!isValidAvailabilityDate(date)) {
    return NextResponse.json({ error: 'Select a valid date within the next 180 days' }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error('Failed to load availability:', error);
    return NextResponse.json({ error: 'Could not load availability' }, { status: 500 });
  }
}
