import { PEXELS } from "@/lib/pexels-images";

/**
 * Editorial stills sourced from Pexels (free license, no attribution required).
 * Keeping a stable key map so the wider codebase can reference stock imagery
 * without hard-coding URLs.
 */
export const LANDING_STOCK_IMAGES = {
  /** Hero poster fallback & reduced-motion backdrop — salon / styling */
  heroPoster: PEXELS.heroStyling,
  /** Philosophy grid — skincare / treatment still */
  philosophyAccent: PEXELS.philosophySkincare,
  /** Services — booking / mobile context */
  servicesBooking: PEXELS.servicesBooking,
  /** Services — full-width strip — spa / calm interior */
  servicesBanner: PEXELS.servicesSpa,
} as const;
