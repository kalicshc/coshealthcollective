import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://coshealthcollective.com" },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/story/01-who-we-are-opt.jpg" />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
