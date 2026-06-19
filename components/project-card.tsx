"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RotateCw } from "lucide-react";

import { type Project } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * A project tile that flips on click. The front is the recruiter scan — title,
 * top impact bullets, full tech stack, blueprint cover. The back is the depth
 * view — the full write-up plus the demo/repo links as graphic buttons.
 *
 * The whole tile flips on click (mouse convenience); the rotate icon is a real
 * <button> so keyboard users have a focusable control without nesting the
 * back's links inside an interactive container.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);
  const idx = String(index).padStart(2, "0");

  const toggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  return (
    <div className="group h-full [perspective:1600px]">
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
        className="relative h-full cursor-pointer rounded-xl [transform-style:preserve-3d]"
      >
        {/* FRONT — info on the top half, blueprint cover on the bottom half. */}
        <div
          aria-hidden={flipped}
          className={cn(
            "h-full [backface-visibility:hidden]",
            flipped && "pointer-events-none"
          )}
        >
          <Card className="flex h-full min-h-[34rem] flex-col overflow-hidden transition-shadow group-hover:shadow-md">
            {/* min-h-0 + basis-0 lets this pane settle at exactly half the
                tile, with the cover taking the other half. */}
            <div className="flex min-h-0 flex-1 basis-0 flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {project.title}
                </h3>
                <FlipButton onClick={toggle} tabbable={!flipped} />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.blurb}
              </p>
            </div>

            <ProjectCover
              index={index}
              tag={project.tag}
              icon={project.icon}
              note={project.note}
              className="flex-1 border-t"
            />
          </Card>
        </div>

        {/* BACK — the full write-up + the graphic link buttons. */}
        <div
          aria-hidden={!flipped}
          className={cn(
            "absolute inset-0 h-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
            !flipped && "pointer-events-none"
          )}
        >
          <BackFace
            idx={idx}
            project={project}
            onFlip={toggle}
            tabbable={flipped}
          />
        </div>
      </motion.div>
    </div>
  );
}

/** The flipped face: blueprint scaffolding, the write-up, and the links. */
function BackFace({
  idx,
  project,
  onFlip,
  tabbable,
}: {
  idx: string;
  project: Project;
  onFlip: (e: React.SyntheticEvent) => void;
  tabbable: boolean;
}) {
  return (
    <Card className="relative h-full overflow-hidden">
      {/* Fine blueprint grid + corner registration brackets, matching the cover. */}
      <div
        aria-hidden
        className="absolute inset-0 text-primary/[0.08] dark:text-primary/[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <span className="absolute left-2.5 top-2.5 size-3 border-l border-t border-primary/30" />
      <span className="absolute right-2.5 top-2.5 size-3 border-r border-t border-primary/30" />
      <span className="absolute bottom-2.5 left-2.5 size-3 border-b border-l border-primary/30" />
      <span className="absolute bottom-2.5 right-2.5 size-3 border-b border-r border-primary/30" />

      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-wider text-primary/70">
              {idx}
              {project.tag ? (
                <span className="text-primary/45"> — {project.tag}</span>
              ) : null}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold leading-tight tracking-tight">
              {project.title}
            </h3>
          </div>
          <FlipButton active onClick={onFlip} tabbable={tabbable} />
        </div>

        <p className="mt-3 flex-1 overflow-hidden text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex shrink-0 flex-wrap gap-2 pt-4">
          {project.tech.map((t) => (
            <Badge key={t} variant="muted" className="font-mono">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex shrink-0 gap-3 pt-4">
          <FlipLink
            href={project.demo}
            icon={ArrowUpRight}
            label="Demo"
            tabbable={tabbable}
          />
          <FlipLink
            href={project.repo}
            icon={GithubIcon}
            label="Repo"
            tabbable={tabbable}
          />
        </div>
      </div>
    </Card>
  );
}

/**
 * The flip control: a rounded, faintly-gray square that warms to amber on
 * press (`active:`) and stays amber on the flipped face (`active` prop). A real
 * button so it's keyboard-operable; `tabbable` removes the hidden face's copy
 * from the tab order.
 */
function FlipButton({
  active,
  onClick,
  tabbable,
}: {
  active?: boolean;
  onClick: (e: React.SyntheticEvent) => void;
  tabbable: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabbable ? 0 : -1}
      aria-pressed={active}
      aria-label="Flip tile for details and links"
      title="Flip for details & links"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground/[0.06] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-brand-amber/20 active:text-brand-amber",
        active && "bg-brand-amber/15 text-brand-amber"
      )}
    >
      <RotateCw className="size-4" />
    </button>
  );
}

/** A blueprint-styled link button; renders disabled when no URL is provided. */
function FlipLink({
  href,
  icon: Icon,
  label,
  tabbable,
}: {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tabbable: boolean;
}) {
  const base =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors";

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
      tabIndex={tabbable ? 0 : -1}
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
