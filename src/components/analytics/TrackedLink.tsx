"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/**
 * The one CTA primitive: renders a link (internal via next/link, external via
 * <a target=_blank>) and fires the right analytics event on click. Server
 * pages use this as their only client leaf, so they stay server components.
 *
 * event defaults: external hrefs → "book_redirect", internal → "cta_click".
 */

type Props = {
  href: string;
  event?: AnalyticsEvent;
  analytics?: AnalyticsProps;
  external?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function TrackedLink({ href, event, analytics = {}, external, children, onClick: callerOnClick, ...rest }: Props) {
  // A root-relative href can never be external, even if a caller passes
  // external: true — that's how every gated booking CTA keeps working after
  // bookingUrl() starts returning the on-site /waitlist path.
  const isAbsolute = /^https?:\/\//.test(href);
  const isExternal = isAbsolute && (external ?? true);
  const name: AnalyticsEvent = event ?? (isExternal ? "book_redirect" : "cta_click");
  // Compose, don't replace: a caller's onClick (closing a menu, etc.) must not
  // silently drop the analytics event.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(name, analytics);
    callerOnClick?.(e);
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
