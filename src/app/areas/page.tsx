import React from 'react';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { ServiceAreasSection } from '@/components/home/ServiceAreasSection';

export const metadata = {
  title: 'Service Areas Coverage',
  description: 'TRIDS Gas & Plumbing local coverage areas across UK towns and postal codes.',
};

export default async function AreasPage() {
  const settings = await getSiteSettings();
  const areas = await db.serviceArea.findMany({ where: { active: true } });

  return (
    <div className="py-12 bg-slate-950">
      <ServiceAreasSection areas={areas} primaryServiceArea={settings.serviceArea} />
    </div>
  );
}
