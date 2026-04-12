"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdminSupabase() {
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

export async function deleteLead(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
}
