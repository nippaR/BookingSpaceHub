"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * One shared IntersectionObserver for every <Reveal> on the page: elements
 * register themselves on mount and are unobserved the first time they enter
 * the viewport. The transition itself lives in globals.css behind
 * `[data-reveal]`, so this component only flips an attribute.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "shown");
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds, applied as a CSS transition delay. */
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

    // Already scrolled past (e.g. a refresh deep in the page) or motion is
    // turned off: show it immediately without waiting for the observer.
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
