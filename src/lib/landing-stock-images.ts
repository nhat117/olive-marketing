import { UNSPLASH } from "@/lib/unsplash-images";

/**
 * Editorial stills sourced from Unsplash (free license, no attribution required).
 * Keeping a stable key map so the wider codebase can reference stock imagery
 * without hard-coding URLs.
 */
export const LANDING_STOCK_IMAGES = {
  /** Hero poster fallback & reduced-motion backdrop — salon / styling */
  heroPoster: UNSPLASH.heroStyling,
  /** Philosophy grid — skincare / treatment still */
  philosophyAccent: UNSPLASH.philosophySkincare,
  /** Services — booking / mobile context */
  servicesBooking: UNSPLASH.servicesBooking,
  /** Services — full-width strip — spa / calm interior */
  servicesBanner: UNSPLASH.servicesSpa,
} as const;
