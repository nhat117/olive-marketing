import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized, withLocalePath } from "@/lib/locale-path";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3ShapeLg,
} from "@/lib/material-landing";
import { MELBOURNE_AREAS } from "@/lib/seo/melbourne-areas";
import { buildBreadcrumbJsonLd } from "@/lib/seo/webpage-json-ld";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = absoluteUrlLocalized("/areas", locale);
  const title =
    "Areas We Serve in Melbourne | Olive Marketing — Web Design, SEO & Marketing Agency Near You";
  const description =
    "Olive Marketing serves businesses across Melbourne — Preston, Richmond, North Richmond, Bundoora, Northcote, Reservoir, Brunswick, Pascoe Vale, Heidelberg, South Yarra, Carlton and Melbourne CBD. Pick your suburb to see local pages.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: "website", siteName: "Olive Marketing" },
  };
}

export default async function AreasIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: withLocalePath("/", locale) },
    { name: "Areas We Serve", path: withLocalePath("/areas", locale) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className="mb-3 font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tertiary">
            Service Areas — Greater Melbourne
          </p>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            Areas We Serve Across Melbourne
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            We&apos;re a Melbourne-based service-area marketing agency. Pick your
            suburb to see how we work locally — landmarks, transport, customer
            behaviour, and the businesses we typically partner with there.
          </p>

          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {MELBOURNE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className={`block h-full ${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-low p-5 transition-colors hover:border-primary/35 hover:bg-surface-container-lowest md:p-6`}
                >
                  <h2 className="font-headline text-lg font-normal text-primary md:text-xl">
                    {area.h1}
                  </h2>
                  <p className="mt-1 font-label text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/80">
                    {area.name} · {area.postcode}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
                    {area.intro}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-body text-sm text-on-surface-variant">
            <Link
              href="/services"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              See all services →
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
