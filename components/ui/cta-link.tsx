import type { AnchorHTMLAttributes, ReactNode } from "react";

const variants = {
  /** Primary action on light surfaces. */
  gold: "bg-gold text-ink font-semibold hover:bg-gold-hover",
  /** Secondary action on light surfaces. */
  ghost:
    "border border-line-bold text-ink font-medium hover:border-gold hover:bg-cream-warm",
  /** Primary action on the gold CTA panel. */
  dark: "bg-ink text-white font-semibold hover:bg-[#332C23]",
  /** Secondary action on the gold CTA panel. */
  ghostOnGold: "border border-ink/30 text-ink font-medium hover:bg-ink/10",
} as const;

const sizes = {
  sm: "h-[42px] px-5 text-[14.5px]",
  md: "h-[52px] px-7 text-[15.5px]",
  lg: "h-[54px] px-7 text-[15.5px]",
} as const;

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/**
 * Every link on this page is either an in-page anchor or an external
 * destination, so a plain <a> is the right element — `next/link` would only
 * add router work for hash navigation. External targets get safe rel values.
 */
export function CtaLink({
  href,
  children,
  variant = "gold",
  size = "md",
  className = "",
  ...props
}: CtaLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
