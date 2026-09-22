import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Flame, Wrench, CheckCircle2, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.name} | TRIDS Gas & Plumbing`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back button */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>

        {/* Top Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
              {service.category === 'GAS' ? (
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
              ) : (
                <Wrench className="w-3.5 h-3.5" />
              )}
              {service.category} Safe Service
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
              {service.name}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {service.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/book?service=${encodeURIComponent(service.name)}`}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm text-center shadow-glow-gold"
              >
                Book This Service Online
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm text-center border border-slate-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono">
                TRIDS Engineering
              </div>
            )}
          </div>
        </div>

        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />

        {/* Detailed Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white font-heading border-b border-slate-800 pb-3">
              Service Overview & Scope
            </h2>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-sm space-y-4">
              <p>{service.content}</p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-lg font-bold text-white font-heading">What is Included in This Service:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Full technical inspection & diagnostics
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Gas Safe safety documentation & sign-off
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Genuine manufacturer replacement parts
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Clean, tidy workmanship & site protection
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuoteForm initialService={service.name} />
          </div>
        </div>

      </div>
    </div>
  );
}
