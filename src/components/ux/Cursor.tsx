import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Variant = "default" | "link" | "view" | "hidden";

export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const variantRef = useRef<Variant>("hidden");

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    const root = rootRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!root || !dot || !labelEl) return;

    html.classList.add("has-cursor");

    const setVariant = (next: Variant, nextLabel = "") => {
      if (next === "view") {
        const text = nextLabel || "View";
        if (labelEl.textContent !== text) labelEl.textContent = text;
        labelEl.hidden = false;
      } else if (!labelEl.hidden) {
        labelEl.hidden = true;
      }
      if (variantRef.current === next) return;
      variantRef.current = next;
      root.dataset.variant = next;
    };

    const onMove = (e: PointerEvent) => {
      // Imperative transform — no React / Framer on the hot path
      root.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("input, textarea, select")) {
        setVariant("hidden");
        return;
      }
      const c = t.closest<HTMLElement>("[data-cursor]");
      if (c) {
        setVariant(c.dataset.cursor === "view" ? "view" : "link", c.dataset.cursorLabel ?? "");
        return;
      }
      setVariant(t.closest("a, button, [role='button'], label, summary") ? "link" : "default");
    };

    const onLeave = () => setVariant("hidden");
    const onEnter = () => setVariant("default");

    window.addEventListener("pointermove", onMove, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    html.addEventListener("pointerenter", onEnter);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      html.removeEventListener("pointerleave", onLeave);
      html.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-testid="custom-cursor"
      data-variant="hidden"
      className="gm-cursor pointer-events-none fixed left-0 top-0 z-[95]"
    >
      <div ref={dotRef} className="gm-cursor-dot">
        <span ref={labelRef} className="gm-cursor-label" hidden>
          View
        </span>
      </div>
    </div>
  );
}
