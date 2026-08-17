import type { Metadata } from "next";
import { DM_Mono, Manrope, Poppins } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cwms.io"),
  title: {
    default: "CWMS — Run and grow your coworking space",
    template: "%s | CWMS",
  },
  description:
    "Members, bookings and billing in one platform — multi-tenant coworking management software for workspace operators.",
  openGraph: {
    type: "website",
    siteName: "CWMS",
    title: "CWMS — Run and grow your coworking space",
    description:
      "Members, bookings and billing in one platform — built for multi-tenant operators.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CWMS — Run and grow your coworking space",
    description:
      "Members, bookings and billing in one platform — built for multi-tenant operators.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${poppins.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
        {/* Without JS the reveal animation never runs, so show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
