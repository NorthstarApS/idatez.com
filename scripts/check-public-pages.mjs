import { publicPages, pageWordCount, pagePlainText } from "../src/content/public-pages/index.ts";

const forbidden = [
  /hookup/i,
  /luksusdating/i,
  /eksklusiv dating/i,
  /matchfetch/i,
  /partnerhub/i,
  /datez\+/i,
  /\bPLUS\b/,
  /29\s*kr/i,
  /49\s*kr/i,
  /tusindvis af/i,
  /\d+\s?%/,
];

const titles = new Set();
const descriptions = new Set();
const h1s = new Set();
const errors = [];

for (const page of publicPages) {
  const count = pageWordCount(page);
  if (count < 1200 || count > 1800) {
    errors.push(`${page.path} word count ${count} is outside 1200–1800`);
  }
  if (titles.has(page.title)) errors.push(`Duplicate title: ${page.title}`);
  if (descriptions.has(page.description)) errors.push(`Duplicate description: ${page.description}`);
  if (h1s.has(page.h1)) errors.push(`Duplicate H1: ${page.h1}`);
  titles.add(page.title);
  descriptions.add(page.description);
  h1s.add(page.h1);
  if (page.title.length < 20 || page.description.length < 80 || page.description.length > 170) {
    errors.push(`${page.path} title/description length looks off (${page.title.length}/${page.description.length})`);
  }
  if (page.faqs.length < 5) errors.push(`${page.path} needs at least 5 FAQs`);
  const text = pagePlainText(page);
  for (const pattern of forbidden) {
    if (pattern.test(text)) {
      errors.push(`${page.path} contains forbidden pattern ${pattern}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const page of publicPages) {
  console.log(`${page.path}\t${pageWordCount(page)} words`);
}
console.log("public page content checks passed");
