import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3ShapeLg,
} from "@/lib/material-landing";
import { MELBOURNE_SERVICES } from "@/lib/seo/melbourne-services";
import { buildBreadcrumbJsonLd } from "@/lib/seo/webpage-json-ld";
import { withLocalePath } from "@/lib/locale-path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = absoluteUrlLocalized("/services", locale);
  const title =
    "Best Marketing Services Melbourne | Olive Marketing — Web Design, SEO, Branding, Google Ads, Lead Generation Near Me";
  const description =
    "Full list of Melbourne marketing services from Olive Marketing — luxury website design, SEO, local SEO, branding, lead generation, Google Ads, social media, and AI automation for Melbourne businesses.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: "website", siteName: "Olive Marketing" },
  };
}

export default async function ServicesIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: withLocalePath("/", locale) },
    { name: "Services", path: withLocalePath("/services", locale) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className="mb-3 font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tertiary">
            Olive Marketing — Melbourne
          </p>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            Marketing Services in Melbourne
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            Every service below is run from our Melbourne studio for Melbourne
            businesses. Pick the page that matches what you need — or{" "}
            <Link
              href="/contact"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              tell us about your project
            </Link>{" "}
            and we&apos;ll recommend the right combination.
          </p>

          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {MELBOURNE_SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`block h-full ${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-low p-5 transition-colors hover:border-primary/35 hover:bg-surface-container-lowest md:p-6`}
                >
                  <h2 className="font-headline text-lg font-normal text-primary md:text-xl">
                    {service.h1}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
                    {service.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-body text-sm text-on-surface-variant">
            <Link
              href="/areas"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              See areas we serve →
            </Link>
            {" · "}
            <Link
              href="/grow"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Industry growth guides
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
