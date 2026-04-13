import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Link } from "@/i18n/navigation";
import {
  m3Card,
  m3DisplayHeadline,
  m3FilledButton,
} from "@/lib/material-landing";
import { getTranslations } from "next-intl/server";

export default async function BlogPostNotFound() {
  const t = await getTranslations("BlogNotFound");

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface px-5 pb-16 pt-[5.25rem] md:px-10 md:pt-28">
        <div className={`mx-auto max-w-xl ${m3Card} p-8 text-center md:p-10`}>
          <h1
            className={`${m3DisplayHeadline} text-2xl text-primary md:text-3xl`}
          >
            {t("title")}
          </h1>
          <p className="mt-4 font-body text-on-surface-variant">{t("body")}</p>
          <Link href="/blog" className={`${m3FilledButton} mt-8 inline-flex`}>
            {t("back")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
