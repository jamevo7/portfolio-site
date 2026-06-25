import type { MetadataRoute } from "next";

import { projectSlugs } from "@/lib/data";

const siteUrl = "https://jamesvo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
