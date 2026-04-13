-- Public marketing contact (single row). Editable by admins; readable by anyone.

create table if not exists public.site_contact (
  id smallint primary key default 1 check (id = 1),
  email text not null,
  phone_e164 text not null,
  phone_display text not null,
  facebook_url text not null,
  updated_at timestamptz not null default now()
);

insert into public.site_contact (id, email, phone_e164, phone_display, facebook_url)
values (
  1,
  'contact@olivemarketing.me',
  '+61425191488',
  '+61 425 191 488',
  'https://www.facebook.com/profile.php?id=61587077835514'
)
on conflict (id) do nothing;

alter table public.site_contact enable row level security;

create policy "Anyone can read site contact"
  on public.site_contact for select
  to anon, authenticated
  using (true);

create policy "Admins update site contact"
  on public.site_contact for update
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

create or replace function public.set_site_contact_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists site_contact_set_updated_at on public.site_contact;
create trigger site_contact_set_updated_at
  before update on public.site_contact
  for each row execute function public.set_site_contact_updated_at();
