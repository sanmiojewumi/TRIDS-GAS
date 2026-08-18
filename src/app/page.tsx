import { getSiteSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import { HeroSection } from '@/components/home/HeroSection';
import { BoilerQuoteCalculator } from '@/components/home/BoilerQuoteCalculator';
import { StatsRibbon } from '@/components/home/StatsRibbon';
import { ServicesSection, ServiceItem } from '@/components/home/ServicesSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { BoilerSection } from '@/components/home/BoilerSection';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { MediaGallerySection, MediaItem } from '@/components/home/MediaGallerySection';
import { TestimonialsSection, TestimonialItem } from '@/components/home/TestimonialsSection';
import { ServiceAreasSection, ServiceAreaItem } from '@/components/home/ServiceAreasSection';
import { KnowledgeSection, BlogPostItem } from '@/components/home/KnowledgeSection';
import { EmergencyBanner } from '@/components/common/EmergencyBanner';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { FAQSection } from '@/components/home/FAQSection';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  const settings = await getSiteSettings();

  // Fetch dynamic database items safely with fallback default data
  let dbServices: ServiceItem[] = [];
  let dbMedia: MediaItem[] = [];
  let dbTestimonials: TestimonialItem[] = [];
  let dbAreas: ServiceAreaItem[] = [];
  let dbPosts: BlogPostItem[] = [];

  try {
    const rawServices = await db.service.findMany({
      orderBy: { name: 'asc' },
    });
    dbServices = rawServices.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      category: s.category,
      description: s.description,
      content: s.content,
      image: s.image,
      featured: s.featured,
    }));
  } catch (e) {
    console.error('Error loading services for homepage:', e);
  }

  try {
    const rawMedia = await db.mediaItem.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    dbMedia = rawMedia.map((m) => ({
      id: m.id,
      title: m.title,
      type: m.type as 'IMAGE' | 'VIDEO',
      url: m.url,
      thumbnailUrl: m.thumbnailUrl,
      category: m.category,
      description: m.description,
      location: m.location,
    }));
  } catch (e) {
    console.error('Error loading gallery media items for homepage:', e);
  }

  try {
    const rawTestimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
    dbTestimonials = rawTestimonials.map((t) => ({
      id: t.id,
      customerName: t.customerName,
      review: t.review,
      rating: t.rating,
      service: t.service,
      location: t.location,
      date: t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent',
    }));
  } catch (e) {
    console.error('Error loading testimonials for homepage:', e);
  }

  try {
    const rawAreas = await db.serviceArea.findMany({
      orderBy: { name: 'asc' },
    });
    dbAreas = rawAreas.map((a) => ({
      id: a.id,
      name: a.name,
      slug: a.slug,
      description: a.description,
    }));
  } catch (e) {
    console.error('Error loading areas for homepage:', e);
  }

  try {
    const rawPosts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
    dbPosts = rawPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      featuredImage: p.featuredImage || '/images/slides/slide1.jpg',
      author: p.author,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent',
    }));
  } catch (e) {
    console.error('Error loading blog posts for homepage:', e);
  }

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection settings={settings} />

      {/* 2. Instant 30-Second Online Boiler Quote Calculator */}
      <BoilerQuoteCalculator />

      {/* 3. Trust Stats & Ribbon Bar */}
      <StatsRibbon />

      {/* 4. Featured Core Engineering Capabilities */}
      <FeaturedSection />

      {/* 5. Why Choose TRIDS Guarantee */}
      <WhyChooseSection />

      {/* 6. Comprehensive Services Filter Grid (with Gas Safe & Plumbing Expert badges) */}
      <ServicesSection services={dbServices} />

      {/* 7. Boiler & Heating Efficiency Section */}
      <BoilerSection />

      {/* 8. How It Works 4-Step Process Timeline */}
      <HowItWorksSection />

      {/* 9. Picture & Video Media Gallery Showcase */}
      <MediaGallerySection media={dbMedia} />

      {/* 10. Verified Customer Reviews */}
      <TestimonialsSection
        testimonials={dbTestimonials}
        googleReviewsUrl={settings.googleReviewsUrl}
      />

      {/* 11. Local Coverage Areas */}
      <ServiceAreasSection
        areas={dbAreas}
        primaryServiceArea={settings.serviceArea}
      />

      {/* 12. UK Gas Emergency Banner Notice */}
      <EmergencyBanner emergencyNotice={settings.emergencyNotice} />

      {/* 13. Smart Quote Request Form */}
      <section id="quote-section" className="py-16 lg:py-24 bg-[#070D1E] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>

      {/* 14. Interactive Accordion FAQ Section */}
      <FAQSection />

      {/* 15. Knowledge Centre Blog */}
      <KnowledgeSection posts={dbPosts} />
    </div>
  );
}
