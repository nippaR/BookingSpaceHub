import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/site-content";

/**
 * A quiet proof band, not a headline moment. Every figure is a product fact
 * the rest of the page already commits to — the previous set led with "∞",
 * which reads as a shrug rather than a claim.
 */
export function StatStrip() {
  return (
    <section className="px-gutter">
      <div className="mx-auto max-w-page border-y border-line py-8 sm:py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="flex flex-col-reverse gap-1.5">
                {/* Reversed visually so the figure reads first, while the
                    DOM keeps the dt → dd order screen readers expect. */}
                <dt className="text-xs text-ink-3 text-pretty">{stat.label}</dt>
                <dd className="flex items-baseline gap-0.5 text-[clamp(1.75rem,1.45rem+1.1vw,2.25rem)] leading-none font-extrabold tracking-[-0.03em] text-ink tabular-nums">
                  {stat.value}
                  {"unit" in stat && stat.unit ? (
                    <span className="text-[1.25rem] font-bold text-brand">
                      {stat.unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
