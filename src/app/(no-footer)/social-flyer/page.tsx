"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { SiInstagram, SiTiktok } from "react-icons/si";

const INSTAGRAM_URL = "https://www.instagram.com/coshealthcollective/";
const TIKTOK_URL = "https://www.tiktok.com/@cos.health.collec";

export default function SocialFlyer() {
  const igQrRef = useRef<HTMLCanvasElement>(null);
  const ttQrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const opts = {
      width: 160,
      margin: 0,
      color: { dark: "#0a0e14", light: "#ffffff" },
      errorCorrectionLevel: "H" as const,
    };
    if (igQrRef.current) QRCode.toCanvas(igQrRef.current, INSTAGRAM_URL, opts);
    if (ttQrRef.current) QRCode.toCanvas(ttQrRef.current, TIKTOK_URL, opts);
  }, []);

  return (
    <div className="sf-shell">
      <style>{`
        @media print {
          @page { size: 5in 7in; margin: 0; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .sf-shell { background: white !important; padding: 0 !important; min-height: auto !important; }
          .sf-preview-label { display: none !important; }
        }

        .sf-shell {
          background: #0a0e14;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sf-preview-label {
          color: #4a5568; font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .sf-print-btn {
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14; border: none; padding: 0.7rem 1.6rem;
          border-radius: 8px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; margin-bottom: 1.5rem;
          box-shadow: 0 6px 22px rgba(79,209,199,0.35);
        }

        /* ─── Page (5" × 7" portrait) ──────────────────────────────── */
        .sf-page {
          width: 5in; height: 7in;
          position: relative; overflow: hidden;
          background:
            radial-gradient(ellipse 90% 55% at 50% 0%, rgba(79,209,199,0.18) 0%, rgba(99,179,237,0.12) 35%, transparent 70%),
            radial-gradient(ellipse 110% 60% at 50% 105%, rgba(251,191,36,0.18) 0%, rgba(245,158,74,0.12) 30%, transparent 65%),
            linear-gradient(180deg, #0a0e14 0%, #0f1622 35%, #131a28 65%, #0a0e14 100%);
          box-shadow: 0 14px 60px rgba(0,0,0,0.55);
        }

        /* Subtle mountain silhouette at the bottom for brand cohesion */
        .sf-mtn {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 1.1in;
          background:
            linear-gradient(to top, rgba(10,14,20,0) 0%, rgba(10,14,20,0.85) 65%, rgba(10,14,20,1) 100%),
            url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80');
          background-size: cover, cover;
          background-position: center bottom, center bottom;
          background-blend-mode: normal;
          opacity: 0.55;
          mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
        }

        /* Soft brand-color glow blobs */
        .sf-glow-tl, .sf-glow-br {
          position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .sf-glow-tl { top: -1.2in; left: -1in; width: 3.4in; height: 3.4in; background: radial-gradient(circle, rgba(79,209,199,0.45), transparent 70%); }
        .sf-glow-br { bottom: -1.4in; right: -1.2in; width: 4in; height: 4in; background: radial-gradient(circle, rgba(167,139,250,0.4), rgba(244,114,182,0.2) 50%, transparent 75%); }

        .sf-content {
          position: relative; z-index: 5;
          width: 100%; height: 100%;
          padding: 0.28in 0.4in 0.55in 0.4in;
          display: flex; flex-direction: column;
          align-items: center;
        }

        /* ─── Header ──────────────────────────────────────────────── */
        .sf-header { text-align: center; margin-bottom: 0.06in; width: 100%; }
        .sf-top-row {
          display: flex; align-items: center; justify-content: center;
          gap: 0.1in; margin-bottom: 0.05in;
        }
        .sf-logo-wrap { position: relative; display: inline-block; flex-shrink: 0; }
        .sf-logo-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 0.85in; height: 0.85in;
          background: radial-gradient(circle, rgba(79,209,199,0.55) 0%, rgba(99,179,237,0.4) 30%, rgba(167,139,250,0.25) 55%, transparent 75%);
          border-radius: 50%; filter: blur(12px); z-index: 0;
        }
        .sf-logo {
          position: relative; z-index: 1;
          width: 0.55in; height: auto; display: block;
          filter: drop-shadow(0 0 8px rgba(79,209,199,0.5));
        }
        .sf-eyebrow {
          font-size: 16pt; font-weight: 900;
          letter-spacing: 3px; text-transform: uppercase;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sf-headline-wrap {
          position: relative; display: inline-block;
          line-height: 0;
        }
        .sf-headline-wrap::before {
          content: ''; position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -42%);
          width: 140%; height: 140%;
          background: radial-gradient(ellipse, rgba(79,209,199,0.55) 0%, rgba(167,139,250,0.32) 40%, transparent 72%);
          filter: blur(30px); z-index: -1;
        }
        .sf-headline-svg {
          display: block;
          height: 1.15in; width: auto;
          overflow: visible;
        }
        .sf-subhead {
          font-size: 14pt; font-weight: 800;
          color: white; line-height: 1.05;
          margin: 0.04in 0 0.06in 0;
          text-shadow: 0 2px 14px rgba(0,0,0,0.5);
          letter-spacing: 0.01em;
        }
        .sf-prize-tag {
          display: inline-block;
          font-size: 9pt; font-weight: 800;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #ffd479;
          padding: 0.05in 0.12in;
          border: 1px solid rgba(255, 212, 121, 0.4);
          border-radius: 999px;
          background: rgba(255, 212, 121, 0.08);
        }

        /* ─── How to enter steps ──────────────────────────────────── */
        .sf-steps {
          width: 100%;
          margin: 0.12in 0 0.1in 0;
          display: flex; flex-direction: column; gap: 0.05in;
          align-items: center;
        }
        .sf-steps-eyebrow {
          font-size: 8.5pt; font-weight: 800;
          color: rgba(154,176,202,0.85);
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 0.04in;
        }
        .sf-step {
          font-size: 9.5pt; font-weight: 600;
          color: white; line-height: 1.25;
          display: flex; align-items: baseline; gap: 0.08in;
        }
        .sf-step-num {
          flex-shrink: 0;
          width: 0.22in; height: 0.22in;
          border-radius: 50%;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14;
          font-size: 8pt; font-weight: 900;
          display: inline-flex; align-items: center; justify-content: center;
          line-height: 1;
        }
        .sf-step b { font-weight: 800; color: #5fe0d3; }

        /* ─── Social cards (compact, side-by-side) ────────────────── */
        .sf-cards {
          display: flex; flex-direction: row; gap: 0.14in;
          width: 100%; justify-content: center;
        }

        .sf-card {
          position: relative;
          background: rgba(255,255,255,0.97);
          border-radius: 14px;
          padding: 0.14in 0.12in 0.12in 0.12in;
          display: flex; flex-direction: column; align-items: center;
          gap: 0.06in;
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
          flex: 1; min-width: 0;
        }
        /* Gradient border via pseudo-element */
        .sf-card::before {
          content: ''; position: absolute; inset: -2.5px;
          border-radius: 16px; z-index: -1;
        }
        .sf-card.ig::before {
          background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        .sf-card.tt::before {
          background: linear-gradient(135deg, #25F4EE 0%, #ffffff 50%, #FE2C55 100%);
        }

        .sf-card-icon-wrap {
          width: 0.36in; height: 0.36in; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sf-card.ig .sf-card-icon-wrap {
          background: linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%);
        }
        .sf-card.tt .sf-card-icon-wrap {
          background: #0a0e14;
        }
        .sf-card-icon { color: white; }
        .sf-card-platform {
          font-size: 11pt; font-weight: 800; color: #0a0e14;
          line-height: 1; letter-spacing: -0.01em;
          margin-top: 0.02in;
        }
        .sf-card-handle {
          font-size: 7.5pt; font-weight: 600; color: #4a5568;
          line-height: 1.1;
          word-break: break-all;
          max-width: 100%;
          text-align: center;
        }
        .sf-qr-wrap {
          background: white; border-radius: 6px;
          padding: 0.04in;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) inset;
          margin-top: 0.04in;
        }
        .sf-qr { display: block; width: 1.15in; height: 1.15in; }

        /* ─── Footer ──────────────────────────────────────────────── */
        .sf-footer {
          margin-top: auto; padding-top: 0.13in;
          display: flex; flex-direction: column; align-items: center; gap: 0.03in;
          width: 100%;
        }
        .sf-fine-print {
          font-size: 6.5pt; font-weight: 500;
          color: rgba(255,255,255,0.55);
          line-height: 1.3;
          margin: 0 0 0.06in 0;
          max-width: 4in;
          text-align: center;
        }
        .sf-footer-url {
          font-size: 11pt; font-weight: 700;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sf-footer-loc {
          font-size: 8pt; font-weight: 500;
          color: rgba(255,255,255,0.6);
          letter-spacing: 1.5px; text-transform: uppercase;
        }
      `}</style>

      <button onClick={() => window.print()} className="sf-print-btn no-print">Save as PDF</button>
      <div className="sf-preview-label no-print">5″ × 7″ Table-Top Flyer</div>

      <div className="sf-page">
        <div className="sf-glow-tl" />
        <div className="sf-glow-br" />
        <div className="sf-mtn" />

        <div className="sf-content">
          <div className="sf-header">
            <div className="sf-top-row">
              <div className="sf-logo-wrap">
                <div className="sf-logo-glow" />
                <img src="/logo.png" alt="Colorado Springs Health Collective" className="sf-logo" />
              </div>
              <span className="sf-eyebrow">Follow &amp; Win</span>
            </div>

            <div className="sf-headline-wrap">
              <svg
                className="sf-headline-svg"
                viewBox="0 0 360 150"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="$100"
              >
                <defs>
                  <linearGradient id="prizeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="22%" stopColor="#c5f0eb" />
                    <stop offset="50%" stopColor="#4fd1c7" />
                    <stop offset="75%" stopColor="#63b3ed" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <filter id="prizeShadow" x="-10%" y="-10%" width="120%" height="140%">
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
                <g filter="url(#prizeShadow)">
                  <text
                    x="180" y="115"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="135"
                    letterSpacing="-4"
                    fill="#0a0e14"
                    transform="translate(0, 6)"
                  >
                    $100
                  </text>
                  <text
                    x="180" y="115"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="135"
                    letterSpacing="-4"
                    fill="url(#prizeFill)"
                  >
                    $100
                  </text>
                </g>
              </svg>
            </div>

            <h2 className="sf-subhead">CSHC Service Credit</h2>
            <span className="sf-prize-tag">Drawing today · 1 winner</span>
          </div>

          {/* How to enter */}
          <div className="sf-steps">
            <span className="sf-steps-eyebrow">How to enter</span>
            <div className="sf-step">
              <span className="sf-step-num">1</span>
              <span>Follow us on <b>Instagram</b> or <b>TikTok</b></span>
            </div>
            <div className="sf-step">
              <span className="sf-step-num">2</span>
              <span>DM us <b>&ldquo;ENTERED&rdquo;</b> so we know you&apos;re in</span>
            </div>
          </div>

          <div className="sf-cards">
            {/* Instagram */}
            <div className="sf-card ig">
              <div className="sf-card-icon-wrap">
                <SiInstagram size={20} className="sf-card-icon" />
              </div>
              <span className="sf-card-platform">Instagram</span>
              <span className="sf-card-handle">@coshealthcollective</span>
              <div className="sf-qr-wrap">
                <canvas ref={igQrRef} className="sf-qr" />
              </div>
            </div>

            {/* TikTok */}
            <div className="sf-card tt">
              <div className="sf-card-icon-wrap">
                <SiTiktok size={20} className="sf-card-icon" />
              </div>
              <span className="sf-card-platform">TikTok</span>
              <span className="sf-card-handle">@cos.health.collec</span>
              <div className="sf-qr-wrap">
                <canvas ref={ttQrRef} className="sf-qr" />
              </div>
            </div>
          </div>

          <div className="sf-footer">
            <p className="sf-fine-print">
              Credit redeemable toward any CSHC service (DPC, HBOT, HRT, TRT, and more). Winner notified by DM at end of event.
            </p>
            <div className="sf-footer-url">coshealthcollective.com</div>
            <div className="sf-footer-loc">Colorado Springs, CO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
