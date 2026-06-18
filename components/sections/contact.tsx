"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Send } from "lucide-react";
import { toast } from "sonner";

import { profile } from "@/lib/data";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { SECTION_SHELL } from "@/lib/section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  // Honeypot: hidden field real users never see/fill. Bots that auto-fill
  // every input get silently dropped server-side.
  const honeypotRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypotRef.current?.value ?? "",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      if (data?.fallback) {
        toast.info("Thanks! Email isn't wired up yet.", {
          description: `Please reach me directly at ${profile.email}.`,
        });
      } else {
        toast.success("Message sent!", {
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
      }
      reset();
    } catch (err) {
      toast.error("Couldn't send your message", {
        description:
          err instanceof Error ? err.message : `Please email ${profile.email}.`,
      });
    }
  }

  return (
    <section id="contact">
      <div className={SECTION_SHELL}>
      <SectionHeading
        eyebrow="05 / Contact"
        title="Let's talk"
        description="Have a role, a project, or just want to connect? Drop me a note."
      />

      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              I&apos;m always happy to chat about identity, security, customer
              success, or building useful internal tooling.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Honeypot — hidden from real users; must stay empty. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="company">Company (leave this field blank)</label>
              <input
                ref={honeypotRef}
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me a little about what you have in mind…"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
