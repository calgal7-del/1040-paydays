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
    const { title } = pageMetadataForRoute(route);
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

    const pageHtml = indexHtml
      .replace(
        rootPlaceholder,
        `<div id="root" data-prerendered="${route}">${markup}</div>`
      )
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    const headMarkup = pageHtml.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
    const titleCount = (headMarkup.match(/<title(?:\s|>)/gi) || []).length;

    if (titleCount !== 1) {
      throw new Error(
        `Expected "${route}" to contain exactly one title tag, found ${titleCount}.`
      );
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
