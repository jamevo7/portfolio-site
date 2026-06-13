"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<typeof motion.div> & {
  /** Stagger delay in seconds. */
  delay?: number;
};

/**
 * Subtle scroll-triggered fade + slide-up. Animates once when in view.
 * Respects prefers-reduced-motion.
 */
export function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
