import type { ComponentType, SVGProps } from "react";

import {
  AuditIcon,
  BillingIcon,
  BoardroomIcon,
  DocumentsIcon,
  HelpdeskIcon,
  InventoryIcon,
  IsolationIcon,
  PassesIcon,
  RolesIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type Feature = {
  icon: Icon;
  title: string;
  description: string;
};

export const site = {
  name: "CWMS",
  appUrl: "https://cwms.bookingspacehub.com/",
  /**
   * Display text and link target are deliberately different: the address
   * shown stays the public-facing one, while mail actually routes to the
   * meetings inbox. Same `{ display, href }` shape as `phone` below.
   *
   * Worth knowing: anyone who copies the visible text by hand, or reads it
   * over the phone, gets sales@ — only clicking reaches meetings@. If both
   * should land in the same place, make `display` match.
   */
  salesEmail: {
    display: "sales@cwms.io",
    href: "mailto:meetings@svspaces.co",
  },
  phone: { display: "+971 4 000 0000", href: "tel:+97140000000" },
  location:"Colombo, Sri Lanka",
} as const;

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Modules", href: "#modules" },
  { label: "Trust", href: "#trust" },
  { label: "Mobile app", href: "#mobile" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * Product facts, not invented outcome metrics — each one is something the
 * rest of the page already commits to, so nothing here is unfalsifiable.
 */
export const stats = [
  { value: "9", label: "Modules on one tenant record" },
  { value: "2–4", unit: "wks", label: "Typical time to go live" },
  { value: "100", unit: "%", label: "Actions written to the audit log" },
  { value: "24/7", label: "Member self-service, no front desk" },
] as const;

export const automationPoints = [
  {
    title: "Automated billing",
    description: "recurring plan charges, invoices and credit notes.",
  },
  {
    title: "Self-serve bookings",
    description: "members reserve rooms and desks; access follows automatically.",
  },
  {
    title: "Onboarding workflows",
    description: "invitations, agreements and activation as one sequence.",
  },
] as const;

export const scalePoints = [
  {
    title: "Centralized admin",
    description: "bookings, members and finances from one login, role by role.",
  },
  {
    title: "Per-tenant settings",
    description: "pricing, taxes and access rules by location.",
  },
  {
    title: "Cross-site reporting",
    description: "compare occupancy and revenue across your network.",
  },
] as const;

export const modules: Feature[] = [
  {
    icon: BoardroomIcon,
    title: "Boardroom Booking",
    description: "Branded public booking links included.",
  },
  {
    icon: PassesIcon,
    title: "Day Passes & Visitors",
    description: "Passes issued and access cards tracked.",
  },
  {
    icon: HelpdeskIcon,
    title: "Helpdesk",
    description: "Tickets with owners, status and history.",
  },
  {
    icon: DocumentsIcon,
    title: "Documents",
    description: "Templates and e-signatures on file.",
  },
  {
    icon: InventoryIcon,
    title: "Inventory",
    description: "Item master and stock transfer between sites.",
  },
  {
    icon: BillingIcon,
    title: "Billing & Invoicing",
    description: "Recurring plans and one-off charges.",
  },
];

/**
 * The three arguments, in the order an operator evaluates them. Numbered
 * rather than iconified — this section carries the reasoning, so it gets a
 * different visual form from the module list.
 */
export const differentiators = [
  {
    title: "One tenant model",
    description:
      "Members, rooms, billing and tickets all read from the same tenant record — so there is no reconciliation step and no second source of truth.",
  },
  {
    title: "Members serve themselves",
    description:
      "Booking, passes and tickets move off your front desk and into the portal and app, which is where most of the daily volume actually lives.",
  },
  {
    title: "Answerable by design",
    description:
      "Roles, permissions and an audit log sit behind every change, for every tenant — so you can answer a question about last month without guessing.",
  },
] as const;

export const securityPillars: Feature[] = [
  {
    icon: IsolationIcon,
    title: "Data isolation",
    description: "Every tenant's records stay within its own boundary.",
  },
  {
    icon: RolesIcon,
    title: "Roles & permissions",
    description: "Each team member sees only what their role needs.",
  },
  {
    icon: AuditIcon,
    title: "Audit trail",
    description: "Every change logged with actor and timestamp.",
  },
];

export const faqs = [
  {
    question: "Can we run more than one location or brand?",
    answer:
      "Yes. Each location or brand is its own tenant with separate members, plans, rooms and invoices, while your team can hold roles across several of them from one login.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most operators are live in two to four weeks: tenant setup and data import in week one, resource and plan configuration next, then a pilot group of members before full rollout.",
  },
  {
    question: "Can members book meeting rooms without an account?",
    answer:
      "Yes. Each boardroom can publish a branded public booking link, so prospects and visitors book and pay without being onboarded first.",
  },
  {
    question: "Does it handle our access hardware?",
    answer:
      "Access cards and passes are issued and tracked in CWMS, and we integrate with common controller hardware. Tell us your setup on the demo call and we will confirm the specifics.",
  },
  {
    question: "How does billing work with our accounting system?",
    answer:
      "Invoices are generated from plans, bookings and passes already recorded in CWMS, then exported or synced to your accounting system so nothing is re-keyed at month end.",
  },
  {
    question: "What can members do in the mobile app?",
    answer:
      "Book rooms, request day and visitor passes, raise support tickets, view agreements and see invoices — the requests your front desk currently handles by message.",
  },
] as const;

export const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "#platform" },
      { label: "Modules", href: "#modules" },
      { label: "Mobile app", href: "#mobile" },
      { label: "Trust & security", href: "#trust" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Book a demo", href: "#demo" },
      { label: "Tenant login", href: site.appUrl },
    ],
  },
] as const;
