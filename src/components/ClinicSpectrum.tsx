"use client";

type ClinicKey = "dpc" | "hormone" | "hyperbaric";

type SpectrumClinic = {
  key: ClinicKey;
  peak: number;
  rgb: [number, number, number];
};

// Peaks line up with the centers of a 3-column tile grid below (≈ 1/6, 1/2, 5/6).
// RGB values match the accents used in ClinicAccordion so the wave's color at any
// X is the same hue as the tile sitting beneath it.
const CLINICS: SpectrumClinic[] = [
  { key: "dpc",        peak: 1 / 6,   rgb: [248, 202, 70] },
  { key: "hormone",    peak: 1 / 2,   rgb: [247, 130, 184] },
  { key: "hyperbaric", peak: 5 / 6,   rgb: [73, 217, 207] },
];

const NUM_BARS = 96;
const SIGMA = 0.16;
const BASE_HEIGHT = 12;
const PEAK_HEIGHT = 98;
const BASE_BRIGHT = 0.22;
const PEAK_BRIGHT = 1.0;

function bell(x: number, peak: number, sigma = SIGMA) {
  const d = x - peak;
  return Math.exp(-(d * d) / (2 * sigma * sigma));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAtX(x: number): [number, number, number] {
  const stops = CLINICS.map((c) => ({ x: c.peak, rgb: c.rgb }));
  if (x <= stops[0].x) return stops[0].rgb;
  if (x >= stops[stops.length - 1].x) return stops[stops.length - 1].rgb;
  for (let i = 0; i < stops.length - 1; i++) {
    if (x >= stops[i].x && x <= stops[i + 1].x) {
      const t = (x - stops[i].x) / (stops[i + 1].x - stops[i].x);
      return [
        lerp(stops[i].rgb[0], stops[i + 1].rgb[0], t),
        lerp(stops[i].rgb[1], stops[i + 1].rgb[1], t),
        lerp(stops[i].rgb[2], stops[i + 1].rgb[2], t),
      ];
    }
  }
  return stops[stops.length - 1].rgb;
}

function noise(i: number) {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export default function ClinicSpectrum({
  activeKey,
  onSelect,
}: {
  activeKey: ClinicKey;
  onSelect: (k: ClinicKey) => void;
}) {
  const active = CLINICS.find((c) => c.key === activeKey)!;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    let nearest: SpectrumClinic = CLINICS[0];
    let minDist = Math.abs(relX - CLINICS[0].peak);
    for (const c of CLINICS) {
      const d = Math.abs(relX - c.peak);
      if (d < minDist) {
        minDist = d;
        nearest = c;
      }
    }
    if (nearest.key !== activeKey) onSelect(nearest.key);
  }

  return (
    <div
      className="relative w-full select-none"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @keyframes spectrum-bar-breathe-up {
          0%, 100% { transform: scaleY(1);    opacity: 0.95; }
          50%      { transform: scaleY(0.84); opacity: 0.74; }
        }
        @keyframes spectrum-bar-shimmer {
          0%, 100% { filter: brightness(1)    saturate(1); }
          50%      { filter: brightness(1.18) saturate(1.15); }
        }
        .spectrum-bar-up {
          transform-origin: bottom center;
          animation:
            spectrum-bar-breathe-up 3.4s ease-in-out infinite,
            spectrum-bar-shimmer 5.2s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }
        @media (prefers-reduced-motion: reduce) {
          .spectrum-bar-up { animation: none !important; }
        }
      `}</style>

      <div
        className="relative w-full"
        style={{
          height: "clamp(210px, 24vw, 280px)",
          // dissolve into the page bg on the sides
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 flex items-end gap-[1px] px-1 pointer-events-none"
        >
          {Array.from({ length: NUM_BARS }).map((_, i) => {
            const x = (i + 0.5) / NUM_BARS;
            const n = 0.72 + noise(i) * 0.46; // 0.72..1.18 per-bar noise
            const localJitter = 1 + (noise(i + 31) - 0.5) * 0.18; // ±9% jitter
            const wave = bell(x, active.peak) * n;
            const heightPct = Math.min(
              100,
              (BASE_HEIGHT + (PEAK_HEIGHT - BASE_HEIGHT) * wave) * localJitter
            );
            const bright = BASE_BRIGHT + (PEAK_BRIGHT - BASE_BRIGHT) * wave;
            const [r, g, b] = colorAtX(x);
            const lr = Math.round(r * bright);
            const lg = Math.round(g * bright);
            const lb = Math.round(b * bright);
            // Bar gradient: transparent at top (tip) AND bottom (where it meets the tile below),
            // brightest in the middle. The bottom transparency lets the bar dissolve into the
            // tile's colored top accent line for a seamless blend.
            const grad = `linear-gradient(180deg,
              rgba(${lr},${lg},${lb}, 0) 0%,
              rgba(${lr},${lg},${lb}, 0.45) 16%,
              rgba(${lr},${lg},${lb}, 0.95) 50%,
              rgba(${lr},${lg},${lb}, 0.92) 78%,
              rgba(${lr},${lg},${lb}, 0.55) 94%,
              rgba(${lr},${lg},${lb}, 0) 100%
            )`;
            const phase = `${(-noise(i + 7) * 4).toFixed(2)}s`;
            const dur = `${(2.6 + noise(i + 11) * 2.4).toFixed(2)}s`;
            const shimmerPhase = `${(-noise(i + 19) * 5).toFixed(2)}s`;
            return (
              <span
                key={i}
                className="spectrum-bar-up flex-1"
                style={{
                  height: `${heightPct}%`,
                  background: grad,
                  boxShadow: `0 0 ${3 + wave * 28}px rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)}, ${0.04 + wave * 0.55})`,
                  transition:
                    "height 900ms cubic-bezier(0.22, 1, 0.36, 1), background 900ms ease, box-shadow 900ms ease",
                  animationDelay: `${phase}, ${shimmerPhase}`,
                  animationDuration: `${dur}, ${(4.4 + noise(i + 23) * 2.4).toFixed(2)}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
