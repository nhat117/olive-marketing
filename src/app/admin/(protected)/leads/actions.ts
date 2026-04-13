"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/types";

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

const VALID_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
];

export async function updateLeadStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as LeadStatus;
  if (!id || !VALID_STATUSES.includes(status)) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
}

export async function updateLeadNotes(formData: FormData) {
  const id = formData.get("id") as string;
  const notes = (formData.get("notes") as string)?.trim() ?? "";
  if (!id) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").update({ notes }).eq("id", id);
  revalidatePath("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
}

export async function bulkUpdateStatus(formData: FormData) {
  const ids = (formData.get("ids") as string)?.split(",").filter(Boolean);
  const status = formData.get("status") as LeadStatus;
  if (!ids?.length || !VALID_STATUSES.includes(status)) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").update({ status }).in("id", ids);
  revalidatePath("/admin/leads");
}

export async function bulkDeleteLeads(formData: FormData) {
  const ids = (formData.get("ids") as string)?.split(",").filter(Boolean);
  if (!ids?.length) return;

  const supabase = await requireAdminSupabase();
  await supabase.from("leads").delete().in("id", ids);
  revalidatePath("/admin/leads");
}
