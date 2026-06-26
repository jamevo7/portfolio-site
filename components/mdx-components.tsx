import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Brand-styled element map for MDX post bodies, so posts match the site without
 * pulling in the Tailwind typography plugin. Internal links use next/link;
 * external links open in a new tab. Passed to <MDXRemote components={…} />.
 */
export const mdxComponents = {
  h1: (p: React.ComponentProps<"h1">) => (
    <h1
      className="mt-10 font-display text-3xl font-semibold tracking-tight"
      {...p}
    />
  ),
  h2: (p: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 font-display text-2xl font-semibold tracking-tight"
      {...p}
    />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-display text-xl font-semibold tracking-tight"
      {...p}
    />
  ),
  p: (p: React.ComponentProps<"p">) => (
    <p className="mt-4 leading-relaxed text-muted-foreground" {...p} />
  ),
  ul: (p: React.ComponentProps<"ul">) => (
    <ul
      className="mt-4 list-disc space-y-1.5 pl-6 text-muted-foreground marker:text-primary/50"
      {...p}
    />
  ),
  ol: (p: React.ComponentProps<"ol">) => (
    <ol
      className="mt-4 list-decimal space-y-1.5 pl-6 text-muted-foreground marker:text-primary/50"
      {...p}
    />
  ),
  li: (p: React.ComponentProps<"li">) => <li className="pl-1" {...p} />,
  a: ({ href = "", className, ...p }: React.ComponentProps<"a">) => {
    const cls = cn(
      "font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary",
      className
    );
    return typeof href === "string" && href.startsWith("/") ? (
      <Link href={href} className={cls} {...p} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...p}
      />
    );
  },
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-primary/30 pl-4 italic text-muted-foreground"
      {...p}
    />
  ),
  code: (p: React.ComponentProps<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...p}
    />
  ),
  pre: (p: React.ComponentProps<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  hr: (p: React.ComponentProps<"hr">) => (
    <hr className="my-10 border-border" {...p} />
  ),
};
