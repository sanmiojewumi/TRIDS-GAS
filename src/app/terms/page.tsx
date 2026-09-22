import React from 'react';
import { getSiteSettings } from '@/lib/settings';

export const metadata = {
  title: 'Terms & Conditions | TRIDS Gas & Plumbing',
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">1. Services Scope</h2>
          <p>
            All gas work, boiler servicing, installations, and plumbing repairs provided by {settings.companyName} are conducted by a Gas Safe registered engineer in full accordance with UK Building Regulations and manufacturer instructions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">2. Estimates & Pricing</h2>
          <p>
            Quoted prices reflect diagnosed scope. If unexpected hidden pipework defects or unsafe gas conditions are identified during work, the client will be informed immediately before additional work proceeds.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">3. Gas Safety Compliance</h2>
          <p>
            If a gas appliance or flue is inspected and classified as Immediately Dangerous (ID) or At Risk (AR), the engineer is legally required under the Gas Safety (Installation and Use) Regulations to make the appliance safe or disconnect the supply with client agreement.
          </p>
        </section>
      </div>
    </div>
  );
}
