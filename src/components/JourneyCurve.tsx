"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic moment: "Your hormones don't fade quietly. They lurch."
 * The three-phase journey curve (stable → chaos → lower baseline) draws
 * itself as it scrolls into view, followed by the three per-hormone
 * mini-graphs from the Critical Window talk. Copy sourced from
 * (kiosk)/critical-window/deckContent.ts scene s07.
 */

const SPARKS: { label: string; points: string; note: string; color: string }[] = [
  { label: "Progesterone", points: "0,16 30,18 55,20 80,30 110,46 140,58 170,66 180,68", note: "falls first → anxiety, broken sleep", color: "hsl(188,88%,64%)" },
  { label: "Estrogen", points: "0,40 14,18 26,46 40,8 54,52 68,22 82,58 96,30 110,60 124,34 138,66 152,44 166,70 180,50", note: "swings high then low — the chaos is what you feel", color: "hsl(331,95%,72%)" },
  { label: "Testosterone", points: "0,26 45,34 90,44 135,54 180,64", note: "slow age-related fade → libido, drive, muscle", color: "hsl(271,74%,65%)" },
];

const PHASES = [
  { label: "Stable", desc: "More consistent signaling", color: "hsl(188,88%,64%)" },
  { label: "Chaos", desc: "Sharp swings and crashes", color: "hsl(331,95%,72%)" },
  { label: "Lower baseline", desc: "A real physiologic shift", color: "hsl(271,74%,65%)" },
];

export function JourneyCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setInView(true),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const draw = (delay: number) =>
    ({
      strokeDasharray: 900,
      strokeDashoffset: inView ? 0 : 900,
      transition: `stroke-dashoffset 1.6s ease-out ${delay}s`,
    }) as const;

  return (
    <div ref={ref}>
      <div
        className="relative overflow-hidden rounded-[28px] border border-white/10 p-5"
        style={{ height: "280px", background: "linear-gradient(180deg, rgba(15,23,42,0.56), rgba(76,29,149,0.18))" }}
      >
        <div className="absolute inset-x-5 top-8 h-px bg-white/10" />
        <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
        <div className="absolute inset-x-5 bottom-10 h-px bg-white/10" />

        <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full">
          <path
            d="M20 120 C60 84, 96 82, 130 110 S200 154, 238 116 S304 78, 340 112"
            fill="none" stroke="hsla(188,88%,54%,0.9)" strokeWidth="5" strokeLinecap="round"
            style={draw(0)}
          />
          <path
            d="M340 112 C360 48, 380 180, 402 82 S450 190, 470 60 S520 176, 548 118"
            fill="none" stroke="hsla(331,95%,72%,0.95)" strokeWidth="6" strokeLinecap="round"
            style={draw(0.8)}
          />
          <path
            d="M548 118 C564 146, 578 154, 590 156"
            fill="none" stroke="hsla(271,74%,55%,0.9)" strokeWidth="5" strokeLinecap="round"
            style={draw(1.7)}
          />
        </svg>

        <div className="absolute bottom-5 left-5 right-5 grid gap-3 text-sm sm:grid-cols-3">
          {PHASES.map((p, i) => (
            <div
              key={p.label}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-3"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(10px)", transition: `all 0.6s ease-out ${0.5 + i * 0.45}s` }}
            >
              <p className="font-semibold" style={{ color: p.color }}>{p.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per-hormone mini graphs (deck s07) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {SPARKS.map((s, i) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(14px)", transition: `all 0.7s ease-out ${1.1 + i * 0.3}s` }}
          >
            <svg viewBox="0 0 180 76" className="h-14 w-full" aria-hidden="true">
              <polyline points={s.points} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm font-bold" style={{ color: s.color }}>{s.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
