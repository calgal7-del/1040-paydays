const test = require("node:test");
const assert = require("node:assert/strict");

test("articles stay private until their configured publication date", async () => {
  const { isArticlePublished } = await import("../src/learnConfig.mjs");
  const articleSlug = "should-you-save-or-pay-off-debt-first";

  assert.equal(
    isArticlePublished(articleSlug, new Date(2026, 6, 24, 23, 59, 59)),
    false,
  );
  assert.equal(
    isArticlePublished(articleSlug, new Date(2026, 6, 25, 0, 0, 0)),
    true,
  );
});

test("articles without a verified publication date stay private", async () => {
  const { isArticlePublished } = await import("../src/learnConfig.mjs");

  assert.equal(isArticlePublished("unconfigured-future-article"), false);
});
