import Link from "next/link";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import {
  m3Card,
  m3DisplayHeadline,
  m3FilledButton,
} from "@/lib/material-landing";

export default function BlogPostNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface px-5 pb-16 pt-[5.25rem] md:px-10 md:pt-28">
        <div className={`mx-auto max-w-xl ${m3Card} p-8 text-center md:p-10`}>
          <h1
            className={`${m3DisplayHeadline} text-2xl text-primary md:text-3xl`}
          >
            Article not found
          </h1>
          <p className="mt-4 font-body text-on-surface-variant">
            This URL may have changed or the article is not published yet.
          </p>
          <Link href="/blog" className={`${m3FilledButton} mt-8 inline-flex`}>
            Back to insights
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
