"use client";

/**
 * Presenter remote + notes view — open this on your phone (over the laptop's hotspot) to drive
 * "The Critical Window" from the stage. Big NEXT/PREV taps advance the screen; you see the current
 * slide's speaker notes, a running timer, and a peek at the next slide. Syncs via local SSE.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { SCENES } from "../deckContent";

const INK_LIGHT = "#F5EFE6";
const ACCENT = "#5FB3AE"; // brighter teal for dark phone UI
const WARM = "#C76F4A";
const N = SCENES.length;

function label(scene: (typeof SCENES)[number]): string {
  return scene.headline || scene.bigText?.join(" ") || scene.navLabel;
}

export default function PresenterRemote() {
  const [idx, setIdx] = useState(0);
  const [connected, setConnected] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [showJump, setShowJump] = useState(false);
  const sendingRef = useRef(false);

  // Subscribe to the screen's state.
  useEffect(() => {
    let es: EventSource | null = null;
    try {
      es = new EventSource("/critical-window/api/remote/stream");
      es.onopen = () => setConnected(true);
      es.onerror = () => setConnected(false);
      es.addEventListener("state", (e) => {
        try {
          const s = JSON.parse((e as MessageEvent).data);
          if (typeof s.idx === "number") setIdx(s.idx);
        } catch {
          /* ignore */
        }
      });
    } catch {
      /* ignore */
    }
    return () => es?.close();
  }, []);

  // Tick the timer once a second while running.
  useEffect(() => {
    if (startedAt == null) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [startedAt]);

  const send = useCallback(async (body: { type: string; idx?: number }) => {
    if (sendingRef.current) return;
    sendingRef.current = true;
    try {
      await fetch("/critical-window/api/remote/cmd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      /* ignore */
    } finally {
      // brief debounce so a double-tap doesn't skip two slides
      setTimeout(() => { sendingRef.current = false; }, 220);
    }
  }, []);

  const next = useCallback(() => {
    if (startedAt == null) setStartedAt(Date.now());
    send({ type: "next" });
  }, [send, startedAt]);
  const prev = useCallback(() => send({ type: "prev" }), [send]);
  const goto = useCallback((i: number) => { send({ type: "goto", idx: i }); setShowJump(false); }, [send]);

  const elapsed = startedAt == null ? 0 : Math.floor((now - startedAt) / 1000);
  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  const scene = SCENES[idx] ?? SCENES[0];
  const nextScene = idx + 1 < N ? SCENES[idx + 1] : null;

  return (
    <main
      style={{
        position: "fixed", inset: 0, display: "flex", flexDirection: "column",
        background: "#0b1117", color: INK_LIGHT, fontFamily: "var(--font-inter), system-ui, sans-serif",
        userSelect: "none", WebkitUserSelect: "none", touchAction: "manipulation",
      }}
    >
      {/* Top bar: timer · connection · slide count */}
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: 26, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "0.02em" }}>{mmss}</span>
        <button
          onClick={() => { setStartedAt(null); setNow(Date.now()); }}
          style={{ fontSize: 12, fontWeight: 700, color: INK_LIGHT, opacity: 0.6, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "5px 10px" }}
        >
          reset
        </button>
        <span style={{ flex: 1 }} />
        <span aria-hidden style={{ width: 9, height: 9, borderRadius: 999, background: connected ? "#43c59e" : "#d8694a", boxShadow: connected ? "0 0 8px #43c59e" : "none" }} />
        <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.85, fontVariantNumeric: "tabular-nums" }}>{idx + 1} / {N}</span>
      </header>

      {/* Notes — the main reading area */}
      <section style={{ flex: 1, overflowY: "auto", padding: "16px 18px 8px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>
          {scene.eyebrow || scene.navLabel}
        </div>
        <h1 style={{ margin: "0 0 14px", fontSize: 22, fontWeight: 800, lineHeight: 1.15, color: INK_LIGHT }}>{label(scene)}</h1>
        <p style={{ margin: 0, whiteSpace: "pre-line", fontSize: 16, lineHeight: 1.5, color: "rgba(245,239,230,0.92)" }}>
          {scene.notes}
        </p>
      </section>

      {/* Next-slide peek */}
      {nextScene && (
        <button
          onClick={next}
          style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "10px 16px", margin: "0 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: INK_LIGHT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/deck/stills/${nextScene.still}.webp`} alt="" width={56} height={32} style={{ width: 56, height: 32, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
          <span style={{ minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: WARM }}>Next</span>
            <span style={{ display: "block", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nextScene.navLabel}</span>
          </span>
        </button>
      )}

      {/* Controls */}
      <footer style={{ display: "flex", gap: 10, padding: "12px 12px calc(12px + env(safe-area-inset-bottom))" }}>
        <button
          onClick={prev}
          style={{ flex: "0 0 30%", padding: "20px 0", borderRadius: 14, background: "rgba(255,255,255,0.09)", border: "none", color: INK_LIGHT, fontSize: 18, fontWeight: 700 }}
        >
          ‹ Back
        </button>
        <button
          onClick={next}
          style={{ flex: 1, padding: "20px 0", borderRadius: 14, background: ACCENT, border: "none", color: "#06231f", fontSize: 22, fontWeight: 800, letterSpacing: "0.02em" }}
        >
          Next ›
        </button>
      </footer>

      {/* Jump-to-slide */}
      <button
        onClick={() => setShowJump((v) => !v)}
        style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 700, color: INK_LIGHT, opacity: 0.55, background: "none", border: "none" }}
      >
        {showJump ? "▲ close" : "▼ jump"}
      </button>
      {showJump && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,13,20,0.97)", overflowY: "auto", padding: "16px 14px calc(16px + env(safe-area-inset-bottom))", zIndex: 10 }}>
          <button onClick={() => setShowJump(false)} style={{ display: "block", marginLeft: "auto", marginBottom: 8, fontSize: 14, fontWeight: 700, color: INK_LIGHT, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 12px" }}>Close</button>
          {SCENES.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => goto(i)}
              style={{ display: "flex", width: "100%", alignItems: "center", gap: 10, textAlign: "left", padding: "9px 8px", borderRadius: 8, background: i === idx ? "rgba(95,179,174,0.18)" : "none", border: "none", color: INK_LIGHT }}
            >
              <span style={{ width: 26, fontSize: 13, fontWeight: 700, color: i === idx ? ACCENT : "rgba(245,239,230,0.5)", fontVariantNumeric: "tabular-nums" }}>{i + 1}</span>
              <span style={{ fontSize: 15, fontWeight: i === idx ? 700 : 500 }}>{sc.navLabel}</span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
