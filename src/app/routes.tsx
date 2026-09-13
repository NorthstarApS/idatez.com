import { Route, Routes } from "react-router-dom";
import Home from "@/pages/idatez/Home";
import Discover from "@/pages/idatez/Discover";
import ProfileDetail from "@/pages/idatez/ProfileDetail";
import Matches from "@/pages/idatez/Matches";
import Likes from "@/pages/idatez/Likes";
import Messages from "@/pages/idatez/Messages";
import Onboarding from "@/pages/idatez/Onboarding";
import Safety from "@/pages/idatez/Safety";
import About from "@/pages/idatez/About";
import PublicPage from "@/pages/idatez/PublicPage";
import NotFound from "@/pages/NotFound";
import { publicSeoPaths } from "@/content/public-pages";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/discover" element={<Discover />} />
    <Route path="/profile/:id" element={<ProfileDetail />} />
    <Route path="/matches" element={<Matches />} />
    <Route path="/likes" element={<Likes />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/safety" element={<Safety />} />
    <Route path="/about" element={<About />} />
    {publicSeoPaths().map((path) => (
      <Route key={path} path={path} element={<PublicPage />} />
    ))}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
