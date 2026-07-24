create extension if not exists pgcrypto;

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  normalized_email text not null,
  status text not null default 'pending',
  consent_text text not null,
  consent_version text not null,
  signup_page text not null default '/',
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  updated_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  confirmation_token_hash text,
  confirmation_token_expires timestamptz,
  constraint subscribers_status_check check (status in ('pending', 'active', 'unsubscribed')),
  constraint subscribers_normalized_email_unique unique (normalized_email)
);

create index if not exists subscribers_status_created_at_idx
  on subscribers (status, created_at desc);

create index if not exists subscribers_confirmation_token_hash_idx
  on subscribers (confirmation_token_hash)
  where confirmation_token_hash is not null;

create table if not exists subscriber_rate_limits (
  rate_limit_key text primary key,
  request_count integer not null default 1,
  window_started_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists subscriber_rate_limits_expires_at_idx
  on subscriber_rate_limits (expires_at);
