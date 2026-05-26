"use client";

/**
 * "The Critical Window" — cinematic fly-through presentation deck (v2, Journey Edition).
 *
 * Each beat is a FROZEN photoreal background with a LIGHT frosted-glass card carrying the
 * slide's text (deep-ink type on warm frosted glass — the deck's visual signature). Advancing
 * fades the glass out so the bare photo shows for a beat, then the background crossfades and
 * eases out of a slight zoom while the new glass fades in (~1.2s). Only the active still and its
 * neighbors are mounted, and all stills are JS-preloaded, so transitions stay smooth.
 *
 * Controls: → ↓ Space Enter PageDown / click = next · ← ↑ PageUp = prev · Home/End =
 * first/last · F = fullscreen · N = toggle speaker notes. Cursor + chrome auto-hide when idle.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { SCENES, type DeckScene, type GraphShape } from "./deckContent";

const STILLS = "/deck/stills";
// Transition timing (gentle zoom-in + glass fade). The outgoing glass fades out first so the
// photo is seen bare for a beat, then the background crossfades + eases from a slight zoom to
// rest, and the new glass fades in — ~1.2s end to end.
const BG_FADE_MS = 700;     // background opacity crossfade
const BG_ZOOM_MS = 1200;    // background scale ease (the "zoom into the photo")
const GLASS_OUT_MS = 470;   // glass fades out, holding briefly on the bare photo, before the swap
const GLASS_IN_DELAY = 450; // after the swap, let the new photo settle before the glass returns

// ── design tokens (build brief, Part 1) ────────────────────────────────────
const INK = "#1F2A2E";        // body text on light glass
const INK_LIGHT = "#F5EFE6";  // body text on dark glass
const ACCENT = "#2C5F5D";     // headlines, emphasis, accent lines (deep teal)
const WARM = "#C76F4A";       // secondary accent — used sparingly
const WARM_DEEP = "#6E2A12";  // deep burnt umber — legible warm text on light glass
const GLASS_LIGHT = "rgba(250,247,242,0.55)";
const GLASS_DARK = "rgba(31,42,46,0.45)";
const SOFT = "rgba(44,95,93,0.12)"; // subtle accent-tinted pill background

const TSOFT_DARK = "0 1px 2px rgba(0,0,0,0.45)"; // faint legibility lift for off-white on dark glass

// Bumped each time a slide finishes coming in; count-ups read it to (re)play on slide entry.
const PlayContext = createContext(0);

/** A number that rolls up from 0 to its target when its slide lands. Inherits surrounding style. */
function CountUp({ prefix, value, suffix, decimals }: { prefix: string; value: number; suffix: string; decimals: number }) {
  const gen = useContext(PlayContext);
  const [disp, setDisp] = useState(value);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setDisp(value); return; }
    let raf = 0;
    const dur = 850;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic — quick, then settles
      setDisp(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisp(value);
    };
    setDisp(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [gen, value]);
  return <>{prefix}{disp.toFixed(decimals)}{suffix}</>;
}

// "~75%" / "+2.9%" / "84%" / "3×" → static prefix, rolling number, static suffix.
function parseCountUp(content: string): { prefix: string; value: number; suffix: string; decimals: number } | null {
  const m = content.match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, value: parseFloat(num), suffix, decimals };
}

/** Inner text: turns {{42%}} tokens into animated count-ups; everything else passes through. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("{{") && p.endsWith("}}")) {
          const c = parseCountUp(p.slice(2, -2));
          if (c) return <CountUp key={i} {...c} />;
          return <span key={i}>{p.slice(2, -2)}</span>;
        }
        return p ? <span key={i}>{p}</span> : null;
      })}
    </>
  );
}

/** Render text with **bold** and *emphasis* spans (both in the accent color), plus {{n}} count-ups.
 *  No italics, per the design rules. */
function Rich({ text, accent }: { text: string; accent: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return <strong key={i} style={{ fontWeight: 800, color: accent }}><Inline text={p.slice(2, -2)} /></strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
          return <span key={i} style={{ color: accent, fontWeight: 600 }}><Inline text={p.slice(1, -1)} /></span>;
        return <Inline key={i} text={p} />;
      })}
    </>
  );
}

/** Small hand-drawn-feel sparkline for the S7 hormone graphs. */
function Spark({ shape, color }: { shape: GraphShape; color: string }) {
  const pts: Record<GraphShape, string> = {
    chaotic: "0,40 14,18 26,46 40,8 54,52 68,22 82,58 96,30 110,60 124,34 138,66 152,44 166,70 180,50",
    declineEarly: "0,16 30,18 55,20 80,30 110,46 140,58 170,66 180,68",
    declineGradual: "0,26 45,34 90,44 135,54 180,64",
  };
  return (
    <svg viewBox="0 0 180 80" width="100%" height="70" preserveAspectRatio="none" aria-hidden>
      <line x1="0" y1="79" x2="180" y2="79" stroke="rgba(31,42,46,0.18)" strokeWidth="1" />
      <polyline className="cwl-spark" points={pts[shape]} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function SlideBody({ s }: { s: DeckScene }) {
  const dark = s.glass === "dark";
  const fg = dark ? INK_LIGHT : INK;
  const sh = dark ? TSOFT_DARK : "none";
  const centered = s.kind === "title" || s.kind === "statement" || s.panel === "center";

  const Eyebrow = s.eyebrow ? (
    <div className="cwl-stg" style={{ transitionDelay: "20ms", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, justifyContent: centered ? "center" : "flex-start" }}>
      <span style={{ width: 34, height: 2, background: ACCENT }} />
      <span style={{ fontSize: "clamp(11px,1vw,14px)", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>{s.eyebrow}</span>
    </div>
  ) : null;

  const Footnote = s.footnote ? (
    <p className="cwl-stg" style={{ transitionDelay: "420ms", marginTop: 24, fontSize: "clamp(0.9rem,1.15vw,1.15rem)", lineHeight: 1.45, color: ACCENT, fontWeight: 500, maxWidth: 720, marginLeft: centered ? "auto" : 0, marginRight: centered ? "auto" : 0, textShadow: sh }}>
      <Rich text={s.footnote} accent={ACCENT} />
    </p>
  ) : null;

  const Headline = s.headline ? (
    <h2 className="cwl-stg" style={{ transitionDelay: "80ms", color: ACCENT, fontSize: "clamp(1.7rem,3.2vw,3rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.01em", marginBottom: 24, textAlign: centered ? "center" : "left", textShadow: sh }}>
      {s.headline}
    </h2>
  ) : null;

  switch (s.kind) {
    case "title":
      return (
        <div style={{ textAlign: "left" }}>
          <h1 className="cwl-stg" style={{ transitionDelay: "60ms", color: fg, fontSize: "clamp(3rem,6.4vw,5.4rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.025em", textShadow: sh }}>
            {s.headline}
          </h1>
          {s.subhead && (
            <p className="cwl-stg" style={{ transitionDelay: "200ms", marginTop: 20, fontSize: "clamp(1.2rem,2vw,1.9rem)", fontWeight: 500, fontStyle: "normal", color: ACCENT, textShadow: sh }}>
              {s.subhead}
            </p>
          )}
          {/* Brand lockup — mirrors the site header (logo + Colorado Springs / Health Collective),
              adapted to ink-on-glass, with the presenter name beneath. */}
          <div className="cwl-stg" style={{ transitionDelay: "340ms", marginTop: 40, display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-main.png" alt="Colorado Springs Health Collective" width={54} height={54} style={{ width: 54, height: 54, objectFit: "contain", flexShrink: 0 }} />
            <div style={{ lineHeight: 1.18 }}>
              <div style={{ fontSize: "clamp(10px,0.95vw,12px)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>Colorado Springs</div>
              <div style={{ fontSize: "clamp(1rem,1.35vw,1.25rem)", fontWeight: 800, color: fg, textShadow: sh }}>Health Collective</div>
              <div style={{ fontSize: "clamp(0.74rem,0.95vw,0.92rem)", fontWeight: 500, color: fg, opacity: 0.8, marginTop: 4, textShadow: sh }}>Logan Crist, PA-C</div>
            </div>
          </div>
        </div>
      );

    case "statement":
      return (
        <div style={{ textAlign: "center", maxWidth: 1000 }}>
          {Eyebrow}
          <div className="cwl-stg" style={{ transitionDelay: "70ms" }}>
            {s.bigText?.map((line, i) => (
              <p key={i} style={{ color: fg, fontSize: "clamp(2rem,4.4vw,4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", textTransform: s.allCaps ? "uppercase" : "none", textShadow: sh }}>
                {line}
              </p>
            ))}
          </div>
          {s.subhead && (
            <p className="cwl-stg" style={{ transitionDelay: "240ms", marginTop: 24, fontSize: "clamp(1.05rem,1.6vw,1.5rem)", fontWeight: 500, color: ACCENT, maxWidth: 820, marginLeft: "auto", marginRight: "auto", whiteSpace: "pre-line", lineHeight: 1.4, textShadow: sh }}>
              <Rich text={s.subhead} accent={ACCENT} />
            </p>
          )}
          {Footnote}
        </div>
      );

    case "labelValue":
      return (
        <div style={{ maxWidth: 760, width: "100%" }}>
          {Headline}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {s.labelValue!.map((r, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${180 + j * 110}ms` }}>
                <div style={{ fontSize: "clamp(11px,0.95vw,14px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: "clamp(1.3rem,2.2vw,2rem)", fontWeight: 800, color: fg, lineHeight: 1.15, textShadow: sh }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "bullets": {
      const marker = (j: number) => {
        if (s.bulletStyle === "check")
          return <span style={{ flexShrink: 0, color: ACCENT, fontWeight: 800, fontSize: "1.15em", lineHeight: 1.3 }}>✓</span>;
        if (s.bulletStyle === "square")
          return <span style={{ marginTop: "0.5em", width: 12, height: 12, flexShrink: 0, background: ACCENT }} />;
        return <span key={j} style={{ marginTop: "0.55em", width: 10, height: 10, borderRadius: 999, flexShrink: 0, background: ACCENT }} />;
      };
      return (
        <div style={{ maxWidth: 860 }}>
          {Headline}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {s.bullets!.map((b, j) => (
              <li key={j} className="cwl-stg" style={{ transitionDelay: `${160 + j * 80}ms`, display: "flex", alignItems: "flex-start", gap: 16, fontSize: "clamp(1.1rem,1.6vw,1.45rem)", color: fg, lineHeight: 1.35, textShadow: sh }}>
                {marker(j)}
                <span><Rich text={b} accent={ACCENT} /></span>
              </li>
            ))}
          </ul>
          {s.footnote && (
            <>
              <div className="cwl-stg" style={{ transitionDelay: "440ms", height: 1, background: ACCENT, opacity: 0.4, margin: "24px 0 18px" }} />
              <p className="cwl-stg" style={{ transitionDelay: "480ms", fontSize: "clamp(0.95rem,1.2vw,1.2rem)", color: ACCENT, fontWeight: 500, lineHeight: 1.4, textShadow: sh }}>
                <Rich text={s.footnote} accent={ACCENT} />
              </p>
            </>
          )}
        </div>
      );
    }

    case "twoCol":
      return (
        <div style={{ maxWidth: 1000, width: "100%" }}>
          {Headline}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {s.twoCol!.map((c, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${180 + j * 130}ms`, padding: "24px 26px", borderRadius: 16, background: "rgba(255,255,255,0.28)", border: `1px solid ${ACCENT}55` }}>
                <div style={{ fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontWeight: 800, color: ACCENT, marginBottom: 12, textAlign: "center" }}>{c.term}</div>
                {c.lines.map((ln, k) => (
                  <div key={k} style={{ fontSize: k === 0 ? "clamp(1.2rem,1.7vw,1.6rem)" : "clamp(0.95rem,1.2vw,1.15rem)", fontWeight: k === 0 ? 700 : 400, color: fg, lineHeight: 1.3, textAlign: "center", marginTop: k === 0 ? 0 : 8, textShadow: sh }}>{ln}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    case "graphs":
      return (
        <div style={{ maxWidth: 1050, width: "100%" }}>
          {Headline}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {s.graphs!.map((g, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${180 + j * 120}ms`, padding: "14px 18px 12px", borderRadius: 16, background: "rgba(255,255,255,0.28)", border: `1px solid ${ACCENT}33` }}>
                <Spark shape={g.shape} color={ACCENT} />
                <div style={{ marginTop: 8, fontSize: "clamp(1rem,1.3vw,1.2rem)", fontWeight: 800, color: ACCENT }}>{g.label}</div>
                <div style={{ fontSize: "clamp(0.85rem,1.05vw,1rem)", color: fg, opacity: 0.85, textShadow: sh }}>{g.note}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "columns":
      return (
        <div style={{ maxWidth: 1150, width: "100%" }}>
          {Headline}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${s.columns!.length}, minmax(0,1fr))`, gap: 18 }}>
            {s.columns!.map((c, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${160 + j * 90}ms` }}>
                <div style={{ fontSize: "clamp(0.95rem,1.25vw,1.2rem)", fontWeight: 800, color: ACCENT, marginBottom: 12, paddingBottom: 8, borderBottom: `2px solid ${ACCENT}88` }}>{c.header}</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {c.items.map((it, k) => (
                    <li key={k} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "clamp(0.9rem,1.2vw,1.15rem)", color: fg, lineHeight: 1.3, textShadow: sh }}>
                      <span style={{ marginTop: "0.5em", width: 6, height: 6, borderRadius: 999, flexShrink: 0, background: ACCENT }} aria-hidden />
                      <span><Rich text={it} accent={ACCENT} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {s.band && (
            <div className="cwl-stg" style={{ transitionDelay: "480ms", marginTop: 24, padding: "14px 20px", borderRadius: 12, background: SOFT, fontSize: "clamp(0.95rem,1.25vw,1.2rem)", color: fg, lineHeight: 1.4, textShadow: sh }}>
              <Rich text={s.band} accent={ACCENT} />
            </div>
          )}
        </div>
      );

    case "table":
      return (
        <div style={{ maxWidth: 1100, width: "100%" }}>
          {Headline}
          {s.callout && (
            <div className="cwl-stg" style={{ transitionDelay: "140ms", display: "inline-block", marginBottom: 18, padding: "8px 16px", borderRadius: 999, background: SOFT, fontSize: "clamp(0.82rem,1vw,1rem)", color: fg, fontWeight: 500, textShadow: sh }}>
              {s.callout}
            </div>
          )}
          <div className="cwl-stg" style={{ transitionDelay: "180ms", display: "grid", gridTemplateColumns: `repeat(${s.table!.headers.length}, minmax(0,1fr))`, gap: "0 24px" }}>
            {s.table!.headers.map((h, j) => (
              <div key={`h${j}`} style={{ fontSize: "clamp(0.9rem,1.2vw,1.15rem)", fontWeight: 800, color: ACCENT, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}88` }}>{h}</div>
            ))}
            {s.table!.rows.map((row, r) =>
              row.map((cell, c) => (
                <div key={`${r}-${c}`} style={{ fontSize: "clamp(0.92rem,1.2vw,1.18rem)", color: fg, opacity: c === 0 ? 1 : 0.85, fontWeight: c === 0 ? 600 : 400, padding: "12px 0", borderBottom: `1px solid ${dark ? "rgba(245,239,230,0.15)" : "rgba(31,42,46,0.12)"}`, lineHeight: 1.3, textShadow: sh }}>{cell}</div>
              )),
            )}
          </div>
          {s.band && (
            <div className="cwl-stg" style={{ transitionDelay: "320ms", display: "flex", alignItems: "center", gap: 14, margin: "20px 0 8px" }}>
              <span style={{ flex: 1, height: 1, background: `${ACCENT}55` }} />
              <span style={{ fontSize: "clamp(0.82rem,1vw,1rem)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: ACCENT, whiteSpace: "nowrap" }}>{s.band}</span>
              <span style={{ flex: 1, height: 1, background: `${ACCENT}55` }} />
            </div>
          )}
          {s.table2 && (
            <div className="cwl-stg" style={{ transitionDelay: "380ms", display: "grid", gridTemplateColumns: `repeat(${s.table2.headers.length}, minmax(0,1fr))`, gap: "0 24px" }}>
              {s.table2.headers.map((h, j) => (
                <div key={`h2${j}`} style={{ fontSize: "clamp(0.9rem,1.2vw,1.15rem)", fontWeight: 800, color: ACCENT, paddingBottom: 10, borderBottom: `2px solid ${ACCENT}88` }}>{h}</div>
              ))}
              {s.table2.rows.map((row, r) =>
                row.map((cell, c) => (
                  <div key={`t2-${r}-${c}`} style={{ fontSize: "clamp(0.92rem,1.2vw,1.18rem)", color: fg, opacity: c === 0 ? 1 : 0.85, fontWeight: c === 0 ? 600 : 400, padding: "12px 0", borderBottom: `1px solid ${dark ? "rgba(245,239,230,0.15)" : "rgba(31,42,46,0.12)"}`, lineHeight: 1.3, textShadow: sh }}>{cell}</div>
                )),
              )}
            </div>
          )}
          {Footnote}
        </div>
      );

    case "markerList":
      return (
        <div style={{ maxWidth: 920, width: "100%" }}>
          {Eyebrow}{Headline}
          {s.subAccent && (
            <p className="cwl-stg" style={{ transitionDelay: "110ms", textAlign: centered ? "center" : "left", color: WARM_DEEP, fontWeight: 700, fontSize: "clamp(1.05rem,1.65vw,1.5rem)", lineHeight: 1.25, marginBottom: s.subhead ? 10 : 22, textShadow: sh }}>
              <Rich text={s.subAccent} accent={WARM_DEEP} />
            </p>
          )}
          {s.subhead && (
            <p className="cwl-stg" style={{ transitionDelay: "150ms", textAlign: centered ? "center" : "left", color: fg, fontSize: "clamp(0.95rem,1.3vw,1.2rem)", lineHeight: 1.4, marginBottom: 22, maxWidth: 820, marginLeft: centered ? "auto" : 0, marginRight: centered ? "auto" : 0, textShadow: sh }}>
              <Rich text={s.subhead} accent={ACCENT} />
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {s.markerList!.map((m, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${170 + j * 80}ms`, display: "flex", alignItems: "baseline", gap: 16 }}>
                <span style={{ fontSize: "clamp(1.05rem,1.5vw,1.4rem)", fontWeight: 800, color: ACCENT, minWidth: "clamp(120px,15vw,190px)", flexShrink: 0 }}>{m.label}</span>
                <span style={{ fontSize: "clamp(0.98rem,1.35vw,1.25rem)", color: fg, lineHeight: 1.35, textShadow: sh }}><Rich text={m.text} accent={ACCENT} /></span>
              </div>
            ))}
          </div>
          {Footnote}
        </div>
      );

    case "rules":
      return (
        <div style={{ maxWidth: 760, width: "100%" }}>
          {Headline}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {s.rules!.map((r, j) => (
              <div key={j} className="cwl-stg" style={{ transitionDelay: `${170 + j * 100}ms`, display: "flex", alignItems: "baseline", gap: 18 }}>
                <span style={{ fontSize: "clamp(2.2rem,3.6vw,3.2rem)", fontWeight: 800, color: ACCENT, lineHeight: 0.9, flexShrink: 0 }}>{r.n}</span>
                <span>
                  <span style={{ fontSize: "clamp(1.15rem,1.7vw,1.6rem)", fontWeight: 700, color: fg, textShadow: sh }}>{r.title}</span>{" "}
                  <span style={{ fontSize: "clamp(0.95rem,1.25vw,1.2rem)", color: fg, opacity: 0.9, lineHeight: 1.35, textShadow: sh }}><Rich text={r.body} accent={ACCENT} /></span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "numbered":
      return (
        <div style={{ maxWidth: 940, width: "100%" }}>
          {Headline}
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {s.numbered!.map((n, j) => (
              <li key={j} className="cwl-stg" style={{ transitionDelay: `${170 + j * 90}ms`, display: "flex", alignItems: "flex-start", gap: 18, fontSize: "clamp(1.05rem,1.55vw,1.45rem)", color: fg, lineHeight: 1.38, textShadow: sh }}>
                <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.05rem", color: "#fff", background: ACCENT }}>{j + 1}</span>
                <span style={{ paddingTop: 4 }}><Rich text={n} accent={ACCENT} /></span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "qr":
      return <QrSlide s={s} fg={fg} sh={sh} />;

    default:
      return null;
  }
}

function QrSlide({ s, fg, sh }: { s: DeckScene; fg: string; sh: string }) {
  // Main site QR plus any social QRs, generated together.
  const codes = useMemo(
    () =>
      s.qr
        ? [
            { label: "Website & booking", url: s.qr.url },
            ...(s.qr.socials ?? []),
          ]
        : [],
    [s.qr],
  );
  const [urls, setUrls] = useState<Record<string, string>>({});
  useEffect(() => {
    let off = false;
    Promise.all(
      codes.map((c) =>
        QRCode.toDataURL(c.url, { margin: 1, width: 520, color: { dark: INK, light: "#ffffff" } })
          .then((d) => [c.url, d] as const)
          .catch(() => [c.url, ""] as const),
      ),
    ).then((pairs) => { if (!off) setUrls(Object.fromEntries(pairs)); });
    return () => { off = true; };
  }, [codes]);

  const primary = codes[0];
  const socials = codes.slice(1);
  const card = (url: string, label: string, size: number, delay: number) => (
    <div className="cwl-stg" style={{ transitionDelay: `${delay}ms`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
      {urls[url] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={urls[url]} alt={`${label} QR code`} width={size} height={size} style={{ width: size, height: "auto", borderRadius: 14, border: `3px solid ${ACCENT}`, boxShadow: "0 14px 40px rgba(0,0,0,0.22)" }} />
      ) : (
        <div style={{ width: size, height: size, borderRadius: 14, background: "rgba(255,255,255,0.4)" }} />
      )}
      <span style={{ fontSize: "clamp(0.72rem,0.95vw,0.9rem)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: ACCENT, textShadow: sh }}>{label}</span>
    </div>
  );

  return (
    <div style={{ width: "100%", maxWidth: 1100, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      {/* Brand lockup — mirrors the title slide (logo + Colorado Springs / Health Collective). */}
      <div className="cwl-stg" style={{ transitionDelay: "80ms", display: "flex", alignItems: "center", gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-main.png" alt="Colorado Springs Health Collective" width={50} height={50} style={{ width: 50, height: 50, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ lineHeight: 1.18, textAlign: "left" }}>
          <div style={{ fontSize: "clamp(10px,0.95vw,12px)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>Colorado Springs</div>
          <div style={{ fontSize: "clamp(1rem,1.35vw,1.25rem)", fontWeight: 800, color: fg, textShadow: sh }}>Health Collective</div>
          <div style={{ fontSize: "clamp(0.74rem,0.95vw,0.92rem)", fontWeight: 500, color: fg, opacity: 0.8, marginTop: 2, textShadow: sh }}>Logan Crist, PA-C</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ flex: 1, minWidth: 300, textAlign: "left" }}>
          <h2 className="cwl-stg" style={{ transitionDelay: "160ms", color: ACCENT, fontSize: "clamp(1.4rem,2.4vw,2.2rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: 20, textShadow: sh }}>{s.headline}</h2>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {s.qr!.takeaways.map((t, j) => (
              <li key={j} className="cwl-stg" style={{ transitionDelay: `${240 + j * 100}ms`, display: "flex", gap: 14, alignItems: "flex-start", fontSize: "clamp(1rem,1.4vw,1.3rem)", color: fg, lineHeight: 1.35, textShadow: sh }}>
                <span style={{ flexShrink: 0, fontWeight: 800, color: ACCENT }}>{j + 1}.</span>
                <span><Rich text={t} accent={ACCENT} /></span>
              </li>
            ))}
          </ol>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, flexShrink: 0 }}>
          {primary && card(primary.url, primary.label, 196, 120)}
          {socials.length > 0 && (
            <div style={{ display: "flex", gap: 22 }}>
              {socials.map((c, i) => card(c.url, c.label, 116, 300 + i * 90))}
            </div>
          )}
        </div>
      </div>
      {s.footer && (
        <p className="cwl-stg" style={{ transitionDelay: "640ms", textAlign: "center", fontSize: "clamp(0.78rem,1vw,0.95rem)", color: fg, opacity: 0.82, textShadow: sh }}>{s.footer}</p>
      )}
    </div>
  );
}

// Ambient drifting light motes behind the glass — soft, slow, auto-playing depth on every slide.
// Reads as stars/snow on the night scenes and dust-in-light on the day ones. Honors reduced-motion.
function Motes() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = performance.now();
    const motes = Array.from({ length: 28 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.6 + Math.random() * 1.7,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: -0.00004 - Math.random() * 0.0001,
      a: 0.06 + Math.random() * 0.2,
      tw: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const frame = (t: number) => {
      const dt = Math.min(t - last, 50); last = t;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx * dt; m.y += m.vy * dt; m.tw += 0.0012 * dt;
        if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
        if (m.x < -0.05) m.x = 1.05; else if (m.x > 1.05) m.x = -0.05;
        const tw = 0.6 + 0.4 * Math.sin(m.tw);
        const px = m.x * w, py = m.y * h, rr = m.r * 4;
        const g = ctx.createRadialGradient(px, py, 0, px, py, rr);
        g.addColorStop(0, `rgba(255,250,240,${m.a * tw})`);
        g.addColorStop(1, "rgba(255,250,240,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, rr, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />;
}

// Fullscreen toggle that also works in Safari (which still uses webkit-prefixed APIs).
function toggleFullscreen(el: HTMLElement | null) {
  const d = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
  const e = el as (HTMLElement & { webkitRequestFullscreen?: () => void }) | null;
  if (d.fullscreenElement || d.webkitFullscreenElement) {
    (d.exitFullscreen || d.webkitExitFullscreen)?.call(d);
  } else if (e) {
    (e.requestFullscreen || e.webkitRequestFullscreen)?.call(e);
  }
}

// Map panel position → outer flex alignment + glass max width.
function panelLayout(s: DeckScene): { justify: string; align: string; maxW: string } {
  switch (s.panel) {
    case "left": return { justify: "flex-start", align: "center", maxW: "min(680px, 48vw)" };
    case "right": return { justify: "flex-end", align: "center", maxW: "min(720px, 52vw)" };
    case "bottom": return { justify: "center", align: "flex-end", maxW: "min(1180px, 94vw)" };
    case "center":
    default: return { justify: "center", align: "center", maxW: "min(1080px, 90vw)" };
  }
}

export default function CriticalWindowDeck() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(true);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);
  const [playGen, setPlayGen] = useState(0); // bumps when a slide finishes entering → replays count-ups
  const rootRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const animatingRef = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const N = SCENES.length;

  // Decode every still once up front so background swaps paint instantly (no half-loaded flash).
  useEffect(() => {
    SCENES.forEach((sc) => { const img = new Image(); img.src = `${STILLS}/${sc.still}.webp`; });
  }, []);

  // When a slide finishes entering (glass shown), bump the play generation so count-ups animate.
  useEffect(() => { if (shown) setPlayGen((g) => g + 1); }, [shown]);

  // Advance/retreat: fade the glass out (revealing the bare photo for a beat), swap the still
  // (it crossfades + eases out of a slight zoom), then fade the new glass in. ~1.2s total.
  const goTo = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(N - 1, next));
      if (target === idxRef.current || animatingRef.current) return;
      animatingRef.current = true;
      setShown(false); // glass (panel + text) fades out
      window.setTimeout(() => {
        idxRef.current = target;
        setIdx(target); // background crossfades + zooms to the new still
        window.setTimeout(() => {
          setShown(true); // new glass fades in over the settling photo
          animatingRef.current = false;
        }, GLASS_IN_DELAY);
      }, GLASS_OUT_MS);
    },
    [N],
  );

  // Single "next beat" / "previous" entry points shared by keyboard, click, and the phone remote.
  // (When incremental reveals land, the per-slide step logic hooks in here.)
  const advance = useCallback(() => goTo(idxRef.current + 1), [goTo]);
  const retreat = useCallback(() => goTo(idxRef.current - 1), [goTo]);

  // Phone remote (local SSE): publish our slide to the presenter view, and act on its taps.
  useEffect(() => {
    fetch("/critical-window/api/remote/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idx, total: N }),
    }).catch(() => {});
  }, [idx, N]);

  useEffect(() => {
    let es: EventSource | null = null;
    try {
      es = new EventSource("/critical-window/api/remote/stream");
      es.addEventListener("cmd", (e) => {
        try {
          const c = JSON.parse((e as MessageEvent).data);
          if (c.type === "next") advance();
          else if (c.type === "prev") retreat();
          else if (c.type === "goto" && typeof c.idx === "number") goTo(c.idx);
        } catch {
          /* ignore */
        }
      });
    } catch {
      /* EventSource unavailable — deck still works standalone */
    }
    return () => es?.close();
  }, [advance, retreat, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter":
          e.preventDefault(); advance(); break;
        case "ArrowLeft": case "ArrowUp": case "PageUp":
          e.preventDefault(); retreat(); break;
        case "Home": e.preventDefault(); goTo(0); break;
        case "End": e.preventDefault(); goTo(N - 1); break;
        case "n": case "N": e.preventDefault(); setNotesVisible((v) => !v); break;
        case "f": case "F":
        case "Home": e.preventDefault(); goTo(0); break;
        case "End": e.preventDefault(); goTo(N - 1); break;
        case "n": case "N": e.preventDefault(); setNotesVisible((v) => !v); break;
        case "f": case "F":
          e.preventDefault();
          toggleFullscreen(rootRef.current);
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, goTo, N]);

  useEffect(() => {
    function wake() {
      setChromeVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setChromeVisible(false), 2600);
    }
    wake();
    window.addEventListener("mousemove", wake);
    return () => {
      window.removeEventListener("mousemove", wake);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const onStageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    advance();
  };

  const scene = SCENES[idx];
  const dark = scene.glass === "dark";
  const { justify, align, maxW } = panelLayout(scene);
  const showFooter = !scene.suppressFooter;

  return (
    <div
      ref={rootRef}
      onClick={onStageClick}
      className="cwl-root"
      style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#05080d", cursor: chromeVisible ? "default" : "none", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <style>{`
        .cwl-stg { opacity: 0; transform: translateY(18px); transition: opacity .42s cubic-bezier(.22,1,.36,1), transform .48s cubic-bezier(.22,1,.36,1); }
        .cwl-shown .cwl-stg { opacity: 1; transform: translateY(0); }
        .cwl-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transform: scale(1.06);
                  transition: opacity ${BG_FADE_MS}ms ease, transform ${BG_ZOOM_MS}ms cubic-bezier(.16,.84,.44,1); }
        .cwl-bg.cwl-active { opacity: 1; transform: scale(1); will-change: transform; }
        .cwl-nav { opacity: 0; transition: opacity .4s; }
        .cwl-nav.show { opacity: .38; }
        .cwl-nav:hover { opacity: 1; }
        .cwl-navitem { position: relative; display: block; background: none; border: none; padding: 3px; cursor: pointer; line-height: 0; }
        .cwl-navtick { display: block; border-radius: 999px; transition: transform .18s ease, background .18s ease; }
        .cwl-navitem:hover .cwl-navtick { transform: scale(1.7); }
        .cwl-navlabel { position: absolute; left: 18px; top: 50%; transform: translateY(-50%) translateX(-6px); opacity: 0; transition: opacity .16s ease, transform .16s ease; white-space: nowrap; font-size: 12px; font-weight: 600; letter-spacing: .01em; color: #fff; background: rgba(8,13,20,0.72); padding: 4px 10px; border-radius: 7px; pointer-events: none; box-shadow: 0 2px 12px rgba(0,0,0,0.45); backdrop-filter: blur(4px); }
        .cwl-navitem:hover .cwl-navlabel { opacity: 1; transform: translateY(-50%) translateX(0); }
        .cwl-spark { stroke-dasharray: 640; stroke-dashoffset: 640; }
        .cwl-shown .cwl-spark { stroke-dashoffset: 0; transition: stroke-dashoffset 1.05s cubic-bezier(.22,1,.36,1) .2s; }
      `}</style>

      {/* Background stack — only the active still and its immediate neighbors are mounted, so the
          compositor handles ~3 layers (not all 31). Stills are JS-preloaded, so swaps paint clean. */}
      {SCENES.map((sc, i) =>
        Math.abs(i - idx) <= 1 ? (
          <div key={sc.id} className={`cwl-bg${i === idx ? " cwl-active" : ""}`} style={{ backgroundImage: `url('${STILLS}/${sc.still}.webp')` }} aria-hidden />
        ) : null,
      )}

      {/* Ambient drifting motes behind the glass (depth; auto-plays). */}
      <Motes />

      {/* Subtle left-edge slide navigator — one tick per slide; click to jump. Fades with chrome,
          brightens on hover. Active tick is the warm accent, slightly larger. */}
      <nav
        className={`cwl-nav${chromeVisible ? " show" : ""}`}
        aria-label="Slides"
        style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 5, alignItems: "center" }}
      >
        {SCENES.map((sc, i) => (
          <button
            key={sc.id}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${sc.navLabel}`}
            aria-current={i === idx ? "true" : undefined}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="cwl-navitem"
          >
            <span
              className="cwl-navtick"
              style={{ width: i === idx ? 9 : 6, height: i === idx ? 9 : 6, background: i === idx ? WARM : "rgba(255,255,255,0.6)", boxShadow: "0 0 3px rgba(0,0,0,0.5)" }}
            />
            <span className="cwl-navlabel">{i + 1}. {sc.navLabel}</span>
          </button>
        ))}
      </nav>

      {/* Glass card + content — panel hugs the photo's composed negative space (see panel pos).
          The whole panel fades out/in (not just the text), so the bare photo shows between slides. */}
      <div
        className={shown ? "cwl-shown" : ""}
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: align, justifyContent: justify, padding: "clamp(32px,6vh,80px) clamp(32px,7vw,120px)", opacity: shown ? 1 : 0, transition: "opacity .4s ease", zIndex: 3 }}
      >
        <div
          style={{
            position: "relative", width: "auto", maxWidth: maxW, maxHeight: "86vh", overflow: "hidden",
            padding: "clamp(32px,3vw,52px) clamp(34px,3.6vw,56px)", borderRadius: 24,
            background: dark ? GLASS_DARK : GLASS_LIGHT,
            backdropFilter: "blur(28px) saturate(140%)",
            WebkitBackdropFilter: "blur(28px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 20px 60px rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <PlayContext.Provider value={playGen}>
            <SlideBody s={scene} />
          </PlayContext.Provider>

          {/* n / 26 pill inside the glass, bottom-right (hidden on moment slides). */}
          {showFooter && (
            <span style={{ position: "absolute", bottom: 14, right: 18, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: ACCENT, opacity: 0.75, fontVariantNumeric: "tabular-nums" }}>
              {idx + 1} / {N}
            </span>
          )}
        </div>
      </div>

      {/* Presenter progress bar */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(255,255,255,0.12)", opacity: chromeVisible ? 1 : 0, transition: "opacity .4s" }}>
        <div style={{ height: "100%", width: `${((idx + 1) / N) * 100}%`, background: WARM, transition: "width .5s ease" }} />
      </div>

      {/* Fullscreen toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleFullscreen(rootRef.current); }}
        aria-label="Toggle fullscreen"
        style={{ position: "absolute", bottom: 16, right: 18, opacity: chromeVisible ? 1 : 0, transition: "opacity .4s", pointerEvents: chromeVisible ? "auto" : "none", cursor: "pointer", padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "rgba(8,13,20,0.5)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}
      >
        ⤢ Fullscreen
      </button>

      {/* Speaker-notes overlay (press N) */}
      {notesVisible && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "42vh", overflowY: "auto", padding: "20px clamp(24px,5vw,80px) 28px", background: "linear-gradient(to top, rgba(5,8,13,0.96), rgba(5,8,13,0.82))", color: "#e9eef2", borderTop: `2px solid ${ACCENT}`, backdropFilter: "blur(8px)" }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Slide {idx + 1} / {N} · {scene.navLabel} · press N to hide
          </div>
          <p style={{ margin: 0, fontSize: "clamp(0.9rem,1.05vw,1.05rem)", lineHeight: 1.5, whiteSpace: "pre-line" }}>{scene.notes}</p>
        </div>
      )}
    </div>
  );
}
