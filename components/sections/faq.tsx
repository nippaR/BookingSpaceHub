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
 * Built on <details name="…">, which gives an exclusive accordion — open one,
 * the others close — with keyboard support and no client JavaScript.
 */
export function Faq() {
  return (
    <section id="faq" className="px-gutter py-section">
      {/* Static, locally authored JSON-LD — no user input reaches this string. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(22px,3vw,44px)]">
        <div>
          <h2 className="max-w-[340px] text-h2-sm">
            Questions we get during evaluation
          </h2>
          <p className="mt-3.5 text-[14px] leading-[1.6] text-ink-soft">
            Something not covered?{" "}
            <a
              href="#contact"
              className="text-bronze underline-offset-2 hover:text-bronze-hover hover:underline"
            >
              Ask us on the demo call.
            </a>
          </p>
        </div>

        <div className="grid gap-2.5">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              name="cwms-faq"
              open={i === 0}
              className="group overflow-hidden rounded-[14px] border border-line bg-cream open:border-line-gold open:bg-cream-warm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-[18px] text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="flex size-6 flex-none items-center justify-center rounded-full bg-white text-[16px] leading-none text-muted transition-transform duration-200 group-open:rotate-45 group-open:bg-gold group-open:text-ink"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-[14px] leading-[1.6] text-ink-soft">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
