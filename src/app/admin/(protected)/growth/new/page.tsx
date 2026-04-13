import { GrowthPageForm } from "@/components/admin/GrowthPageForm";
import { createGrowthPage } from "../actions";
import { m3DisplayHeadline } from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New growth page — Olive Admin",
  robots: { index: false, follow: false },
};

export default function NewGrowthPage() {
  return (
    <div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        New growth page
      </h1>
      <p className="mt-2 font-body text-sm text-on-surface-variant">
        Create a programmatic SEO landing page. Sections and FAQs generate
        structured data for Google and AI search.
      </p>
      <div className="mt-8">
        <GrowthPageForm saveAction={createGrowthPage} />
      </div>
    </div>
  );
}
