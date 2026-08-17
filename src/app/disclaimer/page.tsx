import React from 'react';
import { getSiteSettings } from '@/lib/settings';

export const metadata = {
  title: 'Disclaimer | TRIDS Gas & Plumbing',
};

export default async function DisclaimerPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          DISCLAIMER
        </h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">1. Emergency Gas Notice</h2>
          <p>
            {settings.companyName} provides professional domestic gas engineering services during standard working hours and urgent response. However, this website is not a substitute for the UK National Gas Emergency Service.
          </p>
          <div className="p-4 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-xs">
            <strong>Emergency Reminder:</strong> If you smell gas or suspect a carbon monoxide leak, turn off your gas supply at the meter immediately and call the National Gas Emergency Service on <strong>0800 111 999</strong>.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">2. Licensing & Registration Placeholders</h2>
          <p>
            All Gas Safe registration numbers and engineer credentials displayed on this website represent configurable business values managed by the administrator. Gas Safe registration details must always be verified on the official Gas Safe Register.
          </p>
        </section>
      </div>
    </div>
  );
}
