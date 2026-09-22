type RateLimitOptions = {
  windowMs: number;
  max: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForSecurity = globalThis as unknown as {
  tridsRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits = globalForSecurity.tridsRateLimits ?? new Map<string, RateLimitEntry>();

if (process.env.NODE_ENV !== 'production') {
  globalForSecurity.tridsRateLimits = rateLimits;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

export function checkRateLimit(
  request: Request,
  scope: string,
  options: RateLimitOptions,
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  current.count += 1;
  rateLimits.set(key, current);

  if (rateLimits.size > 5_000) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(entryKey);
    }
  }

  return {
    allowed: current.count <= options.max,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function cleanText(value: unknown, maxLength: number): string {
  return String(value ?? '').trim().slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function isValidPhone(value: string): boolean {
  return /^[+()\d\s-]{7,25}$/.test(value);
}

export function isValidPostcode(value: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9\s-]{1,11}$/.test(value);
}
