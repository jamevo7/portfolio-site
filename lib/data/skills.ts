/** Skills + certifications shown in the Skills section. */

import type { LucideIcon } from "lucide-react";
import { Cloud, KeyRound, ShieldCheck } from "lucide-react";

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
  { name: "Auth0 Certified Developer", issuer: "Okta / Auth0", year: "May 2026", icon: KeyRound },
  { name: "CompTIA Security+", issuer: "CompTIA", year: "Oct 2025", icon: ShieldCheck },
  { name: "Cloud Digital Leader", issuer: "Google", year: "Jun 2025", icon: Cloud },
];
