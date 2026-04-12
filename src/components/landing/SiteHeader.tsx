import Link from "next/link";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { MobileNav } from "@/components/landing/MobileNav";
import { m3Elev2, m3FilledButtonSm } from "@/lib/material-landing";
import { SITE_NAV_LINKS } from "@/lib/site-nav";

export function SiteHeader() {
  const [philosophy, services, contact, insights] = SITE_NAV_LINKS;

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-surface/90 ${m3Elev2} backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-3">
        <Link
          href="/"
          className="min-w-0 shrink font-headline text-base font-normal tracking-[0.12em] text-primary md:text-lg md:tracking-[0.14em]"
        >
          OLIVE MARKETING
        </Link>
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">
          <Link
            className="font-headline border-b-2 border-primary/30 pb-0.5 text-sm font-normal tracking-tight text-primary transition-opacity hover:opacity-80 md:text-base"
            href={philosophy.href}
          >
            {philosophy.label}
          </Link>
          <Link
            className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
            href={services.href}
          >
            {services.label}
          </Link>
          <Link
            className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
            href={contact.href}
          >
            {contact.label}
          </Link>
          <Link
            href={insights.href}
            className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
          >
            {insights.label}
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <MobileNav />
          <div className="hidden md:contents">
            <OpenLeadButton className={m3FilledButtonSm}>
              Let&apos;s talk
            </OpenLeadButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
