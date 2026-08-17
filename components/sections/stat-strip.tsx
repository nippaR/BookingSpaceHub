import { stats } from "@/lib/site-content";

export function StatStrip() {
  return (
    <section className="border-y border-line px-gutter py-[clamp(26px,3vw,36px)]">
      <dl className="mx-auto grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5 text-center">
        {stats.map((stat) => (
          // Reversed so the number reads first while the DOM keeps dt → dd.
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-[13px] text-muted">{stat.label}</dt>
            <dd className="font-heading text-[34px] font-bold text-gold">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
