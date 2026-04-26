"use client";

import Image from "next/image";
import Link from "next/link";

export default function TshirtPage() {
  return (
    <div className="tshirt-page">
      <style>{`
        @media print {
          @page { size: 12in 16in; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; background: transparent !important; }
          .no-print { display: none !important; }
          .tshirt-page { padding: 0 !important; background: transparent !important; min-height: auto !important; }
          .tshirt-export { margin: 0 !important; transform: none !important; }
          .tshirt-artboard { box-shadow: none !important; }
        }

        .tshirt-page {
          min-height: 100vh;
          padding: 2rem;
          background:
            radial-gradient(circle at top left, rgba(79, 209, 199, 0.16), transparent 36rem),
            linear-gradient(135deg, #071018 0%, #111827 46%, #171a22 100%);
          color: #f8fafc;
          font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
        }

        .tshirt-toolbar {
          max-width: 1180px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .tshirt-home {
          color: #78efe7;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .tshirt-print {
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #4fd1c7, #63b3ed);
          color: #071018;
          cursor: pointer;
          font-weight: 800;
          padding: 0.75rem 1.1rem;
        }

        .tshirt-intro {
          max-width: 1180px;
          margin: 0 auto 2rem;
        }

        .tshirt-eyebrow {
          color: #78efe7;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0 0 0.55rem;
        }

        .tshirt-title {
          margin: 0 0 0.55rem;
          color: white;
          font-size: 2rem;
          line-height: 1.05;
        }

        .tshirt-note {
          max-width: 720px;
          margin: 0;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .tshirt-preview {
          max-width: 1180px;
          margin: 0 auto 1.25rem;
          min-height: 420px;
          border-radius: 8px;
          background: #000;
          border: 1px solid rgba(120, 239, 231, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .preview-label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .preview-lockup {
          width: min(100%, 1000px);
        }

        .preview-lockup.back-preview {
          width: min(100%, 760px);
        }

        .tshirt-export-wrap {
          max-width: 1180px;
          margin: 0 auto;
          overflow: auto;
          border: 1px solid rgba(120, 239, 231, 0.18);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          padding: 1rem;
        }

        .export-label {
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .tshirt-export {
          width: 1152px;
          margin: 0 auto;
        }

        .tshirt-artboard {
          width: 1152px;
          height: 1536px;
          position: relative;
          overflow: hidden;
          background: transparent;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
        }

        .art-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .front-lockup {
          width: 900px;
        }

        .back-lockup {
          width: 900px;
        }

        .mountain-back-art {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .mountain-back-image {
          display: block;
          width: 100%;
          height: auto;
        }

        .front-wordmark {
          --front-size: 88px;
          width: 100%;
          text-align: center;
          text-transform: uppercase;
        }

        .preview-lockup .front-wordmark {
          --front-size: 66px;
        }

        .front-line {
          display: block;
          color: #ffffff;
          font-size: var(--front-size);
          font-weight: 950;
          letter-spacing: 0.025em;
          line-height: 0.96;
          background: linear-gradient(92deg, #008cff 0%, #00d8ff 18%, #18ffd8 39%, #72dcff 56%, #9b63ff 74%, #ff00f5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .front-line + .front-line {
          margin-top: 20px;
        }

        .front-accent {
          display: block;
          width: 72%;
          height: 5px;
          margin: 28px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0%, #008cff 12%, #18ffd8 38%, #7b6dff 67%, #ff00f5 88%, transparent 100%);
          box-shadow:
            0 0 8px rgba(24, 255, 216, 0.45),
            0 0 14px rgba(255, 0, 245, 0.28);
        }

        .back-mark {
          width: 132px;
          height: 132px;
          margin: 0 auto 44px;
          position: relative;
        }

        .back-mark::before {
          content: "";
          position: absolute;
          inset: -18px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(24, 255, 216, 0.18), transparent 62%);
        }

        .back-logo {
          position: relative;
          width: 132px;
          height: 132px;
          object-fit: contain;
        }

        .back-wordmark {
          text-align: center;
          text-transform: uppercase;
        }

        .back-kicker {
          color: #78efe7;
          font-size: 25px;
          font-weight: 900;
          letter-spacing: 0.22em;
          margin-bottom: 24px;
        }

        .back-headline {
          color: #ffffff;
          font-size: 92px;
          font-weight: 950;
          letter-spacing: 0.025em;
          line-height: 0.95;
        }

        .back-headline .gradient {
          display: block;
          background: linear-gradient(92deg, #008cff 0%, #00d8ff 20%, #18ffd8 42%, #72dcff 58%, #9b63ff 78%, #ff00f5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .back-accent {
          display: block;
          width: 66%;
          height: 5px;
          margin: 44px auto 38px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0%, #008cff 12%, #18ffd8 38%, #7b6dff 67%, #ff00f5 88%, transparent 100%);
          box-shadow:
            0 0 8px rgba(24, 255, 216, 0.42),
            0 0 14px rgba(255, 0, 245, 0.24);
        }

        .back-services {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          gap: 30px;
          color: #e5edf5;
          font-size: 46px;
          font-weight: 850;
          letter-spacing: 0.1em;
          line-height: 1;
          text-transform: uppercase;
        }

        .back-services span:not(:last-child)::after {
          display: none;
        }

        .back-services span {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 30px;
        }

        .service-dash {
          display: block;
          width: 76px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0%, #008cff 14%, #18ffd8 42%, #7b6dff 68%, #ff00f5 88%, transparent 100%);
        }

        .back-services span:nth-child(2) .service-dash {
          width: 132px;
        }

        .back-preview .back-mark {
          width: 86px;
          height: 86px;
          margin-bottom: 28px;
        }

        .back-preview .back-mark::before {
          inset: -12px;
        }

        .back-preview .back-logo {
          width: 86px;
          height: 86px;
        }

        .back-preview .back-kicker {
          font-size: 16px;
          margin-bottom: 16px;
        }

        .back-preview .back-headline {
          font-size: 64px;
        }

        .back-preview .back-accent {
          height: 4px;
          margin: 30px auto 26px;
        }

        .back-preview .back-services {
          font-size: 28px;
          gap: 20px;
        }

        .back-preview .service-dash {
          width: 46px;
          height: 3px;
        }

        .back-preview .back-services span:nth-child(2) .service-dash {
          width: 78px;
        }

        .back-preview .back-services span {
          gap: 20px;
        }

        .back-preview .back-services span:not(:last-child)::after {
          display: none;
        }

        @media (max-width: 900px) {
          .tshirt-page { padding: 1rem; }
          .tshirt-toolbar { align-items: flex-start; flex-direction: column; }
          .tshirt-preview { min-height: 300px; }
          .preview-lockup .front-wordmark { --front-size: 34px; }
          .back-preview .back-headline { font-size: 34px; }
          .back-preview .back-services { align-items: center; flex-direction: column; gap: 0.45rem; }
          .back-preview .back-services span:not(:last-child)::after { display: none; }
        }
      `}</style>

      <div className="tshirt-toolbar no-print">
        <Link className="tshirt-home" href="/">Back to Home</Link>
        <button className="tshirt-print" type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <header className="tshirt-intro no-print">
        <p className="tshirt-eyebrow">T-shirt concept</p>
        <h1 className="tshirt-title">Upload-ready shirt art</h1>
        <p className="tshirt-note">
          These previews use black only to simulate the shirt. The exported PNGs are transparent
          with just the artwork.
        </p>
      </header>

      <section className="tshirt-preview no-print" aria-label="Front text preview on black">
        <div className="preview-label">Front preview</div>
        <div className="preview-lockup">
          <FrontGraphic />
        </div>
      </section>

      <section className="tshirt-preview no-print" aria-label="Back text preview on black">
        <div className="preview-label">Back preview</div>
        <div className="preview-lockup back-preview">
          <BackGraphic />
        </div>
      </section>

      <section className="tshirt-export-wrap" aria-label="T-shirt print artboards">
        <div className="export-label no-print">Transparent upload artboards, 12 in x 16 in</div>
        <div className="tshirt-export">
          <div className="tshirt-artboard tshirt-front-art">
            <div className="art-center">
              <div className="front-lockup">
                <FrontGraphic />
              </div>
            </div>
          </div>

          <div className="tshirt-artboard tshirt-back-art">
            <div className="art-center">
              <div className="back-lockup">
                <BackGraphic />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FrontGraphic() {
  return (
    <div className="front-wordmark" aria-label="Colorado Springs Health Collective">
      <span className="front-line">Colorado Springs</span>
      <span className="front-line">Health Collective</span>
      <span className="front-accent" aria-hidden="true"></span>
    </div>
  );
}

function BackGraphic() {
  return (
    <Image
      className="mountain-back-image"
      src="/images/tshirt/tshirt-back-preview.png"
      alt="Colorado Springs Health Collective mountain shirt back"
      width={900}
      height={1200}
      unoptimized
    />
  );
}
