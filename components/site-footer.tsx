import { Wordmark } from "@/components/wordmark";
import { footerColumns, site } from "@/lib/site-content";

/**
 * Every tone here now clears 4.5:1 — the previous footer set its column
 * titles in 10.5px `text-faint`, which measured 2.6:1 on white.
 *
 * The Privacy and Terms links are deliberately absent rather than pointing at
 * `#top` as they did before: dead legal links on a page selling audit trails
 * cost more trust than the labels earn. Add them back when the pages exist.
 */
/**
 * Rendered as <p>, not <h2>. Each column is already a <nav> with an
 * `aria-label`, so promoting these labels into the heading outline added
 * three document-level sections that do not exist.
 */
const columnTitle = "mb-4 text-eyebrow uppercase text-ink-3";
const footerLink =
  "pressable-subtle inline-block rounded text-ink-2 hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-gutter pt-14 pb-10">
      <div className="mx-auto max-w-page">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="sm" />
            <p className="mt-4 max-w-[16rem] text-sm text-ink-3 text-pretty">
              Co-Working Management System. Multi-tenant software for workspace
              operators.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={columnTitle}>{column.title}</p>
              <ul className="grid gap-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { rel: "noopener noreferrer" }
                        : {})}
                      className={footerLink}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className={columnTitle}>Get in touch</p>
            <ul className="grid gap-3 text-sm">
              <li>
                <a href={site.salesEmail.href} className={footerLink}>
                  {site.salesEmail.display}
                </a>
              </li>
              {/* <li>
                <a href={site.phone.href} className={footerLink}>
                  {site.phone.display}
                </a>
              </li> */}
              <li className="text-ink-3">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-xs text-ink-3">
          <span>© {new Date().getFullYear()} CWMS. All rights reserved.</span>
          <a
            href="#top"
            className="pressable-subtle rounded text-ink-3 hover:text-ink"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
