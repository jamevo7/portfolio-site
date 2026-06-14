/**
 * Resolve a *trustworthy* client IP for abuse controls (rate limiting).
 *
 * SECURITY: `X-Forwarded-For` is attacker-controllable — a caller can send any
 * value and proxies only *append* to it. The LEFT-most entry is therefore
 * whatever the client claims; trusting it lets an attacker forge a fresh
 * identity per request and sail straight past per-IP rate limits. We instead
 * read the entry our own infrastructure appended, counting back from the right:
 *
 *   client → [ trusted proxy ] → app
 *   XFF: "<forged>, <forged>, <REAL ip appended by trusted proxy>"
 *                               └── this is the one we trust
 *
 * `TRUSTED_PROXY_HOPS` (default 1) is the number of proxies between the public
 * internet and this app — 1 on Vercel. Increase it if you add another proxy in
 * front (e.g. a CDN ahead of Vercel). Set it too low and the IP becomes
 * spoofable again; too high and unrelated clients collapse into one bucket.
 */
export function getClientIp(req: Request): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1);

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const chain = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (chain.length > 0) {
      // Right-most is the hop closest to us; step back by the proxies we trust.
      return chain[Math.max(0, chain.length - hops)]!;
    }
  }

  // Set by the platform / reverse proxy (e.g. Vercel), not by the client.
  const realIp = req.headers.get("x-real-ip");
  return realIp ? realIp.trim() : "unknown";
}
