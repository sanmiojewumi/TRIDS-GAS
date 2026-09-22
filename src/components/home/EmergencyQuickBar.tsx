'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ShieldAlert, Clock, ArrowRight, PhoneCall } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface QuickBarProps {
  settings: SiteSettingsData;
}

export const EmergencyQuickBar: React.FC<QuickBarProps> = ({ settings }) => {
  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-8">
      <div className="glass-card rounded-3xl p-5 sm:p-6 border-2 border-amber-500/40 bg-[#0F1C3F]/95 shadow-[0_20px_50px_rgba(7,13,30,0.9)] backdrop-blur-xl transition-all hover:border-amber-400">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Left Info Column */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-yellow-400 border border-amber-500/40 flex items-center justify-center font-bold shrink-0 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Need a Qualified Gas Engineer?
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading mt-0.5">
                Fast Response • Professional Service • Safety First
              </h3>
              <p className="text-xs text-slate-300 hidden sm:block mt-0.5">
                Gas Safe Registered ({settings.gasSafeNumber}) • Serving Crewe, Cheshire & 50-Mile Radius
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${settings.phone}`}
              className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-glow-gold flex items-center justify-center gap-2 group font-mono"
            >
              <PhoneCall className="w-4 h-4 text-slate-950 group-hover:animate-bounce" />
              <span>Call Now: {settings.phone}</span>
            </a>

            <Link
              href="/quote"
              className="flex-1 lg:flex-none px-5 py-3.5 rounded-xl bg-[#070D1E] hover:bg-[#142552] text-white text-xs sm:text-sm font-bold border border-[#1E3A8A] flex items-center justify-center gap-2 transition-colors"
            >
              <span>Request Callback</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
