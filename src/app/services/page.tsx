import React from 'react';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { ServicesSection } from '@/components/home/ServicesSection';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';

export const metadata = {
  title: 'Gas & Plumbing Services',
  description: 'Explore full gas, heating, boiler installation, CP12 certificates, and plumbing services by TRIDS Gas & Plumbing.',
};

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const services = await db.service.findMany({ where: { active: true } });

  return (
    <div className="py-12 bg-slate-950 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />
      </div>

      <ServicesSection services={services} />
    </div>
  );
}
