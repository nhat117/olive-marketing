"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export type GrowthActionState = { error?: string } | undefined;

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

function parseSections(formData: FormData) {
  const sections: { heading: string; paragraphs: string[] }[] = [];
  let i = 0;
  while (formData.has(`section_heading_${i}`)) {
    const heading = (formData.get(`section_heading_${i}`) as string)?.trim();
    const body = (formData.get(`section_body_${i}`) as string)?.trim();
    if (heading && body) {
      sections.push({
        heading,
        paragraphs: body
          .split(/\n\n+/)
          .map((p) => p.trim())
          .filter(Boolean),
      });
    }
    i++;
  }
  return sections;
}

function parseFaqs(formData: FormData) {
  const faqs: { question: string; answer: string }[] = [];
  let i = 0;
  while (formData.has(`faq_question_${i}`)) {
    const question = (formData.get(`faq_question_${i}`) as string)?.trim();
    const answer = (formData.get(`faq_answer_${i}`) as string)?.trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
    i++;
  }
  return faqs;
}

export async function createGrowthPage(
  _prev: GrowthActionState,
  formData: FormData,
): Promise<GrowthActionState> {
  const supabase = await getAdminSupabase();

  const h1 = (formData.get("h1") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  if (!h1) return { error: "H1 heading is required" };
  if (!slug) slug = slugify(h1);
  if (!slug) return { error: "Could not generate a slug" };

  const meta_title = (formData.get("meta_title") as string)?.trim();
  const meta_description = (formData.get("meta_description") as string)?.trim();
  const og_image_url = (formData.get("og_image_url") as string)?.trim() || null;
  const intro = (formData.get("intro") as string)?.trim();
  const locale = (formData.get("locale") as string)?.trim() || "en";
  const published = formData.get("published") === "on";

  if (!meta_title) return { error: "Meta title is required" };
  if (!meta_description) return { error: "Meta description is required" };
  if (!intro) return { error: "Intro is required" };

  const sections = parseSections(formData);
  const faqs = parseFaqs(formData);

  const { error } = await supabase.from("growth_pages").insert({
    slug,
    locale,
    meta_title,
    meta_description,
    og_image_url,
    h1,
    intro,
    sections,
    faqs,
    published,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "That slug + locale combination already exists." };
    }
    return { error: error.message };
  }

  revalidatePath("/grow");
  revalidatePath("/admin/growth");
  revalidatePath("/sitemap.xml");
  redirect("/admin/growth");
}

export async function updateGrowthPage(
  id: string,
  _prev: GrowthActionState,
  formData: FormData,
): Promise<GrowthActionState> {
  const supabase = await getAdminSupabase();

  const h1 = (formData.get("h1") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  if (!h1) return { error: "H1 heading is required" };
  if (!slug) slug = slugify(h1);
  if (!slug) return { error: "Could not generate a slug" };

  const meta_title = (formData.get("meta_title") as string)?.trim();
  const meta_description = (formData.get("meta_description") as string)?.trim();
  const og_image_url = (formData.get("og_image_url") as string)?.trim() || null;
  const intro = (formData.get("intro") as string)?.trim();
  const locale = (formData.get("locale") as string)?.trim() || "en";
  const published = formData.get("published") === "on";

  if (!meta_title) return { error: "Meta title is required" };
  if (!meta_description) return { error: "Meta description is required" };
  if (!intro) return { error: "Intro is required" };

  const sections = parseSections(formData);
  const faqs = parseFaqs(formData);

  const { error } = await supabase
    .from("growth_pages")
    .update({
      slug,
      locale,
      meta_title,
      meta_description,
      og_image_url,
      h1,
      intro,
      sections,
      faqs,
      published,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "That slug + locale combination already exists." };
    }
    return { error: error.message };
  }

  revalidatePath("/grow");
  revalidatePath(`/grow/${slug}`);
  revalidatePath("/admin/growth");
  revalidatePath("/sitemap.xml");
  redirect("/admin/growth");
}

export async function deleteGrowthPage(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) redirect("/admin/growth?error=missing");

  const supabase = await getAdminSupabase();
  const { error } = await supabase.from("growth_pages").delete().eq("id", id);

  if (error) {
    redirect(`/admin/growth?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/grow");
  revalidatePath("/admin/growth");
  revalidatePath("/sitemap.xml");
  redirect("/admin/growth");
}
