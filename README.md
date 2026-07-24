# 1040 Paydays

1040 Paydays is a React/Vite website deployed on Vercel. The public site includes the payday calculator, Learn articles, privacy/terms pages, and a mailing-list signup.

## Architecture

- Frontend: React 18 with Vite
- Hosting/deployment: Vercel
- API routes: Vercel Serverless Functions under `api/`
- Database: PostgreSQL via `DATABASE_URL`
- ORM: none; server code uses `pg` with parameterized SQL
- Authentication/admin: none in the app
- Mailing-list export: private server-side script only

The browser never connects directly to the database. The signup form posts to `POST /api/subscribe`, and only the serverless function uses `DATABASE_URL`.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development and add matching variables in Vercel for production.

Required:

- `DATABASE_URL`: PostgreSQL connection string.
- `CONFIRMATION_TOKEN_SECRET`: long random secret used to hash double opt-in tokens.
- `RATE_LIMIT_SECRET`: long random secret used to hash rate-limit identifiers.

Optional:

- `DATABASE_SSL`: defaults to SSL enabled. Set to `false` only for a trusted local database.
- `SUBSCRIBE_RATE_LIMIT_WINDOW_SECONDS`: defaults to `900`.
- `SUBSCRIBE_RATE_LIMIT_MAX`: defaults to `5`.
- `SUBSCRIBE_CONFIRMATION_TOKEN_TTL_HOURS`: defaults to `48`.

Never commit real secrets.

## Database Setup

Create a PostgreSQL database using Vercel Postgres, Neon, Supabase, or another hosted PostgreSQL provider. Then run:

```bash
DATABASE_URL="postgres://..." npm run db:migrate
```

The migration creates:

- `subscribers`
- `subscriber_rate_limits`

Subscriber emails are uniquely indexed by `normalized_email`. Confirmation tokens are stored only as hashes. Raw IP addresses are not stored; rate limiting uses a hashed request key.

## Mailing List Behavior

The signup keeps the existing email field and Join button styling. It adds:

- client-side and server-side email validation
- whitespace trimming and email normalization
- honeypot field
- server-side rate limiting
- duplicate protection
- pending subscriber status
- consent text/version storage
- hashed confirmation tokens
- inline success/error messaging
- accessible labels and ARIA announcements

Double opt-in database fields are ready now. Since no email provider is configured yet, subscribers remain `pending`; the UI does not pretend a confirmation email was sent.

## Future Email Provider Integration

When ready, connect an email provider such as Amazon SES, Postmark, Resend, SendGrid, or Mailgun inside `api/subscribe.js` after `saveSubscriber`.

Use the raw confirmation token only in memory to build the confirmation link, send it through the provider, and continue storing only `confirmation_token_hash` in the database.

The database remains the source of truth for:

- pending subscribers
- active subscribers
- unsubscribed/suppressed subscribers
- consent records

## Exporting Subscribers

There is no public admin page because the app has no authentication system. Export subscribers with the server-side script:

```bash
DATABASE_URL="postgres://..." npm run export:subscribers > subscribers.csv
```

Do not commit exported CSV files.

## Development

```bash
npm run dev
```

## Testing

```bash
npm test
npm run build
```

`npm run build` regenerates `public/sitemap.xml` and `vercel.json` before building the Vite app.

## Deployment

Push `main` to GitHub. Vercel builds the site automatically.

Before production signup collection, add the environment variables in Vercel and run the migration against the production database.

## Browser Testing Steps

1. Open the homepage.
2. Enter an invalid email and confirm an inline validation message appears.
3. Enter a valid email and click Join.
4. Confirm the button shows `Joining...` and stays disabled during submission.
5. Confirm success displays inline, not in a popup or redirect.
6. Confirm keyboard focus moves to the success message.
7. Confirm duplicate submissions show success without revealing whether the email already existed.
8. Confirm the database record is `pending`.

## Security Notes

- No secrets are exposed to the browser.
- The browser posts only to `/api/subscribe`.
- Database queries use parameterized SQL through `pg`.
- Duplicate emails are protected by a unique index.
- Unsubscribed subscribers are preserved for suppression.
- Rate limiting is enabled server-side.
- Honeypot spam protection is enabled.
- Confirmation tokens are hashed before storage.
