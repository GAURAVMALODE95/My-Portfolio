import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import { PROFILE } from "@/data/site";

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
    const t = setTimeout(() => dismiss(), 1600);
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
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-canvas px-6"
          onClick={dismiss}
          role="presentation"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="overflow-hidden text-center">
            <motion.p
              className="font-display text-[clamp(2.25rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink"
              initial={{ y: "110%", opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
            >
              {PROFILE.name}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
