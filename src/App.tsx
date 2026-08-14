import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/idatez/Home";
import Discover from "./pages/idatez/Discover";
import ProfileDetail from "./pages/idatez/ProfileDetail";
import Matches from "./pages/idatez/Matches";
import Likes from "./pages/idatez/Likes";
import Messages from "./pages/idatez/Messages";
import Onboarding from "./pages/idatez/Onboarding";
import Safety from "./pages/idatez/Safety";
import About from "./pages/idatez/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
