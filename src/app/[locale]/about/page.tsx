import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { NapBlock } from "@/components/landing/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized, localeAlternates } from "@/lib/locale-path";
import { buildLocalBusinessJsonLd } from "@/lib/seo/local-business";
import { getSiteUrl } from "@/lib/site-url";
import {
  m3ContentPad,
  m3OverlineAccent,
} from "@/lib/material-landing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const url = absoluteUrlLocalized("/about", locale);

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url, languages: localeAlternates("/about") },
    openGraph: {
      type: "website",
      url,
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const origin = getSiteUrl();

  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${absoluteUrlLocalized("/about", locale)}#webpage`,
          url: absoluteUrlLocalized("/about", locale),
          name: t("metaTitle"),
          description: t("metaDescription"),
          isPartOf: {
            "@type": "WebSite",
            name: "Olive Marketing",
            url: origin,
          },
          mainEntity: { "@id": `${origin}/#organization` },
        }}
      />
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-surface via-primary-fixed/[0.04] to-surface-container-low pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`mx-auto max-w-3xl ${m3ContentPad}`}>
          <p className={`${m3OverlineAccent} mb-3`}>{t("overline")}</p>
          <h1 className="mb-4 font-headline text-3xl font-normal leading-tight tracking-tight text-on-surface md:text-4xl lg:text-5xl">
            {t("heading")}
          </h1>
          <p className="mb-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
            {t("lead")}
          </p>
          <p className="mb-10 max-w-2xl font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
            {t("body")}
          </p>

          <NapBlock />

          <p className="mt-12 font-body text-sm text-on-surface-variant">
            <Link
              href="/contact"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("contactLink")}
            </Link>
            <span className="mx-3 text-outline-variant">·</span>
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
