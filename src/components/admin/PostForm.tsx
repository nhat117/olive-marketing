"use client";

import { useActionState, useState, useCallback } from "react";
import type { Post } from "@/lib/types";
import type { PostActionState } from "@/app/admin/(protected)/posts/actions";
import { TiptapEditor } from "./TiptapEditor";
import {
  m3Checkbox,
  m3CodeChip,
  m3FieldFilled,
  m3FilledButton,
  m3FilledButtonSm,
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

export function PostForm({ saveAction, post }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);
  const [body, setBody] = useState(post?.body ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.meta_description ?? "");
  const [aiLoading, setAiLoading] = useState(false);

  const generateSeo = useCallback(() => {
    setAiLoading(true);
    try {
      const plainText = stripHtml(body);
      const titleEl = document.getElementById("title") as HTMLInputElement | null;
      const title = titleEl?.value?.trim() ?? "";

      // Generate meta title: use post title, add brand suffix
      const generatedTitle = title
        ? `${title.length > 50 ? title.slice(0, 50) + "..." : title} | Olive Marketing`
        : "";

      // Generate meta description: extract first meaningful sentence(s)
      const sentences = plainText
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 20);
      const generatedDesc =
        sentences.length > 0
          ? sentences.slice(0, 2).join(" ").slice(0, 155)
          : plainText.slice(0, 155);

      if (!metaTitle && generatedTitle) setMetaTitle(generatedTitle);
      if (!metaDesc && generatedDesc) setMetaDesc(generatedDesc);
    } finally {
      setAiLoading(false);
    }
  }, [body, metaTitle, metaDesc]);

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {/* Hidden field for body HTML from Tiptap */}
      <input type="hidden" name="body" value={body} />

      {/* Title */}
      <div>
        <label htmlFor="title" className={m3Label}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title ?? ""}
          className={m3FieldFilled}
          placeholder="Article title"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={m3Label}>
          Slug (URL)
        </label>
        <input
          id="slug"
          name="slug"
          placeholder="auto-generated from title if empty"
          defaultValue={post?.slug ?? ""}
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          The URL path: /blog/<span className="font-medium">your-slug</span>
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className={m3Label}>
          Excerpt
        </label>
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
        <label htmlFor="cover_image_url" className={m3Label}>
          Cover image URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          placeholder="https://images.unsplash.com/..."
          defaultValue={post?.cover_image_url ?? ""}
          className={m3FieldFilled}
        />
      </div>

      {/* SEO Section */}
      <fieldset
        className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}
      >
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          Search &amp; social (SEO)
        </legend>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-body text-xs text-on-surface-variant">
            Control how this article appears in Google and when shared. Leave
            blank to use the title, excerpt, and cover image.
          </p>
          <button
            type="button"
            onClick={generateSeo}
            disabled={aiLoading || !body}
            className={`${m3OutlinedButtonSm} ml-4 shrink-0`}
          >
            {aiLoading ? "Generating..." : "AI suggest"}
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="meta_title" className={m3Label}>
                SEO title
              </label>
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
              <label htmlFor="meta_description" className={m3Label}>
                Meta description
              </label>
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
              Social share image URL
            </label>
            <input
              id="og_image_url"
              name="og_image_url"
              type="url"
              placeholder="Optional; overrides cover for Open Graph / X"
              defaultValue={post?.og_image_url ?? ""}
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
                this URL from the sitemap and RSS (still public if someone has
                the link).
              </span>
            </span>
          </label>
        </div>
      </fieldset>

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

      {/* Error */}
      {state?.error && (
        <p className="font-body text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className={`${m3FilledButton} w-fit`}
        >
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
