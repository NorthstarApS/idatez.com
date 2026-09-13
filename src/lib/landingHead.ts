import { SEO_SITE, absoluteUrl, titleTemplate } from "@/lib/seo";
import type { PublicPageContent } from "@/content/public-pages";

export function landingHeadTags(page: PublicPageContent): string {
  const title = escapeHtml(titleTemplate(page.title));
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(absoluteUrl(page.path));
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${SEO_SITE.ogLocale}" />`,
    `<meta property="og:site_name" content="${SEO_SITE.name}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  ].join("\n    ");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
