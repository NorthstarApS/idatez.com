import { datingPage } from "./dating";
import { datingappPage } from "./datingapp";
import { datingIVirkelighedenPage } from "./dating-i-virkeligheden";
import { datingprofilPage } from "./datingprofil";
import { gratisDatingAppPage } from "./gratis-dating-app";
import { singlerPage } from "./singler";
import type { PublicPageContent } from "./types";

export type { PublicFaq, PublicPageContent, PublicRelatedLink, PublicSection } from "./types";
export { BILLING_FROM_CODE, FREE_PROFILE_LINE } from "./billing";

export const publicPages: PublicPageContent[] = [
  datingPage,
  datingappPage,
  singlerPage,
  gratisDatingAppPage,
  datingprofilPage,
  datingIVirkelighedenPage,
];

export const publicPageBySlug = new Map(publicPages.map((page) => [page.slug, page]));

export const publicPageByPath = new Map<string, PublicPageContent>();
for (const page of publicPages) {
  publicPageByPath.set(page.path, page);
  for (const alias of page.aliases ?? []) {
    publicPageByPath.set(alias, page);
  }
}

export function getPublicPageByPath(pathname: string): PublicPageContent | undefined {
  const clean = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return publicPageByPath.get(clean);
}

export function publicSeoPaths(): string[] {
  return publicPages.flatMap((page) => [page.path, ...(page.aliases ?? [])]);
}

export function pagePlainText(page: PublicPageContent): string {
  return [
    page.h1,
    page.lede,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

export function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function pageWordCount(page: PublicPageContent): number {
  return wordCount(pagePlainText(page));
}
