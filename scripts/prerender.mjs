import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = process.cwd();
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

function replaceHead(template, head) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, "");
  html = html.replace(/<meta name="description"[^>]*>/, "");
  html = html.replace(/<link rel="canonical"[^>]*>/, "");
  html = html.replace(/<meta property="og:[^"]+"[^>]*>/g, "");
  html = html.replace(/<meta name="twitter:[^"]+"[^>]*>/g, "");
  html = html.replace("</head>", `    ${head}\n  </head>`);
  return html;
}

function writeRoot(template, markup) {
  if (!template.includes('<div id="root"></div>')) {
    throw new Error("index.html is missing <div id=\"root\"></div>");
  }
  return template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

async function writeSitemap(paths) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["/", "/about", "/safety", ...paths].filter((value, index, all) => all.indexOf(value) === index);
  const body = urls
    .map((urlPath) => {
      const loc = `https://idatez.com${urlPath === "/" ? "/" : urlPath}`;
      const priority = urlPath === "/" ? "1.0" : urlPath.split("/").length <= 2 ? "0.8" : "0.7";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  await writeFile(path.join(root, "public", "sitemap.xml"), xml);
  await writeFile(path.join(distDir, "sitemap.xml"), xml);
}

async function main() {
  await build({
    configFile: path.join(root, "vite.config.ts"),
    build: {
      ssr: path.join(root, "src/entry-server.tsx"),
      outDir: ssrDir,
      emptyOutDir: true,
      sourcemap: false,
    },
  });

  const ssrEntryJs = path.join(ssrDir, "entry-server.js");
  const ssrEntryMjs = path.join(ssrDir, "entry-server.mjs");
  const { access } = await import("node:fs/promises");
  let ssrEntry = ssrEntryJs;
  try {
    await access(ssrEntryJs);
  } catch {
    ssrEntry = ssrEntryMjs;
  }
  const { renderPublicPage, publicSeoPaths, publicPages, pageWordCount } = await import(pathToFileURL(ssrEntry).href);
  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  const paths = publicSeoPaths();

  for (const urlPath of paths) {
    const result = renderPublicPage(urlPath);
    if (!result) {
      throw new Error(`No public page for ${urlPath}`);
    }
    if (!result.html.includes("<h1")) {
      throw new Error(`Prerendered ${urlPath} is missing <h1>`);
    }

    const pageHtml = writeRoot(replaceHead(template, result.head), result.html);
    const outFile = path.join(distDir, urlPath.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, pageHtml);
    console.log(`prerender ${urlPath} -> ${path.relative(root, outFile)}`);
  }

  const canonicalPaths = publicPages.map((page) => page.path);
  await writeSitemap(canonicalPaths);

  const short = publicPages.filter((page) => {
    const count = pageWordCount(page);
    return count < 1200 || count > 1800;
  });
  if (short.length) {
    const details = short.map((page) => `${page.path}: ${pageWordCount(page)} words`).join(", ");
    throw new Error(`Public pages outside 1200–1800 words: ${details}`);
  }

  console.log(`prerendered ${paths.length} public SEO routes`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
