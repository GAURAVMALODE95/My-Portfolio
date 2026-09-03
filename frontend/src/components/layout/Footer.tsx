import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/site";
import { scrollToTop } from "@/lib/lenis";

export function Footer() {
  return (
    <footer className="border-t border-hairline" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-extrabold tracking-tight">
              GM
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sub">
              Software developer building secure financial products — from
              mobile flows to market intelligence.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              {PROFILE.location}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              Work
            </p>
            <ul className="mt-4 space-y-2.5">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/work/${p.slug}`}
                    data-testid={`footer-link-${p.slug}`}
                    className="link-draw text-sm text-sub transition-colors hover:text-ink"
                  >
                    {p.product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-testid="footer-email-link"
                  className="link-draw text-sm text-sub transition-colors hover:text-ink"
                >
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-linkedin-link"
                  className="link-draw text-sm text-sub transition-colors hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-github-link"
                  className="link-draw text-sm text-sub transition-colors hover:text-ink"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-website-link"
                  className="link-draw text-sm text-sub transition-colors hover:text-ink"
                >
                  gauravmalode.in
                </a>
              </li>
            </ul>
            <a
              href={PROFILE.resumePath}
              download
              data-testid="footer-resume-download"
              className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-sub transition-colors hover:border-signal hover:text-ink"
            >
              Download résumé (PDF)
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            © 2026 Gaurav Malode — Built with intent
          </p>
          <button
            type="button"
            data-testid="footer-back-to-top"
            onClick={() => scrollToTop(false)}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-colors hover:text-ink"
          >
            Back to top
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
