import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EASE, FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { usePageTransition } from "@/components/ux/PageTransition";
import { PROJECTS, type Project } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const year = (p: Project) => p.timeframe.match(/\d{4}/)?.[0] ?? "";

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
        runTransition(() => navigate(`/work/${project.slug}`));
      }}
      className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 border-b border-hairline py-7 transition-colors duration-300 hover:bg-surface/70 focus-visible:bg-surface/70 lg:grid-cols-12 lg:gap-x-8 lg:py-9"
    >
      <span className="font-mono text-xs text-faint lg:col-span-1">{project.index}</span>
      <h3 className="font-display text-2xl font-bold leading-none tracking-[-0.03em] transition-transform duration-500 ease-expo group-hover:translate-x-3 sm:text-3xl lg:col-span-5 lg:text-[2.9rem]">
        {project.product}
      </h3>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-sub lg:col-span-3 lg:block">
        {project.domain}
      </span>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-faint lg:col-span-2 lg:block">
        {project.platforms.slice(0, 2).join(" · ")}
      </span>
      <span className="flex items-center justify-end gap-4 lg:col-span-1">
        <span className="font-mono text-[11px] text-faint">{year(project)}</span>
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
          className="aspect-[16/10] w-full border border-hairline object-cover"
        />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sub">
          {project.domain} — {project.platforms.slice(0, 2).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

function Preview({ hover, x, y }: { hover: number | null; x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> }) {
  const rotate = useTransform(useVelocity(x), [-2000, 2000], [-5, 5]);
  const active = hover !== null ? PROJECTS[hover] : null;
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-20 w-[22rem]"
      style={{ x, y, rotate }}
      aria-hidden="true"
      data-testid="work-preview"
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 overflow-hidden border border-hairline bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)]"
        animate={{ scale: active ? 1 : 0.7, opacity: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div className="relative aspect-[4/3] bg-surface2">
          {PROJECTS.map((p, i) => (
            <motion.img
              key={p.slug}
              src={p.images.primary}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: hover === i ? 1 : 0, scale: hover === i ? 1 : 1.08 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          <span className="truncate">{active?.cardOutcome}</span>
          <span className="shrink-0 text-signal">{active?.index}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorkGallery() {
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 1024px)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01" title="Selected work" />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:col-span-8 lg:text-6xl">
            <MaskedLines lines={["Four products,", <>shipped to <em className="font-serif font-normal italic text-signal">real users.</em></>]} />
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
          <span className="col-span-5">Product</span>
          <span className="col-span-3">Domain</span>
          <span className="col-span-2">Platform</span>
          <span className="col-span-1 text-right">Year</span>
        </div>

        <div
          ref={ref}
          className="relative mt-10 lg:mt-0"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          onBlur={() => setHover(null)}
          data-testid="work-index"
        >
          {PROJECTS.map((p, i) => (
            <WorkRow key={p.slug} project={p} onEnter={() => setHover(i)} />
          ))}
          {fine && wide && !reduce && <Preview hover={hover} x={sx} y={sy} />}
        </div>
      </div>
    </section>
  );
}
