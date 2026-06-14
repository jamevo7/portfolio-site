import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { profile } from "@/lib/data";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jamesvo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "James' Portfolio Site",
    template: `%s — ${profile.name}`,
  },
  description:
    "Technical Account Manager at Okta focused on identity, security, and customer success. Auth0 Certified Developer and AWS Certified Cloud Practitioner.",
  keywords: [
    "James Vo",
    "Technical Account Manager",
    "Okta",
    "Auth0",
    "identity",
    "security",
    "customer success",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.title}`,
    description:
      "Technical Account Manager at Okta focused on identity, security, and customer success.",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description:
      "Technical Account Manager at Okta focused on identity, security, and customer success.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Per-request nonce set by middleware.ts; forwarded to next-themes so its
  // inline theme script satisfies our nonce-based CSP (no 'unsafe-inline').
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          nonce={nonce}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main id="top">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
