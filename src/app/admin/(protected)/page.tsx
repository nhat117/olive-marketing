import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Olive Admin",
  robots: { index: false, follow: false },
};

async function getStats() {
  const supabase = await createClient();

  const [postsRes, publishedRes, draftsRes, leadsRes, recentLeadsRes] =
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
    ]);

  return {
    totalPosts: postsRes.count ?? 0,
    published: publishedRes.count ?? 0,
    drafts: draftsRes.count ?? 0,
    totalLeads: leadsRes.count ?? 0,
    recentLeads: recentLeadsRes.count ?? 0,
  };
}

const statMeta = [
  { key: "totalPosts", label: "Total posts", icon: "article", color: "bg-primary-container text-on-primary-container", href: "/admin/posts" },
  { key: "published", label: "Published", icon: "check_circle", color: "bg-primary-fixed text-on-primary-fixed-variant", href: "/admin/posts" },
  { key: "drafts", label: "Drafts", icon: "edit_note", color: "bg-surface-container-high text-on-surface-variant", href: "/admin/posts" },
  { key: "totalLeads", label: "Total leads", icon: "contact_mail", color: "bg-tertiary-container text-on-tertiary-container", href: "/admin/leads" },
  { key: "recentLeads", label: "Leads (7d)", icon: "trending_up", color: "bg-secondary-container text-on-secondary-container", href: "/admin/leads" },
] as const;

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
            Publish insights and review inbound leads.
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
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
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

      {/* Quick actions */}
      <div className="mt-10">
        <p className="mb-4 font-label text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant">
          Quick actions
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/admin/posts/new"
            className="group flex items-center gap-4 rounded-2xl border border-outline-variant/15 bg-surface p-5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-[0_2px_12px_-4px_rgba(54,69,25,0.1)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container transition-transform duration-200 group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">
                edit_note
              </span>
            </span>
            <div>
              <p className="font-body text-sm font-medium text-on-surface">
                Write article
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                Create a new blog post
              </p>
            </div>
          </Link>
          <Link
            href="/admin/leads"
            className="group flex items-center gap-4 rounded-2xl border border-outline-variant/15 bg-surface p-5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-[0_2px_12px_-4px_rgba(54,69,25,0.1)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-tertiary-container text-on-tertiary-container transition-transform duration-200 group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">
                inbox
              </span>
            </span>
            <div>
              <p className="font-body text-sm font-medium text-on-surface">
                Review leads
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                Check contact form submissions
              </p>
            </div>
          </Link>
          <Link
            href="/admin/contact"
            className="group flex items-center gap-4 rounded-2xl border border-outline-variant/15 bg-surface p-5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-[0_2px_12px_-4px_rgba(54,69,25,0.1)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container transition-transform duration-200 group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">
                tune
              </span>
            </span>
            <div>
              <p className="font-body text-sm font-medium text-on-surface">
                Site settings
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                Update contact info & social
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
