/**
 * GET /api/resume — James Vo's resume, served as an API.
 *
 * Yes, this is a portfolio easter egg. It's also a real, content-negotiated
 * endpoint: the same data that renders the site (`lib/data.ts`) is serialized
 * here into the JSON Resume standard or plain text, depending on what the
 * caller asks for.
 *
 *   curl https://<site>/api/resume                      # JSON Resume
 *   curl https://<site>/api/resume?format=txt           # plain text
 *   curl https://<site>/api/resume?section=work,skills  # just those sections
 *   curl -H "Accept: text/plain" https://<site>/api/resume
 *
 * Format resolution: `?format=` wins, otherwise the `Accept` header, otherwise
 * JSON. `?section=` filters the JSON output to a comma-separated subset.
 * Responses are cached and CORS-open so anyone can fetch them.
 */

import { NextResponse } from "next/server";

import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";
import {
  isResumeSection,
  pickSections,
  RESUME_SECTIONS,
  toJsonResume,
  toPlainText,
  type ResumeSection,
} from "@/lib/resume";

const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60 * 1000; // 60 requests / minute / IP

// Cache at the CDN edge for an hour; serve stale for a day while revalidating.
const CACHE_CONTROL = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Accept, Content-Type",
};

/** Resolve the desired format from `?format=` then `Accept`, defaulting to JSON. */
function resolveFormat(req: Request): "json" | "txt" {
  const url = new URL(req.url);
  const param = url.searchParams.get("format")?.toLowerCase();
  if (param === "txt" || param === "text" || param === "plain") return "txt";
  if (param === "json") return "json";

  const accept = req.headers.get("accept") ?? "";
  if (accept.includes("text/plain") && !accept.includes("application/json")) {
    return "txt";
  }
  return "json";
}

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`resume:${ip}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      {
        status: 429,
        headers: { ...CORS, "Retry-After": String(limit.retryAfter) },
      }
    );
  }

  const rateHeaders = {
    "X-RateLimit-Limit": String(RATE_LIMIT),
    "X-RateLimit-Remaining": String(limit.remaining),
  };

  const format = resolveFormat(req);

  if (format === "txt") {
    return new NextResponse(toPlainText(), {
      status: 200,
      headers: {
        ...CORS,
        ...rateHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  }

  // Optional `?section=` filter (JSON only). Validate every requested section
  // and fail loudly with the allowed values, rather than silently dropping
  // typos — a documented, predictable error is part of a good API.
  const url = new URL(req.url);
  const sectionParam = url.searchParams.get("section");
  let body: object = toJsonResume();
  if (sectionParam) {
    const requested = sectionParam
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      // There are only 6 valid sections; cap parsing so a giant `?section=`
      // can't blow up the array (or the echoed error below).
      .slice(0, RESUME_SECTIONS.length * 2);
    const invalid = requested.filter((s) => !isResumeSection(s));
    if (invalid.length > 0) {
      // The response is JSON + nosniff (not HTML), so this isn't an XSS sink,
      // but still don't reflect unbounded/long caller input back verbatim.
      const shown = invalid.slice(0, 5).map((s) => s.slice(0, 32));
      const more = invalid.length > shown.length ? ", …" : "";
      return NextResponse.json(
        {
          error: `Unknown section(s): ${shown.join(", ")}${more}.`,
          validSections: RESUME_SECTIONS,
        },
        { status: 400, headers: { ...CORS, ...rateHeaders } }
      );
    }
    body = pickSections(requested as ResumeSection[]);
  }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      ...CORS,
      ...rateHeaders,
      "Cache-Control": CACHE_CONTROL,
    },
  });
}

/** CORS preflight so browsers can fetch the resume cross-origin. */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
