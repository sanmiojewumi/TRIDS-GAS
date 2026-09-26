import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { cleanText, isPublicHttpsUrl, isValidEmail, isValidPhone } from '@/lib/security';

export async function PUT(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = {
      companyName: cleanText(body.companyName, 120),
      tagline: cleanText(body.tagline, 180),
      phone: cleanText(body.phone, 25),
      email: cleanText(body.email, 254).toLowerCase(),
      gasSafeNumber: cleanText(body.gasSafeNumber, 30),
      engineerName: cleanText(body.engineerName, 120),
      engineerQualifications: cleanText(body.engineerQualifications, 500),
      serviceArea: cleanText(body.serviceArea, 1000),
      emergencyNotice: cleanText(body.emergencyNotice, 1500),
      heroHeading: cleanText(body.heroHeading, 180),
      heroSubheading: cleanText(body.heroSubheading, 1000),
      primaryCtaText: cleanText(body.primaryCtaText, 60),
      secondaryCtaText: cleanText(body.secondaryCtaText, 60),
      openingHours: cleanText(body.openingHours, 250),
      address: cleanText(body.address, 500),
      googleReviewsUrl: cleanText(body.googleReviewsUrl, 500),
      facebookUrl: cleanText(body.facebookUrl, 500),
      instagramUrl: cleanText(body.instagramUrl, 500),
      tiktokUrl: cleanText(body.tiktokUrl, 500),
      linkedinUrl: cleanText(body.linkedinUrl, 500),
      youtubeUrl: cleanText(body.youtubeUrl, 500),
      xUrl: cleanText(body.xUrl, 500),
    };

    if (
      !data.companyName ||
      !data.phone ||
      !data.email ||
      !isValidPhone(data.phone) ||
      !isValidEmail(data.email)
    ) {
      return NextResponse.json({ error: 'Valid company contact details are required' }, { status: 400 });
    }
    const optionalHttpsFields = [
      ['Google Reviews URL', data.googleReviewsUrl],
      ['Facebook URL', data.facebookUrl],
      ['Instagram URL', data.instagramUrl],
      ['TikTok URL', data.tiktokUrl],
      ['LinkedIn URL', data.linkedinUrl],
      ['YouTube URL', data.youtubeUrl],
      ['X URL', data.xUrl],
    ] as const;

    for (const [label, value] of optionalHttpsFields) {
      if (value && value !== '#' && !isPublicHttpsUrl(value)) {
        return NextResponse.json({ error: `${label} must be a valid HTTPS URL or left blank` }, { status: 400 });
      }
    }

    const updated = await db.siteSettings.upsert({
      where: { id: 'default' },
      update: data,
      create: { id: 'default', ...data },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
