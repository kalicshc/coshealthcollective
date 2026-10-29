import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist | Colorado Springs Health Collective",
  description:
    "We're not accepting new patients right now. Join the waitlist and we'll reach out as soon as we have availability.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Waitlist | Colorado Springs Health Collective",
    description:
      "We're not accepting new patients right now. Join the waitlist and we'll reach out as soon as we have availability.",
    url: "https://coshealthcollective.com/waitlist",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
