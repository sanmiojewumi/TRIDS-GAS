import type { Metadata } from 'next';
import { LOCAL_LANDING_SLUGS } from '@/lib/local-landings';
import { coverageTowns } from '@/lib/coverage';
import type { SiteSettingsData } from '@/lib/settings';
import { SITE_URL } from '@/lib/site';

export const DEFAULT_OG_IMAGE = '/images/slides/slide1.jpg';

export const CORE_SERVICE_SLUGS = [
  'boiler-repairs',
  'boiler-servicing',
  'boiler-installation',
  'gas-safety-checks',
  'landlord-gas-safety-certificates',
  'gas-appliance-installation',
  'gas-pipework-installation',
  'gas-tightness-testing',
  'gas-leak-investigation',
  'central-heating-services',
  'general-plumbing',
  'leaking-pipes',
  'emergency-plumbing',
  'tap-toilet-installation',
  'shower-radiator-replacement',
  'hot-water-cylinder-services',
] as const;

export const CORE_BLOG_SLUGS = [
  'how-often-should-you-service-a-boiler',
  'what-is-a-cp12-landlord-certificate',
  'what-to-do-if-you-smell-gas',
] as const;

export const PUBLIC_INDEX_ROUTES = [
  '/',
  '/services',
  '/about',
  '/projects',
  '/reviews',
  '/faq',
  '/areas',
  '/blog',
  '/contact',
  '/quote',
  '/book',
  '/privacy',
  '/cookies',
  '/terms',
  '/disclaimer',
  ...LOCAL_LANDING_SLUGS.map((slug) => `/${slug}`),
] as const;

export const SITEMAP_ROUTES = [
  '/',
  '/services',
  '/about',
  '/projects',
  '/reviews',
  '/faq',
  '/areas',
  '/blog',
  '/contact',
  ...LOCAL_LANDING_SLUGS.map((slug) => `/${slug}`),
] as const;

export const SERVICE_LANDING_BY_SLUG: Record<string, string> = {
  'boiler-repairs': '/boiler-repair-crewe',
  'boiler-servicing': '/boiler-service-crewe',
  'gas-safety-checks': '/landlord-gas-safety-crewe',
  'landlord-gas-safety-certificates': '/landlord-gas-safety-crewe',
  'central-heating-services': '/central-heating-repair-crewe',
  'gas-appliance-installation': '/gas-cooker-installation-crewe',
};

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageSeo(
  path: string,
  extras: Metadata & { description?: string } = {},
): Metadata {
  const canonical = absoluteUrl(path);
  const title =
    typeof extras.title === 'string'
      ? extras.title
      : extras.openGraph?.title || 'Gas Engineer Crewe & Cheshire';
  const description = extras.description;

  return {
    ...extras,
    alternates: {
      canonical,
      languages: { 'en-GB': canonical },
      ...extras.alternates,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: canonical,
      siteName: 'TRIDS Gas & Plumbing',
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1600,
          height: 900,
          alt: 'TRIDS Gas & Plumbing — Gas Safe engineer in Crewe',
        },
      ],
      ...extras.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...extras.twitter,
    },
    robots: extras.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function buildBusinessJsonLd(settings: SiteSettingsData, sameAs: string[]) {
  const logo = absoluteUrl('/images/trids-logo.png');
  const image = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.companyName,
        description: settings.heroSubheading,
        inLanguage: 'en-GB',
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': ['HVACBusiness', 'Plumber', 'LocalBusiness'],
        '@id': `${SITE_URL}/#business`,
        name: settings.companyName,
        alternateName: ['TRIDS Gas', 'TRIDS Plumbing', 'TRIDS Gas and Plumbing'],
        description: `${settings.heroSubheading} Gas Safe registered ${settings.gasSafeNumber}.`,
        url: SITE_URL,
        telephone: settings.phone,
        email: settings.email,
        image,
        logo,
        priceRange: '££',
        currenciesAccepted: 'GBP',
        paymentAccepted: 'Cash, Bank Transfer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Crewe',
          addressRegion: 'Cheshire',
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 53.097,
          longitude: -2.441,
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Crewe',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Cheshire',
          },
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 53.097,
              longitude: -2.441,
            },
            geoRadius: 48280,
            name: '30 miles from Crewe',
          },
          ...coverageTowns.map((town) => ({
            '@type': 'City',
            name: town.name,
          })),
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Gas Safe Registration',
          identifier: settings.gasSafeNumber,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Gas Safe Register',
            url: 'https://www.gassaferegister.co.uk/',
          },
        },
        knowsAbout: [
          'gas engineer Crewe',
          'heating engineer Crewe',
          'boiler repair Crewe',
          'boiler service Crewe',
          'boiler breakdown Crewe',
          'landlord gas safety certificate Crewe',
          'central heating repair',
          'gas cooker installation',
          'domestic plumbing',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Gas and plumbing services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Boiler repairs', url: absoluteUrl('/services/boiler-repairs') } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Boiler servicing', url: absoluteUrl('/services/boiler-servicing') } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Boiler installation', url: absoluteUrl('/services/boiler-installation') } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gas safety checks and CP12', url: absoluteUrl('/services/gas-safety-checks') } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Central heating services', url: absoluteUrl('/services/central-heating-services') } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'General plumbing', url: absoluteUrl('/services/general-plumbing') } },
          ],
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
