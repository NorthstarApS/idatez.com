import { SEO_SITE, absoluteUrl } from "@/lib/seo";
import type { PublicPageContent } from "@/content/public-pages";

export function publicPageJsonLd(page: PublicPageContent) {
  const url = absoluteUrl(page.path);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: SEO_SITE.locale,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: SEO_SITE.name,
        url: SEO_SITE.origin + "/",
      },
      publisher: {
        "@type": "Organization",
        name: SEO_SITE.operator,
        identifier: `CVR:${SEO_SITE.cvr}`,
        url: SEO_SITE.origin + "/",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}
