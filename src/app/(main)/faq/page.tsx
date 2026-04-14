"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ChevronDown } from "lucide-react";

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const faqs = [
  {
    id: "what-is-cshc",
    question: "What is Colorado Springs Health Collective?",
    answer: "Colorado Springs Health Collective (CSHC) is a community-centered health organization built around three divisions: CSHC Direct Primary Care, CSHC Hormone & Weight Loss Clinic, and CSHC Hyperbaric. We're not a traditional practice — we're a collective of providers building a comprehensive, patient-first alternative to the broken healthcare system. Our goal is to offer everything you need to live healthier and longer, all under one roof and all with transparent pricing.",
  },
  {
    id: "three-divisions",
    question: "What are your three divisions and how do they work together?",
    answer: "CSHC Direct Primary Care is our membership-based primary care practice — unlimited visits, same-day access, and at-cost labs and medications for a flat monthly fee. CSHC Hormone & Weight Loss Clinic (coming soon) will offer clinician-guided hormone optimization for men and women, including GLP-1 weight loss therapy (semaglutide, tirzepatide) and comprehensive HRT. CSHC Hyperbaric (opening Summer 2026) will bring Colorado Springs' only accessible 2.0 ATA hyperbaric oxygen chamber — the same pressure used in clinical research. All three divisions are designed to work together so your care is coordinated, not fragmented.",
  },
  {
    id: "membership-required",
    question: "Do I need a DPC membership to use the Hormone Clinic or Hyperbaric?",
    answer: "No — each CSHC division will operate independently and be accessible without a DPC membership. That said, DPC members will receive integrated care, priority access, and member pricing across all divisions. If you're already a DPC member, your provider will coordinate your care across all three services. If you're not a DPC member, you can still access the Hormone & Weight Loss Clinic and Hyperbaric as standalone services.",
  },
  {
    id: "member-priority",
    question: "Will DPC members get priority access and discounted pricing at the Hormone & Weight Loss Clinic and Hyperbaric?",
    answer: "Yes. DPC members are part of the CSHC collective and will receive priority access when the Hormone & Weight Loss Clinic and Hyperbaric launch. Member pricing across all divisions is part of the value of being a CSHC Direct Primary Care member. Your DPC provider will also be directly involved in coordinating your care across divisions, so nothing falls through the cracks.",
  },
  {
    id: "insurance",
    question: "Do you accept insurance?",
    answer: "CSHC Direct Primary Care is not insurance and does not bill insurance — it's a flat monthly membership. Many members pair DPC with a high-deductible plan or catastrophic coverage for hospitalizations and specialist care. The Hormone & Weight Loss Clinic and Hyperbaric will operate on transparent cash-pay pricing. We also offer standalone urgent care services (Telehealth $85, In-home $115) for non-members, with superbills available upon request.",
  },
  {
    id: "location",
    question: "Where are you located — and how does mobile and virtual care work?",
    answer: "CSHC is based in Colorado Springs, Colorado. Our Direct Primary Care and Urgent Care services are mobile and virtual — we come to you (home, office, or wherever works) or connect via telehealth. You don't need to come to a clinic. The Hyperbaric chamber will have a physical location in Colorado Springs (to be announced). The Hormone & Weight Loss Clinic will offer both in-person and virtual options.",
  },
  {
    id: "timeline",
    question: "When will the Hormone & Weight Loss Clinic and Hyperbaric be available?",
    answer: "The CSHC Hormone & Weight Loss Clinic is currently in development — sign up for early access updates through our contact form. CSHC Hyperbaric is planned to open Summer 2026. We're actively building hype around the hyperbaric launch because we'll be the only non-hospital 2.0 ATA chamber in Colorado Springs — early access members will receive 25% off when we open.",
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: "The best first step is a free Meet & Greet with Logan or Sarah. This is an informal conversation — no commitment, no paperwork — just a chance to see if CSHC is the right fit for your health goals. You can also reach us directly at (719) 824-4716 or dpc@coshealthcollective.com. If you're interested in the Hormone & Weight Loss Clinic or Hyperbaric, contact us to get on the early access list.",
  },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <section className="hero-overlay relative min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 z-10 py-32 pt-40">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Frequently Asked </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>Questions</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              Everything you need to know about Colorado Springs Health Collective and our three divisions.
            </p>
            <p className="text-sm" style={{ color: "hsl(210, 25%, 60%)" }}>
              Looking for DPC-specific questions?{" "}
              <Link href="/direct-primary-care#faq" className="underline hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
                See our Direct Primary Care FAQ →
              </Link>
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="rounded-2xl overflow-hidden" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                  <button
                    className="w-full text-left p-6 flex items-center justify-between"
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    aria-expanded={openFaq === faq.id}
                  >
                    <span className="text-lg font-semibold pr-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`}
                      style={{ color: "hsl(177, 70%, 59%)" }}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 85%)" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Still Have Questions?
              </h2>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                We&apos;re happy to walk you through how CSHC works and which services are the right fit for your goals.
              </p>
              <a
                href={MEET_GREET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
              >
                Schedule a Free Meet &amp; Greet
              </a>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>dpc@coshealthcollective.com</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link href="/direct-primary-care" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                Direct Primary Care
              </Link>
              <span style={{ color: "hsl(0, 0%, 50%)" }}>|</span>
              <Link href="/services" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                All Services
              </Link>
              <span style={{ color: "hsl(0, 0%, 50%)" }}>|</span>
              <Link href="/about" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
