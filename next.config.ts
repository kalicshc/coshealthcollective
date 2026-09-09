import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where the browser supports it (better compression than the WebP-only default).
    formats: ["image/avif", "image/webp"],
  },
  // Allow the presenter phone (reached by LAN/hotspot IP) to use the dev server. Next 16 blocks
  // non-localhost dev origins by default, which leaves the phone's page un-hydrated. Covers the
  // iPhone-hotspot subnet (172.20.10.x) and common home ranges. (Production has no such limit.)
  allowedDevOrigins: [
    "172.20.10.9",
    "192.168.131.149",
    "172.20.10.*",
    "192.168.*.*",
    "10.*.*.*",
  ],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.coshealthcollective.com" }],
        destination: "https://coshealthcollective.com/:path*",
        permanent: true,
      },
      // Consolidated routes (2026-07): /members duplicated /resources, and the
      // two training stubs merged into /personal-training.
      { source: "/members", destination: "/resources", permanent: true },
      { source: "/strength-wellness-coaching", destination: "/personal-training", permanent: true },
      // 2026-07: the standalone women's health page merged INTO /hormone —
      // women's care is the flagship and now IS the hormone page. The quiz
      // still lives at /hormone/womens-health/quiz (not redirected).
      { source: "/hormone/womens-health", destination: "/hormone", permanent: true },
      // Short QR-code routes for PRINTED material (fridge magnet). Short URLs
      // keep the QR sparse enough to scan at small print sizes. 302 on purpose
      // so the printed codes can be retargeted without reprinting. Do NOT
      // remove — magnets in the wild point here forever.
      {
        source: "/uc",
        destination:
          "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-c127397b6906edd2&source=magnet",
        permanent: false,
      },
      {
        source: "/th",
        destination:
          "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-ec8b65946e958f69&source=magnet",
        permanent: false,
      },
      // Vehicle door-decal QR (car-decal-door). 302 on purpose so printed
      // vinyl can be retargeted without a reprint. Must be DEPLOYED before
      // any decal with the QR goes to the print shop.
      {
        source: "/car",
        destination: "/?source=car-decal",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
