import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getPublicSocialUrls, getSiteSettings } from '@/lib/settings';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { GOOGLE_MAPS_PLACE_URL, SITE_URL } from '@/lib/site';
import { DEFAULT_OG_IMAGE, buildBusinessJsonLd } from '@/lib/seo';
import { getPublishedReviewSummary } from '@/lib/reviews';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `Gas Engineer Crewe | ${settings.companyName} | Gas Safe ${settings.gasSafeNumber}`,
      template: `%s | ${settings.companyName}`,
    },
    description: `Gas Safe registered gas engineer and plumber in Crewe covering Cheshire, towns within 30 miles of Crewe, plus Warrington, Stockport, Manchester and Stoke-on-Trent. Boiler repair, servicing, installation and CP12. Call ${settings.phone}.`,
    keywords: [
      'gas engineer Crewe',
      'boiler repair Crewe',
      'boiler service Crewe',
      'boiler breakdown Crewe',
      'heating engineer Crewe',
      'landlord CP12 Crewe',
      'gas engineer Cheshire',
      'TRIDS Gas & Plumbing',
    ],
    authors: [{ name: settings.companyName }],
    creator: settings.companyName,
    publisher: settings.companyName,
    category: 'home services',
    applicationName: settings.companyName,
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(process.env.BING_SITE_VERIFICATION?.trim()
        ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION.trim() } }
        : {}),
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: settings.companyName,
      title: `Gas Engineer Crewe | ${settings.companyName}`,
      description: settings.heroSubheading,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1600,
          height: 900,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const sameAs = Array.from(new Set([...getPublicSocialUrls(settings), GOOGLE_MAPS_PLACE_URL]));
  const rating = await getPublishedReviewSummary();
  const schemaJsonLd = buildBusinessJsonLd(settings, sameAs, rating);

  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable} dark scroll-smooth overflow-x-hidden`}>
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
