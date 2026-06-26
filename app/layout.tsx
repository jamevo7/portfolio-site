import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

import { profile } from "@/lib/data";
import { ThemeProvider } from "@/components/theme-provider";
import { PageGrid } from "@/components/page-grid";
import { PageAura } from "@/components/page-aura";
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

// Handwriting accent — used only for the warm margin notes on blueprint covers.
const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jamesvo.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "James Vo Portfolio",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageAura />
          <PageGrid />
          <Nav />
          <main id="top">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
