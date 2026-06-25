/**
 * Serializes the site's single source of truth (`lib/data.ts`) into portable
 * resume formats. The rendered site and this API share the same data, so the
 * resume can never drift from the page.
 *
 * The JSON output conforms to the JSON Resume standard (https://jsonresume.org/),
 * which means it's interoperable with the wider ecosystem of themes and tools.
 */

import {
  about,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/lib/data";

/** Maps "Feb 2025" → "2025-02" (JSON Resume prefers ISO-8601 dates). */
const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

function isoDate(value: string): string | undefined {
  // "Present" (or anything we can't parse) → undefined, so the field is omitted.
  const match = /^([A-Za-z]{3})[a-z]*\s+(\d{4})$/.exec(value.trim());
  if (!match) return undefined;
  const month = MONTHS[match[1]!.toLowerCase()];
  return month ? `${match[2]}-${month}` : undefined;
}

/**
 * The JSON Resume document, built from `lib/data.ts`.
 * Spec: https://jsonresume.org/schema/
 */
export function toJsonResume() {
  return {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.name,
      label: profile.title,
      email: profile.email,
      url: profile.links.linkedin,
      summary: about.paragraphs.join(" "),
      location: {
        city: "San Francisco",
        region: "CA",
        countryCode: "US",
      },
      profiles: [
        {
          network: "LinkedIn",
          username: "jamesvo",
          url: profile.links.linkedin,
        },
        {
          network: "GitHub",
          username: "jamesvo",
          url: profile.links.github,
        },
      ],
    },
    work: experience.map((job) => ({
      name: job.company,
      position: job.role,
      location: job.location,
      url: job.href,
      startDate: isoDate(job.start),
      endDate: isoDate(job.end), // undefined for "Present"
      highlights: job.bullets,
    })),
    education: [
      {
        institution: education.school,
        area: education.degree.replace(/^B\.S\.\s+in\s+/, ""),
        studyType: "Bachelor of Science",
        score: `GPA ${education.gpa}`,
        endDate: education.year,
      },
    ],
    certificates: certifications.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.year,
    })),
    skills: skills.map((group) => ({
      name: group.label,
      keywords: group.items,
    })),
    // Only real, verified projects reach the resume — placeholder/showcase
    // entries (real !== true) are excluded so the API never asserts fabricated
    // work. See the `real` flag in lib/data/projects.ts.
    projects: projects
      .filter((project) => project.real)
      .map((project) => ({
        name: project.title,
        description: project.description,
        highlights: [project.highlight],
        keywords: project.tech,
        url: project.demo && project.demo !== "#" ? project.demo : undefined,
      })),
    meta: {
      canonical: "/api/resume",
      version: "1.0.0",
      lastModified: new Date().toISOString(),
    },
  };
}

export type JsonResume = ReturnType<typeof toJsonResume>;

/** Top-level resume sections a caller may request via `?section=`. */
export const RESUME_SECTIONS = [
  "basics",
  "work",
  "education",
  "certificates",
  "skills",
  "projects",
] as const;

export type ResumeSection = (typeof RESUME_SECTIONS)[number];

export function isResumeSection(value: string): value is ResumeSection {
  return (RESUME_SECTIONS as readonly string[]).includes(value);
}

/**
 * Returns a resume containing only the requested sections (plus `meta`, which
 * is always included so the response stays self-describing). Order of keys
 * follows the canonical section order, not the order requested.
 */
export function pickSections(sections: ResumeSection[]): Partial<JsonResume> {
  const full = toJsonResume();
  const wanted = new Set<ResumeSection>(sections);
  const result: Partial<JsonResume> = { $schema: full.$schema };
  for (const key of RESUME_SECTIONS) {
    if (wanted.has(key)) {
      // Index across the union of section value types; the key set is fixed.
      (result as Record<string, unknown>)[key] = full[key];
    }
  }
  result.meta = full.meta;
  return result;
}

/** A clean, terminal-friendly plain-text rendering of the resume. */
export function toPlainText(): string {
  const rule = "=".repeat(60);
  const lines: string[] = [];

  lines.push(profile.name.toUpperCase());
  lines.push(profile.title);
  lines.push(`${profile.location}  ·  ${profile.email}`);
  lines.push(`${profile.links.linkedin}  ·  ${profile.links.github}`);
  lines.push("");
  lines.push(rule);
  lines.push("SUMMARY");
  lines.push(rule);
  for (const p of about.paragraphs) lines.push(wrap(p));

  lines.push("");
  lines.push(rule);
  lines.push("EXPERIENCE");
  lines.push(rule);
  for (const job of experience) {
    lines.push(`${job.role} — ${job.company}`);
    lines.push(`${job.start} – ${job.end}  ·  ${job.location}`);
    for (const b of job.bullets) lines.push(`  • ${wrap(b, "    ")}`);
    lines.push("");
  }

  lines.push(rule);
  lines.push("PROJECTS");
  lines.push(rule);
  for (const project of projects.filter((p) => p.real)) {
    lines.push(project.title);
    lines.push(`  ${wrap(project.description, "  ")}`);
    lines.push(`  Tech: ${project.tech.join(", ")}`);
    lines.push(`  Impact: ${project.highlight}`);
    lines.push("");
  }

  lines.push(rule);
  lines.push("SKILLS");
  lines.push(rule);
  for (const group of skills) {
    lines.push(`${group.label}: ${group.items.join(", ")}`);
  }

  lines.push("");
  lines.push(rule);
  lines.push("CERTIFICATIONS");
  lines.push(rule);
  for (const cert of certifications) {
    lines.push(`${cert.name} — ${cert.issuer} (${cert.year})`);
  }

  lines.push("");
  lines.push(rule);
  lines.push("EDUCATION");
  lines.push(rule);
  lines.push(`${education.degree}, ${education.minor}`);
  lines.push(`${education.school} · GPA ${education.gpa} · ${education.year}`);

  return lines.join("\n") + "\n";
}

/** Soft-wraps a paragraph to ~76 cols, indenting continuation lines. */
function wrap(text: string, indent = "", width = 76): string {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = "";
  for (const word of words) {
    if (line.length + word.length + 1 > width) {
      out.push(line);
      line = indent + word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) out.push(line);
  return out.join("\n");
}
