import React from 'react';
import { db } from '@/lib/db';
import { getReviewsTargetUrl, getSiteSettings } from '@/lib/settings';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import type { Metadata } from 'next';

import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo('/reviews', {
  title: 'Customer Reviews | Gas Engineer Crewe',
  description:
    'Read published customer reviews for TRIDS Gas & Plumbing in Crewe. After a completed job we ask for an honest Google review — never bought or scripted.',
});

export default async function ReviewsPage() {
  const settings = await getSiteSettings();
  const rawTestimonials = await db.testimonial.findMany({
    where: {
      published: true,
      id: { notIn: ['review-1', 'review-2', 'review-3', 'review-4'] },
    },
    orderBy: { createdAt: 'desc' },
  });

  const testimonials = rawTestimonials.map((t) => ({
    id: t.id,
    customerName: t.customerName,
    review: t.review,
    rating: t.rating,
    service: t.service,
    location: t.location,
    date:
      t.date ||
      new Date(t.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
  }));

  return (
    <div className="bg-slate-950 py-12">
      <TestimonialsSection testimonials={testimonials} googleReviewsUrl={getReviewsTargetUrl(settings)} />
    </div>
  );
}
