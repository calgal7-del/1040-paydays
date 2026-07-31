import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const distIndexPath = resolve("dist/index.html");
const distAppPath = resolve("dist/app.html");
const vercelPath = resolve("vercel.json");
const rootPlaceholder = '<div id="root"></div>';
const siteUrl = "https://www.1040paydays.com";
const renderedTitles = new Map();

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const escapeHtmlAttribute = (value) =>
  escapeHtml(value).replace(/"/g, "&quot;");

globalThis.window = {
  location: {
    pathname: "/",
    href: "https://www.1040paydays.com/",
  },
  localStorage: {
    getItem: () => null,
  },
};

const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const { default: App, pageMetadataForRoute } =
    await vite.ssrLoadModule("/src/App.jsx");
  const indexHtml = readFileSync(distIndexPath, "utf8");
  if (!indexHtml.includes(rootPlaceholder)) {
    throw new Error("Could not find the empty root element in dist/index.html.");
  }

  const renderRoute = (route) => {
    const {
      title,
      description,
      canonicalUrl,
      pageType,
      imageUrl,
      publishedDate,
    } = pageMetadataForRoute(route);
    const duplicateRoute = renderedTitles.get(title);
    if (duplicateRoute) {
      throw new Error(
        `Routes "${duplicateRoute}" and "${route}" share the title "${title}".`
      );
    }
    renderedTitles.set(title, route);

    globalThis.window.location.pathname = route;
    globalThis.window.location.href = `${siteUrl}${route}`;

    const markup = renderToString(
      React.createElement(React.StrictMode, null, React.createElement(App))
    );
    const h1Count = (markup.match(/<h1(?:\s|>)/g) || []).length;

    if (h1Count !== 1) {
      throw new Error(
        `Expected "${route}" to contain exactly one H1, found ${h1Count}.`
      );
    }

    const structuredDataScripts = [
      ...markup.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
      ),
    ];
    if (structuredDataScripts.length !== 1) {
      throw new Error(
        `Expected "${route}" to contain exactly one JSON-LD script, found ${structuredDataScripts.length}.`
      );
    }
    JSON.parse(structuredDataScripts[0][1]);

    const articleHeadMarkup =
      pageType === "article"
        ? [
            `<link rel="canonical" href="${escapeHtmlAttribute(canonicalUrl)}" />`,
            `<meta property="og:type" content="article" />`,
            `<meta property="og:title" content="${escapeHtmlAttribute(title)}" />`,
            `<meta property="og:description" content="${escapeHtmlAttribute(description)}" />`,
            `<meta property="og:url" content="${escapeHtmlAttribute(canonicalUrl)}" />`,
            `<meta property="og:image" content="${escapeHtmlAttribute(imageUrl)}" />`,
            `<meta property="og:site_name" content="1040 Paydays" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta name="twitter:title" content="${escapeHtmlAttribute(title)}" />`,
            `<meta name="twitter:description" content="${escapeHtmlAttribute(description)}" />`,
            `<meta name="twitter:image" content="${escapeHtmlAttribute(imageUrl)}" />`,
            ...(publishedDate
              ? [
                  `<meta property="article:published_time" content="${escapeHtmlAttribute(publishedDate)}" />`,
                ]
              : []),
          ].join("\n    ")
        : "";
    const pageHtml = indexHtml
      .replace(
        rootPlaceholder,
        `<div id="root" data-prerendered="${route}">${markup}</div>`
      )
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta\s+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${escapeHtmlAttribute(description)}" />`
      )
      .replace(
        "</head>",
        `${articleHeadMarkup ? `    ${articleHeadMarkup}\n  ` : ""}</head>`
      );
    const headMarkup = pageHtml.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
    const titleCount = (headMarkup.match(/<title(?:\s|>)/gi) || []).length;

    if (titleCount !== 1) {
      throw new Error(
        `Expected "${route}" to contain exactly one title tag, found ${titleCount}.`
      );
    }
    if (pageType === "article") {
      const requiredHeadTags = [
        ["description", /<meta\s+name="description"/gi],
        ["canonical", /<link\s+rel="canonical"/gi],
        ["og:title", /<meta\s+property="og:title"/gi],
        ["og:description", /<meta\s+property="og:description"/gi],
        ["og:type", /<meta\s+property="og:type"/gi],
        ["og:url", /<meta\s+property="og:url"/gi],
        ["og:image", /<meta\s+property="og:image"/gi],
        ["og:site_name", /<meta\s+property="og:site_name"/gi],
        ["twitter:card", /<meta\s+name="twitter:card"/gi],
        ["twitter:title", /<meta\s+name="twitter:title"/gi],
        ["twitter:description", /<meta\s+name="twitter:description"/gi],
        ["twitter:image", /<meta\s+name="twitter:image"/gi],
      ];

      for (const [name, pattern] of requiredHeadTags) {
        const tagCount = (headMarkup.match(pattern) || []).length;
        if (tagCount !== 1) {
          throw new Error(
            `Expected "${route}" to contain exactly one ${name} tag, found ${tagCount}.`
          );
        }
      }
      if (
        !canonicalUrl.startsWith(`${siteUrl}/learn/`) ||
        !imageUrl.startsWith(`${siteUrl}/`) ||
        /localhost|127\.0\.0\.1/i.test(headMarkup)
      ) {
        throw new Error(`Invalid production metadata URL on "${route}".`);
      }
    }

    return pageHtml;
  };

  writeFileSync(distAppPath, indexHtml);
  writeFileSync(distIndexPath, renderRoute("/"));

  const vercelConfig = JSON.parse(readFileSync(vercelPath, "utf8"));
  const prerenderedRewrites = vercelConfig.rewrites.filter(
    ({ destination }) => destination !== "/app.html"
  );

  for (const { source, destination } of prerenderedRewrites) {
    writeFileSync(resolve("dist", destination.slice(1)), renderRoute(source));
  }

  console.log(
    `Generated ${prerenderedRewrites.length + 1} pages with one server-rendered H1 each.`
  );
  console.log(`Generated ${distAppPath} for client-rendered application routes.`);
} finally {
  await vite.close();
  delete globalThis.window;
}
