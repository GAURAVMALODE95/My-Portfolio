import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MaskedLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  compact = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Skip extra glyph padding — use on tight display headlines */
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={
            compact
              ? "block overflow-hidden"
              : "block overflow-hidden py-[0.2em] -my-[0.05em]"
          }
        >
          <motion.span
            className={`block will-change-transform ${compact ? "" : "pr-[0.06em]"} ${lineClassName}`}
            initial={reduce ? false : { y: "112%" }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  index,
  title,
  onDark = false,
}: {
  index: string;
  title: string;
  onDark?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 sm:gap-5"
      data-testid={`section-label-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span className="shrink-0 font-mono text-sm font-semibold tracking-[0.16em] text-signal sm:text-base">
        {index}
      </span>
      <span
        className={`shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.28em] sm:text-[13px] ${
          onDark ? "text-canvas" : "text-ink"
        }`}
      >
        {title}
      </span>
      <span
        className={`h-px min-w-0 flex-1 ${onDark ? "bg-white/25" : "bg-ink/20"}`}
        aria-hidden="true"
      />
    </div>
  );
}

export function CountUp({
  to,
  suffix = "",
  decimals,
  className = "",
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const dec = decimals ?? (Number.isInteger(to) ? 0 : 1);

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to.toFixed(dec) + suffix;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(dec) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, dec, reduce]);

  return (
    <span ref={ref} className={className}>
      {to.toFixed(dec) + suffix}
    </span>
  );
}
