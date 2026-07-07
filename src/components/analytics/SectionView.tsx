"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { trackEvent, type AnalyticsProps } from "@/lib/analytics";

/**
 * Fires a single `section_view` event when its children first scroll into
 * view — used on the cinematic sections so we can see how far visitors get.
 */

export function SectionView({ analytics, children }: { analytics: AnalyticsProps; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired.current) {
          fired.current = true;
          trackEvent("section_view", analytics);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
}
