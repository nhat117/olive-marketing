/**
 * High-quality stock stills (Unsplash). License: https://unsplash.com/license
 * Large widths + quality for crisp `next/image` optimization.
 */
const q = "auto=format&fit=crop&w=2400&q=90";

export const LANDING_STOCK_IMAGES = {
  /** Hero poster fallback & reduced-motion backdrop — salon / styling */
  heroPoster: `https://images.unsplash.com/photo-1560066984-138dadb4c035?${q}`,
  /** Philosophy grid — skincare / treatment still */
  philosophyAccent: `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?${q}`,
  /** Services — booking / mobile context */
  servicesBooking: `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?${q}`,
  /** Services — full-width strip — spa / calm interior */
  servicesBanner: `https://images.unsplash.com/photo-1544161515-4ab6ce6db874?${q}`,
} as const;
