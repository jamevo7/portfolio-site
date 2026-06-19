"use client";

import { projects } from "@/lib/data";
import { SECTION_SHELL } from "@/lib/section";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="projects" className="bg-muted/30">
      <div className={SECTION_SHELL}>
        <SectionHeading
          eyebrow="03 / Projects"
          title="What I'm Working On"
          description="Click a tile to learn more."
        />

        {/* 3-up row of flip tiles — front summarizes, back holds the links. */}
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
