"use client";

export default function WorkNote() {
  return (
    <div className="work-note-container">
      <style>{`
        @media print {
          @page { size: 8.5in 11in portrait; margin: 0.75in; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .work-note-container { padding: 0 !important; background: white !important; min-height: unset !important; }
          .work-note-page { box-shadow: none !important; border: none !important; margin: 0 !important; max-width: none !important; padding: 0 !important; }
        }
        body { background: #f0f4f8; }
        .work-note-container { min-height: 100vh; background: #f0f4f8; padding: 40px 20px; font-family: 'Georgia', 'Times New Roman', serif; }
        .work-note-page { background: white; max-width: 8.5in; margin: 0 auto; padding: 0.75in; box-shadow: 0 4px 24px rgba(0,0,0,0.12); min-height: 11in; box-sizing: border-box; position: relative; }
        .letterhead-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 3px solid #2b7a7a; margin-bottom: 10px; }
        .letterhead-logo { height: 72px; width: auto; }
        .letterhead-contact { text-align: right; font-family: 'Arial', sans-serif; font-size: 11px; color: #2b7a7a; line-height: 1.6; font-weight: 600; letter-spacing: 0.01em; }
        .letterhead-contact span { display: block; font-size: 13px; font-weight: 700; color: #1a3a3a; margin-bottom: 2px; letter-spacing: 0.02em; }
        .divider-bar { height: 3px; background: linear-gradient(to right, #2b7a7a, #4fd1c7, #2b7a7a); margin-bottom: 36px; border-radius: 2px; }
        .note-body { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 13px; color: #1a1a1a; line-height: 1.8; }
        .note-date { margin-bottom: 24px; color: #333; }
        .note-salutation { margin-bottom: 20px; font-weight: 600; }
        .note-re { margin-bottom: 24px; padding: 10px 14px; background: #f7fafa; border-left: 4px solid #2b7a7a; font-weight: 600; color: #1a3a3a; font-size: 13.5px; }
        .note-paragraph { margin-bottom: 18px; text-align: justify; }
        .note-closing { margin-top: 40px; }
        .note-closing-word { margin-bottom: 36px; color: #333; }
        .signature-block { border-top: 1px solid #ccc; padding-top: 10px; margin-top: 0; display: inline-block; min-width: 260px; }
        .signature-name { font-weight: 700; font-size: 13.5px; color: #1a1a1a; margin-bottom: 2px; }
        .signature-detail { font-size: 11.5px; color: #555; }
        .footer-bar { position: absolute; bottom: 0.75in; left: 0.75in; right: 0.75in; border-top: 2px solid #2b7a7a; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; }
        .footer-practice { font-family: 'Arial', sans-serif; font-size: 10.5px; color: #2b7a7a; font-weight: 600; }
        .footer-contact { font-family: 'Arial', sans-serif; font-size: 10.5px; color: #666; }
        .print-btn { display: block; margin: 0 auto 24px; max-width: 8.5in; text-align: right; }
        .print-btn button { background: #2b7a7a; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Arial', sans-serif; letter-spacing: 0.02em; }
        .print-btn button:hover { background: #1f5c5c; }
        .e-sign-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #2b7a7a; background: #f0fafa; border: 1px solid #b2dfdf; border-radius: 4px; padding: 3px 8px; margin-top: 6px; }
      `}</style>

      <div className="print-btn no-print">
        <button onClick={() => window.print()}>🖨 Print / Save as PDF</button>
      </div>

      <div className="work-note-page">
        <div className="letterhead-header">
          <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="letterhead-logo" />
          <div className="letterhead-contact">
            <span>Colorado Springs Health Collective</span>
            Phone: 719-824-4716 &nbsp;|&nbsp; Email: dpc@coshealthcollective.com
          </div>
        </div>
        <div className="divider-bar" />

        <div className="note-body">
          <p className="note-date">Date: Saturday, March 14, 2026</p>
          <p className="note-salutation">To Whom It May Concern,</p>
          <div className="note-re">Re: Laci Lipsey (DOB: 10/08/1986)</div>
          <p className="note-paragraph">
            Ms. Lipsey was evaluated today in clinic by Logan Crist, PA-C for an acute viral illness. Due to her current symptoms, she is advised to remain off work today and tomorrow (March 14–15, 2026).
          </p>
          <p className="note-paragraph">
            She may return to work on Tuesday, March 17, 2026, if she has been fever-free for at least 24 hours without fever-reducing medication and her symptoms are improving.
          </p>
          <div className="note-closing">
            <p className="note-closing-word">Sincerely,</p>
            <div className="signature-block">
              <p className="signature-name">Logan Crist, PA-C</p>
              <div className="e-sign-badge">✓ Electronically signed · 03/14/2026</div>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <span className="footer-practice">Colorado Springs Health Collective</span>
          <span className="footer-contact">719-824-4716 · dpc@coshealthcollective.com</span>
        </div>
      </div>
    </div>
  );
}
