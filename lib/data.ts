/**
 * Single source of truth for all site content.
 * Real career data is sourced from James' resume; the Projects section uses
 * realistic *dummy* data (the resume's project entry is a template placeholder).
 *
 * Update the placeholder links (LinkedIn / GitHub / project repos) with real URLs.
 */

import type { LucideIcon } from "lucide-react";
import { Cloud, KeyRound, ShieldCheck } from "lucide-react";

export const profile = {
  name: "James Vo",
  firstName: "James",
  title: "Technical Account Manager",
  // A line that ties together security + identity + customer success.
  tagline: "Bridging security, identity, and customer success.",
  location: "San Francisco, CA",
  email: "jamesvo2468@gmail.com",
  // TODO: replace with your real profile URLs
  links: {
    linkedin: "https://www.linkedin.com/in/jamesvo",
    github: "https://github.com/jamesvo",
  },
  resumeHref: "/resume.pdf",
} as const;

export const about = {
  // 2–3 sentence bio synthesized from the resume.
  paragraphs: [
    "I'm a Technical Account Manager at Okta, where I help enterprise customers strengthen their security posture with Auth0 — owning a $17M+ book of business and a 100% contract renewal rate across 30+ accounts.",
    "My work lives at the intersection of identity, customer trust, and engineering: triaging complex issues through API debugging and log analysis, and building AI-powered internal tooling — including MCP servers and Slack automation agents — to make teams faster.",
    "I hold a B.S. in Management Information Systems with a minor in Computer Science from San Jose State, and I'm an Auth0 Certified Developer.",
  ],
  // Quick facts surfaced beside the bio.
  facts: [
    { label: "Currently", value: "TAM @ Okta (Auth0)" },
    { label: "Focus", value: "Identity & Security" },
    { label: "Based in", value: "San Francisco, CA" },
    { label: "Open to", value: "Coffee chats & collaboration" },
  ],
} as const;

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  href?: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Okta",
    role: "Technical Account Manager",
    start: "Feb 2025",
    end: "Present",
    location: "San Francisco, CA",
    href: "https://www.okta.com",
    bullets: [
      "Own a $17M+ cARR book of business across 30+ enterprise accounts, driving Auth0 adoption to strengthen customer security posture and achieving a 100% contract renewal rate.",
      "Resolve complex customer-facing technical issues through API debugging, log analysis, and JavaScript/Auth0 configuration — partnering with Engineering and Product to close gaps and accelerate time-to-resolution.",
      "Built AI-powered internal tooling, including MCP servers (Google Workspace, Gainsight) and Slack automation agents, to streamline AE request workflows.",
      "Mentored 2 incoming TAMs and led intern interviews across 2 consecutive hiring cycles, developing internal and customer-facing training content.",
      "Developed SIPP and outbound playbooks for the Scale team and used Looker analytics to surface Attack Protection upsell opportunities for proactive engagement.",
      "Led an Auth0 customer-facing webinar end-to-end — building the session guide, presenting to engineering and executive audiences, and authoring reference docs adopted across the field team.",
    ],
  },
  {
    company: "Okta",
    role: "Technical Account Management Intern",
    start: "May 2024",
    end: "Aug 2024",
    location: "San Francisco, CA",
    href: "https://www.okta.com",
    bullets: [
      "Drove a 27% increase in subscription renewals and a 24% decrease in churn by composing technical strategy documents on feature adoption and best practices for 5+ accounts.",
      "Collaborated cross-functionally with Engineering and Product to author technical strategy documentation.",
      "Shadowed 5 Technical Account Managers covering accounts of $200K+ ARR and a combined market cap of $1.5B+ across Salesforce and Gainsight.",
    ],
  },
  {
    // TODO: confirm dates and location — placeholder for now.
    company: "Cisco",
    role: "Project Management Intern",
    start: "May 2023",
    end: "Aug 2023",
    location: "San Jose, CA",
    href: "https://www.cisco.com",
    bullets: [
      "Delivered a 70% optimization on excess part mitigation processes and workflows by building and shipping an internal automated dashboard & analysis tool to address $750M+ of excess parts; presented a product demo of functionality and impact to executives and stakeholders.",
      "Collaborated cross-functionally with Supply Chain PMs, Product Ops, and Business Units to identify user pain points with current processes, exposing $5M+ in missed mitigation opportunities.",
      "Yielded a 3.2% accuracy increase of demand-forecasting AI by designing a new stream selection strategy with a mean-variance analysis of 300K+ PLIDs, measuring results via A/B testing.",
    ],
  },
  {
    company: "Jabil",
    role: "Project Management Intern",
    start: "Jul 2022",
    end: "Aug 2022",
    location: "Fremont, CA",
    href: "https://www.jabil.com",
    bullets: [
      "Managed development and launch of 3 features of an internal project management tool: employee verification with the Okta Sessions API, a dynamic timeline, and a ticket-issuing system.",
      "Assisted the Software Development Manager by analyzing user feedback to prioritize product features, sprints, and backlog, and built a product roadmap — leading to a 25% improvement in productivity.",
      "Accelerated the transition from a legacy ERP to a new Critical Manufacturing ERP by 33% by ensuring quality data migration of 20,000+ facility assets through data maps, cleansing, and testing.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  highlight: string;
  // Optional role/timeframe — shown for projects tied to an org/title.
  role?: string;
  period?: string;
  // Placeholder links — swap for real repos/demos or remove.
  repo?: string;
  demo?: string;
};

// The SEMI Association entry is real; the remaining projects are realistic
// *dummy* data aligned to James' skill set.
export const projects: Project[] = [
  {
    title: "SEMI Association — Environmental Data Platform",
    role: "Software Engineer",
    period: "Fall 2023 – Present",
    blurb: "Web app and data pipeline for environmental data of 3,500+ semiconductor companies.",
    description:
      "Launched a Flask web application (deployed on Heroku) with an API endpoint handling JSON POST requests and dynamic file hosting via an AWS S3 bucket. Directed a team of 5 to establish a data pipeline and Power BI dashboard for environmental data of 3,500+ semiconductor companies, enabling data-driven decisions on SEMI regulations.",
    tech: ["Python", "Flask", "Heroku", "AWS S3", "Power BI", "OpenAI API"],
    highlight: "80% faster data gathering · 60% faster processing via GenAI",
  },
  {
    title: "Auth0 MCP Server",
    blurb: "Model Context Protocol server exposing internal tools to LLM agents.",
    description:
      "A TypeScript MCP server that securely surfaces Google Workspace and Gainsight data to internal AI assistants, with scoped OAuth, audit logging, and rate limiting — letting the team query account context in natural language.",
    tech: ["TypeScript", "Node.js", "MCP", "OAuth 2.0", "REST APIs"],
    highlight: "Cut routine account-lookup time by ~60%",
    repo: "#",
    demo: "#",
  },
  {
    title: "Umi — Sushi Pop-Up & Reservations",
    blurb: "Full-stack site for a rotating sushi pop-up with live reservations.",
    description:
      "A mobile-responsive web app featuring dynamic menu pages, a reservation flow with capacity limits, and an admin dashboard for menu and booking management. Built with the App Router and a MongoDB-backed API.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    highlight: "200+ reservations handled in first month",
    repo: "#",
    demo: "#",
  },
  {
    title: "Slack Request Router",
    blurb: "Automation agent that triages and routes AE requests in Slack.",
    description:
      "A Python bot that parses inbound account-executive requests, classifies them, and routes to the right owner with SLA reminders — integrating the Slack API with an internal ticketing backend.",
    tech: ["Python", "Slack API", "FastAPI", "PostgreSQL"],
    highlight: "Reduced first-response time from hours to minutes",
    repo: "#",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Development",
    items: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML",
      "CSS",
      "Go",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      "AWS",
      "Auth0",
      "Postman",
      "REST APIs",
      "GenAI",
      "Looker",
      "Tableau",
      "Salesforce",
      "Jira",
      "Confluence",
      "GitHub",
      "Agile",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  icon: LucideIcon;
};

export const certifications: Certification[] = [
  { name: "Auth0 Certified Developer", issuer: "Okta / Auth0", year: "2026", icon: KeyRound },
  { name: "CompTIA Security+", issuer: "CompTIA", year: "2025", icon: ShieldCheck },
  { name: "Cloud Digital Leader", issuer: "Google", year: "2025", icon: Cloud },
];

export const education = {
  degree: "B.S. in Management Information Systems",
  minor: "Minor in Computer Science",
  school: "San Jose State University",
  gpa: "3.77",
  year: "2024",
} as const;

// In-page navigation anchors.
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
