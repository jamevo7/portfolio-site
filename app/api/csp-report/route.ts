import { NextResponse } from "next/server";

import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";

/**
 * CSP violation sink. Browsers POST here (via the `report-uri` directive) when
 * the policy blocks something — which, given there are no inline-script sinks in
 * the app, would most likely mean an injection attempt or a policy regression.
 * We log a concise, bounded summary so it's at least visible.
 *
 * This endpoint is unauthenticated and anyone can POST to it, so it's hardened:
 * rate-limited per IP, oversized bodies are dropped, and we log only two bounded
 * fields (never the full attacker-controlled report). Always returns 204 so it
 * leaks nothing.
 */
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 1000;
const MAX_BODY = 8 * 1024; // bytes — ignore anything larger

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`csp:${ip}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limit.ok) return new NextResponse(null, { status: 429 });

  let text: string;
  try {
    text = await req.text();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  if (text.length > MAX_BODY) return new NextResponse(null, { status: 204 });

  try {
    const json = JSON.parse(text);
    // Support the legacy report-uri shape ({ "csp-report": {…} }) and the newer
    // report-to batch ([{ type, body }]).
    const reports = Array.isArray(json) ? json : [json];
    for (const r of reports.slice(0, 10)) {
      const body = r?.body ?? r?.["csp-report"] ?? r ?? {};
      const directive = String(
        body["effective-directive"] ??
          body.effectiveDirective ??
          body["violated-directive"] ??
          "?"
      ).slice(0, 80);
      const blocked = String(
        body["blocked-uri"] ?? body.blockedURL ?? "?"
      ).slice(0, 200);
      // Deliberately bounded — never log the full, attacker-controlled report.
      console.warn(`[csp-report] directive=${directive} blocked=${blocked}`);
    }
  } catch {
    // Malformed report — ignore.
  }

  return new NextResponse(null, { status: 204 });
}
