import type { CSSProperties, ReactNode } from "react";
import { ACCENTS, type ServiceKey } from "@/lib/accents";

/**
 * The site's standard glass card (dialect generalized from the hyperbaric
 * pages): translucent slate, blur, accent-tinted border, soft depth shadow.
 * Server component.
 */

type Props = {
  service?: ServiceKey;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function glassCardStyle(service: ServiceKey = "brand"): CSSProperties {
  const a = ACCENTS[service];
  return {
    background: "hsla(210,22%,22%,0.5)",
    border: `1px solid rgba(${a.rgb},0.18)`,
    backdropFilter: "blur(12px)",
    boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
  };
}

export function GlassCard({ service = "brand", className = "", style, children }: Props) {
  return (
    <div className={`rounded-2xl p-7 ${className}`} style={{ ...glassCardStyle(service), ...style }}>
      {children}
    </div>
  );
}
