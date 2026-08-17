import type { ReactNode } from "react";

const statusIconColor = "#000";

function StatusBar() {
  return (
    <div className="relative z-20 flex w-full items-center justify-between px-6 pt-[18px] pb-3">
      <span className="text-[15px] font-semibold text-black tabular-nums">
        9:41
      </span>
      <span className="flex items-center gap-[6px]">
        <svg width="17" height="11" viewBox="0 0 19 12" aria-hidden="true">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx=".7" fill={statusIconColor} />
          <rect x="4.8" y="5" width="3.2" height="7" rx=".7" fill={statusIconColor} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx=".7" fill={statusIconColor} />
          <rect x="14.4" y="0" width="3.2" height="12" rx=".7" fill={statusIconColor} />
        </svg>
        <svg width="15" height="11" viewBox="0 0 17 12" aria-hidden="true">
          <path
            d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z"
            fill={statusIconColor}
          />
          <path
            d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z"
            fill={statusIconColor}
          />
          <circle cx="8.5" cy="10.5" r="1.5" fill={statusIconColor} />
        </svg>
        <svg width="24" height="12" viewBox="0 0 27 13" aria-hidden="true">
          <rect
            x=".5"
            y=".5"
            width="23"
            height="12"
            rx="3.5"
            stroke={statusIconColor}
            strokeOpacity=".35"
            fill="none"
          />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={statusIconColor} />
          <path
            d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z"
            fill={statusIconColor}
            fillOpacity=".4"
          />
        </svg>
      </span>
    </div>
  );
}

/**
 * Decorative iOS device bezel for the companion-app section. It is a picture
 * of a phone, not a control surface, so the whole frame is hidden from
 * assistive tech — the surrounding copy carries the message.
 */
export function PhoneFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative h-[620px] w-[300px] overflow-hidden rounded-[36px] bg-[#F2F2F7] shadow-[0_40px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.12)] select-none"
    >
      {/* dynamic island */}
      <div className="absolute top-2 left-1/2 z-50 h-[28px] w-[95px] -translate-x-1/2 rounded-[24px] bg-black" />

      <div className="flex h-full flex-col">
        <StatusBar />
        <div className="px-5 pt-3 pb-2">
          <p className="font-heading text-[26px] leading-tight font-bold tracking-[-0.02em] text-black">
            {title}
          </p>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>

      {/* home indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-60 flex h-[26px] items-end justify-center pb-2">
        <div className="h-[5px] w-[110px] rounded-full bg-black/25" />
      </div>
    </div>
  );
}
