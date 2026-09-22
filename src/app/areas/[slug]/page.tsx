import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { MapPin, Phone, ShieldCheck, CheckCircle2, Flame, Wrench } from 'lucide-react';

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = await db.serviceArea.findUnique({ where: { slug } });
  if (!area) return { title: 'Area Not Found' };

  return {
    title: area.seoTitle || `Gas Engineer & Plumber in ${area.name} | TRIDS`,
    description: area.seoDescription || area.description,
  };
}

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = await db.serviceArea.findUnique({ where: { slug } });
  if (!area) notFound();

  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Location Hero Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
            <MapPin className="w-3.5 h-3.5" /> Local Area Coverage
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
            GAS & PLUMBING SERVICES IN {area.name.toUpperCase()}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {area.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm text-center shadow-glow-gold"
            >
              Book Engineer in {area.name}
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm text-center border border-slate-700 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" /> Direct Call: {settings.phone}
            </a>
          </div>
        </div>

        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />

        {/* Local Services Offered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading border-b border-slate-800 pb-3">
              Services Available in {area.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" /> Boiler Installations & Upgrades
                </div>
                <p className="text-xs text-slate-400">High efficiency Worcester Bosch combi conversions with full warranty.</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" /> Boiler Servicing & Repairs
                </div>
                <p className="text-xs text-slate-400">Annual safety checks, flue testing, and diagnostic fault finding.</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" /> CP12 Landlord Certificates
                </div>
                <p className="text-xs text-slate-400">Fast digital safety compliance certificates for local landlords.</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Wrench className="w-4 h-4" /> Emergency Leak Repair
                </div>
                <p className="text-xs text-slate-400">Rapid containment of burst pipes, radiator leaks, and water ingress.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuoteForm />
          </div>
        </div>

      </div>
    </div>
  );
}
