import type { Metadata } from "next";
import { clinicFacts } from "@/lib/clinicFacts";

export const metadata: Metadata = {
  title: "FAQ — Colorado Springs Health Collective | DPC, Hormone & HBOT Questions",
  description:
    "Answers to the most common questions about CSHC Direct Primary Care, Hormone Clinic, and Hyperbaric Oxygen Therapy in Colorado Springs. What is DPC? Do you take insurance? Where are you located?",
  keywords: [
    "CSHC FAQ",
    "direct primary care FAQ Colorado Springs",
    "does DPC accept insurance",
    "what is direct primary care",
    "hormone clinic FAQ Colorado Springs",
    "hyperbaric oxygen therapy FAQ",
    "CSHC how to get started",
    "Colorado Springs health collective questions",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Colorado Springs Health Collective",
    description:
      "What is CSHC? Do you take insurance? What's the difference between DPC and concierge care? Get answers here.",
    url: "https://coshealthcollective.com/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Colorado Springs Health Collective?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Colorado Springs Health Collective (CSHC) is a community-centered health organization built around three divisions: CSHC Direct Primary Care, CSHC Hormone & Weight Loss Clinic, and CSHC Hyperbaric. We offer a comprehensive, patient-first alternative to the traditional healthcare system with transparent pricing.",
      },
    },
    {
      "@type": "Question",
      name: "What are your three divisions and how do they work together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSHC Direct Primary Care is our membership-based primary care practice with unlimited visits and at-cost labs. CSHC Hormone & Weight Loss Clinic offers clinician-guided hormone optimization for men and women, including GLP-1 weight loss therapy. CSHC Hyperbaric (opening Summer 2026) will bring Colorado Springs' only accessible 2.0 ATA hyperbaric oxygen chamber.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a DPC membership to use the Hormone Clinic or Hyperbaric?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — each CSHC division operates independently and is accessible without a DPC membership. DPC members receive integrated care, priority access, and member pricing across all divisions.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSHC Direct Primary Care is not insurance and does not bill insurance — it's a flat monthly membership. Many members pair DPC with a high-deductible plan. The Hormone & Weight Loss Clinic and Hyperbaric operate on transparent cash-pay pricing. Standalone urgent care is $85 telehealth and $115 in-home.",
      },
    },
    {
      "@type": "Question",
      name: "Where are you located — and how does mobile and virtual care work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSHC is based in Colorado Springs, Colorado. Our Direct Primary Care and Urgent Care services are mobile and virtual — we come to you or connect via telehealth. The Hyperbaric chamber will have a physical location in Colorado Springs.",
      },
    },
    {
      "@type": "Question",
      name: "When will the Hormone & Weight Loss Clinic and Hyperbaric be available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSHC Hyperbaric is planned to open Summer 2026. Early access members receive 25% off. The Hormone & Weight Loss Clinic is currently in development — sign up for early access through our contact form.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The best first step is a free Meet & Greet with Logan or Sarah. No commitment, no paperwork — just a conversation to see if CSHC is right for you. Call ${clinicFacts.contact.phone} or email ${clinicFacts.contact.email}.`,
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
