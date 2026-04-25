"use client";

import { useActionState, useState, useCallback } from "react";
import type { Post } from "@/lib/types";
import type { PostActionState } from "@/app/admin/(protected)/posts/actions";
import { TiptapEditor } from "./TiptapEditor";
import { SerpPreview } from "./SerpPreview";
import { SocialCardPreview } from "./SocialCardPreview";
import { SeoScore } from "./SeoScore";
import {
  m3Checkbox,
  m3CodeChip,
  m3FieldFilled,
  m3FilledButton,
  m3Label,
  m3OutlinedButtonSm,
  m3ShapeLg,
} from "@/lib/material-landing";

type Props = {
  saveAction: (
    prev: PostActionState,
    formData: FormData,
  ) => Promise<PostActionState>;
  post?: Post;
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(html: string): number {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).length : 0;
}

export function PostForm({ saveAction, post }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);
  const [body, setBody] = useState(post?.body ?? "");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.meta_description ?? "");
  const [ogImage, setOgImage] = useState(post?.og_image_url ?? "");
  const [coverImage, setCoverImage] = useState(post?.cover_image_url ?? "");

  const generateSeo = useCallback(() => {
    const plainText = stripHtml(body);

    // Generate meta title: use post title + brand suffix
    if (!metaTitle && title) {
      const t = title.length > 50 ? title.slice(0, 50) + "..." : title;
      setMetaTitle(`${t} | Olive Marketing`);
    }

    // Generate meta description: extract first meaningful sentences
    if (!metaDesc && plainText) {
      const sentences = plainText
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 20);
      const generated =
        sentences.length > 0
          ? sentences.slice(0, 2).join(" ").slice(0, 155)
          : plainText.slice(0, 155);
      setMetaDesc(generated);
    }
  }, [body, title, metaTitle, metaDesc]);

  const siteUrl = typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin)
    : "";
  const previewUrl = `${siteUrl}/blog/${slug || "your-slug"}`;
  const previewImage = ogImage || coverImage;

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <input type="hidden" name="body" value={body} />

      {/* Title */}
      <div>
        <label htmlFor="title" className={m3Label}>Title</label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={m3FieldFilled}
          placeholder="Article title"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={m3Label}>Slug (URL)</label>
        <input
          id="slug"
          name="slug"
          placeholder="auto-generated from title if empty"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          The URL path: /blog/<span className="font-medium">{slug || "your-slug"}</span>
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className={m3Label}>Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          className={m3FieldFilled}
          placeholder="Brief summary shown on the blog listing page"
        />
      </div>

      {/* Rich Text Editor */}
      <div>
        <label className={m3Label}>Body</label>
        <TiptapEditor
          content={body}
          onChange={setBody}
          placeholder="Start writing your article..."
        />
        <p className="mt-1.5 font-body text-xs text-on-surface-variant">
          Rich text editor. Use the toolbar for formatting, links, and images.
        </p>
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="cover_image_url" className={m3Label}>Cover image URL</label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          placeholder="https://images.pexels.com/..."
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className={m3FieldFilled}
        />
      </div>

      {/* ─── SEO Section ─── */}
      <fieldset
        className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}
      >
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          Search &amp; social (SEO)
        </legend>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-body text-xs text-on-surface-variant">
            Control how this article appears in Google and when shared.
          </p>
          <button
            type="button"
            onClick={generateSeo}
            disabled={!body && !title}
            className={`${m3OutlinedButtonSm} ml-4 shrink-0`}
          >
            AI suggest
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="meta_title" className={m3Label}>SEO title</label>
              <CharCount value={metaTitle} ideal="50-60" max={60} />
            </div>
            <input
              id="meta_title"
              name="meta_title"
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
              maxLength={320}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className={m3FieldFilled}
              placeholder="Summary shown in search results"
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
              placeholder="1200x630px recommended; falls back to cover image"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className={m3FieldFilled}
            />
          </div>
          <label className="flex items-start gap-3 font-body text-sm">
            <input
              type="checkbox"
              name="no_index"
              defaultChecked={post?.no_index ?? false}
              className={m3Checkbox}
            />
            <span>
              <span className="font-medium text-on-surface">
                Hide from search engines
              </span>
              <span className="mt-0.5 block text-xs text-on-surface-variant">
                Sends <code className={m3CodeChip}>noindex</code> and removes
                from sitemap and RSS.
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {/* ─── SEO Previews ─── */}
      <div className="flex flex-col gap-4">
        <SeoScore
          title={metaTitle}
          description={metaDesc}
          hasImage={!!previewImage}
          bodyLength={wordCount(body)}
          slug={slug}
        />
        <SerpPreview
          title={metaTitle || `${title} | Olive Marketing`}
          description={metaDesc || post?.excerpt || ""}
          url={previewUrl}
          fallbackTitle={title || "Article Title"}
        />
        <SocialCardPreview
          title={metaTitle || `${title} | Olive Marketing`}
          description={metaDesc || post?.excerpt || ""}
          imageUrl={previewImage}
          fallbackTitle={title || "Article Title"}
        />
      </div>

      {/* Published */}
      <label className="flex items-center gap-3 font-body text-sm text-on-surface">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className={m3Checkbox}
        />
        Published
      </label>

      {state?.error && (
        <p className="font-body text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className={`${m3FilledButton} w-fit`}>
          {pending ? "Saving..." : "Save"}
        </button>
        <a
          href="/admin/posts"
          className="font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
