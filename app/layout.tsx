import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

/**
 * One family, not three. Manrope is variable across 200–800, so the whole
 * hierarchy — eyebrow through display — comes out of a single request, and
 * emphasis can be built from weight rather than from a second typeface.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cwms.io"),
  title: {
    default: "CWMS — Run and grow your coworking space",
    template: "%s | CWMS",
  },
  description:
    "Members, bookings and billing on one tenant record — multi-tenant coworking management software for workspace operators.",
  openGraph: {
    type: "website",
    siteName: "CWMS",
    title: "CWMS — Run and grow your coworking space",
    description:
      "Members, bookings and billing on one tenant record — built for multi-tenant operators.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CWMS — Run and grow your coworking space",
    description:
      "Members, bookings and billing on one tenant record — built for multi-tenant operators.",
  },
};

export const viewport: Viewport = {
  // Light-only page, so this is a single fixed value — no media-query pair
  // and nothing at runtime keeping it in sync.
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} h-full antialiased`}
    >
      <head>
        {/* Reveal is a progressive enhancement; without JS it never runs, so
            everything below the fold must still be visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full font-sans">
        <a
          href="#main"
          className="pressable sr-only rounded-full bg-surface-inverse px-5 py-3 text-sm font-semibold text-ink-inverse focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
