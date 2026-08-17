import type { ReactNode, SVGProps } from "react";

/**
 * Decorative brand marks used inside the badge chips. They carry no meaning of
 * their own — the adjacent heading is the accessible label — so every icon is
 * hidden from assistive tech.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Svg({
  size = 22,
  ...props
}: IconProps & { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function BoardroomIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="8" width="32" height="14" rx="5" fill="#AF8B56" />
      <rect x="6" y="26" width="32" height="10" rx="5" fill="#1B1813" opacity=".15" />
    </Svg>
  );
}

export function PassesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="20" r="13" fill="#AF8B56" />
      <rect x="24" y="14" width="16" height="20" rx="5" fill="#1B1813" opacity=".85" />
    </Svg>
  );
}

export function HelpdeskIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="18" r="12" fill="#AF8B56" />
      <circle cx="30" cy="28" r="8" fill="#1B1813" opacity=".7" />
    </Svg>
  );
}

export function DocumentsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="10" y="6" width="24" height="30" rx="4" fill="#1B1813" opacity=".12" />
      <rect x="14" y="12" width="24" height="26" rx="4" fill="#AF8B56" />
    </Svg>
  );
}

export function InventoryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect
        x="10"
        y="10"
        width="20"
        height="20"
        rx="3"
        fill="#AF8B56"
        transform="rotate(45 20 20)"
      />
      <circle cx="32" cy="30" r="7" fill="#1B1813" opacity=".7" />
    </Svg>
  );
}

export function BillingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="12" width="30" height="20" rx="6" fill="#AF8B56" />
      <circle cx="34" cy="14" r="8" fill="#1B1813" opacity=".85" />
    </Svg>
  );
}

export function UnifyIcon(props: IconProps) {
  return (
    <Svg size={24} {...props}>
      <rect x="8" y="8" width="28" height="28" rx="8" fill="#AF8B56" opacity=".2" />
      <circle cx="22" cy="22" r="10" fill="#AF8B56" />
    </Svg>
  );
}

export function SelfServeIcon(props: IconProps) {
  return (
    <Svg size={24} {...props}>
      <circle cx="16" cy="16" r="10" fill="#AF8B56" />
      <rect x="22" y="22" width="16" height="16" rx="5" fill="#1B1813" opacity=".8" />
    </Svg>
  );
}

export function AuditGoldIcon(props: IconProps) {
  return (
    <Svg size={24} {...props}>
      <rect x="10" y="8" width="24" height="28" rx="4" fill="#AF8B56" />
      <rect x="16" y="16" width="12" height="3" fill="#1B1813" opacity=".5" />
      <rect x="16" y="22" width="12" height="3" fill="#1B1813" opacity=".5" />
    </Svg>
  );
}

export function IsolationIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="14" cy="20" r="11" fill="#AF8B56" opacity=".9" />
      <circle cx="28" cy="20" r="11" fill="#EBD6AE" opacity=".35" />
    </Svg>
  );
}

export function RolesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="8" y="20" width="8" height="14" rx="3" fill="#AF8B56" />
      <rect x="18" y="12" width="8" height="22" rx="3" fill="#EBD6AE" />
      <rect x="28" y="24" width="8" height="10" rx="3" fill="#AF8B56" opacity=".6" />
    </Svg>
  );
}

export function AuditDarkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="10" y="6" width="24" height="30" rx="4" fill="#EBD6AE" opacity=".2" />
      <rect x="14" y="10" width="24" height="28" rx="4" fill="#AF8B56" />
    </Svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.3 9.5c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2C.9 9.3 2 13 3.3 15c.6 1 1.4 2.1 2.4 2.1 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-1 2.3-2c.7-1.1 1-2.2 1-2.3 0 0-2-.8-2-3.1zM10.4 3.2c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
    </svg>
  );
}

export function GooglePlayIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M.7.4A1 1 0 0 0 .4 1v14.9a1 1 0 0 0 .3.7l8-8.1-8-8.1zM11.6 5.4 3.1.6 9.5 7l2.1-1.6zM14.2 7.6l-2-1.2L10 8.5l2.2 2.1 2-1.1a1 1 0 0 0 0-1.9zM3.1 16.3l8.5-4.8-2-2-6.5 6.8z" />
    </svg>
  );
}
