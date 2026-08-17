import Image, { type StaticImageData } from "next/image";

/**
 * Product screenshot presented as a physical panel rather than a fake browser
 * window. The old traffic-light chrome framed a screenshot that was already a
 * screenshot of a browser, in colours that matched neither macOS nor the
 * brand — so it is gone. What is left is material: a hairline edge, a bright
 * top rim where light catches the surface, and a shadow deep enough for the
 * panel to read as thick.
 */
export function BrowserMockup({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1120px) 1060px, 94vw",
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Soft contact shadow, kept separate so it can sit under the panel
          without being clipped by the panel's own overflow-hidden. */}
      {/* Token-driven rather than `dark:` variants: the theme is resolved by
          `light-dark()` against `color-scheme`, so a media-query variant would
          desync the moment the scheme is forced rather than inherited. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] bottom-0 -z-10 h-16 rounded-[50%] bg-[var(--shadow-tint-deep)] blur-3xl"
      />

      <div className="overflow-hidden rounded-frame border border-line bg-surface-2 shadow-frame">
        {/* Light catching the top edge of the material. */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[var(--c-material-edge)] to-transparent"
        />
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          quality={92}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
