import { notFound } from "next/navigation";
import { FbViewContent } from "@/components/analytics/FbViewContent";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { openGraphLocale } from "@/lib/app-locale";
import { absoluteUrlLocalized, withLocalePath } from "@/lib/locale-path";
import { absoluteUrl } from "@/lib/site-url";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3FilledButton,
  m3Overline,
  m3ShapeLg,
} from "@/lib/material-landing";
import {
  getMelbourneServiceBySlug,
  getMelbourneServiceSlugs,
  MELBOURNE_SERVICES,
} from "@/lib/seo/melbourne-services";
import { OLIVE_NAP, OLIVE_SERVICE_SUBURBS } from "@/lib/seo/local-business";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/webpage-json-ld";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getMelbourneServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getMelbourneServiceBySlug(slug);
  if (!service) return { title: "Service" };

  const url = absoluteUrlLocalized(`/services/${slug}`, locale);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: service.metaTitle,
      description: service.metaDescription,
      siteName: "Olive Marketing",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function buildServiceJsonLd(service: ReturnType<typeof getMelbourneServiceBySlug>, path: string) {
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.keyword,
    serviceType: service.keyword,
    description: service.metaDescription,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: OLIVE_NAP.name,
      telephone: OLIVE_NAP.phoneE164,
      email: OLIVE_NAP.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: OLIVE_NAP.addressLocality,
        addressRegion: OLIVE_NAP.addressRegion,
        addressCountry: OLIVE_NAP.addressCountry,
        postalCode: OLIVE_NAP.postalCode,
      },
    },
    areaServed: OLIVE_SERVICE_SUBURBS.map((s) => ({
      "@type": "Place",
      name: `${s.name}, Melbourne VIC`,
    })),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const service = getMelbourneServiceBySlug(slug);
  if (!service) notFound();

  const path = withLocalePath(`/services/${slug}`, locale);
  const webPageLd = buildWebPageJsonLd({
    path,
    name: service.h1,
    description: service.metaDescription,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: withLocalePath("/", locale) },
    { name: "Services", path: withLocalePath("/services", locale) },
    { name: service.h1, path },
  ]);
  const faqLd = service.faqs.length > 0 ? buildFaqPageJsonLd(service.faqs) : null;
  const serviceLd = buildServiceJsonLd(service, path);

  const related = service.related
    .map((s) => MELBOURNE_SERVICES.find((m) => m.slug === s))
    .filter((s): s is (typeof MELBOURNE_SERVICES)[number] => Boolean(s));

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      {serviceLd ? <JsonLd data={serviceLd} /> : null}
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <FbViewContent contentName={service.h1} contentCategory="service" />

      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <article className={`${m3ContentMax} ${m3ContentPad}`}>
          <nav
            className="mb-6 font-label text-[0.65rem] font-medium uppercase tracking-[0.14em] text-on-surface-variant"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-primary transition-opacity hover:opacity-80">
              Home
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>/</span>
            <Link href="/services" className="text-primary transition-opacity hover:opacity-80">
              Services
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>/</span>
            <span className="text-on-surface-variant">{service.h1}</span>
          </nav>

          <p className={`${m3Overline} mb-3`}>Olive Marketing · Melbourne</p>
          <h1
            className={`${m3DisplayHeadline} mb-6 text-3xl text-primary md:mb-8 md:text-4xl lg:text-[2.75rem]`}
          >
            {service.h1}
          </h1>

          <p className="mb-10 font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            {service.intro}
          </p>

          <div className="space-y-10">
            {service.sections.map((section) => (
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

          {service.faqs.length > 0 ? (
            <div className={`mt-12 ${m3ShapeLg} bg-surface-container-low p-6 md:p-8`}>
              <h2 className="mb-6 font-headline text-xl font-normal text-primary md:text-2xl">
                Frequently asked questions
              </h2>
              <ul className="space-y-6">
                {service.faqs.map((f) => (
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

          {/* Areas served block — internal linking to suburb pages */}
          <section className="mt-14">
            <h2 className="mb-4 font-headline text-lg font-normal text-on-surface md:text-xl">
              {service.h1} — areas we serve
            </h2>
            <ul className="flex flex-wrap gap-2">
              {OLIVE_SERVICE_SUBURBS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/areas/${s.slug}`}
                    className="inline-block rounded-full border-2 border-outline-variant/40 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {service.keyword} — {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 ? (
            <section className="mt-14">
              <h2 className="mb-4 font-headline text-lg font-normal text-on-surface md:text-xl">
                Related services
              </h2>
              <ul className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="inline-block rounded-full border-2 border-outline-variant/40 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      {r.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-outline-variant/25 pt-10">
            <OpenLeadButton className={m3FilledButton}>
              Book a strategy call
            </OpenLeadButton>
            <Link
              href="/services"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              All services
            </Link>
            <Link
              href="/areas"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Areas we serve
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
