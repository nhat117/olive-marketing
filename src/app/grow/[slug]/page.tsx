import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
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
} from "@/lib/seo/programmatic-growth-pages";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/webpage-json-ld";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export const dynamicParams = false;
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGrowthPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGrowthPage(slug);
  if (!page) return { title: "Guide" };

  const url = absoluteUrl(`/grow/${slug}`);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${page.metaTitle} | Olive Marketing`,
      description: page.metaDescription,
      siteName: "Olive Marketing",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Olive Marketing`,
      description: page.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GrowSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getGrowthPage(slug);
  if (!page) notFound();

  const path = `/grow/${slug}`;
  const webPageLd = buildWebPageJsonLd({
    path,
    name: page.h1,
    description: page.metaDescription,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Growth guides", path: "/grow" },
    { name: page.h1, path },
  ]);
  const faqLd =
    page.faqs.length > 0 ? buildFaqPageJsonLd(page.faqs) : null;

  const related = getGrowthPageSlugs()
    .filter((s) => s !== slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

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
              Home
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>
              /
            </span>
            <Link
              href="/grow"
              className="text-primary transition-opacity hover:opacity-80"
            >
              Growth guides
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>
              /
            </span>
            <span className="text-on-surface-variant">{page.h1}</span>
          </nav>

          <p className={`${m3Overline} mb-3`}>Olive Marketing</p>
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
                Common questions
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
                Related guides
              </h2>
              <ul className="flex flex-wrap gap-3">
                {related.map((s) => {
                  const p = getGrowthPage(s);
                  if (!p) return null;
                  return (
                    <li key={s}>
                      <Link
                        href={`/grow/${s}`}
                        className="inline-block rounded-full border-2 border-outline-variant/40 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        {p.h1}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          <div className="mt-14 flex flex-wrap gap-4 border-t border-outline-variant/25 pt-10">
            <Link
              href="/#inquiry"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Request a strategy call
            </Link>
            <Link
              href="/grow"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              All growth guides
            </Link>
            <Link
              href="/blog"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Insights
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
