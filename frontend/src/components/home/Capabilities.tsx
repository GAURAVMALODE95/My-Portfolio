import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/data/site";

export function Capabilities() {
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);
  const reduce = useReducedMotion();
  const active = CAPABILITIES.find((c) => c.id === activeId) ?? CAPABILITIES[0];

  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-hairline py-24 sm:py-32"
      aria-label="Capabilities"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="03" title="Capabilities" />
        <h2 className="mt-8 font-display text-4xl font-extrabold tracking-tighter sm:text-5xl">
          <MaskedLines lines={["Tools of the trade,", "organised by intent."]} />
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-4">
            <div role="tablist" aria-label="Capability categories" className="flex flex-col">
              {CAPABILITIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`cap-tab-${c.id}`}
                  aria-selected={activeId === c.id}
                  aria-controls={`cap-panel-${c.id}`}
                  data-testid={`capability-tab-${c.id}`}
                  onClick={() => setActiveId(c.id)}
                  className={`flex items-center justify-between border-b border-hairline py-4 text-left font-display text-lg font-bold tracking-tight transition-colors ${
                    activeId === c.id ? "text-ink" : "text-faint hover:text-sub"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        activeId === c.id ? "bg-signal" : "bg-hairline"
                      }`}
                      aria-hidden="true"
                    />
                    {c.label}
                  </span>
                  <span className="font-mono text-[10px] text-faint">
                    {String(c.tags.length).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>

          <FadeUp className="lg:col-span-8" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`cap-panel-${active.id}`}
                aria-labelledby={`cap-tab-${active.id}`}
                data-testid="capability-panel"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="border border-hairline bg-surface/40 p-7 sm:p-9"
              >
                <p className="max-w-2xl text-base leading-relaxed text-sub">
                  {active.note}
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      tabIndex={0}
                      data-testid={`capability-tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="cursor-default rounded-full border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-sub transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:text-ink focus-visible:-translate-y-0.5 focus-visible:border-signal/50 focus-visible:text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-8 border-t border-hairline pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Applied in —{" "}
                  <span className="text-signal">{active.related.join(" · ")}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
