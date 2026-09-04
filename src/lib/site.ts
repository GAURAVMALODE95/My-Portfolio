export const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://gauravmalode.in").replace(
  /\/$/,
  "",
);

export const CONTACT_ENDPOINT =
  process.env.REACT_APP_CONTACT_ENDPOINT || "https://formspree.io/f/maeybobq";

export const DEFAULT_TITLE = "Gaurav Malode — Software Developer";

export const DEFAULT_DESCRIPTION =
  "Gaurav Malode is a software developer in Nashik, India, building secure financial software — Flutter and React Native apps for fintech and enterprise banking, desktop market terminals, and Node.js / FastAPI services. 1.4M+ app downloads.";

export const OG_IMAGE_PATH = "/og/cover.png";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
