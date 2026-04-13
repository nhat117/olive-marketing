import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Link } from "@/i18n/navigation";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
} from "@/lib/material-landing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  const url = absoluteUrlLocalized("/terms", locale);
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${t("title")} | Olive Marketing`,
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

const linkClass =
  "font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary";

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <article className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className={`${m3Overline} mb-3`}>{t("overline")}</p>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            {t("heading")}
          </h1>
          <p className="mb-8 font-body text-sm text-on-surface-variant">
            {t("lastUpdated")}
          </p>

          <div className="mb-10 rounded-2xl border-2 border-outline-variant/40 bg-surface-container-low p-5 md:p-6">
            <p className="font-body text-sm leading-relaxed text-on-surface">
              <strong className="text-on-surface">{t("importantLead")}</strong>{" "}
              {t("importantBody")}
            </p>
          </div>

          <div className="space-y-10 font-body text-base leading-relaxed text-on-surface">
            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s1Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s1Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s2Title")}
              </h2>
              <p className="text-on-surface-variant">
                {t("s2Before")}
                <Link href="/#inquiry" className={linkClass}>
                  {t("s2Link")}
                </Link>
                {t("s2After")}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s3Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s3Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s4Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s4Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s5Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s5Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s6Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s6Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s7Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s7Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s8Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s8Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s9Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s9Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s10Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s10Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s11Title")}
              </h2>
              <p className="text-on-surface-variant">
                <strong className="text-on-surface">{t("s11Draft")}</strong>{" "}
                {t("s11Mid")}{" "}
                <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-sm text-on-surface">
                  {t("s11State")}
                </span>
                {t("s11AfterState")}{" "}
                <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-sm text-on-surface">
                  {t("s11Venue")}
                </span>
                {t("s11End")}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s12Title")}
              </h2>
              <p className="text-on-surface-variant">{t("s12Body")}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                {t("s13Title")}
              </h2>
              <p className="text-on-surface-variant">
                {t("s13Before")}
                <Link href="/#inquiry" className={linkClass}>
                  {t("s13Link")}
                </Link>
                {t("s13After")}
              </p>
            </section>
          </div>

          <p className="mt-14 font-body text-sm text-on-surface-variant">
            <Link href="/" className={linkClass}>
              {t("backHome")}
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
