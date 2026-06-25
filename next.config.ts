import type { NextConfig } from "next";

/**
 * Static Content-Security-Policy.
 *
 * This is a *static* policy (no per-request nonce) so pages can be statically
 * generated and CDN-cached — reading a per-request nonce in the root layout was
 * forcing every page (including the static home page) to render dynamically on
 * each request. For a no-auth brochure with no server-reflected user input the
 * trade is worth it: script-src allows inline (needed for Next's hydration
 * scripts + next-themes' anti-flash script without a nonce), while every other
 * high-value directive stays locked (object-src none, base-uri self,
 * frame-ancestors none, form-action self). Dev additionally needs 'unsafe-eval'
 * and ws: for HMR / the error overlay.
 */
const isDev = process.env.NODE_ENV !== "production";

const csp =
  [
    "default-src 'self'",
    "base-uri 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "frame-ancestors 'none'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
    // Report violations so an injection attempt or policy regression is at least
    // visible (handled by app/api/csp-report). `report-uri` is deprecated but
    // still the most broadly supported, and is environment-agnostic (relative).
    "report-uri /api/csp-report",
  ].join("; ") + ";";

/** Static security headers applied to every response. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Force HTTPS for 2 years (ignored over plain HTTP, e.g. localhost).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator badge (the logo in the corner during dev).
  devIndicators: false,
  async headers() {
    return [
      {
        // Apply to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
