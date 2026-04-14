import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import {
  m3ContentPad,
  m3Elev2,
  m3FilledButton,
  m3Overline,
  m3OverlineAccent,
  m3ShapeLg,
  m3ShapeXl,
  m3TransitionExpressive,
} from "@/lib/material-landing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Process" });
  const url = absoluteUrlLocalized("/process", locale);

  const alternates: Record<string, string> = {};
  for (const loc of ["en", "vi", "zh"]) {
    alternates[loc] = absoluteUrlLocalized("/process", loc);
  }
  alternates["x-default"] = absoluteUrlLocalized("/process", "en");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      type: "website",
      url,
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
  };
}

const STEP_COLORS = [
  "border-primary/25 bg-primary-fixed/50 text-on-primary-fixed-variant",
  "border-tertiary/25 bg-tertiary-fixed/45 text-on-tertiary-fixed",
  "border-secondary-container bg-secondary-container text-on-secondary-container",
  "border-primary-container bg-primary-container text-on-primary-container",
  "border-outline-variant/30 bg-surface-container-high text-on-surface",
  "border-tertiary/20 bg-tertiary-fixed/35 text-on-tertiary-fixed",
] as const;

const STEP_KEYS = [
  "step01",
  "step02",
  "step03",
  "step04",
  "step05",
  "step06",
] as const;

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Process");

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-surface via-primary-fixed/[0.04] to-surface-container-low pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`mx-auto max-w-5xl ${m3ContentPad}`}>
          {/* Header */}
          <AnimateOnScroll animation="fade-up">
            <p className={`${m3OverlineAccent} mb-3`}>{t("overline")}</p>
            <h1 className="mb-4 font-headline text-3xl font-normal leading-tight tracking-tight text-on-surface md:text-4xl lg:text-5xl">
              {t("heading")}
            </h1>
            <p className="mb-12 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:mb-16 md:text-xl">
              {t("lead")}
            </p>
          </AnimateOnScroll>

          {/* Steps */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEP_KEYS.map((key, i) => (
              <AnimateOnScroll key={key} animation="fade-up" delay={i * 100}>
                <article
                  className={`flex h-full flex-col border-2 p-6 md:p-8 ${m3ShapeLg} ${m3Elev2} ${STEP_COLORS[i]} ${m3TransitionExpressive} hover:scale-[1.02]`}
                >
                  <span className="mb-3 font-headline text-4xl italic leading-none opacity-30 md:text-5xl">
                    {t(`${key}Number`)}
                  </span>
                  <h2 className="mb-3 font-headline text-xl font-normal tracking-tight md:text-2xl">
                    {t(`${key}Title`)}
                  </h2>
                  <p className="flex-1 font-body text-base leading-relaxed opacity-90">
                    {t(`${key}Body`)}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA */}
          <AnimateOnScroll animation="scale-up" delay={100}>
            <div
              className={`mt-14 border-2 border-primary/20 bg-gradient-to-br from-surface-container-high via-surface-container-high to-primary-fixed/30 p-8 text-center md:mt-20 md:p-10 lg:p-12 ${m3ShapeXl}`}
            >
              <p className={`${m3Overline} mb-3`}>{t("ctaTitle")}</p>
              <p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
                {t("ctaBody")}
              </p>
              <OpenLeadButton className={`${m3FilledButton} w-full md:w-auto`}>
                {t("ctaButton")}
              </OpenLeadButton>
            </div>
          </AnimateOnScroll>

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
