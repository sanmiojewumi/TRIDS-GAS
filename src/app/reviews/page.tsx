import React from 'react';
import { db } from '@/lib/db';
import { getReviewsTargetUrl, getSiteSettings } from '@/lib/settings';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ReviewsQr } from '@/components/common/ReviewsQr';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews | Gas Engineer Crewe',
  description:
    'Read published customer reviews for TRIDS Gas & Plumbing in Crewe and Cheshire, or scan the QR code to leave a review.',
};

export default async function ReviewsPage() {
  const settings = await getSiteSettings();
  const reviewsUrl = getReviewsTargetUrl(settings);
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
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Customer reviews</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Reviews for TRIDS Gas & Plumbing
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Scan the QR code to open the live reviews page. Print it for vans, invoices or
              after a job so customers can leave feedback. Only published reviews are shown below.
            </p>
          </div>
          <ReviewsQr url={reviewsUrl} caption="Scan to open TRIDS reviews" />
        </div>
      </div>
      <TestimonialsSection testimonials={testimonials} googleReviewsUrl={settings.googleReviewsUrl} />
    </div>
  );
}
