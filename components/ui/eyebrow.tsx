import type { ReactNode } from "react";

const base =
  "font-mono text-eyebrow uppercase tracking-[0.1em] text-bronze";

export function Eyebrow({
  children,
  className = "",
  block = false,
}: {
  children: ReactNode;
  className?: string;
  /** Render as a block so it can be centered above a section heading. */
  block?: boolean;
}) {
  return (
    <span className={`${base} ${block ? "block" : ""} ${className}`}>
      {children}
    </span>
  );
}
