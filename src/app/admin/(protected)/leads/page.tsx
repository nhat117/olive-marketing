import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { m3DisplayHeadline, m3CodeChip } from "@/lib/material-landing";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data ?? []) as Lead[];

  // Pipeline stats
  const pipeline = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    converted: leads.filter((l) => l.status === "converted").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };
  const conversionRate =
    leads.length > 0
      ? Math.round((pipeline.converted / leads.length) * 100)
      : 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Leads
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Pipeline CRM — track, qualify, and convert inbound leads.
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 font-label text-[0.65rem] font-medium text-on-surface-variant hover:text-primary"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          Dashboard
        </Link>
      </div>

      {/* Pipeline funnel */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {[
          { label: "Total", value: leads.length, icon: "group", color: "bg-surface-container-high text-on-surface" },
          { label: "New", value: pipeline.new, icon: "fiber_new", color: "bg-primary-container text-on-primary-container" },
          { label: "Contacted", value: pipeline.contacted, icon: "call", color: "bg-tertiary-container text-on-tertiary-container" },
          { label: "Qualified", value: pipeline.qualified, icon: "verified", color: "bg-secondary-container text-on-secondary-container" },
          { label: "Converted", value: pipeline.converted, icon: "check_circle", color: "bg-primary-fixed text-on-primary-fixed-variant" },
          { label: "Rate", value: `${conversionRate}%`, icon: "trending_up", color: "bg-surface-container-highest text-on-surface" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-outline-variant/15 bg-surface p-4"
          >
            <div
              className={`mb-2 flex size-8 items-center justify-center rounded-lg ${s.color}`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {s.icon}
              </span>
            </div>
            <p className="font-label text-[0.55rem] font-semibold uppercase tracking-wider text-on-surface-variant">
              {s.label}
            </p>
            <p className="mt-0.5 font-headline text-xl font-normal text-on-surface">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-8 font-body text-error">
          {error.message}
          {error.message.includes("leads") && (
            <span className="mt-2 block text-sm text-on-surface-variant">
              Run migration <code className={m3CodeChip}>007_lead_pipeline.sql</code>{" "}
              to add pipeline columns.
            </span>
          )}
        </p>
      )}

      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
