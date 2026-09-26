import { db } from './db';
import { isPublicHttpsUrl } from './security';

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
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  xUrl: string;
}

export const defaultSettings: SiteSettingsData = {
  companyName: 'TRIDS Gas & Plumbing',
  tagline: 'Gas Safe. Professionally Done.',
  phone: '07311038572',
  email: 'tridsgasandplumbing@gmail.com',
  gasSafeNumber: '979661',
  engineerName: 'TRIDS Gas & Plumbing',
  engineerQualifications: 'Gas Safe Registered (Reg No. 979661) • City & Guilds Qualified • Unvented Hot Water Specialist',
  serviceArea: 'Crewe, Cheshire towns within 30 miles, plus Warrington, Stockport, Manchester and Stoke-on-Trent',
  emergencyNotice: 'If you smell gas or suspect a carbon monoxide leak, turn off your gas supply at the meter immediately and call the National Gas Emergency Service on 0800 111 999.',
  heroHeading: 'GAS & PLUMBING YOU CAN TRUST.',
  heroSubheading: 'Gas Safe boiler, heating and plumbing services from Crewe across Cheshire and nearby towns.',
  primaryCtaText: 'BOOK A SERVICE',
  secondaryCtaText: 'CALL NOW',
  openingHours: 'Mon - Fri: 08:00 - 18:00 | Saturday mornings by arrangement',
  address: 'Based in Crewe, covering Cheshire and towns within 30 miles, plus Warrington, Stockport, Manchester and Stoke-on-Trent',
  googleReviewsUrl: '#',
  facebookUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  linkedinUrl: '',
  youtubeUrl: '',
  xUrl: '',
};

function readSetting(value: string | null | undefined, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

export function getPublicSocialUrls(settings: SiteSettingsData): string[] {
  return [
    settings.facebookUrl,
    settings.instagramUrl,
    settings.tiktokUrl,
    settings.linkedinUrl,
    settings.youtubeUrl,
    settings.xUrl,
  ].filter(isPublicHttpsUrl);
}

export function getReviewsTargetUrl(settings: SiteSettingsData): string {
  return isPublicHttpsUrl(settings.googleReviewsUrl)
    ? settings.googleReviewsUrl
    : 'https://tridsgas.co.uk/reviews';
}

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
        engineerName: settings.engineerName || defaultSettings.engineerName,
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
        facebookUrl: readSetting((settings as { facebookUrl?: string }).facebookUrl, ''),
        instagramUrl: readSetting((settings as { instagramUrl?: string }).instagramUrl, ''),
        tiktokUrl: readSetting((settings as { tiktokUrl?: string }).tiktokUrl, ''),
        linkedinUrl: readSetting((settings as { linkedinUrl?: string }).linkedinUrl, ''),
        youtubeUrl: readSetting((settings as { youtubeUrl?: string }).youtubeUrl, ''),
        xUrl: readSetting((settings as { xUrl?: string }).xUrl, ''),
      };
    }
  } catch (error) {
    console.error('Error fetching site settings from DB:', error);
  }
  return defaultSettings;
}
