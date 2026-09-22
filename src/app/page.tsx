import { getSiteSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import {
  HomepageRedesign,
  HomepageReview,
  HomepageService,
} from '@/components/home/HomepageRedesign';

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();
  let services: HomepageService[] = [];
  let reviews: HomepageReview[] = [];

  try {
    const rawServices = await db.service.findMany({
      where: {
        active: true,
        slug: {
          in: [
            'boiler-repairs',
            'boiler-servicing',
            'boiler-installation',
            'gas-safety-checks',
            'central-heating-services',
            'general-plumbing',
          ],
        },
      },
    });
    services = rawServices.map((service) => ({
      id: service.id,
      name: service.name,
      slug: service.slug,
      description: service.description,
      category: service.category,
    }));
  } catch (error) {
    console.error('Error loading homepage services:', error);
  }

  try {
    const rawReviews = await db.testimonial.findMany({
      where: {
        published: true,
        id: { notIn: ['review-1', 'review-2', 'review-3', 'review-4'] },
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    reviews = rawReviews.map((review) => ({
      id: review.id,
      customerName: review.customerName,
      review: review.review,
      rating: review.rating,
      service: review.service,
      location: review.location,
      date: review.date,
    }));
  } catch (error) {
    console.error('Error loading homepage reviews:', error);
  }

  return <HomepageRedesign settings={settings} services={services} reviews={reviews} />;
}
