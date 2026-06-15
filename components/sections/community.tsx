import { ArrowUpRight } from "lucide-react";

import { community } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Community() {
  return (
    <section id="community" className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="03 / Community"
          title="Beyond the work"
          description={community.lede}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {community.entries.map((entry, i) => {
            const Icon = entry.icon;
            return (
              <Reveal key={entry.title} delay={(i % 2) * 0.08}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <Badge variant="muted" className="font-mono text-xs">
                        {entry.type}
                      </Badge>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold">{entry.title}</h3>
                    {(entry.org || entry.period) && (
                      <p className="mt-0.5 font-mono text-xs text-primary">
                        {entry.org}
                        {entry.org && entry.period && " · "}
                        {entry.period}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>

                    {entry.href && (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
