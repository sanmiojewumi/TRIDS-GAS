import React from 'react';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';

export const metadata = {
  title: 'Request a Free Quote | TRIDS Gas & Plumbing',
  description: 'Get a transparent, professional quote for boiler installation, servicing, or plumbing repairs from TRIDS Gas & Plumbing.',
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string | string[];
    details?: string | string[];
  }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;
  const serviceParam = Array.isArray(params.service) ? params.service[0] : params.service;
  const detailsParam = Array.isArray(params.details) ? params.details[0] : params.details;
  const requestedService = serviceParam?.replace(/\+/g, ' ');

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />
        <QuoteForm
          initialService={requestedService}
          initialMessage={detailsParam}
          gasSafeNumber={settings.gasSafeNumber}
        />
      </div>
    </div>
  );
}
