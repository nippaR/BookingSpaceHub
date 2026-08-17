import type { ReactNode } from "react";

const tones = {
  cream: "bg-cream-deep",
  translucent: "bg-white/10",
} as const;

/** 46×46 rounded chip that holds a decorative section icon. */
export function IconBadge({
  children,
  tone = "cream",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div
      className={`flex size-[46px] items-center justify-center rounded-[13px] ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
