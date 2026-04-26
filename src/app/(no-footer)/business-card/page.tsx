"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

// ── Gradient palette pulled directly from the website's design system ────────
// brand teal:  hsl(177, 70%, 59%)  → #4fd1c7
// brand blue:  #63b3ed  (sky-400ish)
// brand indigo:#818cf8
// brand purple:#a78bfa
// brand pink:  #f472b6
// bg dark:     hsl(210, 32%, 12%)  → #1a2535
// bg darker:   hsl(210, 32%, 9%)   → #111a27

const SERVICES = [
  { label: "Direct Primary Care",        color: "hsl(177, 70%, 59%)" },  // brand teal
  { label: "Hormone Health & HRT",       color: "#f472b6" },             // pink
  { label: "Perimenopause & Menopause",  color: "#c084fc" },             // purple
  { label: "Men's Health & TRT",         color: "#63b3ed" },             // blue
  { label: "Weight Loss · GLP-1",        color: "#34d399" },             // emerald
  { label: "Hyperbaric Oxygen",          color: "#818cf8" },             // indigo
];

export default function BusinessCard() {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(qrRef.current, "https://coshealthcollective.com", {
        width: 36,
        margin: 0,
        color: { dark: "#e2e8f0", light: "#06090e" },
      });
    }
  }, []);

  return (
    <>
      <style>{`
        /* ─── Shell ────────────────────────────────────────────── */
        .bc-shell {
          background: #06090e;
          min-height: 100vh;
          padding: 3rem 1rem 6rem;
          font-family: 'Geist', system-ui, -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }
        .bc-label {
          color: #4a5568; font-size: 10px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          text-align: center; margin-bottom: 0.5rem;
        }
        .bc-print-btn {
          background: linear-gradient(135deg, hsl(177,70%,59%), #63b3ed);
          color: #06090e; border: none; padding: 0.65rem 1.5rem;
          border-radius: 8px; font-weight: 700; font-size: 0.9rem;
          cursor: pointer; margin-bottom: 1.5rem;
        }

        /* ─── Zoom wrapper ──────────────────────────────────────── */
        .bc-zoom { display: flex; justify-content: center; }
        .bc-zoom-inner { zoom: 2.8; }

        /* ─── Card base ─────────────────────────────────────────── */
        .bc-card {
          width: 3.5in; height: 2in;
          border-radius: 0.1in; overflow: hidden; position: relative;
          box-shadow: 0 12px 60px rgba(0,0,0,0.9);
        }


        /* ══════════════════════════════════════════════════════════
           FRONT — full-bleed photo bg, text layered on top
        ══════════════════════════════════════════════════════════ */
        .bc-front {
          background: hsl(210, 32%, 8%);
          position: relative;
        }

        /* Full-bleed photo — using portrait-cropped version so Logan is on the right */
        .bc-f-photo-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .bc-f-photo-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          /* Portrait crop = Logan naturally lands right-of-center */
          object-position: center top;
          display: block;
        }

        /* Scrim: near-black on left, holds until 50%, then fades away */
        .bc-f-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right,
            #000000                    0%,     /* pure black */
            #010509                    20%,    /* near-black */
            hsla(210, 45%, 5%, 0.97)   38%,    /* almost black, faint navy tint */
            hsla(177, 40%, 6%, 0.82)   48%,    /* very dark, subtle teal hint — photo starts here */
            hsla(177, 35%, 8%, 0.28)   60%,    /* lighter fade so face visible */
            hsla(177, 30%, 8%, 0.08)   72%,
            transparent                84%
          );
        }
        /* Top/bottom vignette */
        .bc-f-vignette {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.55) 0%,
            transparent 20%,
            transparent 72%,
            rgba(0,0,0,0.65) 100%
          );
        }

        /* Ambient glow layers */
        .bc-f-glow-teal {
          position: absolute; top: -0.4in; left: -0.2in;
          width: 2.4in; height: 2.4in;
          background: radial-gradient(circle,
            hsla(177,70%,59%,0.2) 0%,
            hsla(200,70%,59%,0.08) 45%, transparent 68%
          );
          pointer-events: none; z-index: 3;
        }
        .bc-f-glow-purple {
          position: absolute; bottom: -0.3in; left: 0.2in;
          width: 1.8in; height: 1.8in;
          background: radial-gradient(circle,
            hsla(271,74%,60%,0.15) 0%, transparent 65%
          );
          pointer-events: none; z-index: 3;
        }

        /* All text content floats above everything */
        .bc-f-content {
          position: absolute; inset: 0; z-index: 4;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 0.09in 0.11in 0.08in 0.11in;
        }

        /* Logo row */
        .bc-f-logo-row {
          display: flex; align-items: center; gap: 0.06in;
        }
        .bc-f-logo { width: 0.26in; height: 0.26in; flex-shrink: 0; }

        /* ── CLINIC NAME — vibrant, glowing, 3D pop ── */
        .bc-f-cos {
          font-size: 6.8pt; font-weight: 800;
          letter-spacing: 2.5px; line-height: 1; text-transform: uppercase;
          background: linear-gradient(90deg,
            hsl(177,100%,70%) 0%,
            #67e8f9           40%,
            #a5b4fc           75%,
            #c4b5fd           100%
          );
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter:
            drop-shadow(0 0 3px rgba(0,0,0,0.95))
            drop-shadow(0 1px 6px rgba(0,0,0,0.9))
            drop-shadow(0 2px 5px rgba(0,0,0,0.8))
            drop-shadow(0 0 6px hsla(177,95%,65%,0.85))
            drop-shadow(0 0 14px hsla(197,95%,65%,0.45));
        }
        /* "HEALTH COLLECTIVE" — the statement piece */
        .bc-f-hc {
          font-size: 14pt; font-weight: 900;
          letter-spacing: 0.5px; line-height: 1; text-transform: uppercase;
          white-space: nowrap;
          background: linear-gradient(90deg,
            #7dd3fc 0%,
            #818cf8 28%,
            #c084fc 55%,
            #e879f9 78%,
            #f9a8d4 100%
          );
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter:
            drop-shadow(0 0 2px rgba(0,0,0,0.8))
            drop-shadow(0 1px 4px rgba(0,0,0,0.7))
            drop-shadow(0 0 8px hsla(256,90%,75%,0.8))
            drop-shadow(0 0 20px hsla(271,80%,65%,0.45))
            drop-shadow(0 0 38px hsla(300,80%,65%,0.2));
        }

        /* Divider */
        .bc-f-divider {
          height: 1px; width: 44%;
          background: linear-gradient(to right,
            hsl(177,95%,62%) 0%,
            #38bdf8 20%,
            #818cf8 50%,
            hsla(271,74%,55%,0.4) 80%,
            transparent 100%
          );
          filter: drop-shadow(0 0 3px hsla(177,95%,62%,0.6));
        }

        /* Name */
        .bc-f-name {
          font-size: 13pt; font-weight: 800;
          color: #ffffff; letter-spacing: -0.3px;
          line-height: 1; margin-bottom: 0.02in;
          text-shadow: 0 2px 8px rgba(0,0,0,0.7);
        }
        /* Gradient spike under the name — repurposed from old PA-C accent */
        .bc-f-name-spike {
          height: 2px; width: 0.55in; margin-bottom: 0.025in;
          background: linear-gradient(90deg,
            hsl(177,95%,62%), #38bdf8, #818cf8, #c084fc, transparent
          );
          border-radius: 2px;
          filter: drop-shadow(0 0 3px hsla(177,90%,62%,0.6));
        }
        /* "Physician Assistant" — muted gray, no PA-C */
        .bc-f-title {
          font-size: 5.8pt; font-weight: 400; color: #718096;
          letter-spacing: 1.5px; text-transform: uppercase;
        }

        /* Contact */
        .bc-f-contact { display: flex; flex-direction: column; gap: 0.032in; }
        .bc-f-cline {
          font-size: 5.8pt; color: #dde4ed;
          display: flex; align-items: center; gap: 0.04in; line-height: 1;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .bc-f-cdot { width: 3px; height: 3px; border-radius: 50%; flex-shrink: 0; }

        /* Bottom gradient bar */
        .bc-f-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 5;
          background: linear-gradient(90deg,
            hsl(177,70%,59%) 0%, #63b3ed 25%, #818cf8 50%, #a78bfa 70%, #f472b6 85%, #f59e0b 100%
          );
        }


        /* ══════════════════════════════════════════════════════════
           BACK — 3 clinic columns + QR top-right
        ══════════════════════════════════════════════════════════ */
        .bc-back {
          background: hsl(210, 32%, 8%);
          padding: 0.06in 0.08in 0.055in 0.08in;
          display: flex; flex-direction: column; position: relative; overflow: hidden;
        }
        .bc-b-glow1 {
          position: absolute; top: -0.5in; right: -0.3in;
          width: 2.4in; height: 2.4in;
          background: radial-gradient(circle,
            hsla(271,74%,60%,0.26) 0%, hsla(200,70%,59%,0.1) 45%, transparent 70%
          );
          pointer-events: none;
        }
        .bc-b-glow2 {
          position: absolute; bottom: -0.3in; left: -0.2in;
          width: 1.6in; height: 1.6in;
          background: radial-gradient(circle,
            hsla(177,70%,59%,0.2) 0%, transparent 65%
          );
          pointer-events: none;
        }
        .bc-b-glow3 {
          position: absolute; bottom: -0.1in; right: 0.2in;
          width: 1.4in; height: 1.4in;
          background: radial-gradient(circle,
            hsla(330,80%,60%,0.16) 0%, transparent 65%
          );
          pointer-events: none;
        }
        .bc-b-glow4 {
          position: absolute; top: 0.3in; left: -0.1in;
          width: 1.2in; height: 1.2in;
          background: radial-gradient(circle,
            hsla(177,70%,59%,0.12) 0%, transparent 65%
          );
          pointer-events: none;
        }

        /* Top row: slogan left + QR right */
        .bc-b-toprow {
          display: flex; align-items: center; justify-content: space-between;
          position: relative; z-index: 2; margin-bottom: 0.04in; gap: 0.06in;
          flex: 0 0 auto; min-height: 0.44in;
        }
        .bc-b-qr-wrap { display: flex; flex-direction: column; align-items: center; gap: 2px; flex-shrink: 0; }
        .bc-b-qr { border-radius: 3px; display: block; box-shadow: 0 0 5px hsla(177,70%,59%,0.25); }
        .bc-b-qr-cap { font-size: 4pt; color: #4a5568; letter-spacing: 0.3px; }

        /* Slogan */
        .bc-b-slogan {
          font-size: 11pt; font-style: italic; font-weight: 700;
          letter-spacing: -0.2px; line-height: 1.1;
          background: linear-gradient(90deg, #ffffff 0%, hsl(177,80%,78%) 55%, #c4b5fd 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 0 10px hsla(177,70%,59%,0.45))
            drop-shadow(0 0 24px hsla(271,74%,60%,0.25));
        }

        /* Divider */
        .bc-b-div {
          height: 1px;
          background: linear-gradient(to right,
            hsl(177,70%,59%) 0%, #63b3ed 35%, #818cf8 65%,
            hsla(271,74%,60%,0.2) 90%, transparent 100%
          );
          margin-bottom: 0.05in;
          position: relative; z-index: 2;
        }

        /* ── 3-clinic grid ── */
        .bc-b-clinics {
          display: grid;
          grid-template-columns: 3fr 3.5fr 3.5fr;
          gap: 0.05in;
          flex: 1;
          position: relative; z-index: 2;
          margin-bottom: 0.038in;
          align-items: stretch;
        }
        .bc-b-clinic {
          background: hsla(210,22%,16%,0.65);
          border: 1px solid hsla(255,100%,100%,0.06);
          border-top: 2px solid var(--clinic-color);
          border-radius: 0.025in;
          padding: 0.036in 0.044in;
          display: flex; flex-direction: column; gap: 0.014in;
          box-shadow: 0 0 10px rgba(0,0,0,0.35), inset 0 1px 0 hsla(255,100%,100%,0.04);
        }
        .bc-b-clinic-name {
          font-size: 7pt; font-weight: 800; line-height: 1.2;
          text-transform: uppercase; letter-spacing: 0.4px;
          background: linear-gradient(90deg, var(--clinic-name-from), var(--clinic-name-to));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 2px var(--clinic-glow));
        }
        .bc-b-clinic-items { display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0; }
        .bc-b-item {
          font-size: 6pt; color: #c4cfd9; line-height: 1.3; letter-spacing: 0.05px;
          display: flex; align-items: baseline; gap: 0.02in;
        }
        .bc-b-item::before {
          content: '·'; color: var(--clinic-color);
          font-weight: 900; flex-shrink: 0; font-size: 6.5pt; line-height: 1;
        }

        /* Footer URL */
        .bc-b-url {
          font-size: 5.5pt; font-weight: 700;
          background: linear-gradient(90deg, hsl(177,70%,59%), #63b3ed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 3px hsla(177,70%,59%,0.35));
          position: relative; z-index: 2;
        }

        /* ─── Print ──────────────────────────────────────────────── */
        @media print {
          @page { size: 3.5in 2in; margin: 0; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .bc-shell { padding: 0; gap: 0; background: transparent; min-height: auto; }
          .bc-label { display: none; }
          .bc-zoom { display: block; }
          .bc-zoom-inner { zoom: 1; }
          .bc-card { border-radius: 0; box-shadow: none; page-break-after: always; break-after: page; }
        }
      `}</style>

      <div className="bc-shell">
        {/* Actions */}
        <div className="no-print" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <button className="bc-print-btn" onClick={() => window.print()}>
            Print / Save as PDF
          </button>
          <span style={{ color: "#4a5568", fontSize: "0.78rem" }}>
            or: <code style={{ color: "hsl(177,70%,59%)" }}>npm run export -- business-card</code>
          </span>
        </div>

        {/* ══ FRONT ═══════════════════════════════════════════════ */}
        <div>
          <div className="bc-label no-print">FRONT — 3.5&quot; × 2&quot;</div>
          <div className="bc-zoom">
            <div className="bc-zoom-inner">
              <div className="bc-card bc-front">
                {/* Full-bleed photo background — portrait crop so Logan is right-of-center */}
                <div className="bc-f-photo-bg">
                  <img src="/logan-card-crop.png" alt="" />
                </div>
                <div className="bc-f-scrim" />
                <div className="bc-f-vignette" />
                <div className="bc-f-glow-teal" />
                <div className="bc-f-glow-purple" />

                {/* Text content — full card overlay */}
                <div className="bc-f-content">
                  {/* Top: logo + clinic name */}
                  <div>
                    <div className="bc-f-logo-row">
                      <img src="/logo-main.png" alt="" className="bc-f-logo" />
                      <div className="bc-f-cos">Colorado Springs</div>
                    </div>
                    <div className="bc-f-hc">Health Collective</div>
                    <div className="bc-f-divider" style={{ marginTop: "0.04in" }} />
                  </div>

                  {/* Middle: name */}
                  <div>
                    <div className="bc-f-name">Logan Crist</div>
                    <div className="bc-f-name-spike" />
                    <div className="bc-f-title">Physician Assistant</div>
                  </div>

                  {/* Bottom: contact */}
                  <div className="bc-f-contact">
                    <div className="bc-f-cline">
                      <div className="bc-f-cdot" style={{ background: "hsl(177,70%,59%)" }} />
                      440-371-3063
                    </div>
                    <div className="bc-f-cline">
                      <div className="bc-f-cdot" style={{ background: "#63b3ed" }} />
                      dpc@coshealthcollective.com
                    </div>
                    <div className="bc-f-cline">
                      <div className="bc-f-cdot" style={{ background: "#a78bfa" }} />
                      coshealthcollective.com
                    </div>
                  </div>
                </div>

                <div className="bc-f-bar" />
              </div>
            </div>
          </div>
        </div>

        {/* ══ BACK ════════════════════════════════════════════════ */}
        <div>
          <div className="bc-label no-print">BACK — 3.5&quot; × 2&quot;</div>
          <div className="bc-zoom">
            <div className="bc-zoom-inner">
              <div className="bc-card bc-back">
                <div className="bc-b-glow1" />
                <div className="bc-b-glow2" />
                <div className="bc-b-glow3" />
                <div className="bc-b-glow4" />

                {/* Top row: slogan + QR */}
                <div className="bc-b-toprow">
                  <div className="bc-b-slogan">Providers who actually know you.</div>
                  <div className="bc-b-qr-wrap">
                    <canvas ref={qrRef} className="bc-b-qr" />
                    <div className="bc-b-qr-cap">scan to visit</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="bc-b-div" />

                {/* 3 clinic columns */}
                <div className="bc-b-clinics">
                  {/* Direct Primary Care */}
                  <div className="bc-b-clinic" style={{
                    "--clinic-color":     "hsl(177,70%,59%)",
                    "--clinic-name-from": "hsl(177,80%,65%)",
                    "--clinic-name-to":   "#38bdf8",
                    "--clinic-glow":      "hsla(177,70%,59%,0.45)",
                  } as React.CSSProperties}>
                    <div className="bc-b-clinic-name">Direct Primary Care</div>
                    <div className="bc-b-clinic-items">
                      <div className="bc-b-item">Unlimited visits</div>
                      <div className="bc-b-item">Same-day access</div>
                      <div className="bc-b-item">No insurance</div>
                      <div className="bc-b-item">Flat monthly fee</div>
                    </div>
                  </div>

                  {/* Hormone Health & Weight Loss */}
                  <div className="bc-b-clinic" style={{
                    "--clinic-color":     "#f472b6",
                    "--clinic-name-from": "#fda4cf",
                    "--clinic-name-to":   "#c084fc",
                    "--clinic-glow":      "hsla(330,90%,70%,0.45)",
                  } as React.CSSProperties}>
                    <div className="bc-b-clinic-name">Hormone Health &amp; Weight Loss</div>
                    <div className="bc-b-clinic-items">
                      <div className="bc-b-item">HRT · TRT</div>
                      <div className="bc-b-item">Perimenopause &amp; Menopause</div>
                      <div className="bc-b-item">Medical weight loss</div>
                      <div className="bc-b-item">Whole-person approach</div>
                    </div>
                  </div>

                  {/* Hyperbaric Oxygen */}
                  <div className="bc-b-clinic" style={{
                    "--clinic-color":     "#818cf8",
                    "--clinic-name-from": "#a5b4fc",
                    "--clinic-name-to":   "#60a5fa",
                    "--clinic-glow":      "hsla(238,90%,72%,0.45)",
                  } as React.CSSProperties}>
                    <div className="bc-b-clinic-name">Hyperbaric Oxygen</div>
                    <div className="bc-b-clinic-items">
                      <div className="bc-b-item">2.0 ATA · Clinical-grade</div>
                      <div className="bc-b-item">Wound healing</div>
                      <div className="bc-b-item">Ulcerative colitis</div>
                      <div className="bc-b-item">Long COVID</div>
                      <div className="bc-b-item">Performance · Recovery</div>
                    </div>
                  </div>
                </div>

                {/* Footer URL */}
                <div className="bc-b-url">coshealthcollective.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
