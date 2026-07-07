import Image from "next/image";
import { ACCENTS, type ServiceKey } from "@/lib/accents";

/**
 * The Perry Academy credential, rendered as a first-class trust element.
 * This certification closed a real sale — it belongs next to the ask, big
 * enough to read, with a sentence explaining what it means.
 */

type Props = {
  size?: "hero" | "chip";
  service?: ServiceKey;
  /** Show the "View certificate" link (the actual certificate SVG) */
  showCertLink?: boolean;
};

const WORDING = "Perry Academy Certified — Perimenopause (2026)";
const EXPLAINER =
  "Perry is a leading perimenopause-education program for clinicians. This certification means dedicated, current training in the science and treatment of the menopause transition — not a weekend course.";

export function CredentialHero({ size = "hero", service = "hormone", showCertLink = false }: Props) {
  const a = ACCENTS[service];

  if (size === "chip") {
    return (
      <span
        className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
        style={{ border: `1px solid rgba(${a.rgb},0.35)`, background: "hsla(210,22%,22%,0.5)" }}
      >
        <Image src="/perry-academy-perimenopause-badge.png" alt="Perry Academy certification badge" width={28} height={28} className="object-contain" />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: `rgb(${a.rgb})` }}>
          {WORDING}
        </span>
      </span>
    );
  }

  return (
    <div
      className="mx-auto inline-flex max-w-xl flex-col items-center gap-3 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:gap-5 sm:text-left"
      style={{
        border: `1px solid rgba(${a.rgb},0.35)`,
        background: "hsla(210,22%,18%,0.65)",
        backdropFilter: "blur(14px)",
        boxShadow: `0 12px 40px rgba(${a.rgb},0.12)`,
      }}
    >
      <Image
        src="/perry-academy-perimenopause-badge.png"
        alt="Perry Academy perimenopause certification badge"
        width={72}
        height={72}
        className="object-contain shrink-0"
      />
      <div>
        <p className="text-sm font-black uppercase tracking-wider" style={{ color: `rgb(${a.rgb})` }}>
          {WORDING}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "hsl(210,25%,72%)" }}>
          {EXPLAINER}
          {showCertLink && (
            <>
              {" "}
              <a
                href="/perry-academy-perimenopause-certificate.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-semibold"
                style={{ color: `rgb(${a.rgb})` }}
              >
                View the certificate →
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
