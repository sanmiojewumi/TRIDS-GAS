import { SITE_URL } from './site';

export const INDEXNOW_KEY = '9c4e2a7b1d8f6e3c5a0b4d7e9f1c2a8b';

const globalForIndexNow = globalThis as unknown as {
  tridsIndexNowAt?: number;
};

export async function notifyIndexNow(urls: string[]): Promise<void> {
  if (process.env.NODE_ENV === 'development') return;

  const now = Date.now();
  if (globalForIndexNow.tridsIndexNowAt && now - globalForIndexNow.tridsIndexNowAt < 12 * 60 * 60 * 1000) {
    return;
  }

  const unique = Array.from(new Set(urls.filter((url) => url.startsWith(SITE_URL)))).slice(0, 80);
  if (!unique.length) return;

  const host = new URL(SITE_URL).host;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: unique,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(1500),
    });
    if (response.ok || response.status === 202) {
      globalForIndexNow.tridsIndexNowAt = now;
    }
  } catch (error) {
    console.error('IndexNow ping skipped.', error);
  }
}
