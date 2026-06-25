# CLAUDE.md — Portfolio Site

Project context for any agent working in this repo. This file is inherited automatically by every git worktree, so anything here is available to all parallel sessions without re-explaining.

## What this is

James Vo's personal portfolio site — the primary point of contact for career and personal brand online. It also serves a resume API endpoint. Quality bar: distinctive and considered, not templated.

## Stack

- Framework: Next.js 15 (App Router), React 19  
- Language: TypeScript (strict mode)  
- Styling: Tailwind CSS v4  
- Hosting: Vercel (code assumes it — see middleware CSP, client-ip proxy hops)  
- Resume API: `GET /api/resume` — same data serialized to JSON Resume / plain text  
- Email: Resend (contact form), behind in-memory rate limiting + honeypot  

## Conventions

- TypeScript strict; no `any` without a written reason.  
- Functional components and hooks only.  
- Small, single-purpose files; prefer composition over inheritance.  
- Comment the **why**, not the what.  
- Simple and idiomatic over clever. Readability wins.  
- Match existing patterns in the file you're editing before introducing new ones.

## Design & brand

This site must look on-brand. Brand decisions (palette, type, voice) live in the Notion **Brand Hub** — pull from there rather than inventing new values. If a color/type/spacing choice isn't defined yet, flag it instead of guessing, and propose options.

## How to work in this repo (the working agreement)

- For anything non-trivial, **propose a short plan first** (files, approach) and wait for my go-ahead before writing lots of code.  
- Before any destructive or irreversible action (deleting files, force-push, schema/config changes), **stop and ask**.  
- **I am always the one who commits and deploys.** Don't assume that's done.  
- Explain the reasoning behind meaningful decisions briefly, so I learn the pattern.  
- End a work session with a one-line summary of what changed and what's next.

## Working in parallel (git worktrees)

This repo is set up for parallel agent work via worktrees. Independent features (hero, projects, about, contact, resume API) can be built in separate worktrees simultaneously. Rules that keep it conflict-free:

- **Do the shared foundation first, in one session** — design system, global CSS/theme tokens, shared layout and components, config. Only branch into parallel work *after* that's stable.  
- **One worktree \= one independent feature** that doesn't touch shared files.  
- **Dependencies are per-worktree.** Run `npm install` in each new worktree before running anything — node\_modules is not shared.  
- **`.env` is not copied** into new worktrees. Copy it in manually (the resume API needs its vars), or maintain a `.worktreeinclude`.  
- **Keep dependency changes to one worktree at a time** to avoid competing lockfile edits.  
- Naming: worktree folders are prefixed `portfolio-` and named for the feature (e.g. `portfolio-hero`), so `ls` groups them.

## Commands

- Dev server: `npm run dev`  
- Build: `npm run build`  
- Lint: `npm run lint`  
- Type-check: `npx tsc --noEmit`  
- Test: `npm run test` (Vitest — resume serialization suite in `lib/resume.test.ts`)

## Scoped context

If a specific feature needs extra context, add a worktree-local `CLAUDE.md` in that worktree's root — it layers on top of this one for that feature only.  
