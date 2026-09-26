import React from 'react';
import { Metadata } from 'next';
import { FAQSection } from '@/components/home/FAQSection';
import { getSiteSettings } from '@/lib/settings';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | TRIDS Gas & Plumbing Crewe',
  description:
    'Answers to common questions about our Gas Safe registered services (979661), boiler installations, annual servicing, landlord CP12 certificates, and emergency callouts.',
};

export default async function FAQPage() {
  const [settings, faqs] = await Promise.all([
    getSiteSettings(),
    db.faqItem.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: { question: true, answer: true, category: true },
    }),
  ]);

  return (
    <div className="pt-8">
      <FAQSection
        faqs={faqs}
        phone={settings.phone}
        gasSafeNumber={settings.gasSafeNumber}
      />
    </div>
  );
}
