import type { SVGProps } from "react";

/**
 * Line icons drawn on a 24px grid with a 1.6px stroke, inheriting
 * `currentColor` so they pick up whatever tone the surface sets. They are
 * decorative — the adjacent heading is always the accessible label — so each
 * one is hidden from assistive tech.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* --- Modules ------------------------------------------------------------ */

/** A meeting table with seats — boardroom booking. */
export function BoardroomIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="8.5" width="18" height="7" rx="2.5" />
      <path d="M7 8.5V6.5M17 8.5V6.5M7 17.5v-2M17 17.5v-2M12 6.5v-2M12 19.5v-2" />
    </Icon>
  );
}

/** A pass card with a lanyard hole — day passes and visitors. */
export function PassesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 9.5h18" />
      <circle cx="8" cy="14" r="1.6" />
      <path d="M13 13h5M13 16h3" />
    </Icon>
  );
}

/** A speech bubble with a ticket tag — helpdesk. */
export function HelpdeskIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 13.5a3 3 0 0 1-3 3H9l-4.5 3.5v-3.5a3 3 0 0 1-1-2.2V7a3 3 0 0 1 3-3h10.5a3 3 0 0 1 3 3z" />
      <path d="M8.5 8.5h7M8.5 12h4.5" />
    </Icon>
  );
}

/** A document with a signature line — templates and e-signatures. */
export function DocumentsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 16.5c1.2-1.8 2-1.8 3 0s1.8 1.2 4-1.5" />
    </Icon>
  );
}

/** Stacked boxes — inventory and stock transfer. */
export function InventoryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8.2 12 3.5l9 4.7v7.6L12 20.5 3 15.8z" />
      <path d="M3 8.2 12 13l9-4.8M12 13v7.5" />
    </Icon>
  );
}

/** A receipt with a currency row — billing and invoicing. */
export function BillingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 3.5h14v17l-2.3-1.6-2.3 1.6-2.4-1.6-2.3 1.6-2.4-1.6L5 20.5z" />
      <path d="M9 8.5h6M9 12.5h6" />
    </Icon>
  );
}

/* --- Trust -------------------------------------------------------------- */

/** Two separated containers — per-tenant data isolation. */
export function IsolationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.75" y="6" width="7.5" height="12" rx="2.5" />
      <rect x="13.75" y="6" width="7.5" height="12" rx="2.5" />
      <path d="M12 3.5v17" strokeDasharray="2 2.6" />
    </Icon>
  );
}

/** A person behind a key — roles and permissions. */
export function RolesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 9.4-3.9" />
      <circle cx="16.75" cy="15.75" r="2.25" />
      <path d="M18.4 17.4 21 20l-1.2 1.2" />
    </Icon>
  );
}

/** A list under a clock — every change logged with actor and timestamp. */
export function AuditIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 10.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.5" />
      <path d="M7.5 8.5h8M7.5 12h5" />
      <circle cx="17" cy="16.5" r="4.5" />
      <path d="M17 14.5v2.2l1.4 1" />
    </Icon>
  );
}

/* --- Interface ---------------------------------------------------------- */

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h16M4 16h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.5 12h2M19.5 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
    </Icon>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.2v.1" />
    </Icon>
  );
}

/* --- Stores ------------------------------------------------------------- */

export function AppleIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="19"
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
      width="16"
      height="18"
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
