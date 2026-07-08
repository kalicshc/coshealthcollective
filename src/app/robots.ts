import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal print/flyer pages (the (no-footer), (kiosk), and (referral)
        // route groups) are NOT listed here on purpose: their layouts set
        // robots noindex, and a Disallow would stop Google from ever seeing
        // that noindex. A per-slug list also went stale every time a flyer was
        // added. Only truly non-page paths belong below.
        disallow: [
          "/api/",
          "/members/",
          "/preview/",
          "/_next/",
        ],
      },
    ],
    sitemap: "https://coshealthcollective.com/sitemap.xml",
  };
}
