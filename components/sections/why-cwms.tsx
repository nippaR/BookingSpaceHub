import { Eyebrow } from "@/components/ui/eyebrow";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { differentiators } from "@/lib/site-content";

export function WhyCwms() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto max-w-[1180px]">
        <Eyebrow block className="mb-3.5 text-center">
          The CWMS difference
        </Eyebrow>
        <h2 className="mb-[clamp(30px,4vw,44px)] text-center text-h2">
          Why operators choose CWMS
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {differentiators.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className="text-center">
              <IconBadge className="mx-auto">
                <item.icon />
              </IconBadge>
              <h3 className="mt-4 mb-2 text-[18px]">{item.title}</h3>
              <p className="mx-auto max-w-[280px] text-[14px] leading-[1.6] text-ink-soft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
