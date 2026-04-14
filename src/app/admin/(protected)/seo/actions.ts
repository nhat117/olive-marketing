"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type HomepageSeoActionState = { error?: string } | undefined;

async function getAdminSupabase() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return supabase;
}

export async function updateHomepageSeo(
  _prev: HomepageSeoActionState,
  formData: FormData,
): Promise<HomepageSeoActionState> {
  const metaTitle = String(formData.get("meta_title") ?? "").trim() || null;
  const metaDescription =
    String(formData.get("meta_description") ?? "").trim() || null;
  const ogTitle = String(formData.get("og_title") ?? "").trim() || null;
  const ogDescription =
    String(formData.get("og_description") ?? "").trim() || null;
  const ogImageUrl =
    String(formData.get("og_image_url") ?? "").trim() || null;

  if (ogImageUrl && !/^https:\/\//i.test(ogImageUrl)) {
    return { error: "OG image URL must be an https link." };
  }

  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from("homepage_seo")
    .update({
      meta_title: metaTitle,
      meta_description: metaDescription,
      og_title: ogTitle,
      og_description: ogDescription,
      og_image_url: ogImageUrl,
    })
    .eq("id", 1);

  if (error) {
    return {
      error:
        error.message ||
        "Could not save. Is the homepage_seo migration applied?",
    };
  }

  revalidatePath("/", "layout");
  redirect("/admin/seo?saved=1");
}
