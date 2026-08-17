import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { securityPillars } from "@/lib/site-content";

/**
 * Trust, stated plainly. This used to be the only high-contrast surface on
 * the page, which gave the loudest moment to a checkbox concern. It is now a
 * calm, hairline-ruled band — the emphasis moved to the demo section, where
 * the page actually asks for something.
 */
export function Security() {
  return (
    <section id="trust" className="px-gutter py-section">
      <div className="mx-auto grid max-w-page gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <Eyebrow>Trust &amp; security</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-h2">
            Built for operators who answer to their tenants
          </h2>
          <p className="mt-4 max-w-[34rem] text-lead text-ink-2">
            Isolation, roles and an audit trail are not add-ons here — they are
            how the tenant model is put together.
          </p>
        </Reveal>

        {/* Revealed as one block rather than per-item: the dividers here are
            a 1px grid gap over a line-coloured background, so translating the
            cells individually flashes that background through the seams. */}
        <Reveal delay={80}>
          <ul className="grid gap-px overflow-hidden rounded-card bg-line">
            {securityPillars.map((pillar) => (
              <li
                key={pillar.title}
                className="flex gap-4 bg-surface p-6 sm:gap-5 sm:p-7"
              >
                <span className="mt-0.5 flex size-10 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand-strong">
                  <pillar.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-h3">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-3 text-pretty">
                    {pillar.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
