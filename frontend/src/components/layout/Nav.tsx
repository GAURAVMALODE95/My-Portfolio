import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PROFILE } from "@/data/site";
import { scrollToId } from "@/lib/lenis";
import { useTheme } from "@/theme/ThemeProvider";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] hidden h-[2px] origin-left bg-signal lg:block"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export function Nav() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const firstMobileLink = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    firstMobileLink.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      scrollToId(id, -80);
    }
  };

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-hairline bg-canvas/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
          aria-label="Primary"
        >
          <Link
            to="/"
            data-testid="nav-logo"
            className="group flex items-baseline gap-2"
            aria-label="Gaurav Malode — home"
          >
            <span className="font-display text-xl font-extrabold tracking-tight">
              GM
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-faint transition-colors group-hover:text-sub sm:inline">
              Gaurav Malode
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="link-draw flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-sub transition-colors hover:text-ink"
              >
                <span
                  className={`h-1 w-1 rounded-full bg-signal transition-opacity ${
                    activeSection === l.id ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              data-testid="nav-theme-toggle"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-sub transition-colors hover:border-signal/50 hover:text-ink"
            >
              <motion.span
                key={theme}
                initial={reduce ? false : { rotate: -120, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="flex"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.span>
            </button>

            <a
              href={PROFILE.resumePath}
              download
              data-testid="nav-resume-download"
              className="group hidden items-center gap-1.5 rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-sub transition-colors hover:border-signal hover:text-ink sm:flex"
            >
              <span className="cta-shift">
                <span>Download résumé</span>
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              data-testid="nav-mobile-menu-button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-sub transition-colors hover:text-ink lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-testid="nav-mobile-drawer"
            className="fixed inset-x-0 top-16 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-md lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col px-6 py-6">
              {LINKS.map((l, i) => (
                <button
                  key={l.id}
                  ref={i === 0 ? firstMobileLink : undefined}
                  type="button"
                  data-testid={`nav-mobile-link-${l.id}`}
                  onClick={() => go(l.id)}
                  className="flex items-center justify-between border-b border-hairline py-4 text-left font-display text-2xl font-bold tracking-tight last:border-0"
                >
                  {l.label}
                  <span className="font-mono text-[10px] text-faint">
                    0{i + 1}
                  </span>
                </button>
              ))}
              <a
                href={PROFILE.resumePath}
                download
                data-testid="nav-mobile-resume-download"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-canvas"
              >
                Download résumé (PDF)
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
