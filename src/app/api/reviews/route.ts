import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, cleanText } from '@/lib/security';

export async function POST(req: Request) {
  const limit = checkRateLimit(req, 'review', { windowMs: 24 * 60 * 60 * 1000, max: 3 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many review submissions. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const customerName = cleanText(body.customerName, 80);
    const review = cleanText(body.review, 2000);
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
    const service = cleanText(body.service, 120) || 'General Service';
    const location = cleanText(body.location, 120);

    if (!customerName || !review) {
      return NextResponse.json({ error: 'Name and review are required' }, { status: 400 });
    }

    const testimonial = await db.testimonial.create({
      data: {
        customerName,
        review,
        rating,
        service,
        location: location || null,
        published: false,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      },
    });

    return NextResponse.json({ success: true, id: testimonial.id }, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Unable to submit review. Please try again.' }, { status: 500 });
  }
}
