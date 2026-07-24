const { Pool } = require("pg");
const {
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
} = require("./lib/subscriber-utils");

const RATE_LIMIT_WINDOW_SECONDS = Number(process.env.SUBSCRIBE_RATE_LIMIT_WINDOW_SECONDS || 900);
const RATE_LIMIT_MAX = Number(process.env.SUBSCRIBE_RATE_LIMIT_MAX || 5);
const TOKEN_TTL_HOURS = Number(process.env.SUBSCRIBE_CONFIRMATION_TOKEN_TTL_HOURS || 48);

let pool;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return pool;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    const error = new Error("Request body is too large");
    error.statusCode = 413;
    throw error;
  }

  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      const error = new Error("Request body is too large");
      error.statusCode = 413;
      throw error;
    }
  }

  return JSON.parse(raw || "{}");
}

async function applyRateLimit(client, req) {
  const secret = process.env.RATE_LIMIT_SECRET || process.env.APP_SECRET || "1040-paydays-local";
  const rateLimitKey = getRateLimitKey(req, secret);

  await client.query("delete from subscriber_rate_limits where expires_at < now()");

  const result = await client.query(
    `
      insert into subscriber_rate_limits (rate_limit_key, request_count, window_started_at, expires_at)
      values ($1, 1, now(), now() + ($2::int * interval '1 second'))
      on conflict (rate_limit_key) do update set
        request_count = case
          when subscriber_rate_limits.expires_at < now() then 1
          else subscriber_rate_limits.request_count + 1
        end,
        window_started_at = case
          when subscriber_rate_limits.expires_at < now() then now()
          else subscriber_rate_limits.window_started_at
        end,
        expires_at = case
          when subscriber_rate_limits.expires_at < now() then now() + ($2::int * interval '1 second')
          else subscriber_rate_limits.expires_at
        end
      returning request_count
    `,
    [rateLimitKey, RATE_LIMIT_WINDOW_SECONDS],
  );

  return Number(result.rows[0]?.request_count || 0) <= RATE_LIMIT_MAX;
}

async function saveSubscriber(client, { email, signupPage }) {
  const normalizedEmail = normalizeEmail(email);
  const token = makeConfirmationToken();
  const secret = process.env.CONFIRMATION_TOKEN_SECRET || process.env.APP_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("CONFIRMATION_TOKEN_SECRET is required in production");
  }

  const tokenHash = hashValue(token, secret || "1040-paydays-local");

  await client.query(
    `
      insert into subscribers (
        email,
        normalized_email,
        status,
        consent_text,
        consent_version,
        signup_page,
        confirmation_token_hash,
        confirmation_token_expires
      )
      values ($1, $2, 'pending', $3, $4, $5, $6, now() + ($7::int * interval '1 hour'))
      on conflict (normalized_email) do update set
        email = case
          when subscribers.status = 'unsubscribed' then subscribers.email
          else excluded.email
        end,
        status = case
          when subscribers.status = 'active' then 'active'
          when subscribers.status = 'unsubscribed' then 'unsubscribed'
          else 'pending'
        end,
        consent_text = case
          when subscribers.status = 'unsubscribed' then subscribers.consent_text
          else excluded.consent_text
        end,
        consent_version = case
          when subscribers.status = 'unsubscribed' then subscribers.consent_version
          else excluded.consent_version
        end,
        signup_page = case
          when subscribers.status = 'unsubscribed' then subscribers.signup_page
          else excluded.signup_page
        end,
        confirmation_token_hash = case
          when subscribers.status = 'pending' then excluded.confirmation_token_hash
          else subscribers.confirmation_token_hash
        end,
        confirmation_token_expires = case
          when subscribers.status = 'pending' then excluded.confirmation_token_expires
          else subscribers.confirmation_token_expires
        end,
        updated_at = now()
    `,
    [
      email.trim(),
      normalizedEmail,
      CONSENT_TEXT,
      CONSENT_VERSION,
      signupPage,
      tokenHash,
      TOKEN_TTL_HOURS,
    ],
  );

  return { emailDeliveryConfigured: false };
}

module.exports = async function subscribe(req, res) {
  if (!isAllowedMethod(req)) {
    res.setHeader("Allow", "POST");
    return jsonResponse(res, 405, { ok: false, message: "Please use the signup form." });
  }

  if (Number(req.headers["content-length"] || 0) > MAX_BODY_BYTES) {
    return jsonResponse(res, 413, { ok: false, message: "We couldn't add you right now. Please try again." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return jsonResponse(res, 400, { ok: false, message: "We couldn't add you right now. Please try again." });
  }

  const email = normalizeEmail(body.email);
  const signupPage = normalizeSignupPage(body.signupPage);
  const honeypot = String(body.company || "").trim();

  if (honeypot) {
    return jsonResponse(res, 200, { ok: true, emailDeliveryConfigured: false });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(res, 400, { ok: false, message: "Please enter a valid email address." });
  }

  let client;
  try {
    client = await getPool().connect();
    const allowed = await applyRateLimit(client, req);
    if (!allowed) {
      return jsonResponse(res, 429, { ok: false, message: "Please wait a little before trying again." });
    }

    const result = await saveSubscriber(client, { email, signupPage });
    return jsonResponse(res, 200, { ok: true, ...result });
  } catch (error) {
    console.error("Subscribe failed", error);
    return jsonResponse(res, 500, { ok: false, message: "We couldn't add you right now. Please try again." });
  } finally {
    client?.release();
  }
};
