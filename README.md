# James Vo — Portfolio

A personal portfolio site for James Vo, Technical Account Manager at Okta.
Clean, minimal, recruiter-friendly, with dark/light mode and a working contact form.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**-style components (Radix primitives)
- **Framer Motion** — subtle scroll-reveal animations
- **next-themes** — persisted dark/light mode
- **react-hook-form** + **zod** — contact form validation
- **Resend** — contact-form email delivery (optional)
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All site content lives in [`lib/data.ts`](lib/data.ts) — profile, about, experience,
projects, skills, certifications, and education. Edit that one file to update the site.

**Before going live, update:**

- `profile.links.linkedin` / `profile.links.github` — currently placeholders.
- The `projects` array — these are realistic **placeholder** projects. Swap in your
  real work and replace the `#` repo/demo links.
- `siteUrl` in [`app/layout.tsx`](app/layout.tsx), [`app/sitemap.ts`](app/sitemap.ts),
  and [`app/robots.ts`](app/robots.ts) with your real domain.

The resume PDF is served from `public/resume.pdf` (the "Download Resume" button).

## Contact form

The form posts to [`app/api/contact/route.ts`](app/api/contact/route.ts).

- **Without** `RESEND_API_KEY` set, it works out of the box but shows a message asking
  visitors to email you directly (no email is sent).
- **To actually send email**, copy `.env.example` to `.env.local` and add a
  [Resend](https://resend.com) API key:

  ```bash
  cp .env.example .env.local
  ```

  ```env
  RESEND_API_KEY=re_...
  CONTACT_TO_EMAIL=you@example.com
  CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
  ```

  Use Resend's `onboarding@resend.dev` sandbox sender until you verify your own domain.

## Security

- **Security headers** are set for every route in [`next.config.ts`](next.config.ts):
  Content-Security-Policy, HSTS, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy`. The CSP is
  stricter in production (no `unsafe-eval`); dev relaxes it so HMR works.
- **Contact form abuse controls** in [`app/api/contact/route.ts`](app/api/contact/route.ts):
  - A **honeypot** field (`company`) — bots that auto-fill it are silently dropped.
  - **Rate limiting** — 5 submissions per IP per 10 minutes
    ([`lib/rate-limit.ts`](lib/rate-limit.ts)).
    > ⚠️ The limiter is **in-memory**, so on serverless (e.g. Vercel) each instance
    > counts independently — it's best-effort. For a hard cross-instance limit, back
    > it with a shared store such as [Upstash Redis](https://github.com/upstash/ratelimit-js).
- **Dependencies**: `npm audit` reports 0 vulnerabilities (a transitive `postcss`
  advisory is pinned out via an `overrides` entry in `package.json`).

### Resume PII (decide before going live)

`public/resume.pdf` is publicly downloadable and currently contains a phone number and
personal email — fine if intentional, but it's exposed to scrapers. Options: omit the
phone number from the public copy, gate the resume behind the contact form, or leave
it as-is.

## Deploy (Vercel)

```bash
npx vercel
```

Add the same environment variables in the Vercel project settings. Update `siteUrl` to
your production domain so OpenGraph tags, the sitemap, and robots.txt resolve correctly.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run start` | Run the production build     |
| `npm run lint`  | Lint                         |
