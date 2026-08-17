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
  const testimonials = await db.testimonial.findMany({ where: { published: true } });

  return (
    <div className="py-12 bg-slate-950">
      <TestimonialsSection testimonials={testimonials} googleReviewsUrl={settings.googleReviewsUrl} />
    </div>
  );
}
