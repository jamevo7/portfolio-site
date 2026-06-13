import { ArrowUpRight, Sparkles } from "lucide-react";

import { projects } from "@/lib/data";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="03 / Projects"
        title="Things I've built"
        description="A selection of projects spanning identity tooling, automation, and full-stack web."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08}>
            <Card className="group flex h-full flex-col transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex shrink-0 items-center gap-1">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} repository`}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <GithubIcon className="size-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} demo`}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
                {(project.role || project.period) && (
                  <p className="font-mono text-xs text-primary">
                    {project.role}
                    {project.role && project.period && " · "}
                    {project.period}
                  </p>
                )}
                <CardDescription className="text-sm">
                  {project.blurb}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Sparkles className="size-4" />
                  {project.highlight}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="muted" className="font-mono">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <p className="text-center text-xs text-muted-foreground">
          Project case studies shown for illustration. Repos &amp; live demos
          coming soon.
        </p>
      </Reveal>
    </section>
  );
}
