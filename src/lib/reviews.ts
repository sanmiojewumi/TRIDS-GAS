import { db } from './db';
import { GOOGLE_REVIEW_ID_PREFIX, syncGoogleReviews } from './google-reviews';

const HIDDEN_SEED_IDS = ['review-1', 'review-2', 'review-3', 'review-4'];

export type PublicReview = {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  service: string;
  location?: string | null;
  date: string;
  source: 'google' | 'website';
};

async function publishWaitingReviews() {
  try {
    await db.testimonial.updateMany({
      where: {
        published: false,
        id: { notIn: HIDDEN_SEED_IDS },
        customerName: { not: 'Notification check' },
        review: { not: '' },
      },
      data: { published: true },
    });
  } catch (error) {
    console.error('Could not publish waiting reviews.', error);
  }
}

export async function getPublishedReviewSummary(): Promise<{
  ratingValue: number;
  reviewCount: number;
} | null> {
  try {
    const rows = await db.testimonial.findMany({
      where: {
        published: true,
        id: { notIn: HIDDEN_SEED_IDS },
        customerName: { not: 'Notification check' },
      },
      select: { rating: true },
    });
    if (!rows.length) return null;
    const total = rows.reduce((sum, row) => sum + (row.rating || 0), 0);
    return {
      ratingValue: Number((total / rows.length).toFixed(1)),
      reviewCount: rows.length,
    };
  } catch (error) {
    console.error('Error loading review summary.', error);
    return null;
  }
}

export async function getPublishedReviews(limit?: number): Promise<PublicReview[]> {
  await publishWaitingReviews();
  await Promise.race([
    syncGoogleReviews({ notifyNew: false }).catch((error) => {
      console.error('Google review sync skipped.', error);
      return null;
    }),
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]);

  try {
    const rows = await db.testimonial.findMany({
      where: {
        published: true,
        id: { notIn: HIDDEN_SEED_IDS },
        customerName: { not: 'Notification check' },
      },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: limit } : {}),
    });

    return rows.map((row) => ({
      id: row.id,
      customerName: row.customerName,
      review: row.review,
      rating: row.rating,
      service: row.service,
      location: row.location,
      date:
        row.date ||
        new Date(row.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      source: row.id.startsWith(GOOGLE_REVIEW_ID_PREFIX) || row.service === 'Google review' ? 'google' : 'website',
    }));
  } catch (error) {
    console.error('Error loading published reviews.', error);
    return [];
  }
}
