import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, projectSlugs } from "@/lib/data";
import { ProjectDetail } from "@/components/project-detail";

type Params = { params: Promise<{ slug: string }> };

// Only the slugs from generateStaticParams are valid — any other slug 404s
// immediately as a static response instead of server-rendering on demand. This
// closes a minor resource-amplification vector (flooding random slugs to force
// cache-miss renders) and matches reality: there are no dynamic projects.
export const dynamicParams = false;

/** Pre-render every project page at build time. */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
