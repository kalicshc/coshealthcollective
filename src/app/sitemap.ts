import type { MetadataRoute } from "next";

const BASE = "https://coshealthcollective.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/direct-primary-care", priority: 0.95, changeFrequency: "weekly" },
    { url: "/hormone", priority: 0.95, changeFrequency: "weekly" },
    { url: "/hormone/womens-health", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hormone/mens-health", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hormone/glp1", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hyperbaric", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hyperbaric/evidence", priority: 0.75, changeFrequency: "monthly" },
    { url: "/hyperbaric/why-2ata", priority: 0.75, changeFrequency: "monthly" },
    { url: "/urgent-care", priority: 0.85, changeFrequency: "weekly" },
    { url: "/iv-therapy", priority: 0.8, changeFrequency: "monthly" },
    { url: "/aesthetics", priority: 0.8, changeFrequency: "monthly" },
    { url: "/health-coaching", priority: 0.75, changeFrequency: "monthly" },
    { url: "/strength-wellness-coaching", priority: 0.75, changeFrequency: "monthly" },
    { url: "/personal-training", priority: 0.75, changeFrequency: "monthly" },
    { url: "/precision-medicine", priority: 0.75, changeFrequency: "monthly" },
    { url: "/allergy-slit", priority: 0.75, changeFrequency: "monthly" },
    { url: "/a-la-carte", priority: 0.75, changeFrequency: "monthly" },
    { url: "/services", priority: 0.75, changeFrequency: "monthly" },
    { url: "/remote-monitoring", priority: 0.7, changeFrequency: "monthly" },
    { url: "/referrals-care-coordination", priority: 0.7, changeFrequency: "monthly" },
    { url: "/partner-network", priority: 0.7, changeFrequency: "monthly" },
    { url: "/for-businesses", priority: 0.8, changeFrequency: "monthly" },
    { url: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about", priority: 0.75, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: "/blog/dpc-vs-concierge", priority: 0.65, changeFrequency: "monthly" },
    { url: "/blog/flu-shot-guide", priority: 0.65, changeFrequency: "monthly" },
    { url: "/blog/save-money-healthcare", priority: 0.65, changeFrequency: "monthly" },
    { url: "/blog/skiing-longevity", priority: 0.65, changeFrequency: "monthly" },
    { url: "/blog/why-direct-primary-care", priority: 0.65, changeFrequency: "monthly" },
    { url: "/resources", priority: 0.65, changeFrequency: "monthly" },
    { url: "/resources/calculators", priority: 0.65, changeFrequency: "monthly" },
    { url: "/community-events", priority: 0.6, changeFrequency: "weekly" },
    { url: "/media", priority: 0.6, changeFrequency: "monthly" },
    { url: "/hormone/mens-health/quiz", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
