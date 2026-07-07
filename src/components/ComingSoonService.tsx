import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { ServiceHero, type HeroCta } from "@/components/ServiceHero";
import { PageCtaFooter } from "@/components/PageCtaFooter";

/**
 * Shared page shell for services that aren't fully built out yet
 * (personal training, health coaching, etc.). One consistent treatment
 * instead of copy-pasted stubs. Server component.
 */

type Props = {
  service?: ServiceKey;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: ReactNode;
  /** Optional short bullets under the description */
  bullets?: string[];
  /** Extra CTAs besides the built-in contact footer */
  ctas?: HeroCta[];
};

export function ComingSoonService({ service = "brand", icon: Icon, eyebrow, title, description, bullets, ctas }: Props) {
  const a = ACCENTS[service];
  return (
    <div>
      <ServiceHero service={service} eyebrow={eyebrow} title={title} subhead={description} ctas={ctas}>
        <div className="flex flex-col items-center gap-8">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
          >
            <Icon className="h-9 w-9" style={{ color: "hsl(210,32%,10%)" }} aria-hidden="true" />
          </div>
          {bullets != null && bullets.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{ border: `1px solid rgba(${a.rgb},0.35)`, color: `rgb(${a.rgb})` }}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "hsl(210,25%,55%)" }}>
            Full service details coming soon
          </p>
        </div>
      </ServiceHero>
      <div className="section-divider" />
      <PageCtaFooter
        service={service}
        heading={`Interested in ${title.toLowerCase()}?`}
        body="Reach out and we'll walk you through what's available today and what's coming."
      />
    </div>
  );
}
