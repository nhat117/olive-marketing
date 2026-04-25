/**
 * Curated Unsplash editorial stills for the scroll-morph hero gallery.
 * Theme: salons, spas, nail studios, beauty & wellness — matches Olive Marketing's client mix.
 *
 * All photo IDs below were HEAD-verified 200 OK before landing.
 * Unsplash license: free for commercial + editorial use, no attribution required.
 */
export type HeroGalleryImage = { src: string; alt: string };

const sizing = "w=400&q=80&auto=format&fit=crop";

export const HERO_GALLERY_IMAGES: readonly HeroGalleryImage[] = [
    { src: `https://images.unsplash.com/photo-1562322140-8baeececf3df?${sizing}`, alt: "Salon stylist finishing a balayage blowout" },
    { src: `https://images.unsplash.com/photo-1560066984-138dadb4c035?${sizing}`, alt: "Hair salon interior with warm editorial light" },
    { src: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?${sizing}`, alt: "Manicurist applying polish at a nail studio" },
    { src: `https://images.unsplash.com/photo-1604654894610-df63bc536371?${sizing}`, alt: "Minimalist nail art detail on gel manicure" },
    { src: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?${sizing}`, alt: "Spa treatment with warm towels and candlelight" },
    { src: `https://images.unsplash.com/photo-1470259078422-826894b933aa?${sizing}`, alt: "Facial skincare treatment in progress" },
    { src: `https://images.unsplash.com/photo-1515377905703-c4788e51af15?${sizing}`, alt: "Beauty product arrangement on neutral surface" },
    { src: `https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?${sizing}`, alt: "Stylist tools laid out on a marble vanity" },
    { src: `https://images.unsplash.com/photo-1583001931096-959e9a1a6223?${sizing}`, alt: "Serene spa interior with soft neutral palette" },
    { src: `https://images.unsplash.com/photo-1519014816548-bf5fe059798b?${sizing}`, alt: "Makeup artist at work with brush and palette" },
    { src: `https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?${sizing}`, alt: "Close-up beauty editorial — lip detail" },
    { src: `https://images.unsplash.com/photo-1571875257727-256c39da42af?${sizing}`, alt: "Aesthetic clinic room detail with treatment chair" },
    { src: `https://images.unsplash.com/photo-1522337094846-8a818192de1f?${sizing}`, alt: "Pedicure service at a nail studio" },
    { src: `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?${sizing}`, alt: "Modern salon chair against textured wall" },
    { src: `https://images.unsplash.com/photo-1559599101-f09722fb4948?${sizing}`, alt: "Serum dropper over a ceramic dish — skincare editorial" },
    { src: `https://images.unsplash.com/photo-1503236823255-94609f598e71?${sizing}`, alt: "Client reviewing service menu on a tablet" },
    { src: `https://images.unsplash.com/photo-1616394158624-a2ba9cfe2994?${sizing}`, alt: "Hair washing basin with plush white towel" },
    { src: `https://images.unsplash.com/photo-1600948836101-f9ffda59d250?${sizing}`, alt: "Lash extension service — eye detail close-up" },
    { src: `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?${sizing}`, alt: "Nail polish bottles in a curated color grid" },
    { src: `https://images.unsplash.com/photo-1552693673-1bf958298935?${sizing}`, alt: "Candle and florals styled for a spa consultation" },
] as const;
