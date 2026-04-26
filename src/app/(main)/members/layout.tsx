import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Portal | Colorado Springs Health Collective",
  description:
    "Access your CSHC member portal — book appointments, manage billing, order labs, and connect with your care team.",
  alternates: { canonical: "/members" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
