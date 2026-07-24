const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function readProjectFile(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

test("newsletter form keeps the required client-side states and accessibility hooks", () => {
  const app = readProjectFile("src/App.jsx");

  assert.match(app, /type="email"/);
  assert.match(app, /name="email"/);
  assert.match(app, /autoComplete="email"/);
  assert.match(app, /aria-invalid=/);
  assert.match(app, /aria-live="polite"/);
  assert.match(app, /role=\{newsletterStatus === "error" \? "alert" : "status"\}/);
  assert.match(app, /Joining\.\.\./);
  assert.match(app, /newsletter-success-panel/);
  assert.match(app, /newsletterMessageRef\.current\?\.focus\(\)/);
});

test("newsletter form includes consent text and a hidden honeypot field", () => {
  const app = readProjectFile("src/App.jsx");
  const css = readProjectFile("src/App.css");

  assert.match(
    app,
    /Join the 1040 Paydays mailing list for new articles, practical financial ideas, calculators, and occasional updates\. You can unsubscribe at any time\./,
  );
  assert.match(app, /name="company"/);
  assert.match(app, /newsletter-honeypot/);
  assert.match(css, /\.newsletter-honeypot/);
});

test("subscribe endpoint protects against duplicates, abuse, and unsafe database access", () => {
  const api = readProjectFile("api/subscribe.js");
  const migration = readProjectFile("migrations/001_create_subscribers.sql");

  assert.match(api, /on conflict \(normalized_email\)/i);
  assert.match(api, /subscriber_rate_limits/);
  assert.match(api, /confirmation_token_hash/);
  assert.match(api, /confirmation_token_expires/);
  assert.match(api, /DATABASE_URL/);
  assert.match(api, /client\.query\(/);
  assert.match(api, /\$\d/);
  assert.match(api, /We couldn't add you right now\. Please try again\./);
  assert.match(api, /Please wait a little before trying again\./);
  assert.match(migration, /constraint subscribers_normalized_email_unique unique \(normalized_email\)/i);
  assert.match(migration, /status in \('pending', 'active', 'unsubscribed'\)/i);
});
