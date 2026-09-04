import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/data/site";

export function Capabilities() {
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);
  const reduce = useReducedMotion();
  const active = CAPABILITIES.find((c) => c.id === activeId) ?? CAPABILITIES[0];

  return (
    <section id="capabilities" className="scroll-mt-24 border-t border-hairline py-24 sm:py-32" aria-label="Capabilities">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="03" title="Capabilities" />
        <h2 className="mt-10 font-display text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          <MaskedLines lines={["Tools of the trade,", <>organised by <em className="font-serif font-normal italic text-signal">intent.</em></>]} />
        </h2>

        <div className="mt-16 grid gap-px border border-hairline bg-hairline lg:grid-cols-12">
          <FadeUp className="bg-canvas lg:col-span-5">
            <div role="tablist" aria-label="Capability categories" className="flex flex-col">
              {CAPABILITIES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`cap-tab-${c.id}`}
                  aria-selected={activeId === c.id}
                  aria-controls={`cap-panel-${c.id}`}
                  data-testid={`capability-tab-${c.id}`}
                  onClick={() => setActiveId(c.id)}
                  onMouseEnter={() => setActiveId(c.id)}
                  className={`group flex items-center justify-between border-b border-hairline px-6 py-5 text-left transition-colors last:border-b-0 sm:px-8 ${
                    activeId === c.id ? "bg-surface text-ink" : "text-faint hover:text-sub"
                  }`}
                >
                  <span className="flex items-baseline gap-5">
                    <span className={`font-mono text-[10px] ${activeId === c.id ? "text-signal" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-bold tracking-[-0.02em] sm:text-2xl">{c.label}</span>
                  </span>
                  <span className="font-mono text-[10px] text-faint">{String(c.tags.length).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </FadeUp>

          <FadeUp className="bg-canvas lg:col-span-7" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`cap-panel-${active.id}`}
                aria-labelledby={`cap-tab-${active.id}`}
                data-testid="capability-panel"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col justify-between p-6 sm:p-10"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">{active.label}</p>
                  <p className="mt-5 max-w-xl font-display text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
                    {active.note}
                  </p>
                </div>
                <div className="mt-12">
                  <ul className="grid grid-cols-2 gap-x-6 border-t border-hairline sm:grid-cols-3">
                    {active.tags.map((tag) => (
                      <li
                        key={tag}
                        data-testid={`capability-tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="border-b border-hairline py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-sub"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    Applied in — <span className="text-ink">{active.related.join(" · ")}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
