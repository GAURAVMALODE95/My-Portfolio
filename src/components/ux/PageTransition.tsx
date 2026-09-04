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
import { PROFILE } from "@/data/site";

const COLS = 4;
const DURATION = 0.85;
const STAGGER = 0.14;
const HOLD_MS = 180;
const INTRO_HOLD_MS = 2000;

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
      await new Promise((r) => setTimeout(r, HOLD_MS));
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
    }, INTRO_HOLD_MS);
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
              className="h-full border-r border-black/[0.04] bg-canvas last:border-r-0"
            />
          ))}
        </div>

        <AnimatePresence>
          {intro && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="overflow-hidden text-center">
                <motion.p
                  className="font-display text-[clamp(2.25rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink"
                  initial={{ y: "110%", opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.15 }}
                  data-testid="splash-name"
                >
                  {PROFILE.name}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransitionContext.Provider>
  );
}
