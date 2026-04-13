import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { m3Section } from "@/lib/material-landing";
import { getSiteContact } from "@/lib/site-contact";

const linkClass =
  "font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:text-primary";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const contact = await getSiteContact();
  const facebookUrl =
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || contact.facebookUrl;
  const facebookExternal = facebookUrl !== "#";

  return (
    <footer className="border-t border-outline-variant/25 bg-surface-container-low">
      <div
        className={`mx-auto flex max-w-[1920px] flex-col items-center gap-6 ${m3Section} md:gap-8`}
      >
        <div className="font-headline text-lg font-normal tracking-[0.12em] text-primary md:text-xl">
          {tNav("brand")}
        </div>
        <div className="flex flex-col items-center gap-2 text-center font-body text-sm text-on-surface-variant md:text-base">
          <a
            className={`${linkClass} normal-case tracking-normal`}
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <a
            className={`${linkClass} normal-case tracking-normal`}
            href={`tel:${contact.phoneE164}`}
          >
            {contact.phoneDisplay}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:gap-x-10">
          <Link href="/blog" className={linkClass}>
            {t("insights")}
          </Link>
          <Link href="/grow" className={linkClass}>
            {t("growthGuides")}
          </Link>
          <a className={linkClass} href="#">
            {t("privacy")}
          </a>
          <Link href="/terms" className={linkClass}>
            {t("terms")}
          </Link>
          <a
            className={linkClass}
            href={facebookUrl}
            {...(facebookExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {t("facebook")}
          </a>
        </div>
        <div className="h-px w-full max-w-[1920px] bg-outline-variant/25" />
        <p className="text-center font-label text-[0.65rem] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <p className="text-center font-label text-[0.6rem] text-on-surface-variant/60">
          Powered by{" "}
          <a
            href="https://thinkflow.me"
            target="_blank"
            rel="noopener"
            className="text-on-surface-variant/80 underline decoration-outline-variant/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/40"
          >
            Thinkflow
          </a>
        </p>
      </div>
    </footer>
  );
}
