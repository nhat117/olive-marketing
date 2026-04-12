import Link from "next/link";
import { m3Section } from "@/lib/material-landing";

const linkClass =
  "font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:text-primary";

export function SiteFooter() {
  const linkedInUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "#";
  const facebookUrl =
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "#";
  const linkedInExternal = linkedInUrl !== "#";
  const facebookExternal = facebookUrl !== "#";

  return (
    <footer className="border-t border-outline-variant/25 bg-surface-container-low">
      <div
        className={`mx-auto flex max-w-[1920px] flex-col items-center gap-6 ${m3Section} md:gap-8`}
      >
        <div className="font-headline text-lg font-normal tracking-[0.2em] text-primary md:text-xl">
          OLIVE
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:gap-x-10">
          <Link href="/blog" className={linkClass}>
            Insights
          </Link>
          <Link href="/grow" className={linkClass}>
            Growth guides
          </Link>
          <a className={linkClass} href="#">
            Privacy
          </a>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
          <a
            className={linkClass}
            href={linkedInUrl}
            {...(linkedInExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            LinkedIn
          </a>
          <a
            className={linkClass}
            href={facebookUrl}
            {...(facebookExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Facebook
          </a>
        </div>
        <div className="h-px w-full max-w-[1920px] bg-outline-variant/25" />
        <p className="text-center font-label text-[0.65rem] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
          © {new Date().getFullYear()} Olive Marketing — digital marketing for
          beauty &amp; wellness brands.
        </p>
      </div>
    </footer>
  );
}
