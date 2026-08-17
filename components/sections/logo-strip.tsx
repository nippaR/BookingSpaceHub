const placeholderCount = 5;

export function LogoStrip() {
  return (
    <section className="px-gutter py-[clamp(30px,4vw,44px)]">
      <p className="mb-[22px] text-center font-mono text-eyebrow tracking-[0.1em] uppercase text-muted">
        Built for coworking operators
      </p>
      <div className="mx-auto grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3.5">
        {Array.from({ length: placeholderCount }, (_, i) => (
          <div
            key={i}
            className="flex h-14 items-center justify-center rounded-xl bg-sand font-mono text-[10px] text-faint"
          >
            operator logo
          </div>
        ))}
      </div>
    </section>
  );
}
