/**
 * The emotional center of the site — how James gives back and lifts others up.
 * The two Mentoring entries are real; the Volunteering entry is a placeholder.
 * TODO(James): fill in the Volunteering card from your LinkedIn volunteer
 * experience, add a timeframe to the Genesys Works entry, and tweak the lede.
 */

import type { LucideIcon } from "lucide-react";
import { GraduationCap, HeartHandshake, Users } from "lucide-react";

export type CommunityEntry = {
  type: "Volunteering" | "Mentoring" | "Community";
  title: string;
  org?: string;
  period?: string;
  description: string;
  href?: string;
  icon: LucideIcon;
};

export const community: { lede: string; entries: CommunityEntry[] } = {
  lede:
    "The most meaningful part of my work has always been the people. Whether it's mentoring someone into their first tech role, giving my time to a cause, or just being someone others can count on — I care about lifting people up and leaving things better than I found them.",
  entries: [
    {
      type: "Mentoring",
      title: "Mentoring Genesys Works interns",
      org: "Genesys Works · Okta",
      description:
        "Mentor high-school interns placed at Okta through Genesys Works — a nonprofit that prepares students from underserved communities for careers in tech, giving them their first real exposure to the industry.",
      icon: GraduationCap,
    },
    {
      type: "Mentoring",
      title: "Coaching new TAMs into the field",
      org: "Okta",
      period: "2024–Present",
      description:
        "Mentored 2 incoming Technical Account Managers and led intern interviews across 2 consecutive hiring cycles, building training content now used across the field team.",
      icon: Users,
    },
    {
      type: "Volunteering",
      title: "TODO: Add volunteer experience from LinkedIn",
      org: "TODO: Organization",
      period: "TODO: Years",
      description:
        "TODO(James): Paste your LinkedIn volunteer entries here — organization, role, timeframe, and a sentence on the impact.",
      icon: HeartHandshake,
    },
  ],
};
