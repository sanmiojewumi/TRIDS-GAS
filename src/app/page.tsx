import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import {
  HomepageRedesign,
  HomepageReview,
  HomepageService,
} from '@/components/home/HomepageRedesign';
import { getPublishedReviews } from '@/lib/reviews';
import { pageSeo } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return pageSeo('/', {
    title: 'Gas Engineer Crewe | Boiler Repair, Servicing & Heating',
    description:
      'Gas Safe registered gas engineer in Crewe for boiler repair, servicing, breakdowns, heating and landlord CP12. Serving Nantwich, Sandbach, Middlewich, Winsford and surrounding Cheshire.',
  });
}

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
    reviews = await getPublishedReviews(3);
  } catch (error) {
    console.error('Error loading homepage reviews:', error);
  }

  return <HomepageRedesign settings={settings} services={services} reviews={reviews} />;
}
