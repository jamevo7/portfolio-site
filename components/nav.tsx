"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  // Briefly draws the eye to the Resume button when something elsewhere on the
  // page points here (e.g. About's "Full history on my resume" link). Bumping a
  // counter re-keys the flash overlay so each press restarts the fade.
  const [flash, setFlash] = React.useState(0);

  React.useEffect(() => {
    const onHighlight = () => setFlash((n) => n + 1);
    window.addEventListener("resume:highlight", onHighlight);
    return () => window.removeEventListener("resume:highlight", onHighlight);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Pick the section closest to the top of the viewport.
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(`#${top.target.id}`);
      },
      // Activate a link when its section crosses the upper-middle band.
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Home" className="inline-flex items-center">
          {/* Brand mark — matches the favicon: dark blue hollow square. */}
          <svg
            viewBox="0 0 32 32"
            className="size-7"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="6"
              y="6"
              width="20"
              height="20"
              rx="3"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="3"
            />
          </svg>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                active === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="relative hidden overflow-hidden sm:inline-flex"
          >
            <a href={profile.resumeHref} download>
              {/* Light-blue pulse that throbs a couple of times then fades,
                  sitting above the button's own background; overflow-hidden clips
                  it to the corners. The label is lifted above it with relative
                  z-10 so it stays readable. */}
              {flash > 0 && (
                <motion.span
                  key={flash}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-sky-200/70 dark:bg-sky-300/25"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 0] }}
                  transition={{
                    // Rise (~0.33s) and fall (~0.65s) unchanged; the gap between
                    // the two peaks is 2.1s.
                    duration: 3.075,
                    ease: "easeInOut",
                    times: [0, 0.106, 0.447, 0.789, 1],
                  }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                <FileText className="size-4" />
                Resume
              </span>
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-foreground",
                  active === link.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resumeHref}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <FileText className="size-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
