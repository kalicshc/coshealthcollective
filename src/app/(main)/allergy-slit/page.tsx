import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowRight, Flower2, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Allergy Testing & SLIT Therapy | Colorado Springs Health Collective",
  description: "Evidence-based allergy testing and sublingual immunotherapy (SLIT) in Colorado Springs. At-home allergy treatment without injections. Seasonal and environmental allergy relief.",
  keywords: "allergy testing Colorado Springs, SLIT therapy, sublingual immunotherapy, seasonal allergies, environmental allergies, allergy drops, allergy treatment without shots",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function AllergySlit() {
  return (
    <div className="page-bg">
      <div className="container mx-auto px-5 lg:px-8 py-32">

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: "linear-gradient(135deg, hsl(185, 70%, 55%), hsl(195, 70%, 58%))" }}>
            <Flower2 className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span style={{ color: "hsl(0, 0%, 100%)" }}>Allergy Evaluation & </span>
            <span style={{ color: "hsl(177, 70%, 65%)" }}>SLIT Therapy</span>
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>Long-term allergy relief without weekly injection visits</p>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "hsl(210, 40%, 75%)" }}>Available as a standalone consult or included with CSHC Direct Primary Care membership</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">

          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>What is SLIT Therapy?</h2>
            <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: "hsl(210, 40%, 89%)" }}>
              Sublingual immunotherapy (SLIT) is an evidence-based approach to treating allergies at the source. Instead of just masking symptoms, SLIT gradually trains your immune system to tolerate allergens—providing long-term relief.
            </p>
            <p className="text-lg leading-relaxed text-center" style={{ color: "hsl(210, 40%, 82%)" }}>
              Unlike traditional allergy shots that require weekly office visits, SLIT uses custom-formulated drops that you take at home. It's convenient, effective, and integrates seamlessly with your primary care.
            </p>
          </div>

          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Comprehensive Testing", desc: "We identify your specific environmental and seasonal allergens through evidence-based testing" },
                { step: "2", title: "Custom Formulation", desc: "Your SLIT drops are custom-made based on your specific allergy profile" },
                { step: "3", title: "At-Home Treatment", desc: "Take your drops daily at home—no weekly office visits for injections" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: "linear-gradient(135deg, hsl(185, 70%, 55%), hsl(195, 70%, 58%))" }}>
                    <span className="text-xl font-bold" style={{ color: "hsl(210, 32%, 12%)" }}>{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(210, 40%, 82%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>Why Choose SLIT?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {["No weekly injection visits—take drops at home", "Treats the root cause, not just symptoms", "Covers environmental and seasonal allergens", "Long-term relief that can last years after treatment", "Safe and well-tolerated for most patients", "Integrated with your primary care relationship"].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(185, 70%, 55%)" }} />
                  <span style={{ color: "hsl(210, 40%, 89%)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>Common Allergens We Test For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>Seasonal Allergens</h3>
                <ul className="space-y-2">
                  {["Tree pollens (cottonwood, juniper, oak)", "Grass pollens", "Weed pollens (ragweed, sagebrush)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ color: "hsl(210, 40%, 82%)" }}>
                      <Flower2 className="w-4 h-4" style={{ color: "hsl(185, 70%, 55%)" }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>Environmental Allergens</h3>
                <ul className="space-y-2">
                  {["Dust mites", "Mold spores", "Pet dander (cats, dogs)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ color: "hsl(210, 40%, 82%)" }}>
                      <Flower2 className="w-4 h-4" style={{ color: "hsl(185, 70%, 55%)" }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Ready to Find Relief?</h2>
            <p className="text-lg mb-8" style={{ color: "hsl(210, 40%, 89%)" }}>Schedule a free meet and greet to discuss whether allergy testing and SLIT therapy is right for you.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(185, 70%, 55%), hsl(195, 70%, 58%))", color: "hsl(210, 32%, 12%)" }}>
                Book a Free Meet &amp; Greet <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/direct-primary-care" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2" style={{ borderColor: "hsl(185, 70%, 55%)", color: "hsl(185, 70%, 60%)", background: "transparent" }}>
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
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(185, 70%, 55%), hsl(195, 70%, 58%))" }}>
                  <Phone className="w-6 h-6" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
                <span className="text-lg font-medium" style={{ color: "hsl(0, 0%, 100%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(185, 70%, 55%), hsl(195, 70%, 58%))" }}>
                  <Mail className="w-6 h-6" style={{ color: "hsl(210, 32%, 12%)" }} />
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
