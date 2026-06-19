"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, GraduationCap } from "lucide-react";

import { certifications, education, type Certification } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { SECTION_SHELL } from "@/lib/section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="bg-muted/30">
      <div className={SECTION_SHELL}>
        <SectionHeading
          eyebrow="04 / Education & Certifications"
          title="Credentials, verified."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: education as a blueprint diploma. */}
          <Reveal>
            <EducationCard />
          </Reveal>

          {/* Right: certifications — each with a validity window that draws in
              on scroll, and the most recent carrying a live status pulse. */}
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.08}>
                <CertRow cert={cert} current={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* A reimagined skills block returns here later — see lib/data/skills.ts. */}
      </div>
    </section>
  );
}

/** Registration brackets — the technical-drawing framing used on covers. */
function Brackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l border-t border-primary/30" />
      <span className="pointer-events-none absolute right-2.5 top-2.5 size-3 border-r border-t border-primary/30" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 size-3 border-b border-l border-primary/30" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 border-b border-r border-primary/30" />
    </>
  );
}

/** Education rendered as a blueprint "diploma": grid + brackets + mono stats. */
function EducationCard() {
  return (
    <Card className="relative h-full overflow-hidden p-6 sm:p-7">
      {/* Fine blueprint grid, tinted with the blue base. */}
      <div
        aria-hidden
        className="absolute inset-0 text-primary/[0.06] dark:text-primary/[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Brackets />

      <div className="relative">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary/70">
          <GraduationCap className="size-4" />
          Education
        </div>

        <p className="font-display text-xl font-semibold leading-tight tracking-tight">
          {education.degree}
        </p>
        {education.minor && (
          <p className="mt-1 text-sm text-muted-foreground">{education.minor}</p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">{education.school}</p>

        <div className="mt-6 flex gap-8">
          <Stat label="class" value={education.year} />
          <Stat label="gpa" value={education.gpa} />
        </div>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="font-mono">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

/** Last two digits of a date string like "May 2026" or "2024" → "26" / "24". */
function yy(date: string) {
  return date.slice(-2);
}

function CertRow({
  cert,
  current,
}: {
  cert: Certification;
  current: boolean;
}) {
  const reduce = useReducedMotion();
  const Icon = cert.icon;

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium leading-snug">{cert.name}</p>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              {current && !reduce && (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 [animation-duration:2.5s]" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
              )}
              <Check className="size-3.5" />
              verified
            </span>
          </div>

          {/* Validity window — the bar draws in on scroll like the timeline. */}
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full origin-left rounded-full bg-primary/50"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted-foreground">
            <span>issued &apos;{yy(cert.issued)}</span>
            <span>valid through &apos;{yy(cert.year)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
