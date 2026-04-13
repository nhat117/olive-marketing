import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import { createClient } from "@/lib/supabase/server";
import { getGrowthPageSlugs } from "@/lib/seo/programmatic-growth-pages";

export const revalidate = 3600;

function hrefLangForPath(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrlLocalized(pathname, locale);
  }
  languages["x-default"] = absoluteUrlLocalized(
    pathname,
    routing.defaultLocale,
  );
  return languages;
}

function entry(
  pathname: string,
  opts: {
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  },
): MetadataRoute.Sitemap[0] {
  return {
    url: absoluteUrlLocalized(pathname, routing.defaultLocale),
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages: hrefLangForPath(pathname) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("published", true)
    .eq("no_index", false);

  const entries: MetadataRoute.Sitemap = [
    entry("/", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }),
    entry("/blog", {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    entry("/terms", {
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    entry("/grow", {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  ];

  for (const slug of await getGrowthPageSlugs()) {
    entries.push(
      entry(`/grow/${slug}`, {
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      }),
    );
  }

  for (const row of data ?? []) {
    const slug = row.slug as string;
    const updated =
      (row.updated_at as string) || (row.published_at as string) || new Date();
    entries.push(
      entry(`/blog/${slug}`, {
        lastModified: new Date(updated),
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    );
  }

  return entries;
}
