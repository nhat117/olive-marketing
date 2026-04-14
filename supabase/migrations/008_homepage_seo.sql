-- Homepage SEO settings (single row). Editable by admins; readable by anyone.
-- Falls back to translation file defaults when values are NULL.

create table if not exists public.homepage_seo (
  id smallint primary key default 1 check (id = 1),
  meta_title text,
  meta_description text,
  og_title text,
  og_description text,
  og_image_url text,
  updated_at timestamptz not null default now()
);

insert into public.homepage_seo (id)
values (1)
on conflict (id) do nothing;

alter table public.homepage_seo enable row level security;

create policy "Anyone can read homepage seo"
  on public.homepage_seo for select
  to anon, authenticated
  using (true);

create policy "Admins update homepage seo"
  on public.homepage_seo for update
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

create or replace function public.set_homepage_seo_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists homepage_seo_set_updated_at on public.homepage_seo;
create trigger homepage_seo_set_updated_at
  before update on public.homepage_seo
  for each row execute function public.set_homepage_seo_updated_at();
