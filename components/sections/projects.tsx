"use client";

import { projects } from "@/lib/data";
import { SECTION_SHELL } from "@/lib/section";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// Bento spans (lg+): a 2×2 feature tile anchors the left; a wide tile fills the
// top-right; three equal accent tiles split the bottom-right — creating a
// cross-weighted layout that's symmetric on the right side while the feature
// tile provides the asymmetric anchor.
const TILE_SPANS = [
  "lg:col-span-2 lg:row-span-2", // feature — left anchor
  "lg:col-span-3",               // wide — top right
  "lg:col-span-1",               // accent — bottom right ×3
  "lg:col-span-1",
  "lg:col-span-1",
];

export function Projects() {
  return (
    <section id="projects" className="bg-muted/30">
      <div className={SECTION_SHELL}>
        <SectionHeading
          eyebrow="02 / My Work"
          
        />

        {/* Bento of differently-shaped tiles — a feature square plus two wide
            tiles; each reveals its details on hover/tap. */}
        <div className="grid grid-cols-1 gap-4 lg:auto-rows-[15rem] lg:grid-cols-5">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 3) * 0.08}
              className={TILE_SPANS[i] ?? "lg:col-span-1"}
            >
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
