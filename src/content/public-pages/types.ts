export type PublicFaq = {
  question: string;
  answer: string;
};

export type PublicSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PublicRelatedLink = {
  path: string;
  label: string;
};

export type PublicPageContent = {
  slug: string;
  path: string;
  /** Extra paths that render the same page. Canonical stays `path`. */
  aliases?: string[];
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: PublicSection[];
  faqs: PublicFaq[];
  related: PublicRelatedLink[];
};
