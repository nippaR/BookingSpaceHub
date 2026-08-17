"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { requestDemo } from "@/app/actions";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { CtaButton } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  initialDemoState,
  LOCATION_OPTIONS,
  validateDemoField,
  type DemoField,
} from "@/lib/demo-form";
import { site } from "@/lib/site-content";

/**
 * The native dropdown popup is painted by the OS using the select's own
 * `background-color`. That is `bg-white/5` here — 5% white over transparent —
 * so the options rendered as white text on an effectively white popup and
 * were invisible on Windows. `color-scheme: dark` cannot rescue an explicitly
 * transparent background, so each <option> carries solid colours of its own.
 * Inline styles rather than classes: `className` on <option> is ignored by
 * several browsers.
 */
const OPTION_STYLE = { backgroundColor: "#241f19", color: "#f2efe9" };

const promises = [
  "A walkthrough of your actual workflow, not a generic deck",
  "Straight answers on migration and access hardware",
  "No obligation, and no sales sequence afterwards",
];

/**
 * The page's one high-contrast surface, and the only place it asks for
 * something. The old version ended nine sections of argument at a `mailto:`,
 * which leaked essentially every visitor who did not already have a desktop
 * mail client configured.
 *
 * Validation is inline and progressive: a field stays quiet until you leave
 * it, then corrects live as you type. Errors on submit are never the first
 * time you hear about a problem.
 */
export function Demo() {
  const [state, formAction, pending] = useActionState(
    requestDemo,
    initialDemoState,
  );
  /** Fields the user has validated locally since the last submit. */
  const [checked, setChecked] = useState<ReadonlySet<DemoField>>(new Set());
  const [live, setLive] = useState<Partial<Record<DemoField, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Focus only — the error display below is derived, not synced, so nothing
  // here has to write state back after a render.
  useEffect(() => {
    if (state.status === "error") {
      const first = Object.keys(state.errors)[0];
      if (first) {
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
    } else if (state.status === "success") {
      statusRef.current?.focus();
    }
  }, [state]);

  /**
   * Local validation wins once a field has been visited; until then the
   * server's verdict stands. That way a submit-time error shows immediately
   * and then clears the moment the user actually fixes it.
   */
  const errorFor = (field: DemoField) =>
    checked.has(field) ? live[field] : state.errors[field];

  const check = (field: DemoField, value: string) => {
    setChecked((prev) => (prev.has(field) ? prev : new Set(prev).add(field)));
    setLive((prev) => ({ ...prev, [field]: validateDemoField(field, value) }));
  };

  const fieldProps = (field: DemoField) => ({
    name: field,
    id: `demo-${field}`,
    defaultValue: state.values[field] ?? "",
    "aria-invalid": errorFor(field) ? (true as const) : undefined,
    "aria-describedby": errorFor(field) ? `demo-${field}-error` : undefined,
    onBlur: (
      event: React.FocusEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => check(field, event.target.value),
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      // Only correct live once the field has been visited (or already failed
      // server-side), so nobody is told their email is invalid while typing
      // the third character of it.
      if (checked.has(field) || state.errors[field]) {
        check(field, event.target.value);
      }
    },
  });

  return (
    <section id="demo" className="px-gutter pb-section">
      <div className="mx-auto max-w-page overflow-hidden rounded-panel bg-panel text-on-panel">
        <div className="grid gap-x-16 gap-y-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-16">
          <div>
            <Eyebrow tone="onDark">Book a demo</Eyebrow>
            <h2 className="mt-5 text-h2 text-balance">
              See it running on your own numbers
            </h2>
            <p className="mt-4 max-w-[32rem] text-lead text-white/70">
              Thirty minutes, screen shared, with someone who has migrated
              operators before.
            </p>

            <ul className="mt-9 grid gap-3.5">
              {promises.map((promise) => (
                <li key={promise} className="flex gap-3 text-sm text-white/80">
                  <CheckIcon
                    className="mt-0.5 size-4 flex-none text-brand"
                    strokeWidth="2.2"
                  />
                  {promise}
                </li>
              ))}
            </ul>

            <p className="mt-9 text-sm text-white/60">
              Prefer email?{" "}
              <a
                href={site.salesEmail.href}
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                {site.salesEmail.display}
              </a>
            </p>
          </div>

          {/* --- Form --- */}
          <div className="rounded-card bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
            {state.status === "success" ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                className="flex min-h-[22rem] flex-col items-start justify-center outline-none"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-brand text-on-brand">
                  <CheckIcon strokeWidth="2.4" />
                </span>
                <p className="mt-5 text-h3 text-white">Request received</p>
                <p className="mt-2 max-w-[28rem] text-body text-white/70">
                  {state.message}
                </p>
              </div>
            ) : (
              <form ref={formRef} action={formAction} noValidate className="grid gap-5">
                <Field label="Your name" field="name" error={errorFor("name")}>
                  <input
                    {...fieldProps("name")}
                    type="text"
                    autoComplete="name"
                    required
                    className={`${inputClass(errorFor("name"))} h-12`}
                  />
                </Field>

                <Field label="Work email" field="email" error={errorFor("email")}>
                  <input
                    {...fieldProps("email")}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    className={`${inputClass(errorFor("email"))} h-12`}
                  />
                </Field>

                <Field
                  label="Space or brand"
                  field="company"
                  error={errorFor("company")}
                >
                  <input
                    {...fieldProps("company")}
                    type="text"
                    autoComplete="organization"
                    required
                    className={`${inputClass(errorFor("company"))} h-12`}
                  />
                </Field>

                <Field
                  label="Locations"
                  field="locations"
                  error={errorFor("locations")}
                >
                  <select
                    {...fieldProps("locations")}
                    required
                    className={`${inputClass(errorFor("locations"))} h-12 appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 [color-scheme:dark]`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-opacity='.6' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='m4 6.5 4 4 4-4'/%3E%3C/svg%3E\")",
                    }}
                  >
                    <option value="" style={OPTION_STYLE}>
                      Select a range
                    </option>
                    {LOCATION_OPTIONS.map((option) => (
                      <option key={option} value={option} style={OPTION_STYLE}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Anything specific to cover?"
                  field="message"
                  optional
                  error={errorFor("message")}
                >
                  {/* `field-sizing: content` grows the box with what is typed,
                      so the scrollbar never appears in the first place. Where
                      it is unsupported, `min-h` plus `resize-y` leaves the
                      user a handle rather than a cramped scrolling box. */}
                  <textarea
                    {...fieldProps("message")}
                    rows={3}
                    className={`${inputClass(errorFor("message"))} field-sizing-content max-h-56 min-h-[6.5rem] resize-y py-3 [scrollbar-width:thin]`}
                  />
                </Field>

                <CtaButton
                  type="submit"
                  variant="onDark"
                  size="lg"
                  disabled={pending}
                  className="mt-1 w-full"
                >
                  {pending ? "Sending…" : "Request a demo"}
                </CtaButton>

                {/* Status is announced politely rather than stealing focus
                    mid-typing; the effect above moves focus only on success. */}
                <div aria-live="polite" className="min-h-0">
                  {state.status === "error" && state.message ? (
                    <p className="flex items-center gap-2 text-xs text-danger">
                      <AlertIcon className="size-4 flex-none" />
                      {state.message}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Shared field styling, deliberately without a height: `h-12` belongs to the
 * single-line controls only. Applying it to the textarea overrode `rows` and
 * squashed it to 3rem, which is what forced a scrollbar on the first line of
 * typing.
 */
function inputClass(error?: string) {
  return [
    "w-full rounded-xl border bg-white/5 px-4 text-body text-white",
    "placeholder:text-white/40 transition-colors duration-200 outline-none",
    "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40",
    error ? "border-danger" : "border-white/15 hover:border-white/25",
  ].join(" ");
}

function Field({
  label,
  field,
  error,
  optional = false,
  children,
}: {
  label: string;
  field: DemoField;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={`demo-${field}`}
        className="flex items-baseline justify-between gap-3 text-xs font-medium text-white/70"
      >
        {label}
        {optional ? <span className="text-white/55">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p
          id={`demo-${field}-error`}
          className="flex items-center gap-1.5 text-xs text-danger"
        >
          <AlertIcon className="size-3.5 flex-none" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
