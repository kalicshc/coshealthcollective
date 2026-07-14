"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

// ── Activcore-referral card — 3.5" × 2"
// Front: same DNA as /business-card with a small co-brand strip + hormone subtitle.
// Back: AC patient pricing (HRT tier + vaginal estrogen tier) + QR → /ac-welcome.
//
// Activcore brand red = hsl(5, 78%, 57%)  (matches CoBrandedHeader + /ac-welcome)

const AC_RED = "hsl(5, 78%, 57%)";

export default function AcReferralCard() {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      // QR rendered at ~0.95" on the printed card. Prior cards used ~0.4"
      // which failed real-world scans. 0.8" is the industry minimum for the
      // 4–8" scan distance a business card is read at; 0.95" gives margin
      // for print variance, low light, and older phone cameras.
      // Error level Q (25% recovery) is extra insurance against print smudge.
      QRCode.toCanvas(qrRef.current, "https://coshealthcollective.com/ac-welcome", {
        width: 92,
        margin: 1,
        errorCorrectionLevel: "Q",
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
          background: linear-gradient(135deg, hsl(177,70%,59%), ${AC_RED});
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

        .bc-f-photo-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .bc-f-photo-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Scrim: black on left, fades right; subtle red tint on the far edge for AC accent */
        .bc-f-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right,
            #000000                    0%,
            #010509                    20%,
            hsla(210, 45%, 5%, 0.97)   38%,
            hsla(5, 40%, 6%, 0.78)     48%,
            hsla(5, 35%, 8%, 0.24)     60%,
            hsla(5, 30%, 8%, 0.08)     72%,
            transparent                84%
          );
        }
        .bc-f-vignette {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.55) 0%, transparent 20%,
            transparent 72%, rgba(0,0,0,0.65) 100%
          );
        }

        /* Glow layers — teal top-left, AC red bottom-right */
        .bc-f-glow-teal {
          position: absolute; top: -0.4in; left: -0.2in;
          width: 2.4in; height: 2.4in;
          background: radial-gradient(circle,
            hsla(177,70%,59%,0.2) 0%,
            hsla(200,70%,59%,0.08) 45%, transparent 68%
          );
          pointer-events: none; z-index: 3;
        }
        .bc-f-glow-red {
          position: absolute; bottom: -0.3in; right: -0.2in;
          width: 1.8in; height: 1.8in;
          background: radial-gradient(circle,
            hsla(5,78%,57%,0.18) 0%, transparent 65%
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

        /* ── Co-brand strip — top of card ── */
        .bc-f-cobrand {
          display: flex; align-items: center; gap: 0.05in;
          margin-bottom: 0.05in;
        }
        .bc-f-cobrand-tag {
          font-size: 4.3pt; font-weight: 700;
          letter-spacing: 1.4px; text-transform: uppercase;
          color: ${AC_RED};
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
        }
        .bc-f-cobrand-bar {
          flex: 1; height: 1px;
          background: linear-gradient(to right,
            hsla(5,78%,57%,0.55) 0%,
            hsla(5,60%,50%,0.25) 60%,
            transparent 100%
          );
        }

        /* Logo row */
        .bc-f-logo-row {
          display: flex; align-items: center; gap: 0.06in;
        }
        .bc-f-logo { width: 0.26in; height: 0.26in; flex-shrink: 0; }

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
        .bc-f-name-spike {
          height: 2px; width: 0.55in; margin-bottom: 0.025in;
          background: linear-gradient(90deg,
            hsl(177,95%,62%), #38bdf8, #818cf8, ${AC_RED}, transparent
          );
          border-radius: 2px;
          filter: drop-shadow(0 0 3px hsla(177,90%,62%,0.6));
        }
        .bc-f-title {
          font-size: 5.8pt; font-weight: 400; color: #a0aec0;
          letter-spacing: 1.5px; text-transform: uppercase;
        }

        /* Contact */
        .bc-f-contact { display: flex; flex-direction: column; gap: 0.036in; }
        .bc-f-cline {
          font-size: 6.6pt; color: #e2e8f0; font-weight: 500;
          display: flex; align-items: center; gap: 0.045in; line-height: 1;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .bc-f-cdot { width: 3.5px; height: 3.5px; border-radius: 50%; flex-shrink: 0; }

        /* Bottom gradient bar — teal → AC red */
        .bc-f-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 5;
          background: linear-gradient(90deg,
            hsl(177,70%,59%) 0%, #63b3ed 25%, #818cf8 50%, #c084fc 70%, ${AC_RED} 100%
          );
        }


        /* ══════════════════════════════════════════════════════════
           BACK — two columns: left = kicker + headline + 2 stacked
                  tier rows + URL; right = big QR + COS logo
        ══════════════════════════════════════════════════════════ */
        .bc-back {
          background: hsl(210, 32%, 8%);
          padding: 0.075in 0.09in 0.07in 0.09in;
          display: flex; flex-direction: row; gap: 0.09in;
          position: relative; overflow: hidden;
        }
        .bc-b-glow1 {
          position: absolute; top: -0.4in; right: -0.3in;
          width: 2.2in; height: 2.2in;
          background: radial-gradient(circle,
            hsla(5,78%,55%,0.22) 0%, hsla(330,70%,55%,0.08) 45%, transparent 70%
          );
          pointer-events: none;
        }
        .bc-b-glow2 {
          position: absolute; bottom: -0.3in; left: -0.2in;
          width: 1.6in; height: 1.6in;
          background: radial-gradient(circle,
            hsla(177,70%,59%,0.22) 0%, transparent 65%
          );
          pointer-events: none;
        }
        .bc-b-glow3 {
          position: absolute; top: 0.4in; left: 20%;
          width: 1in; height: 1in;
          background: radial-gradient(circle,
            hsla(271,74%,60%,0.16) 0%, transparent 65%
          );
          pointer-events: none;
        }

        /* ── Left column ── */
        .bc-b-left {
          flex: 1; min-width: 0; position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: space-between;
        }
        .bc-b-left-top {
          display: flex; flex-direction: column; gap: 0.025in;
        }
        .bc-b-kicker {
          font-size: 5.4pt; font-weight: 800;
          letter-spacing: 1.6px; text-transform: uppercase;
          color: ${AC_RED};
          text-shadow: 0 0 4px hsla(5,78%,57%,0.5);
        }
        .bc-b-headline {
          font-size: 8.5pt; font-weight: 800; font-style: italic;
          line-height: 1.1; letter-spacing: -0.2px;
          background: linear-gradient(90deg,
            #ffffff 0%,
            hsl(177,90%,82%) 35%,
            #c4b5fd 65%,
            #fda4af 100%
          );
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter:
            drop-shadow(0 0 8px hsla(177,70%,59%,0.5))
            drop-shadow(0 0 20px hsla(271,74%,60%,0.3))
            drop-shadow(0 0 30px hsla(5,78%,57%,0.18));
        }
        .bc-b-div {
          height: 1px;
          background: linear-gradient(to right,
            hsl(177,70%,59%) 0%, #63b3ed 35%, #c084fc 65%,
            ${AC_RED} 95%, transparent 100%
          );
          margin-top: 0.01in;
        }

        /* Tier rows — stacked vertical, each box larger w/ multi-line content */
        .bc-b-tiers {
          display: flex; flex-direction: column; gap: 0.04in;
          margin-top: 0.005in;
        }
        .bc-b-tier {
          background: hsla(210,22%,16%,0.7);
          border: 1px solid hsla(255,100%,100%,0.06);
          border-left: 2px solid var(--tier-color);
          border-radius: 0.03in;
          padding: 0.055in 0.075in;
          display: flex; flex-direction: column; gap: 0.018in;
          box-shadow: 0 0 10px rgba(0,0,0,0.35),
                      inset 0 1px 0 hsla(255,100%,100%,0.04);
        }
        .bc-b-tier-name {
          font-size: 6pt; font-weight: 800; line-height: 1.1;
          text-transform: uppercase; letter-spacing: 0.55px;
          margin-bottom: 0.015in;
          background: linear-gradient(90deg, var(--tier-name-from), var(--tier-name-to));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 2px var(--tier-glow));
        }
        .bc-b-tier-row {
          display: flex; align-items: baseline; gap: 0.05in;
        }
        .bc-b-tier-price {
          font-size: 7.8pt; font-weight: 800; color: #ffffff;
          letter-spacing: -0.25px; line-height: 1;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          flex-shrink: 0;
        }
        .bc-b-tier-price-unit {
          font-size: 5pt; font-weight: 600; color: #94a3b8;
          letter-spacing: 0.15px; margin-left: 1px;
        }
        .bc-b-tier-desc {
          font-size: 5.2pt; color: #d4dce6; line-height: 1.15;
          letter-spacing: 0.1px; font-weight: 500;
        }
        .bc-b-tier-note {
          font-size: 4.6pt; color: #94a3b8; line-height: 1.2;
          letter-spacing: 0.2px; font-style: italic;
          margin-top: 0.012in;
        }

        /* Footer URL */
        .bc-b-url {
          font-size: 5.2pt; font-weight: 700;
          background: linear-gradient(90deg, hsl(177,70%,59%), ${AC_RED});
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 3px hsla(5,78%,57%,0.4));
          letter-spacing: 0.1px;
        }

        /* ── Right column: QR + logo ── */
        .bc-b-right {
          flex-shrink: 0; position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          padding: 0.005in 0 0;
        }
        .bc-b-qr-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          flex-shrink: 0;
        }
        .bc-b-qr {
          display: block;
          width: 0.95in; height: 0.95in;
          background: #06090e;
          padding: 0.02in;
          border-radius: 0.025in;
          box-shadow:
            0 0 8px hsla(5,78%,57%,0.35),
            0 0 20px hsla(177,70%,59%,0.18);
        }
        .bc-b-qr-cap {
          font-size: 4pt; font-weight: 700;
          color: ${AC_RED}; letter-spacing: 1px; text-transform: uppercase;
        }
        /* COS logo lockup under the QR — vertically centered in remaining space */
        .bc-b-logo-lockup {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.025in;
        }
        .bc-b-logo-mark {
          width: 0.26in; height: 0.26in;
          filter: drop-shadow(0 0 4px hsla(177,70%,59%,0.5));
        }
        .bc-b-logo-text {
          font-size: 6pt; font-weight: 900;
          letter-spacing: 2.4px; text-transform: uppercase;
          line-height: 1; text-align: center;
          background: linear-gradient(90deg,
            hsl(177,90%,75%) 0%, #c4b5fd 55%, #f9a8d4 100%
          );
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 3px hsla(177,70%,59%,0.55));
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
            or: <code style={{ color: AC_RED }}>npm run export -- ac-referral-card</code>
          </span>
        </div>

        {/* ══ FRONT ═══════════════════════════════════════════════ */}
        <div>
          <div className="bc-label no-print">FRONT — 3.5&quot; × 2&quot;</div>
          <div className="bc-zoom">
            <div className="bc-zoom-inner">
              <div className="bc-card bc-front">
                <div className="bc-f-photo-bg">
                  <img src="/logan-card-crop.png" alt="" />
                </div>
                <div className="bc-f-scrim" />
                <div className="bc-f-vignette" />
                <div className="bc-f-glow-teal" />
                <div className="bc-f-glow-red" />

                <div className="bc-f-content">
                  {/* Top: co-brand + logo + clinic name */}
                  <div>
                    <div className="bc-f-cobrand">
                      <div className="bc-f-cobrand-tag">Activcore patient referral</div>
                      <div className="bc-f-cobrand-bar" />
                    </div>
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
                      <div className="bc-f-cdot" style={{ background: AC_RED }} />
                      coshealthcollective.com/ac-welcome
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

                {/* ── Left column: copy + tiers + URL ── */}
                <div className="bc-b-left">
                  <div className="bc-b-left-top">
                    <div className="bc-b-kicker">For Activcore patients</div>
                    <div className="bc-b-headline">
                      If hormones are part of the picture, let&rsquo;s coordinate.
                    </div>
                    <div className="bc-b-div" />
                  </div>

                  <div className="bc-b-tiers">
                    {/* HRT tier */}
                    <div className="bc-b-tier" style={{
                      "--tier-color":     "hsl(177,70%,59%)",
                      "--tier-name-from": "hsl(177,80%,70%)",
                      "--tier-name-to":   "#c084fc",
                      "--tier-glow":      "hsla(177,70%,59%,0.45)",
                    } as React.CSSProperties}>
                      <div className="bc-b-tier-name">HRT &middot; Perimenopause &amp; Menopause</div>
                      <div className="bc-b-tier-row">
                        <span className="bc-b-tier-price">$200</span>
                        <span className="bc-b-tier-desc">enrollment + first month</span>
                      </div>
                      <div className="bc-b-tier-row">
                        <span className="bc-b-tier-price">
                          $100<span className="bc-b-tier-price-unit">/mo</span>
                        </span>
                        <span className="bc-b-tier-desc">ongoing membership</span>
                      </div>
                      <div className="bc-b-tier-note">
                        includes unlimited messaging + follow-ups
                      </div>
                    </div>

                    {/* Vaginal estrogen tier */}
                    <div className="bc-b-tier" style={{
                      "--tier-color":     AC_RED,
                      "--tier-name-from": "#fda4af",
                      "--tier-name-to":   AC_RED,
                      "--tier-glow":      "hsla(5,78%,57%,0.45)",
                    } as React.CSSProperties}>
                      <div className="bc-b-tier-name">Topical Estrogen</div>
                      <div className="bc-b-tier-row">
                        <span className="bc-b-tier-price">$89</span>
                        <span className="bc-b-tier-desc">telehealth visit</span>
                      </div>
                      <div className="bc-b-tier-note">
                        covers 3 months &middot; no membership required
                      </div>
                    </div>
                  </div>

                  <div className="bc-b-url">coshealthcollective.com/ac-welcome</div>
                </div>

                {/* ── Right column: QR + COS logo ── */}
                <div className="bc-b-right">
                  <div className="bc-b-qr-wrap">
                    <canvas ref={qrRef} className="bc-b-qr" />
                    <div className="bc-b-qr-cap">Scan to start</div>
                  </div>
                  <div className="bc-b-logo-lockup">
                    <img src="/logo-main.png" alt="" className="bc-b-logo-mark" />
                    <div className="bc-b-logo-text">CSHC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
