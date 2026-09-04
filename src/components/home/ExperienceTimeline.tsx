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
      <p className="pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
        {tags.join("  ·  ")}
      </p>
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
    <div ref={ref} className="relative mt-16 hidden md:block" data-testid="timeline-desktop">
      <div className="absolute bottom-2 left-[3px] top-2 w-px bg-hairline" aria-hidden="true" />
      <motion.div
        className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-signal"
        style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
        aria-hidden="true"
      />
      <ol>
        {TIMELINE.map((item, i) => {
          const active = reduce ? true : i === activeIdx;
          return (
            <li
              key={item.id}
              id={`timeline-item-${item.id}`}
              className="relative pl-12"
            >
              <span
                className={`absolute left-0 top-[1.9rem] h-[7px] w-[7px] transition-colors duration-300 ${
                  active ? "bg-signal" : "bg-hairline"
                }`}
                aria-hidden="true"
              />
              <button
                type="button"
                data-testid={`timeline-milestone-${item.id}`}
                onClick={() => focusItem(i)}
                aria-expanded={active}
                className={`grid w-full grid-cols-12 gap-x-8 border-t border-hairline py-7 text-left transition-colors duration-300 ${
                  active ? "text-ink" : "text-faint hover:text-sub"
                }`}
              >
                <p className="col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  {item.period}
                </p>
                <div className="col-span-9">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className={`mt-1.5 text-sm ${active ? "text-sub" : "text-faint"}`}>{item.org}</p>
                  <AnimatePresence initial={false}>
                    {active && (
                      <TimelineDetail text={item.detail} tags={item.tags} />
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-hairline" aria-hidden="true" />
    </div>
  );
}

function MobileTimeline() {
  const [openId, setOpenId] = useState<string>(TIMELINE[0].id);
  return (
    <div className="mt-12 md:hidden" data-testid="timeline-mobile">
      <ol className="border-t border-hairline">
        {TIMELINE.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="border-b border-hairline">
              <button
                type="button"
                data-testid={`timeline-mobile-milestone-${item.id}`}
                onClick={() => setOpenId(open ? "" : item.id)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
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
                  <div className="pb-5">
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
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:col-span-8 lg:text-6xl">
            <MaskedLines lines={["A short history", <>of <em className="font-serif font-normal italic text-signal">shipping.</em></>]} />
          </h2>
          <FadeUp delay={0.2} className="lg:col-span-4">
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
