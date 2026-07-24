const test = require("node:test");
const assert = require("node:assert/strict");
const {
  CONSENT_TEXT,
  getRateLimitKey,
  hashValue,
  isAllowedMethod,
  isValidEmail,
  makeConfirmationToken,
  normalizeEmail,
  normalizeSignupPage,
} = require("../api/lib/subscriber-utils");

test("normalizes valid email addresses", () => {
  assert.equal(normalizeEmail("  Reader@Example.COM "), "reader@example.com");
  assert.equal(isValidEmail("reader@example.com"), true);
});

test("rejects invalid and empty email addresses", () => {
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail("reader@"), false);
  assert.equal(isValidEmail("reader@example"), false);
});

test("rejects oversized email addresses", () => {
  const oversized = `${"a".repeat(250)}@example.com`;
  assert.equal(isValidEmail(oversized), false);
});

test("keeps signup pages relative", () => {
  assert.equal(normalizeSignupPage("/learn/the-10000-blueprint"), "/learn/the-10000-blueprint");
  assert.equal(normalizeSignupPage("https://example.com/bad"), "/");
});

test("creates hashed confirmation tokens without storing raw token values", () => {
  const token = makeConfirmationToken();
  const hashed = hashValue(token, "secret");

  assert.equal(token.length > 32, true);
  assert.notEqual(hashed, token);
  assert.equal(hashed.length, 64);
});

test("rate limit keys are stable hashes", () => {
  const req = {
    headers: {
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
      "user-agent": "node-test",
    },
  };

  const first = getRateLimitKey(req, "secret");
  const second = getRateLimitKey(req, "secret");

  assert.equal(first, second);
  assert.equal(first.length, 64);
  assert.notEqual(first.includes("203.0.113.10"), true);
});

test("only POST requests are accepted", () => {
  assert.equal(isAllowedMethod({ method: "POST" }), true);
  assert.equal(isAllowedMethod({ method: "GET" }), false);
});

test("consent text matches the required wording", () => {
  assert.equal(
    CONSENT_TEXT,
    "Join the 1040 Paydays mailing list for new articles, practical financial ideas, calculators, and occasional updates. You can unsubscribe at any time.",
  );
});
