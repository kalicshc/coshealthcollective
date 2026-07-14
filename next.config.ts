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
    ];
  },
};

export default nextConfig;
