import { ArrowRightIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { modules } from "@/lib/site-content";

/**
 * The module inventory. Rendered as a hairline lattice rather than a third
 * consecutive grid of bordered cards — the icon sits inline with the title so
 * the words, not a badge, are the largest thing in each cell.
 */
export function ModuleGrid() {
  return (
    <section id="modules" className="bg-surface-2 px-gutter py-section">
      <div className="mx-auto max-w-page">
        <Reveal className="mx-auto max-w-prose text-center">
          <Eyebrow className="justify-center">Modules</Eyebrow>
          <h2 className="mt-5 text-h2">Everything else, already built in</h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-lead text-ink-2">
            Nine modules read from the same tenant record. Turn on what a
            location needs; the rest stays out of the way.
          </p>
        </Reveal>

        {/* A 1px gap over a line-coloured background draws every divider
            without a border on any individual cell. Revealed as one block:
            translating the cells separately would flash that background
            through the seams. */}
        <Reveal delay={80}>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <li key={module.title} className="bg-surface">
                <div className="h-full p-6 transition-colors duration-300 hover:bg-surface-2 sm:p-7">
                  <h3 className="flex items-center gap-2.5 text-h3">
                    <module.icon className="size-5 flex-none text-brand" />
                    {module.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-3 text-pretty">
                    {module.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="text-center">
          <a
            href="#demo"
            className="pressable-subtle mt-10 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-brand-strong"
          >
            See the full module list on a demo
            <ArrowRightIcon className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
