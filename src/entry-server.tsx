import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import PublicLandingPage from "@/components/seo/PublicLandingPage";
import { landingHeadTags } from "@/lib/landingHead";
import { getPublicPageByPath, pageWordCount, publicPages, publicSeoPaths } from "@/content/public-pages";

export { pageWordCount, publicPages, publicSeoPaths };

export type PrerenderResult = {
  html: string;
  head: string;
  path: string;
};

export function renderPublicPage(url: string): PrerenderResult | null {
  const page = getPublicPageByPath(url);
  if (!page) return null;

  const html = renderToString(
    <StaticRouter location={url}>
      <PublicLandingPage page={page} />
    </StaticRouter>,
  );

  return {
    html,
    head: landingHeadTags(page),
    path: page.path,
  };
}
