import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site-content";

const promises = [
  "All-in-one solution",
  "Multi-tenant by design",
  "Real support team",
];

export function FinalCta() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="mx-[clamp(12px,2vw,24px)] mb-[clamp(20px,3vw,28px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-6 rounded-[22px] bg-gold p-[clamp(36px,4.4vw,60px)]"
    >
      <div>
        <h2 className="max-w-[420px] text-h2-sm text-ink">
          Ready to run your space on one platform?
        </h2>
        <ul className="mt-4 flex flex-wrap gap-4 text-[14px] font-medium text-ink">
          {promises.map((promise) => (
            <li key={promise}>✓ {promise}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap justify-start gap-3">
        <CtaLink href={`mailto:${site.salesEmail}`} variant="dark" size="lg">
          Request a Demo
        </CtaLink>
        <CtaLink href={site.appUrl} variant="ghostOnGold" size="lg">
          Existing tenant? Log in
        </CtaLink>
      </div>
    </Reveal>
  );
}
