import type { ComponentType, SVGProps } from "react";

import {
  AuditDarkIcon,
  AuditGoldIcon,
  BillingIcon,
  BoardroomIcon,
  DocumentsIcon,
  HelpdeskIcon,
  InventoryIcon,
  IsolationIcon,
  PassesIcon,
  RolesIcon,
  SelfServeIcon,
  UnifyIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type Feature = {
  icon: Icon;
  title: string;
  description: string;
};

export const site = {
  name: "CWMS",
  appUrl: "https://app.cwms.io",
  salesEmail: "sales@cwms.io",
  phone: { display: "+971 4 000 0000", href: "tel:+97140000000" },
  location: "Dubai, UAE",
} as const;

export const navLinks = [
  { label: "Features", href: "#modules" },
  { label: "Mobile App", href: "#mobile" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
] as const;

export const stats = [
  { value: "9", label: "Modules, one platform" },
  { value: "∞", label: "Tenants, isolated data" },
  { value: "100%", label: "Actions audit-logged" },
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
    description: "Public links included",
  },
  {
    icon: PassesIcon,
    title: "Day Passes & Visitors",
    description: "Passes and access cards",
  },
  {
    icon: HelpdeskIcon,
    title: "Helpdesk",
    description: "Tickets, owners, status",
  },
  {
    icon: DocumentsIcon,
    title: "Documents",
    description: "Templates & e-signatures",
  },
  {
    icon: InventoryIcon,
    title: "Inventory",
    description: "Item master & stock transfer",
  },
  {
    icon: BillingIcon,
    title: "Billing & Invoicing",
    description: "Recurring & one-off charges",
  },
];

export const differentiators: Feature[] = [
  {
    icon: UnifyIcon,
    title: "One tenant model",
    description:
      "Every module — members, rooms, billing, tickets — reads from the same tenant record.",
  },
  {
    icon: SelfServeIcon,
    title: "Members serve themselves",
    description:
      "Booking, passes and tickets move off your front desk and into the portal and app.",
  },
  {
    icon: AuditGoldIcon,
    title: "Answerable by design",
    description:
      "Roles, permissions and an audit log behind every change, for every tenant.",
  },
];

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
    icon: AuditDarkIcon,
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
      { label: "Features", href: "#modules" },
      { label: "Mobile app", href: "#mobile" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact sales", href: "#contact" },
      { label: "Tenant login", href: site.appUrl },
    ],
  },
] as const;
