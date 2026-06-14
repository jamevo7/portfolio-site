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

// Hard cap on tracked keys. Even with a trustworthy client IP, a large botnet
// (or a misconfigured proxy) could otherwise grow this map without bound and
// exhaust process memory. 10k distinct IPs per window is far beyond legitimate
// traffic for this site, so the cap only ever bites under abuse.
const MAX_KEYS = 10_000;

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
    // Adding a brand-new key? Make sure we stay within the memory budget first.
    if (!entry) ensureCapacity(now);
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

// Enforce the hard cap before inserting a new key. First reclaim anything that
// has already expired; if we're still at the limit, evict oldest-inserted keys
// (Map preserves insertion order) so memory stays bounded under abuse.
function ensureCapacity(now: number) {
  if (store.size < MAX_KEYS) return;
  for (const [key, entry] of store) {
    if (now > entry.reset) store.delete(key);
  }
  while (store.size >= MAX_KEYS) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}
