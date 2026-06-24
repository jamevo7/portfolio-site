"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactDialog({ open, onClose }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const honeypotRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll while modal is open.
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");

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
      onClose();
    } catch (err) {
      toast.error("Couldn't send your message", {
        description:
          err instanceof Error ? err.message : `Please email ${profile.email}.`,
      });
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Contact form"
              className="pointer-events-auto relative w-full max-w-lg rounded-2xl border border-border/60 bg-background p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>

              <div className="mb-5">
                <h2 className="text-lg font-semibold">Get in touch</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Have a role, a project, or just want to connect? Drop me a note.
                </p>
              </div>

              {/* Honeypot — hidden from real users, silently discarded server-side. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="cp-company">Company (leave blank)</label>
                <input
                  ref={honeypotRef}
                  id="cp-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cp-name">Name</Label>
                    <Input
                      id="cp-name"
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cp-email">Email</Label>
                    <Input
                      id="cp-email"
                      type="email"
                      placeholder="jane@company.com"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cp-message">Message</Label>
                  <Textarea
                    id="cp-message"
                    placeholder="Tell me a little about what you have in mind…"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={isSubmitting}>
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
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
