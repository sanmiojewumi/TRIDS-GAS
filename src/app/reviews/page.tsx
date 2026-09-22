import React from 'react';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'Customer Reviews | TRIDS Gas & Plumbing',
  description: 'Read 5-star customer reviews for TRIDS Gas & Plumbing boiler servicing, repairs, and installations.',
};

export default async function ReviewsPage() {
  const settings = await getSiteSettings();
  const rawTestimonials = await db.testimonial.findMany({
    where: { published: true },
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
    <div className="py-12 bg-slate-950">
      <TestimonialsSection testimonials={testimonials} googleReviewsUrl={settings.googleReviewsUrl} />
    </div>
  );
}
