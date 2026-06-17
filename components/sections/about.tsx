import { ArrowUpRight } from "lucide-react";

import { about, career, profile } from "@/lib/data";
import { IdentityCard } from "@/components/identity-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow="01 / About" title="A bit about me" />

      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {p}
              </p>
            </Reveal>
          ))}

          {/* Career snapshot — the resume owns the detail, this is a nod. */}
          <Reveal delay={about.paragraphs.length * 0.08}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Previously</span>
              {career.map((c) => (
                <span key={c.company} className="inline-flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-primary/50" />
                  {c.company}
                  <span className="text-muted-foreground/60">{c.period}</span>
                </span>
              ))}
              <a
                href={profile.resumeHref}
                download
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                Full history on my resume
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <IdentityCard facts={about.facts} />
          </Reveal>
        </div>
      </div>
      </div>
    </section>
  );
}
