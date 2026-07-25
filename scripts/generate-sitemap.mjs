import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LEARN_EDITORIAL_CONFIG } from "../src/learnConfig.mjs";

const SITE_URL = "https://www.1040paydays.com";
const appSourcePath = resolve("src/App.jsx");
const sitemapPath = resolve("public/sitemap.xml");
const vercelPath = resolve("vercel.json");

const appSource = readFileSync(appSourcePath, "utf8");

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getArticlesList(source) {
  const articlesMatch = source.match(/const\s+ARTICLES\s*=\s*\[([\s\S]*?)\];/);
  if (!articlesMatch) {
    throw new Error("Could not find the ARTICLES array in src/App.jsx.");
  }

  return articlesMatch[1]
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

function getArticleId(source, articleConstantName) {
  const articleMatch = source.match(
    new RegExp(`const\\s+${articleConstantName}\\s*=\\s*{([\\s\\S]*?)\\n\\s*};`)
  );

  if (!articleMatch) {
    throw new Error(`Could not find article constant ${articleConstantName}.`);
  }

  const idMatch = articleMatch[1].match(/id:\s*"([^"]+)"/);
  if (!idMatch) {
    throw new Error(`Could not find id for article constant ${articleConstantName}.`);
  }

  return idMatch[1];
}

const articleIds = getArticlesList(appSource).map((articleName) =>
  getArticleId(appSource, articleName)
);
const clusterPaths = LEARN_EDITORIAL_CONFIG.clusters.map(
  (cluster) => `/learn/${cluster.slug}`
);

const lastmod = new Date().toISOString().slice(0, 10);
const publicPaths = [
  "/",
  "/about",
  "/calculator",
  "/learn",
  ...clusterPaths,
  ...articleIds.map((id) => `/learn/${id}`),
];

const urls = publicPaths.map((path) => {
  const loc = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </url>",
  ].join("\n");
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(sitemapPath, sitemap);

console.log(`Generated ${sitemapPath} with ${publicPaths.length} URLs.`);

const appRewritePaths = [
  "/about",
  "/calculator",
  "/learn",
  ...clusterPaths,
  ...articleIds.map((id) => `/learn/${id}`),
];

const vercelConfig = {
  trailingSlash: false,
  rewrites: appRewritePaths.map((path) => ({
    source: path,
    destination: "/index.html",
  })),
};

writeFileSync(vercelPath, `${JSON.stringify(vercelConfig, null, 2)}\n`);

console.log(`Generated ${vercelPath} with ${appRewritePaths.length} app rewrites.`);
