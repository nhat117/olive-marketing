/** Shared contact shape + fallbacks (no server imports — safe for Client Components). */
export type SiteContact = {
  email: string;
  phoneE164: string;
  phoneDisplay: string;
  facebookUrl: string;
};

export const SITE_CONTACT_DEFAULTS: SiteContact = {
  email: "contact@olivemarketing.me",
  phoneE164: "+61425191488",
  phoneDisplay: "+61 425 191 488",
  facebookUrl: "https://www.facebook.com/profile.php?id=61587077835514",
};

export const SITE_CONTACT = SITE_CONTACT_DEFAULTS;
