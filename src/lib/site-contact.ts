import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  SITE_CONTACT_DEFAULTS,
  type SiteContact,
} from "@/lib/site-contact-defaults";

export type { SiteContact } from "@/lib/site-contact-defaults";
export { SITE_CONTACT_DEFAULTS, SITE_CONTACT } from "@/lib/site-contact-defaults";

function mergeContact(row: {
  email: string | null;
  phone_e164: string | null;
  phone_display: string | null;
  facebook_url: string | null;
}): SiteContact {
  return {
    email: row.email?.trim() || SITE_CONTACT_DEFAULTS.email,
    phoneE164: row.phone_e164?.trim() || SITE_CONTACT_DEFAULTS.phoneE164,
    phoneDisplay: row.phone_display?.trim() || SITE_CONTACT_DEFAULTS.phoneDisplay,
    facebookUrl: row.facebook_url?.trim() || SITE_CONTACT_DEFAULTS.facebookUrl,
  };
}

/** Loads public contact info from Supabase (deduped per request via React cache). */
export const getSiteContact = cache(async (): Promise<SiteContact> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_contact")
      .select("email, phone_e164, phone_display, facebook_url")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return SITE_CONTACT_DEFAULTS;
    return mergeContact(data);
  } catch {
    return SITE_CONTACT_DEFAULTS;
  }
});
