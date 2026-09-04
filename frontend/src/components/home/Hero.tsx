import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { EASE, MaskedLines } from "@/components/motion/Reveal";
import { Cta } from "@/components/ux/Cta";
import { FitText } from "@/components/ux/FitText";
import { usePageTransition } from "@/components/ux/PageTransition";
import { PROFILE } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToId } from "@/lib/lenis";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{label}</dt>
      <dd className="mt-2 text-sm font-medium leading-snug text-ink">{value}</dd>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const { runTransition } = usePageTransition();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yName = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          {...enter(0.1)}
          className="flex items-center justify-between border-b border-hairline pb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
          data-testid="hero-eyebrow"
        >
          <span>Portfolio — 2026</span>
          <span className="hidden text-sub sm:inline">{PROFILE.location}</span>
          <span className="flex items-center gap-2 text-ink">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Open to work
          </span>
        </motion.div>

        <motion.div style={{ opacity: fade }} className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(1.9rem,4.6vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink">
              <MaskedLines
                delay={0.2}
                lines={[
                  <>Secure financial software —</>,
                  <>
                    from the{" "}
                    <span className="italic font-medium text-signal">mobile screen</span>
                  </>,
                  <>to the market-data layer.</>,
                ]}
              />
            </h1>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-4 lg:border-l lg:border-hairline lg:pl-8">
            <motion.p
              {...enter(0.6)}
              className="max-w-sm text-base leading-relaxed text-sub"
              data-testid="hero-supporting-copy"
            >
              Software developer at {PROFILE.company}, shipping Flutter and React
              Native products for fintech and enterprise banking — and the Node.js
              and FastAPI services underneath them.
            </motion.p>

            <motion.div {...enter(0.75)} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Cta
                testId="hero-cta-explore-work"
                icon={ArrowDownRight}
                onClick={() => runTransition(() => scrollToId("work", -80))}
              >
                Selected work
              </Cta>
              <Cta testId="hero-cta-resume" icon={ArrowUpRight} variant="ghost" href={PROFILE.resumePath} download>
                Résumé (PDF)
              </Cta>
            </motion.div>
          </div>
        </motion.div>

        <motion.dl
          {...enter(0.85)}
          className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-6 sm:grid-cols-4 lg:mt-20"
          data-testid="hero-metadata"
        >
          <Meta label="Role" value={PROFILE.role} />
          <Meta label="Company" value={PROFILE.company} />
          <Meta label="Focus" value={PROFILE.focus.slice(0, 3).join(" · ")} />
          <Meta label="Based in" value={PROFILE.location} />
        </motion.dl>
      </div>

      <motion.div style={{ y: yName }} className="mx-auto mt-16 w-full max-w-7xl px-5 pb-5 sm:px-8 lg:mt-12">
        <div className="flex items-end justify-between border-t border-hairline pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span className="text-sub">Software Developer</span>
          <span className="flex items-center gap-2">
            Scroll
            <motion.span
              aria-hidden="true"
              className="block h-6 w-px bg-faint"
              animate={reduce ? undefined : { scaleY: [0, 1, 1, 0], originY: [0, 0, 1, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
        <p
          className="mt-3 select-none font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-ink"
          data-testid="hero-name"
          aria-label={PROFILE.name}
        >
          <MaskedLines
            delay={0.4}
            lines={
              wide
                ? [<FitText text={PROFILE.name} />]
                : [<FitText text="Gaurav" />, <FitText text="Malode" />]
            }
          />
        </p>
      </motion.div>
    </section>
  );
}
