/** Skills + certifications shown in the Skills section. */

import type { LucideIcon } from "lucide-react";
import { Cloud, KeyRound, ShieldCheck } from "lucide-react";

// `items` stays a plain string[] (the resume API serializes it directly).
// `core` is a subset of `items` rendered as the solid "core stack" — adjust
// which entries are core to match how you'd actually weight them.
export type SkillGroup = { label: string; items: string[]; core?: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "Go", "SQL"],
    core: ["Python", "TypeScript", "JavaScript"],
  },
  {
    label: "Frontend",
    items: ["React.js", "HTML", "CSS"],
    core: ["React.js"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
    core: ["Node.js", "REST APIs"],
  },
  {
    label: "Cloud & Identity",
    items: ["AWS", "Auth0", "GenAI"],
    core: ["Auth0", "AWS"],
  },
  {
    label: "Tools & Platforms",
    items: [
      "GitHub",
      "Postman",
      "Jira",
      "Confluence",
      "Agile",
      "Salesforce",
      "Looker",
      "Tableau",
    ],
    core: ["GitHub", "Postman"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  // `year` is the valid-through (expiry); `issued` is when it was earned.
  // Together they drive the validity-window bar. Dummy `issued` years for now.
  issued: string;
  year: string;
  icon: LucideIcon;
};

export const certifications: Certification[] = [
  { name: "Auth0 Certified Developer", issuer: "Okta / Auth0", issued: "2024", year: "May 2026", icon: KeyRound },
  { name: "CompTIA Security+", issuer: "CompTIA", issued: "2022", year: "Oct 2025", icon: ShieldCheck },
  { name: "Cloud Digital Leader", issuer: "Google", issued: "2022", year: "Jun 2025", icon: Cloud },
];
