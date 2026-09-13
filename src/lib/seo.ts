/** iDatez public SEO facts. Canonicals stay on this origin only. */
export const SEO_SITE = {
  name: "iDatez",
  origin: "https://idatez.com",
  locale: "da-DK",
  ogLocale: "da_DK",
  operator: "Viniko",
  cvr: "44072122",
  defaultTitle: "iDatez – Mød nogen, der matcher dig",
  defaultDescription:
    "iDatez er dating med færre spil og flere rigtige møder. Opret din profil gratis og find mennesker, du kan møde i virkeligheden.",
} as const;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_SITE.origin}${normalized === "/" ? "/" : normalized}`;
}

export function titleTemplate(title: string): string {
  return title.includes("iDatez") ? title : `${title} | iDatez`;
}
