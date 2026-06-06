interface RateLimitOptions {
  /** Max requests allowed within `windowMs` */
  limit: number;
  /** Sliding window in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

function prune(bucket: Bucket, now: number, windowMs: number) {
  const cutoff = now - windowMs;
  bucket.hits = bucket.hits.filter((t) => t > cutoff);
}

/**
 * Simple sliding-window in-memory rate limit.
 * Good enough for a single Node process; resets on server restart.
 * For multi-instance, swap with Redis-backed limiter (interface-compatible).
 */
export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }
  prune(bucket, now, opts.windowMs);

  if (bucket.hits.length >= opts.limit) {
    const oldest = bucket.hits[0];
    return {
      ok: false,
      remaining: 0,
      resetAt: oldest + opts.windowMs,
    };
  }

  bucket.hits.push(now);
  return {
    ok: true,
    remaining: opts.limit - bucket.hits.length,
    resetAt: now + opts.windowMs,
  };
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'fakeinbox.com',
  'maildrop.cc',
  'dispostable.com',
  'mintemail.com',
  'getairmail.com',
]);

export function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return DISPOSABLE_DOMAINS.has(domain);
}

const URL_REGEX = /\bhttps?:\/\/\S+/gi;

export function hasTooManyLinks(text: string, max = 2): boolean {
  const matches = text.match(URL_REGEX);
  return !!matches && matches.length > max;
}

export function hasSpamKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  const flags = [
    'seo services',
    'backlink',
    'crypto investment',
    'binary options',
    'weight loss',
    'buy followers',
    'viagra',
    'casino bonus',
  ];
  return flags.some((kw) => lower.includes(kw));
}
