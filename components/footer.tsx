import { Mail } from "lucide-react";

import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  const socials = [
    { label: "GitHub", href: profile.links.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-1.5 sm:items-start">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js
            & Tailwind CSS.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            psst — my resume is an API:{" "}
            <a
              href="/api/resume"
              className="underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground"
            >
              curl /api/resume
            </a>
          </p>
        </div>
        <div className="flex items-center gap-1">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
