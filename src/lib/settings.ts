import { db } from './db';

export interface SiteSettingsData {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  gasSafeNumber: string;
  engineerName: string;
  engineerQualifications: string;
  serviceArea: string;
  emergencyNotice: string;
  heroHeading: string;
  heroSubheading: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  openingHours: string;
  address: string;
  googleReviewsUrl: string;
}

export const defaultSettings: SiteSettingsData = {
  companyName: 'TRIDS Gas & Plumbing',
  tagline: 'Gas Safe. Professionally Done.',
  phone: '07311038572',
  email: 'tridsgasandplumbing@gmail.com',
  gasSafeNumber: '979661',
  engineerName: '',
  engineerQualifications: 'Gas Safe Registered (Reg No. 979661) • City & Guilds Qualified • Unvented Hot Water Specialist',
  serviceArea: 'Crewe, Winsford, Sandbach, Nantwich, Congleton, All Cheshire, Warrington, Stockport, Manchester, Stoke-on-Trent (50-mile radius)',
  emergencyNotice: 'If you smell gas or suspect a carbon monoxide leak, turn off your gas supply at the meter immediately and call the National Gas Emergency Service on 0800 111 999.',
  heroHeading: 'GAS & PLUMBING YOU CAN TRUST.',
  heroSubheading: 'Professional gas, heating and plumbing services delivered safely, efficiently and with attention to detail across Crewe, Cheshire, Manchester & Staffordshire.',
  primaryCtaText: 'BOOK A SERVICE',
  secondaryCtaText: 'CALL NOW',
  openingHours: 'Mon - Fri: 08:00 - 18:00 | 24/7 Emergency Gas Response',
  address: 'Based in Crewe, serving Cheshire, Greater Manchester, Staffordshire & 50-mile radius',
  googleReviewsUrl: '#',
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: 'default' },
    });
    if (settings) {
      return {
        companyName: settings.companyName,
        tagline: settings.tagline,
        phone: settings.phone,
        email: settings.email,
        gasSafeNumber: settings.gasSafeNumber,
        engineerName: '',
        engineerQualifications: settings.engineerQualifications,
        serviceArea: settings.serviceArea,
        emergencyNotice: settings.emergencyNotice,
        heroHeading: settings.heroHeading,
        heroSubheading: settings.heroSubheading,
        primaryCtaText: settings.primaryCtaText,
        secondaryCtaText: settings.secondaryCtaText,
        openingHours: settings.openingHours,
        address: settings.address,
        googleReviewsUrl: settings.googleReviewsUrl,
      };
    }
  } catch (error) {
    console.error('Error fetching site settings from DB:', error);
  }
  return defaultSettings;
}
