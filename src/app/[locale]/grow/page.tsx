import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3ShapeLg,
} from "@/lib/material-landing";
import { getGrowthPagesForLocale } from "@/lib/seo/programmatic-growth-pages";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Grow" });
  const url = absoluteUrlLocalized("/grow", locale);
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
  };
}

export default async function GrowIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Grow");
  const pages = getGrowthPagesForLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            {t("title")}
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            {t("introBefore")}{" "}
            <Link
              href="/#inquiry"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("introLink")}
            </Link>{" "}
            {t("introAfter")}
          </p>

          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/grow/${p.slug}`}
                  className={`block h-full ${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-low p-5 transition-colors hover:border-primary/35 hover:bg-surface-container-lowest md:p-6`}
                >
                  <h2 className="font-headline text-lg font-normal text-primary md:text-xl">
                    {p.h1}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
                    {p.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-body text-sm text-on-surface-variant">
            <Link
              href="/blog"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("footerBlog")}
            </Link>
            {" · "}
            <Link
              href="/"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("footerHome")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
