import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { NapBlock } from "@/components/landing/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized, localeAlternates } from "@/lib/locale-path";
import { buildLocalBusinessJsonLd } from "@/lib/seo/local-business";
import { buildWebPageJsonLd } from "@/lib/seo/webpage-json-ld";
import {
  m3ContentPad,
  m3FilledButton,
  m3OverlineAccent,
} from "@/lib/material-landing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const url = absoluteUrlLocalized("/contact", locale);

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url, languages: localeAlternates("/contact") },
    openGraph: {
      type: "website",
      url,
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <JsonLd
        data={buildWebPageJsonLd({
          path: "/contact",
          name: t("metaTitle"),
          description: t("metaDescription"),
        })}
      />
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-surface via-primary-fixed/[0.04] to-surface-container-low pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`mx-auto max-w-3xl ${m3ContentPad}`}>
          <p className={`${m3OverlineAccent} mb-3`}>{t("overline")}</p>
          <h1 className="mb-4 font-headline text-3xl font-normal leading-tight tracking-tight text-on-surface md:text-4xl lg:text-5xl">
            {t("heading")}
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-12 md:text-xl">
            {t("lead")}
          </p>

          <NapBlock showMap mapHeight={320} />

          <div className="mt-10">
            <OpenLeadButton className={`${m3FilledButton} w-full md:w-auto`}>
              {t("cta")}
            </OpenLeadButton>
          </div>

          <p className="mt-12 font-body text-sm text-on-surface-variant">
            <Link
              href="/"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("backHome")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
