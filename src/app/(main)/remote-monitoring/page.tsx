"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight, Info, Heart } from "lucide-react";

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

interface Product {
  id: string;
  brand: "iHealth" | "Omron";
  name: string;
  tagline: string;
  price: string | null;
  image: string;
  url: string;
  badge?: string;
}

const bpMonitors: Product[] = [
  { id: "ihealth-neo", brand: "iHealth", name: "iHealth Neo Wireless Blood Pressure Monitor", tagline: "Wireless upper arm cuff — syncs to Guava Health via app", price: "$69.99", image: "https://ihealthlabs.com/cdn/shop/files/Neo_60ad73cc-ee77-4bdf-bf89-f5df4b93378f_1200x1200.png?v=1719337375", url: "https://ihealthlabs.com/collections/newest-products/products/ihealth-neo-wireless-blood-pressure-monitor", badge: "Our Top Pick" },
  { id: "ihealth-track-standard", brand: "iHealth", name: "iHealth Track Connected Blood Pressure Monitor", tagline: 'Standard cuff (fits 8.66") — Bluetooth connected', price: "$39.99", image: "https://ihealthlabs.com/cdn/shop/files/550BT_01_1_1200x1200.png?v=1726263451", url: "https://ihealthlabs.com/collections/newest-products/products/ihealth-track-connected-blood-pressure-monitor?variant=35802883489954" },
  { id: "ihealth-track-xl", brand: "iHealth", name: "iHealth Track Connected Blood Pressure Monitor", tagline: 'XL cuff (fits up to 16.5") — Bluetooth connected', price: "$39.99", image: "https://ihealthlabs.com/cdn/shop/files/550BT_01_1_1200x1200.png?v=1726263451", url: "https://ihealthlabs.com/collections/newest-products/products/ihealth-track-connected-blood-pressure-monitor?variant=35802883522722", badge: "XL Cuff" },
  { id: "omron-complete", brand: "Omron", name: "Omron Complete™ Upper Arm Blood Pressure Monitor + EKG", tagline: "Blood pressure AND single-lead EKG — AFib screening included", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bp7900-hero-800x800.png?signature=0cd86c1f67268e7d8b7b33b3c658bb6019bc8c7ebf2a1bf22d3614205897b997", url: "https://omronhealthcare.com/products/complete-wireless-upper-arm-blood-pressure-monitor-ekg-bp7900", badge: "Most Advanced" },
  { id: "omron-platinum", brand: "Omron", name: "Omron Platinum Upper Arm Blood Pressure Monitor", tagline: "Dual-user memory, unlimited readings via app, Bluetooth", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bp5465-front-2000x2000.jpg?signature=0a047a24377e3a52de0a75357374114b852c04891a39110a1421602235939f00", url: "https://omronhealthcare.com/products/platinum-upper-arm-blood-pressure-monitor-bp5465" },
  { id: "omron-10-series", brand: "Omron", name: "Omron 10 Series® Upper Arm Blood Pressure Monitor", tagline: "200-reading memory, dual-user, Bluetooth app connected", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bp7465-front-2000x2000_v2.jpg?signature=6dc2e2a58d973dd745c6479d3254f605d235a69a9125b6f96c22f9c48ff7bd51", url: "https://omronhealthcare.com/products/10-series-upper-arm-blood-pressure-monitor-bp7465" },
  { id: "omron-gold", brand: "Omron", name: "Omron Gold Upper Arm Blood Pressure Monitor", tagline: "Hypertension risk indicator, Bluetooth, 100-reading memory", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bp5360-front-2000x2000.jpg?signature=b996cd51222c9e6e08395e382558ad4ad7db698993f9bfe24530df9d80015415", url: "https://omronhealthcare.com/products/gold-upper-arm-blood-pressure-monitor-bp5360" },
  { id: "omron-7-series", brand: "Omron", name: "Omron 7 Series® Upper Arm Blood Pressure Monitor", tagline: "Clinically validated, Bluetooth enabled, irregular heartbeat detection", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bp7360-front-2000x2000_v2.jpg?signature=99e4b0fb96bd914e474516866c4c115d03aef062c834e2089ce52559acfe7152", url: "https://omronhealthcare.com/products/7-series-upper-arm-blood-pressure-monitor-bp7360" },
];

const pulseOximeters: Product[] = [
  { id: "ihealth-air", brand: "iHealth", name: "iHealth Air Pulse Oximeter", tagline: "Wireless fingertip pulse oximeter — measures SpO2 and heart rate", price: "$39.99", image: "https://ihealthlabs.com/cdn/shop/products/PO3-main1000_1200x1200.png?v=1679706897", url: "https://ihealthlabs.com/collections/newest-products/products/ihealth-air-pulse-oximeter" },
];

const scales: Product[] = [
  { id: "omron-bcm500", brand: "Omron", name: "Omron BCM-500 Body Composition Monitor & Scale", tagline: "Measures weight, body fat %, skeletal muscle, BMI, visceral fat & more", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/bcm500-hero-800x800.png?signature=f1044c5fafaf9eaf7f3334edd8db9d1b36bd8dc5a87eeda60fe1c1feb5243afe", url: "https://omronhealthcare.com/products/body-composition-monitor-and-scale-with-bluetooth-connectivity-bcm-500", badge: "Body Composition" },
  { id: "omron-sc150", brand: "Omron", name: "Omron SC-150 Digital Scale with Bluetooth", tagline: "Simple Bluetooth weight scale — syncs to app automatically", price: null, image: "https://omronhealthcare.com/images/fit=crop-50-50,fm=jpg,h=630,w=1200/products/sc150_hero_800x800.png?signature=fd74edcacc16afbd6e817bf911c7c6bc24df04e198e244846a487edee7cb7758", url: "https://omronhealthcare.com/products/digital-scale-with-bluetooth-connectivity-sc-150" },
];

const brandColors = {
  iHealth: { bg: "hsla(177, 70%, 55%, 0.15)", text: "hsl(177, 70%, 65%)", border: "hsla(177, 70%, 55%, 0.4)" },
  Omron: { bg: "hsla(210, 70%, 55%, 0.15)", text: "hsl(210, 70%, 70%)", border: "hsla(210, 70%, 55%, 0.4)" },
};

function ProductCard({ product }: { product: Product }) {
  const colors = brandColors[product.brand];
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: "hsla(210, 22%, 20%, 0.9)", border: "1px solid hsla(0,0%,100%,0.08)", boxShadow: "0 2px 12px hsla(0,0%,0%,0.2)" }}>
      <div className="relative flex items-center justify-center p-6" style={{ background: "hsla(0,0%,100%,0.97)", minHeight: "200px" }}>
        <img src={product.image} alt={product.name} className="object-contain w-full transition-transform duration-300 group-hover:scale-105" style={{ maxHeight: "160px" }} loading="lazy" />
        {product.badge && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(45, 90%, 60%))", color: "hsl(210, 32%, 12%)" }}>{product.badge}</span>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>{product.brand}</span>
        <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: "hsl(0,0%,100%)" }}>{product.name}</h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "hsl(0,0%,60%)" }}>{product.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-base" style={{ color: product.price ? "hsl(140,70%,65%)" : "hsl(0,0%,55%)" }}>{product.price ?? "Check Price"}</span>
          <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "hsl(177,70%,65%)" }}>View Product <ExternalLink className="w-3 h-3" /></span>
        </div>
      </div>
    </a>
  );
}

function ProductSection({ title, description, products, id }: { title: string; description: string; products: Product[]; id: string }) {
  return (
    <section id={id} className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "hsl(0,0%,100%)" }}>{title}</h2>
        <p className="text-base" style={{ color: "hsl(0,0%,60%)" }}>{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default function RemoteMonitoring() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", "name": "Clinician-Recommended Home Health Monitoring Devices", "numberOfItems": bpMonitors.length + pulseOximeters.length + scales.length, "itemListElement": [...bpMonitors, ...pulseOximeters, ...scales].map((p, i) => ({ "@type": "ListItem", "position": i + 1, "name": p.name, "url": p.url })) }) }} />

      <div className="container mx-auto px-5 lg:px-8 pt-12 pb-20">
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight" style={{ background: "linear-gradient(135deg, hsl(140,70%,60%), hsl(177,70%,60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AI-Integrated Remote Monitoring
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold mb-5" style={{ color: "hsl(0,0%,90%)" }}>Home Health Devices</p>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0,0%,70%)" }}>
            Monitor your blood pressure, oxygen levels, weight, and more at home — and sync your readings directly to your care team through Guava Health. These are the devices we actually use and recommend to our patients.
          </p>
          <div className="inline-flex items-start gap-3 px-5 py-3 rounded-2xl text-left mb-10" style={{ background: "hsla(45,90%,60%,0.08)", border: "1px solid hsla(45,90%,60%,0.2)" }}>
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(45,90%,65%)" }} />
            <p className="text-sm" style={{ color: "hsl(45,90%,75%)" }}>We do not earn any commission on these products.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[{ label: "Blood Pressure Monitors", id: "bp-monitors" }, { label: "Pulse Oximetry", id: "pulse-ox" }, { label: "Smart Scales", id: "scales" }].map(({ label, id }) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} className="px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity" style={{ background: "hsla(210,22%,26%,0.9)", color: "hsl(177,70%,65%)", border: "1px solid hsla(177,70%,59%,0.3)" }}>
              {label}
            </button>
          ))}
        </div>

        <ProductSection id="bp-monitors" title="Blood Pressure Monitors" description="Clinically validated Bluetooth blood pressure cuffs. All iHealth models sync to Guava Health; Omron devices connect via the Omron Connect app." products={bpMonitors} />
        <ProductSection id="pulse-ox" title="Pulse Oximetry" description="Monitor your blood oxygen levels and heart rate at home. Ideal for patients managing respiratory conditions, recovering from illness, or tracking fitness." products={pulseOximeters} />
        <ProductSection id="scales" title="Smart Scales" description="Bluetooth-connected scales that track weight and body composition over time — automatically logged to your health record." products={scales} />

        <div className="rounded-3xl p-10 lg:p-14 text-center mt-8" style={{ background: "hsla(210,22%,20%,0.9)", border: "1px solid hsla(177,70%,59%,0.2)" }}>
          <Heart className="w-10 h-10 mx-auto mb-5" style={{ color: "hsl(330,70%,65%)" }} />
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(0,0%,100%)" }}>Want your devices to actually talk to your care team?</h2>
          <p className="text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: "hsl(0,0%,70%)" }}>
            As a member of Colorado Springs Health Collective, your home monitoring data syncs directly to your provider through Guava Health — so we can spot trends, adjust your care plan, and follow up between visits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:opacity-85 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(177,70%,55%), hsl(45,90%,60%))", color: "hsl(210,32%,12%)" }}>
              Book a Free Meet &amp; Greet <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/direct-primary-care" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base hover:opacity-80 transition-opacity" style={{ background: "hsla(210,22%,28%,0.9)", color: "hsl(177,70%,65%)", border: "1px solid hsla(177,70%,59%,0.3)" }}>
              Learn About Membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
