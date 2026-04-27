"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const SIGNUP_URL = "https://coshealthcollective.com/free-consult";

export default function FreeConsultFlyer() {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(qrRef.current, SIGNUP_URL, {
        width: 200,
        margin: 0,
        color: { dark: "#0a0e14", light: "#ffffff" },
        errorCorrectionLevel: "H",
      });
    }
  }, []);

  return (
    <div className="fc-shell">
      <style>{`
        @media print {
          @page { size: 5in 7in; margin: 0; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .fc-shell { background: white !important; padding: 0 !important; min-height: auto !important; }
          .fc-preview-label { display: none !important; }
        }

        .fc-shell {
          background: #0a0e14;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fc-preview-label {
          color: #4a5568; font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .fc-print-btn {
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14; border: none; padding: 0.7rem 1.6rem;
          border-radius: 8px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; margin-bottom: 1.5rem;
          box-shadow: 0 6px 22px rgba(79,209,199,0.35);
        }

        .fc-page {
          width: 5in; height: 7in;
          position: relative; overflow: hidden;
          background:
            radial-gradient(ellipse 90% 55% at 50% 0%, rgba(79,209,199,0.20) 0%, rgba(99,179,237,0.12) 35%, transparent 70%),
            radial-gradient(ellipse 110% 60% at 50% 105%, rgba(167,139,250,0.18) 0%, rgba(79,209,199,0.10) 30%, transparent 65%),
            linear-gradient(180deg, #0a0e14 0%, #0f1622 35%, #131a28 65%, #0a0e14 100%);
          box-shadow: 0 14px 60px rgba(0,0,0,0.55);
        }

        .fc-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 0.32in 0.32in;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.85), transparent 95%);
          -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.85), transparent 95%);
          pointer-events: none;
        }
        .fc-glow-tl, .fc-glow-br {
          position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .fc-glow-tl { top: -1.2in; left: -1in; width: 3.2in; height: 3.2in; background: radial-gradient(circle, rgba(79,209,199,0.4), transparent 70%); }
        .fc-glow-br { bottom: -1.2in; right: -1in; width: 3.6in; height: 3.6in; background: radial-gradient(circle, rgba(99,179,237,0.32), transparent 70%); }

        .fc-content {
          position: relative; z-index: 5;
          width: 100%; height: 100%;
          padding: 0.28in 0.4in 0.4in 0.4in;
          display: flex; flex-direction: column;
          align-items: center;
        }

        /* ─── Top lockup ──────────────────────────────────────────── */
        .fc-lockup {
          display: flex; align-items: center; justify-content: center;
          gap: 0.12in; margin-bottom: 0.14in;
        }
        .fc-lockup-logo-wrap { position: relative; flex-shrink: 0; display: inline-block; }
        .fc-lockup-logo-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 0.95in; height: 0.95in;
          background: radial-gradient(circle, rgba(79,209,199,0.5) 0%, rgba(99,179,237,0.32) 35%, transparent 72%);
          border-radius: 50%; filter: blur(12px); z-index: 0;
        }
        .fc-lockup-logo {
          position: relative; z-index: 1;
          width: 0.6in; height: auto; display: block;
          filter: drop-shadow(0 0 8px rgba(79,209,199,0.5));
        }
        .fc-lockup-text {
          font-size: 14pt; font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.005em;
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #e3faf6 35%, #93e6dc 75%, #4fd1c7 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 rgba(255,255,255,0.4))
            drop-shadow(0 0 14px rgba(79,209,199,0.4))
            drop-shadow(0 4px 10px rgba(0,0,0,0.55));
        }
        .fc-lockup-line { display: block; }

        .fc-eyebrow {
          font-size: 8.5pt; font-weight: 800;
          color: rgba(186,209,232,0.85);
          letter-spacing: 3.5px; text-transform: uppercase;
          margin: 0 0 0.02in 0;
        }
        .fc-headline-svg {
          display: block;
          width: 3.1in; height: auto;
          overflow: visible;
          margin: 0 auto 0.02in auto;
        }
        .fc-subhead {
          font-size: 14pt; font-weight: 800;
          color: white; line-height: 1.25;
          margin: 0 0 0.22in 0;
          text-align: center;
          text-shadow: 0 2px 18px rgba(0,0,0,0.55);
          width: 100%;
          max-width: 3.8in;
        }
        .fc-tag-teal {
          font-size: 9pt; font-weight: 700;
          color: #5fe0d3;
          margin: 0 0 0.05in 0;
        }

        /* ─── Applies-to row ──────────────────────────────────────── */
        .fc-applies {
          display: flex; gap: 0.08in; align-items: center; justify-content: center;
          flex-wrap: wrap; margin: 0 0 0.16in 0;
        }
        .fc-applies-pill {
          font-size: 8pt; font-weight: 800;
          letter-spacing: 1.2px; text-transform: uppercase;
          padding: 0.05in 0.12in;
          border: 1.5px solid rgba(79,209,199,0.4);
          border-radius: 999px;
          color: #5fe0d3;
          background: rgba(79,209,199,0.08);
        }

        /* ─── Scan card ───────────────────────────────────────────── */
        .fc-scan {
          position: relative;
          background: rgba(255,255,255,0.97);
          border-radius: 14px;
          padding: 0.13in 0.16in;
          display: flex; align-items: center; gap: 0.16in;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
          width: 100%;
        }
        .fc-scan::before {
          content: ''; position: absolute; inset: -2.5px;
          border-radius: 16px; z-index: -1;
          background: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 50%, #a78bfa 100%);
        }
        .fc-scan-info { flex: 1; display: flex; flex-direction: column; gap: 0.04in; min-width: 0; }
        .fc-scan-eyebrow {
          font-size: 7.5pt; font-weight: 800;
          color: #4a5568; letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .fc-scan-cta {
          font-size: 14pt; font-weight: 800;
          color: #0a0e14; line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .fc-scan-url {
          font-size: 8.5pt; font-weight: 600;
          color: #2d3748; margin-top: 0.04in;
          word-break: break-all;
        }
        .fc-qr-wrap {
          background: white; border-radius: 8px;
          padding: 0.05in; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) inset;
        }
        .fc-qr { display: block; width: 1.15in; height: 1.15in; }

        /* ─── Footer ──────────────────────────────────────────────── */
        .fc-footer {
          margin-top: auto; padding-top: 0.16in;
          display: flex; flex-direction: column; align-items: center; gap: 0.04in;
          width: 100%;
          position: relative;
        }
        .fc-footer::before {
          content: '';
          position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,209,199,0.45), rgba(99,179,237,0.45), transparent);
        }
        .fc-footer-url {
          font-size: 13pt; font-weight: 800;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.01em;
        }
        .fc-footer-loc {
          font-size: 8pt; font-weight: 500;
          color: rgba(255,255,255,0.55);
          letter-spacing: 1.4px; text-transform: uppercase;
        }
      `}</style>

      <button onClick={() => window.print()} className="fc-print-btn no-print">Save as PDF</button>
      <div className="fc-preview-label no-print">5″ × 7″ Free Consult + $25 Enrollment Credit Flyer</div>

      <div className="fc-page">
        <div className="fc-grid" />
        <div className="fc-glow-tl" />
        <div className="fc-glow-br" />

        <div className="fc-content">
          {/* Top lockup */}
          <div className="fc-lockup">
            <div className="fc-lockup-logo-wrap">
              <div className="fc-lockup-logo-glow" />
              <img src="/logo.png" alt="CSHC" className="fc-lockup-logo" />
            </div>
            <div className="fc-lockup-text">
              <span className="fc-lockup-line">Perimenopause + Menopause</span>
              <span className="fc-lockup-line">Direct Primary Care</span>
              <span className="fc-lockup-line">Men&apos;s TRT</span>
            </div>
          </div>

          <p className="fc-eyebrow">Free Consult + $25 Enrollment Credit</p>

          <svg
            className="fc-headline-svg"
            viewBox="0 0 400 130"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="$25 off"
          >
            <defs>
              <linearGradient id="fcFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="22%" stopColor="#c5f0eb" />
                <stop offset="50%" stopColor="#4fd1c7" />
                <stop offset="78%" stopColor="#5dc5e8" />
                <stop offset="100%" stopColor="#63b3ed" />
              </linearGradient>
              <filter id="fcShadow" x="-10%" y="-15%" width="120%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                <feOffset dx="0" dy="6" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.55" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#fcShadow)">
              <text
                x="200" y="100"
                textAnchor="middle"
                fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="98"
                letterSpacing="-3"
                fill="#0a0e14"
                transform="translate(0, 5)"
              >
                $25 OFF
              </text>
              <text
                x="200" y="100"
                textAnchor="middle"
                fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="98"
                letterSpacing="-3"
                fill="url(#fcFill)"
              >
                $25 OFF
              </text>
            </g>
          </svg>

          <h2 className="fc-subhead">Curious? Book a free consult — no commitment.</h2>

          {/* Scan card */}
          <div className="fc-scan">
            <div className="fc-scan-info">
              <span className="fc-scan-eyebrow">Scan to claim</span>
              <span className="fc-scan-cta">Book my free consult →</span>
              <span className="fc-scan-url">coshealthcollective.com/free-consult</span>
            </div>
            <div className="fc-qr-wrap">
              <canvas ref={qrRef} className="fc-qr" />
            </div>
          </div>

          {/* Footer */}
          <div className="fc-footer">
            <div className="fc-footer-url">coshealthcollective.com</div>
            <div className="fc-footer-loc">Colorado Springs, CO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
