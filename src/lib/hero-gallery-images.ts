/**
 * Curated Pexels editorial stills for the scroll-morph hero gallery.
 * Theme: salons, spas, nail studios, beauty & wellness — matches Olive Marketing's client mix.
 *
 * Pexels license: free for commercial + editorial use, no attribution required.
 * Query params: auto=compress&cs=tinysrgb&w=400 — same sizing convention as the rest of the codebase.
 */
export type HeroGalleryImage = { src: string; alt: string };

const sizing = "auto=compress&cs=tinysrgb&w=400";

export const HERO_GALLERY_IMAGES: readonly HeroGalleryImage[] = [
    { src: `https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?${sizing}`, alt: "Salon stylist finishing a blowout in soft editorial light" },
    { src: `https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?${sizing}`, alt: "Stylist at work in a salon chair" },
    { src: `https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?${sizing}`, alt: "Manicurist applying polish in a nail studio" },
    { src: `https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?${sizing}`, alt: "Hands treatment close-up — wellness detail" },
    { src: `https://images.pexels.com/photos/3865554/pexels-photo-3865554.jpeg?${sizing}`, alt: "Calm spa treatment room with warm tones" },
    { src: `https://images.pexels.com/photos/5069439/pexels-photo-5069439.jpeg?${sizing}`, alt: "Skincare editorial still on muted backdrop" },
    { src: `https://images.pexels.com/photos/7256120/pexels-photo-7256120.jpeg?${sizing}`, alt: "Editorial beauty product flatlay" },
    { src: `https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?${sizing}`, alt: "Spa interior with warm marble details" },
    { src: `https://images.pexels.com/photos/3373747/pexels-photo-3373747.jpeg?${sizing}`, alt: "Minimal makeup product arrangement" },
    { src: `https://images.pexels.com/photos/5712643/pexels-photo-5712643.jpeg?${sizing}`, alt: "Phone booking on a stone counter" },
    { src: `https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?${sizing}`, alt: "Golden-hour salon window" },
    { src: `https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?${sizing}`, alt: "Wellness product detail — skincare editorial" },
    { src: `https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?${sizing}`, alt: "Serene spa still life" },
    { src: `https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?${sizing}`, alt: "Beauty ritual — soft-lit product pour" },
    { src: `https://images.pexels.com/photos/3738347/pexels-photo-3738347.jpeg?${sizing}`, alt: "Makeup artist at work with brush and palette" },
    { src: `https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?${sizing}`, alt: "Clean skincare flatlay on linen" },
    { src: `https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?${sizing}`, alt: "Stylist consultation — warm editorial mood" },
    { src: `https://images.pexels.com/photos/3997377/pexels-photo-3997377.jpeg?${sizing}`, alt: "Modern salon interior — light neutral palette" },
    { src: `https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?${sizing}`, alt: "Beauty close-up — lashes / brow detail" },
    { src: `https://images.pexels.com/photos/3997387/pexels-photo-3997387.jpeg?${sizing}`, alt: "Minimal wellness product on neutral surface" },
] as const;
