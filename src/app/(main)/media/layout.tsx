import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos & Media",
  description:
    "Watch videos from Colorado Springs Health Collective — learn about direct primary care, hormone therapy, HBOT, and how we're building a different kind of healthcare practice.",
  keywords: [
    "CSHC videos",
    "direct primary care video Colorado Springs",
    "hormone therapy education video",
    "hyperbaric oxygen therapy video",
    "Colorado Springs Health Collective media",
    "DPC explainer video",
  ],
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Videos & Media | Colorado Springs Health Collective",
    description: "Educational videos about DPC, hormone care, hyperbaric oxygen, and modern healthcare from CSHC.",
    url: "https://coshealthcollective.com/media",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
