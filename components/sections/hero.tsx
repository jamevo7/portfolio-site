"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText, MapPin } from "lucide-react";

import { profile } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduce = useReducedMotion();

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
    <section className="relative overflow-hidden">
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center px-4 pt-16 sm:px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Open to coffee chats &amp; collaboration
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-xl font-medium text-primary sm:text-2xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-lg text-muted-foreground"
          >
            {profile.tagline} I help enterprise teams adopt Auth0, harden their
            security posture, and ship the internal tooling that makes them
            faster.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="size-4" />
            {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contact">
                Get in touch
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={profile.resumeHref} download>
                <FileText className="size-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
