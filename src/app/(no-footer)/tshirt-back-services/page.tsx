"use client";

export default function TshirtBackServicesPage() {
  return (
    <>
      <style>{`
        .tbs-page {
          background: #000;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
        }
        .tbs-label {
          color: #4a5568;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .tbs-scale-outer { display: flex; justify-content: center; }
        .tbs-scale-inner { zoom: 0.5; transform-origin: top center; }

        /* The artboard is JUST the bottom panel that goes under the
           existing C-wings logo on the shirt. Keep it compact with
           generous internal margins so it never overruns the print
           boundary. */
        .tbs-artboard {
          width: 1100px;
          height: 420px;
          position: relative;
          background: transparent;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 90px;
          gap: 48px;
          box-sizing: border-box;
        }

        /* ── Eyebrow: small MODERN HEALTHCARE ───────── */
        .tbs-eyebrow-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
        }
        .tbs-eyebrow-rule {
          width: 130px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #ff2d8e 50%,
            #00d4ff 50%,
            transparent 100%
          );
          box-shadow:
            0 0 8px rgba(255, 45, 142, 0.85),
            0 0 12px rgba(0, 212, 255, 0.85);
          border-radius: 2px;
        }
        .tbs-eyebrow {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: 14px;
          text-transform: uppercase;
          padding-left: 12px;
          background: linear-gradient(
            90deg,
            #ff2d8e 0%,
            #ffffff 50%,
            #00d4ff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter:
            drop-shadow(0 0 14px rgba(255, 45, 142, 0.5))
            drop-shadow(0 0 14px rgba(0, 212, 255, 0.5));
        }

        /* ── Abbreviation row: HRT · TRT · DPC ────── */
        .tbs-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          width: 100%;
        }

        .tbs-abbr-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 0 20px;
        }

        .tbs-abbr {
          font-family: "Impact", "Haettenschweiler", "Anton", "Oswald",
                       "Arial Narrow", "Helvetica Inserat", sans-serif;
          font-size: 64px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          line-height: 1;
          color: #ffffff;
          text-shadow:
            0 2px 6px rgba(0, 0, 0, 0.9),
            0 0 22px rgba(255, 255, 255, 0.18);
        }

        /* Separator: short gradient line + glowing dot + short gradient line */
        .tbs-sep {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tbs-sep-line {
          width: 60px;
          height: 2px;
          border-radius: 2px;
        }
        .tbs-sep.pink .tbs-sep-line {
          background: linear-gradient(
            90deg,
            rgba(255, 45, 142, 0) 0%,
            #ff2d8e 100%
          );
          box-shadow: 0 0 10px rgba(255, 45, 142, 0.8);
        }
        .tbs-sep.pink .tbs-sep-line.right {
          background: linear-gradient(
            90deg,
            #ff2d8e 0%,
            rgba(255, 45, 142, 0) 100%
          );
        }
        .tbs-sep.cyan .tbs-sep-line {
          background: linear-gradient(
            90deg,
            rgba(0, 212, 255, 0) 0%,
            #00d4ff 100%
          );
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
        }
        .tbs-sep.cyan .tbs-sep-line.right {
          background: linear-gradient(
            90deg,
            #00d4ff 0%,
            rgba(0, 212, 255, 0) 100%
          );
        }

        .tbs-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tbs-dot.pink {
          background: #ff2d8e;
          box-shadow:
            0 0 10px #ff2d8e,
            0 0 24px rgba(255, 45, 142, 0.85),
            0 0 42px rgba(255, 45, 142, 0.5);
        }
        .tbs-dot.cyan {
          background: #00d4ff;
          box-shadow:
            0 0 10px #00d4ff,
            0 0 24px rgba(0, 212, 255, 0.85),
            0 0 42px rgba(0, 212, 255, 0.5);
        }
        .tbs-dot.pink {
          background: #ff6cc7;
          box-shadow:
            0 0 10px rgba(255, 108, 199, 0.95),
            0 0 22px rgba(255, 108, 199, 0.6),
            0 0 36px rgba(255, 108, 199, 0.35);
        }
        .tbs-dot.cyan {
          background: #5dc8ff;
          box-shadow:
            0 0 10px rgba(93, 200, 255, 0.95),
            0 0 22px rgba(93, 200, 255, 0.6),
            0 0 36px rgba(93, 200, 255, 0.35);
        }

        /* ── HBOT line below ─────────────────────── */
        .tbs-hbot-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 30px;
        }
        .tbs-hbot {
          font-family: "Impact", "Haettenschweiler", "Anton", "Oswald",
                       "Arial Narrow", "Helvetica Inserat", sans-serif;
          font-size: 64px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          line-height: 1;
          color: #ffffff;
          text-shadow:
            0 2px 6px rgba(0, 0, 0, 0.9),
            0 0 22px rgba(255, 255, 255, 0.18);
          margin-bottom: 14px;
        }
        .tbs-hbot-rule {
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #ff2d8e 25%,
            #ffffff 50%,
            #00d4ff 75%,
            transparent 100%
          );
          box-shadow:
            0 0 10px rgba(255, 45, 142, 0.85),
            0 0 14px rgba(0, 212, 255, 0.8);
          border-radius: 2px;
        }
      `}</style>

      <div className="tbs-page">
        <div className="tbs-label">UNDER-WINGS PANEL · DTG on black shirt</div>
        <div className="tbs-scale-outer">
          <div className="tbs-scale-inner">
            <div className="tbs-artboard">

              <div className="tbs-eyebrow-wrap">
                <div className="tbs-eyebrow-rule" />
                <span className="tbs-eyebrow">Modern Healthcare</span>
                <div className="tbs-eyebrow-rule" />
              </div>

              <div className="tbs-stack">
                <div className="tbs-abbr-row">
                  <span className="tbs-abbr">HRT</span>
                  <span className="tbs-sep pink">
                    <span className="tbs-sep-line" />
                    <span className="tbs-dot pink" />
                    <span className="tbs-sep-line right" />
                  </span>
                  <span className="tbs-abbr">TRT</span>
                  <span className="tbs-sep cyan">
                    <span className="tbs-sep-line" />
                    <span className="tbs-dot cyan" />
                    <span className="tbs-sep-line right" />
                  </span>
                  <span className="tbs-abbr">DPC</span>
                </div>
                <div className="tbs-hbot-wrap">
                  <span className="tbs-hbot">Hyperbaric Oxygen</span>
                  <span className="tbs-hbot-rule" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
