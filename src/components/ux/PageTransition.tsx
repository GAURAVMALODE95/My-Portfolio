import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE } from "@/components/motion/Reveal";

const COLS = 4;
const DURATION = 0.5;
const STAGGER = 0.08;

interface Ctx {
  runTransition: (action?: () => void) => void;
  transitioning: boolean;
}

const PageTransitionContext = createContext<Ctx>({
  runTransition: (action) => action?.(),
  transitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

const variants = {
  hidden: { y: "101%" },
  cover: (i: number) => ({
    y: "0%",
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
  reveal: (i: number) => ({
    y: "-101%",
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
};

function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const controls = useAnimationControls();
  const lock = useRef(false);

  const introRef = useRef<boolean>(
    (() => {
      if (typeof window === "undefined") return false;
      if (prefersReduced()) return false;
      try {
        return !sessionStorage.getItem("gm-intro-seen");
      } catch {
        return false;
      }
    })(),
  );

  const [busy, setBusy] = useState<boolean>(introRef.current);
  const [intro, setIntro] = useState<boolean>(introRef.current);

  const runTransition = useCallback(
    async (action?: () => void) => {
      if (prefersReduced() || lock.current) {
        action?.();
        return;
      }
      lock.current = true;
      setBusy(true);
      await controls.start("cover");
      action?.();
      await new Promise((r) => setTimeout(r, 90));
      await controls.start("reveal");
      controls.set("hidden");
      setBusy(false);
      lock.current = false;
    },
    [controls],
  );

  useEffect(() => {
    if (!introRef.current) return;
    try {
      sessionStorage.setItem("gm-intro-seen", "1");
    } catch {
      /* ignore */
    }
    controls.set("cover");
    const t = setTimeout(async () => {
      setIntro(false);
      await controls.start("reveal");
      controls.set("hidden");
      setBusy(false);
    }, 1150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialVariant = introRef.current ? "cover" : "hidden";

  return (
    <PageTransitionContext.Provider value={{ runTransition, transitioning: busy }}>
      {children}
      <div
        className="fixed inset-0 z-[100]"
        style={{ pointerEvents: busy ? "auto" : "none" }}
        aria-hidden="true"
        data-testid="page-transition-overlay"
      >
        <div className="grid h-full w-full grid-cols-4">
          {Array.from({ length: COLS }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={variants}
              initial={initialVariant}
              animate={controls}
              className="h-full border-r border-black/[0.04] bg-canvas last:border-r-0 dark:border-white/[0.04]"
            />
          ))}
        </div>

        <AnimatePresence>
          {intro && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <motion.span
                className="h-px w-40 origin-left bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <div className="mt-6 overflow-hidden">
                <motion.p
                  className="font-display text-3xl font-bold uppercase tracking-[-0.03em] text-ink sm:text-5xl"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                >
                  Welcome
                </motion.p>
              </div>
              <motion.p
                className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                Gaurav Malode — Software Developer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransitionContext.Provider>
  );
}
