"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
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

export function TrackedLink({ href, event, analytics = {}, external, children, ...rest }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const name: AnalyticsEvent = event ?? (isExternal ? "book_redirect" : "cta_click");
  const onClick = () => trackEvent(name, analytics);

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
