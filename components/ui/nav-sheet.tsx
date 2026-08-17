"use client";

import { useCallback, useEffect, useRef } from "react";

import { CloseIcon } from "@/components/icons";
import {
  createSpring,
  project,
  rubberband,
  SPRING,
  VelocityTracker,
  type Spring,
} from "@/lib/spring";

/**
 * The mobile navigation sheet.
 *
 * It enters and exits along the same axis it is dragged on, and it emerges
 * downward from the header — the same place the trigger lives — so the
 * spatial relationship between button and panel is never ambiguous.
 *
 * The whole surface is grabbable at any moment, including mid-animation: a
 * pointer-down stops the spring where it is and resumes 1:1 tracking from
 * that exact on-screen position, so an opening sheet can be thrown straight
 * back shut without waiting for it to finish opening first.
 */

/** Movement, in px, before a touch is treated as a drag rather than a tap. */
const DRAG_THRESHOLD = 10;

type NavSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
};

export function NavSheet({ open, onClose, children, labelledBy }: NavSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<Spring | null>(null);
  const tracker = useRef(new VelocityTracker());

  const heightRef = useRef(0);
  const draggingRef = useRef(false);
  const pendingRef = useRef(false);
  const grabOffsetRef = useRef(0);
  const startYRef = useRef(0);
  const reducedRef = useRef(false);

  // Held in a ref so the pointer handlers below can stay stable across
  // renders without the spring being torn down and rebuilt each time.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  /* --- Rendering ------------------------------------------------------- */

  /**
   * `progress` runs 0 (fully hidden, above the viewport) → 1 (fully open).
   * Everything visual derives from it, so the scrim, the sheet and the
   * blur all stay locked to the finger for the whole gesture rather than
   * only catching up when it ends.
   */
  const render = useCallback((progress: number) => {
    const sheet = sheetRef.current;
    const scrim = scrimRef.current;
    if (!sheet || !scrim) return;

    const height = heightRef.current || sheet.offsetHeight;
    const hidden = progress <= 0.001;

    sheet.style.transform = `translate3d(0, ${(progress - 1) * height}px, 0)`;
    // Opacity runs ahead of position so the surface is solid well before it
    // finishes travelling — it reads as a material arriving rather than a
    // translucent layer sliding into place. Blur is left constant: animating
    // backdrop-filter per frame is the one thing here that reliably drops
    // frames on a mid-range phone.
    sheet.style.opacity = String(Math.min(1, progress * 1.6));

    scrim.style.opacity = String(Math.max(0, Math.min(1, progress)));
    scrim.style.visibility = hidden ? "hidden" : "visible";
    sheet.style.visibility = hidden ? "hidden" : "visible";
    sheet.style.pointerEvents = progress > 0.5 ? "auto" : "none";
    scrim.style.pointerEvents = hidden ? "none" : "auto";
  }, []);

  /* --- Spring ---------------------------------------------------------- */

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const spring = createSpring(0, render, {
      // A drag precedes every dismissal, so a little overshoot is earned
      // here in a way it would not be on something that merely faded in.
      damping: SPRING.sheet.damping,
      response: SPRING.sheet.response,
      restDelta: 0.001,
    });
    springRef.current = spring;
    render(0);

    return () => spring.stop();
  }, [render]);

  /* --- Open / close ----------------------------------------------------- */

  useEffect(() => {
    const spring = springRef.current;
    const sheet = sheetRef.current;
    if (!spring || !sheet) return;

    heightRef.current = sheet.offsetHeight;

    if (reducedRef.current) {
      // Non-vestibular equivalent: no travel, just a short cross-fade
      // handled by the CSS transition on the wrapper.
      spring.set(open ? 1 : 0);
      return;
    }

    spring.setTarget(open ? 1 : 0);
  }, [open]);

  /* --- Escape, scroll lock, focus -------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const sheet = sheetRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !sheet) return;

      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Compensate for the scrollbar so locking does not shift the layout.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    document.addEventListener("keydown", onKeyDown);
    sheet?.querySelector<HTMLElement>("a[href], button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  /* --- Drag ------------------------------------------------------------- */

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || reducedRef.current) return;

    const spring = springRef.current;
    const sheet = sheetRef.current;
    if (!spring || !sheet) return;

    // Interrupt: take over from wherever the spring currently *is* on screen,
    // never from where it was heading.
    const current = spring.getValue();
    spring.stop();

    heightRef.current = sheet.offsetHeight;
    grabOffsetRef.current = current;
    startYRef.current = event.clientY;
    pendingRef.current = true;
    draggingRef.current = false;

    tracker.current.reset();
    tracker.current.add(event.clientY, event.timeStamp);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pendingRef.current) return;

    const spring = springRef.current;
    const height = heightRef.current;
    if (!spring || height === 0) return;

    const delta = event.clientY - startYRef.current;
    tracker.current.add(event.clientY, event.timeStamp);

    // Hysteresis: let a vertical intent declare itself before we commit,
    // so a tap on a nav link is never stolen by the drag recogniser.
    if (!draggingRef.current) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      // If the sheet's own content is scrolled, that scroll owns the gesture.
      // Competing for it would move the sheet and the list at the same time.
      if (event.currentTarget.scrollTop > 0) {
        pendingRef.current = false;
        return;
      }
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    let progress = grabOffsetRef.current + delta / height;

    // Past fully-open, resist progressively instead of stopping dead.
    if (progress > 1) {
      progress = 1 + rubberband((progress - 1) * height, height) / height;
    }

    spring.set(Math.max(0, progress));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pendingRef.current) return;

    const wasDragging = draggingRef.current;
    pendingRef.current = false;
    draggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!wasDragging) return;

    const spring = springRef.current;
    const height = heightRef.current;
    if (!spring || height === 0) return;

    const velocity = tracker.current.get(); // px/s, positive = downward
    const progress = spring.getValue();

    // Land where the gesture was going, not where the finger happened to
    // lift: project the momentum forward first, then pick the endpoint.
    const projected = progress + project(velocity) / height;
    const shouldOpen = projected > 0.5;

    // Hand the release velocity to the spring so there is no seam between
    // dragging and animating.
    spring.setVelocity(velocity / height);
    spring.setTarget(shouldOpen ? 1 : 0);

    if (!shouldOpen) onCloseRef.current();
  };

  return (
    <>
      <div
        ref={scrimRef}
        data-scrim=""
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-[var(--c-scrim)] backdrop-blur-[2px] md:hidden"
        style={{ opacity: 0, visibility: "hidden" }}
      />

      <div
        ref={sheetRef}
        data-sheet=""
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="material-thick fixed inset-x-3 top-3 z-50 max-h-[88dvh] overflow-y-auto rounded-panel border border-[var(--c-material-edge)] shadow-sheet md:hidden"
        style={{ opacity: 0, visibility: "hidden", touchAction: "pan-y" }}
      >
        <div className="flex items-center justify-end px-gutter pt-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="pressable -mr-2 flex size-11 items-center justify-center rounded-full text-ink-2 hover:bg-surface-3 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-gutter pb-5">{children}</div>

        {/* Grab handle: tells the user this surface is draggable, and gives
            the thumb an obvious place to land. */}
        <div className="flex justify-center pb-3" aria-hidden="true">
          <span className="h-1 w-9 rounded-full bg-ink-3/40" />
        </div>
      </div>
    </>
  );
}
