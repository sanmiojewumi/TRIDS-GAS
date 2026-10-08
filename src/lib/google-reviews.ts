import { createHash } from 'crypto';
import { db } from './db';
import { sendReviewNotificationEmail } from './email';
import { GOOGLE_PLACE_ID, GOOGLE_REVIEWS_URL } from './site';

export const GOOGLE_REVIEW_ID_PREFIX = 'gglrev_';

type GooglePlaceReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  time?: number;
  relative_time_description?: string;
};

const globalForGoogleReviews = globalThis as unknown as {
  tridsGoogleReviewSyncAt?: number;
};

function reviewId(review: GooglePlaceReview): string {
  return `${GOOGLE_REVIEW_ID_PREFIX}${createHash('sha256')
    .update(`${review.author_name || ''}|${review.time || ''}|${review.text || ''}`)
    .digest('hex')}`;
}

function reviewText(review: GooglePlaceReview): string {
  const text = review.text?.trim();
  if (text) return text;
  const stars = Math.min(5, Math.max(0, Number(review.rating) || 0));
  return `Rated ${stars} star${stars === 1 ? '' : 's'} on Google.`;
}

export async function syncGoogleReviews(options?: {
  notifyNew?: boolean;
  force?: boolean;
}): Promise<{
  checked: number;
  imported: number;
  notified: number;
  skipped?: string;
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim() || GOOGLE_PLACE_ID;
  if (!apiKey) {
    return { checked: 0, imported: 0, notified: 0, skipped: 'GOOGLE_PLACES_API_KEY is not set' };
  }

  const now = Date.now();
  if (!options?.force && globalForGoogleReviews.tridsGoogleReviewSyncAt && now - globalForGoogleReviews.tridsGoogleReviewSyncAt < 30 * 60 * 1000) {
    return { checked: 0, imported: 0, notified: 0, skipped: 'Recently synced' };
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'name,url,rating,user_ratings_total,reviews');
  url.searchParams.set('reviews_sort', 'newest');
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString(), { cache: 'no-store' });
  const data = (await response.json()) as {
    status?: string;
    error_message?: string;
    result?: { reviews?: GooglePlaceReview[] };
  };

  if (data.status !== 'OK') {
    throw new Error(data.error_message || data.status || 'Places lookup failed');
  }

  globalForGoogleReviews.tridsGoogleReviewSyncAt = now;

  const reviews = Array.isArray(data.result?.reviews) ? data.result.reviews : [];
  const knownCount = await db.testimonial.count({
    where: { id: { startsWith: GOOGLE_REVIEW_ID_PREFIX } },
  });
  const isBaseline = knownCount === 0;
  let imported = 0;
  let notified = 0;

  for (const review of reviews) {
    const id = reviewId(review);
    const existing = await db.testimonial.findUnique({ where: { id }, select: { id: true } });
    const posted = review.time
      ? new Date(review.time * 1000).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : review.relative_time_description || 'Google';
    const payload = {
      customerName: review.author_name || 'Google reviewer',
      review: reviewText(review),
      rating: Math.min(5, Math.max(0, Number(review.rating) || 0)),
      service: 'Google review',
      location: 'Google',
      published: true,
      date: posted,
    };

    await db.testimonial.upsert({
      where: { id },
      create: { id, ...payload },
      update: payload,
    });

    if (existing) continue;
    imported += 1;

    if (isBaseline || options?.notifyNew === false) continue;

    await sendReviewNotificationEmail({
      source: 'google',
      customerName: payload.customerName,
      rating: payload.rating,
      service: 'Google review',
      location: review.relative_time_description || posted,
      review: payload.review,
      published: true,
      permalink: GOOGLE_REVIEWS_URL,
    });
    notified += 1;
  }

  return { checked: reviews.length, imported, notified };
}

export async function checkGoogleReviews() {
  return syncGoogleReviews({ notifyNew: true, force: true });
}
