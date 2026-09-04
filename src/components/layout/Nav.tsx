import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EASE } from "@/components/motion/Reveal";
import { ScrambleText } from "@/components/ux/ScrambleText";
import { usePageTransition } from "@/components/ux/PageTransition";
import { PROFILE } from "@/data/site";
import { scrollToId } from "@/lib/lenis";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] hidden h-px origin-left bg-signal lg:block"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { runTransition } = usePageTransition();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hovered, setHovered] = useState("");
  const firstMobileLink = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const dest = LINKS.find((l) => l.id === id)?.label ?? id;
    runTransition(() => {
      if (location.pathname !== "/") navigate(`/#${id}`);
      else scrollToId(id, -80);
    }, dest);
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
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
          <Link to="/" data-testid="nav-logo" className="group flex items-baseline gap-3" aria-label="Gaurav Malode — home">
            <span className="font-display text-[15px] font-bold tracking-[-0.02em]">Gaurav Malode</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-colors group-hover:text-sub xl:inline">
              — {PROFILE.role}
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                onMouseEnter={() => setHovered(l.id)}
                onMouseLeave={() => setHovered("")}
                className={`relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-ink ${
                  activeSection === l.id ? "text-ink" : "text-sub"
                }`}
              >
                <ScrambleText text={l.label} active={hovered === l.id} />
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full bg-signal transition-transform duration-300 ${
                    activeSection === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transformOrigin: "left" }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PROFILE.resumePath}
              download
              data-testid="nav-resume-download"
              className="group hidden h-9 items-center gap-2 border border-hairline px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sub transition-colors hover:border-ink hover:text-ink sm:flex"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              data-testid="nav-mobile-menu-button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 items-center gap-2 border border-hairline px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-sub transition-colors hover:text-ink lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-testid="nav-mobile-drawer"
            className="fixed inset-0 z-40 flex flex-col bg-canvas pt-16 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-1 flex-col justify-between px-5 py-8 sm:px-8">
              <ul>
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <button
                      ref={i === 0 ? firstMobileLink : undefined}
                      type="button"
                      data-testid={`nav-mobile-link-${l.id}`}
                      onClick={() => go(l.id)}
                      className="flex w-full items-baseline justify-between border-b border-hairline py-5 text-left font-display text-4xl font-bold tracking-[-0.03em]"
                    >
                      {l.label}
                      <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-6">
                <a
                  href={PROFILE.resumePath}
                  download
                  data-testid="nav-mobile-resume-download"
                  className="flex items-center justify-between border border-ink bg-ink px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-canvas"
                >
                  Download resume (PDF)
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {PROFILE.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
