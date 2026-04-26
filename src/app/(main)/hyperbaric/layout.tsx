import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyperbaric Oxygen Therapy Colorado Springs | 2.0 ATA HBOT | CSHC",
  description:
    "Colorado Springs' only accessible 2.0 ATA hyperbaric oxygen chamber — opening Summer 2026. HBOT for fibromyalgia, Long COVID, wound healing, anti-aging, and athletic recovery. Join the waitlist.",
  alternates: { canonical: "/hyperbaric" },
  openGraph: {
    title: "Hyperbaric Oxygen Therapy Colorado Springs | 2.0 ATA HBOT",
    description:
      "The pressure that matters. CSHC Hyperbaric brings 2.0 ATA HBOT to Colorado Springs — the same level used in serious clinical research. Opening Summer 2026.",
    url: "https://coshealthcollective.com/hyperbaric",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
