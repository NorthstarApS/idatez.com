import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const PUBLIC_SEO_PATHS = [
  "/dating",
  "/datingapp",
  "/dating-app",
  "/singler",
  "/gratis-dating-app",
  "/datingprofil",
  "/dating-i-virkeligheden",
];

/** Serve prerendered HTML for pretty URLs in `vite preview` (no trailing slash). */
function servePrerenderedHtml(): Plugin {
  return {
    name: "serve-prerendered-html",
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        const [pathname, query] = req.url.split("?");
        if (PUBLIC_SEO_PATHS.includes(pathname)) {
          req.url = `${pathname}/index.html${query ? `?${query}` : ""}`;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), servePrerenderedHtml(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
