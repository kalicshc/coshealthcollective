"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Heart, Droplets, Dumbbell, Phone, Mail, Home as HomeIcon, Sparkles } from "lucide-react";

export default function MailroomFlyer() {
  const qrCodeMainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeMainRef.current) {
      QRCode.toCanvas(qrCodeMainRef.current, "https://coshealthcollective.com", { width: 90, margin: 0, color: { dark: "#1a202c", light: "#ffffff" } });
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
        }
        .mailroom-flyer-container { background: #f7fafc; min-height: 100vh; padding: 1rem; font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
        .flyer-preview { max-width: 8.5in; margin: 0 auto; }
        .flyer-page { width: 8.5in; height: 11in; margin: 0 auto; background: #1a202c; box-shadow: 0 4px 20px rgba(0,0,0,0.3); position: relative; overflow: hidden; page-break-inside: avoid; }
        .flyer-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'); background-size: cover; background-position: center; opacity: 0.4; mix-blend-mode: soft-light; }
        .flyer-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; padding: 0.5in 0.6in; }
        .header-section { text-align: center; margin-bottom: 0.35in; }
        .logo-header { width: 100%; max-width: 4.5in; height: auto; margin: 0 auto 0.2in; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
        .pain-point { font-size: 15pt; font-weight: 700; color: #f6e05e; margin-bottom: 0.12in; line-height: 1.3; }
        .tagline { font-size: 12pt; color: #e2e8f0; margin-bottom: 0.1in; }
        .home-visits { font-size: 11pt; color: #4fd1c7; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.08in; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.3in; flex: 1; margin-bottom: 0.3in; }
        .service-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 0.25in; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
        .service-card.dpc::before { background: linear-gradient(90deg, #f6ad55, #ed8936); }
        .service-card.longevity::before { background: linear-gradient(90deg, #ed8936, #f56565); }
        .service-card.iv::before { background: linear-gradient(90deg, #4fd1c7, #63b3ed); }
        .service-card.coaching::before { background: linear-gradient(90deg, #63b3ed, #805ad5); }
        .service-header { display: flex; align-items: center; gap: 0.12in; margin-bottom: 0.12in; }
        .service-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .service-icon.dpc { background: linear-gradient(135deg, #f6ad55, #ed8936); }
        .service-icon.longevity { background: linear-gradient(135deg, #ed8936, #f56565); }
        .service-icon.iv { background: linear-gradient(135deg, #4fd1c7, #63b3ed); }
        .service-icon.coaching { background: linear-gradient(135deg, #63b3ed, #805ad5); }
        .service-icon svg { color: #1a202c; width: 20px; height: 20px; }
        .service-title { font-size: 13pt; font-weight: 700; color: #ffffff; line-height: 1.2; }
        .service-description { font-size: 10pt; color: #cbd5e0; line-height: 1.5; }
        .footer-section { margin-top: auto; }
        .contact-strip { background: #4fd1c7; padding: 0.2in 0.3in; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; }
        .contact-info { display: flex; flex-direction: column; gap: 0.1in; }
        .contact-item { display: flex; align-items: center; gap: 0.1in; color: #1a202c; font-size: 12pt; font-weight: 600; }
        .contact-item svg { flex-shrink: 0; width: 18px; height: 18px; }
        .qr-section { display: flex; gap: 0.25in; }
        .qr-box { display: flex; flex-direction: column; align-items: center; gap: 0.08in; }
        .qr-canvas { background: white; padding: 0.08in; border-radius: 8px; }
        .qr-label { color: #1a202c; font-size: 9pt; font-weight: 600; text-align: center; }
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
        <div className="preview-label no-print">MAILROOM FLYER - 8.5" x 11"</div>
        <div className="flyer-page">
          <div className="flyer-content">
            <div className="header-section">
              <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="logo-header" />
              <div className="pain-point">Are your insurance premiums out of control?<br />Can you not afford healthcare?</div>
              <div className="tagline">Affordable care for longevity, wellness, and community</div>
              <div className="home-visits"><HomeIcon style={{ width: 14, height: 14 }} /> Home Visits Available</div>
            </div>

            <div className="services-grid">
              <div className="service-card dpc">
                <div className="service-header"><div className="service-icon dpc"><Heart /></div><div className="service-title">Direct Primary Care</div></div>
                <div className="service-description">Unlimited primary care for a flat monthly fee. Same/next-day appointments, direct provider access, and no insurance hassles. Skip the waiting room and the surprise bills.</div>
              </div>
              <div className="service-card longevity">
                <div className="service-header"><div className="service-icon longevity"><Sparkles /></div><div className="service-title">Longevity &amp; Preventive Health</div></div>
                <div className="service-description">Menopause and hormone health, anti-aging skin care, and personalized preventive care plans. Focus on feeling your best at every stage of life.</div>
              </div>
              <div className="service-card iv">
                <div className="service-header"><div className="service-icon iv"><Droplets /></div><div className="service-title">Mobile IV Therapy &amp; Migraine Relief</div></div>
                <div className="service-description">IV hydration delivered to your home. Migraine cocktails and nausea relief for fast recovery when you need it most.</div>
              </div>
              <div className="service-card coaching">
                <div className="service-header"><div className="service-icon coaching"><Dumbbell /></div><div className="service-title">Strength &amp; Wellness Coaching</div></div>
                <div className="service-description">Personalized fitness plans, nutrition guidance, and stress reduction techniques for total wellbeing and lasting results.</div>
              </div>
            </div>

            <div className="footer-section">
              <div className="contact-strip">
                <div className="contact-info">
                  <div className="contact-item"><Phone /><span>(719) 824-4716</span></div>
                  <div className="contact-item"><Mail /><span>dpc@coshealthcollective.com</span></div>
                </div>
                <div className="qr-section">
                  <div className="qr-box">
                    <canvas ref={qrCodeMainRef} className="qr-canvas"></canvas>
                    <div className="qr-label">Visit Our Website</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
