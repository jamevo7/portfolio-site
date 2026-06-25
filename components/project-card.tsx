import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { type Project } from "@/lib/data";
import { ProjectCover } from "@/components/project-cover";
import { Card } from "@/components/ui/card";

/**
 * A project tile for the bento grid (fills whatever cell it's given). At rest
 * it's a neutral blueprint cover — a placeholder for the project thumbnail
 * that will live here eventually. On hover/focus a "Learn more" arrow fades in,
 * and the whole tile links through to the project's detail page.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title} — ${project.blurb}`}
      className="group block h-72 lg:h-full"
    >
      <Card className="relative h-full overflow-hidden shadow-sm transition-shadow group-hover:shadow-md group-focus-visible:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        {/* Blueprint placeholder cover — no title/tag/note (thumbnail TBD). */}
        <ProjectCover
          index={index}
          icon={project.icon}
          className="absolute inset-0 border-b-0"
        />

        {/* Hover/focus affordance — soft scrim + "Learn more" arrow chip. */}
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-primary/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-primary shadow-sm">
            Learn more
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
