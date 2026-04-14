import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type HomepageSeo = {
  metaTitle: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
};

const EMPTY: HomepageSeo = {
  metaTitle: null,
  metaDescription: null,
  ogTitle: null,
  ogDescription: null,
  ogImageUrl: null,
};

/** Loads homepage SEO overrides from Supabase (deduped per request via React cache). */
export const getHomepageSeo = cache(async (): Promise<HomepageSeo> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_seo")
      .select("meta_title, meta_description, og_title, og_description, og_image_url")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return EMPTY;

    return {
      metaTitle: data.meta_title?.trim() || null,
      metaDescription: data.meta_description?.trim() || null,
      ogTitle: data.og_title?.trim() || null,
      ogDescription: data.og_description?.trim() || null,
      ogImageUrl: data.og_image_url?.trim() || null,
    };
  } catch {
    return EMPTY;
  }
});
