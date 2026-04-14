"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function EventBanner() {
  return (
    <div className="event-banner-container">
      <style>{`
        @media print {
          @page { size: 60in 24in landscape; margin: 0; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .banner-page { width: 60in; height: 24in; margin: 0; padding: 0; }
        }
        .event-banner-container { background: #0a0e14; min-height: 100vh; padding: 2rem 1rem; font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
        .home-link { display: inline-flex; align-items: center; gap: 0.5rem; color: #4fd1c7; text-decoration: none; font-size: 0.9rem; margin-bottom: 1.5rem; transition: color 0.2s ease; }
        .home-link:hover { color: #63b3ed; }
        .print-button { display: block; margin: 0 auto 2rem; padding: 1rem 2rem; background: linear-gradient(135deg, #4fd1c7, #63b3ed); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(79,209,199,0.3); }
        .banner-preview { max-width: 100%; margin: 0 auto; overflow-x: auto; }
        .preview-label { text-align: center; color: #a0aec0; font-size: 0.85rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; }
        .banner-page { width: 30in; height: 12in; margin: 0 auto 2rem; background: linear-gradient(to bottom, #0a0e14 0%, #0f1419 20%, #1a1f2e 40%, #2d3a4f 55%, #4a5568 65%, #7b8794 72%, #9ca3af 78%, #c4a574 84%, #d4956a 88%, #e8855a 92%, #f59e4a 96%, #fbbf24 100%); box-shadow: 0 4px 20px rgba(0,0,0,0.5); position: relative; overflow: hidden; }
        .mountain-layer { position: absolute; bottom: 0; left: 0; width: 100%; height: 45%; background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80'); background-size: cover; background-position: center bottom; opacity: 0.7; mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%); }
        .sunset-glow { position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(251,191,36,0.4) 0%, rgba(245,158,74,0.35) 20%, rgba(232,133,90,0.25) 40%, rgba(180,100,120,0.15) 60%, transparent 100%); z-index: 1; }
        .dark-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(10,14,20,0.9) 0%, rgba(10,14,20,0.75) 25%, rgba(10,14,20,0.5) 50%, rgba(10,14,20,0.2) 75%, transparent 100%); z-index: 2; }
        .banner-content { position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding: 0.6in 1.2in; }
        .left-section { display: flex; align-items: center; gap: 0.5in; }
        .logo-container { flex-shrink: 0; position: relative; }
        .logo-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 3.5in; height: 3.5in; background: radial-gradient(circle, rgba(79,209,199,0.5) 0%, rgba(99,179,237,0.4) 25%, rgba(139,92,246,0.3) 50%, rgba(139,92,246,0.15) 70%, transparent 100%); border-radius: 50%; filter: blur(20px); z-index: -1; }
        .logo-img { width: 2.6in; height: auto; position: relative; z-index: 1; filter: drop-shadow(0 0 15px rgba(79,209,199,0.6)); }
        .text-section { display: flex; flex-direction: column; gap: 0.15in; }
        .title { font-size: 0.72in; font-weight: 700; color: white; line-height: 1.05; text-shadow: 0 4px 20px rgba(0,0,0,0.7); margin: 0; letter-spacing: -0.01em; }
        .subtitle { font-size: 0.38in; font-weight: 600; background: linear-gradient(135deg, #4fd1c7, #63b3ed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0.08in 0 0 0; }
        .tagline { font-size: 0.24in; color: rgba(255,255,255,0.85); font-style: italic; margin: 0.1in 0 0 0; }
        .value-props { position: absolute; bottom: 1.8in; left: 0; right: 0; display: flex; justify-content: center; gap: 0.4in; z-index: 10; }
        .value-prop { font-size: 0.3in; font-weight: 600; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.7); display: flex; align-items: center; gap: 0.2in; }
        .value-prop::before { content: '•'; color: #4fd1c7; font-size: 0.4in; }
        .value-prop:first-child::before { display: none; }
        .footer-info { position: absolute; bottom: 0.8in; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: 0.15in; z-index: 10; }
        .footer-item { display: flex; align-items: center; gap: 0.08in; font-size: 0.26in; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }
        .footer-item svg { color: #4fd1c7; width: 0.24in; height: 0.24in; }
        .footer-separator { color: white; font-size: 0.26in; }
        .right-section { flex-shrink: 0; align-self: flex-start; margin-top: 0.4in; }
        .perk-box { background: rgba(10,14,20,0.85); border-radius: 12px; padding: 0.4in 0.45in; text-align: left; min-width: 3.8in; position: relative; border: 3px solid transparent; background-clip: padding-box; }
        .perk-box::before { content: ''; position: absolute; top: -3px; left: -3px; right: -3px; bottom: -3px; background: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 30%, #a78bfa 50%, #f6ad55 70%, #fbbf24 100%); border-radius: 14px; z-index: -1; }
        .perk-title { font-size: 0.34in; font-weight: 700; color: #fbbf24; margin: 0 0 0.15in 0; line-height: 1.2; }
        .perk-subtitle { font-size: 0.2in; color: rgba(255,255,255,0.9); margin: 0; line-height: 1.5; }
      `}</style>

      <Link href="/" className="home-link no-print">← Back to Home</Link>
      <button onClick={() => window.print()} className="print-button no-print">Save as PDF</button>

      <div className="banner-preview">
        <div className="preview-label no-print">2 FT × 5 FT BANNER (scaled preview)</div>
        <div className="banner-page">
          <div className="mountain-layer"></div>
          <div className="sunset-glow"></div>
          <div className="dark-overlay"></div>
          <div className="banner-content">
            <div className="left-section">
              <div className="logo-container">
                <div className="logo-glow"></div>
                <img src="/logo.png" alt="Colorado Springs Health Collective" className="logo-img" />
              </div>
              <div className="text-section">
                <h1 className="title">COLORADO SPRINGS<br />HEALTH COLLECTIVE</h1>
                <h2 className="subtitle">Direct Primary Care</h2>
                <p className="tagline">Ask us about Direct Primary Care,<br />longevity, and preventive health</p>
              </div>
            </div>
            <div className="right-section">
              <div className="perk-box">
                <h3 className="perk-title">Get an event-only<br />perk</h3>
                <p className="perk-subtitle">First month membership<br />discount when you sign<br />up after this event</p>
              </div>
            </div>
            <div className="value-props">
              <span className="value-prop">Flat monthly fee</span>
              <span className="value-prop">Unlimited access</span>
              <span className="value-prop">Providers who actually know you</span>
            </div>
            <div className="footer-info">
              <div className="footer-item"><MapPin /><span>Colorado Springs, CO</span></div>
              <span className="footer-separator">•</span>
              <div className="footer-item"><span>coshealthcollective.com</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
