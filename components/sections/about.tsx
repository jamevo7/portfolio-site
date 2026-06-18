"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { about, profile, experience, type Experience } from "@/lib/data";
import { SECTION_SHELL } from "@/lib/section";
import { IdentityCard } from "@/components/identity-card";
import { PhotoGallery } from "@/components/photo-gallery";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// Oldest → newest, so the timeline reads left-to-right.
const NODES = [...experience].reverse();

/** Turn a role into the identity-card payload, with a unique path per role. */
function jobIdentity(job: Experience) {
  const slug = job.company.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    path: `/experience/${job.start.slice(-4)}/${slug}`,
    facts: [
      { label: "role", value: job.role },
      { label: "company", value: job.company },
      { label: "period", value: `${job.start} – ${job.end}` },
      { label: "location", value: job.location },
    ],
  };
}

export function About() {
  // null = default "about" payload; a number selects that role.
  const [active, setActive] = React.useState<number | null>(null);

  const identity =
    active === null
      ? { path: "/about/james.vo", facts: about.facts }
      : jobIdentity(NODES[active]);

  return (
    <section id="about" className="overflow-x-clip">
      <div className={SECTION_SHELL}>
        <div className="grid gap-10 md:grid-cols-3">
          {/* Left column: heading sits with the bio so its top aligns with
              the photo gallery in the right column. */}
          <div className="md:col-span-2">
            <SectionHeading eyebrow="01 / About" title="A bit about me" />
            <div className="space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column: photo gallery above the identity card (which doubles
              as the timeline inspector). Both keep a fixed size so neither
              resizes as the card re-types a different role. */}
          <div className="space-y-6">
            <Reveal>
              <PhotoGallery />
            </Reveal>
            <Reveal delay={0.08}>
              <IdentityCard path={identity.path} facts={identity.facts} />
            </Reveal>
          </div>
        </div>

        {/* Work history as a thin interactive timeline; selecting a role drives
            the identity card above. */}
        <div className="mt-12">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary/80">
                Where I&apos;ve been
              </h3>
              <a
                href={profile.resumeHref}
                download
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Full history on my resume
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ExperienceTimeline
              nodes={NODES}
              active={active}
              onSelect={(i) => setActive((p) => (p === i ? null : i))}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
