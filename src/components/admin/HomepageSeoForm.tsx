"use client";

import { useActionState } from "react";
import type { HomepageSeo } from "@/lib/homepage-seo";
import type { HomepageSeoActionState } from "@/app/admin/(protected)/seo/actions";
import {
  m3FieldFilled,
  m3FilledButton,
  m3Label,
  m3ShapeLg,
} from "@/lib/material-landing";

type Props = {
  saveAction: (
    prev: HomepageSeoActionState,
    formData: FormData,
  ) => Promise<HomepageSeoActionState>;
  initial: HomepageSeo;
};

export function HomepageSeoForm({ saveAction, initial }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);

  return (
    <form action={formAction} className="mt-8 flex max-w-2xl flex-col gap-6">
      {state?.error && (
        <p className="font-body text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      {/* Meta title */}
      <div>
        <label htmlFor="seo-meta-title" className={m3Label}>
          Meta title
        </label>
        <input
          id="seo-meta-title"
          name="meta_title"
          type="text"
          defaultValue={initial.metaTitle ?? ""}
          placeholder="Leave blank to use translation default"
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          Browser tab title and search result headline. Keep under 60 characters
          for best results.
        </p>
      </div>

      {/* Meta description */}
      <div>
        <label htmlFor="seo-meta-desc" className={m3Label}>
          Meta description
        </label>
        <textarea
          id="seo-meta-desc"
          name="meta_description"
          rows={3}
          defaultValue={initial.metaDescription ?? ""}
          placeholder="Leave blank to use translation default"
          className={`${m3FieldFilled} resize-y`}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          Search result snippet. Keep under 155 characters for best display.
        </p>
      </div>

      {/* OG title */}
      <div>
        <label htmlFor="seo-og-title" className={m3Label}>
          Open Graph title
        </label>
        <input
          id="seo-og-title"
          name="og_title"
          type="text"
          defaultValue={initial.ogTitle ?? ""}
          placeholder="Falls back to meta title if blank"
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          Title shown when shared on Facebook, LinkedIn, etc.
        </p>
      </div>

      {/* OG description */}
      <div>
        <label htmlFor="seo-og-desc" className={m3Label}>
          Open Graph description
        </label>
        <textarea
          id="seo-og-desc"
          name="og_description"
          rows={2}
          defaultValue={initial.ogDescription ?? ""}
          placeholder="Falls back to meta description if blank"
          className={`${m3FieldFilled} resize-y`}
        />
      </div>

      {/* OG image */}
      <div>
        <label htmlFor="seo-og-image" className={m3Label}>
          OG image URL
        </label>
        <input
          id="seo-og-image"
          name="og_image_url"
          type="url"
          defaultValue={initial.ogImageUrl ?? ""}
          placeholder="https://..."
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          1200 x 630px recommended. Must be an https URL.
        </p>
        {initial.ogImageUrl && (
          <div className="mt-3">
            <p className="mb-1.5 font-label text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
              Preview
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={initial.ogImageUrl}
              alt="OG image preview"
              className={`max-h-48 w-full max-w-md border border-outline-variant/30 object-cover ${m3ShapeLg}`}
            />
          </div>
        )}
      </div>

      <button type="submit" disabled={pending} className={m3FilledButton}>
        {pending ? "Saving\u2026" : "Save SEO settings"}
      </button>
    </form>
  );
}
