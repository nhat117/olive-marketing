-- Add OG image URL column to growth_pages for social sharing previews
alter table public.growth_pages
  add column if not exists og_image_url text;
