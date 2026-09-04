import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Variant = "default" | "link" | "view" | "hidden";
const SIZE: Record<Variant, number> = { default: 10, link: 40, view: 88, hidden: 0 };

export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 650, damping: 48, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 650, damping: 48, mass: 0.3 });
  const [variant, setVariant] = useState<Variant>("hidden");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("input, textarea, select")) return setVariant("hidden");
      const c = t.closest<HTMLElement>("[data-cursor]");
      if (c) {
        setLabel(c.dataset.cursorLabel ?? "");
        return setVariant(c.dataset.cursor === "view" ? "view" : "link");
      }
      setLabel("");
      setVariant(t.closest("a, button, [role='button'], label, summary") ? "link" : "default");
    };
    const onLeave = () => setVariant("hidden");
    const onEnter = () => setVariant("default");
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerenter", onEnter);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const isView = variant === "view";

  return (
    <motion.div
      aria-hidden="true"
      data-testid="custom-cursor"
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          isView
            ? "bg-signal text-white"
            : variant === "link"
              ? "border border-ink bg-transparent"
              : "bg-ink"
        }`}
        animate={{ width: SIZE[variant], height: SIZE[variant], opacity: variant === "hidden" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        {isView && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">{label || "View"}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
