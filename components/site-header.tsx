"use client";

import { useEffect, useState } from "react";

import { MenuIcon } from "@/components/icons";
import { CtaLink } from "@/components/ui/cta-link";
import { NavSheet } from "@/components/ui/nav-sheet";
import { Wordmark } from "@/components/wordmark";
import { navLinks, site } from "@/lib/site-content";

/**
 * A floating pane of frosted glass that content scrolls underneath.
 *
 * The desktop nav answers "where am I?" with a live active-section marker;
 * the mobile nav is a real sheet rather than a wrapping row that used to eat
 * a third of a phone viewport.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section owns the viewport so the nav can show it.
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setActive(bestRatio > 0 ? best : null);
      },
      {
        // Bias the "current" band toward the upper half of the viewport,
        // which is where a reader's attention actually sits.
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the sheet once we reach a viewport that shows the full nav.
  useEffect(() => {
    if (!menuOpen) return;
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [menuOpen]);

  return (
    <>
      {/* The bar floats: the sticky element is a transparent rail, and the
          glass pill inside it is what the user sees. Padding lives on the rail
          so the pill's rounded corners are never clipped. */}
      <header className="pointer-events-none sticky top-0 z-30 px-gutter pt-[var(--header-gap)]">
        <div
          data-scrolled={scrolled}
          className="material-nav pointer-events-auto mx-auto flex h-[var(--header-h)] max-w-page items-center justify-between gap-2 rounded-full pr-2 pl-4 sm:gap-3 sm:pr-3 sm:pl-5"
        >
          <a
            href="#top"
            className="pressable-subtle -m-1 flex rounded-lg p-1"
            aria-label={`${site.name} — back to top`}
          >
            <Wordmark priority />
          </a>

          {/* The active item is marked by weight plus the underline rather
              than by a colour change, so it stays legible against whatever
              happens to be blurred behind the glass at the time. */}
          <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`pressable-subtle relative rounded-full px-3 py-2 text-sm text-on-nav hover:bg-on-nav/8 ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1 h-0.5 origin-center rounded-full bg-on-nav transition-transform duration-300 ease-[var(--ease-spring)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <a
              href={site.appUrl}
              rel="noopener noreferrer"
              className="pressable-subtle hidden rounded-full px-3 py-2 text-sm font-semibold text-on-nav hover:bg-on-nav/8 sm:block"
            >
              Log in
            </a>
            <CtaLink href="#demo" size="sm" className="hidden sm:inline-flex">
              Book a demo
            </CtaLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="pressable flex size-10 items-center justify-center rounded-full text-on-nav hover:bg-on-nav/8 md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <NavSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        labelledBy="mobile-nav-title"
      >
        {/* Not a heading: this sits in the header, so as an <h2> it landed
            before the page's <h1> and broke the document outline.
            `aria-labelledby` is happy with any element. */}
        <p id="mobile-nav-title" className="sr-only">
          Site navigation
        </p>

        <nav aria-label="Mobile">
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.href.slice(1) ? "true" : undefined}
                  className="pressable-subtle flex items-center justify-between rounded-2xl px-4 py-3.5 text-lead font-semibold text-ink aria-[current]:text-brand-strong hover:bg-surface-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 grid gap-2.5 border-t border-line pt-5">
          <CtaLink
            href="#demo"
            size="lg"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            Book a demo
          </CtaLink>
          <CtaLink
            href={site.appUrl}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Log in
          </CtaLink>
        </div>
      </NavSheet>
    </>
  );
}
