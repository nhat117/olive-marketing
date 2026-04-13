import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/landing/HeroSection";
import { InquirySection } from "@/components/landing/InquirySection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { buildOrganizationJsonLd } from "@/lib/seo/article-json-ld";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const url = absoluteUrlLocalized("/", locale);
  return {
    description: t("description"),
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "website",
      description: t("description"),
      title: t("ogTitle"),
    },
    twitter: {
      description: t("description"),
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildOrganizationJsonLd(absoluteUrlLocalized("/", locale))}
      />
      <SiteHeader />
      <main className="bg-gradient-to-b from-surface via-primary-fixed/[0.05] to-surface-container-low">
        <HeroSection />
        <PhilosophySection />
        <SolutionsSection />
        <InquirySection />
      </main>
      <SiteFooter />
    </>
  );
}
