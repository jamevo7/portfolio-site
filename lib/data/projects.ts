/**
 * Projects section + per-project detail pages.
 *
 * NOTE: every field below is realistic *placeholder* data — company names,
 * problems, metrics and copy are all dummy text meant to be swapped for the
 * real thing. The shape is the contract: the My Work bento, the `/work/[slug]`
 * detail pages, and the `/api/resume` endpoint all read from here, so keep the
 * fields populated (use "#" for links you don't have yet).
 */

import { BellRing, Rocket, Search, ShoppingCart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** A single headline number on a project's Impact section. */
export type ProjectMetric = { value: string; label: string };

export type Project = {
  /**
   * Set true ONLY for real, verified work. The resume API (`/api/resume`) serves
   * `real: true` projects and skips everything else, so placeholder/showcase
   * entries can never leak into a machine-readable resume as fabricated facts.
   * Flip this to true as you replace the dummy content with your actual work.
   */
  real?: boolean;
  /** URL slug — drives `/work/[slug]`. Keep kebab-case and unique. */
  slug: string;
  title: string;
  company: string;
  /** Detail-page nav label — the specific problem phrase, e.g. "Headcount at Amazon". */
  navProblemLabel: string;
  role?: string;
  period?: string;
  /** One-liner used in tile alt text and page subhead. */
  blurb: string;
  /** Fuller paragraph — consumed by the resume API. */
  description: string;
  tech: string[];
  /** Headline impact metric — single string, consumed by the resume API. */
  highlight: string;
  /** Supporting impact points shown as a list on the detail page. */
  highlights: string[];

  /** Detail-page content. */
  problem: { heading: string; body: string[] };
  impact: { summary: string; metrics: ProjectMetric[] };
  preview: { caption: string };

  // Tile cover (UI-only).
  tag?: string;
  icon?: LucideIcon;

  // Placeholder links — swap for real repos/demos or leave as "#".
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "headcount-at-amazon",
    title: "Capacity Planning Platform",
    company: "Amazon",
    navProblemLabel: "Headcount at Amazon",
    role: "Senior Software Engineer",
    period: "2023 — 2024",
    blurb:
      "Turned a quarterly headcount spreadsheet scramble into a live, scenario-driven model.",
    description:
      "Placeholder: an internal capacity-planning platform that replaced a manual quarterly headcount spreadsheet process with a live, scenario-driven model adopted across four partner orgs.",
    tech: ["React", "TypeScript", "GraphQL", "AWS", "PostgreSQL"],
    highlight: "Cut the planning cycle from 6 weeks to 4 days",
    highlights: [
      "Cut the planning cycle from 6 weeks to 4 days",
      "Adopted by 4 partner orgs in a single quarter",
      "Surfaced ~$1.2M in reallocatable budget",
    ],
    problem: {
      heading: "Headcount at Amazon",
      body: [
        "Placeholder problem statement. Every quarter, planning leads stitched headcount together by hand across a sprawl of spreadsheets — each org with its own copy, its own formulas, and its own version of the truth.",
        "By the time numbers were reconciled, they were already stale, and there was no safe way to model a what-if without breaking someone else's sheet.",
      ],
    },
    impact: {
      summary:
        "Placeholder impact summary — what shifted once the platform shipped.",
      metrics: [
        { value: "6 wks → 4 days", label: "planning cycle" },
        { value: "4 orgs", label: "adopted it" },
        { value: "$1.2M", label: "budget surfaced" },
      ],
    },
    preview: { caption: "An animated product walkthrough will live here." },
    tag: "INTERNAL TOOLING",
    icon: Users,
    repo: "#",
    demo: "#",
  },
  {
    slug: "checkout-at-shopify",
    title: "One-Tap Checkout",
    company: "Shopify",
    navProblemLabel: "Checkout Friction at Shopify",
    role: "Software Engineer",
    period: "2022 — 2023",
    blurb:
      "Collapsed a five-step checkout into a single confident tap for returning buyers.",
    description:
      "Placeholder: a one-tap checkout flow for returning buyers that removed redundant address and payment steps, cutting drop-off on the highest-intent part of the funnel.",
    tech: ["Next.js", "TypeScript", "Stripe", "Redis", "Vercel"],
    highlight: "Lifted mobile conversion by 18%",
    highlights: [
      "Lifted mobile conversion by 18%",
      "Removed 3 of 5 checkout steps for return buyers",
      "Rolled out to 10k+ merchant storefronts",
    ],
    problem: {
      heading: "Checkout Friction at Shopify",
      body: [
        "Placeholder problem statement. Returning buyers were re-entering information the platform already knew, and each extra field was another chance to abandon the cart.",
        "Mobile was the worst offender — small screens, slow thumbs, and a checkout built for desktop assumptions.",
      ],
    },
    impact: {
      summary:
        "Placeholder impact summary — the funnel after the redesign shipped.",
      metrics: [
        { value: "+18%", label: "mobile conversion" },
        { value: "5 → 2", label: "checkout steps" },
        { value: "10k+", label: "storefronts live" },
      ],
    },
    preview: { caption: "An animated product walkthrough will live here." },
    tag: "GROWTH / PAYMENTS",
    icon: ShoppingCart,
    repo: "#",
    demo: "#",
  },
  {
    slug: "alerts-at-datadog",
    title: "Signal Prioritization Engine",
    company: "Datadog",
    navProblemLabel: "Alert Fatigue at Datadog",
    role: "Software Engineer",
    period: "2021 — 2022",
    blurb:
      "Ranked the noise so on-call engineers saw the alerts that actually mattered first.",
    description:
      "Placeholder: a signal-prioritization engine that scored and grouped alerts by likely impact, dramatically reducing pager noise for on-call teams.",
    tech: ["Go", "Kafka", "ClickHouse", "Kubernetes", "Python"],
    highlight: "Reduced low-value pages by 64%",
    highlights: [
      "Reduced low-value pages by 64%",
      "Grouped related alerts into single incidents",
      "Cut mean time-to-acknowledge nearly in half",
    ],
    problem: {
      heading: "Alert Fatigue at Datadog",
      body: [
        "Placeholder problem statement. On-call engineers were drowning — hundreds of pages a week, most of them noise, the signal buried somewhere in the middle.",
        "When everything is urgent, nothing is, and the alerts that genuinely mattered were getting acknowledged late.",
      ],
    },
    impact: {
      summary:
        "Placeholder impact summary — on-call life after prioritization landed.",
      metrics: [
        { value: "-64%", label: "low-value pages" },
        { value: "~2x", label: "faster to ack" },
        { value: "1 incident", label: "per alert storm" },
      ],
    },
    preview: { caption: "An animated product walkthrough will live here." },
    tag: "OBSERVABILITY",
    icon: BellRing,
    repo: "#",
    demo: "#",
  },
  {
    slug: "onboarding-at-stripe",
    title: "Guided Activation Flow",
    company: "Stripe",
    navProblemLabel: "Onboarding Drop-off at Stripe",
    role: "Software Engineer",
    period: "2020 — 2021",
    blurb:
      "Replaced a blank dashboard with a guided path to a developer's first successful charge.",
    description:
      "Placeholder: a guided activation flow that walked new developers from signup to their first successful API charge, reducing time-to-value and early churn.",
    tech: ["React", "TypeScript", "Ruby", "Rails", "PostgreSQL"],
    highlight: "Doubled day-one activation",
    highlights: [
      "Doubled day-one activation",
      "Cut time-to-first-charge from days to minutes",
      "Reduced first-week support tickets by 35%",
    ],
    problem: {
      heading: "Onboarding Drop-off at Stripe",
      body: [
        "Placeholder problem statement. New developers landed on an empty dashboard with a thousand options and no obvious first step, and many never made it to their first charge.",
        "The gap between signing up and seeing value was measured in days — long enough for most to drift away.",
      ],
    },
    impact: {
      summary:
        "Placeholder impact summary — activation after the guided flow shipped.",
      metrics: [
        { value: "2x", label: "day-one activation" },
        { value: "days → min", label: "to first charge" },
        { value: "-35%", label: "week-one tickets" },
      ],
    },
    preview: { caption: "An animated product walkthrough will live here." },
    tag: "DEVELOPER EXPERIENCE",
    icon: Rocket,
    repo: "#",
    demo: "#",
  },
  {
    slug: "search-at-spotify",
    title: "Semantic Search Revamp",
    company: "Spotify",
    navProblemLabel: "Search Relevance at Spotify",
    role: "Software Engineer",
    period: "2019 — 2020",
    blurb:
      "Taught search to understand intent, not just match the letters a listener typed.",
    description:
      "Placeholder: a semantic search revamp that moved beyond keyword matching to intent understanding, surfacing the right track, artist, or playlist from fuzzy queries.",
    tech: ["Python", "Elasticsearch", "PyTorch", "Scala", "GCP"],
    highlight: "Improved search success rate by 27%",
    highlights: [
      "Improved search success rate by 27%",
      "Halved 'no results' queries on misspellings",
      "Served sub-100ms results at full catalog scale",
    ],
    problem: {
      heading: "Search Relevance at Spotify",
      body: [
        "Placeholder problem statement. Listeners knew what they wanted but not always how to spell it, and keyword search punished every typo with a wall of nothing.",
        "Fuzzy, half-remembered queries — a lyric, a vibe, a misremembered title — fell straight through the cracks.",
      ],
    },
    impact: {
      summary:
        "Placeholder impact summary — relevance after the semantic revamp.",
      metrics: [
        { value: "+27%", label: "search success" },
        { value: "-50%", label: "'no results'" },
        { value: "<100ms", label: "at catalog scale" },
      ],
    },
    preview: { caption: "An animated product walkthrough will live here." },
    tag: "SEARCH / ML",
    icon: Search,
    repo: "#",
    demo: "#",
  },
];

/** All project slugs — used by `generateStaticParams` and the sitemap. */
export const projectSlugs = projects.map((p) => p.slug);

/** Look up a project by slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** 1-based position of a project, for the schematic cover index (01, 02…). */
export function getProjectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug) + 1;
}
