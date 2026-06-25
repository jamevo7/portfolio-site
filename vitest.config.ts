import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Resolve the "@/..." path alias the app uses, so tests can import app modules.
const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: { "@": rootDir.replace(/\/$/, "") },
  },
  // Tests are pure TS (no CSS) — give Vite an inline empty PostCSS config so it
  // doesn't try to load the app's Tailwind v4 postcss.config.mjs, which its
  // Node API can't parse.
  css: { postcss: { plugins: [] } },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
