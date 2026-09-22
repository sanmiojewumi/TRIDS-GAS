import { NextResponse } from 'next/server';
import { getAvailableSlots, isValidAvailabilityDate } from '@/lib/availability';
import { checkRateLimit } from '@/lib/security';

export async function GET(request: Request) {
  const limit = checkRateLimit(request, 'availability', { windowMs: 60 * 1000, max: 60 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const date = new URL(request.url).searchParams.get('date') || '';
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
