import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const distIndexPath = resolve("dist/index.html");
const distHomePath = resolve("dist/home.html");
const rootPlaceholder = '<div id="root"></div>';

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
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const homepage = renderToString(
    React.createElement(React.StrictMode, null, React.createElement(App))
  );
  const h1Count = (homepage.match(/<h1(?:\s|>)/g) || []).length;

  if (h1Count !== 1) {
    throw new Error(
      `Expected the pre-rendered homepage to contain exactly one H1, found ${h1Count}.`
    );
  }

  const indexHtml = readFileSync(distIndexPath, "utf8");
  if (!indexHtml.includes(rootPlaceholder)) {
    throw new Error("Could not find the empty root element in dist/index.html.");
  }

  const homeHtml = indexHtml.replace(
    rootPlaceholder,
    `<div id="root" data-prerendered="home">${homepage}</div>`
  );
  writeFileSync(distHomePath, homeHtml);
  console.log(`Generated ${distHomePath} with one server-rendered H1.`);
} finally {
  await vite.close();
  delete globalThis.window;
}
