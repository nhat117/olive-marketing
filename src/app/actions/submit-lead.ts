"use server";

import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

export type SubmitLeadState =
  | { status: "idle" }
  | { status: "success"; calUrl?: string }
  | { status: "error"; message: string };

export async function submitLead(
  _prev: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const t = await getTranslations("LeadFormErrors");
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot.length > 0) {
    return { status: "success", calUrl: getCalUrl() };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const businessName =
    String(formData.get("business_name") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "lead_modal").trim() || "lead_modal";

  if (!name || name.length > 200) {
    return { status: "error", message: t("name") };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: t("email") };
  }
  if (!message || message.length < 10) {
    return {
      status: "error",
      message: t("messageShort"),
    };
  }
  if (message.length > 5000) {
    return { status: "error", message: t("messageLong") };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    business_name: businessName,
    message,
    source,
  });

  if (error) {
    return { status: "error", message: t("db") };
  }

  return { status: "success", calUrl: getCalUrl() };
}

function getCalUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_CAL_BOOKING_URL?.trim();
  return u && u.length > 0 ? u : undefined;
}
