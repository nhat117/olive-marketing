import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { getGrowthPageSlugs } from "@/lib/seo/programmatic-growth-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("published", true)
    .eq("no_index", false);

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/grow`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  for (const slug of getGrowthPageSlugs()) {
    entries.push({
      url: absoluteUrl(`/grow/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const row of data ?? []) {
    const slug = row.slug as string;
    const updated =
      (row.updated_at as string) || (row.published_at as string) || new Date();
    entries.push({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: new Date(updated),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
