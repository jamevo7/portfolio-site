import { ArrowUpRight } from "lucide-react";

import { getProjectIndex, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SECTION_SHELL } from "@/lib/section";
import { GithubIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * A single project's detail page: a header (title, role, tech) followed by the
 * three anchored sections the page nav jumps to — Problem, Impact, Preview.
 * Reuses the homepage's section shell, headings, and blueprint cover so a
 * project page reads as the same site, just scoped to one piece of work.
 *
 * `scroll-mt-24` on each section keeps anchored headings clear of the fixed nav.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const index = getProjectIndex(project.slug);

  return (
    <>
      {/* Header — extra top padding clears the fixed nav bar. */}
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
          <Reveal>
            <p className="mb-2 font-mono text-sm font-medium tracking-wider text-primary">
              {project.company}
              {project.role ? (
                <span className="text-primary/50"> · {project.role}</span>
              ) : null}
              {project.period ? (
                <span className="text-primary/50"> · {project.period}</span>
              ) : null}
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {project.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="muted" className="font-mono text-[11px]">
                  {t}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 — Problem */}
      <section id="problem" className="scroll-mt-24">
        <div className={SECTION_SHELL}>
          <SectionHeading eyebrow="01 / Problem" title={project.problem.heading} />
          <Reveal className="max-w-2xl space-y-4">
            {project.problem.body.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02 — Impact */}
      <section id="impact" className="scroll-mt-24 bg-muted/30">
        <div className={SECTION_SHELL}>
          <SectionHeading
            eyebrow="02 / Impact"
            title="What changed"
            description={project.impact.summary}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {project.impact.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <Card className="h-full p-6">
                  <div className="font-display text-3xl font-semibold tracking-tight text-primary">
                    {m.value}
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 max-w-2xl space-y-3">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <p className="text-muted-foreground">{h}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 03 — Preview */}
      <section id="preview" className="scroll-mt-24">
        <div className={SECTION_SHELL}>
          <SectionHeading
            eyebrow="03 / Preview"
            title="A closer look"
            description={project.preview.caption}
          />

          <Reveal>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
              <ProjectCover
                index={index}
                tag={project.tag}
                icon={project.icon}
                className="absolute inset-0 border-b-0"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-primary/70 backdrop-blur-sm">
                  Preview coming soon
                </span>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-3">
            <PreviewLink href={project.demo} icon={ArrowUpRight} label="Live demo" />
            <PreviewLink href={project.repo} icon={GithubIcon} label="Source" />
          </div>
        </div>
      </section>
    </>
  );
}

/** A blueprint-styled link; renders disabled when the URL is missing or "#". */
function PreviewLink({
  href,
  icon: Icon,
  label,
}: {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors";

  if (!href || href === "#") {
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
