import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { modules } from "@/lib/site-content";

export function ModuleGrid() {
  return (
    <section className="bg-cream px-gutter pt-section-sm pb-section">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="mb-heading-gap text-center text-h2-sm">
          Everything else, built in
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          {modules.map((module, i) => (
            <Reveal as="li" key={module.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-line-strong bg-white p-5">
                <IconBadge>
                  <module.icon />
                </IconBadge>
                <h3 className="mt-3 mb-[5px] text-[15.5px]">{module.title}</h3>
                <p className="text-[13px] leading-[1.5] text-muted">
                  {module.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
