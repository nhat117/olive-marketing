-- CMS-style SEO fields (Yoast / Rank Math–style) for posts
-- Run after 001_init_blog.sql (existing projects: apply this migration only).

alter table public.posts
  add column if not exists meta_title text;

alter table public.posts
  add column if not exists meta_description text;

alter table public.posts
  add column if not exists og_image_url text;

alter table public.posts
  add column if not exists no_index boolean not null default false;

comment on column public.posts.meta_title is 'Optional <title> override for search (else post title).';
comment on column public.posts.meta_description is 'Meta description for search & social fallbacks.';
comment on column public.posts.og_image_url is 'Open Graph / Twitter image override (else cover_image_url).';
comment on column public.posts.no_index is 'When true and published, ask crawlers not to index this URL.';
