import type { ReactNode } from "react";
import Link from "next/link";
import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { clinicFacts } from "@/lib/clinicFacts";

/**
 * Shared end-of-page CTA + contact strip. Replaces the hand-rolled
 * "Questions? Call us / email us" blocks that individual pages used to
 * duplicate. Contact details always come from clinicFacts (single source
 * of truth — see AGENTS.md). Server component.
 */

type Props = {
  service?: ServiceKey;
  heading?: string;
  body?: ReactNode;
  primaryCta?: { label: string; href: string; external?: boolean };
  /** Extra fine print (e.g. medical disclaimer) under the contact line */
  disclaimer?: ReactNode;
};

export function PageCtaFooter({
  service = "brand",
  heading = "Questions? Let's talk.",
  body,
  primaryCta,
  disclaimer,
}: Props) {
  const a = ACCENTS[service];
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <div
          className="rounded-3xl px-7 py-10 lg:px-12"
          style={{
            background: "hsla(210,22%,22%,0.5)",
            border: `1px solid rgba(${a.rgb},0.2)`,
            backdropFilter: "blur(12px)",
            boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
          }}
        >
          <h2 className="text-2xl lg:text-3xl font-black text-white">{heading}</h2>
          {body != null && (
            <p className="mt-3 max-w-xl mx-auto text-[15px] leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>
              {body}
            </p>
          )}
          {primaryCta != null && (
            <div className="mt-7">
              {primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-85 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "hsl(210,32%,10%)" }}
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="inline-block rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-85 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "hsl(210,32%,10%)" }}
                >
                  {primaryCta.label}
                </Link>
              )}
            </div>
          )}
          <p className="mt-7 text-sm" style={{ color: "hsl(210,25%,62%)" }}>
            Call or text{" "}
            <a href={`tel:${clinicFacts.contact.phoneTel}`} className="font-semibold" style={{ color: `rgb(${a.rgb})` }}>
              {clinicFacts.contact.phone}
            </a>{" "}
            · Email{" "}
            <a href={`mailto:${clinicFacts.contact.email}`} className="font-semibold" style={{ color: `rgb(${a.rgb})` }}>
              {clinicFacts.contact.email}
            </a>
          </p>
          {disclaimer != null && (
            <p className="mt-5 text-xs leading-relaxed" style={{ color: "hsl(210,25%,48%)" }}>
              {disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
