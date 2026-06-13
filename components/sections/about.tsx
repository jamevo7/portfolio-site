import { GraduationCap } from "lucide-react";

import { about, education } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
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
        </div>

        <div className="space-y-3">
          <Reveal>
            <Card>
              <CardContent className="grid gap-4 p-6">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 font-medium">{fact.value}</dd>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
              <CardContent className="flex items-start gap-3 p-6">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">{education.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {education.minor}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {education.school} · GPA {education.gpa} · {education.year}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
