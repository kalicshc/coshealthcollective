import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Events Colorado Springs | CSHC Health & Wellness",
  description:
    "Free and low-cost community health events in Colorado Springs hosted by Colorado Springs Health Collective — movement classes, wellness workshops, and more.",
  alternates: { canonical: "/community-events" },
  openGraph: {
    title: "Community Events | Colorado Springs Health Collective",
    description:
      "Join CSHC for free community wellness events in Colorado Springs — fitness, health education, and more.",
    url: "https://coshealthcollective.com/community-events",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
