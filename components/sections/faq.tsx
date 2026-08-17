import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/site-content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * Built on <details>, so it works with no client JavaScript and keeps native
 * keyboard behaviour.
 *
 * The exclusive `name="cwms-faq"` grouping is deliberately gone: it closed one
 * answer whenever another opened, which stopped anyone comparing, say,
 * implementation time against billing integration. Nothing is gained by
 * forcing a single open row.
 */
export function Faq() {
  return (
    <section id="faq" className="px-gutter py-section">
      {/* Static, locally authored JSON-LD — no user input reaches this string. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto grid max-w-page gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-total)+2rem)]">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-5 max-w-[16ch] text-h2">
            What operators ask during evaluation
          </h2>
          <p className="mt-4 max-w-[28rem] text-body text-ink-2">
            Something not covered here?{" "}
            <a
              href="#demo"
              className="font-medium text-brand-strong underline decoration-brand-line underline-offset-4 transition-colors hover:decoration-current"
            >
              Ask us on the demo call.
            </a>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="grid gap-px overflow-hidden rounded-card bg-line">
            {faqs.map((faq) => (
              <li key={faq.question} className="bg-surface">
                <details className="disclosure group">
                  {/* Background feedback rather than a press-scale: shrinking
                      a full-bleed row reads as the layout breaking, not as a
                      button responding. The response is still on pointer-down. */}
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 text-body font-semibold text-ink transition-colors duration-150 hover:bg-surface-2 active:bg-surface-3 [&::-webkit-details-marker]:hidden">
                    <span className="text-pretty">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="relative mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-surface-3 text-ink-2 transition-colors duration-300 group-open:bg-brand group-open:text-on-brand"
                    >
                      {/* Two bars rather than a "+" glyph: the vertical one
                          rotates away, so the mark morphs plus → minus in
                          place instead of spinning. */}
                      <span className="absolute h-px w-2.5 rounded-full bg-current" />
                      <span className="absolute h-2.5 w-px rounded-full bg-current transition-transform duration-300 ease-[var(--ease-spring)] group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-body text-ink-2 lg:max-w-[46ch]">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
