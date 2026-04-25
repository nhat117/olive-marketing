"use client";

import ScrollMorphHero from "./scroll-morph-hero";
import { HERO_GALLERY_IMAGES } from "@/lib/hero-gallery-images";

export default function Demo() {
    return (
        <div className="w-full h-[800px] border rounded-lg overflow-hidden relative">
            <ScrollMorphHero
                images={[...HERO_GALLERY_IMAGES]}
                introHeadline="10× your growth"
                introSub="Scroll to explore"
                arcHeadline="Built for beauty brands that book."
                arcSub="Websites, social, and paid — shipped as one system, measured on real appointments."
            />
        </div>
    );
}
