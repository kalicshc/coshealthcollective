"use client";

type Tier = "excellent" | "above" | "average" | "below" | "poor";

interface Row {
  age: string;
  excellent: string;
  above: string;
  average: string;
  below: string;
  poor: string;
  cutoff: string;
}

const MEN: Row[] = [
  { age: "20–29", excellent: "≥123", above: "110–121", average: "79–108", below: "68–77", poor: "≤68", cutoff: "60" },
  { age: "30–39", excellent: "≥126", above: "112–123", average: "82–110", below: "71–79", poor: "≤71", cutoff: "60" },
  { age: "40–49", excellent: "≥121", above: "108–119", average: "77–106", below: "66–75", poor: "≤66", cutoff: "60" },
  { age: "50–59", excellent: "≥112", above: "99–110", average: "71–97", below: "60–68", poor: "≤60", cutoff: "60" },
  { age: "60–69", excellent: "≥104", above: "90–101", average: "66–88", below: "55–64", poor: "≤55", cutoff: "60" },
  { age: "70–79", excellent: "≥93", above: "79–90", average: "55–77", below: "44–53", poor: "≤44", cutoff: "60" },
  { age: "80+", excellent: "≥77", above: "66–75", average: "44–64", below: "33–42", poor: "≤33", cutoff: "60" },
];

const WOMEN: Row[] = [
  { age: "20–29", excellent: "≥79", above: "68–77", average: "49–66", below: "42–46", poor: "≤42", cutoff: "35" },
  { age: "30–39", excellent: "≥79", above: "71–77", average: "51–68", below: "42–49", poor: "≤42", cutoff: "35" },
  { age: "40–49", excellent: "≥77", above: "66–75", average: "49–64", below: "40–46", poor: "≤40", cutoff: "35" },
  { age: "50–59", excellent: "≥71", above: "62–68", average: "44–60", below: "37–42", poor: "≤37", cutoff: "35" },
  { age: "60–69", excellent: "≥64", above: "55–62", average: "40–53", below: "33–37", poor: "≤33", cutoff: "35" },
  { age: "70–79", excellent: "≥57", above: "49–55", average: "33–46", below: "26–31", poor: "≤26", cutoff: "35" },
  { age: "80+", excellent: "≥49", above: "42–46", average: "29–40", below: "22–26", poor: "≤22", cutoff: "35" },
];

const TIER_LABELS: { key: Tier; label: string; sub: string }[] = [
  { key: "excellent", label: "Excellent", sub: "≥90th" },
  { key: "above", label: "Above Avg", sub: "75–89th" },
  { key: "average", label: "Average", sub: "25–74th" },
  { key: "below", label: "Below Avg", sub: "10–24th" },
  { key: "poor", label: "Poor", sub: "<10th" },
];

function Table({ title, accent, rows }: { title: string; accent: "rose" | "cyan"; rows: Row[] }) {
  return (
    <div className={`gst-table ${accent}`}>
      <div className="gst-table-head">
        <div className="gst-table-title">{title}</div>
        <div className="gst-table-subtitle">Dominant-hand grip · pounds (lbs)</div>
      </div>

      <div className="gst-grid">
        <div className="gst-cell gst-col-head age">Age</div>
        {TIER_LABELS.map((t) => (
          <div key={t.key} className={`gst-cell gst-col-head tier-${t.key}`}>
            <div className="tier-label">{t.label}</div>
            <div className="tier-sub">{t.sub} %ile</div>
          </div>
        ))}
        <div className="gst-cell gst-col-head sarcopenia">
          <div className="tier-label">Sarcopenia</div>
          <div className="tier-sub">cutoff</div>
        </div>

        {rows.map((r) => (
          <div className="gst-row" key={r.age}>
            <div className="gst-cell age">{r.age}</div>
            <div className="gst-cell tier-excellent">{r.excellent}</div>
            <div className="gst-cell tier-above">{r.above}</div>
            <div className="gst-cell tier-average">{r.average}</div>
            <div className="gst-cell tier-below">{r.below}</div>
            <div className="gst-cell tier-poor">{r.poor}</div>
            <div className="gst-cell sarcopenia">{r.cutoff}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GripStrengthTiers() {
  return (
    <div className="gst-shell">
      <style>{`
        @media print {
          @page { size: 17in 11in landscape; margin: 0; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .gst-shell { background: white !important; padding: 0 !important; min-height: auto !important; }
          .gst-preview-label { display: none !important; }
        }

        .gst-shell {
          background: #0a0e14;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          display: flex; flex-direction: column; align-items: center;
        }
        .gst-preview-label {
          color: #4a5568; font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .gst-print-btn {
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #0a0e14; border: none; padding: 0.7rem 1.6rem;
          border-radius: 8px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; margin-bottom: 1.5rem;
          box-shadow: 0 6px 22px rgba(79,209,199,0.35);
        }

        /* ─── Page (17in × 11in landscape — tabloid) ──────────────── */
        .gst-page {
          width: 17in; height: 11in;
          position: relative; overflow: hidden;
          background:
            radial-gradient(ellipse 65% 50% at 50% 0%, rgba(79,209,199,0.20) 0%, rgba(99,179,237,0.10) 35%, transparent 70%),
            radial-gradient(ellipse 75% 45% at 50% 100%, rgba(167,139,250,0.18) 0%, rgba(244,114,182,0.10) 30%, transparent 65%),
            linear-gradient(180deg, #0a0e14 0%, #0f1622 30%, #131a28 70%, #0a0e14 100%);
          box-shadow: 0 14px 60px rgba(0,0,0,0.55);
        }
        .gst-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 0.4in 0.4in;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.95), transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.95), transparent 90%);
          pointer-events: none;
        }
        .gst-glow-tl, .gst-glow-br {
          position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none;
        }
        .gst-glow-tl { top: -3in; left: -2in; width: 8in; height: 8in; background: radial-gradient(circle, rgba(79,209,199,0.35), transparent 70%); }
        .gst-glow-br { bottom: -3in; right: -2in; width: 9in; height: 9in; background: radial-gradient(circle, rgba(167,139,250,0.30), rgba(244,114,182,0.16) 50%, transparent 75%); }

        .gst-content {
          position: relative; z-index: 5;
          width: 100%; height: 100%;
          padding: 0.5in 0.65in 0.45in 0.65in;
          display: flex; flex-direction: column;
        }

        /* ─── Header ──────────────────────────────────────────────── */
        .gst-header {
          text-align: center;
          margin-bottom: 0.22in;
        }
        .gst-eyebrow {
          font-size: 11pt; font-weight: 800;
          letter-spacing: 5px; text-transform: uppercase;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.08in;
        }
        .gst-title {
          font-size: 48pt; font-weight: 900;
          color: white; line-height: 1; margin: 0;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 22px rgba(0,0,0,0.6);
        }
        .gst-title strong {
          background: linear-gradient(135deg, #5fe0d3, #63b3ed 50%, #a78bfa);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gst-subtitle {
          font-size: 13pt; font-weight: 600;
          color: rgba(255,255,255,0.78);
          margin: 0.1in 0 0 0;
          line-height: 1.35;
        }

        /* ─── Tier legend strip ───────────────────────────────────── */
        .gst-legend {
          display: flex; align-items: center; justify-content: center;
          gap: 0.22in; flex-wrap: nowrap;
          padding: 0.1in 0.2in;
          margin: 0.1in 0 0.22in 0;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
        }
        .gst-legend-item {
          display: flex; align-items: center; gap: 0.08in;
          font-size: 10.5pt; font-weight: 700;
          color: rgba(255,255,255,0.88);
        }
        .gst-legend-dot {
          width: 0.18in; height: 0.18in; border-radius: 4px;
          flex-shrink: 0;
        }
        .gst-legend-divider {
          width: 1px; height: 0.22in;
          background: rgba(255,255,255,0.18);
        }

        /* ─── Tables ──────────────────────────────────────────────── */
        .gst-tables {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.3in;
          flex: 1;
        }

        .gst-table {
          background: linear-gradient(180deg, #131a28 0%, #0f1622 100%);
          border-radius: 16px;
          padding: 0.22in 0.25in 0.24in 0.25in;
          border: 3px solid;
          display: flex; flex-direction: column;
        }
        .gst-table.cyan {
          border-image: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 100%) 1;
          box-shadow: 0 0 22px rgba(79,209,199,0.14) inset, 0 6px 18px rgba(0,0,0,0.4);
        }
        .gst-table.rose {
          border-image: linear-gradient(135deg, #f472b6 0%, #a78bfa 100%) 1;
          box-shadow: 0 0 22px rgba(244,114,182,0.14) inset, 0 6px 18px rgba(0,0,0,0.4);
        }

        .gst-table-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 0.14in;
          padding: 0 0.04in;
        }
        .gst-table-title {
          font-size: 22pt; font-weight: 900;
          letter-spacing: 3px; text-transform: uppercase;
          line-height: 1;
        }
        .gst-table.cyan .gst-table-title {
          background: linear-gradient(135deg, #5fe0d3, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gst-table.rose .gst-table-title {
          background: linear-gradient(135deg, #f472b6, #a78bfa);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gst-table-subtitle {
          font-size: 10pt; font-weight: 600;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.5px;
        }

        .gst-grid {
          display: grid;
          grid-template-columns: 0.7fr 1fr 1fr 1fr 1fr 1fr 0.95fr;
          gap: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 10px;
          overflow: hidden;
          flex: 1;
        }
        .gst-row {
          display: contents;
        }
        .gst-cell {
          padding: 0.14in 0.06in;
          font-size: 14pt; font-weight: 700;
          color: rgba(255,255,255,0.95);
          text-align: center;
          background: #0f1622;
          line-height: 1.1;
          display: flex; align-items: center; justify-content: center;
        }
        .gst-cell.age {
          font-weight: 800;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.9);
          font-size: 13pt;
        }
        .gst-col-head {
          font-size: 11pt !important; font-weight: 800;
          padding: 0.12in 0.05in;
          flex-direction: column; gap: 2px;
          line-height: 1.1;
          background: rgba(255,255,255,0.05);
        }
        .gst-col-head .tier-label {
          font-size: 11pt; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.6px;
        }
        .gst-col-head .tier-sub {
          font-size: 7.5pt; font-weight: 600;
          opacity: 0.75;
          text-transform: uppercase; letter-spacing: 0.6px;
        }

        /* Tier color coding (cell backgrounds for data rows) */
        .gst-row .tier-excellent {
          background: linear-gradient(180deg, rgba(34,197,94,0.30), rgba(34,197,94,0.18));
          color: #d1fae5;
        }
        .gst-row .tier-above {
          background: linear-gradient(180deg, rgba(74,222,128,0.22), rgba(74,222,128,0.12));
          color: #ecfccb;
        }
        .gst-row .tier-average {
          background: linear-gradient(180deg, rgba(99,179,237,0.20), rgba(99,179,237,0.10));
          color: #dbeafe;
        }
        .gst-row .tier-below {
          background: linear-gradient(180deg, rgba(251,146,60,0.25), rgba(251,146,60,0.14));
          color: #fed7aa;
        }
        .gst-row .tier-poor {
          background: linear-gradient(180deg, rgba(239,68,68,0.32), rgba(239,68,68,0.18));
          color: #fecaca;
        }
        .gst-row .sarcopenia {
          background: linear-gradient(180deg, rgba(251,191,36,0.20), rgba(251,191,36,0.10));
          color: #fef3c7;
          font-weight: 800;
          border-left: 2px solid rgba(251,191,36,0.45);
        }

        /* Header tier colors */
        .gst-col-head.tier-excellent .tier-label { color: #4ade80; }
        .gst-col-head.tier-above .tier-label { color: #a3e635; }
        .gst-col-head.tier-average .tier-label { color: #93c5fd; }
        .gst-col-head.tier-below .tier-label { color: #fdba74; }
        .gst-col-head.tier-poor .tier-label { color: #fca5a5; }
        .gst-col-head.sarcopenia .tier-label { color: #fbbf24; }

        /* ─── Footer ──────────────────────────────────────────────── */
        .gst-footer {
          margin-top: 0.22in;
          padding: 0.18in 0.25in;
          border-top: 1px solid rgba(79,209,199,0.20);
          background: rgba(255,255,255,0.025);
          border-radius: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.3in;
        }
        .gst-foot-block { }
        .gst-foot-eyebrow {
          font-size: 9pt; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #5fe0d3;
          margin-bottom: 0.06in;
        }
        .gst-foot-text {
          font-size: 10pt; font-weight: 600;
          color: rgba(255,255,255,0.82);
          line-height: 1.4;
          margin: 0;
        }
        .gst-foot-text strong { color: #fff; font-weight: 800; }
        .gst-foot-text .accent { color: #fbbf24; font-weight: 800; }

        .gst-brandbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 0.14in;
          padding-top: 0.1in;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .gst-brand {
          font-size: 12pt; font-weight: 800;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.92);
        }
        .gst-brand strong {
          background: linear-gradient(135deg, #5fe0d3, #63b3ed);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gst-brand-sub {
          font-size: 9.5pt; font-weight: 600;
          color: rgba(255,255,255,0.6);
          letter-spacing: 2px; text-transform: uppercase;
        }
      `}</style>

      <button onClick={() => window.print()} className="gst-print-btn no-print">Save as PDF</button>
      <div className="gst-preview-label no-print">17″ × 11″ Landscape (Tabloid) — Grip Strength Tier Reference</div>

      <div className="gst-page">
        <div className="gst-grid-bg" />
        <div className="gst-glow-tl" />
        <div className="gst-glow-br" />

        <div className="gst-content">
          <div className="gst-header">
            <div className="gst-eyebrow">Where do you stand?</div>
            <h1 className="gst-title">
              Grip Strength <strong>Tiers</strong>
            </h1>
            <p className="gst-subtitle">
              One of the strongest predictors of healthy aging. Find your age row, scan across, and see where your score lands.
            </p>
          </div>

          <div className="gst-legend">
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(34,197,94,0.55)" }} />
              Excellent
            </div>
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(74,222,128,0.45)" }} />
              Above Avg
            </div>
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(99,179,237,0.45)" }} />
              Average
            </div>
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(251,146,60,0.50)" }} />
              Below Avg
            </div>
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(239,68,68,0.55)" }} />
              Poor
            </div>
            <div className="gst-legend-divider" />
            <div className="gst-legend-item">
              <span className="gst-legend-dot" style={{ background: "rgba(251,191,36,0.55)" }} />
              Sarcopenia cutoff
            </div>
          </div>

          <div className="gst-tables">
            <Table title="Women" accent="rose" rows={WOMEN} />
            <Table title="Men" accent="cyan" rows={MEN} />
          </div>

          <div className="gst-footer">
            <div className="gst-foot-block">
              <div className="gst-foot-eyebrow">Why it matters</div>
              <p className="gst-foot-text">
                Each <strong>5-kg drop</strong> in grip is linked to a 6–20% higher risk of losing daily-living independence. Maximal mortality benefit caps near <strong>92 lb (men)</strong> and <strong>55 lb (women)</strong>.
              </p>
            </div>
            <div className="gst-foot-block">
              <div className="gst-foot-eyebrow">Sarcopenia flag</div>
              <p className="gst-foot-text">
                EWGSOP2 flags <span className="accent">probable sarcopenia</span> at &lt;60 lb (men) or &lt;35 lb (women) at any age. Below the line warrants a follow-up.
              </p>
            </div>
            <div className="gst-foot-block">
              <div className="gst-foot-eyebrow">Sources</div>
              <p className="gst-foot-text">
                Synthesized from NIH Toolbox, NHANES, SHARE (Europe), and British population studies. Values are <strong>dominant-hand, peak squeeze, in pounds (lb)</strong>.
              </p>
            </div>
          </div>

          <div className="gst-brandbar">
            <div className="gst-brand">
              <strong>CoSHealth</strong> Collective
            </div>
            <div className="gst-brand-sub">Grip Strength Challenge · Live Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
