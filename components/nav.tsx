"use client";

import * as React from "react";
import { FileText, Menu, X } from "lucide-react";

import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          {/* Placeholder brand mark — matches the favicon. */}
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#F59E4B] to-[#E2702F]">
            <svg
              viewBox="0 0 32 32"
              className="size-5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M25 16 L20.5 23.79 L11.5 23.79 L7 16 L11.5 8.21 L20.5 8.21 Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={profile.resumeHref} download>
              <FileText className="size-4" />
              Resume
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
                className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
