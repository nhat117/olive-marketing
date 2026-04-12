import Link from "next/link";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
} from "@/lib/material-landing";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

const title = "Terms of use";
const description =
  "Terms governing use of the Olive Marketing website and general engagement policies for our digital marketing services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/terms") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/terms"),
    title: `${title} | Olive Marketing`,
    description,
  },
  robots: { index: true, follow: true },
};

const lastUpdated = "April 12, 2026";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <article className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className={`${m3Overline} mb-3`}>Legal</p>
          <h1
            className={`${m3DisplayHeadline} mb-4 text-3xl text-primary md:text-4xl`}
          >
            Terms of use
          </h1>
          <p className="mb-8 font-body text-sm text-on-surface-variant">
            Last updated: {lastUpdated}
          </p>

          <div className="mb-10 rounded-2xl border-2 border-outline-variant/40 bg-surface-container-low p-5 md:p-6">
            <p className="font-body text-sm leading-relaxed text-on-surface">
              <strong className="text-on-surface">Important:</strong> This page
              is a <strong>draft template</strong> for your business. It is not
              legal advice. Have a qualified attorney review and adapt it for
              your entity, location, services, and contracts before you rely on
              it.
            </p>
          </div>

          <div className="space-y-10 font-body text-base leading-relaxed text-on-surface">
            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                1. Agreement
              </h2>
              <p className="text-on-surface-variant">
                By accessing or using the Olive Marketing website (the
                &ldquo;Site&rdquo;), you agree to these Terms of Use. If you do
                not agree, do not use the Site. We may update these Terms from
                time to time; the &ldquo;Last updated&rdquo; date above will
                change, and continued use after changes means you accept the
                revised Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                2. Who we are
              </h2>
              <p className="text-on-surface-variant">
                The Site is operated by Olive Marketing (&ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a digital marketing
                practice focused on beauty and wellness businesses. Contact
                details appear in the{" "}
                <Link
                  href="/#inquiry"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                >
                  contact section
                </Link>{" "}
                on our homepage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                3. Using the Site
              </h2>
              <p className="text-on-surface-variant">
                You may browse the Site for lawful purposes only. You agree not
                to misuse the Site, attempt unauthorized access, interfere
                with security or performance, scrape content in bulk without
                permission, or use the Site to violate applicable law or
                third-party rights.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                4. Services &amp; proposals
              </h2>
              <p className="text-on-surface-variant">
                Descriptions on the Site (including capabilities, channels, and
                examples) are for general information. They do not constitute
                an offer. A binding engagement requires a separate agreement
                (such as a statement of work, order, or master services
                agreement) signed or otherwise accepted by both parties,
                including fees, scope, and term. If there is a conflict between
                these Terms and a signed services agreement, the agreement
                controls for that engagement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                5. Intellectual property
              </h2>
              <p className="text-on-surface-variant">
                The Site and its content (text, design, graphics, logos, and
                other materials) are owned by Olive Marketing or our licensors
                and are protected by intellectual property laws. You may not
                copy, modify, distribute, or create derivative works from the
                Site content without our prior written consent, except as
                allowed by law (for example, fair use). Rights in deliverables
                produced for clients are governed by the applicable client
                agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                6. Third-party services
              </h2>
              <p className="text-on-surface-variant">
                The Site may link to or mention third-party platforms (for
                example advertising, booking, analytics, or social tools).
                Those services have their own terms and privacy practices. We do
                not control them and are not responsible for their content or
                availability.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                7. No guarantee of results
              </h2>
              <p className="text-on-surface-variant">
                Marketing outcomes depend on many factors outside our control.
                Past performance or examples on the Site are not guarantees of
                future results. We do not warrant specific rankings, traffic,
                leads, bookings, or revenue.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                8. Disclaimers
              </h2>
              <p className="text-on-surface-variant">
                The Site and its content are provided &ldquo;as is&rdquo; and
                &ldquo;as available.&rdquo; To the fullest extent permitted by
                law, we disclaim all warranties, whether express, implied, or
                statutory, including merchantability, fitness for a particular
                purpose, and non-infringement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                9. Limitation of liability
              </h2>
              <p className="text-on-surface-variant">
                To the fullest extent permitted by law, Olive Marketing and its
                team will not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or for loss of profits,
                data, goodwill, or business opportunities, arising from or
                related to your use of the Site. Our total liability for claims
                arising from the Site (other than claims governed by a separate
                signed services agreement) will not exceed the greater of (a)
                one hundred U.S. dollars (USD $100) or (b) the amount you paid
                us solely for access to the Site in the twelve months before the
                claim—whichever applies. Some jurisdictions do not allow certain
                limitations; in those cases, our liability is limited to the
                maximum permitted by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                10. Indemnity
              </h2>
              <p className="text-on-surface-variant">
                You agree to defend and indemnify Olive Marketing against claims,
                damages, losses, and expenses (including reasonable legal fees)
                arising from your misuse of the Site or violation of these
                Terms, to the extent permitted by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                11. Governing law &amp; disputes
              </h2>
              <p className="text-on-surface-variant">
                <strong className="text-on-surface">[Draft—customize]</strong>{" "}
                These Terms are governed by the laws of{" "}
                <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-sm text-on-surface">
                  [State / country]
                </span>
                , without regard to conflict-of-law rules. Disputes will be
                resolved exclusively in the courts located in{" "}
                <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-sm text-on-surface">
                  [Venue]
                </span>
                , unless applicable law requires otherwise or you and we agree
                otherwise in writing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                12. Severability
              </h2>
              <p className="text-on-surface-variant">
                If any provision of these Terms is held invalid or unenforceable,
                the remaining provisions remain in effect.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-xl font-normal text-on-surface md:text-2xl">
                13. Contact
              </h2>
              <p className="text-on-surface-variant">
                Questions about these Terms: use the{" "}
                <Link
                  href="/#inquiry"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                >
                  contact options
                </Link>{" "}
                on our site or the business email you use for client
                correspondence.
              </p>
            </section>
          </div>

          <p className="mt-14 font-body text-sm text-on-surface-variant">
            <Link
              href="/"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              ← Back to home
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
