import { db } from '@/lib/db';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function toTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

function londonNow(): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value || '';

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export function isValidAvailabilityDate(date: string): boolean {
  if (!DATE_PATTERN.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;

  const now = londonNow().date;
  const maximum = new Date(`${now}T12:00:00Z`);
  maximum.setUTCDate(maximum.getUTCDate() + 180);
  return date >= now && date <= maximum.toISOString().slice(0, 10);
}

export function isValidAvailabilityTime(time: string): boolean {
  if (!TIME_PATTERN.test(time)) return false;
  const minutes = toMinutes(time);
  return minutes >= 0 && minutes < 24 * 60;
}

export function isFutureLondonAppointment(date: string, time: string): boolean {
  if (!isValidAvailabilityDate(date) || !isValidAvailabilityTime(time)) return false;
  const now = londonNow();
  if (date > now.date) return true;
  return date === now.date && toMinutes(time) > now.minutes;
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  if (!isValidAvailabilityDate(date)) return [];

  const dayOfWeek = new Date(`${date}T12:00:00Z`).getUTCDay();
  const [rule, blocked, bookings] = await Promise.all([
    db.availabilityDay.findUnique({ where: { dayOfWeek } }),
    db.blockedDate.findUnique({ where: { date } }),
    db.booking.findMany({
      where: { date, status: { in: ['PENDING', 'CONFIRMED'] } },
      select: { time: true },
    }),
  ]);

  if (!rule?.enabled || blocked) return [];
  if (
    !isValidAvailabilityTime(rule.startTime) ||
    !isValidAvailabilityTime(rule.endTime) ||
    rule.slotDuration < 15 ||
    rule.slotDuration > 480
  ) {
    return [];
  }

  const start = toMinutes(rule.startTime);
  const end = toMinutes(rule.endTime);
  if (start >= end) return [];

  const occupied = new Set(bookings.map((booking) => booking.time));
  const now = londonNow();
  const slots: string[] = [];

  for (let current = start; current + rule.slotDuration <= end; current += rule.slotDuration) {
    const time = toTime(current);
    if (occupied.has(time)) continue;
    if (date === now.date && current <= now.minutes + 30) continue;
    slots.push(time);
  }

  return slots;
}
