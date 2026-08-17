/**
 * Shared shape and validation rules for the demo request form.
 *
 * Kept out of `app/actions.ts` because a `"use server"` module may only
 * export async functions — and out of the client component because the same
 * rules have to run on the server, where they are the ones that count.
 * Client-side validation is for feedback; server-side validation is for trust.
 */

export type DemoField = "name" | "email" | "company" | "locations" | "message";

export type DemoFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<DemoField, string>>;
  /** Echoed back so a failed submit never wipes what was typed. */
  values: Partial<Record<DemoField, string>>;
};

export const initialDemoState: DemoFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

export const DEMO_FIELDS: DemoField[] = [
  "name",
  "email",
  "company",
  "locations",
  "message",
];

export const LOCATION_OPTIONS = [
  "1 location",
  "2–5 locations",
  "6–15 locations",
  "16+ locations",
] as const;

/** Deliberately permissive — the goal is to catch typos, not police formats. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
]);

export function validateDemoField(
  field: DemoField,
  value: string,
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Please tell us your name.";
      if (trimmed.length < 2) return "That looks too short.";
      return undefined;

    case "email": {
      if (!trimmed) return "We need an email to send the invite to.";
      if (!EMAIL_PATTERN.test(trimmed)) {
        return "That does not look like an email address.";
      }
      const domain = trimmed.split("@")[1]?.toLowerCase();
      if (domain && FREE_EMAIL_DOMAINS.has(domain)) {
        return "Please use your work email so we can find your account.";
      }
      return undefined;
    }

    case "company":
      if (!trimmed) return "Which space are you running?";
      return undefined;

    case "locations":
      if (!trimmed) return "Pick the closest range.";
      return undefined;

    case "message":
      if (trimmed.length > 2000) return "Please keep this under 2000 characters.";
      return undefined;
  }
}
