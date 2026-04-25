/**
 * Editorial beauty / wellness imagery curated from Unsplash (free license,
 * no attribution required): https://unsplash.com/license
 * All photo IDs below were HEAD-verified 200 OK before landing.
 * Sized for `next/image` optimization (2560w base, automatic srcset).
 */
const q = "w=2560&q=80&auto=format&fit=crop";

export const UNSPLASH = {
  /** Hero — soft-lit salon styling portrait */
  heroStyling: `https://images.unsplash.com/photo-1562322140-8baeececf3df?${q}`,
  /** Hero alt — spa interior, warm marble */
  heroSpa: `https://images.unsplash.com/photo-1583001931096-959e9a1a6223?${q}`,

  /** Philosophy editorial — skincare detail */
  philosophySkincare: `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?${q}`,
  /** Philosophy alt — hands treatment close-up */
  philosophyTreatment: `https://images.unsplash.com/photo-1470259078422-826894b933aa?${q}`,

  /** Services — phone booking on a stone counter */
  servicesBooking: `https://images.unsplash.com/photo-1503236823255-94609f598e71?${q}`,
  /** Services — editorial product flatlay */
  servicesProducts: `https://images.unsplash.com/photo-1515377905703-c4788e51af15?${q}`,
  /** Services — calm spa interior */
  servicesSpa: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?${q}`,
  /** Services — nails / manicure close-up */
  servicesNails: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?${q}`,

  /** Feature grid — stylist at work */
  featureStylist: `https://images.unsplash.com/photo-1560066984-138dadb4c035?${q}`,
  /** Feature grid — makeup products minimal */
  featureMakeup: `https://images.unsplash.com/photo-1519014816548-bf5fe059798b?${q}`,

  /** Inquiry — golden-hour salon window */
  inquirySalon: `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?${q}`,
} as const;

export type UnsplashKey = keyof typeof UNSPLASH;
