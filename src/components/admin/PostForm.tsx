"use client";

import { useActionState } from "react";
import type { Post } from "@/lib/types";
import type { PostActionState } from "@/app/admin/(protected)/posts/actions";
import {
  m3Checkbox,
  m3CodeChip,
  m3FieldFilled,
  m3FilledButton,
  m3Label,
  m3ShapeLg,
} from "@/lib/material-landing";

type Props = {
  saveAction: (
    prev: PostActionState,
    formData: FormData,
  ) => Promise<PostActionState>;
  post?: Post;
};

export function PostForm({ saveAction, post }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
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
        />
      </div>
      <div>
        <label htmlFor="slug" className={m3Label}>
          Slug (URL)
        </label>
        <input
          id="slug"
          name="slug"
          placeholder="auto from title if empty"
          defaultValue={post?.slug ?? ""}
          className={m3FieldFilled}
        />
      </div>
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
        />
      </div>
      <div>
        <label htmlFor="body" className={m3Label}>
          Body (Markdown)
        </label>
        <textarea
          id="body"
          name="body"
          rows={16}
          defaultValue={post?.body ?? ""}
          className={`${m3FieldFilled} font-mono text-sm`}
        />
      </div>
      <div>
        <label htmlFor="cover_image_url" className={m3Label}>
          Cover image URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          placeholder="https://"
          defaultValue={post?.cover_image_url ?? ""}
          className={m3FieldFilled}
        />
      </div>

      <fieldset
        className={`${m3ShapeLg} border-2 border-outline-variant/30 bg-surface-container-lowest/50 p-6 md:p-8`}
      >
        <legend className="px-1 font-label text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
          Search &amp; social (SEO)
        </legend>
        <p className="mb-4 font-body text-xs text-on-surface-variant">
          Control how this article appears in Google and when shared. Leave
          blank to use the title, excerpt, and cover image.
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="meta_title" className={m3Label}>
              SEO title{" "}
              <span className="font-normal normal-case text-on-surface-variant">
                (≈50–60 chars)
              </span>
            </label>
            <input
              id="meta_title"
              name="meta_title"
              maxLength={120}
              defaultValue={post?.meta_title ?? ""}
              className={m3FieldFilled}
            />
          </div>
          <div>
            <label htmlFor="meta_description" className={m3Label}>
              Meta description{" "}
              <span className="font-normal normal-case text-on-surface-variant">
                (≈150–160 chars)
              </span>
            </label>
            <textarea
              id="meta_description"
              name="meta_description"
              rows={3}
              maxLength={320}
              defaultValue={post?.meta_description ?? ""}
              className={m3FieldFilled}
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

      <button
        type="submit"
        disabled={pending}
        className={`${m3FilledButton} w-fit`}
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
