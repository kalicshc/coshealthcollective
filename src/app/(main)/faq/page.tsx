import Link from "next/link";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ServiceHero } from "@/components/ServiceHero";
import { Accordion } from "@/components/Accordion";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip } from "@/components/ReviewStrip";
import { bookingUrl } from "@/lib/bookingLinks";

// Server component: the FAQ answers render in the HTML (good for SEO/AI
// search); only the shared <Accordion> ships client JS.

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
    answer: `CSHC Direct Primary Care is not insurance and does not bill insurance — it's a flat monthly membership. Many members pair DPC with a high-deductible plan or catastrophic coverage for hospitalizations and specialist care. The Hormone & Weight Loss Clinic and Hyperbaric will operate on transparent cash-pay pricing. We also offer standalone urgent care services (Telehealth ${usd(clinicFacts.urgentCare.telehealth)}, In-home ${usd(clinicFacts.urgentCare.inPerson)}) for non-members, with superbills available upon request.`,
  },
  {
    id: "location",
    question: "Where are you located — and how does mobile and virtual care work?",
    answer: "CSHC is based in Colorado Springs, Colorado. Our Direct Primary Care and Urgent Care services are mobile and virtual — we come to you (home, office, or wherever works) or connect via telehealth. You don't need to come to a clinic. The Hyperbaric chamber will have a physical location in Colorado Springs (to be announced). The Hormone & Weight Loss Clinic will offer both in-person and virtual options.",
  },
  {
    id: "timeline",
    question: "When will the Hormone & Weight Loss Clinic and Hyperbaric be available?",
    answer: `The CSHC Hormone & Weight Loss Clinic is currently in development — sign up for early access updates through our contact form. CSHC Hyperbaric is planned to open ${clinicFacts.hbot.openingDate}. We're actively building hype around the hyperbaric launch because we'll be the only non-hospital ${clinicFacts.hbot.pressure} chamber in Colorado Springs — early access members will receive ${clinicFacts.hbot.earlyAccessDiscountPercent}% off when we open.`,
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: `The best first step is a free Meet & Greet with Logan or Sarah. This is an informal conversation — no commitment, no paperwork — just a chance to see if CSHC is the right fit for your health goals. You can also reach us directly at ${clinicFacts.contact.phone} or ${clinicFacts.contact.email}. If you're interested in the Hormone & Weight Loss Clinic or Hyperbaric, contact us to get on the early access list.`,
  },
];

export default function FAQ() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Good Questions"
        title="Frequently Asked"
        titleAccent="Questions"
        subhead="Everything you need to know about Colorado Springs Health Collective and our three divisions."
        compact
      >
        <p className="text-sm" style={{ color: "hsl(210,25%,60%)" }}>
          Looking for DPC-specific questions?{" "}
          <Link href="/direct-primary-care#faq" className="underline hover:opacity-80" style={{ color: "rgb(60,120,255)" }}>
            See our Direct Primary Care FAQ →
          </Link>
        </p>
      </ServiceHero>

      <div className="section-divider" />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Accordion items={faqs.map(({ id, question, answer }) => ({ id, question, answer }))} service="brand" />
        </div>
      </section>

      <section className="pt-12 pb-4">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <ReviewStrip variant="strip" service="brand" source="faq-reviews" />
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Still have questions?"
        body="We're happy to walk you through how CSHC works and which services are the right fit for your goals."
        primaryCta={{ label: "Schedule a Free Meet & Greet", href: bookingUrl("meetGreet", "faq-footer"), external: true }}
        analytics={{ page: "faq", source: "faq-footer", service: "brand", label: "Schedule a Free Meet & Greet", appt: "meetGreet" }}
      />
    </div>
  );
}
