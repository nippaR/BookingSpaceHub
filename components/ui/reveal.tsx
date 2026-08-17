"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-linked entrance and exit.
 *
 * One shared IntersectionObserver serves every <Reveal> on the page. Unlike
 * the earlier one-shot version, elements stay observed for the life of the
 * page so they can animate back out when they leave the viewport and in again
 * when they return.
 *
 * The important detail is direction. Enter and exit have to travel the same
 * path, so the observer records which edge an element left by and sets
 * `--reveal-y` to match: leave through the top and it continues upward, leave
 * through the bottom and it drops back down. Reversing to a fixed offset
 * regardless of direction makes half the exits move against the scroll.
 *
 * Deliberately not used above the fold: hero content renders visible so it
 * neither waits on hydration nor delays LCP.
 */
let observer: IntersectionObserver | null = null;

/** Matches the default travel in globals.css. */
const TRAVEL = "1.5rem";

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", "shown");
          continue;
        }

        // `rootBounds` is null in rare cross-origin cases; the viewport top is
        // 0 anyway since this observer sets no top margin.
        const viewportTop = entry.rootBounds?.top ?? 0;
        const leftViaTop = entry.boundingClientRect.bottom <= viewportTop;

        el.style.setProperty("--reveal-y", leftViaTop ? `-${TRAVEL}` : TRAVEL);
        el.setAttribute("data-reveal", "hidden");
      }
    },
    // A low threshold plus a negative bottom margin means tall elements
    // (a full-width mockup) trigger as they cross into view rather than
    // waiting to be 15% visible, which on a phone can be most of a scroll.
    { threshold: 0.01, rootMargin: "0px 0px -12% 0px" },
  );
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. Applied on entrance only. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion opts out entirely — including the exit, since repeatedly
    // fading content away as it scrolls is exactly the kind of incidental
    // motion the preference exists to remove.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-reveal", "shown");
      return;
    }

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal="hidden"
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
