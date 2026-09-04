import { useEffect } from "react";
import { absoluteUrl, DEFAULT_TITLE, OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

export interface SeoOptions {
  path?: string;
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function ensureMeta(attr: "name" | "property", key: string, value: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function ensureLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function ensureJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
}

export function useSeo(title: string, description: string, options: SeoOptions = {}) {
  const { path = "/", noindex = false, type = "website", image = OG_IMAGE_PATH, jsonLd } = options;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);
    const fullTitle = title || DEFAULT_TITLE;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    ensureMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    ensureMeta("name", "googlebot", noindex ? "noindex, nofollow" : "index, follow");
    ensureLink("canonical", url);

    ensureMeta("property", "og:type", type);
    ensureMeta("property", "og:title", fullTitle);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:image", imageUrl);
    ensureMeta("property", "og:image:secure_url", imageUrl);
    ensureMeta("name", "twitter:title", fullTitle);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", imageUrl);

    if (jsonLdKey) ensureJsonLd("page-jsonld", JSON.parse(jsonLdKey));

    return () => {
      if (jsonLdKey) {
        const el = document.getElementById("page-jsonld");
        if (el) el.remove();
      }
    };
  }, [title, description, path, noindex, type, image, jsonLdKey]);
}

export { SITE_URL };
