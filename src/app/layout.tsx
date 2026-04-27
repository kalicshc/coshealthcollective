import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { clinicFacts, usd } from "@/lib/clinicFacts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Colorado Springs Health Collective | Direct Primary Care, Hormone & Hyperbaric",
    template: "%s | Colorado Springs Health Collective",
  },
  description:
    `Colorado Springs Health Collective — Direct Primary Care (${usd(clinicFacts.dpc.individualMonthly)}/mo), Hormone & Metabolic Clinic, and Hyperbaric Oxygen Therapy. Modern healthcare built for Colorado Springs.`,
  keywords: [
    "direct primary care Colorado Springs",
    "DPC Colorado Springs",
    "hormone therapy Colorado Springs",
    "perimenopause doctor Colorado Springs",
    "TRT Colorado Springs",
    "GLP-1 weight loss Colorado Springs",
    "semaglutide Colorado Springs",
    "hyperbaric oxygen therapy Colorado Springs",
    "HBOT Colorado Springs",
    "telehealth Colorado Springs",
    "Colorado Springs Health Collective",
  ],
  icons: {
    icon: "/logo-main.png",
    apple: "/logo-main.png",
  },
  authors: [{ name: "Colorado Springs Health Collective" }],
  creator: "Colorado Springs Health Collective",
  metadataBase: new URL("https://coshealthcollective.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coshealthcollective.com",
    siteName: "Colorado Springs Health Collective",
    title: "Colorado Springs Health Collective | Direct Primary Care, Hormone & Hyperbaric",
    description:
      "Modern healthcare in Colorado Springs — DPC membership, hormone therapy, and hyperbaric oxygen. Three clinics. One collective.",
    images: [{ url: "/logo-main.png", width: 512, height: 512, alt: "Colorado Springs Health Collective" }],
  },
  twitter: {
    card: "summary",
    title: "Colorado Springs Health Collective",
    description: "DPC, hormone therapy, and hyperbaric oxygen in Colorado Springs, CO.",
    images: ["/logo-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "i4Mnpoloin41x71ScMA9UG1ijvh9sJhliTsW4Tv0_Sw",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": "https://coshealthcollective.com/#organization",
      name: "Colorado Springs Health Collective",
      alternateName: "CSHC",
      url: "https://coshealthcollective.com",
      logo: "https://coshealthcollective.com/logo-main.png",
      image: "https://coshealthcollective.com/logo-main.png",
      description:
        "Colorado Springs Health Collective offers Direct Primary Care, Hormone & Metabolic Clinic, and Hyperbaric Oxygen Therapy in Colorado Springs, Colorado.",
      telephone: clinicFacts.contact.phoneTel,
      email: clinicFacts.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colorado Springs",
        addressRegion: "CO",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.8339,
        longitude: -104.8214,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 38.8339,
          longitude: -104.8214,
        },
        geoRadius: "80000",
      },
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "6",
        bestRating: "5",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Healthcare Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTherapy",
              name: "Direct Primary Care Membership",
              description: `Unlimited visits, same-day access, no copays, labs and meds at cost. ${usd(clinicFacts.dpc.individualMonthly)}/month.`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTherapy",
              name: "Hormone & Metabolic Care",
              description: "HRT for perimenopause and menopause, TRT for men, GLP-1 weight loss therapy.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTherapy",
              name: "Hyperbaric Oxygen Therapy",
              description: `${clinicFacts.hbot.pressure} hyperbaric oxygen therapy opening ${clinicFacts.hbot.openingDate} in Colorado Springs.`,
            },
          },
        ],
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://coshealthcollective.com/#website",
      url: "https://coshealthcollective.com",
      name: "Colorado Springs Health Collective",
      publisher: { "@id": "https://coshealthcollective.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
