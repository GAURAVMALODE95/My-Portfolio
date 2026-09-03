import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import {
  DesktopFrame,
  IPhoneFrame,
  SignalChart,
} from "@/components/DeviceMockups";
import { MaskedLines } from "@/components/motion/Reveal";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/site";
import { scrollToId } from "@/lib/lenis";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduce ? 1 : 0],
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 70,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 70,
    damping: 18,
  });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const musaffa = PROJECTS[0];
  const terminal = PROJECTS[2];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
      aria-label="Introduction"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <motion.p
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-faint"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            data-testid="hero-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            {PROFILE.name} — Software Engineer / Fintech / Mobile
          </motion.p>

          <h1 className="mt-7 font-display text-[13.5vw] font-extrabold leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <MaskedLines
              delay={0.25}
              lines={[
                <>I build <span className="text-signal">secure</span></>,
                <>financial products,</>,
                <>from mobile flows</>,
                <>to market intelligence.</>,
              ]}
            />
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-sub sm:text-lg"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            data-testid="hero-supporting-copy"
          >
            Software Developer focused on Flutter, React Native, React,
            Node.js, FastAPI, and security-sensitive product engineering.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <button
              type="button"
              data-testid="hero-cta-explore-work"
              onClick={() => scrollToId("work", -80)}
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-canvas transition-colors hover:bg-signal-hover"
            >
              <span className="cta-shift">
                <span>Explore selected work</span>
              </span>
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
            <a
              href={PROFILE.resumePath}
              download
              data-testid="hero-cta-resume"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-sub transition-colors hover:border-signal hover:text-ink"
            >
              <span className="cta-shift">
                <span>Download résumé</span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint sm:flex-row sm:gap-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            data-testid="hero-metadata"
          >
            <span>{PROFILE.location}</span>
            <span className="hidden text-hairline sm:inline" aria-hidden="true">
              /
            </span>
            <span>{PROFILE.availability}</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5" style={{ perspective: 1100 }}>
          <motion.div
            data-testid="hero-visual"
            className="relative mx-auto max-w-md lg:max-w-none"
            style={
              reduce
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.9 }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <DesktopFrame
                src={terminal.images.primary}
                alt={terminal.imageAlts.primary}
                title={terminal.frameTitle}
                priority
                className="w-full"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-10 -left-4 w-[38%] sm:-left-10"
              style={reduce ? undefined : { transform: "translateZ(60px)" }}
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <IPhoneFrame
                src={musaffa.images.primary}
                alt={musaffa.imageAlts.primary}
                priority
              />
            </motion.div>

            <motion.div
              className="absolute -right-3 -top-8 hidden w-44 border border-hairline bg-surface/90 p-3 backdrop-blur-sm sm:block"
              style={reduce ? undefined : { transform: "translateZ(90px)" }}
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.6,
              }}
            >
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                Signal / Live
              </p>
              <SignalChart className="h-12 w-full text-ink" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
