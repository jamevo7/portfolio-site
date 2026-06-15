/**
 * Barrel for all site content. Each section's data lives in its own module
 * under `lib/data/` so parallel worktrees can edit content without colliding.
 * Import from `@/lib/data` as before — these re-exports keep that stable.
 *
 * Real career data is sourced from James' resume; the Projects section uses
 * realistic *dummy* data (the resume's project entry is a template placeholder).
 * Update the placeholder links (LinkedIn / GitHub / project repos) with real URLs.
 */

export * from "./data/profile";
export * from "./data/about";
export * from "./data/experience";
export * from "./data/projects";
export * from "./data/skills";
export * from "./data/community";
