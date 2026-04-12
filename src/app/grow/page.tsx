import Link from "next/link";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
  m3ShapeLg,
} from "@/lib/material-landing";
import {
  PROGRAMMATIC_GROWTH_PAGES,
} from "@/lib/seo/programmatic-growth-pages";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

const desc =
  "Programmatic growth guides for salons, spas, nail studios, med-spas, and beauty brands—each page targets how clients search and book.";

export const metadata: Metadata = {
  title: "Growth guides",
  description: desc,
  alternates: { canonical: absoluteUrl("/grow") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/grow"),
    title: "Growth guides | Olive Marketing",
    description: desc,
  },
};

export default function GrowIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className={`${m3Overline} mb-3`}>Programmatic SEO</p>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            Growth guides by niche
          </h1>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-12">
            Landing pages tuned for how beauty and wellness businesses get
            found—each with unique copy, FAQs, and structured data. Start
            with your segment or{" "}
            <Link
              href="/#inquiry"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              talk to us
            </Link>{" "}
            about a custom program.
          </p>

          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {PROGRAMMATIC_GROWTH_PAGES.map((p) => (
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
              Insights (blog)
            </Link>
            {" · "}
            <Link
              href="/"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              Home
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
