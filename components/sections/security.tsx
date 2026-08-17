import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { securityPillars } from "@/lib/site-content";

export function Security() {
  return (
    <section id="security" className="bg-ink px-gutter py-section text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(24px,3vw,44px)]">
        <div>
          <span className="font-mono text-eyebrow tracking-[0.1em] uppercase text-gold-light">
            Security &amp; trust
          </span>
          <h2 className="mt-3.5 max-w-[420px] text-h2 text-white">
            Built for operators who answer to their tenants
          </h2>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          {securityPillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={i * 90}>
              <div className="h-full rounded-2xl bg-white/6 p-5">
                <IconBadge tone="translucent">
                  <pillar.icon />
                </IconBadge>
                <h3 className="mt-3.5 mb-1.5 text-[16.5px] text-white">
                  {pillar.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-white/72">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
