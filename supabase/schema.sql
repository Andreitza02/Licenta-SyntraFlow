create extension if not exists pgcrypto with schema extensions;

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null,
  email text not null,
  phone text not null,
  company text not null,
  interest text not null,
  message text not null,
  locale text not null default 'ro' check (locale in ('ro', 'en')),
  source text not null default 'website-contact-form',
  status text not null default 'new' check (status in ('new', 'contacted', 'archived')),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

create index if not exists contact_requests_email_idx
  on public.contact_requests (email);

alter table public.contact_requests enable row level security;

comment on table public.contact_requests is
  'Lead and contact requests captured from the SyntraFlow website contact form.';
