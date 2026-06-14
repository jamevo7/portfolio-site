import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy with a per-request nonce.
 *
 * Generating a fresh nonce per response lets us drop 'unsafe-inline' from
 * script-src in production: only scripts carrying this exact nonce execute.
 * Next.js reads the nonce from the request's CSP header and stamps it onto its
 * own bootstrap/hydration scripts automatically; our root layout forwards the
 * same nonce to next-themes' inline script (see app/layout.tsx).
 *
 * Trade-off: reading the nonce in the layout opts pages into dynamic rendering.
 *
 * Dev keeps 'unsafe-inline'/'unsafe-eval' (and ws:) so HMR and the error
 * overlay keep working; the strict, nonce-only policy applies in production.
 *
 * 'unsafe-inline' is retained for *style-src* only — Next.js / next/font inject
 * inline styles, and style injection is a far lower-risk sink than scripts.
 */
const isDev = process.env.NODE_ENV !== "production";

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  const scriptSrc = isDev
    ? `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const csp =
    [
      `default-src 'self'`,
      `base-uri 'self'`,
      scriptSrc,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: blob:`,
      `font-src 'self'`,
      `connect-src 'self'${isDev ? " ws:" : ""}`,
      `frame-ancestors 'none'`,
      `form-action 'self'`,
      `object-src 'none'`,
      `upgrade-insecure-requests`,
    ].join("; ") + ";";

  // The CSP must be on the *request* headers for Next.js to discover the nonce
  // and apply it to framework scripts; `x-nonce` lets our layout reuse it.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  // HTML responses only. Skip API routes (they manage their own headers),
  // Next internals, and static assets — none of which need a nonce'd CSP.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
