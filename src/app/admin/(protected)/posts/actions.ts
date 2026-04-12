"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export type PostActionState = { error?: string } | undefined;

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

export async function createPost(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const supabase = await getAdminSupabase();
  const title = (formData.get("title") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  if (!title) return { error: "Title is required" };
  if (!slug) slug = slugify(title);
  if (!slug) return { error: "Could not generate a slug from the title" };

  const excerpt =
    (formData.get("excerpt") as string)?.trim() || null;
  const body = (formData.get("body") as string) ?? "";
  const cover_image_url =
    (formData.get("cover_image_url") as string)?.trim() || null;
  const meta_title =
    (formData.get("meta_title") as string)?.trim() || null;
  const meta_description =
    (formData.get("meta_description") as string)?.trim() || null;
  const og_image_url =
    (formData.get("og_image_url") as string)?.trim() || null;
  const no_index = formData.get("no_index") === "on";
  const published = formData.get("published") === "on";
  const published_at = published ? new Date().toISOString() : null;

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    excerpt,
    body,
    cover_image_url,
    meta_title,
    meta_description,
    og_image_url,
    no_index,
    published,
    published_at,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "That slug is already in use. Choose another." };
    }
    return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  redirect("/admin/posts");
}

export async function updatePost(
  id: string,
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const supabase = await getAdminSupabase();
  const title = (formData.get("title") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  if (!title) return { error: "Title is required" };
  if (!slug) slug = slugify(title);
  if (!slug) return { error: "Could not generate a slug from the title" };

  const excerpt =
    (formData.get("excerpt") as string)?.trim() || null;
  const body = (formData.get("body") as string) ?? "";
  const cover_image_url =
    (formData.get("cover_image_url") as string)?.trim() || null;
  const meta_title =
    (formData.get("meta_title") as string)?.trim() || null;
  const meta_description =
    (formData.get("meta_description") as string)?.trim() || null;
  const og_image_url =
    (formData.get("og_image_url") as string)?.trim() || null;
  const no_index = formData.get("no_index") === "on";
  const published = formData.get("published") === "on";
  const published_at = published ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("posts")
    .update({
      title,
      slug,
      excerpt,
      body,
      cover_image_url,
      meta_title,
      meta_description,
      og_image_url,
      no_index,
      published,
      published_at,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "That slug is already in use. Choose another." };
    }
    return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) redirect("/admin/posts?error=missing");

  const supabase = await getAdminSupabase();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    redirect(`/admin/posts?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  redirect("/admin/posts");
}
