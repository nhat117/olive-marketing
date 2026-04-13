import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteLead } from "./actions";
import {
  m3Card,
  m3CodeChip,
  m3DisplayHeadline,
  m3TextButton,
} from "@/lib/material-landing";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data ?? []) as Lead[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Leads
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Submissions from the site contact form (
            <code className={m3CodeChip}>lead_modal</code>). Run{" "}
            <code className={m3CodeChip}>004_leads.sql</code> if this list
            fails to load.
          </p>
        </div>
        <Link
          href="/admin"
          className={`${m3TextButton} text-on-surface-variant hover:text-primary`}
        >
          ← Dashboard
        </Link>
      </div>

      {error && (
        <p className="mt-8 font-body text-error">
          {error.message}
          {error.message.includes("leads") && (
            <span className="mt-2 block text-sm text-on-surface-variant">
              Add the <code className={m3CodeChip}>leads</code> table via
              Supabase migration{" "}
              <code className={m3CodeChip}>004_leads.sql</code>.
            </span>
          )}
        </p>
      )}

      {!error && leads.length === 0 && (
        <p className="mt-10 font-body text-on-surface-variant">
          No leads yet. When visitors use &ldquo;Let&apos;s talk&rdquo; on the
          site, rows appear here.
        </p>
      )}

      <ul className="mt-10 space-y-5">
        {leads.map((lead) => (
          <li key={lead.id} className={`${m3Card} p-5 md:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-headline text-lg font-normal text-primary">
                  {lead.name}
                </p>
                <p className="mt-1 font-mono text-sm text-on-surface-variant">
                  <a
                    className="text-primary underline-offset-2 hover:underline"
                    href={`mailto:${lead.email}`}
                  >
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <>
                      {" · "}
                      <a
                        className="text-primary underline-offset-2 hover:underline"
                        href={`tel:${lead.phone}`}
                      >
                        {lead.phone}
                      </a>
                    </>
                  )}
                </p>
                {lead.business_name && (
                  <p className="mt-2 font-body text-sm text-on-surface-variant">
                    {lead.business_name}
                  </p>
                )}
                <p className="mt-3 whitespace-pre-wrap font-body text-sm leading-relaxed text-on-surface">
                  {lead.message}
                </p>
                <p className="mt-3 font-label text-[0.625rem] font-medium uppercase tracking-wider text-on-surface-variant">
                  {formatWhen(lead.created_at)} · {lead.source}
                </p>
              </div>
              <form action={deleteLead}>
                <input type="hidden" name="id" value={lead.id} />
                <button
                  type="submit"
                  className={`${m3TextButton} text-error hover:bg-error-container/40 hover:text-error`}
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
