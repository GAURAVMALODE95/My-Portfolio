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
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
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
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4" data-testid={`section-label-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-signal">
        {index}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
        {title}
      </span>
      <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
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
