"use client";

export default function TshirtBackPage() {
  return (
    <>
      <style>{`
        .tbk-page {
          background: #000;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
        }
        .tbk-label {
          color: #4a5568; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .tbk-scale-outer { display: flex; justify-content: center; }
        .tbk-scale-inner { zoom: 0.45; transform-origin: top center; }

        .tbk-artboard {
          width: 1152px;
          height: 960px;
          position: relative;
          background: transparent;
          overflow: hidden;
        }

        /* ─── Photo: wide, gradual feather on all 4 sides ─── */
        /* Multi-stop gradients = much more natural dissolve    */
        .tbk-ph {
          position: absolute; inset: 0; z-index: 0;
          -webkit-mask-image: linear-gradient(to right,
            transparent      0%,
            rgba(0,0,0,0.25) 5%,
            rgba(0,0,0,0.7)  11%,
            black            20%,
            black            80%,
            rgba(0,0,0,0.7)  89%,
            rgba(0,0,0,0.25) 95%,
            transparent      100%
          );
          mask-image: linear-gradient(to right,
            transparent      0%,
            rgba(0,0,0,0.25) 5%,
            rgba(0,0,0,0.7)  11%,
            black            20%,
            black            80%,
            rgba(0,0,0,0.7)  89%,
            rgba(0,0,0,0.25) 95%,
            transparent      100%
          );
        }
        .tbk-pv {
          position: absolute; inset: 0;
          -webkit-mask-image: linear-gradient(to bottom,
            transparent      0%,
            rgba(0,0,0,0.2)  6%,
            rgba(0,0,0,0.65) 13%,
            black            22%,
            black            78%,
            rgba(0,0,0,0.65) 87%,
            rgba(0,0,0,0.2)  94%,
            transparent      100%
          );
          mask-image: linear-gradient(to bottom,
            transparent      0%,
            rgba(0,0,0,0.2)  6%,
            rgba(0,0,0,0.65) 13%,
            black            22%,
            black            78%,
            rgba(0,0,0,0.65) 87%,
            rgba(0,0,0,0.2)  94%,
            transparent      100%
          );
        }
        .tbk-pv img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          filter: saturate(1.4) brightness(0.88) contrast(1.1);
        }

        /* Vignette sits INSIDE .tbk-pv so both masks clip it —
           no dark pixels can leak outside the fade zone        */
        .tbk-vignette {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse 88% 72% at 50% 44%,
            transparent 42%,
            rgba(0, 3, 12, 0.4) 100%
          );
        }

        /* ─── Text block: back up in the sky ──────────────── */
        .tbk-text {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 2;
          text-align: center;
          padding-top: 118px;
          line-height: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Shadow mixin — same treatment for all three lines:
           dark backing for readability + teal/white glow pop  */

        /* COLORADO SPRINGS */
        .tbk-cos {
          display: block;
          font-size: 44px;
          font-weight: 800;
          letter-spacing: 13px;
          text-transform: uppercase;
          color: hsl(184, 68%, 58%);
          text-shadow:
            0 2px 6px  rgba(0, 0, 0, 0.95),
            0 4px 16px rgba(0, 0, 0, 0.88),
            0 0  22px  rgba(0, 0, 0, 0.7),
            0 0  28px  hsla(184, 80%, 52%, 0.55),
            0 0  60px  hsla(184, 75%, 48%, 0.28);
          margin-bottom: 10px;
        }

        /* HEALTH COLLECTIVE */
        .tbk-hc {
          display: block;
          font-size: 88px;
          font-weight: 950;
          letter-spacing: 3px;
          text-transform: uppercase;
          white-space: nowrap;
          color: hsl(184, 68%, 58%);
          text-shadow:
            0 2px 8px  rgba(0, 0, 0, 0.95),
            0 4px 18px rgba(0, 0, 0, 0.9),
            0 0  26px  rgba(0, 0, 0, 0.72),
            0 0  36px  hsla(184, 80%, 52%, 0.6),
            0 0  80px  hsla(184, 75%, 48%, 0.32),
            0 0  130px hsla(184, 70%, 44%, 0.16);
          margin-bottom: 28px;
        }

        /* OFFERINGS — white, same shadow pop, right below headline */
        .tbk-services {
          display: block;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow:
            0 2px 6px  rgba(0, 0, 0, 0.95),
            0 4px 14px rgba(0, 0, 0, 0.88),
            0 0  20px  rgba(0, 0, 0, 0.65),
            0 0  40px  rgba(0, 0, 0, 0.3);
        }
        .tbk-dot {
          color: hsl(184, 68%, 58%);
          margin: 0 12px;
        }
      `}</style>

      <div className="tbk-page">
        <div className="tbk-label">BACK — 12&quot; × 10&quot; · DTG on black shirt</div>
        <div className="tbk-scale-outer">
          <div className="tbk-scale-inner">
            <div className="tbk-artboard">

              <div className="tbk-ph">
                <div className="tbk-pv">
                  <img
                    src="/images/tshirt/pikes-peak-4k.png"
                    alt="Pikes Peak at sunset through fog"
                  />
                  {/* Vignette inside both masks — clipped, can't bleed */}
                  <div className="tbk-vignette" />
                </div>
              </div>

              <div className="tbk-text">
                <span className="tbk-cos">Colorado Springs</span>
                <span className="tbk-hc">Health Collective</span>
                <span className="tbk-services">
                  Direct Primary Care
                  <span className="tbk-dot">·</span>
                  Hormone Health
                  <span className="tbk-dot">·</span>
                  Hyperbaric Oxygen
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
