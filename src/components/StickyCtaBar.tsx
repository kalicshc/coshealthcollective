"use client";

import { useEffect, useState } from "react";
import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { bookingUrl, type ApptKey } from "@/lib/bookingLinks";
import { trackEvent } from "@/lib/analytics";

/**
 * Mobile bottom sticky CTA bar — appears once the hero has scrolled out,
 * hides on desktop (the page-level CTAs carry desktop). Keeps the booking
 * action one thumb-tap away for the whole scroll.
 *
 * Defaults are the women's-hormone pair so existing call sites render
 * unchanged. Other services pass `service` plus label/href overrides.
 * `primaryHref` (e.g. an #early-access anchor) replaces the Hint booking
 * link entirely — it fires cta_click and stays in-tab.
 */

type Props = {
  source: string;
  service?: ServiceKey;
  appt?: ApptKey;
  bookLabel?: string;
  /** Override the primary destination (in-page anchor or route) instead of a Hint booking link. */
  primaryHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function StickyCtaBar({
  source,
  service = "hormone",
  appt = "freeConsult",
  bookLabel = "Book a Free Consult",
  primaryHref,
  secondaryHref = "/hormone/womens-health/quiz",
  secondaryLabel = "3-Min Quiz",
}: Props) {
  const [visible, setVisible] = useState(false);
  const a = ACCENTS[service];

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 pl-4 pb-4 pt-2 transition-transform duration-300 lg:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        background: "linear-gradient(180deg, transparent, hsla(210,32%,8%,0.92) 35%)",
        // Right padding clears the floating "Ask Kali" chatbot bubble.
        paddingRight: "7rem",
      }}
    >
      <a
        href={primaryHref ?? bookingUrl(appt, `${source}-sticky`)}
        {...(primaryHref ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        onClick={() =>
          trackEvent(primaryHref ? "cta_click" : "book_redirect", {
            source: `${source}-sticky`,
            service,
            ...(primaryHref ? {} : { appt }),
            label: bookLabel,
          })
        }
        className="flex-1 rounded-full py-3.5 text-center text-sm font-bold"
        style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "#fff", boxShadow: `0 8px 28px rgba(${a.rgb},0.4)` }}
      >
        {bookLabel}
      </a>
      <a
        href={secondaryHref}
        onClick={() => trackEvent("cta_click", { source: `${source}-sticky`, service, label: secondaryLabel })}
        className="rounded-full px-5 py-3.5 text-center text-sm font-semibold"
        style={{ border: `1px solid rgba(${a.rgb},0.5)`, color: `rgb(${a.rgb})`, background: "hsla(210,22%,14%,0.9)" }}
      >
        {secondaryLabel}
      </a>
    </div>
  );
}
