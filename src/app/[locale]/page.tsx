import { JsonLd } from "@/components/seo/JsonLd";
import {
  EditorialFeature,
  EDITORIAL_ROWS,
} from "@/components/landing/EditorialFeature";
import { HeroSection } from "@/components/landing/HeroSection";
import { InquirySection } from "@/components/landing/InquirySection";
import { MarqueeBand } from "@/components/landing/MarqueeBand";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { buildOrganizationJsonLd } from "@/lib/seo/article-json-ld";
import { buildLocalBusinessJsonLd } from "@/lib/seo/local-business";
import { getHomepageSeo } from "@/lib/homepage-seo";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const seo = await getHomepageSeo();
  const url = absoluteUrlLocalized("/", locale);

  const title = seo.metaTitle || t("ogTitle");
  const description = seo.metaDescription || t("description");
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;

  const alternates: Record<string, string> = {};
  for (const loc of ["en", "vi", "zh"]) {
    alternates[loc] = absoluteUrlLocalized("/", loc);
  }
  alternates["x-default"] = absoluteUrlLocalized("/", "en");

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      url,
      type: "website",
      description: ogDescription,
      title: `${ogTitle} | Olive Marketing`,
      siteName: "Olive Marketing",
      ...(seo.ogImageUrl
        ? { images: [{ url: seo.ogImageUrl, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${ogTitle} | Olive Marketing`,
      description: ogDescription,
      ...(seo.ogImageUrl ? { images: [seo.ogImageUrl] } : {}),
    },
  };
}

const MARQUEE_WORDS = [
  "Salons",
  "Spas",
  "Beauty",
  "Nail Studios",
  "Wellness",
  "Aesthetics",
  "Med-Spas",
  "Bookings",
  "Growth",
  "Content",
] as const;

const STATS = [
  { value: 120, suffix: "+", label: "Beauty & wellness brands served" },
  { value: 4, suffix: "×", label: "Average lift in qualified bookings" },
  { value: 35, suffix: "%", label: "Reduction in no-shows, on average" },
  { value: 10, suffix: "+", label: "Years building for salons & spas" },
] as const;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildOrganizationJsonLd(absoluteUrlLocalized("/", locale))}
      />
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <ScrollProgress />
      <CursorSpotlight />
      <SiteHeader />
      <main className="bg-gradient-to-b from-surface via-primary-fixed/[0.05] to-surface-container-low">
        <HeroSection />
        <MarqueeBand items={MARQUEE_WORDS} />
        <PhilosophySection />
        <EditorialFeature
          eyebrow="The method"
          title="Work that feels |editorial|, numbers that read like a boardroom."
          lead="Three disciplines, one team. Brand voice, content, and booking systems shipped together so every client touchpoint drives revenue."
          rows={EDITORIAL_ROWS}
        />
        <StatsStrip items={STATS} eyebrow="By the numbers" />
        <SolutionsSection />
        <InquirySection />
      </main>
      <SiteFooter />
    </>
  );
}
