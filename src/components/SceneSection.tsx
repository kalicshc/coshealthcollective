import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Full-bleed photographic scene — the "epic page" section language from the
 * women's hormone page and the homepage flythrough. A photo fills the
 * viewport-height section; a navy scrim keeps text readable; top/bottom
 * fades blend the scene into the dark page background.
 *
 * Scrim variants:
 *   "hero"   — steep diagonal for hero sections (text hard-left, no top fade
 *              so the photo meets the navbar)
 *   "side"   — 105deg diagonal, text left, photo breathing room right
 *   "radial" — centered vignette for centered content (reviews, final CTA)
 *
 * Use SCENE_H / SCENE_P as textShadow on headings / body sitting on the photo.
 */

export const SCENE_H = "0 2px 8px rgba(0,0,0,0.75), 0 8px 44px rgba(0,0,0,0.8)";
export const SCENE_P = "0 1px 4px rgba(0,0,0,0.85), 0 2px 16px rgba(0,0,0,0.9)";

const SCRIMS: Record<ScrimVariant, string> = {
  hero: "linear-gradient(100deg, hsla(222,45%,6%,0.97) 0%, hsla(222,45%,6%,0.92) 35%, hsla(222,45%,6%,0.68) 62%, hsla(222,45%,6%,0.4) 100%), linear-gradient(0deg, hsl(210,32%,8%) 0%, transparent 128px)",
  side: "linear-gradient(105deg, hsla(222,45%,6%,0.94) 0%, hsla(222,45%,6%,0.75) 45%, hsla(222,45%,6%,0.35) 80%, hsla(222,45%,6%,0.12) 100%)",
  radial: "radial-gradient(ellipse 80% 75% at 50% 55%, hsla(222,45%,6%,0.92) 0%, hsla(222,45%,6%,0.68) 60%, hsla(222,45%,6%,0.25) 100%)",
};

type ScrimVariant = "hero" | "side" | "radial";

type Props = {
  image: string;
  scrim?: ScrimVariant;
  minHeight?: string;
  /** Preload the image — set on the first scene of the page. */
  priority?: boolean;
  /** Extra classes on the inner content container (e.g. "text-center"). */
  contentClassName?: string;
  /** Widen/narrow the content column; default matches the interior scenes. */
  maxWidthClassName?: string;
  id?: string;
  /** Anchor href for a bouncing scroll-cue chevron pinned to the scene's bottom (heroes). */
  scrollCue?: string;
  children: ReactNode;
};

export function SceneSection({
  image,
  scrim = "side",
  minHeight = "88vh",
  priority = false,
  contentClassName = "",
  maxWidthClassName = "max-w-6xl",
  id,
  scrollCue,
  children,
}: Props) {
  const fades = scrim !== "hero";
  return (
    <section id={id} className="relative flex items-center overflow-hidden" style={{ minHeight }}>
      <Image src={image} alt="" fill priority={priority} className="object-cover" sizes="100vw" />
      <div className="pointer-events-none absolute inset-0" style={{ background: SCRIMS[scrim] }} />
      {fades && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, hsl(210,32%,8%), transparent)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, hsl(210,32%,8%), transparent)" }} />
        </>
      )}
      <div className={`relative z-10 mx-auto w-full ${maxWidthClassName} px-4 py-24 lg:px-8 ${contentClassName}`}>
        {children}
      </div>
      {scrollCue != null && (
        <a
          href={scrollCue}
          aria-label="Scroll for more"
          className="absolute inset-x-0 bottom-5 z-10 flex justify-center"
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border animate-bounce"
            style={{ borderColor: "rgba(255,255,255,0.25)", background: "hsla(222,45%,8%,0.55)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </a>
      )}
    </section>
  );
}

/** Uppercase kicker line above a scene/section heading, tinted to the page accent. */
export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  const style: CSSProperties | undefined = color ? { color } : undefined;
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${color ? "" : "text-fuchsia-100/80"}`} style={style}>
      {children}
    </p>
  );
}
