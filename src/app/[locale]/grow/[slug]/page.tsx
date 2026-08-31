import { notFound } from "next/navigation";
import { FbViewContent } from "@/components/analytics/FbViewContent";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { openGraphLocale } from "@/lib/app-locale";
import { absoluteUrlLocalized, withLocalePath } from "@/lib/locale-path";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
  m3ShapeLg,
} from "@/lib/material-landing";
import {
  getGrowthPage,
  getGrowthPageSlugs,
  getGrowthPagesForLocale,
} from "@/lib/seo/programmatic-growth-pages";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/webpage-json-ld";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getGrowthPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = await getGrowthPage(slug, locale);
  if (!page) return { title: "Guide" };

  const url = absoluteUrlLocalized(`/grow/${slug}`, locale);
  const image = page.ogImageUrl?.trim() || undefined;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${page.metaTitle} | Olive Marketing`,
      description: page.metaDescription,
      images: image ? [{ url: image, alt: page.h1 }] : [],
      siteName: "Olive Marketing",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Olive Marketing`,
      description: page.metaDescription,
      images: image ? [image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GrowSlugPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Grow");

  const page = await getGrowthPage(slug, locale);
  if (!page) notFound();

  const path = withLocalePath(`/grow/${slug}`, locale);
  const webPageLd = buildWebPageJsonLd({
    path,
    name: page.h1,
    description: page.metaDescription,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: t("breadcrumbHome"), path: withLocalePath("/", locale) },
    { name: t("breadcrumbGuides"), path: withLocalePath("/grow", locale) },
    { name: page.h1, path },
  ]);
  const faqLd =
    page.faqs.length > 0 ? buildFaqPageJsonLd(page.faqs) : null;

  const allPages = await getGrowthPagesForLocale(locale);
  const related = allPages.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <FbViewContent contentName={page.h1} contentCategory="growth-guide" />

      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <article className={`${m3ContentMax} ${m3ContentPad}`}>
          <nav
            className="mb-6 font-label text-[0.65rem] font-medium uppercase tracking-[0.14em] text-on-surface-variant"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="text-primary transition-opacity hover:opacity-80"
            >
              {t("breadcrumbHome")}
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>
              /
            </span>
            <Link
              href="/grow"
              className="text-primary transition-opacity hover:opacity-80"
            >
              {t("breadcrumbGuides")}
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>
              /
            </span>
            <span className="text-on-surface-variant">{page.h1}</span>
          </nav>

          <p className={`${m3Overline} mb-3`}>{t("overlineBrand")}</p>
          <h1
            className={`${m3DisplayHeadline} mb-6 text-3xl text-primary md:mb-8 md:text-4xl lg:text-[2.75rem]`}
          >
            {page.h1}
          </h1>

          <p className="mb-10 font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            {page.intro}
          </p>

          <div className="space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={`${section.heading}-${i}`}
                    className="font-body text-base leading-relaxed text-on-surface-variant"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {page.faqs.length > 0 ? (
            <div className={`mt-12 ${m3ShapeLg} bg-surface-container-low p-6 md:p-8`}>
              <h2 className="mb-6 font-headline text-xl font-normal text-primary md:text-2xl">
                {t("faqTitle")}
              </h2>
              <ul className="space-y-6">
                {page.faqs.map((f) => (
                  <li key={f.question}>
                    <p className="font-headline text-base font-normal text-on-surface">
                      {f.question}
                    </p>
                    <p className="mt-2 font-body text-base leading-relaxed text-on-surface-variant">
                      {f.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-14">
              <h2 className="mb-4 font-headline text-lg font-normal text-on-surface md:text-xl">
                {t("relatedSlugTitle")}
              </h2>
              <ul className="flex flex-wrap gap-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/grow/${p.slug}`}
                      className="inline-block rounded-full border-2 border-outline-variant/40 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-14 flex flex-wrap gap-4 border-t border-outline-variant/25 pt-10">
            <Link
              href="/contact"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("ctaStrategyCall")}
            </Link>
            <Link
              href="/grow"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("ctaAllGuidesList")}
            </Link>
            <Link
              href="/blog"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {t("ctaBlog")}
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
