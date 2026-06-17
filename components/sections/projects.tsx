"use client";

import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="projects" className="bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="02 / Projects"
          title="Featured Projects"
          description="A selection of projects spanning identity tooling, automation, and full-stack web. Click a tile for its demo and repo."
        />

        {/* 2×2 grid of flip tiles — front summarizes, back holds the links. */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
