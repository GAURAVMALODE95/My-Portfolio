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

const COLS = 6;
const COVER_DURATION = 0.62;
const REVEAL_DURATION = 0.62;
const STAGGER = 0.08;
const HOLD_MS = 900;
const LABEL_OUT_MS = 280;
const INTRO_HOLD_MS = 2000;

interface Ctx {
  runTransition: (action?: () => void, label?: string) => void;
  transitioning: boolean;
}

const PageTransitionContext = createContext<Ctx>({
  runTransition: (action) => action?.(),
  transitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

const stripVariants = {
  hidden: { y: "-101%" },
  cover: (i: number) => ({
    y: "0%",
    transition: { duration: COVER_DURATION, ease: EASE, delay: i * STAGGER },
  }),
  reveal: (i: number) => ({
    y: "-101%",
    transition: { duration: REVEAL_DURATION, ease: EASE, delay: i * STAGGER },
  }),
};

function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const strips = useAnimationControls();
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
  const [label, setLabel] = useState<string | null>(introRef.current ? "Welcome" : null);

  const runTransition = useCallback(
    async (action?: () => void, nextLabel?: string) => {
      if (prefersReduced() || lock.current) {
        action?.();
        return;
      }
      lock.current = true;
      setBusy(true);

      await strips.start("cover");
      setLabel(nextLabel ?? null);
      action?.();
      await new Promise((r) => setTimeout(r, HOLD_MS));

      setLabel(null);
      await new Promise((r) => setTimeout(r, LABEL_OUT_MS));
      await strips.start("reveal");
      strips.set("hidden");
      setBusy(false);
      lock.current = false;
    },
    [strips],
  );

  useEffect(() => {
    if (!introRef.current) return;
    try {
      sessionStorage.setItem("gm-intro-seen", "1");
    } catch {
      /* ignore */
    }
    strips.set("cover");
    const t = setTimeout(async () => {
      setLabel(null);
      await new Promise((r) => setTimeout(r, LABEL_OUT_MS));
      await strips.start("reveal");
      strips.set("hidden");
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
        className="fixed inset-0 z-[200] overflow-hidden"
        style={{ pointerEvents: busy ? "auto" : "none" }}
        aria-hidden="true"
        data-testid="page-transition-overlay"
      >
        <div className="grid h-full w-full grid-cols-6">
          {Array.from({ length: COLS }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={stripVariants}
              initial={initialVariant}
              animate={strips}
              className="gm-shutter relative h-full w-[calc(100%+3px)] -ml-px"
            />
          ))}
        </div>

        <AnimatePresence>
          {label && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
              initial={introRef.current ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="overflow-hidden text-center">
                <motion.p
                  className="font-display text-[clamp(2.25rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink"
                  initial={introRef.current ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: introRef.current ? 0 : 0.75, ease: EASE }}
                  data-testid="splash-name"
                >
                  {label}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransitionContext.Provider>
  );
}
