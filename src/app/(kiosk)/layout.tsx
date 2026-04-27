import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* Hide the global Pikes Peak background and any chrome — kiosk pages render full-bleed. */
        body::before { display: none !important; }
        body { background: hsl(210, 32%, 11%) !important; min-height: 100dvh !important; }
      `}</style>
      {children}
    </>
  );
}
