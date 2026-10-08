import React from 'react';
import { getReviewsTargetUrl, getSiteSettings } from '@/lib/settings';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import type { Metadata } from 'next';

import { getPublishedReviews } from '@/lib/reviews';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo('/reviews', {
  title: 'Customer Reviews | Gas Engineer Crewe',
  description:
    'Read published customer reviews for TRIDS Gas & Plumbing in Crewe. After a completed job we ask for an honest Google review — never bought or scripted.',
});

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const settings = await getSiteSettings();
  const testimonials = await getPublishedReviews();

  return (
    <div className="bg-slate-950 py-12">
      <TestimonialsSection testimonials={testimonials} googleReviewsUrl={getReviewsTargetUrl(settings)} />
    </div>
  );
}
