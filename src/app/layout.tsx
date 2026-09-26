import type { Metadata } from 'next';
import './globals.css';
import { getPublicSocialUrls, getSiteSettings } from '@/lib/settings';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { coverageTowns } from '@/lib/coverage';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL('https://tridsgas.co.uk'),
    title: {
      default: `Gas Engineer Crewe | ${settings.companyName} | Gas Safe ${settings.gasSafeNumber}`,
      template: `%s | ${settings.companyName}`,
    },
    description: `Gas Safe registered gas engineer and plumber in Crewe covering Cheshire, towns within 30 miles of Crewe, plus Warrington, Stockport, Manchester and Stoke-on-Trent. Boiler repair, servicing, installation and CP12. Call ${settings.phone}.`,
    keywords: [
      'gas engineer Crewe',
      'plumber Crewe',
      'boiler repair Crewe',
      'boiler servicing Crewe',
      'gas engineer Cheshire',
      'plumber Cheshire',
      'gas engineer Nantwich',
      'gas engineer Sandbach',
      'gas engineer Winsford',
      'gas engineer Congleton',
      'gas engineer Northwich',
      'gas engineer Alsager',
      'gas engineer Middlewich',
      'landlord CP12 Crewe',
      'Gas Safe Registered 979661',
      'TRIDS Gas & Plumbing',
    ],
    authors: [{ name: settings.companyName }],
    creator: settings.companyName,
    alternates: {
      canonical: 'https://tridsgas.co.uk',
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: 'https://tridsgas.co.uk',
      title: `Gas Engineer Crewe | ${settings.companyName}`,
      description: settings.heroSubheading,
      siteName: settings.companyName,
      images: [
        {
          url: '/images/trids-logo.png',
          width: 1200,
          height: 630,
          alt: `${settings.companyName} Gas Safe registered engineer in Crewe`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gas Engineer Crewe | ${settings.companyName}`,
      description: settings.heroSubheading,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const sameAs = getPublicSocialUrls(settings);

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'Plumber'],
    name: settings.companyName,
    description: settings.heroSubheading,
    url: 'https://tridsgas.co.uk',
    telephone: settings.phone,
    email: settings.email,
    image: 'https://tridsgas.co.uk/images/trids-logo.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'Crewe',
      addressRegion: 'Cheshire',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.097,
      longitude: -2.441,
    },
    areaServed: [
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
      'Cheshire',
      ...coverageTowns.map((town) => town.name),
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Gas Safe Registration',
      identifier: settings.gasSafeNumber,
    },
    openingHours: 'Mo-Fr 08:00-18:00',
    priceRange: '££',
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#070D1E] text-slate-100 antialiased pb-16 lg:pb-0 relative w-full max-w-[100vw] overflow-x-hidden">
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
