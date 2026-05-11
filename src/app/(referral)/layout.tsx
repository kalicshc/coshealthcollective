import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
