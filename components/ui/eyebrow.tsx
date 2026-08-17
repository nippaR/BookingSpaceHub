import type { ReactNode } from "react";

/**
 * Section label. Applied to *every* section heading now — a signal used only
 * half the time is not a signal. Uppercase at a small size, so it takes
 * positive tracking rather than the negative tracking large text wants.
 */
export function Eyebrow({
  children,
  className = "",
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "onDark";
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-eyebrow uppercase ${
        tone === "brand" ? "text-brand-strong" : "text-white/70"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-6 flex-none ${
          tone === "brand" ? "bg-brand-line" : "bg-white/30"
        }`}
      />
      {children}
    </p>
  );
}
