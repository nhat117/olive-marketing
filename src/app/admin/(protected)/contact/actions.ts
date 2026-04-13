"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SiteContactActionState = { error?: string } | undefined;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function updateSiteContact(
  _prev: SiteContactActionState,
  formData: FormData,
): Promise<SiteContactActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const phoneE164 = String(formData.get("phone_e164") ?? "").trim();
  const phoneDisplay = String(formData.get("phone_display") ?? "").trim();
  const facebookUrl = String(formData.get("facebook_url") ?? "").trim();

  if (!email || !emailRe.test(email)) {
    return { error: "Enter a valid email address." };
  }
  const e164 = phoneE164.replace(/\s/g, "");
  if (!/^\+[1-9]\d{6,14}$/.test(e164)) {
    return {
      error:
        "Phone (E.164) should start with + and country code, digits only after + (e.g. +61425191488).",
    };
  }
  if (!phoneDisplay) {
    return { error: "Enter a display phone number for the website." };
  }
  if (!facebookUrl || !/^https:\/\//i.test(facebookUrl)) {
    return { error: "Facebook URL must be an https link." };
  }

  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from("site_contact")
    .update({
      email,
      phone_e164: e164,
      phone_display: phoneDisplay,
      facebook_url: facebookUrl,
    })
    .eq("id", 1);

  if (error) {
    return { error: error.message || "Could not save. Is the migration applied?" };
  }

  revalidatePath("/", "layout");
  redirect("/admin/contact?saved=1");
}
