import { GraduationCap } from "lucide-react";

import { certifications, education, skills } from "@/lib/data";
import { SECTION_SHELL } from "@/lib/section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="bg-muted/30">
      <div className={SECTION_SHELL}>
        <SectionHeading
          eyebrow="04 / Skills & Certifications"
          title="What I work with"
        />

        {/* Education — leads the section. */}
        <Reveal>
          <Card className="flex items-start gap-4 p-5 sm:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <p className="font-medium">{education.degree}</p>
              {education.minor && (
                <p className="text-sm text-muted-foreground">
                  {education.minor}
                </p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">
                {education.school} · Class of {education.year} · GPA{" "}
                {education.gpa}
              </p>
            </div>
          </Card>
        </Reveal>

        {/* Certifications. */}
        <div className="mt-12">
          <Reveal>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-primary/80">
              Certifications
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <Reveal key={cert.name} delay={i * 0.08}>
                  <Card className="flex h-full items-start gap-4 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium leading-snug">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Skills as a domain-grouped spec sheet. */}
        <div className="mt-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-5 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary/15 ring-1 ring-inset ring-primary/30" />
                core stack
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full ring-1 ring-inset ring-border" />
                familiar
              </span>
            </div>
          </Reveal>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.05}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-primary/80">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant={
                        group.core?.includes(item) ? "default" : "outline"
                      }
                      className="px-3 py-1 text-sm"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
