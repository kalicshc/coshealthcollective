import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  manifest: "/kiosk-manifest.json",
  appleWebApp: {
    capable: true,
    title: "CSHC",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/logo-main.png",
    apple: "/logo-main.png",
    shortcut: "/logo-main.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#101a25",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* Hide the global Pikes Peak background and any chrome — kiosk pages render full-bleed. */
        body::before { display: none !important; }
        body { background: hsl(210, 32%, 11%) !important; min-height: 100dvh !important; }

        /* Respect iOS safe areas when launched as a home-screen app (status bar overlays). */
        @supports (padding: env(safe-area-inset-top)) {
          body > section,
          main > section {
            padding-top: max(env(safe-area-inset-top), clamp(0.75rem, 2.5vh, 2rem)) !important;
            padding-bottom: max(env(safe-area-inset-bottom), clamp(0.75rem, 2.5vh, 2rem)) !important;
            padding-left: max(env(safe-area-inset-left), 0px);
            padding-right: max(env(safe-area-inset-right), 0px);
          }
        }
      `}</style>
      {children}
    </>
  );
}
