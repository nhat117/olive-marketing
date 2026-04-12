import { LANDING_STOCK_IMAGES } from "@/lib/landing-stock-images";

/** Default hero poster when NEXT_PUBLIC_HERO_POSTER_URL is unset */
export const HERO_DEFAULT_POSTER_URL = LANDING_STOCK_IMAGES.heroPoster;

/**
 * Placeholder loop when NEXT_PUBLIC_HERO_VIDEO_URL is unset (CC0 sample from MDN).
 * Override with your own MP4 (e.g. beauty B-roll from Pexels/Pixabay hosted on your CDN).
 */
export const HERO_DEFAULT_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
