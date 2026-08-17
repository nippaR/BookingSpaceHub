import type { StaticImageData } from "next/image";

import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Point = {
  readonly title: string;
  readonly description: string;
};

/**
 * Copy on one side, product screenshot on the other. Both feature sections on
 * the page are the same layout mirrored, so they share this component.
 */
export function SplitFeature({
  id,
  eyebrow,
  heading,
  points,
  image,
  imageAlt,
  imageFirst = false,
  darkChrome = false,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  points: readonly Point[];
  image: StaticImageData;
  imageAlt: string;
  imageFirst?: boolean;
  darkChrome?: boolean;
  className?: string;
}) {
  const copy = (
    <Reveal key="copy" delay={imageFirst ? 100 : 0}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3.5 mb-4 text-h2">{heading}</h2>
      <ul className="grid gap-3.5 text-[15px] leading-[1.55] text-ink-soft">
        {points.map((point) => (
          <li key={point.title}>
            <strong className="font-semibold text-ink">{point.title}</strong> —{" "}
            {point.description}
          </li>
        ))}
      </ul>
    </Reveal>
  );

  const figure = (
    <Reveal key="figure" delay={imageFirst ? 0 : 100}>
      <BrowserMockup
        src={image}
        alt={imageAlt}
        dark={darkChrome}
        sizes="(min-width: 1180px) 550px, (min-width: 780px) 50vw, 100vw"
      />
    </Reveal>
  );

  return (
    <section id={id} className={`px-gutter py-section ${className}`}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-split-gap">
        {imageFirst ? [figure, copy] : [copy, figure]}
      </div>
    </section>
  );
}
