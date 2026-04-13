"use client";

import { useState, useMemo, useTransition } from "react";
import type { Lead, LeadStatus } from "@/lib/types";
import {
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  bulkUpdateStatus,
  bulkDeleteLeads,
} from "@/app/admin/(protected)/leads/actions";
import {
  m3Card,
  m3Field,
  m3FilledButtonSm,
  m3TextButton,
} from "@/lib/material-landing";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; icon: string; color: string; bg: string }
> = {
  new: {
    label: "New",
    icon: "fiber_new",
    color: "text-primary",
    bg: "bg-primary-container text-on-primary-container",
  },
  contacted: {
    label: "Contacted",
    icon: "call",
    color: "text-tertiary",
    bg: "bg-tertiary-container text-on-tertiary-container",
  },
  qualified: {
    label: "Qualified",
    icon: "verified",
    color: "text-secondary",
    bg: "bg-secondary-container text-on-secondary-container",
  },
  converted: {
    label: "Converted",
    icon: "check_circle",
    color: "text-on-primary-fixed-variant",
    bg: "bg-primary-fixed text-on-primary-fixed-variant",
  },
  lost: {
    label: "Lost",
    icon: "cancel",
    color: "text-error",
    bg: "bg-error-container text-on-error-container",
  },
};

const ALL_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
];

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-label text-[0.6rem] font-semibold uppercase tracking-wider ${cfg.bg}`}
    >
      <span
        className="material-symbols-outlined text-[12px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {cfg.icon}
      </span>
      {cfg.label}
    </span>
  );
}

function StatusSelect({
  leadId,
  current,
}: {
  leadId: string;
  current: LeadStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => updateLeadStatus(fd))}
      className="inline-flex"
    >
      <input type="hidden" name="id" value={leadId} />
      <select
        name="status"
        defaultValue={current}
        onChange={(e) => {
          const form = e.currentTarget.form;
          if (form) startTransition(() => updateLeadStatus(new FormData(form)));
        }}
        disabled={pending}
        className="rounded-lg border border-outline-variant/30 bg-surface px-2 py-1 font-label text-[0.65rem] font-medium text-on-surface transition-colors focus:border-primary focus:outline-none disabled:opacity-50"
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_CONFIG[s].label}
          </option>
        ))}
      </select>
    </form>
  );
}

function NotesInline({
  leadId,
  current,
}: {
  leadId: string;
  current: string | null;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="mt-2 flex items-center gap-1 font-body text-xs text-on-surface-variant hover:text-primary"
      >
        <span className="material-symbols-outlined text-[14px]">edit_note</span>
        {current ? current : "Add notes..."}
      </button>
    );
  }

  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          await updateLeadNotes(fd);
          setEditing(false);
        });
      }}
      className="mt-2 flex gap-2"
    >
      <input type="hidden" name="id" value={leadId} />
      <input
        name="notes"
        defaultValue={current ?? ""}
        placeholder="Internal notes..."
        autoFocus
        className="flex-1 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-2 py-1 font-body text-xs text-on-surface focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-2 py-1 font-label text-[0.6rem] font-medium text-on-primary disabled:opacity-50"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="font-label text-[0.6rem] text-on-surface-variant hover:text-on-surface"
      >
        Cancel
      </button>
    </form>
  );
}

function exportCsv(leads: Lead[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Business",
    "Message",
    "Status",
    "Source",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "Notes",
    "Created",
  ];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone ?? "",
    l.business_name ?? "",
    l.message.replace(/"/g, '""'),
    l.status,
    l.source,
    l.utm_source ?? "",
    l.utm_medium ?? "",
    l.utm_campaign ?? "",
    l.notes ?? "",
    l.created_at,
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkPending, startBulkTransition] = useTransition();

  const filtered = useMemo(() => {
    let result = leads;
    if (filterStatus !== "all") {
      result = result.filter((l) => l.status === filterStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.business_name?.toLowerCase().includes(q) ?? false) ||
          l.message.toLowerCase().includes(q),
      );
    }
    return result;
  }, [leads, filterStatus, search]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((l) => l.id)));
    }
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: leads.length };
    for (const s of ALL_STATUSES) counts[s] = 0;
    for (const l of leads) counts[l.status] = (counts[l.status] ?? 0) + 1;
    return counts;
  }, [leads]);

  return (
    <div>
      {/* Search + Export bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            placeholder="Search leads by name, email, business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${m3Field} pl-10`}
          />
        </div>
        <button
          type="button"
          onClick={() => exportCsv(filtered)}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-outline-variant/30 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
        >
          <span className="material-symbols-outlined text-[16px]">
            download
          </span>
          Export CSV
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(["all", ...ALL_STATUSES] as const).map((s) => {
          const isActive = filterStatus === s;
          const count = statusCounts[s] ?? 0;
          return (
            <button
              key={s}
              type="button"
              onClick={() => {
                setFilterStatus(s);
                setSelected(new Set());
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-label text-[0.6rem] font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {s === "all" ? "All" : STATUS_CONFIG[s].label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.55rem] ${
                  isActive
                    ? "bg-on-primary/20 text-on-primary"
                    : "bg-outline-variant/20"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary-container/30 px-4 py-3">
          <span className="font-label text-[0.65rem] font-semibold text-on-surface">
            {selected.size} selected
          </span>
          <div className="flex gap-2">
            {ALL_STATUSES.map((s) => (
              <form
                key={s}
                action={(fd) => {
                  startBulkTransition(async () => {
                    await bulkUpdateStatus(fd);
                    setSelected(new Set());
                  });
                }}
              >
                <input
                  type="hidden"
                  name="ids"
                  value={Array.from(selected).join(",")}
                />
                <input type="hidden" name="status" value={s} />
                <button
                  type="submit"
                  disabled={bulkPending}
                  className="rounded-lg border border-outline-variant/30 bg-surface px-2 py-1 font-label text-[0.55rem] font-medium text-on-surface-variant hover:border-primary/40 hover:text-primary disabled:opacity-50"
                >
                  → {STATUS_CONFIG[s].label}
                </button>
              </form>
            ))}
            <form
              action={(fd) => {
                startBulkTransition(async () => {
                  await bulkDeleteLeads(fd);
                  setSelected(new Set());
                });
              }}
            >
              <input
                type="hidden"
                name="ids"
                value={Array.from(selected).join(",")}
              />
              <button
                type="submit"
                disabled={bulkPending}
                className="rounded-lg border border-error/30 bg-surface px-2 py-1 font-label text-[0.55rem] font-medium text-error hover:bg-error-container/30 disabled:opacity-50"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Leads list */}
      {filtered.length === 0 && (
        <p className="mt-10 font-body text-on-surface-variant">
          {search || filterStatus !== "all"
            ? "No leads match your filters."
            : "No leads yet. When visitors use the contact form, rows appear here."}
        </p>
      )}

      <ul className="mt-5 space-y-3">
        {filtered.map((lead) => (
          <li key={lead.id} className={`${m3Card} p-5 md:p-6`}>
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <label className="mt-1 flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={selected.has(lead.id)}
                  onChange={() => toggleSelect(lead.id)}
                  className="size-4 rounded border-outline-variant accent-primary"
                />
              </label>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-headline text-lg font-normal text-primary">
                    {lead.name}
                  </p>
                  <StatusBadge status={lead.status} />
                </div>

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
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined mr-1 align-middle text-[14px]">
                      business
                    </span>
                    {lead.business_name}
                  </p>
                )}

                <p className="mt-3 whitespace-pre-wrap font-body text-sm leading-relaxed text-on-surface">
                  {lead.message}
                </p>

                {/* UTM Attribution */}
                {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {lead.utm_source && (
                      <span className="rounded-md bg-surface-container-high px-2 py-0.5 font-mono text-[0.6rem] text-on-surface-variant">
                        src: {lead.utm_source}
                      </span>
                    )}
                    {lead.utm_medium && (
                      <span className="rounded-md bg-surface-container-high px-2 py-0.5 font-mono text-[0.6rem] text-on-surface-variant">
                        med: {lead.utm_medium}
                      </span>
                    )}
                    {lead.utm_campaign && (
                      <span className="rounded-md bg-surface-container-high px-2 py-0.5 font-mono text-[0.6rem] text-on-surface-variant">
                        cmp: {lead.utm_campaign}
                      </span>
                    )}
                  </div>
                )}

                {/* Notes */}
                <NotesInline leadId={lead.id} current={lead.notes} />

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <p className="font-label text-[0.625rem] font-medium uppercase tracking-wider text-on-surface-variant">
                    {formatWhen(lead.created_at)} · {lead.source}
                  </p>
                  <StatusSelect leadId={lead.id} current={lead.status} />
                </div>
              </div>

              {/* Delete */}
              <form action={deleteLead}>
                <input type="hidden" name="id" value={lead.id} />
                <button
                  type="submit"
                  className={`${m3TextButton} text-error hover:bg-error-container/40 hover:text-error`}
                  title="Delete lead"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      {/* Select all footer */}
      {filtered.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleAll}
            className="font-label text-[0.65rem] font-medium text-primary hover:underline"
          >
            {selected.size === filtered.length
              ? "Deselect all"
              : `Select all (${filtered.length})`}
          </button>
          <p className="font-label text-[0.6rem] text-on-surface-variant">
            Showing {filtered.length} of {leads.length} leads
          </p>
        </div>
      )}
    </div>
  );
}
