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
  getMelbourneAreaBySlug,
  getMelbourneAreaSlugs,
  MELBOURNE_AREAS,
} from "@/lib/seo/melbourne-areas";
import {
  getSuburbBySlug,
  OLIVE_NAP,
} from "@/lib/seo/local-business";
import { MELBOURNE_SERVICES } from "@/lib/seo/melbourne-services";
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
  return getMelbourneAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const area = getMelbourneAreaBySlug(slug);
  if (!area) return { title: "Area" };

  const url = absoluteUrlLocalized(`/areas/${slug}`, locale);
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: area.metaTitle,
      description: area.metaDescription,
      siteName: "Olive Marketing",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function buildAreaServedJsonLd(slug: string, h1: string, description: string, path: string) {
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${OLIVE_NAP.name} — ${h1}`,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: OLIVE_NAP.name,
      telephone: OLIVE_NAP.phoneE164,
      email: OLIVE_NAP.email,
    },
    areaServed: {
      "@type": "Place",
      name: `${suburb.name}, Melbourne VIC ${suburb.postcode}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: suburb.name,
        addressRegion: "VIC",
        postalCode: suburb.postcode,
        addressCountry: "AU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: suburb.lat,
        longitude: suburb.lng,
      },
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const area = getMelbourneAreaBySlug(slug);
  if (!area) notFound();

  const path = withLocalePath(`/areas/${slug}`, locale);
  const webPageLd = buildWebPageJsonLd({
    path,
    name: area.h1,
    description: area.metaDescription,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: withLocalePath("/", locale) },
    { name: "Areas We Serve", path: withLocalePath("/areas", locale) },
    { name: area.h1, path },
  ]);
  const faqLd = area.faqs.length > 0 ? buildFaqPageJsonLd(area.faqs) : null;
  const areaServedLd = buildAreaServedJsonLd(area.slug, area.h1, area.metaDescription, path);

  const otherAreas = MELBOURNE_AREAS.filter((a) => a.slug !== slug);
  const suburb = getSuburbBySlug(slug);
  const mapEmbed = suburb
    ? `https://www.google.com/maps?q=${encodeURIComponent(`${suburb.name} VIC ${suburb.postcode} Australia`)}&z=14&output=embed`
    : null;

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      {areaServedLd ? <JsonLd data={areaServedLd} /> : null}
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <FbViewContent contentName={area.h1} contentCategory="area-page" />

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
            <Link href="/areas" className="text-primary transition-opacity hover:opacity-80">
              Areas We Serve
            </Link>
            <span className="mx-2 text-outline-variant" aria-hidden>/</span>
            <span className="text-on-surface-variant">{area.name}</span>
          </nav>

          <p className={`${m3Overline} mb-3`}>
            Olive Marketing · {area.name} · {area.postcode}
          </p>
          <h1
            className={`${m3DisplayHeadline} mb-6 text-3xl text-primary md:mb-8 md:text-4xl lg:text-[2.75rem]`}
          >
            {area.h1}
          </h1>

          <p className="mb-8 font-body text-lg leading-relaxed text-on-surface-variant md:mb-10">
            {area.intro}
          </p>

          {mapEmbed ? (
            <div className="mb-12 overflow-hidden rounded-2xl border border-outline-variant/40">
              <iframe
                title={`${area.name} VIC ${area.postcode} — service area map`}
                src={mapEmbed}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          ) : null}

          <section className="space-y-4">
            <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
              Why marketing in {area.name} is different
            </h2>
            <p className="font-body text-base leading-relaxed text-on-surface-variant">
              {area.angle}
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
              Local landmarks &amp; transport in {area.name}
            </h2>
            <p className="font-body text-base leading-relaxed text-on-surface-variant">
              <strong className="font-medium text-on-surface">Landmarks: </strong>
              {area.landmarks.join(" · ")}
            </p>
            <p className="font-body text-base leading-relaxed text-on-surface-variant">
              <strong className="font-medium text-on-surface">Getting around: </strong>
              {area.transport}
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
              The pain points {area.name} businesses ask us about
            </h2>
            <ul className="ml-5 list-disc space-y-2 font-body text-base leading-relaxed text-on-surface-variant">
              {area.painPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
              Industries we work with in {area.name}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {area.industries.map((industry) => (
                <li
                  key={industry}
                  className="inline-block rounded-full border-2 border-outline-variant/40 bg-surface-container-low px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-on-surface-variant"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </section>

          {/* Service-link cluster — every service × this suburb */}
          <section className="mt-12">
            <h2 className="mb-4 font-headline text-xl font-normal text-on-surface md:text-2xl">
              Marketing services we deliver in {area.name}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {MELBOURNE_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-body text-sm text-primary transition-colors hover:border-primary/35 hover:bg-surface-container-lowest"
                  >
                    {service.keyword} — {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {area.faqs.length > 0 ? (
            <div className={`mt-12 ${m3ShapeLg} bg-surface-container-low p-6 md:p-8`}>
              <h2 className="mb-6 font-headline text-xl font-normal text-primary md:text-2xl">
                {area.name} — frequently asked questions
              </h2>
              <ul className="space-y-6">
                {area.faqs.map((f) => (
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

          {/* Other areas — internal linking cluster */}
          <section className="mt-14">
            <h2 className="mb-4 font-headline text-lg font-normal text-on-surface md:text-xl">
              Other Melbourne suburbs we serve
            </h2>
            <ul className="flex flex-wrap gap-3">
              {otherAreas.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/areas/${other.slug}`}
                    className="inline-block rounded-full border-2 border-outline-variant/40 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {other.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-outline-variant/25 pt-10">
            <OpenLeadButton className={m3FilledButton}>
              Talk to a {area.name} marketing strategist
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
              Other suburbs
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
