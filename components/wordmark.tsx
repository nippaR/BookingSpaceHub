import { site } from "@/lib/site-content";

/**
 * CWMS logotype — the gold tile plus the name, sized by the parent.
 *
 * The tile is the one place the brand colour is used as a full-strength fill,
 * which is what keeps it reading as identity rather than decoration. It sits
 * on light surfaces everywhere it appears, so a single treatment covers the
 * header and the footer.
 */
export function Wordmark({ size = "md" }: { size?: "sm" | "md" }) {
  const tile =
    size === "sm"
      ? "size-6 rounded-[0.4375rem] text-[0.75rem]"
      : "size-7 rounded-lg text-[0.875rem]";

  return (
    <span className="inline-flex items-center gap-2 font-extrabold tracking-[-0.03em] text-ink">
      <span
        className={`inline-flex items-center justify-center bg-brand font-bold text-on-brand ${tile}`}
        aria-hidden="true"
      >
        C
      </span>
      {site.name}
    </span>
  );
}
