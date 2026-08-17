import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/settings';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { DraggableWhatsApp } from '@/components/common/DraggableWhatsApp';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: `${settings.companyName} | Gas Safe Registered Engineer (${settings.gasSafeNumber})`,
      template: `%s | ${settings.companyName}`,
    },
    description: `Professional gas, heating and plumbing services across ${settings.serviceArea}. Gas Safe Registered (${settings.gasSafeNumber}). Call ${settings.phone}.`,
    keywords: [
      'Gas Safe Registered 979661',
      'Crewe Gas Engineer',
      'Winsford Plumber',
      'Sandbach Boiler Repair',
      'Nantwich Boiler Installation',
      'Congleton Gas Safety',
      'Cheshire Plumber',
      'Warrington Gas Engineer',
      'Stockport Boiler Servicing',
      'Manchester Gas Safe Engineer',
      'Stoke-on-Trent Plumber',
      'TRIDS Gas & Plumbing',
    ],
    authors: [{ name: settings.companyName }],
    creator: settings.companyName,
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: 'https://tridsgas.co.uk',
      title: `${settings.companyName} | Gas Safe Registered ${settings.gasSafeNumber}`,
      description: settings.heroSubheading,
      siteName: settings.companyName,
      images: [
        {
          url: '/images/trids-logo.png',
          width: 1200,
          height: 630,
          alt: `${settings.companyName} Gas Safe Registered Engineer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.companyName} | Gas Safe Registered ${settings.gasSafeNumber}`,
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

  // LocalBusiness & Gas Safe Schema.org JSON-LD
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: settings.companyName,
    description: settings.heroSubheading,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'Crewe',
      addressRegion: 'Cheshire',
    },
    areaServed: [
      'Crewe',
      'Winsford',
      'Sandbach',
      'Nantwich',
      'Congleton',
      'Cheshire',
      'Warrington',
      'Stockport',
      'Manchester',
      'Stoke-on-Trent',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Gas Safe Registration',
      identifier: settings.gasSafeNumber,
    },
    openingHours: 'Mo-Fr 08:00-18:00',
    priceRange: '££',
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
        <Header settings={settings} />
        <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden">{children}</main>
        <Footer settings={settings} />
        <MobileNav phone={settings.phone} />
        <DraggableWhatsApp phone={settings.phone} />
      </body>
    </html>
  );
}
