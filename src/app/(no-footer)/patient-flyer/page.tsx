"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Heart, Stethoscope, Droplets, Sparkles, Dumbbell, Phone, Mail, MapPin, CheckCircle, Clock, MessageCircle, Users as UsersIcon, CalendarCheck, Pill, Activity } from "lucide-react";

export default function PatientFlyer() {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, "https://coshealthcollective.com", { width: 70, margin: 0, color: { dark: "#1a202c", light: "#ffffff" } });
    }
  }, []);

  return (
    <div className="patient-flyer-container">
      <style>{`
        @media print {
          @page { size: 6in 4in landscape; margin: 0; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; break-after: page; }
          .flyer-page { width: 6in; height: 4in; margin: 0; padding: 0; }
        }
        .patient-flyer-container { background: #f7fafc; min-height: 100vh; padding: 2rem 1rem; font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
        .flyer-preview { max-width: 900px; margin: 0 auto; }
        .flyer-page { width: 6in; height: 4in; margin: 0 auto 2rem; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.15); position: relative; overflow: hidden; page-break-inside: avoid; }
        .front-side { background: #1a202c; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.75in 0.5in; position: relative; }
        .front-side::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'); background-size: cover; background-position: center; opacity: 0.15; mix-blend-mode: soft-light; }
        .front-content { position: relative; z-index: 2; text-align: center; width: 100%; }
        .logo-header { width: 100%; max-width: 5in; height: auto; margin-bottom: 0.35in; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); }
        .tagline { font-size: 15pt; font-weight: 500; color: #e2e8f0; margin-bottom: 0.15in; line-height: 1.3; }
        .subheadline { font-size: 13pt; font-weight: 700; background: linear-gradient(135deg, #4fd1c7, #63b3ed, #f6ad55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.15in; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
        .location { display: flex; align-items: center; justify-content: center; gap: 0.15in; color: #a0aec0; font-size: 11pt; }
        .location svg { color: #4fd1c7; }
        .back-side { background: white; padding: 0.3in 0.4in 0.25in; display: flex; flex-direction: column; }
        .back-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.25in; flex: 1; margin-bottom: 0.2in; }
        .column { display: flex; flex-direction: column; }
        .column-header { font-size: 11pt; font-weight: 700; color: #2d3748; margin-bottom: 0.12in; padding-bottom: 0.08in; border-bottom: 2px solid; border-image: linear-gradient(90deg, #4fd1c7, #63b3ed) 1; }
        .column-description { font-size: 8pt; color: #4a5568; margin-bottom: 0.12in; font-style: italic; line-height: 1.3; }
        .column-list { list-style: none; padding: 0; margin: 0; flex: 1; }
        .column-list li { font-size: 8.5pt; color: #2d3748; margin-bottom: 0.08in; display: flex; align-items: flex-start; gap: 0.08in; line-height: 1.25; }
        .column-list svg { flex-shrink: 0; margin-top: 0.02in; color: #4fd1c7; }
        .contact-strip { background: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 50%, #f6ad55 100%); padding: 0.1in 0.15in; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; gap: 0.12in; }
        .contact-info { display: flex; align-items: center; gap: 0.2in; flex: 1; }
        .contact-item { display: flex; align-items: center; gap: 0.06in; color: white; font-size: 8pt; font-weight: 600; }
        .contact-item svg { flex-shrink: 0; width: 12px; height: 12px; }
        .qr-section { display: flex; flex-direction: column; align-items: center; gap: 0.05in; }
        .qr-canvas { background: white; padding: 0.04in; border-radius: 4px; }
        .qr-label { color: white; font-size: 7pt; font-weight: 600; text-align: center; }
        .print-button { position: fixed; top: 1rem; right: 1rem; z-index: 1000; background: linear-gradient(135deg, #4fd1c7, #63b3ed); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(79,209,199,0.3); transition: all 0.3s ease; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79,209,199,0.4); }
        .preview-label { text-align: center; color: #4a5568; font-weight: 600; margin-bottom: 1rem; font-size: 0.9rem; }
      `}</style>

      <button onClick={() => window.print()} className="print-button no-print">Print Flyer</button>

      <div className="flyer-preview">
        <div className="preview-label no-print">FRONT SIDE</div>
        <div className="flyer-page front-side">
          <div className="front-content">
            <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="logo-header" />
            <div className="tagline">Affordable care for longevity, wellness, and community</div>
            <div className="subheadline">Direct Primary Care • Urgent Care • Wellness Services</div>
            <div className="location"><MapPin style={{ width: 16, height: 16 }} /><span>Colorado Springs, Colorado</span></div>
          </div>
        </div>

        <div className="page-break"></div>

        <div className="preview-label no-print">BACK SIDE</div>
        <div className="flyer-page back-side">
          <div className="back-columns">
            <div className="column">
              <div className="column-header"><Heart style={{ display: 'inline', marginRight: '4px', width: 14, height: 14 }} />Direct Primary Care</div>
              <div className="column-description">Unlimited primary care membership</div>
              <ul className="column-list">
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>Unlimited office visits</span></li>
                <li><Clock style={{ width: 12, height: 12 }} /><span>Same/next-day appointments</span></li>
                <li><MessageCircle style={{ width: 12, height: 12 }} /><span>Direct provider access</span></li>
                <li><CalendarCheck style={{ width: 12, height: 12 }} /><span>Preventive &amp; routine care</span></li>
                <li><UsersIcon style={{ width: 12, height: 12 }} /><span>Care coordination</span></li>
              </ul>
            </div>
            <div className="column">
              <div className="column-header"><Stethoscope style={{ display: 'inline', marginRight: '4px', width: 14, height: 14 }} />Urgent Care &amp; Telehealth</div>
              <div className="column-description">Walk-in or virtual care</div>
              <ul className="column-list">
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>Strep, flu, COVID testing</span></li>
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>UTIs, cough/cold</span></li>
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>Minor injuries &amp; lacerations</span></li>
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>Telehealth available</span></li>
                <li><CheckCircle style={{ width: 12, height: 12 }} /><span>In-home visits</span></li>
              </ul>
            </div>
            <div className="column">
              <div className="column-header"><Activity style={{ display: 'inline', marginRight: '4px', width: 14, height: 14 }} />Wellness Services</div>
              <div className="column-description">Enhance your health</div>
              <ul className="column-list">
                <li><Droplets style={{ width: 12, height: 12 }} /><span>Mobile IV therapy</span></li>
                <li><Droplets style={{ width: 12, height: 12 }} /><span>Migraine cocktails</span></li>
                <li><Droplets style={{ width: 12, height: 12 }} /><span>Nausea medications</span></li>
                <li><Sparkles style={{ width: 12, height: 12 }} /><span>Prescription skin care</span></li>
                <li><Dumbbell style={{ width: 12, height: 12 }} /><span>Strength &amp; wellness coaching</span></li>
              </ul>
            </div>
          </div>
          <div className="contact-strip">
            <div className="contact-info">
              <div className="contact-item"><Phone /><span>(719) 824-4716</span></div>
              <div className="contact-item"><Mail /><span>dpc@coshealthcollective.com</span></div>
            </div>
            <div className="qr-section">
              <canvas ref={qrCodeRef} className="qr-canvas"></canvas>
              <div className="qr-label">Scan to visit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
