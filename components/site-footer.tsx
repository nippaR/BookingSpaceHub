import { Wordmark } from "@/components/wordmark";
import { footerColumns, site } from "@/lib/site-content";

const columnTitle =
  "mb-3 font-mono text-[10.5px] tracking-[0.1em] uppercase text-faint";
const footerLink = "text-ink-soft transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="px-gutter pt-[clamp(28px,4vw,44px)] pb-[30px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-7 border-b border-line pb-[26px]">
        <div>
          <div className="mb-3 text-[19px]">
            <Wordmark size="sm" />
          </div>
          <p className="max-w-[230px] text-[13.5px] leading-[1.6] text-muted">
            Co-Working Management System. Multi-tenant software for workspace
            operators.
          </p>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className={columnTitle}>{column.title}</h2>
            <ul className="grid gap-[9px] text-[14px]">
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
          <h2 className={columnTitle}>Get in touch</h2>
          <ul className="grid gap-[9px] text-[14px] text-ink-soft">
            <li>
              <a href={`mailto:${site.salesEmail}`} className={footerLink}>
                {site.salesEmail}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={footerLink}>
                {site.phone.display}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-[18px] text-[13px] text-faint">
        <span>© {new Date().getFullYear()} CWMS. All rights reserved.</span>
        <span className="flex gap-5">
          <a href="#top" className="text-faint transition-colors hover:text-ink-soft">
            Privacy
          </a>
          <a href="#top" className="text-faint transition-colors hover:text-ink-soft">
            Terms
          </a>
        </span>
      </div>
    </footer>
  );
}
