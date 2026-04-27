"use client";

export default function GripStrengthBanner() {
  return (
    <div className="gs-shell">
      <style>{`
        @media print {
          @page { size: 17in 11in landscape; margin: 0; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .gs-shell { background: white !important; padding: 0 !important; min-height: auto !important; }
          .gs-preview-label { display: none !important; }
        }

        .gs-shell {
          background: #0a0e14;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gs-preview-label {
          color: #4a5568; font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .gs-print-btn {
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14; border: none; padding: 0.7rem 1.6rem;
          border-radius: 8px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; margin-bottom: 1.5rem;
          box-shadow: 0 6px 22px rgba(79,209,199,0.35);
        }

        /* ─── Page (17in × 11in landscape) ───────────────────────── */
        .gs-page {
          width: 17in; height: 11in;
          position: relative; overflow: hidden;
          background:
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(79,209,199,0.20) 0%, rgba(99,179,237,0.10) 35%, transparent 70%),
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(167,139,250,0.18) 0%, rgba(244,114,182,0.10) 30%, transparent 65%),
            linear-gradient(180deg, #0a0e14 0%, #0f1622 30%, #131a28 70%, #0a0e14 100%);
          box-shadow: 0 14px 60px rgba(0,0,0,0.55);
        }

        /* Subtle grid */
        .gs-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 0.4in 0.4in;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.95), transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.95), transparent 90%);
          pointer-events: none;
        }
        .gs-glow-tl, .gs-glow-br {
          position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
        }
        .gs-glow-tl { top: -3in; left: -2in; width: 8in; height: 8in; background: radial-gradient(circle, rgba(79,209,199,0.35), transparent 70%); }
        .gs-glow-br { bottom: -3in; right: -2in; width: 9in; height: 9in; background: radial-gradient(circle, rgba(167,139,250,0.3), rgba(244,114,182,0.18) 50%, transparent 75%); }

        .gs-content {
          position: relative; z-index: 5;
          width: 100%; height: 100%;
          padding: 0.6in 0.8in 0.55in 0.8in;
          display: flex; flex-direction: column;
        }

        /* (logo removed — title fills the top instead) */

        /* ─── Hero headline (3D SVG) ──────────────────────────────── */
        .gs-hero {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.32in;
          margin: 0;
        }
        .gs-headline-wrap {
          position: relative; line-height: 0;
        }
        .gs-headline-wrap::before {
          content: ''; position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -45%);
          width: 130%; height: 140%;
          background: radial-gradient(ellipse, rgba(79,209,199,0.5) 0%, rgba(167,139,250,0.3) 40%, transparent 72%);
          filter: blur(60px); z-index: -1;
        }
        .gs-headline-svg {
          display: block;
          height: 3.7in; width: auto;
          overflow: visible;
        }
        .gs-tagline-wrap {
          display: flex; align-items: center; justify-content: center;
          gap: 0.22in; width: 100%; max-width: 16in;
        }
        .gs-tagline-rule {
          flex: 1; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(79,209,199,0.5), rgba(99,179,237,0.5), transparent);
          max-width: 0.8in;
        }
        .gs-tagline {
          font-size: 26pt; font-weight: 800;
          color: white; line-height: 1.2;
          text-align: center; margin: 0;
          text-shadow: 0 2px 22px rgba(0,0,0,0.6);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .gs-tagline strong {
          background: linear-gradient(135deg, #5fe0d3, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        /* ─── Two info cards ──────────────────────────────────────── */
        .gs-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4in;
          width: 100%;
          margin-bottom: 0.2in;
        }
        .gs-card {
          position: relative;
          background: linear-gradient(180deg, #131a28 0%, #0f1622 100%);
          border-radius: 18px;
          padding: 0.36in 0.42in;
        }
        .gs-card.steps {
          border: 3px solid;
          border-image: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 100%) 1;
          border-image-slice: 1;
          box-shadow: 0 0 28px rgba(79,209,199,0.18) inset, 0 8px 24px rgba(0,0,0,0.45);
        }
        .gs-card.prize {
          border: 3px solid;
          border-image: linear-gradient(135deg, #fbbf24 0%, #f6ad55 50%, #f472b6 100%) 1;
          border-image-slice: 1;
          box-shadow: 0 0 28px rgba(251,191,36,0.18) inset, 0 8px 24px rgba(0,0,0,0.45);
        }
        .gs-card-eyebrow {
          font-size: 13pt; font-weight: 900;
          letter-spacing: 4px; text-transform: uppercase;
          margin-bottom: 0.2in;
        }
        .gs-card.steps .gs-card-eyebrow { color: #5fe0d3; }
        .gs-card.prize .gs-card-eyebrow { color: #fbbf24; }
        .gs-step {
          display: flex; align-items: center; gap: 0.18in;
          margin-bottom: 0.12in;
        }
        .gs-step:last-child { margin-bottom: 0; }
        .gs-step-num {
          flex-shrink: 0;
          width: 0.5in; height: 0.5in; border-radius: 50%;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14;
          font-size: 18pt; font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          line-height: 1;
        }
        .gs-step-text {
          font-size: 16pt; font-weight: 700;
          color: white; line-height: 1.25;
        }
        .gs-step-text b { color: #5fe0d3; font-weight: 800; }

        .gs-prize-line {
          font-size: 16pt; font-weight: 700;
          color: rgba(255,255,255,0.92);
          line-height: 1.3;
          margin: 0 0 0.12in 0;
        }
        .gs-prize-amount {
          font-size: 72pt; font-weight: 900;
          line-height: 1; letter-spacing: -2px;
          background: linear-gradient(180deg, #ffffff 0%, #fef3c7 22%, #fbbf24 55%, #f6ad55 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 6px 18px rgba(251,191,36,0.5));
          margin: 0.04in 0 0.06in 0;
        }
        .gs-prize-detail {
          font-size: 13pt; font-weight: 600;
          color: rgba(255,255,255,0.82);
          line-height: 1.35;
          margin: 0 0 0.12in 0;
        }
        .gs-prize-announce {
          font-size: 13pt; font-weight: 800;
          line-height: 1.3;
          margin: 0;
          padding: 0.1in 0;
          border-top: 1px solid rgba(251,191,36,0.3);
          color: #fbbf24;
          letter-spacing: 0.01em;
        }
        .gs-prize-announce strong {
          color: #ffffff;
          font-weight: 900;
        }
        .gs-prize-winners {
          display: inline-block;
          font-size: 12pt; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #fbbf24;
          padding: 0.08in 0.18in;
          border: 1.5px solid rgba(251,191,36,0.5);
          border-radius: 999px;
          margin-bottom: 0.1in;
          background: rgba(251,191,36,0.08);
        }

        /* ─── Pointer to leaderboard ──────────────────────────────── */
        .gs-pointer {
          display: flex; align-items: center; justify-content: center; gap: 0.2in;
          padding: 0.14in 0;
          border-top: 1.5px solid rgba(79,209,199,0.25);
        }
        .gs-pointer-text {
          font-size: 18pt; font-weight: 800;
          letter-spacing: 4px; text-transform: uppercase;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gs-arrow {
          color: #4fd1c7;
          font-size: 28pt; line-height: 1;
        }
      `}</style>

      <button onClick={() => window.print()} className="gs-print-btn no-print">Save as PDF</button>
      <div className="gs-preview-label no-print">17″ × 11″ Whiteboard Topper — Grip Strength Challenge</div>

      <div className="gs-page">
        <div className="gs-grid" />
        <div className="gs-glow-tl" />
        <div className="gs-glow-br" />

        <div className="gs-content">
          {/* Hero */}
          <div className="gs-hero">
            <div className="gs-headline-wrap">
              <svg
                className="gs-headline-svg"
                viewBox="0 0 1480 360"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Grip Strength Challenge"
              >
                <defs>
                  <linearGradient id="gsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="22%" stopColor="#c5f0eb" />
                    <stop offset="50%" stopColor="#4fd1c7" />
                    <stop offset="75%" stopColor="#63b3ed" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <filter id="gsShadow" x="-5%" y="-10%" width="110%" height="135%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                    <feOffset dx="0" dy="14" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.55" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#gsShadow)">
                  {/* Back slab */}
                  <text
                    x="740" y="148"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="170"
                    letterSpacing="-4"
                    fill="#0a0e14"
                    transform="translate(0, 12)"
                  >
                    GRIP STRENGTH
                  </text>
                  <text
                    x="740" y="320"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="170"
                    letterSpacing="-4"
                    fill="#0a0e14"
                    transform="translate(0, 12)"
                  >
                    CHALLENGE
                  </text>
                  {/* Front gradient */}
                  <text
                    x="740" y="148"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="170"
                    letterSpacing="-4"
                    fill="url(#gsFill)"
                  >
                    GRIP STRENGTH
                  </text>
                  <text
                    x="740" y="320"
                    textAnchor="middle"
                    fontFamily="Poppins, system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    fontSize="170"
                    letterSpacing="-4"
                    fill="url(#gsFill)"
                  >
                    CHALLENGE
                  </text>
                </g>
              </svg>
            </div>

            <div className="gs-tagline-wrap">
              <div className="gs-tagline-rule" />
              <p className="gs-tagline">
                Grip strength predicts longevity better than blood pressure. <strong>Test yours.</strong>
              </p>
              <div className="gs-tagline-rule" />
            </div>
          </div>

          {/* Two cards */}
          <div className="gs-cards">
            {/* Steps */}
            <div className="gs-card steps">
              <div className="gs-card-eyebrow">How it works</div>
              <div className="gs-step">
                <span className="gs-step-num">1</span>
                <span className="gs-step-text">Squeeze the dynamometer as hard as you can</span>
              </div>
              <div className="gs-step">
                <span className="gs-step-num">2</span>
                <span className="gs-step-text">We post your score on the <b>leaderboard below</b></span>
              </div>
              <div className="gs-step">
                <span className="gs-step-num">3</span>
                <span className="gs-step-text">Make the <b>top 3</b> by end of day to win</span>
              </div>
            </div>

            {/* Prize */}
            <div className="gs-card prize">
              <div className="gs-card-eyebrow">Win a gift card</div>
              <span className="gs-prize-winners">Top 3 Men · Top 3 Women</span>
              <div className="gs-prize-amount">$10</div>
              <p className="gs-prize-detail">
                e-Gift card to <strong style={{ color: "#fff" }}>your choice</strong> — coffee or smoothie.
                We&apos;ll grab your name + email so we can send you the prize.
              </p>
              <p className="gs-prize-announce">
                Top 3 winners posted on <strong>Instagram + TikTok</strong> tonight!
              </p>
            </div>
          </div>

          {/* Pointer */}
          <div className="gs-pointer">
            <span className="gs-arrow">▼</span>
            <span className="gs-pointer-text">Live Leaderboard Below</span>
            <span className="gs-arrow">▼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
