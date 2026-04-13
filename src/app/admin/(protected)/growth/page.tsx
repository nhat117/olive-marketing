import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  m3Card,
  m3DisplayHeadline,
  m3FilledButtonSm,
} from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth pages — Olive Admin",
  robots: { index: false, follow: false },
};

type GrowthRow = {
  id: string;
  slug: string;
  locale: string;
  h1: string;
  meta_title: string;
  published: boolean;
  updated_at: string;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function AdminGrowthPagesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("growth_pages")
    .select("id, slug, locale, h1, meta_title, published, updated_at")
    .order("slug", { ascending: true })
    .order("locale", { ascending: true });

  const pages = (data ?? []) as GrowthRow[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Growth pages
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            {pages.length} programmatic SEO page{pages.length !== 1 ? "s" : ""} &middot;
            Service x niche landing pages under /grow/
          </p>
        </div>
        <Link href="/admin/growth/new" className={m3FilledButtonSm}>
          New page
        </Link>
      </div>

      {error && (
        <p className="mt-8 font-body text-error">{error.message}</p>
      )}

      {pages.length === 0 && !error && (
        <div className={`${m3Card} mt-10 p-10 text-center`}>
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">
            travel_explore
          </span>
          <p className="mt-3 font-body text-on-surface-variant">
            No growth pages yet. Create your first programmatic SEO page.
          </p>
          <Link href="/admin/growth/new" className={`${m3FilledButtonSm} mt-4`}>
            New page
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/growth/${page.id}/edit`}
            className={`${m3Card} group flex items-start justify-between gap-4 p-5 transition-shadow hover:shadow-lg`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-headline text-lg font-normal text-primary group-hover:underline">
                {page.h1}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 font-body text-xs text-on-surface-variant">
                <span>/grow/{page.slug}</span>
                <span>&middot;</span>
                <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-label text-[0.6rem] font-medium uppercase">
                  {page.locale}
                </span>
                <span>&middot;</span>
                <span>Updated {formatDate(page.updated_at)}</span>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 font-label text-[0.6rem] font-medium uppercase tracking-wider ${
                page.published
                  ? "bg-primary-container/30 text-primary"
                  : "bg-surface-container-highest text-on-surface-variant"
              }`}
            >
              {page.published ? "Live" : "Draft"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
