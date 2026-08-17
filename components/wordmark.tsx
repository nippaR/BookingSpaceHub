import Image from "next/image";

import logo from "@/public/cwms-logo.png";
import { site } from "@/lib/site-content";

/**
 * CWMS logotype — the real lockup: the gold glyph plus the "CWMS ERP" name.
 *
 * The asset is a transparent PNG rather than the source JPEG on purpose: the
 * header sits on translucent glass, so a baked-in white ground would read as a
 * pale rectangle floating over whatever is scrolling underneath it.
 *
 * Height is the only dimension set — width follows the ratio — so the two call
 * sites stay in step with the lockup itself if the artwork is ever re-cut.
 */
export function Wordmark({
  size = "md",
  priority = false,
}: {
  size?: "sm" | "md";
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt={`${site.name} ERP`}
      className={size === "sm" ? "h-[1.375rem] w-auto" : "h-7 w-auto"}
      // The header mark is above the fold and small enough that deferring it
      // only buys a visible pop-in.
      priority={priority}
    />
  );
}
