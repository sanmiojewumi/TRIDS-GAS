import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { areaSeoDescription, areaSeoTitle, coverageTowns } from '@/lib/coverage';
import { MapPin, Phone, ShieldCheck, Flame, Wrench } from 'lucide-react';

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const areas = await db.serviceArea.findMany({
    where: { active: true },
    select: { slug: true },
  });
  const seeded = coverageTowns.map((town) => ({ slug: town.slug }));
  const slugs = new Set([...areas.map((area) => area.slug), ...seeded.map((area) => area.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = await db.serviceArea.findUnique({ where: { slug } });
  if (!area) return { title: 'Area Not Found' };
  const fallback = coverageTowns.find((town) => town.slug === slug);

  return {
    title: area.seoTitle || areaSeoTitle(area.name),
    description: area.seoDescription || areaSeoDescription(area.name, fallback?.description || area.description),
    alternates: { canonical: `https://tridsgas.co.uk/areas/${area.slug}` },
  };
}

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = await db.serviceArea.findUnique({ where: { slug } });
  if (!area) notFound();

  const settings = await getSiteSettings();
  const nearby = coverageTowns.filter((town) => town.slug !== area.slug).slice(0, 8);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Gas engineer in ${area.name}`,
    serviceType: 'Gas engineer and plumber',
    provider: {
      '@type': 'HVACBusiness',
      name: settings.companyName,
      telephone: settings.phone,
      url: 'https://tridsgas.co.uk',
    },
    areaServed: area.name,
    url: `https://tridsgas.co.uk/areas/${area.slug}`,
  };

  return (
    <div className="space-y-12 bg-slate-950 py-12 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold uppercase text-amber-400">
            <MapPin className="h-3.5 w-3.5" /> Gas engineer near {area.name}
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Gas Engineer in {area.name}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {area.description} TRIDS is a Gas Safe registered engineer based in Crewe, covering
            Cheshire and towns within about 30 miles, plus the extra areas already served.
          </p>

          <div className="flex flex-col items-stretch gap-4 pt-4 sm:flex-row sm:items-center">
            <Link
              href="/book"
              className="rounded-xl bg-amber-500 px-6 py-3.5 text-center text-sm font-extrabold text-slate-950 shadow-glow-gold hover:bg-amber-400"
            >
              Book engineer in {area.name}
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-slate-700"
            >
              <Phone className="h-4 w-4 text-amber-400" /> Call {settings.phone}
            </a>
          </div>
        </div>

        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <h2 className="border-b border-slate-800 pb-3 font-heading text-2xl font-bold text-white">
              Services available in {area.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Flame className="h-4 w-4" /> Boiler installations
                </div>
                <p className="text-xs text-slate-400">Replacement boilers specified, fitted and commissioned to Gas Safe standards.</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Flame className="h-4 w-4" /> Boiler servicing and repairs
                </div>
                <p className="text-xs text-slate-400">Annual services, fault finding and heating repairs for {area.name} homes.</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" /> CP12 landlord certificates
                </div>
                <p className="text-xs text-slate-400">Landlord gas safety records for rented properties in {area.name}.</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                  <Wrench className="h-4 w-4" /> Plumbing and leak repairs
                </div>
                <p className="text-xs text-slate-400">Taps, toilets, radiators and leak repairs from the Crewe base.</p>
              </div>
            </div>
            {nearby.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Nearby coverage</h3>
                <div className="flex flex-wrap gap-2">
                  {nearby.map((town) => (
                    <Link
                      key={town.slug}
                      href={`/areas/${town.slug}`}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-amber-400 hover:text-amber-300"
                    >
                      {town.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
