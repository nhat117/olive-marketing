-- Programmatic SEO growth pages — editable from admin dashboard.
-- Stores service × niche landing pages under /grow/[slug].

create table if not exists public.growth_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null default 'en',
  meta_title text not null,
  meta_description text not null,
  h1 text not null,
  intro text not null,
  sections jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(slug, locale)
);

create index if not exists growth_pages_slug_locale_idx
  on public.growth_pages (slug, locale);

create index if not exists growth_pages_published_idx
  on public.growth_pages (published) where published = true;

alter table public.growth_pages enable row level security;

-- Public: anyone can read published growth pages
create policy "Public read published growth pages"
  on public.growth_pages for select
  to anon, authenticated
  using (published = true);

-- Admins read all (including unpublished)
create policy "Admins read all growth pages"
  on public.growth_pages for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admins insert
create policy "Admins insert growth pages"
  on public.growth_pages for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admins update
create policy "Admins update growth pages"
  on public.growth_pages for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admins delete
create policy "Admins delete growth pages"
  on public.growth_pages for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Auto-update updated_at
create or replace function public.set_growth_pages_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists growth_pages_set_updated_at on public.growth_pages;
create trigger growth_pages_set_updated_at
  before update on public.growth_pages
  for each row execute function public.set_growth_pages_updated_at();
