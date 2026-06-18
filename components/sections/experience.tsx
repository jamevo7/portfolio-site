import { ExternalLink } from "lucide-react";

import { experience } from "@/lib/data";
import { SECTION_SHELL } from "@/lib/section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      className=""
    >
      <div className={SECTION_SHELL}>
        <SectionHeading
          eyebrow="02 / Experience"
          title="Where I've worked"
          description="Driving Auth0 adoption and customer security outcomes at Okta."
        />

        <div className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.role}`} delay={i * 0.05}>
              <div className="relative">
                {/* timeline dot */}
                <span className="absolute -left-[1.65rem] top-1.5 size-3 rounded-full border-2 border-primary bg-background sm:-left-[2.15rem]" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {job.role}
                    <span className="text-muted-foreground"> · </span>
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {job.company}
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-primary">{job.company}</span>
                    )}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground">
                    {job.start} — {job.end}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{job.location}</p>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-primary/50"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
