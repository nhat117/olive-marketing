import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Link } from "@/i18n/navigation";
import { m3DisplayHeadline, m3TextButton } from "@/lib/material-landing";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations("NotFound");

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-surface px-5 pt-24 pb-16 text-center">
        <h1 className={`${m3DisplayHeadline} text-3xl text-primary md:text-4xl`}>
          {t("title")}
        </h1>
        <p className="mt-4 max-w-md font-body text-on-surface-variant">
          {t("body")}
        </p>
        <Link href="/" className={`${m3TextButton} mt-8`}>
          {t("home")}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
