import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { usePageTransition } from "@/components/ux/PageTransition";
import { PROJECTS, type Project } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function WorkRow({ project, onEnter }: { project: Project; onEnter: () => void }) {
  const navigate = useNavigate();
  const { runTransition } = usePageTransition();
  return (
    <Link
      to={`/work/${project.slug}`}
      data-testid={`work-card-${project.slug}`}
      data-cursor="view"
      data-cursor-label="Open"
      onPointerEnter={onEnter}
      onFocus={onEnter}
      onClick={(e) => {
        e.preventDefault();
        runTransition(() => navigate(`/work/${project.slug}`), project.product);
      }}
      className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 border-b border-hairline py-7 transition-colors duration-300 hover:bg-surface/70 focus-visible:bg-surface/70 lg:grid-cols-12 lg:gap-x-8 lg:py-9"
    >
      <span className="font-mono text-xs text-faint lg:col-span-1">{project.index}</span>
      <h3 className="font-display text-2xl font-bold leading-[1.32] tracking-[-0.03em] transition-transform duration-500 ease-expo group-hover:translate-x-3 sm:text-3xl sm:leading-[1.32] lg:col-span-4 lg:text-[2.9rem] lg:leading-[1.32]">
        {project.product}
      </h3>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-sub lg:col-span-3 lg:block">
        {project.domain}
      </span>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-faint lg:col-span-2 lg:block">
        {project.platforms.slice(0, 2).join(" · ")}
      </span>
      <span className="flex items-center justify-end gap-4 lg:col-span-2">
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-sub lg:inline">
          {project.stack.slice(0, 2).join(" · ")}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-faint transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
          aria-hidden="true"
        />
      </span>

      <div className="col-span-3 mt-5 lg:hidden">
        <img
          src={project.images.primary}
          alt={project.imageAlts.primary}
          loading="lazy"
          decoding="async"
          className={
            project.mockup === "framed-phones"
              ? "mx-auto max-h-80 w-auto object-contain"
              : "aspect-[16/10] w-full border border-hairline object-cover"
          }
        />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sub">
          {project.domain} — {project.platforms.slice(0, 2).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

function Preview({ hover }: { hover: number | null }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0, vx: 0 });
  const activeRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const running = useRef(false);
  const live = useRef(false);
  const startRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    live.current = hover !== null;
  }, [hover]);

  useEffect(() => {
    const tick = () => {
      const shell = shellRef.current;
      if (!shell || !live.current) {
        running.current = false;
        return;
      }
      const t = target.current;
      const c = current.current;
      const dx = t.x - c.x;
      const dy = t.y - c.y;
      c.x += dx * 0.18;
      c.y += dy * 0.18;
      c.vx += (dx - c.vx) * 0.12;
      const rot = Math.max(-5, Math.min(5, c.vx * 0.02));
      shell.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) rotate(${rot}deg)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.abs(c.vx) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        running.current = false;
      }
    };

    const start = () => {
      if (running.current) return;
      running.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    startRef.current = start;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (live.current) start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const prev = activeRef.current;
    activeRef.current = hover;

    if (hover === null) {
      card.style.opacity = "0";
      card.style.transform = "translate(-50%, -50%) scale(0.7)";
      return;
    }

    if (prev === null) {
      current.current.x = target.current.x;
      current.current.y = target.current.y;
      current.current.vx = 0;
      const shell = shellRef.current;
      if (shell) {
        shell.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      startRef.current();
    }

    card.style.opacity = "1";
    card.style.transform = "translate(-50%, -50%) scale(1)";

    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      const on = i === hover;
      img.style.opacity = on ? "1" : "0";
      img.style.transform = on ? "scale(1)" : "scale(1.08)";
    });

    const project = PROJECTS[hover];
    if (outcomeRef.current) outcomeRef.current.textContent = project.cardOutcome;
    if (indexRef.current) indexRef.current.textContent = project.index;
  }, [hover]);

  useEffect(() => {
    PROJECTS.forEach((p) => {
      const img = new Image();
      img.decoding = "async";
      img.src = p.images.primary;
    });
  }, []);

  return (
    <div
      ref={shellRef}
      className="pointer-events-none fixed left-0 top-0 z-20 w-[22rem] will-change-transform"
      aria-hidden="true"
      data-testid="work-preview"
    >
      <div
        ref={cardRef}
        className="gm-work-preview overflow-hidden border border-hairline bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)]"
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.7)" }}
      >
        <div className="relative aspect-[4/3] bg-surface2">
          {PROJECTS.map((p, i) => (
            <img
              key={p.slug}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={p.images.primary}
              alt=""
              decoding="async"
              draggable={false}
              className={`gm-work-preview-img absolute inset-0 h-full w-full ${
                p.mockup === "framed-phones" ? "object-contain p-5" : "object-cover"
              }`}
              style={{ opacity: 0, transform: "scale(1.08)" }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          <span ref={outcomeRef} className="truncate" />
          <span ref={indexRef} className="shrink-0 text-signal" />
        </div>
      </div>
    </div>
  );
}

export function WorkGallery() {
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01" title="Selected work" />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold leading-[1.15] tracking-[-0.035em] sm:text-5xl lg:col-span-8 lg:text-6xl">
            <MaskedLines lines={["Selected work,", <>shipped to <em className="font-serif font-normal italic text-signal">real users.</em></>]} />
          </h2>
          <FadeUp delay={0.2} className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-sub">
              Halal investing at global scale, enterprise banking security, a
              desktop market terminal, and an AI SaaS built end-to-end.
            </p>
          </FadeUp>
        </div>

        <div className="mt-6 hidden grid-cols-12 gap-x-8 border-b border-hairline pb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint lg:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-4">Product</span>
          <span className="col-span-3">Domain</span>
          <span className="col-span-2">Platform</span>
          <span className="col-span-2 text-right">Stack</span>
        </div>

        <div
          className="relative mt-10 lg:mt-0"
          onPointerLeave={() => setHover(null)}
          onBlur={() => setHover(null)}
          data-testid="work-index"
        >
          {PROJECTS.map((p, i) => (
            <WorkRow key={p.slug} project={p} onEnter={() => setHover(i)} />
          ))}
          {fine && wide && !reduce && <Preview hover={hover} />}
        </div>
      </div>
    </section>
  );
}
