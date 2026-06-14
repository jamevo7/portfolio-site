import type { NextConfig } from "next";

/**
 * Static security headers applied to every response.
 *
 * Content-Security-Policy is intentionally NOT here — it carries a per-request
 * nonce and is set in middleware.ts instead. Defining it statically too would
 * send two CSP headers, which browsers intersect, breaking the nonce policy.
 */
const securityHeaders = [
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
