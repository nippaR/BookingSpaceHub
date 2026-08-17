import type { StaticImageData } from "next/image";

import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Point = {
  readonly title: string;
  readonly description: string;
};

/**
 * Copy on one side, product screenshot on the other.
 *
 * The grid stays a single column until `lg`. The previous
 * `auto-fit/minmax(360px)` version had two failure modes: on a 375px phone
 * the 360px track floor forced horizontal page scroll, and at ~900px it
 * engaged two columns that squeezed a dense dashboard screenshot into 391px
 * of unreadable texture. An explicit breakpoint fixes both.
 */
export function SplitFeature({
  id,
  eyebrow,
  heading,
  body,
  points,
  image,
  imageAlt,
  imageFirst = false,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  body?: string;
  points: readonly Point[];
  image: StaticImageData;
  imageAlt: string;
  imageFirst?: boolean;
  className?: string;
}) {
  return (
    <section id={id} className={`px-gutter py-section ${className}`}>
      <div className="mx-auto grid max-w-page items-center gap-x-16 gap-y-12 lg:grid-cols-2">
        <Reveal className={imageFirst ? "lg:order-2" : undefined}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2">{heading}</h2>
          {body ? (
            <p className="mt-4 max-w-[34rem] text-lead text-ink-2">{body}</p>
          ) : null}

          <ul className="mt-8 grid gap-5">
            {points.map((point) => (
              <li key={point.title} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 flex-none rounded-full bg-brand"
                />
                <p className="text-body text-ink-2">
                  <strong className="font-semibold text-ink">
                    {point.title}
                  </strong>{" "}
                  — {point.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={90}
          className={imageFirst ? "lg:order-1" : undefined}
        >
          <BrowserMockup
            src={image}
            alt={imageAlt}
            sizes="(min-width: 64rem) 560px, 92vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
