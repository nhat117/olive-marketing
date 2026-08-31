import {
  formatOliveHoursDisplay,
  OLIVE_MAP_EMBED_SRC,
  OLIVE_NAP,
  schemaEmail,
} from "@/lib/seo/local-business";
import { getSiteContact } from "@/lib/site-contact";

type Props = {
  showMap?: boolean;
  mapHeight?: number;
  className?: string;
};

/**
 * Visible NAP matching the Google Business Profile.
 * Email microdata is a plain address (never mailto:) so schema.org validates.
 */
export async function NapBlock({
  showMap = false,
  mapHeight = 220,
  className,
}: Props) {
  const contact = await getSiteContact();
  const email = schemaEmail(contact.email || OLIVE_NAP.email);

  return (
    <div className={className}>
      <address
        itemScope
        itemType="https://schema.org/LocalBusiness"
        className="not-italic"
      >
        <p
          itemProp="name"
          className="font-headline text-base font-medium text-on-surface md:text-lg"
        >
          {OLIVE_NAP.name}
        </p>
        <p
          className="mt-1 font-body text-sm text-on-surface-variant md:text-base"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span itemProp="streetAddress">{OLIVE_NAP.streetAddress}</span>,{" "}
          <span itemProp="addressLocality">{OLIVE_NAP.addressLocality}</span>{" "}
          <span itemProp="addressRegion">{OLIVE_NAP.addressRegion}</span>{" "}
          <span itemProp="postalCode">{OLIVE_NAP.postalCode}</span>,{" "}
          <span itemProp="addressCountry">Australia</span>
        </p>
        <p className="mt-3 flex flex-col gap-2 font-body text-sm text-on-surface-variant md:text-base">
          <a
            className="transition-colors hover:text-primary"
            href={`tel:${OLIVE_NAP.phoneE164}`}
          >
            <span itemProp="telephone">{OLIVE_NAP.phoneDisplay}</span>
          </a>
          <a
            className="transition-colors hover:text-primary"
            href={`mailto:${email}`}
          >
            <span itemProp="email">{email}</span>
          </a>
        </p>
        <p className="mt-3 font-label text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-on-surface-variant/80">
          Hours · {formatOliveHoursDisplay()}
        </p>
      </address>

      {showMap ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-outline-variant/40">
          <iframe
            title="Olive Marketing — 18 Esther St, Preston VIC 3072"
            src={OLIVE_MAP_EMBED_SRC}
            width="100%"
            height={mapHeight}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
}
