import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Near-black is the action colour, matching the product's own primary button.
 * Gold stays reserved for identity, the nav bar and accents. It measures only
 * 3.2:1 on white, so using it as a button fill would put every CTA under the
 * contrast floor; dark ink keeps them all well clear of it.
 */
const variants = {
  primary:
    "bg-surface-inverse text-ink-inverse font-semibold shadow-raised hover:opacity-90",
  secondary:
    "border border-line-strong text-ink font-medium hover:border-ink-3 hover:bg-surface-2",
  /**
   * For the demo panel, which stays dark in both themes. These deliberately
   * do NOT use the theme-flipping surface tokens: on that panel a token that
   * inverts would turn the button dark-on-dark in dark mode.
   */
  onDark: "bg-white text-[#17140f] font-semibold shadow-raised hover:bg-white/90",
  onDarkGhost:
    "border border-white/25 text-white font-medium hover:bg-white/10 hover:border-white/40",
} as const;

const sizes = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[3.25rem] px-7 text-body gap-2",
} as const;

const base =
  "pressable inline-flex items-center justify-center rounded-full whitespace-nowrap select-none";

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

type CtaLinkProps = Common & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/**
 * In-page anchors and external destinations only, so a plain <a> is right —
 * `next/link` would add router work for hash navigation.
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CtaLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

type CtaButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function CtaButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CtaButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} disabled:pointer-events-none disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
