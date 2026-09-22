import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { sendEnquiryEmailNotification } from '@/lib/email';
import {
  checkRateLimit,
  cleanText,
  isValidEmail,
  isValidPhone,
  isValidPostcode,
} from '@/lib/security';

export async function POST(req: Request) {
  const limit = checkRateLimit(req, 'enquiry', { windowMs: 60 * 60 * 1000, max: 5 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please call us if your enquiry is urgent.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const name = cleanText(body.name, 100);
    const phone = cleanText(body.phone, 25);
    const email = cleanText(body.email, 254).toLowerCase();
    const postcode = cleanText(body.postcode, 12).toUpperCase();
    const service = cleanText(body.service, 120);
    const message = cleanText(body.message, 3000);
    const preferredDate = cleanText(body.preferredDate, 20);
    const preferredTime = cleanText(body.preferredTime, 80);

    if (!name || !phone || !email || !postcode || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(email) || !isValidPhone(phone) || !isValidPostcode(postcode)) {
      return NextResponse.json({ error: 'Please enter valid contact details' }, { status: 400 });
    }

    const enquiry = await db.enquiry.create({
      data: {
        name,
        phone,
        email,
        postcode,
        service,
        message,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        status: 'NEW',
      },
    });

    // Send instant notification email to official inbox tridsgasandplumbing@gmail.com
    await sendEnquiryEmailNotification({
      name,
      phone,
      email,
      postcode,
      service,
      message,
      preferredDate,
      preferredTime,
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ enquiries });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
