import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";

export type ColorWord = {
  word: string;
  em?: boolean;
};

export function ScrollColorWords({
  words,
  className = "",
}: {
  words: ColorWord[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLSpanElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 0.82", "end 0.38"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const n = words.length;
    nodes.current.forEach((el, i) => {
      if (!el) return;
      const local = Math.min(1, Math.max(0, v * n - i));
      const r = Math.round(255 + (20 - 255) * local);
      const g = Math.round(255 + (21 - 255) * local);
      const b = Math.round(255 + (24 - 255) * local);
      el.style.color = `rgb(${r} ${g} ${b})`;
    });
  });

  return (
    <span ref={track} className={className}>
      {words.map((w, i) => (
        <span key={`${w.word}-${i}`}>
          <span
            ref={(el) => {
              nodes.current[i] = el;
            }}
            className={w.em ? "font-serif italic" : undefined}
            style={{ color: reduce ? "rgb(20 21 24)" : "#fff" }}
          >
            {w.word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
