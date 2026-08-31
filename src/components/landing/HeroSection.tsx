import { getTranslations } from "next-intl/server";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { Link } from "@/i18n/navigation";
import { HERO_GALLERY_IMAGES } from "@/lib/hero-gallery-images";
import {
  m3FilledButton,
  m3OutlinedButtonSm,
} from "@/lib/material-landing";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative h-[100svh] min-h-[640px]">
      <ScrollMorphHero
        images={[...HERO_GALLERY_IMAGES]}
        brand="Olive Marketing"
        introHeadline={t("headline")}
        introSub={t("brandLine")}
        arcHeadline={t("quote")}
        arcSub={t("subMobile")}
        backLabel="Olive"
        backTitle="Say hi"
      >
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <OpenLeadButton className={`${m3FilledButton} w-full sm:w-auto`}>
            {t("ctaPrimary")}
          </OpenLeadButton>
          <Link
            href="/blog"
            className={`${m3OutlinedButtonSm} !min-h-12 px-7 md:!min-h-14 md:px-9`}
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </ScrollMorphHero>
    </section>
  );
}
