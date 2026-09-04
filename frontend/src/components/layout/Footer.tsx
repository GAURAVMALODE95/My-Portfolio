import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/site";
import { scrollToTop } from "@/lib/lenis";

const CONNECT = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, testid: "footer-email-link" },
  { label: "LinkedIn", value: "in/gauravmalode7", href: PROFILE.linkedin, testid: "footer-linkedin-link" },
  { label: "GitHub", value: "gauravmalode95", href: PROFILE.github, testid: "footer-github-link" },
  { label: "Website", value: "gauravmalode.in", href: PROFILE.website, testid: "footer-website-link" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-bold tracking-[-0.03em]">{PROFILE.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sub">
              Software developer building secure financial software — from the
              mobile screen to the market-data layer.
            </p>
            <a
              href={PROFILE.resumePath}
              download
              data-testid="footer-resume-download"
              className="group mt-8 inline-flex items-center gap-2 border border-hairline px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-sub transition-colors hover:border-ink hover:text-ink"
            >
              Résumé (PDF)
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Work</p>
            <ul className="mt-5">
              {PROJECTS.map((p) => (
                <li key={p.slug} className="border-b border-hairline last:border-0">
                  <Link
                    to={`/work/${p.slug}`}
                    data-testid={`footer-link-${p.slug}`}
                    className="group flex items-baseline justify-between py-2.5 text-sm text-sub transition-colors hover:text-ink"
                  >
                    {p.product}
                    <span className="font-mono text-[10px] text-faint">{p.index}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Connect</p>
            <ul className="mt-5">
              {CONNECT.map((l) => (
                <li key={l.label} className="border-b border-hairline last:border-0">
                  <a
                    href={l.href}
                    data-testid={l.testid}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-2.5 text-sm text-sub transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{l.label}</span>
                    <span className="truncate">{l.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-faint sm:flex-row sm:items-center">
          <p>© 2026 {PROFILE.name} · {PROFILE.location}</p>
          <p className="hidden sm:block">Designed & built by hand</p>
          <button
            type="button"
            data-testid="footer-back-to-top"
            onClick={() => scrollToTop(false)}
            className="group flex items-center gap-2 transition-colors hover:text-ink"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
