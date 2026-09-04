import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";

export function TextReveal({
  children,
  className,
  targetRef,
}: {
  children: string;
  className?: string;
  targetRef?: RefObject<HTMLElement | null>;
}) {
  const localRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef ?? localRef,
    offset: ["start 0.85", "end 0.5"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <span
      ref={localRef}
      className={cn(
        "flex flex-wrap font-display text-3xl font-medium leading-[1.3] tracking-[-0.025em] text-white sm:text-4xl lg:text-[3rem]",
        className,
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]} instant={!!reduce}>
            {word}
          </Word>
        );
      })}
    </span>
  );
}

function Word({
  children,
  progress,
  range,
  instant,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  instant: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span className="absolute inset-0 text-white" aria-hidden="true">
        {children}
      </span>
      <motion.span className="relative text-ink" style={{ opacity: instant ? 1 : opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
