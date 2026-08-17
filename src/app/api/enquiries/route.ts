import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { sendEnquiryEmailNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, postcode, service, message, preferredDate, preferredTime } = body;

    if (!name || !phone || !email || !postcode || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
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
