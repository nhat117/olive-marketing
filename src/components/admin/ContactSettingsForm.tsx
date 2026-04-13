"use client";

import { useActionState } from "react";
import type { SiteContact } from "@/lib/site-contact-defaults";
import type { SiteContactActionState } from "@/app/admin/(protected)/contact/actions";
import {
  m3FieldFilled,
  m3FilledButton,
  m3Label,
} from "@/lib/material-landing";

type Props = {
  saveAction: (
    prev: SiteContactActionState,
    formData: FormData,
  ) => Promise<SiteContactActionState>;
  initial: SiteContact;
};

export function ContactSettingsForm({ saveAction, initial }: Props) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);

  return (
    <form action={formAction} className="mt-8 flex max-w-2xl flex-col gap-6">
      {state?.error && (
        <p className="font-body text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="contact-email" className={m3Label}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          defaultValue={initial.email}
          className={m3FieldFilled}
        />
      </div>

      <div>
        <label htmlFor="contact-phone-e164" className={m3Label}>
          Phone (E.164 for links)
        </label>
        <input
          id="contact-phone-e164"
          name="phone_e164"
          type="text"
          required
          placeholder="+61425191488"
          defaultValue={initial.phoneE164}
          className={m3FieldFilled}
        />
        <p className="mt-1 font-body text-xs text-on-surface-variant">
          Use international format with + and no spaces (e.g. +61425191488).
        </p>
      </div>

      <div>
        <label htmlFor="contact-phone-display" className={m3Label}>
          Phone (display)
        </label>
        <input
          id="contact-phone-display"
          name="phone_display"
          type="text"
          required
          placeholder="+61 425 191 488"
          defaultValue={initial.phoneDisplay}
          className={m3FieldFilled}
        />
      </div>

      <div>
        <label htmlFor="contact-facebook" className={m3Label}>
          Facebook page URL
        </label>
        <input
          id="contact-facebook"
          name="facebook_url"
          type="url"
          required
          defaultValue={initial.facebookUrl}
          className={m3FieldFilled}
        />
      </div>

      <button type="submit" disabled={pending} className={m3FilledButton}>
        {pending ? "Saving…" : "Save contact details"}
      </button>
    </form>
  );
}
