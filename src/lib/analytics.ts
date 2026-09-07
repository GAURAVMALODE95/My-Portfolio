export const GA_MEASUREMENT_ID = "G-SBX733VC73";

export type ResumeSection = "hero" | "nav" | "nav_mobile" | "contact" | "footer";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export function trackPageView(path: string, title?: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

export function trackResumeDownload(section: ResumeSection) {
  gtag("event", "resume_download", {
    section,
    page_path: window.location.pathname,
    file_name: "Gaurav-Malode-Resume.pdf",
    transport_type: "beacon",
  });
}
