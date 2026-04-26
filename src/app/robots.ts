import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/members/",
          "/_next/",
          "/business-card",
          "/business-handout",
          "/business-handout-1",
          "/business-handout-2",
          "/event-banner",
          "/gym-flyer",
          "/heart-healthy-guide",
          "/iv-therapy-flyer",
          "/longevity-toolkit",
          "/mailroom-flyer",
          "/mailroom-flyer-2",
          "/patient-flyer",
          "/tshirt",
          "/tshirt-back",
          "/waiver",
          "/work-note",
        ],
      },
    ],
    sitemap: "https://coshealthcollective.com/sitemap.xml",
  };
}
