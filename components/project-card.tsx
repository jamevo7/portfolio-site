"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * A project tile for the bento grid (fills whatever cell it's given). At rest it
 * reads as a blueprint cover
 * (schematic drawing + the project title and amber note). On hover/focus — or a
 * tap on touch — a near-opaque panel fades in with the summary, tech, and the
 * demo/repo links. Hover for pointers, focus-within for keyboards, and a click
 * toggle so touch devices (no hover) can still open it.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);
  const idx = String(index).padStart(2, "0");

  return (
    <Card
      onClick={() => setOpen((o) => !o)}
      className={cn(
        "group relative h-72 cursor-pointer overflow-hidden shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md lg:h-full"
      )}
    >
      {/* Resting thumbnail — the blueprint cover (note lives in the title bar). */}
      <ProjectCover
        index={index}
        tag={project.tag}
        icon={project.icon}
        className="absolute inset-0 border-b-0"
      />

      {/* Title + amber note, pinned to the bottom; fades out as the panel opens. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/85 to-transparent p-5 pt-12 transition-opacity duration-300 group-hover:opacity-0",
          open && "opacity-0"
        )}
      >
        <h3 className="font-display text-base font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        {project.note && (
          <p className="mt-1.5 -rotate-1 font-script text-lg leading-none text-brand-amber">
            {project.note}
          </p>
        )}
      </div>

      {/* Reveal panel — details + links. */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col bg-card/95 p-5 backdrop-blur-sm",
          "pointer-events-none opacity-0 transition-opacity duration-300",
          "group-hover:pointer-events-auto group-hover:opacity-100",
          "focus-within:pointer-events-auto focus-within:opacity-100",
          open && "pointer-events-auto opacity-100"
        )}
      >
        <p className="font-mono text-xs tracking-wider text-primary/70">
          {idx}
          {project.tag ? (
            <span className="text-primary/45"> — {project.tag}</span>
          ) : null}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {project.blurb}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 pt-4">
            {project.tech.slice(0, 5).map((t) => (
              <Badge key={t} variant="muted" className="font-mono text-[11px]">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <ProjectLink href={project.demo} icon={ArrowUpRight} label="Demo" />
            <ProjectLink href={project.repo} icon={GithubIcon} label="Repo" />
          </div>
        </div>
      </div>
    </Card>
  );
}

/** A blueprint-styled link button; renders disabled when no URL is provided. */
function ProjectLink({
  href,
  icon: Icon,
  label,
}: {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const base =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors";

  if (!href) {
    return (
      <span
        aria-disabled
        className={cn(
          base,
          "cursor-not-allowed border-border/60 bg-muted/30 text-muted-foreground/50"
        )}
      >
        <Icon className="size-4" />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        base,
        "border-primary/25 bg-card/60 text-foreground/80 hover:border-brand-amber/60 hover:bg-brand-amber/5 hover:text-brand-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <Icon className="size-4" />
      {label}
    </a>
  );
}
