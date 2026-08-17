import { AppleIcon, GooglePlayIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { Reveal } from "@/components/ui/reveal";

const stores = [
  { label: "App Store", Icon: AppleIcon },
  { label: "Google Play", Icon: GooglePlayIcon },
];

export function MobileApp() {
  return (
    <section id="mobile" className="bg-cream-warm px-gutter py-section-lg">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,60px)]">
        <Reveal>
          <Eyebrow>Companion app</Eyebrow>
          <h2 className="mt-3.5 mb-4 text-h2-lg">
            Give members the app, keep the front desk free
          </h2>
          <p className="mb-[26px] max-w-[420px] text-[15.5px] leading-[1.65] text-ink-soft">
            Members book rooms, request passes, raise tickets and check invoices
            from their phone — branded as your space, not ours.
          </p>
          <ul className="flex flex-wrap gap-3">
            {stores.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-ink px-4 text-[13px] text-white"
              >
                <Icon />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="flex justify-center">
          <PhoneFrame title="My Space">
            <div className="h-full px-3.5 pb-3.5">
              <div className="flex h-full items-center justify-center rounded-[18px] border border-dashed border-line-gold bg-cream-deep font-mono text-[10px] text-faint">
                member app screenshot
              </div>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
