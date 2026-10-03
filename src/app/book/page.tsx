import React from 'react';
import { BookingForm } from '@/components/forms/BookingForm';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';

import { pageSeo } from '@/lib/seo';

export const metadata = pageSeo('/book', {
  title: 'Book a Gas Engineer in Crewe | Online Appointment',
  description:
    'Book a boiler service, landlord CP12, heating repair or plumbing visit with a Gas Safe registered engineer in Crewe and Cheshire.',
});

export const dynamic = 'force-dynamic';

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;
  const requestedService = Array.isArray(params.service) ? params.service[0] : params.service;

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />
        <BookingForm initialService={requestedService} />
      </div>
    </div>
  );
}
