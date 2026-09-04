import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

export function ScrambleText({
  text,
  active,
  className = "",
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!active || reduce) {
      setOut(text);
      return;
    }
    const start = performance.now();
    const duration = 380;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        s += ch === " " || i < settled ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [active, text, reduce]);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
