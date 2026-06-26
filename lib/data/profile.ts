/**
 * Global identity + navigation. Shared across Hero, Contact, and footer —
 * change with care, since most sections read from `profile`.
 */

export const profile = {
  name: "James Vo",
  firstName: "James",
  title: "Technical Account Manager",
  // A line that ties together security + identity + customer success.
  tagline: "Bridging security, identity, and customer success.",
  location: "San Francisco, CA",
  email: "jamesvo2468@gmail.com",
  // TODO: replace with your real profile URLs
  links: {
    linkedin: "https://www.linkedin.com/in/jamsvo/",
    github: "https://github.com/jamevo7",
  },
  resumeHref: "/resume.pdf",
} as const;

// Top-level routes shown in the nav. Work is the landing page (/); About, More,
// and Blog are their own routes.
export const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "More", href: "/more" },
  { label: "Blog", href: "/blog" },
] as const;
