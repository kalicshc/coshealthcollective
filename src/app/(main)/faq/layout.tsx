import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Colorado Springs Health Collective | DPC, Hormone & HBOT Questions",
  description:
    "Answers to the most common questions about CSHC Direct Primary Care, Hormone Clinic, and Hyperbaric Oxygen Therapy in Colorado Springs. What is DPC? Do you take insurance? Where are you located?",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Colorado Springs Health Collective",
    description:
      "What is CSHC? Do you take insurance? What's the difference between DPC and concierge care? Get answers here.",
    url: "https://coshealthcollective.com/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
