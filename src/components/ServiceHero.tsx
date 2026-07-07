import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ACCENTS, type ServiceKey } from "@/lib/accents";

/**
 * Shared interior-page hero in the site's "modern glass" language
 * (generalized from the hyperbaric pages): uppercase eyebrow, big white
 * headline with an accent gradient-clipped span, subhead, pill CTAs, all
 * over accent radial glows + a faint grid.
 *
 * Server component — pages using it can stay server-rendered.
 */

export type HeroCta = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "ghost";
};

type Props = {
  service: ServiceKey;
  eyebrow: string;
  /** Plain (white) part of the headline */
  title: ReactNode;
  /** Gradient-clipped part of the headline, rendered after `title` */
  titleAccent?: ReactNode;
  subhead?: ReactNode;
  ctas?: HeroCta[];
  /** Extra content under the CTAs (badges, forms, fine print) */
  children?: ReactNode;
  compact?: boolean;
};

export function gradientTextStyle(service: ServiceKey): CSSProperties {
  const a = ACCENTS[service];
  // Ends on the brighter rgb variant (not the button gradient's darker `to`
  // stop) so clipped text stays legible on the dark background.
  return {
    background: `linear-gradient(135deg, ${a.from}, rgb(${a.rgb}))`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
}

export function ServiceHero({ service, eyebrow, title, titleAccent, subhead, ctas, children, compact }: Props) {
  const a = ACCENTS[service];
  return (
    <section
      className={`relative overflow-hidden flex items-center ${compact ? "pt-28 pb-14 lg:pt-36 lg:pb-20" : "pt-32 pb-20 lg:pt-44 lg:pb-28"}`}
      style={{ background: "linear-gradient(180deg, hsla(210,32%,11%,0.8), hsla(210,32%,12%,0.6))" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, rgba(${a.rgb},0.14) 0%, transparent 52%), radial-gradient(ellipse at 90% 100%, rgba(${a.rgb},0.07) 0%, transparent 45%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8 text-center w-full">
        <p
          className="text-sm font-bold uppercase tracking-widest mb-4"
          style={{ color: `rgb(${a.rgb})`, letterSpacing: "0.08em" }}
        >
          {eyebrow}
        </p>
        <h1 className="font-black" style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", lineHeight: 1.08, fontSize: "clamp(2.3rem, 5.4vw, 4rem)" }}>
          {title}
          {titleAccent != null && (
            <span className="block mt-1" style={{ ...gradientTextStyle(service), filter: `drop-shadow(0 0 40px rgba(${a.rgb},0.3))` }}>
              {titleAccent}
            </span>
          )}
        </h1>
        {subhead != null && (
          <p className="mt-6 max-w-xl mx-auto" style={{ color: "hsl(210,25%,68%)", fontSize: "17px", lineHeight: "1.65" }}>
            {subhead}
          </p>
        )}
        {ctas != null && ctas.length > 0 && (
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {ctas.map((cta) => {
              const primary = (cta.variant ?? "primary") === "primary";
              const style: CSSProperties = primary
                ? { background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "hsl(210,32%,10%)" }
                : { border: `1px solid rgba(${a.rgb},0.45)`, color: `rgb(${a.rgb})` };
              const cls = "rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-85 transition-opacity";
              return cta.external ? (
                <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
                  {cta.label}
                </a>
              ) : (
                <Link key={cta.label} href={cta.href} className={cls} style={style}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        )}
        {children != null && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
