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
          padding: 0.32in 0.4in 0.28in 0.4in;
          display: flex; flex-direction: column;
          align-items: center;
        }

        /* ─── Header ──────────────────────────────────────────────── */
        .sf-header { text-align: center; margin-bottom: 0.1in; }
        .sf-lockup {
          display: flex; align-items: center; justify-content: center;
          gap: 0.08in; margin-bottom: 0.08in;
        }
        .sf-logo-wrap { position: relative; display: inline-block; flex-shrink: 0; }
        .sf-logo-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 1.2in; height: 1.2in;
          background: radial-gradient(circle, rgba(79,209,199,0.55) 0%, rgba(99,179,237,0.4) 30%, rgba(167,139,250,0.25) 55%, transparent 75%);
          border-radius: 50%; filter: blur(14px); z-index: 0;
        }
        .sf-logo {
          position: relative; z-index: 1;
          width: 0.78in; height: auto; display: block;
          filter: drop-shadow(0 0 10px rgba(79,209,199,0.55));
        }

        .sf-headline-wrap {
          position: relative; display: inline-block;
          line-height: 0;
        }
        .sf-headline-wrap::before {
          content: ''; position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -42%);
          width: 130%; height: 130%;
          background: radial-gradient(ellipse, rgba(79,209,199,0.5) 0%, rgba(167,139,250,0.3) 40%, transparent 72%);
          filter: blur(28px); z-index: -1;
        }
        .sf-headline-svg {
          display: block;
          height: 0.78in; width: auto;
          overflow: visible;
        }
        .sf-tagline {
          font-size: 9pt; font-weight: 500; line-height: 1.3;
          color: rgba(255,255,255,0.8);
          margin: 0; max-width: 3.7in;
        }

        /* ─── Social cards ────────────────────────────────────────── */
        .sf-cards { display: flex; flex-direction: column; gap: 0.14in; width: 100%; margin-top: 0.12in; }

        .sf-card {
          position: relative;
          background: rgba(255,255,255,0.97);
          border-radius: 14px;
          padding: 0.14in 0.18in;
          display: flex; align-items: center; gap: 0.18in;
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
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

        .sf-card-info { flex: 1; display: flex; flex-direction: column; gap: 0.04in; min-width: 0; }
        .sf-card-icon-row { display: flex; align-items: center; gap: 0.08in; }
        .sf-card-icon-wrap {
          width: 0.42in; height: 0.42in; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sf-card.ig .sf-card-icon-wrap {
          background: linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%);
        }
        .sf-card.tt .sf-card-icon-wrap {
          background: #0a0e14;
          position: relative;
        }
        .sf-card-icon { color: white; }
        .sf-card-platform {
          font-size: 14pt; font-weight: 800; color: #0a0e14;
          line-height: 1; letter-spacing: -0.01em;
        }
        .sf-card-handle {
          font-size: 10pt; font-weight: 600; color: #2d3748;
          margin-top: 0.02in;
          word-break: break-all;
        }
        .sf-card-cta {
          font-size: 8.5pt; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px;
          margin-top: 0.06in;
        }
        .sf-card.ig .sf-card-cta { color: #dc2743; }
        .sf-card.tt .sf-card-cta { color: #0a0e14; }

        .sf-qr-wrap {
          background: white; border-radius: 8px;
          padding: 0.05in; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) inset;
        }
        .sf-qr { display: block; width: 1.2in; height: 1.2in; }

        /* ─── Footer ──────────────────────────────────────────────── */
        .sf-footer {
          margin-top: auto; padding-top: 0.15in;
          display: flex; flex-direction: column; align-items: center; gap: 0.04in;
          width: 100%;
        }
        .sf-footer-url {
          font-size: 11pt; font-weight: 700;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sf-footer-loc {
          font-size: 8.5pt; font-weight: 500;
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
            <div className="sf-lockup">
              <div className="sf-logo-wrap">
                <div className="sf-logo-glow" />
                <img src="/logo.png" alt="Colorado Springs Health Collective" className="sf-logo" />
              </div>
              <div className="sf-headline-wrap">
                <svg
                  className="sf-headline-svg"
                  viewBox="0 0 400 100"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Follow us"
                >
                  <defs>
                    <linearGradient id="followFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="22%" stopColor="#c5f0eb" />
                      <stop offset="50%" stopColor="#4fd1c7" />
                      <stop offset="75%" stopColor="#63b3ed" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <filter id="followShadow" x="-10%" y="-15%" width="120%" height="160%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                      <feOffset dx="0" dy="5" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.55" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#followShadow)">
                    <text
                      x="200" y="74"
                      textAnchor="middle"
                      fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                      fontWeight="900"
                      fontSize="62"
                      letterSpacing="-1.5"
                      wordSpacing="12"
                      fill="#0a0e14"
                      transform="translate(0, 4)"
                    >
                      FOLLOW US
                    </text>
                    <text
                      x="200" y="74"
                      textAnchor="middle"
                      fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                      fontWeight="900"
                      fontSize="62"
                      letterSpacing="-1.5"
                      wordSpacing="12"
                      fill="url(#followFill)"
                    >
                      FOLLOW US
                    </text>
                  </g>
                </svg>
              </div>
            </div>
            <p className="sf-tagline">
              For more on modern healthcare and solutions most people don&apos;t know exist.
            </p>
          </div>

          <div className="sf-cards">
            {/* Instagram */}
            <div className="sf-card ig">
              <div className="sf-card-info">
                <div className="sf-card-icon-row">
                  <div className="sf-card-icon-wrap">
                    <SiInstagram size={22} className="sf-card-icon" />
                  </div>
                  <span className="sf-card-platform">Instagram</span>
                </div>
                <div className="sf-card-handle">@coshealthcollective</div>
                <div className="sf-card-cta">Scan to follow →</div>
              </div>
              <div className="sf-qr-wrap">
                <canvas ref={igQrRef} className="sf-qr" />
              </div>
            </div>

            {/* TikTok */}
            <div className="sf-card tt">
              <div className="sf-card-info">
                <div className="sf-card-icon-row">
                  <div className="sf-card-icon-wrap">
                    <SiTiktok size={22} className="sf-card-icon" />
                  </div>
                  <span className="sf-card-platform">TikTok</span>
                </div>
                <div className="sf-card-handle">@cos.health.collec</div>
                <div className="sf-card-cta">Scan to follow →</div>
              </div>
              <div className="sf-qr-wrap">
                <canvas ref={ttQrRef} className="sf-qr" />
              </div>
            </div>
          </div>

          <div className="sf-footer">
            <div className="sf-footer-url">coshealthcollective.com</div>
            <div className="sf-footer-loc">Colorado Springs, CO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
