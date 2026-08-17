import heroShot from "@/assets/screenshots/user-sidebar.png";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="mx-auto max-w-[900px] px-gutter pt-hero-top pb-section-sm text-center"
      >
        <Reveal>
          <h1 className="text-hero tracking-[-0.03em]">
            Run and grow your coworking space with CWMS
          </h1>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-5 max-w-[580px] text-[17px] leading-[1.6] text-ink-soft">
            Members, bookings and billing in one platform — built for
            multi-tenant operators.
          </p>
        </Reveal>
        <Reveal delay={170} className="mt-[30px] flex flex-wrap justify-center gap-3">
          <CtaLink href="#contact">Request a Demo</CtaLink>
          <CtaLink href="#modules" variant="ghost">
            See Features
          </CtaLink>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1180px] px-gutter pb-section">
        <Reveal delay={60}>
          <BrowserMockup
            src={heroShot}
            alt="CWMS admin portal dashboard showing occupancy, active members and open tickets"
            priority
          />
        </Reveal>
      </section>
    </>
  );
}
