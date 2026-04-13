"use client";

import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useActionState,
} from "react";
import {
  submitLead,
  type SubmitLeadState,
} from "@/app/actions/submit-lead";
import { FbContact, useFbLeadEvent } from "@/components/analytics/FbLeadEvents";
import type { SiteContact } from "@/lib/site-contact-defaults";
import { SITE_CONTACT_DEFAULTS } from "@/lib/site-contact-defaults";
import {
  m3Dialog,
  m3DisplayHeadline,
  m3Field,
  m3FilledButton,
  m3Label,
  m3OutlinedButtonSm,
  m3TextButton,
} from "@/lib/material-landing";

function useUtmParams() {
  const [utms, setUtms] = useState<Record<string, string>>({});
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
      const v = sp.get(key);
      if (v) u[key] = v;
    }
    setUtms(u);
  }, []);
  return utms;
}

const LeadModalContext = createContext<{ open: () => void } | null>(null);

const SiteContactContext = createContext<SiteContact>(SITE_CONTACT_DEFAULTS);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadFormProvider");
  }
  return ctx;
}

export function LeadFormProvider({
  children,
  contact = SITE_CONTACT_DEFAULTS,
}: {
  children: React.ReactNode;
  contact?: SiteContact;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    setFormKey((k) => k + 1);
    dialogRef.current?.showModal();
    // Fire client-side Facebook Contact event when modal opens
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Contact");
    }
  }, []);

  return (
    <SiteContactContext.Provider value={contact}>
      <LeadModalContext.Provider value={{ open }}>
        {children}
        <dialog
          ref={dialogRef}
          className="lead-dialog fixed top-1/2 left-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 text-on-background"
          aria-labelledby="lead-modal-title"
        >
          <LeadFormPanel key={formKey} dialogRef={dialogRef} />
        </dialog>
      </LeadModalContext.Provider>
    </SiteContactContext.Provider>
  );
}

function LeadFormPanel({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const t = useTranslations("LeadModal");
  const siteContact = useContext(SiteContactContext);
  const utms = useUtmParams();
  const [state, formAction, pending] = useActionState(submitLead, {
    status: "idle",
  } satisfies SubmitLeadState);
  const fireFbLead = useFbLeadEvent();

  // Fire client-side Lead event (deduplicated with server-side CAPI via eventId)
  useEffect(() => {
    if (state.status === "success" && state.fbEventId) {
      fireFbLead(state.fbEventId);
    }
  }, [state, fireFbLead]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      el.close();
    };
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [dialogRef]);

  return (
    <div className={`relative p-6 md:p-8 ${m3Dialog}`}>
      <button
        type="button"
        className={`${m3TextButton} absolute right-2 top-2 text-on-surface-variant`}
        aria-label={t("close")}
        onClick={() => dialogRef.current?.close()}
      >
        {t("close")}
      </button>

      {state.status === "success" ? (
        <div className="pr-8">
          <h2
            id="lead-modal-title"
            className={`${m3DisplayHeadline} text-2xl text-primary`}
          >
            {t("successTitle")}
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant">
            {t("successLead")}{" "}
            <a
              className="font-medium text-primary underline underline-offset-2"
              href={`mailto:${siteContact.email}`}
            >
              {siteContact.email}
            </a>
            .
          </p>
          {state.calUrl && (
            <a
              href={state.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${m3OutlinedButtonSm} mt-6`}
            >
              {t("calendarCta")}
            </a>
          )}
          <button
            type="button"
            className={`${m3TextButton} mt-4 px-0 text-on-surface-variant hover:text-primary`}
            onClick={() => dialogRef.current?.close()}
          >
            {t("done")}
          </button>
        </div>
      ) : (
        <>
          <h2
            id="lead-modal-title"
            className={`pr-10 ${m3DisplayHeadline} text-2xl text-primary`}
          >
            {t("title")}
          </h2>
          <p className="mt-2 font-body text-sm text-on-surface-variant">
            {t("subtitle")}
          </p>

          <form
            action={formAction}
            className="relative mt-6 flex flex-col gap-5"
          >
            <input type="hidden" name="source" value="lead_modal" />
            {utms.utm_source && <input type="hidden" name="utm_source" value={utms.utm_source} />}
            {utms.utm_medium && <input type="hidden" name="utm_medium" value={utms.utm_medium} />}
            {utms.utm_campaign && <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />}

            <div className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
              <label htmlFor="company_website">{t("honeypotLabel")}</label>
              <input
                tabIndex={-1}
                id="company_website"
                name="company_website"
                type="text"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="lead-name" className={m3Label}>
                {t("name")}
              </label>
              <input
                id="lead-name"
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                className={m3Field}
              />
            </div>
            <div>
              <label htmlFor="lead-email" className={m3Label}>
                {t("email")}
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={m3Field}
              />
            </div>
            <div>
              <label htmlFor="lead-phone" className={m3Label}>
                {t("phone")}{" "}
                <span className="font-normal lowercase">
                  {t("phoneOptional")}
                </span>
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={m3Field}
              />
            </div>
            <div>
              <label htmlFor="lead-business" className={m3Label}>
                {t("business")}{" "}
                <span className="font-normal lowercase">
                  {t("businessOptional")}
                </span>
              </label>
              <input
                id="lead-business"
                name="business_name"
                maxLength={200}
                className={m3Field}
              />
            </div>
            <div>
              <label htmlFor="lead-message" className={m3Label}>
                {t("message")}
              </label>
              <textarea
                id="lead-message"
                name="message"
                required
                rows={4}
                minLength={10}
                maxLength={5000}
                placeholder={t("messagePlaceholder")}
                className={`${m3Field} min-h-[120px] resize-y`}
              />
            </div>

            {state.status === "error" && (
              <p className="font-body text-sm text-error" role="alert">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className={`${m3FilledButton} w-full`}
            >
              {pending ? t("submitting") : t("submit")}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export function OpenLeadButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useLeadModal();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
