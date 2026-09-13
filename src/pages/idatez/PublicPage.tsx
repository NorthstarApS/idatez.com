import { Navigate, useLocation } from "react-router-dom";
import PublicLandingPage from "@/components/seo/PublicLandingPage";
import { getPublicPageByPath } from "@/content/public-pages";

const PublicPage = () => {
  const { pathname } = useLocation();
  const page = getPublicPageByPath(pathname);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return <PublicLandingPage page={page} />;
};

export default PublicPage;
