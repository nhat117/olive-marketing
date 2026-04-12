import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/landing/HeroSection";
import { InquirySection } from "@/components/landing/InquirySection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { buildOrganizationJsonLd } from "@/lib/seo/article-json-ld";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";

const homeDescription =
  "Olive Marketing plans and runs digital marketing for beauty and wellness businesses: sites, social, ads, and content—focused on inquiries, bookings, and repeat visits.";

export const metadata: Metadata = {
  description: homeDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    url: absoluteUrl("/"),
    type: "website",
    description: homeDescription,
    title: "Olive Marketing | Beauty & wellness growth",
  },
  twitter: {
    description: homeDescription,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildOrganizationJsonLd()} />
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
