/* ============================================================
   RATE LIMITING
   ------------------------------------------------------------
   A fixed-window in-memory limiter. Good enough to stop casual
   abuse of the public forms on a single instance.

   ⚠️ PRODUCTION: swap the Map for a shared store (Upstash Redis,
   Vercel KV, Cloudflare Durable Objects) so limits hold across
   serverless instances. The `check()` signature stays the same.
   ============================================================ */

interface Bucket {
  count: number;
  expiresAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowSeconds = 600 }: { limit?: number; windowSeconds?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.expiresAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);

  if (!existing || existing.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.expiresAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}
