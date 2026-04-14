"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Heart, Droplets, Dumbbell, Phone, Mail, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export default function MailroomFlyer2() {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, "https://coshealthcollective.com", { width: 100, margin: 0, color: { dark: "#1a202c", light: "#ffffff" } });
    }
  }, []);

  return (
    <div className="mailroom-flyer-container">
      <style>{`
        @media print {
          @page { size: 8.5in 11in portrait; margin: 0 !important; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; width: 8.5in; height: 11in; }
          .no-print { display: none !important; }
          .mailroom-flyer-container { padding: 0 !important; margin: 0 !important; min-height: auto !important; background: transparent !important; }
          .flyer-preview { margin: 0 !important; padding: 0 !important; }
          .flyer-page { width: 8.5in !important; height: 11in !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; }
          .headline { text-shadow: none !important; text-decoration: none !important; outline: none !important; border: none !important; }
          * { text-decoration: none !important; outline: none !important; }
        }
        .mailroom-flyer-container { background: #f7fafc; min-height: 100vh; padding: 1rem; font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
        .flyer-preview { max-width: 8.5in; margin: 0 auto; }
        .flyer-page { width: 8.5in; height: 11in; margin: 0 auto; background: #1a202c; box-shadow: 0 4px 20px rgba(0,0,0,0.3); position: relative; overflow: hidden; page-break-inside: avoid; }
        .flyer-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'); background-size: cover; background-position: center; opacity: 0.35; mix-blend-mode: soft-light; }
        .flyer-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; padding: 0.4in 0.5in; }
        .header-section { text-align: center; margin-bottom: 0.25in; }
        .logo-header { width: 100%; max-width: 4in; height: auto; margin: 0 auto 0.02in; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
        .dpc-label { font-size: 13pt; font-weight: 600; color: #ffffff; margin-bottom: 0.12in; letter-spacing: 0.5px; }
        .headline { font-size: 18pt; font-weight: 700; color: #f6e05e; margin-bottom: 0.12in; line-height: 1.25; text-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .subheadline { font-size: 12pt; color: #e2e8f0; margin-bottom: 0.1in; line-height: 1.4; }
        .problem-solution { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3in; margin-bottom: 0.25in; }
        .problem-box, .solution-box { background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 0.2in; }
        .problem-box { border-top: 3px solid #f56565; }
        .solution-box { border-top: 3px solid #4fd1c7; }
        .box-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.1in; display: flex; align-items: center; gap: 0.08in; }
        .problem-box .box-title { color: #fc8181; }
        .solution-box .box-title { color: #4fd1c7; }
        .box-list { font-size: 9.5pt; color: #cbd5e0; line-height: 1.5; }
        .box-list li { margin-bottom: 0.06in; padding-left: 0.15in; position: relative; }
        .box-list li::before { content: '•'; position: absolute; left: 0; }
        .services-section { margin-bottom: 0.25in; }
        .services-title { font-size: 13pt; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 0.15in; }
        .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.2in; }
        .service-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 0.15in; text-align: center; }
        .service-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.08in; }
        .service-icon.dpc { background: linear-gradient(135deg, #f6ad55, #ed8936); }
        .service-icon.hormone { background: linear-gradient(135deg, #ed8936, #f56565); }
        .service-icon.iv { background: linear-gradient(135deg, #4fd1c7, #63b3ed); }
        .service-icon.coaching { background: linear-gradient(135deg, #63b3ed, #805ad5); }
        .service-icon svg { color: #1a202c; width: 18px; height: 18px; }
        .service-name { font-size: 9pt; font-weight: 600; color: #ffffff; line-height: 1.2; }
        .cta-section { background: linear-gradient(135deg, rgba(79,209,199,0.2), rgba(99,179,237,0.2)); border: 2px solid #4fd1c7; border-radius: 12px; padding: 0.2in 0.3in; text-align: center; margin-bottom: 0.2in; }
        .cta-headline { font-size: 14pt; font-weight: 700; color: #4fd1c7; margin-bottom: 0.08in; display: flex; align-items: center; justify-content: center; gap: 0.1in; }
        .cta-text { font-size: 11pt; color: #e2e8f0; margin-bottom: 0.05in; }
        .cta-action { font-size: 12pt; font-weight: 700; color: #f6e05e; }
        .footer-section { margin-top: auto; }
        .contact-strip { background: #4fd1c7; padding: 0.2in 0.3in; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; }
        .contact-info { display: flex; flex-direction: column; gap: 0.08in; }
        .contact-item { display: flex; align-items: center; gap: 0.08in; color: #1a202c; font-size: 11pt; font-weight: 600; }
        .contact-item svg { flex-shrink: 0; width: 16px; height: 16px; }
        .qr-box { display: flex; flex-direction: column; align-items: center; gap: 0.06in; }
        .qr-canvas { background: white; padding: 0.08in; border-radius: 8px; }
        .qr-label { color: #1a202c; font-size: 9pt; font-weight: 700; }
        .print-button { position: fixed; top: 1rem; right: 1rem; z-index: 1000; background: linear-gradient(135deg, #4fd1c7, #63b3ed); color: #1a202c; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(79,209,199,0.3); transition: all 0.3s ease; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79,209,199,0.4); }
        .home-link { position: fixed; top: 1rem; left: 1rem; z-index: 1000; }
        .home-link img { height: 50px; width: auto; cursor: pointer; transition: transform 0.2s ease; }
        .home-link img:hover { transform: scale(1.05); }
        .preview-label { text-align: center; color: #4a5568; font-weight: 600; margin-bottom: 1rem; font-size: 0.9rem; }
      `}</style>

      <Link href="/" className="home-link no-print">
        <img src="/logo-main.png" alt="Home" />
      </Link>

      <button onClick={() => window.print()} className="print-button no-print">Print / Save as PDF</button>

      <div className="flyer-preview">
        <div className="preview-label no-print">MAILROOM FLYER 2 - 8.5" x 11"</div>
        <div className="flyer-page">
          <div className="flyer-content">
            <div className="header-section">
              <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="logo-header" />
              <div className="dpc-label">— Direct Primary Care —</div>
              <div className="headline">Are your insurance premiums out of control?<br />And receiving less care?</div>
              <div className="subheadline">We offer a different model for primary care.</div>
            </div>

            <div className="problem-solution">
              <div className="problem-box">
                <div className="box-title">The Insurance Problem</div>
                <ul className="box-list">
                  <li>Rising premiums every year</li>
                  <li>High deductibles you never meet</li>
                  <li>Surprise bills after visits</li>
                  <li>Weeks to get an appointment</li>
                  <li>10-minute rushed visits</li>
                  <li>Can't reach your doctor</li>
                </ul>
              </div>
              <div className="solution-box">
                <div className="box-title"><CheckCircle style={{ width: 14, height: 14 }} /> Direct Primary Care Solution</div>
                <ul className="box-list">
                  <li>One flat monthly fee — no surprises</li>
                  <li>Same or next-day appointments</li>
                  <li>30-60 minute visits, never rushed</li>
                  <li>Text or call your provider directly</li>
                  <li>Unlimited visits at no additional charge</li>
                  <li>Wholesale labs &amp; medications</li>
                </ul>
              </div>
            </div>

            <div className="services-section">
              <div className="services-title">What We Offer</div>
              <div className="services-grid">
                <div className="service-card"><div className="service-icon dpc"><Heart /></div><div className="service-name">Direct<br />Primary Care</div></div>
                <div className="service-card"><div className="service-icon hormone"><Sparkles /></div><div className="service-name">Hormone &amp;<br />Menopause</div></div>
                <div className="service-card"><div className="service-icon iv"><Droplets /></div><div className="service-name">Mobile<br />IV Therapy</div></div>
                <div className="service-card"><div className="service-icon coaching"><Dumbbell /></div><div className="service-name">Strength &amp;<br />Wellness</div></div>
              </div>
            </div>

            <div className="cta-section">
              <div className="cta-headline"><ArrowRight style={{ width: 18, height: 18 }} /> Take Back Control of Your Healthcare</div>
              <div className="cta-text">No more waiting. No more surprise bills. No more being just a number.</div>
              <div className="cta-action">Book a FREE Meet &amp; Greet — Scan the QR Code Below</div>
            </div>

            <div className="footer-section">
              <div className="contact-strip">
                <div className="contact-info">
                  <div className="contact-item"><Phone /><span>(719) 824-4716</span></div>
                  <div className="contact-item"><Mail /><span>dpc@coshealthcollective.com</span></div>
                </div>
                <div className="qr-box">
                  <canvas ref={qrCodeRef} className="qr-canvas"></canvas>
                  <div className="qr-label">coshealthcollective.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
