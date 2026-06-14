import { NextResponse } from "next/server";

import { getClientIp } from "@/lib/client-ip";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

// Abuse controls: max submissions per IP per window.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  // 1) Rate limit per IP (defense against spam/abuse).
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2) Honeypot: real users never fill the hidden "company" field.
  // Bots that auto-fill every input do. Silently accept so we don't tip them off.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 3) Validate the actual fields.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 }
    );
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // No email provider configured yet → graceful fallback.
  // The form will prompt the visitor to email directly.
  // (Don't log submitter name/email here — avoid writing PII to server logs.)
  if (!apiKey || !to) {
    console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — fallback.");
    return NextResponse.json({ ok: true, fallback: true });
  }

  try {
    // Imported lazily so the app builds/runs without the env configured.
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Strip control characters from the name before putting it in the subject
    // line. Resend's JSON API isn't vulnerable to SMTP header injection, but a
    // single-line, control-char-free subject is correct defense-in-depth.
    const subjectName = name.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio contact from ${subjectName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
