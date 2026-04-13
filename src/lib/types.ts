export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  message: string;
  source: string;
  status: LeadStatus;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  notes: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  /** Optional page title override for search (falls back to `title`). */
  meta_title: string | null;
  /** Meta description for search & social snippets. */
  meta_description: string | null;
  /** Open Graph / Twitter image override (falls back to `cover_image_url`). */
  og_image_url: string | null;
  /** When true, published posts send noindex and are omitted from sitemap/RSS. */
  no_index: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
