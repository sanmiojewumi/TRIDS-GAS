import React from 'react';
import { Metadata } from 'next';
import { FAQSection, defaultFaqs } from '@/components/home/FAQSection';
import { getSiteSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import { faqJsonLd, pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo('/faq', {
  title: 'Gas Engineer FAQs | Boiler Service, CP12 & Plumbing Crewe',
  description:
    'Answers to common questions about Gas Safe services (979661), boiler installations, annual servicing, landlord CP12 certificates and plumbing in Crewe.',
});

export default async function FAQPage() {
  const [settings, faqs] = await Promise.all([
    getSiteSettings(),
    db.faqItem.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: { question: true, answer: true, category: true },
    }),
  ]);

  const schemaFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(schemaFaqs)) }} />
      <FAQSection
        faqs={faqs}
        phone={settings.phone}
        gasSafeNumber={settings.gasSafeNumber}
      />
    </div>
  );
}
