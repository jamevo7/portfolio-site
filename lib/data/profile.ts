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
    linkedin: "https://www.linkedin.com/in/jamesvo",
    github: "https://github.com/jamesvo",
  },
  resumeHref: "/resume.pdf",
} as const;

// In-page navigation anchors.
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "My Work", href: "#projects" },
  { label: "Community", href: "#community" },
] as const;
