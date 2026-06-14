import { GraduationCap } from "lucide-react";

import { certifications, education, skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="04 / Skills & Certifications"
          title="What I work with"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.08}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="px-3 py-1 text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Education
              </h3>
            </Reveal>
            <Reveal>
              <Card>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{education.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {education.minor}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {education.school} · Class of {education.year} · GPA{" "}
                      {education.gpa}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal>
              <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Certifications
              </h3>
            </Reveal>
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
              <Reveal key={cert.name} delay={i * 0.08}>
                <Card>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
