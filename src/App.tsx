import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { EASE } from "@/components/motion/Reveal";
import { Cursor } from "@/components/ux/Cursor";
import { TransitionProvider, usePageTransition } from "@/components/ux/PageTransition";
import { initLenis, scrollToTop } from "@/lib/lenis";
import CaseStudy from "@/pages/CaseStudy";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    scrollToTop(true);
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        key={location.pathname}
        className="relative z-[2]"
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -10 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function LenisRoot() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!reduce) initLenis();
  }, [reduce]);
  return null;
}

function PageAtmosphere() {
  const { transitioning } = usePageTransition();
  if (transitioning) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden opacity-40 lg:block"
        aria-hidden="true"
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-12 px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-hairline last:border-r" />
          ))}
        </div>
      </div>
      <div
        className="grain-overlay pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        aria-hidden="true"
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisRoot />
      <a
        href="#main-content"
        data-testid="skip-to-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-canvas"
      >
        Skip to content
      </a>
      <ScrollManager />
      <TransitionProvider>
        <Nav />
        <AnimatedRoutes />
        <Footer />
        <PageAtmosphere />
      </TransitionProvider>
      <Cursor />
      <Toaster
        position="bottom-right"
        theme="light"
        toastOptions={{
          style: {
            background: "#FAF8F5",
            border: "1px solid rgba(128,128,128,0.25)",
            color: "#141518",
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "12px",
            borderRadius: "4px",
          },
        }}
      />
    </BrowserRouter>
  );
}
