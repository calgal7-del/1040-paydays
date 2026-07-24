const crypto = require("node:crypto");

const CONSENT_VERSION = "2026-07-22";
const CONSENT_TEXT =
  "Join the 1040 Paydays mailing list for new articles, practical financial ideas, calculators, and occasional updates. You can unsubscribe at any time.";

const MAX_EMAIL_LENGTH = 254;
const MAX_SIGNUP_PAGE_LENGTH = 512;
const MAX_BODY_BYTES = 4096;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || normalized.length > MAX_EMAIL_LENGTH) return false;
  if (normalized.includes("..")) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized);
}

function normalizeSignupPage(signupPage) {
  const page = String(signupPage || "/").trim();
  if (!page.startsWith("/")) return "/";
  return page.slice(0, MAX_SIGNUP_PAGE_LENGTH);
}

function makeConfirmationToken() {
  return crypto.randomBytes(32).toString("base64url");
}

function hashValue(value, secret = "") {
  return crypto
    .createHash("sha256")
    .update(`${secret}:${value}`)
    .digest("hex");
}

function getRequestIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function getRateLimitKey(req, secret) {
  const userAgent = req.headers["user-agent"] || "unknown";
  return hashValue(`${getRequestIp(req)}:${userAgent}`, secret);
}

function jsonResponse(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function isAllowedMethod(req) {
  return req.method === "POST";
}

module.exports = {
  CONSENT_TEXT,
  CONSENT_VERSION,
  MAX_BODY_BYTES,
  getRateLimitKey,
  hashValue,
  isAllowedMethod,
  isValidEmail,
  jsonResponse,
  makeConfirmationToken,
  normalizeEmail,
  normalizeSignupPage,
};
