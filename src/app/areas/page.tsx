import React from 'react';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { ServiceAreasSection } from '@/components/home/ServiceAreasSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gas Engineer Coverage | Crewe, Cheshire & 30 Miles',
  description:
    'TRIDS Gas & Plumbing covers Crewe, Cheshire towns within 30 miles, plus Warrington, Stockport, Manchester and Stoke-on-Trent. Book a Gas Safe engineer near you.',
};

export default async function AreasPage() {
  const settings = await getSiteSettings();
  const areas = await db.serviceArea.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="bg-slate-950 py-12">
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Local gas engineer coverage</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-5xl">
          Gas Engineer in Crewe, Cheshire and Nearby Towns
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Based in Crewe, TRIDS covers Cheshire and towns within about 30 miles, plus the extra
          areas already on the books: Warrington, Stockport, Manchester and Stoke-on-Trent.
          Choose a town below for local boiler, heating and plumbing services.
        </p>
      </div>
      <ServiceAreasSection areas={areas} primaryServiceArea={settings.serviceArea} />
    </div>
  );
}
