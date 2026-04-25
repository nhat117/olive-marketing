/**
 * Editorial beauty / wellness imagery curated from Pexels (free license,
 * no attribution required): https://www.pexels.com/license/
 * Sized for `next/image` optimization (2560w base, automatic srcset).
 */
const q = "auto=compress&cs=tinysrgb&w=2560";

export const PEXELS = {
  /** Hero — soft-lit salon styling portrait */
  heroStyling: `https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?${q}`,
  /** Hero alt — spa interior, warm marble */
  heroSpa: `https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?${q}`,

  /** Philosophy editorial — skincare detail, olive green backdrop */
  philosophySkincare: `https://images.pexels.com/photos/5069439/pexels-photo-5069439.jpeg?${q}`,
  /** Philosophy alt — hands treatment close-up */
  philosophyTreatment: `https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?${q}`,

  /** Services — phone booking on a stone counter */
  servicesBooking: `https://images.pexels.com/photos/5712643/pexels-photo-5712643.jpeg?${q}`,
  /** Services — editorial product flatlay */
  servicesProducts: `https://images.pexels.com/photos/7256120/pexels-photo-7256120.jpeg?${q}`,
  /** Services — calm spa interior */
  servicesSpa: `https://images.pexels.com/photos/3865554/pexels-photo-3865554.jpeg?${q}`,
  /** Services — nails / manicure close-up */
  servicesNails: `https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?${q}`,

  /** Feature grid — stylist at work */
  featureStylist: `https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?${q}`,
  /** Feature grid — makeup products minimal */
  featureMakeup: `https://images.pexels.com/photos/3373747/pexels-photo-3373747.jpeg?${q}`,

  /** Inquiry — golden-hour salon window */
  inquirySalon: `https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?${q}`,
} as const;

export type PexelsKey = keyof typeof PEXELS;
