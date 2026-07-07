"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic moment: the critical window itself — the argument that won the
 * talk, on the page. Copy sourced from (kiosk)/critical-window/deckContent.ts
 * scenes s04 (the window) and s10 (the receptor mechanism).
 */

const STOPS = [
  { label: "Late 30s", note: "Perimenopause can quietly begin", inWindow: false },
  { label: "Your 40s", note: "The window is open", inWindow: true },
  { label: "Last period (~51)", note: "Menopause — one single day", inWindow: true },
  { label: "+5–10 years", note: "The window is closing", inWindow: true },
  { label: "Beyond", note: "Receptors have changed — same key, different lock", inWindow: false },
];

export function CriticalWindowTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setInView(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* The band */}
      <div className="relative mt-2 pb-2">
        <div className="relative h-3 overflow-hidden rounded-full bg-white/8" style={{ background: "hsla(0,0%,100%,0.08)" }}>
          {/* the window: from ~20% to ~78% of the band */}
          <div
            className="absolute inset-y-0 rounded-full"
            style={{
              left: "20%",
              width: inView ? "58%" : "0%",
              background: "linear-gradient(90deg, hsl(331,95%,60%), hsl(271,74%,58%))",
              boxShadow: "0 0 24px hsla(331,80%,60%,0.5)",
              transition: "width 1.6s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STOPS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl border p-3"
              style={{
                borderColor: s.inWindow ? "hsla(331,80%,65%,0.35)" : "hsla(0,0%,100%,0.1)",
                background: s.inWindow ? "hsla(331,60%,30%,0.15)" : "hsla(222,45%,8%,0.35)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(12px)",
                transition: `all 0.6s ease-out ${0.3 + i * 0.18}s`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: s.inWindow ? "hsl(331,95%,78%)" : "hsl(210,25%,60%)" }}>
                {s.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The receptor mechanism (deck s10) */}
      <div
        className="mt-8 rounded-[28px] border border-white/10 p-6 lg:p-8"
        style={{
          background: "linear-gradient(135deg, hsla(331,60%,25%,0.25), hsla(271,60%,25%,0.2))",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease-out 1s",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(331,95%,78%)" }}>
          Why timing matters — the key and the lock
        </p>
        <p className="mt-3 text-xl font-bold text-white lg:text-2xl">
          Go long enough without estrogen, and the receptors themselves change.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Your cells carry receptors these hormones bind to — a key and a lock. But estrogen also{" "}
          <strong className="text-white">maintains those very receptors</strong>, so the longer it&apos;s gone, the
          more they degrade, get silenced, or malfunction — and the body slowly loses its ability to respond,{" "}
          <strong className="text-white">even if estrogen returns later</strong>. Reintroduce it early, while the
          receptors still work, and it does its job.
        </p>
        <p className="mt-4 text-sm font-semibold" style={{ color: "hsl(331,95%,78%)" }}>
          Being told to just &ldquo;deal with it&rdquo; is some of the most dangerous advice in medicine — waiting has a cost.
        </p>
      </div>
    </div>
  );
}
