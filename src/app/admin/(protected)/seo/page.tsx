import Link from "next/link";
import { HomepageSeoForm } from "@/components/admin/HomepageSeoForm";
import { getHomepageSeo } from "@/lib/homepage-seo";
import {
  m3DisplayHeadline,
  m3OutlinedButton,
  m3TextButton,
} from "@/lib/material-landing";
import { updateHomepageSeo } from "./actions";

type Props = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminSeoPage({ searchParams }: Props) {
  const seo = await getHomepageSeo();
  const { saved } = await searchParams;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className={`${m3TextButton} px-0 text-on-surface-variant hover:text-primary`}
        >
          &larr; Dashboard
        </Link>
      </div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        Homepage SEO
      </h1>
      <p className="mt-2 max-w-2xl font-body text-on-surface-variant">
        Override the default homepage meta tags for search engines and social
        sharing. Leave fields blank to fall back to the translation defaults.
        Changes apply after you save (Supabase table{" "}
        <code className="font-mono text-sm">homepage_seo</code>).
      </p>
      {saved === "1" && (
        <p
          className="mt-4 font-body text-sm font-medium text-primary"
          role="status"
        >
          Saved. The homepage will show the updated SEO settings on the next page
          load.
        </p>
      )}
      <HomepageSeoForm saveAction={updateHomepageSeo} initial={seo} />
      <div className="mt-10">
        <Link href="/admin" className={m3OutlinedButton}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
