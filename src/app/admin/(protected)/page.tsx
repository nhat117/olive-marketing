import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  m3Card,
  m3DisplayHeadline,
  m3FilledButtonSm,
  m3Overline,
} from "@/lib/material-landing";
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

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className={`${m3Card} group block p-6 transition-shadow hover:shadow-lg`}>
      <p className={m3Overline}>{label}</p>
      <p className="mt-2 font-headline text-3xl font-normal text-primary">
        {value}
      </p>
    </Link>
  );
}

export default async function AdminHomePage() {
  const stats = await getStats();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Dashboard
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Publish insights and review inbound leads.
          </p>
        </div>
        <Link href="/admin/posts/new" className={m3FilledButtonSm}>
          New post
        </Link>
      </div>

      {/* Stats grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Total posts"
          value={stats.totalPosts}
          href="/admin/posts"
        />
        <StatCard
          label="Published"
          value={stats.published}
          href="/admin/posts"
        />
        <StatCard label="Drafts" value={stats.drafts} href="/admin/posts" />
        <StatCard
          label="Total leads"
          value={stats.totalLeads}
          href="/admin/leads"
        />
        <StatCard
          label="Leads (7d)"
          value={stats.recentLeads}
          href="/admin/leads"
        />
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className={`${m3Overline} mb-4`}>Quick actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/admin/posts/new"
            className={`${m3Card} flex items-center gap-4 p-5 transition-shadow hover:shadow-lg`}
          >
            <span className="material-symbols-outlined text-primary">
              edit_note
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
            className={`${m3Card} flex items-center gap-4 p-5 transition-shadow hover:shadow-lg`}
          >
            <span className="material-symbols-outlined text-primary">
              inbox
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
            className={`${m3Card} flex items-center gap-4 p-5 transition-shadow hover:shadow-lg`}
          >
            <span className="material-symbols-outlined text-primary">
              tune
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
