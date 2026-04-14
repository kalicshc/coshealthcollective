import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowRight, Handshake, CheckCircle, Users, Heart, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Cash Pay Partner Network | Colorado Springs Health Collective",
  description: "Trusted healthcare providers in Colorado Springs offering transparent cash-pay pricing. Physical therapy, occupational therapy, injury recovery, cardiac testing. No insurance surprises.",
  keywords: "cash pay healthcare Colorado Springs, transparent pricing medical, physical therapy cash pay, occupational therapy, cardiac testing Colorado Springs, injury recovery",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const partnerCategories = [
  { id: "physical-therapy", title: "Physical Therapy", icon: Activity, description: "Hands-on rehabilitation for injury recovery, post-surgical care, chronic pain, and mobility improvement." },
  { id: "occupational-therapy", title: "Occupational Therapy", icon: Users, description: "Specialized therapy to help you regain independence in daily activities after injury, illness, or surgery." },
  { id: "injury-recovery", title: "Injury Recovery & Sports Rehab", icon: Heart, description: "Specialized personal training focused on recovering from injuries and returning to peak performance safely." },
  { id: "cardiac-testing", title: "Advanced Cardiac Testing", icon: Activity, description: "Comprehensive cardiac evaluation including stress testing, advanced imaging, and risk assessment beyond standard labs." },
];

export default function PartnerNetwork() {
  return (
    <div className="page-bg">
      <div className="container mx-auto px-5 lg:px-8 py-32">

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: "linear-gradient(135deg, hsl(230, 70%, 62%), hsl(260, 70%, 65%))" }}>
            <Handshake className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span style={{ color: "hsl(0, 0%, 100%)" }}>Cash Pay </span>
            <span style={{ color: "hsl(260, 70%, 70%)" }}>Partner Network</span>
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>Trusted providers we've personally vetted who offer fair, transparent pricing</p>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "hsl(210, 40%, 75%)" }}>No insurance surprises. Know exactly what you'll pay before your visit.</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center" style={{ color: "hsl(260, 70%, 70%)" }}>Why a Partner Network?</h2>
            <p className="text-lg leading-relaxed mb-8 text-center" style={{ color: "hsl(210, 40%, 89%)" }}>
              Healthcare shouldn't be a mystery. Too often, patients are surprised by bills they didn't expect—even with insurance. Our partner network connects you with providers who share our commitment to <strong style={{ color: "hsl(260, 70%, 70%)" }}>transparent, upfront pricing</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ label: "Personally Vetted", desc: "We know these providers and trust their quality of care" }, { label: "Transparent Pricing", desc: "Know the cost before you commit—no surprise bills" }, { label: "Coordinated Care", desc: "We help connect you and follow up on your care" }].map((item) => (
                <div key={item.label} className="text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "hsl(260, 70%, 65%)" }} />
                  <h3 className="font-semibold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>{item.label}</h3>
                  <p className="text-sm" style={{ color: "hsl(210, 40%, 82%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center" style={{ color: "hsl(260, 70%, 70%)" }}>Partner Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="rounded-2xl p-6" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(230, 70%, 62%), hsl(260, 70%, 65%))" }}>
                      <Icon className="w-6 h-6" style={{ color: "hsl(210, 32%, 12%)" }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>{cat.title}</h3>
                      <p className="text-sm" style={{ color: "hsl(210, 40%, 82%)" }}>{cat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "hsla(260, 70%, 65%, 0.15)", border: "1px dashed hsla(260, 70%, 65%, 0.4)" }}>
            <p className="text-lg" style={{ color: "hsl(260, 70%, 75%)" }}>We're always growing our network of trusted partners.</p>
            <p className="text-sm mt-2" style={{ color: "hsl(210, 40%, 75%)" }}>Know a great provider who offers transparent pricing? Let us know.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(260, 70%, 70%)" }}>Have Questions?</h2>
            <p className="text-lg mb-8" style={{ color: "hsl(210, 40%, 89%)" }}>Want to learn more about our partner network or get a referral? Schedule a free meet and greet.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(230, 70%, 62%), hsl(260, 70%, 65%))", color: "hsl(0, 0%, 100%)" }}>
                Book a Free Meet &amp; Greet <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/direct-primary-care" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2" style={{ borderColor: "hsl(260, 70%, 65%)", color: "hsl(260, 70%, 70%)", background: "transparent" }}>
                Learn About DPC Membership <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="rounded-3xl p-8" style={{ background: "hsla(210, 22%, 28%, 0.4)" }}>
            <p className="text-lg mb-6" style={{ color: "hsl(210, 40%, 89%)" }}>Questions? Reach out anytime.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:+17198244716" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(230, 70%, 62%), hsl(260, 70%, 65%))" }}>
                  <Phone className="w-6 h-6" style={{ color: "hsl(0, 0%, 100%)" }} />
                </div>
                <span className="text-lg font-medium" style={{ color: "hsl(0, 0%, 100%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(230, 70%, 62%), hsl(260, 70%, 65%))" }}>
                  <Mail className="w-6 h-6" style={{ color: "hsl(0, 0%, 100%)" }} />
                </div>
                <span className="text-lg font-medium" style={{ color: "hsl(0, 0%, 100%)" }}>dpc@coshealthcollective.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
