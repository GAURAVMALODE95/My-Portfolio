import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/Reveal";

export function IntroLoader() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    try {
      return !sessionStorage.getItem("gm-intro-seen");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => dismiss(), 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    try {
      sessionStorage.setItem("gm-intro-seen", "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="intro-loader"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-canvas"
          onClick={dismiss}
          role="presentation"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <motion.div
            className="h-px w-44 origin-left bg-signal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <div className="mt-7 overflow-hidden">
            <motion.p
              className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            >
              GAURAV MALODE
            </motion.p>
          </div>
          <motion.p
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            Software Engineer / Fintech / Mobile
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
