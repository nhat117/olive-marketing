"use client";

import { useActionState, useState, useCallback } from "react";
import type { GrowthActionState } from "@/app/admin/(protected)/growth/actions";
import { SerpPreview } from "./SerpPreview";
import { SocialCardPreview } from "./SocialCardPreview";
import { SeoScore } from "./SeoScore";
import {
  m3Checkbox,
  m3DangerOutlinedSm,
  m3FieldFilled,
  m3FilledButton,
  m3Label,
  m3OutlinedButtonSm,
  m3ShapeLg,
} from "@/lib/material-landing";

type Section = { heading: string; paragraphs: string[] };
type Faq = { question: string; answer: string };

type GrowthPage = {
  id: string;
  slug: string;
  locale: string;
  meta_title: string;
  meta_description: string;
  og_image_url?: string | null;
  h1: string;
  intro: string;
  sections: Section[];
  faqs: Faq[];
  published: boolean;
};

type Props = {
  saveAction: (
    prev: GrowthActionState,
    formData: FormData,
  ) => Promise<GrowthActionState>;
  page?: GrowthPage;
};

function CharCount({ value, ideal, max }: { value: string; ideal: string; max: number }) {
  const len = value.length;
  const color =
    len === 0
      ? "text-on-surface-variant"
      : len > max
        ? "text-error"
        : "text-primary";
  return (
    <span className={`font-mono text-xs ${color}`}>
      {len}/{ideal}
    </span>
  );
}

function estimateWordCount(sections: Section[], intro: string): number {
  let text = intro;
  for (const s of sections) {
    text += " " + s.heading + " " + s.paragraphs.join(" ");
  }
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function GrowthPageForm({ saveAction, page }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);
  const [sections, setSections] = useState<Section[]>(
    page?.sections ?? [{ heading: "", paragraphs: [""] }],
  );
  const [faqs, setFaqs] = useState<Faq[]>(
    page?.faqs ?? [{ question: "", answer: "" }],
  );
  const [metaTitle, setMetaTitle] = useState(page?.meta_title ?? "");
  const [metaDesc, setMetaDesc] = useState(page?.meta_description ?? "");
  const [ogImage, setOgImage] = useState(page?.og_image_url ?? "");
  const [h1, setH1] = useState(page?.h1 ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [intro, setIntro] = useState(page?.intro ?? "");

  const addSection = () =>
    setSections([...sections, { heading: "", paragraphs: [""] }]);
  const removeSection = (i: number) =>
    setSections(sections.filter((_, idx) => idx !== i));

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (i: number) =>
    setFaqs(faqs.filter((_, idx) => idx !== i));

  const generateSeo = useCallback(() => {
    if (!metaTitle && h1) {
      const t = h1.length > 50 ? h1.slice(0, 50) + "..." : h1;
      setMetaTitle(`${t} | Olive Marketing`);
    }
    if (!metaDesc && intro) {
      setMetaDesc(intro.slice(0, 155));
    }
  }, [h1, intro, metaTitle, metaDesc]);

  const siteUrl = typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin)
    : "";
  const previewUrl = `${siteUrl}/grow/${slug || "your-slug"}`;

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {/* Locale */}
      <div>
        <label htmlFor="locale" className={m3Label}>Locale</label>
        <select id="locale" name="locale" defaultValue={page?.locale ?? "en"} className={m3FieldFilled}>
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      {/* H1 */}
      <div>
        <label htmlFor="h1" className={m3Label}>H1 heading</label>
        <input
          id="h1"
          name="h1"
          required
          value={h1}
          onChange={(e) => setH1(e.target.value)}
          className={m3FieldFilled}
          placeholder="Main page heading"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={m3Label}>Slug (URL)</label>
        <input
          id="slug"
          name="slug"
          placeholder="auto-generated from H1 if empty"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          The URL path: /grow/<span className="font-medium">{slug || "your-slug"}</span>
        </p>
      </div>

      {/* Intro */}
      <div>
        <label htmlFor="intro" className={m3Label}>Intro paragraph</label>
        <textarea
          id="intro"
          name="intro"
          rows={3}
          required
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className={m3FieldFilled}
          placeholder="Opening paragraph below the H1"
        />
      </div>

      {/* Sections */}
      <fieldset className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}>
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          Content sections
        </legend>
        <div className="flex flex-col gap-6">
          {sections.map((section, i) => (
            <div key={i} className="relative rounded-xl border border-outline-variant/20 bg-surface-container-low/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-label text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Section {i + 1}
                </span>
                {sections.length > 1 && (
                  <button type="button" onClick={() => removeSection(i)} className="font-label text-xs text-error hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className={m3Label}>Heading</label>
                  <input name={`section_heading_${i}`} defaultValue={section.heading} className={m3FieldFilled} placeholder="Section heading" />
                </div>
                <div>
                  <label className={m3Label}>Body (separate paragraphs with blank lines)</label>
                  <textarea name={`section_body_${i}`} rows={4} defaultValue={section.paragraphs.join("\n\n")} className={m3FieldFilled} placeholder="Section content..." />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addSection} className={m3OutlinedButtonSm}>
            + Add section
          </button>
        </div>
      </fieldset>

      {/* FAQs */}
      <fieldset className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}>
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          FAQs (appears in FAQ schema for Google)
        </legend>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="relative rounded-xl border border-outline-variant/20 bg-surface-container-low/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-label text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  FAQ {i + 1}
                </span>
                {faqs.length > 1 && (
                  <button type="button" onClick={() => removeFaq(i)} className="font-label text-xs text-error hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className={m3Label}>Question</label>
                  <input name={`faq_question_${i}`} defaultValue={faq.question} className={m3FieldFilled} placeholder="What question do clients ask?" />
                </div>
                <div>
                  <label className={m3Label}>Answer</label>
                  <textarea name={`faq_answer_${i}`} rows={3} defaultValue={faq.answer} className={m3FieldFilled} placeholder="Answer..." />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addFaq} className={m3OutlinedButtonSm}>
            + Add FAQ
          </button>
        </div>
      </fieldset>

      {/* ─── SEO Section ─── */}
      <fieldset className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}>
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          Search &amp; social (SEO)
        </legend>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-body text-xs text-on-surface-variant">
            These appear in Google search results, AI answers, and social shares.
          </p>
          <button type="button" onClick={generateSeo} className={`${m3OutlinedButtonSm} ml-4 shrink-0`}>
            AI suggest
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="meta_title" className={m3Label}>Meta title</label>
              <CharCount value={metaTitle} ideal="50-60" max={60} />
            </div>
            <input
              id="meta_title"
              name="meta_title"
              required
              maxLength={120}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={m3FieldFilled}
              placeholder="Page title for search engines"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="meta_description" className={m3Label}>Meta description</label>
              <CharCount value={metaDesc} ideal="150-160" max={160} />
            </div>
            <textarea
              id="meta_description"
              name="meta_description"
              rows={3}
              required
              maxLength={320}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className={m3FieldFilled}
              placeholder="Summary for search results and AI citations"
            />
          </div>
          <div>
            <label htmlFor="og_image_url" className={m3Label}>
              Social share image URL (Open Graph)
            </label>
            <input
              id="og_image_url"
              name="og_image_url"
              type="url"
              placeholder="1200x630px recommended for Facebook/Twitter"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className={m3FieldFilled}
            />
          </div>
        </div>
      </fieldset>

      {/* ─── SEO Previews ─── */}
      <div className="flex flex-col gap-4">
        <SeoScore
          title={metaTitle}
          description={metaDesc}
          hasImage={!!ogImage}
          bodyLength={estimateWordCount(sections, intro)}
          slug={slug}
        />
        <SerpPreview
          title={metaTitle || `${h1} | Olive Marketing`}
          description={metaDesc || intro}
          url={previewUrl}
          fallbackTitle={h1 || "Page Title"}
        />
        <SocialCardPreview
          title={metaTitle || `${h1} | Olive Marketing`}
          description={metaDesc || intro}
          imageUrl={ogImage}
          fallbackTitle={h1 || "Page Title"}
        />
      </div>

      {/* Published */}
      <label className="flex items-center gap-3 font-body text-sm text-on-surface">
        <input type="checkbox" name="published" defaultChecked={page?.published ?? true} className={m3Checkbox} />
        Published
      </label>

      {state?.error && (
        <p className="font-body text-sm text-error" role="alert">{state.error}</p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className={`${m3FilledButton} w-fit`}>
          {pending ? "Saving..." : "Save"}
        </button>
        <a href="/admin/growth" className="font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary">
          Cancel
        </a>
      </div>
    </form>
  );
}
