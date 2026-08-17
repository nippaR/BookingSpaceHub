import type { CSSProperties } from "react";

import heroShot from "@/assets/screenshots/user-sidebar.png";
import { CheckIcon } from "@/components/icons";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { CtaLink } from "@/components/ui/cta-link";

const assurances = [
  "Live in 2–4 weeks",
  "Multi-site from day one",
  "No per-seat pricing",
];

/** Stagger helper — reads as a delay at the call site rather than a style blob. */
const at = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

/**
 * Centred composition, with hierarchy carried by size, weight and spacing
 * rather than by alignment. Spacing is owned by the flex `gap` alone — the
 * per-child margins that used to sit alongside it doubled every step and made
 * the rhythm impossible to reason about.
 *
 * The entrance is pure CSS, not <Reveal>. This is the LCP region: <Reveal>
 * starts at `opacity: 0` and waits on an IntersectionObserver, which would
 * make the page's most important content depend on hydration to appear. A
 * load animation needs no JS and cannot fail.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-25 pb-section-sm sm:pt-20"
    >
      {/* A single soft gold wash anchored behind the headline. Static —
          large, slowly oscillating background motion is exactly what reduced
          motion exists to prevent, so there is none. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[64rem] max-w-none -translate-x-1/2 rounded-[50%] bg-brand/[0.07] blur-3xl"
      />

      <div className="mx-auto max-w-page px-gutter">
        {/* Wider than the copy below it: a headline wants a longer measure
            than body text, and the lead paragraph keeps its own 38rem cap so
            it stays at a comfortable reading width regardless. */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* Kept as <h1>: all the styling comes from `text-display`, so the
              tag is free to be the correct one. As an <h4> the page had no
              top-level heading at all and the outline started at depth four,
              which costs both assistive tech and search. */}
          <h1 className="hero-in text-display text-balance">
            Run and grow your coworking space on
            <span className="text-brand-strong"> one platform</span>
          </h1>

          <p
            className="hero-in max-w-[38rem] text-lead text-ink-2"
            style={at(90)}
          >
            Members, bookings and billing share a single tenant record — so the
            front desk stops re-keying, and month end stops being a
            reconciliation exercise.
          </p>

          <div
            className="hero-in mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={at(170)}
          >
            <CtaLink href="#demo" size="lg">
              Book a demo
            </CtaLink>
            <CtaLink href="#platform" variant="secondary" size="lg">
              See how it works
            </CtaLink>
          </div>

          <ul
            className="hero-in mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2.5"
            style={at(240)}
          >
            {assurances.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs font-medium text-ink-3"
              >
                <CheckIcon
                  className="size-4 flex-none text-brand"
                  strokeWidth="2"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* `hero-in-opaque` moves without fading — see globals.css. The mockup
          is the largest element on the page, so it is what LCP measures. */}
      <div
        className="hero-in-opaque mx-auto mt-14 max-w-page px-gutter sm:mt-16"
        style={at(160)}
      >
        <BrowserMockup
          src={heroShot}
          alt="CWMS admin portal dashboard showing workspace occupancy, active members and open tickets"
          priority
          sizes="(min-width: 78rem) 1152px, 92vw"
        />
      </div>
    </section>
  );
}
