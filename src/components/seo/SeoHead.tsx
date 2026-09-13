import { useLayoutEffect } from "react";
import { SEO_SITE, absoluteUrl, titleTemplate } from "@/lib/seo";

type Props = {
  title: string;
  description: string;
  path: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

const SeoHead = ({ title, description, path }: Props) => {
  useLayoutEffect(() => {
    const fullTitle = titleTemplate(title);
    const canonical = absoluteUrl(path);
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:locale", SEO_SITE.ogLocale);
    upsertMeta("property", "og:site_name", SEO_SITE.name);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(canonical);
    document.documentElement.lang = "da";
  }, [title, description, path]);

  return null;
};

export default SeoHead;
