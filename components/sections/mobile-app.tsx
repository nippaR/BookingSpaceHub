import Image from "next/image";

import appShot from "@/assets/screenshots/mobile-app.png";
import { AppleIcon, GooglePlayIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const stores = [
  { label: "App Store", Icon: AppleIcon },
  { label: "Google Play", Icon: GooglePlayIcon },
];

export function MobileApp() {
  return (
    <section id="mobile" className="bg-surface-2 px-gutter py-section">
      <div className="mx-auto grid max-w-page items-center gap-x-16 gap-y-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Companion app</Eyebrow>
          <h2 className="mt-5 text-h2">
            Give members the app, keep the front desk free
          </h2>
          <p className="mt-4 max-w-[34rem] text-lead text-ink-2">
            Members book rooms, request passes, raise tickets and check invoices
            from their phone — branded as your space, not ours.
          </p>

          <ul className="mt-9 flex flex-wrap gap-3">
            {stores.map(({ label, Icon }) => (
              <li key={label}>
                <span className="inline-flex h-12 items-center gap-2.5 rounded-full bg-surface-inverse px-5 text-sm font-medium text-ink-inverse">
                  <Icon />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90} className="flex justify-center lg:justify-end">
          {/*
            The capture already includes its own device bezel, so it is shown
            bare — wrapping it in a second frame would double the hardware.
            `drop-shadow` rather than `box-shadow`: the PNG's corners are
            transparent, and a box shadow would trace a rectangle around them.
          */}
          <Image
            src={appShot}
            alt="The CWMS member app home screen, showing ticket counts and shortcuts to documents, helpdesk, visitor passes and profile"
            sizes="(min-width: 64rem) 320px, (min-width: 40rem) 300px, 68vw"
            placeholder="blur"
            quality={92}
            className="h-auto w-[min(20rem,68vw)] [filter:drop-shadow(0_1.5rem_2.5rem_var(--shadow-tint-far))]"
          />
        </Reveal>
      </div>
    </section>
  );
}
