-- Lead capture from public contact form → admin reads in dashboard
-- Run after 001_init_blog.sql (and 002_post_seo.sql / 003_site_contact.sql if present).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  message text not null,
  source text not null default 'lead_modal',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Public site: anyone may insert a lead (server uses anon or user session)
create policy "Public can submit leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Only admins can read leads
create policy "Admins select leads"
  on public.leads for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admins may delete spam leads (optional)
create policy "Admins delete leads"
  on public.leads for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

comment on table public.leads is 'Inbound leads from marketing site contact form.';
