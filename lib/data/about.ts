/**
 * About-section content: bio, quick facts, a compact career strip, and
 * education. Career detail lives in the downloadable resume.
 */

export const about = {
  // Person-first bio. Your resume covers the career detail — this leads with
  // who you are and what drives you. (Draft copy — edit freely.)
  paragraphs: [
    "Hi, I'm James. At my core, I'm someone who likes to build things — and to make them better for the people around me. That instinct shows up in my work, but it's just as true in how I mentor, volunteer, and show up for my community.",
    "By day I'm a Technical Account Manager at Okta, working where identity, security, and customer trust meet — debugging gnarly technical problems and building AI-powered internal tooling to make teams faster. But the throughline of everything I do is people: my teammates, my customers, and the folks coming up behind me.",
    "I studied Management Information Systems with a minor in Computer Science at San Jose State. When I'm not building, you'll usually find me mentoring, volunteering, or chasing down whatever I'm curious about this month.",
  ],
  // Quick facts surfaced beside the bio, rendered as a decoded auth payload.
  facts: [
    { label: "Currently", value: "TAM @ Okta (Auth0)" },
    { label: "Focus", value: "Identity & Security" },
    { label: "Based in", value: "San Francisco, CA" },
    { label: "Open to", value: "Coffee chats & collaboration" },
  ],
} as const;

export const education = {
  degree: "B.S. in Management Information Systems",
  minor: "Minor in Computer Science",
  school: "San Jose State University",
  gpa: "3.77",
  year: "2024",
} as const;

// Compact "where I've been" strip for the About section. Full history (with
// bullets) lives in the downloadable resume — this is just a credibility nod.
export const career = [
  { company: "Okta", period: "2024–Present" },
  { company: "Cisco", period: "2023" },
  { company: "Jabil", period: "2022" },
] as const;
