"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText, MapPin, UserRound } from "lucide-react";

import { profile } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { QuantumGrid } from "@/components/quantum-grid";
import { DecipherText } from "@/components/decipher-text";
import { ContactDialog } from "@/components/contact-dialog";

export function Hero() {
  const reduce = useReducedMotion();
  const [contactOpen, setContactOpen] = React.useState(false);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  };

  return (
    <>
    <section className="relative overflow-hidden">
      {/* Animated aurora + blueprint grid */}
      <HeroBackdrop />
      {/* Quantum-fluctuation cells lighting up over the grid */}
      <QuantumGrid />
      <div className="mx-auto flex min-h-[88vh] max-w-5xl items-center px-4 pt-16 sm:px-6">
        <div className="flex w-full flex-col items-center gap-12 md:flex-row md:justify-between md:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl"
        >
          <motion.div variants={item}>
            <motion.span
              whileHover={reduce ? undefined : { skewX: -5, x: 2 }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
              className="inline-flex origin-left items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 [animation-duration:3s]" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to coffee chats &amp; collaboration
            </motion.span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            <DecipherText
              text={profile.name}
              delay={150}
              scrambleClassName="text-primary/60"
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Nice to meet you! Here, you can check out what I&apos;m working on, a bit about myself, and what&apos;s important to me! 
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="size-4 text-red-500" />
            {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setContactOpen(true)}>
              Get in touch
              <ArrowRight className="size-4" />
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={profile.resumeHref} download>
                <FileText className="size-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Profile photo placeholder — swap the inner content for an
            <Image /> once a real photo is available. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          className="shrink-0"
        >
          <div className="relative flex aspect-[4/5] w-56 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-gradient-to-b from-muted/60 to-muted/10 text-muted-foreground shadow-sm sm:w-64 md:w-72">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10"
            />
            <UserRound className="size-12" strokeWidth={1.5} />
            <span className="text-xs font-medium">Profile photo</span>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
    <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
