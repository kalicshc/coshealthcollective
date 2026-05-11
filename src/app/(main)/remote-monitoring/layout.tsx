import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Patient Monitoring in Colorado Springs | Home Health Devices",
  description:
    "Clinician-recommended blood pressure monitors, pulse oximeters, and smart scales for home use. Remote monitoring guidance from Colorado Springs Health Collective.",
  alternates: { canonical: "/remote-monitoring" },
  openGraph: {
    title: "Remote Patient Monitoring | Colorado Springs Health Collective",
    description:
      "Home health monitoring devices vetted by Colorado Springs Health Collective clinicians.",
    url: "https://coshealthcollective.com/remote-monitoring",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
