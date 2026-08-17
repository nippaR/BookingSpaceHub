"use server";

import {
  DEMO_FIELDS,
  validateDemoField,
  type DemoField,
  type DemoFormState,
} from "@/lib/demo-form";

/**
 * Demo request handler.
 *
 * ⚠️ NOT WIRED UP. This validates the submission and returns a success state,
 * but it does not deliver the lead anywhere. Replace the marked block with a
 * real destination (CRM webhook, Resend/Postmark email, database insert)
 * before this page goes live, or every request will be silently dropped.
 */
export async function requestDemo(
  _previous: DemoFormState,
  formData: FormData,
): Promise<DemoFormState> {
  const values: Partial<Record<DemoField, string>> = {};
  const errors: Partial<Record<DemoField, string>> = {};

  for (const field of DEMO_FIELDS) {
    const value = String(formData.get(field) ?? "");
    values[field] = value;
    const error = validateDemoField(field, value);
    if (error) errors[field] = error;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  try {
    // ─── Replace this block with real delivery ────────────────────────────
    // e.g. await resend.emails.send({ ... }) or await crm.leads.create({ ... })
    console.info("[demo request]", values);
    // ──────────────────────────────────────────────────────────────────────
  } catch {
    // Report a failed send rather than swallowing it — a form that says
    // "thanks" after dropping the lead is worse than one that says it broke.
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please try again, or email us directly.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll be in touch within one working day.",
    errors: {},
    values: {},
  };
}
