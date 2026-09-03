import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { TIMELINE } from "@/data/site";
import { getLenis } from "@/lib/lenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function TimelineDetail({ text, tags }: { text: string; tags: string[] }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <p className="pt-3 text-sm leading-relaxed text-sub">{text}</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-faint"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function DesktopTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const idx = Math.min(
      TIMELINE.length - 1,
      Math.max(0, Math.floor(v * TIMELINE.length)),
    );
    setActiveIdx(idx);
  });

  const focusItem = (idx: number) => {
    setActiveIdx(idx);
    const el = document.getElementById(`timeline-item-${TIMELINE[idx].id}`);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -window.innerHeight / 2 + el.offsetHeight / 2,
        duration: 0.9,
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={ref} className="relative mt-14 hidden md:block" data-testid="timeline-desktop">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-hairline" aria-hidden="true" />
      <motion.div
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-signal"
        style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
        aria-hidden="true"
      />
      <ol className="space-y-4">
        {TIMELINE.map((item, i) => {
          const active = reduce ? true : i === activeIdx;
          return (
            <li
              key={item.id}
              id={`timeline-item-${item.id}`}
              className="relative pl-12"
            >
              <span
                className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border transition-colors duration-300 ${
                  active
                    ? "border-signal bg-signal"
                    : "border-hairline bg-canvas"
                }`}
                aria-hidden="true"
              />
              <button
                type="button"
                data-testid={`timeline-milestone-${item.id}`}
                onClick={() => focusItem(i)}
                aria-expanded={active}
                className={`w-full border p-6 text-left transition-colors duration-300 ${
                  active
                    ? "border-hairline bg-surface/60"
                    : "border-transparent hover:border-hairline"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                  {item.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-sub">{item.org}</p>
                <AnimatePresence initial={false}>
                  {active && (
                    <TimelineDetail text={item.detail} tags={item.tags} />
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MobileTimeline() {
  const [openId, setOpenId] = useState<string>(TIMELINE[0].id);
  return (
    <div className="mt-12 md:hidden" data-testid="timeline-mobile">
      <ol className="space-y-3">
        {TIMELINE.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="border border-hairline">
              <button
                type="button"
                data-testid={`timeline-mobile-milestone-${item.id}`}
                onClick={() => setOpenId(open ? "" : item.id)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-4 p-5 text-left"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                    {item.period}
                  </span>
                  <span className="mt-1.5 block font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-sub">
                    {item.org}
                  </span>
                </span>
                <span
                  className={`mt-1 font-mono text-xs text-faint transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <div className="px-5 pb-5">
                    <TimelineDetail text={item.detail} tags={item.tags} />
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function ExperienceTimeline() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-hairline py-24 sm:py-32"
      aria-label="Experience timeline"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="02" title="Experience" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tighter sm:text-5xl">
            <MaskedLines lines={["A short history", "of shipping."]} />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-sub">
              From an AI & data-science degree to production fintech,
              enterprise banking, desktop market software, and a solo AI SaaS.
            </p>
          </FadeUp>
        </div>
        {isDesktop ? <DesktopTimeline /> : <MobileTimeline />}
      </div>
    </section>
  );
}
