import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

export function scrollToId(id: string, offset = -96) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
