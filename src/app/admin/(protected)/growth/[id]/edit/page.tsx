import { notFound } from "next/navigation";
import { GrowthPageForm } from "@/components/admin/GrowthPageForm";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { deleteGrowthPage, updateGrowthPage } from "../../actions";
import {
  m3DangerOutlinedSm,
  m3DisplayHeadline,
  m3Overline,
  m3ShapeLg,
} from "@/lib/material-landing";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit growth ${id.slice(0, 8)}...`, robots: { index: false } };
}

export default async function EditGrowthPagePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("growth_pages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const page = data as {
    id: string;
    slug: string;
    locale: string;
    meta_title: string;
    meta_description: string;
    og_image_url?: string | null;
    h1: string;
    intro: string;
    sections: { heading: string; paragraphs: string[] }[];
    faqs: { question: string; answer: string }[];
    published: boolean;
  };

  const boundUpdate = updateGrowthPage.bind(null, page.id);

  return (
    <div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        Edit growth page
      </h1>
      <p className="mt-2 font-mono text-sm text-on-surface-variant">
        /grow/{page.slug} ({page.locale})
      </p>
      <div className="mt-8">
        <GrowthPageForm saveAction={boundUpdate} page={page} />
      </div>
      <div
        className={`mt-12 border-t-2 border-outline-variant/20 pt-8 ${m3ShapeLg} bg-error-container/15 p-6 md:p-8`}
      >
        <h2 className={m3Overline}>Danger zone</h2>
        <form action={deleteGrowthPage} className="mt-4">
          <input type="hidden" name="id" value={page.id} />
          <button type="submit" className={m3DangerOutlinedSm}>
            Delete page
          </button>
        </form>
      </div>
    </div>
  );
}
