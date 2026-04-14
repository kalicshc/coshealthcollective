"use client";

import { Stethoscope, Phone, Calendar, Network, Droplets, Sparkles, Dumbbell, CheckCircle, Mail, Pill, Dna, Building2, DollarSign, Users, TrendingUp } from "lucide-react";

export default function BusinessHandout() {
  return (
    <div className="business-handout-combined">
      <style>{`
        @media print {
          @page { size: letter; margin: 0.5in; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; break-after: page; }
        }
        .business-handout-combined { background: white; font-family: 'Poppins', system-ui, -apple-system, sans-serif; color: #1a202c; }
        .page-content { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
        .header-image { width: 100%; max-width: 100%; height: auto; margin-bottom: 1rem; border-radius: 8px; }
        .gradient-text { color: #4fd1c7; font-weight: 700; }
        .section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; margin-top: 1.25rem; color: #2d3748; border-bottom: 3px solid; border-image: linear-gradient(90deg, #4fd1c7, #f6ad55, #fc8181) 1; padding-bottom: 0.35rem; }
        .section-title-page2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; margin-top: 0; color: #2d3748; border-bottom: 3px solid; border-image: linear-gradient(90deg, #4fd1c7, #f6ad55, #fc8181) 1; padding-bottom: 0.35rem; }
        .benefit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.25rem; }
        .benefit-grid-page2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.875rem; margin-bottom: 1rem; }
        .benefit-item { display: flex; align-items: flex-start; gap: 0.6rem; }
        .benefit-icon { flex-shrink: 0; width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, #4fd1c7, #63b3ed); display: flex; align-items: center; justify-content: center; color: white; }
        .plan-box { border: 2px solid #e2e8f0; border-radius: 8px; padding: 0.875rem; margin-bottom: 0.875rem; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); }
        .plan-title { font-weight: 700; font-size: 1.125rem; color: #2d3748; margin-bottom: 0.5rem; }
        .contact-box { position: relative; background: linear-gradient(135deg, #4fd1c7 0%, #63b3ed 50%, #fc8181 100%); color: white; padding: 0.75rem; border-radius: 10px; text-align: center; margin-top: 0.75rem; }
        .contact-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.25); border-radius: 12px; z-index: 0; }
        .contact-box > * { position: relative; z-index: 1; }
        .print-button { position: fixed; top: 1rem; right: 1rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #4fd1c7, #63b3ed); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
      `}</style>

      <button className="print-button no-print" onClick={() => window.print()}>🖨️ Print Both Pages</button>

      {/* PAGE 1 */}
      <div className="page-content page-break">
        <img src="/logo-main.png" alt="Colorado Springs Health Collective - Direct Primary Care" className="header-image" />

        <h1 className="text-3xl font-bold text-center mb-4" style={{ color: "#2d3748" }}>
          Transform Your Employee Benefits with <span className="gradient-text">Direct Primary Care</span>
        </h1>
        <p className="text-lg text-center mb-6" style={{ color: "#4a5568", lineHeight: "1.6" }}>
          Give your team unlimited access to comprehensive primary care—no copays, no surprise bills, no insurance hassles. Just straightforward, affordable healthcare that keeps your employees healthy and productive.
        </p>

        <h2 className="section-title">What's Included in Membership</h2>
        <div className="benefit-grid">
          {[
            { icon: <Stethoscope size={18} />, title: "Unlimited Office Visits", desc: "No copays, no visit limits—just care when you need it" },
            { icon: <Calendar size={18} />, title: "Urgent Care Access", desc: "Same-day appointments for acute needs" },
            { icon: <Phone size={18} />, title: "Telehealth Visits", desc: "Virtual care by appointment when convenient" },
            { icon: <Mail size={18} />, title: "Direct Communication", desc: "Text, email, or call your provider directly" },
            { icon: <Network size={18} />, title: "Care Coordination", desc: "Specialist referrals with transparent pricing" },
            { icon: <CheckCircle size={18} />, title: "Preventive Care", desc: "Routine screenings and wellness visits included" },
          ].map((item) => (
            <div className="benefit-item" key={item.title}>
              <div className="benefit-icon">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-base mb-0.5">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title">Discounted Member Services</h2>
        <div className="benefit-grid">
          {[
            { icon: <Droplets size={18} />, grad: "linear-gradient(135deg, #63b3ed, #9f7aea)", title: "Mobile IV Therapy", desc: "Hydration delivered to your location" },
            { icon: <Sparkles size={18} />, grad: "linear-gradient(135deg, #f6ad55, #fc8181)", title: "Prescription Skin Care", desc: "Anti-aging compounds & tretinoin" },
            { icon: <Dumbbell size={18} />, grad: "linear-gradient(135deg, #4fd1c7, #48bb78)", title: "Wellness Coaching", desc: "Fitness, nutrition & stress reduction" },
            { icon: <Stethoscope size={18} />, grad: "linear-gradient(135deg, #9f7aea, #d53f8c)", title: "Office Procedures", desc: "Minor procedures at member rates" },
            { icon: <Pill size={18} />, grad: "linear-gradient(135deg, #f6ad55, #ed8936)", title: "Prescription Medications", desc: "Discounted medications and supplements" },
            { icon: <Dna size={18} />, grad: "linear-gradient(135deg, #667eea, #764ba2)", title: "Precision Medicine", desc: "Genetic testing to reduce medication adverse reactions" },
          ].map((item) => (
            <div className="benefit-item" key={item.title}>
              <div className="benefit-icon" style={{ background: item.grad }}>{item.icon}</div>
              <div>
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page-content">
        <h2 className="section-title-page2">Flexible Plan Options for Every Business</h2>
        {[
          { emoji: "💼", title: "Full Coverage - Employer Paid", desc: "Your company pays 100% of DPC membership as a premium benefit.", bullets: ["Maximum employee satisfaction and utilization", "Tax deductible as a business expense"] },
          { emoji: "🤝", title: "Shared Cost - Split Investment", desc: "Flexible split between employer and employee (50/50, 70/30, or custom).", bullets: ["Shared commitment to employee health", "Employer portion is tax deductible", "Makes premium benefits affordable for growing companies"] },
          { emoji: "✨", title: "Voluntary Benefit - Employee Paid", desc: "Employees pay via payroll deduction or direct enrollment—you facilitate, they pay.", bullets: ["Zero cost to your business, maximum recruiting value", "Potential pre-tax payroll deduction saves employees money", "Healthier team = reduced absenteeism and higher productivity", "Shows you invest in employee wellbeing"] },
        ].map((plan) => (
          <div className="plan-box" key={plan.title}>
            <div className="plan-title">{plan.emoji} {plan.title}</div>
            <p className="text-sm text-gray-700 mb-2">{plan.desc}</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-5">{plan.bullets.map((b) => <li key={b}>• {b}</li>)}</ul>
          </div>
        ))}

        <h2 className="section-title-page2" style={{ marginTop: "1.25rem" }}>Why Employers Choose DPC</h2>
        <div className="benefit-grid-page2">
          {[
            { icon: <DollarSign size={18} />, grad: "linear-gradient(135deg, #48bb78, #38a169)", title: "Tax Advantages", desc: "DPC is a tax-deductible business expense" },
            { icon: <Users size={18} />, grad: "linear-gradient(135deg, #4299e1, #3182ce)", title: "Healthier Teams", desc: "Easy access = better prevention & outcomes" },
            { icon: <TrendingUp size={18} />, grad: "linear-gradient(135deg, #ed8936, #dd6b20)", title: "Boost Productivity", desc: "Less sick time, more engaged employees" },
            { icon: <Building2 size={18} />, grad: "linear-gradient(135deg, #9f7aea, #805ad5)", title: "Insurance Partnerships", desc: "We connect you with brokers for catastrophic coverage" },
          ].map((item) => (
            <div className="benefit-item" key={item.title}>
              <div className="benefit-icon" style={{ background: item.grad }}>{item.icon}</div>
              <div>
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-box">
          <h2 className="text-xl font-bold mb-1.5">Ready to Transform Your Employee Benefits?</h2>
          <p className="text-base mb-2.5">Contact us today for a custom quote tailored to your business.</p>
          <div className="text-base font-semibold space-y-0.5">
            <div>📞 (440) 371-3063</div>
            <div>✉️ dpc@coshealthcollective.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
