import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import type { Lead, LeadStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard — Olive Admin",
  robots: { index: false, follow: false },
};

async function getStats() {
  const supabase = await createClient();

  const [postsRes, publishedRes, draftsRes, leadsRes, recentLeadsRes, growthRes, allLeadsRes] =
    await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("published", true),
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("published", false),
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ),
      supabase
        .from("growth_pages")
        .select("id", { count: "exact", head: true })
        .eq("published", true),
      supabase
        .from("leads")
        .select("id, status, source, utm_source, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

  const leads = (allLeadsRes.data ?? []) as Pick<Lead, "id" | "status" | "source" | "utm_source" | "created_at">[];

  // Pipeline breakdown
  const pipeline: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  };
  const sources: Record<string, number> = {};
  for (const l of leads) {
    const s = l.status as LeadStatus;
    if (s in pipeline) pipeline[s]++;
    const src = l.utm_source ?? l.source ?? "direct";
    sources[src] = (sources[src] ?? 0) + 1;
  }

  const topSources = Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const conversionRate =
    leads.length > 0
      ? Math.round((pipeline.converted / leads.length) * 100)
      : 0;

  return {
    totalPosts: postsRes.count ?? 0,
    published: publishedRes.count ?? 0,
    drafts: draftsRes.count ?? 0,
    totalLeads: leadsRes.count ?? 0,
    recentLeads: recentLeadsRes.count ?? 0,
    growthPages: growthRes.count ?? 0,
    pipeline,
    conversionRate,
    topSources,
  };
}

const statMeta = [
  { key: "totalPosts", label: "Total posts", icon: "article", color: "bg-primary-container text-on-primary-container", href: "/admin/posts" },
  { key: "published", label: "Published", icon: "check_circle", color: "bg-primary-fixed text-on-primary-fixed-variant", href: "/admin/posts" },
  { key: "drafts", label: "Drafts", icon: "edit_note", color: "bg-surface-container-high text-on-surface-variant", href: "/admin/posts" },
  { key: "totalLeads", label: "Total leads", icon: "contact_mail", color: "bg-tertiary-container text-on-tertiary-container", href: "/admin/leads" },
  { key: "recentLeads", label: "Leads (7d)", icon: "trending_up", color: "bg-secondary-container text-on-secondary-container", href: "/admin/leads" },
  { key: "growthPages", label: "Growth pages", icon: "travel_explore", color: "bg-primary-container text-on-primary-container", href: "/admin/growth" },
] as const;

const pipelineMeta: { key: LeadStatus; label: string; icon: string; color: string }[] = [
  { key: "new", label: "New", icon: "fiber_new", color: "bg-primary/15 text-primary" },
  { key: "contacted", label: "Contacted", icon: "call", color: "bg-tertiary/15 text-tertiary" },
  { key: "qualified", label: "Qualified", icon: "verified", color: "bg-secondary/15 text-secondary" },
  { key: "converted", label: "Converted", icon: "check_circle", color: "bg-primary-fixed text-on-primary-fixed-variant" },
  { key: "lost", label: "Lost", icon: "cancel", color: "bg-error/15 text-error" },
];

export default async function AdminHomePage() {
  const stats = await getStats();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-label text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tertiary">
            Overview
          </p>
          <h1 className="mt-1 font-headline text-3xl font-normal tracking-tight text-on-surface">
            Dashboard
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Content, leads pipeline, and growth at a glance.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-5 font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-on-primary shadow-[0_2px_8px_-2px_rgba(54,69,25,0.25)] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-md active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New post
        </Link>
      </div>

      {/* Stats grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 md:gap-4">
        {statMeta.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className="group rounded-3xl border border-outline-variant/15 bg-surface p-5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary/20 hover:shadow-[0_4px_16px_-4px_rgba(54,69,25,0.12)]"
          >
            <div className={`mb-3 flex size-10 items-center justify-center rounded-xl ${s.color} transition-transform duration-200 group-hover:scale-105`}>
              <span className="material-symbols-outlined text-[18px]">
                {s.icon}
              </span>
            </div>
            <p className="font-label text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
              {s.label}
            </p>
            <p className="mt-1 font-headline text-2xl font-normal text-on-surface md:text-3xl">
              {stats[s.key]}
            </p>
          </Link>
        ))}
      </div>

      {/* Lead Pipeline Funnel */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <p className="font-label text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant">
            Lead pipeline
          </p>
          <Link
            href="/admin/leads"
            className="font-label text-[0.65rem] font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* Funnel bar */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface">
          {stats.totalLeads > 0 && (
            <div className="flex h-3">
              {pipelineMeta.map((p) => {
                const pct = (stats.pipeline[p.key] / stats.totalLeads) * 100;
                if (pct === 0) return null;
                const colors: Record<string, string> = {
                  new: "bg-primary",
                  contacted: "bg-tertiary",
                  qualified: "bg-secondary",
                  converted: "bg-primary-fixed-dim",
                  lost: "bg-error/60",
                };
                return (
                  <div
                    key={p.key}
                    className={`${colors[p.key]} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                    title={`${p.label}: ${stats.pipeline[p.key]} (${Math.round(pct)}%)`}
                  />
                );
              })}
            </div>
          )}
          <div className="grid grid-cols-5 divide-x divide-outline-variant/10">
            {pipelineMeta.map((p) => (
              <div key={p.key} className="px-3 py-3 text-center">
                <p className="font-headline text-lg font-normal text-on-surface md:text-xl">
                  {stats.pipeline[p.key]}
                </p>
                <p className="mt-0.5 font-label text-[0.55rem] font-semibold uppercase tracking-wider text-on-surface-variant">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion rate */}
        <div className="mt-3 flex items-center gap-4">
          <div className="rounded-xl border border-outline-variant/15 bg-surface px-4 py-2.5">
            <span className="font-label text-[0.55rem] font-semibold uppercase tracking-wider text-on-surface-variant">
              Conversion rate
            </span>
            <span className="ml-2 font-headline text-lg font-normal text-primary">
              {stats.conversionRate}%
            </span>
          </div>
          {stats.topSources.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="font-label text-[0.55rem] font-semibold uppercase tracking-wider text-on-surface-variant">
                Top sources:
              </span>
              {stats.topSources.map(([src, count]) => (
                <span
                  key={src}
                  className="rounded-md bg-surface-container-high px-2 py-0.5 font-mono text-[0.6rem] text-on-surface-variant"
                >
                  {src} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <p className="mb-4 font-label text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant">
          Quick actions
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/admin/posts/new", icon: "edit_note", iconBg: "bg-primary-container text-on-primary-container", title: "Write article", desc: "Create a new blog post" },
            { href: "/admin/growth/new", icon: "rocket_launch", iconBg: "bg-secondary-container text-on-secondary-container", title: "New growth page", desc: "Add a programmatic SEO page" },
            { href: "/admin/leads", icon: "inbox", iconBg: "bg-tertiary-container text-on-tertiary-container", title: "Review leads", desc: "Manage your lead pipeline" },
            { href: "/admin/contact", icon: "tune", iconBg: "bg-surface-container-high text-on-surface-variant", title: "Site settings", desc: "Update contact info & social" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex items-center gap-4 rounded-2xl border border-outline-variant/15 bg-surface p-5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-[0_2px_12px_-4px_rgba(54,69,25,0.1)]"
            >
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${a.iconBg} transition-transform duration-200 group-hover:scale-105`}>
                <span className="material-symbols-outlined text-[20px]">
                  {a.icon}
                </span>
              </span>
              <div>
                <p className="font-body text-sm font-medium text-on-surface">
                  {a.title}
                </p>
                <p className="font-body text-xs text-on-surface-variant">
                  {a.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
