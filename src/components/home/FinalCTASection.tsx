import React from 'react';
import Link from 'next/link';
import { Calendar, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface FinalCTAProps {
  settings: SiteSettingsData;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({ settings }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#050A18] border-t border-[#1E3A8A] relative overflow-hidden">
      {/* Tri-color ambient mesh background */}
      <div className="absolute inset-0 bg-engineering-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-amber-500/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1C3F] border border-amber-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Gas Safe Registered Engineer • Reg No: {settings.gasSafeNumber}
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
          DON&apos;T WAIT UNTIL A SMALL PROBLEM BECOMES A BIG ONE.
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Whether you need a boiler service, gas safety check, repair, installation or plumbing support, get in touch with TRIDS Gas & Plumbing today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/book"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-slate-950 text-base font-extrabold shadow-glow-gold transition-all flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5 fill-slate-950" />
            <span>BOOK A SERVICE</span>
          </Link>

          <a
            href={`tel:${settings.phone}`}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#0F1C3F] hover:bg-[#142552] text-white text-base font-bold border border-[#1E3A8A] hover:border-yellow-400/60 shadow-lg font-mono flex items-center justify-center gap-3"
          >
            <PhoneCall className="w-5 h-5 text-yellow-400" />
            <span>CALL NOW: {settings.phone}</span>
          </a>
        </div>

        <div className="pt-6 text-xs font-mono text-slate-400">
          Serving Crewe, Winsford, Sandbach, Nantwich, Congleton, Cheshire, Manchester & Staffordshire
        </div>

      </div>
    </section>
  );
};
