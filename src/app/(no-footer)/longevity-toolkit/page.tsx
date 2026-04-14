"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Moon, Apple, Dumbbell, Heart, Brain, Sparkles, CheckCircle, Phone, Mail, Globe } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function LongevityToolkit() {
  const homepageQrRef = useRef<HTMLCanvasElement>(null);
  const meetGreetQrRef = useRef<HTMLCanvasElement>(null);
  const instagramQrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const opts = { width: 80, margin: 0, color: { dark: "#1a202c", light: "#ffffff" } };
    if (homepageQrRef.current) QRCode.toCanvas(homepageQrRef.current, "https://coshealthcollective.com", opts);
    if (meetGreetQrRef.current) QRCode.toCanvas(meetGreetQrRef.current, MEET_GREET_URL, opts);
    if (instagramQrRef.current) QRCode.toCanvas(instagramQrRef.current, "https://instagram.com/coshealthcollective", opts);
  }, []);

  return (
    <div className="longevity-toolkit-container">
      <style>{`
        @media print {
          @page { size: letter; margin: 0.5in; }
          html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; margin: 0 !important; padding: 0 !important; background: white !important; }
          .no-print, .preview-label, .home-link, .print-button { display: none !important; }
          .longevity-toolkit-container { background: white !important; background-image: none !important; padding: 0 !important; min-height: auto !important; }
          .longevity-toolkit-container::before, .longevity-toolkit-container::after { display: none !important; }
          .toolkit-preview { max-width: none !important; margin: 0 !important; background: white !important; background-image: none !important; }
          .toolkit-preview { width: 7.5in !important; max-width: 7.5in !important; margin: 0 auto !important; padding: 0 !important; }
          .toolkit-preview::before, .toolkit-preview::after { display: none !important; }
          .corner-accent { display: none !important; }
          .cta-section::before, .cta-section::after { display: none !important; }
          .toolkit-header { break-inside: avoid; page-break-inside: avoid; margin-bottom: 0.2in; padding-top: 0.25in; }
          .intro-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 0.2in; }
          .module { break-inside: avoid; page-break-inside: avoid; margin-bottom: 0.2in; padding-top: 0.25in; }
          .summary-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 0.2in; padding-top: 0.25in; }
          .cta-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 0.2in; padding-top: 0.25in; }
          .contact-footer { break-inside: avoid; page-break-inside: avoid; padding-top: 0.25in; }
        }
        .longevity-toolkit-container { background: #f7fafc; min-height: 100vh; padding: 2rem 1rem; font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
        .toolkit-preview { max-width: 8.5in; margin: 0 auto; }
        .toolkit-page { width: 7.5in; margin: 0 auto 2rem; background: white; box-shadow: 0 4px 30px rgba(0,0,0,0.12); position: relative; overflow: visible; padding: 0.4in 0.5in; }
        .toolkit-header { text-align: center; margin-bottom: 0.3in; padding-bottom: 0.2in; border-bottom: 3px solid; border-image: linear-gradient(90deg, #4fd1c7, #63b3ed, #f6ad55) 1; }
        .logo-img { width: 3in; height: auto; margin: 0 auto 0.15in auto; display: block; }
        .toolkit-title { font-size: 28pt; font-weight: 700; color: #1a202c; margin: 0 0 0.08in 0; letter-spacing: -0.5px; }
        .toolkit-subtitle { font-size: 13pt; font-weight: 400; color: #4a5568; margin: 0; }
        .intro-section { background: linear-gradient(135deg, rgba(79,209,199,0.08), rgba(99,179,237,0.08)); border-radius: 12px; padding: 0.2in; margin-bottom: 0.25in; border-left: 4px solid #4fd1c7; }
        .intro-title { font-size: 14pt; font-weight: 600; color: #1a202c; margin: 0 0 0.1in 0; }
        .intro-text { font-size: 11pt; color: #4a5568; margin: 0; line-height: 1.6; }
        .intro-highlight { display: flex; gap: 0.3in; margin-top: 0.2in; }
        .highlight-item { flex: 1; background: white; border-radius: 8px; padding: 0.15in; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .highlight-label { font-size: 9pt; color: #718096; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.05in; }
        .highlight-value { font-size: 11pt; font-weight: 600; color: #1a202c; }
        .module { margin-bottom: 0.25in; }
        .module-header { display: flex; align-items: center; gap: 0.12in; margin-bottom: 0.12in; }
        .module-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .module-icon.sleep { background: linear-gradient(135deg, #667eea, #764ba2); }
        .module-icon.nutrition { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .module-icon.exercise { background: linear-gradient(135deg, #4fd1c7, #38b2ac); }
        .module-icon.muscle { background: linear-gradient(135deg, #f6ad55, #ed8936); }
        .module-icon.emotional { background: linear-gradient(135deg, #fc8181, #f56565); }
        .module-icon.start { background: linear-gradient(135deg, #63b3ed, #4299e1); }
        .module-icon svg { color: white; }
        .module-title { font-size: 14pt; font-weight: 700; color: #1a202c; margin: 0; }
        .module-content { padding-left: 0.5in; }
        .module-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.2in; }
        .module-section { background: #fafafa; border-radius: 8px; padding: 0.15in; }
        .section-label { font-size: 9pt; font-weight: 600; color: #e53e3e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.08in; }
        .section-label.action { color: #38a169; }
        .section-text { font-size: 10pt; color: #4a5568; line-height: 1.5; margin: 0; }
        .action-list { list-style: none; padding: 0; margin: 0; }
        .action-list li { font-size: 10pt; color: #4a5568; margin-bottom: 0.06in; display: flex; align-items: flex-start; gap: 0.08in; line-height: 1.4; }
        .action-list svg { flex-shrink: 0; margin-top: 2px; color: #4fd1c7; }
        .summary-section { margin-top: 0.3in; page-break-inside: avoid; }
        .summary-title { font-size: 16pt; font-weight: 700; color: #1a202c; margin: 0 0 0.2in 0; text-align: center; }
        .summary-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
        .summary-table th { background: linear-gradient(135deg, #1a202c, #2d3748); color: white; padding: 0.12in; text-align: left; font-weight: 600; font-size: 9pt; }
        .summary-table th:first-child { border-radius: 8px 0 0 0; }
        .summary-table th:last-child { border-radius: 0 8px 0 0; }
        .summary-table td { padding: 0.1in 0.12in; border-bottom: 1px solid #e2e8f0; vertical-align: top; line-height: 1.4; }
        .summary-table tr:last-child td:first-child { border-radius: 0 0 0 8px; }
        .summary-table tr:last-child td:last-child { border-radius: 0 0 8px 0; }
        .summary-table tr:nth-child(even) { background: #f7fafc; }
        .pillar-name { font-weight: 600; color: #1a202c; display: flex; align-items: center; gap: 0.08in; }
        .pillar-icon { width: 20px; height: 20px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .pillar-icon svg { color: white; width: 12px; height: 12px; }
        .risk-text { color: #c53030; }
        .action-text { color: #276749; }
        .cta-section { background: linear-gradient(135deg, #1a202c, #2d3748); border-radius: 16px; padding: 0.4in; margin-top: 0.4in; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'); background-size: cover; background-position: center; opacity: 0.1; }
        .cta-content { position: relative; z-index: 2; }
        .cta-title { font-size: 18pt; font-weight: 700; color: white; margin: 0 0 0.08in 0; }
        .cta-subtitle { font-size: 11pt; color: #a0aec0; margin: 0 0 0.25in 0; }
        .cta-boxes { display: flex; gap: 0.25in; justify-content: center; }
        .cta-box { background: white; border-radius: 12px; padding: 0.2in; text-align: center; min-width: 1.9in; box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        .cta-box-title { font-size: 11pt; font-weight: 600; color: #1a202c; margin: 0 0 0.08in 0; }
        .cta-box-desc { font-size: 9pt; color: #718096; margin: 0 0 0.12in 0; }
        .cta-qr { margin: 0 auto; display: block; }
        .cta-link { font-size: 8pt; color: #4fd1c7; margin-top: 0.08in; word-break: break-all; }
        .cta-box-link { display: block; text-decoration: none; color: inherit; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-box-link:hover .cta-box { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(0,0,0,0.25); }
        .cta-box-link .cta-box { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-clickable { display: block; color: #4fd1c7; font-size: 8pt; font-weight: 600; margin-top: 0.1in; text-decoration: underline; text-decoration-color: rgba(79,209,199,0.4); }
        .instagram-icon { color: #E4405F; margin-bottom: 0.08in; }
        .contact-footer { display: flex; justify-content: center; gap: 0.4in; margin-top: 0.3in; padding-top: 0.2in; border-top: 2px solid #e2e8f0; }
        .contact-item { display: flex; align-items: center; gap: 0.08in; font-size: 10pt; color: #4a5568; }
        .contact-item svg { color: #4fd1c7; }
        .print-button { position: fixed; top: 1rem; right: 1rem; z-index: 1000; background: linear-gradient(135deg, #4fd1c7, #63b3ed); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(79,209,199,0.3); transition: all 0.3s ease; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79,209,199,0.4); }
        .preview-label { text-align: center; color: #4a5568; font-weight: 600; margin-bottom: 1rem; font-size: 0.9rem; }
        .corner-accent { position: absolute; width: 60px; height: 60px; border-radius: 50%; opacity: 0.06; }
        .corner-accent.top-right { top: -20px; right: -20px; background: linear-gradient(135deg, #4fd1c7, #63b3ed); }
        .corner-accent.bottom-left { bottom: -20px; left: -20px; background: linear-gradient(135deg, #f6ad55, #ed8936); }
      `}</style>

      <button onClick={() => window.print()} className="print-button no-print">Save as PDF</button>

      <div className="toolkit-preview">
        <div className="toolkit-page">
          {/* Header */}
          <div className="toolkit-header">
            <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="logo-img" />
            <h1 className="toolkit-title">Longevity 101</h1>
            <p className="toolkit-subtitle">A Basic Guide to Living Longer and Healthier</p>
          </div>

          {/* Introduction */}
          <div className="intro-section">
            <h2 className="intro-title">What is Longevity?</h2>
            <p className="intro-text">Longevity means not just living a long life but living a healthy, vibrant life throughout those years. The goal is to extend both so you can enjoy more years with good quality of life.</p>
            <div className="intro-highlight">
              <div className="highlight-item"><div className="highlight-label">Lifespan</div><div className="highlight-value">Total years you live</div></div>
              <div className="highlight-item"><div className="highlight-label">Healthspan</div><div className="highlight-value">Years you remain active &amp; disease-free</div></div>
            </div>
          </div>

          {/* Module 1: Sleep */}
          <div className="module">
            <div className="module-header"><div className="module-icon sleep"><Moon size={20} /></div><h3 className="module-title">Sleep — The Foundation of Longevity</h3></div>
            <div className="module-content">
              <div className="module-grid">
                <div className="module-section"><div className="section-label">Why It Matters</div><p className="section-text">Sleep deprivation increases risks of heart disease, diabetes, obesity, and cognitive decline. People sleeping less than 6 hours have significantly higher mortality risk.</p></div>
                <div className="module-section"><div className="section-label action">How to Optimize</div><ul className="action-list"><li><CheckCircle size={14} />Aim for 7-9 hours every night</li><li><CheckCircle size={14} />Keep a consistent sleep schedule</li><li><CheckCircle size={14} />Create a dark, quiet, cool environment</li><li><CheckCircle size={14} />Avoid caffeine &amp; screens before bed</li></ul></div>
              </div>
            </div>
          </div>

          {/* Module 2: Nutrition */}
          <div className="module">
            <div className="module-header"><div className="module-icon nutrition"><Apple size={20} /></div><h3 className="module-title">Nutrition — Fuel Your Body Right</h3></div>
            <div className="module-content">
              <div className="module-grid">
                <div className="module-section"><div className="section-label">Why It Matters</div><p className="section-text">Poor nutrition drives insulin resistance, diabetes, cardiovascular disease, and cancer. Excess sugar causes chronic inflammation and accelerates aging.</p></div>
                <div className="module-section"><div className="section-label action">How to Eat for Longevity</div><ul className="action-list"><li><CheckCircle size={14} />Focus on whole, unprocessed foods</li><li><CheckCircle size={14} />Aim for 1.6g protein per kg bodyweight</li><li><CheckCircle size={14} />Avoid ultra-processed foods &amp; excess sugar</li><li><CheckCircle size={14} />Moderate alcohol consumption</li></ul></div>
              </div>
            </div>
          </div>

          {/* Module 3: Exercise */}
          <div className="module">
            <div className="module-header"><div className="module-icon exercise"><Dumbbell size={20} /></div><h3 className="module-title">Exercise — The Most Powerful Longevity Tool</h3></div>
            <div className="module-content">
              <div className="module-grid">
                <div className="module-section"><div className="section-label">Why It Matters</div><p className="section-text">Physical inactivity is a leading cause of premature death. Lack of exercise accelerates muscle loss, reduces balance, and increases risk of falls, disability, and chronic diseases.</p></div>
                <div className="module-section"><div className="section-label action">How to Use Exercise</div><ul className="action-list"><li><CheckCircle size={14} />Include strength training for muscle</li><li><CheckCircle size={14} />Practice stability &amp; balance exercises</li><li><CheckCircle size={14} />Engage in aerobic activities regularly</li><li><CheckCircle size={14} />Consistency is key—small amounts help</li></ul></div>
              </div>
            </div>
          </div>

          {/* Module 4: Muscle */}
          <div className="module">
            <div className="module-header"><div className="module-icon muscle"><Heart size={20} /></div><h3 className="module-title">Muscle Building — Your Body's Insurance Policy</h3></div>
            <div className="module-content">
              <div className="module-grid">
                <div className="module-section"><div className="section-label">Why It Matters</div><p className="section-text">Loss of muscle mass (sarcopenia) is linked to frailty, poor quality of life, and increased mortality. Maintaining muscle supports metabolism, mobility, and independence.</p></div>
                <div className="module-section"><div className="section-label action">How to Build &amp; Maintain</div><ul className="action-list"><li><CheckCircle size={14} />Combine resistance training + protein</li><li><CheckCircle size={14} />For growth: 2-4g protein per kg bodyweight</li><li><CheckCircle size={14} />Prioritize recovery to avoid injury</li><li><CheckCircle size={14} />Progress gradually over time</li></ul></div>
              </div>
            </div>
          </div>

          {/* Module 5: Emotional */}
          <div className="module">
            <div className="module-header"><div className="module-icon emotional"><Brain size={20} /></div><h3 className="module-title">Emotional Health — The Often Overlooked Pillar</h3></div>
            <div className="module-content">
              <div className="module-grid">
                <div className="module-section"><div className="section-label">Why It Matters</div><p className="section-text">Chronic stress and poor emotional health increase inflammation and accelerate aging. Social isolation is associated with higher mortality risk, comparable to smoking.</p></div>
                <div className="module-section"><div className="section-label action">How to Support</div><ul className="action-list"><li><CheckCircle size={14} />Practice mindfulness &amp; stress management</li><li><CheckCircle size={14} />Nurture meaningful relationships</li><li><CheckCircle size={14} />Engage in activities you find fulfilling</li><li><CheckCircle size={14} />Consider therapy when needed</li></ul></div>
              </div>
            </div>
          </div>

          {/* Module 6: Getting Started */}
          <div className="module">
            <div className="module-header"><div className="module-icon start"><Sparkles size={20} /></div><h3 className="module-title">Getting Started — Pick One Thing</h3></div>
            <div className="module-content">
              <div className="intro-section" style={{ marginBottom: 0, background: "linear-gradient(135deg, rgba(99,179,237,0.08), rgba(79,209,199,0.08))" }}>
                <p className="intro-text" style={{ marginBottom: "0.15in" }}>Longevity is a lifelong journey, not a race. If you feel overwhelmed, start with <strong>one pillar</strong>—sleep, nutrition, or exercise. Make small, consistent changes that fit your lifestyle and track your progress.</p>
                <p className="intro-text" style={{ fontWeight: 600, color: "#1a202c" }}>Remember: every positive change adds up over time. Your future self will thank you.</p>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="summary-section">
            <h2 className="summary-title">Your Longevity Optimization Plan</h2>
            <table className="summary-table">
              <thead>
                <tr>
                  <th style={{ width: "18%" }}>Pillar</th>
                  <th style={{ width: "41%" }}>Risks of Neglect</th>
                  <th style={{ width: "41%" }}>Key Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: <Moon size={12} />, bg: "linear-gradient(135deg, #667eea, #764ba2)", name: "Sleep", risk: "Heart disease, diabetes, dementia, early death", action: "7-9 hrs/night, consistent schedule, optimize environment" },
                  { icon: <Apple size={12} />, bg: "linear-gradient(135deg, #f093fb, #f5576c)", name: "Nutrition", risk: "Metabolic disease, inflammation, cancer risk", action: "Whole foods, adequate protein, limit processed foods" },
                  { icon: <Dumbbell size={12} />, bg: "linear-gradient(135deg, #4fd1c7, #38b2ac)", name: "Exercise", risk: "Premature death, frailty, cognitive decline", action: "Strength + balance + aerobic, consistency is key" },
                  { icon: <Heart size={12} />, bg: "linear-gradient(135deg, #f6ad55, #ed8936)", name: "Muscle", risk: "Frailty, loss of independence, metabolic slowdown", action: "Resistance training, protein intake, gradual progression" },
                  { icon: <Brain size={12} />, bg: "linear-gradient(135deg, #fc8181, #f56565)", name: "Emotional", risk: "Inflammation, loneliness, higher mortality", action: "Stress management, social connection, mindfulness" },
                ].map((row) => (
                  <tr key={row.name}>
                    <td><div className="pillar-name"><div className="pillar-icon" style={{ background: row.bg }}>{row.icon}</div>{row.name}</div></td>
                    <td className="risk-text">{row.risk}</td>
                    <td className="action-text">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Your Longevity Journey?</h2>
              <p className="cta-subtitle">We're here to help you build a plan that works for your life.</p>
              <div className="cta-boxes">
                <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="cta-box-link">
                  <div className="cta-box">
                    <h3 className="cta-box-title">Book a Free Meet &amp; Greet</h3>
                    <p className="cta-box-desc">Learn about Direct Primary Care</p>
                    <canvas ref={meetGreetQrRef} className="cta-qr"></canvas>
                    <span className="cta-clickable">Click to schedule</span>
                  </div>
                </a>
                <a href="https://coshealthcollective.com" target="_blank" rel="noopener noreferrer" className="cta-box-link">
                  <div className="cta-box">
                    <h3 className="cta-box-title">Visit Our Website</h3>
                    <p className="cta-box-desc">Explore all services</p>
                    <canvas ref={homepageQrRef} className="cta-qr"></canvas>
                    <span className="cta-clickable">coshealthcollective.com</span>
                  </div>
                </a>
                <a href="https://instagram.com/coshealthcollective" target="_blank" rel="noopener noreferrer" className="cta-box-link">
                  <div className="cta-box">
                    <SiInstagram size={28} className="instagram-icon" />
                    <h3 className="cta-box-title">Follow Us on Instagram</h3>
                    <p className="cta-box-desc">Comprehensive guides available for purchase</p>
                    <canvas ref={instagramQrRef} className="cta-qr"></canvas>
                    <span className="cta-clickable">@coshealthcollective</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Footer */}
          <div className="contact-footer">
            <div className="contact-item"><Phone size={16} /><span>(719) 824-4716</span></div>
            <div className="contact-item"><Mail size={16} /><span>dpc@coshealthcollective.com</span></div>
            <div className="contact-item"><Globe size={16} /><span>coshealthcollective.com</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
