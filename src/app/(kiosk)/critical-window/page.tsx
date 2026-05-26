import type { Metadata } from "next";
import CriticalWindowDeck from "./CriticalWindowDeck";

// Internal presentation deck — never indexed. Rendered in the (kiosk) layout
// (no nav/footer, full-bleed, pinch-zoom disabled) so it fills a projector frame.
export const metadata: Metadata = {
  title: "The Critical Window — Presentation",
  robots: { index: false, follow: false },
};

export default function CriticalWindowPage() {
  return <CriticalWindowDeck />;
}
