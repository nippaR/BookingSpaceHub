import Image, { type StaticImageData } from "next/image";

const dots = ["#E5A15C", "#D8C48A", "#9FBE9F"];

/**
 * Product screenshot inside a neutral browser chrome. `priority` should only
 * be set on the hero shot — every other mockup is below the fold and lazy
 * loads by default.
 */
export function BrowserMockup({
  src,
  alt,
  dark = false,
  priority = false,
  sizes = "(min-width: 1180px) 1100px, 100vw",
}: {
  src: StaticImageData;
  alt: string;
  dark?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong shadow-mockup">
      <div
        className={`flex h-[34px] items-center gap-1.5 px-3.5 ${
          dark ? "bg-[#20201C]" : "bg-sand-deep"
        }`}
      >
        {dots.map((color) => (
          <span
            key={color}
            className="size-[9px] rounded-full"
            style={{ background: color }}
          />
        ))}
      </div>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="block h-auto w-full"
      />
    </div>
  );
}
