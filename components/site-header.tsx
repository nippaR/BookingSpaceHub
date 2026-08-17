"use client";

import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";
import { Wordmark } from "@/components/wordmark";
import { navLinks, site } from "@/lib/site-content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 flex flex-wrap items-center justify-between gap-5 border-b border-line bg-white px-gutter py-4 transition-shadow duration-250 ${
        scrolled ? "shadow-header" : "shadow-none"
      }`}
    >
      <a href="#top" className="text-[20px]">
        <Wordmark />
      </a>

      <nav aria-label="Main" className="flex flex-wrap items-center gap-[clamp(12px,1.8vw,26px)] text-[14.5px] font-medium">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href={site.appUrl}
          rel="noopener noreferrer"
          className="text-[14.5px] font-semibold text-ink"
        >
          Log in
        </a>
        <CtaLink href="#contact" size="sm">
          Book a Demo
        </CtaLink>
      </div>
    </header>
  );
}
