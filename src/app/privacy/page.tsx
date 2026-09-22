import React from 'react';
import { getSiteSettings } from '@/lib/settings';

export const metadata = {
  title: 'Privacy Policy | TRIDS Gas & Plumbing',
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">1. Information We Collect</h2>
          <p>
            When you request a quote, book an appointment, or contact {settings.companyName}, we collect personal details including your name, phone number, email address, property postcode, and information regarding your heating or plumbing requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">2. How We Use Your Data</h2>
          <p>
            Your information is used solely to fulfill requested engineering services, issue Gas Safe certificates (CP12), communicate regarding appointments, and maintain service history records in accordance with UK law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">3. Data Security & Storage</h2>
          <p>
            We implement strict technical and organizational security measures to protect your personal data against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">4. Your GDPR Rights</h2>
          <p>
            Under UK GDPR, you have the right to request access to, correction of, or deletion of your personal data held by us. Contact us at {settings.email} for any data inquiries.
          </p>
        </section>
      </div>
    </div>
  );
}
