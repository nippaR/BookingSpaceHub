import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { differentiators } from "@/lib/site-content";

/**
 * The reasoning section. Numbered rather than iconified: this is the part of
 * the page that argues, so it gets prose weight and a different structural
 * form from the module lattice above it.
 */
export function WhyCwms() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto max-w-page">
        <Reveal className="max-w-prose">
          <Eyebrow>Why operators choose it</Eyebrow>
          <h2 className="mt-5 text-h2">
            Three decisions that shape everything else
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <div className="border-t border-line-strong pt-6">
                {/* brand-strong, not brand: at 15px bold this is below the
                    large-text threshold, so it needs the full 4.5:1 tone. */}
                <span
                  aria-hidden="true"
                  className="block text-sm font-bold text-brand-strong tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-h3">{item.title}</h3>
                <p className="mt-3 text-body text-ink-2 text-pretty">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
