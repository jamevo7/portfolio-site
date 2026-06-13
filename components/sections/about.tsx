import { about } from "@/lib/data";
import { CountUp } from "@/components/count-up";
import { IdentityCard } from "@/components/identity-card";
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

        <div>
          <Reveal>
            <IdentityCard facts={about.facts} />
          </Reveal>
        </div>
      </div>

      {/* Headline metrics, counting up on scroll. Gap mirrors the grid above so
          the third card lines up as one column with the identity card. */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3 md:gap-10">
        {about.metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <Card>
              <CardContent className="p-6">
                <div className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
