/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * NOTE: state lives in a single process's memory. That's fine for a low-traffic
 * site and for local/single-instance deployments, but on serverless platforms
 * (e.g. Vercel) each instance has its own counter, so it's best-effort only.
 * For strict limits across instances, back this with a shared store such as
 * Upstash Redis (@upstash/ratelimit).
 */

type Entry = { count: number; reset: number };

const store = new Map<string, Entry>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets (only meaningful when !ok). */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  // New window (or first request for this key).
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    pruneOccasionally(now);
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.reset - now) / 1000),
    };
  }

  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

// Opportunistically drop expired entries so the map doesn't grow unbounded.
let lastPrune = 0;
function pruneOccasionally(now: number) {
  if (now - lastPrune < 60_000) return;
  lastPrune = now;
  for (const [key, entry] of store) {
    if (now > entry.reset) store.delete(key);
  }
}
