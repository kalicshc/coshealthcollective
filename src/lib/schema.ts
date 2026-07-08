/**
 * Shared JSON-LD builders for page-level structured data.
 *
 * The site-wide MedicalClinic/LocalBusiness + WebSite graph lives in
 * src/app/layout.tsx. These helpers emit the *per-page* nodes (Service /
 * MedicalTherapy, FAQPage, BreadcrumbList) and reference the organization
 * through its stable `@id` instead of duplicating it.
 *
 * Render the returned objects with <JsonLd data={...} /> from
 * src/components/JsonLd.tsx. Prices must come from src/lib/clinicFacts.ts.
 */

export const SITE_URL = "https://coshealthcollective.com";
export const ORG_ID = `${SITE_URL}/#organization`;

type ServiceSchemaType = "MedicalTherapy" | "Service" | "MedicalWebPage";

export type ServiceOffer = {
  name?: string;
  description?: string;
  /** Numeric USD price from clinicFacts. Omit when there is no fixed price. */
  price?: number;
  /** e.g. "https://schema.org/PreOrder" for services that haven't opened yet. */
  availability?: string;
};

export function serviceSchema(opts: {
  type: ServiceSchemaType;
  name: string;
  /** Reuse the page's meta description so schema and metadata stay in sync. */
  description: string;
  /** Site-relative path, e.g. "/direct-primary-care". */
  path: string;
  /** Site-relative hero image path, e.g. "/images/dpc/dpc-hero.webp". */
  image?: string;
  offers?: ServiceOffer[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": ORG_ID },
    ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
    ...(opts.offers && opts.offers.length > 0
      ? {
          offers: opts.offers.map((offer) => ({
            "@type": "Offer",
            priceCurrency: "USD",
            ...(offer.name ? { name: offer.name } : {}),
            ...(offer.description ? { description: offer.description } : {}),
            ...(offer.price !== undefined ? { price: offer.price } : {}),
            ...(offer.availability ? { availability: offer.availability } : {}),
          })),
        }
      : {}),
  };
}

/**
 * FAQPage node. Only use on pages that visibly render the same Q&A content —
 * answers must be plain text that matches what visitors see.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * BreadcrumbList for deep pages. "Home" is prepended automatically — pass the
 * trail from the first section down to the current page.
 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
