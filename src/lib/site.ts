function canonicalSiteUrl(): string {
  const fallback = 'https://www.tridsgas.com';
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || fallback).trim().replace(/\/$/, '');

  try {
    const url = new URL(raw);
    if (url.hostname === 'tridsgas.com') {
      url.hostname = 'www.tridsgas.com';
    }
    if (url.hostname === 'www.tridsgas.com') {
      url.protocol = 'https:';
    }
    return url.origin;
  } catch {
    return fallback;
  }
}

export const SITE_URL = canonicalSiteUrl();
export const OFFICIAL_EMAIL = 'tridsbooking@gmail.com';
export const ADMIN_LOGIN_PATH = '/admin/login';
export const GOOGLE_PLACE_ID =
  process.env.GOOGLE_PLACE_ID?.trim() || 'ChIJ99Yesx0OdkgRM0azRWAqYqM';
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
