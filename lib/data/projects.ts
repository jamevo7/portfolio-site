/**
 * Projects section. The SEMI Association entry is real; the remaining projects
 * are realistic *dummy* data aligned to James' skill set. Swap the placeholder
 * repo/demo links for real URLs or remove them.
 */

import { Database, Globe, ShieldCheck, Terminal, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  // Headline impact metric — single string, consumed by the resume API.
  highlight: string;
  // 2–3 "star" impact points shown on the project card (first mirrors highlight).
  highlights: string[];
  // Optional role/timeframe — shown for projects tied to an org/title.
  role?: string;
  period?: string;
  // Placeholder links — swap for real repos/demos or remove.
  repo?: string;
  demo?: string;
  // Blueprint-cover metadata (UI-only; safe to omit on any project).
  tag?: string; // short domain label on the cover, e.g. "IDENTITY TOOLING"
  icon?: LucideIcon; // schematic glyph drawn on the cover
  note?: string; // warm, handwritten-feel margin note
};

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
    highlights: [
      "80% faster data gathering · 60% faster processing via GenAI",
      "Directed a team of 5 across pipeline & dashboard",
      "Power BI analytics for 3,500+ semiconductor companies",
    ],
    repo: "#",
    demo: "#",
    tag: "DATA PLATFORM",
    icon: Database,
    note: "shipped & in production",
  },
  {
    title: "Auth0 MCP Server",
    blurb: "Model Context Protocol server exposing internal tools to LLM agents.",
    description:
      "A TypeScript MCP server that securely surfaces Google Workspace and Gainsight data to internal AI assistants, with scoped OAuth, audit logging, and rate limiting — letting the team query account context in natural language.",
    tech: ["TypeScript", "Node.js", "MCP", "OAuth 2.0", "REST APIs"],
    highlight: "Cut routine account-lookup time by ~60%",
    highlights: [
      "Cut routine account-lookup time by ~60%",
      "Scoped OAuth, audit logging & rate limiting",
      "Natural-language access to Workspace + Gainsight",
    ],
    repo: "#",
    demo: "#",
    tag: "IDENTITY TOOLING",
    icon: ShieldCheck,
    note: "the one I'm proudest of",
  },
  {
    title: "Umi — Sushi Pop-Up & Reservations",
    blurb: "Full-stack site for a rotating sushi pop-up with live reservations.",
    description:
      "A mobile-responsive web app featuring dynamic menu pages, a reservation flow with capacity limits, and an admin dashboard for menu and booking management. Built with the App Router and a MongoDB-backed API.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    highlight: "200+ reservations handled in first month",
    highlights: [
      "200+ reservations handled in first month",
      "Reservation flow with live capacity limits",
      "Admin dashboard for menus & bookings",
    ],
    repo: "#",
    demo: "#",
    tag: "FULL-STACK WEB",
    icon: UtensilsCrossed,
    note: "nights & weekends build",
  },
  {
    title: "Auth0 Tenant Health CLI",
    blurb: "CLI that audits an Auth0 tenant against security best practices and outputs a scored report.",
    description:
      "A Node.js CLI tool that connects to the Auth0 Management API, audits tenant configuration (MFA enforcement, token lifetimes, Refresh Token Rotation, brute-force protection, and more) against security best practices, and outputs a weighted health score with remediation guidance — runnable in CI or as a one-off check.",
    tech: ["TypeScript", "Node.js", "Auth0 Management API", "Commander.js"],
    highlight: "Catches ~12 common misconfigs in under 10 seconds",
    highlights: [
      "Catches ~12 common misconfigs in under 10 seconds",
      "Weighted scoring with per-finding remediation steps",
      "CI-ready — exits non-zero on critical failures",
    ],
    repo: "#",
    tag: "IDENTITY TOOLING",
    icon: Terminal,
    note: "runs in CI",
  },
  {
    title: "This Portfolio",
    blurb: "The site you're on — designed and built from scratch with Next.js, Tailwind v4, and Framer Motion.",
    description:
      "A hand-crafted portfolio and resume API built with Next.js App Router, TypeScript strict mode, Tailwind CSS v4, and Framer Motion. Features a blueprint-style project bento, interactive experience timeline, identity card with typewriter animation, and a `/api/resume` endpoint for programmatic access.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    highlight: "Built in public — see the commit history",
    highlights: [
      "Blueprint bento grid with hover-reveal project cards",
      "Interactive timeline with animated identity card",
      "Resume API endpoint at /api/resume",
    ],
    demo: "#",
    repo: "#",
    tag: "PERSONAL SITE",
    icon: Globe,
    note: "you're looking at it",
  },
];
