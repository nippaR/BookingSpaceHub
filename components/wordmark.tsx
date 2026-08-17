import { site } from "@/lib/site-content";

/** CWMS logotype — the gold tile plus the name, sized by the parent. */
export function Wordmark({ size = "md" }: { size?: "sm" | "md" }) {
  const tile = size === "sm" ? "size-6 rounded-lg text-[13px]" : "size-7 rounded-[9px] text-[15px]";

  return (
    <span className="inline-flex items-center gap-[9px] font-heading font-bold tracking-[-0.02em] text-ink">
      <span
        className={`inline-flex items-center justify-center bg-gold text-ink ${tile}`}
        aria-hidden="true"
      >
        C
      </span>
      {site.name}
    </span>
  );
}
