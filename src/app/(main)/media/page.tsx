"use client";

import { useRef } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const A = ACCENTS.brand;

const videos = [
  { id: "M8YxtX0GIDI", title: "About Us — Colorado Springs Health Collective", description: "Meet Logan and Sarah Crist and learn why we built a different kind of healthcare practice — one focused on real relationships, transparent pricing, and care that actually works for you." },
  { id: "9lEHuDLAZrM", title: "How We Help — Colorado Springs Health Collective", description: "Longer visits, truly personalized care, and a provider who actually knows you. See how our model gives patients the time and attention they deserve — no rushed appointments, no assembly-line medicine." },
  { id: "cHsmBre9jyc", title: "Does Insurance Actually Make Healthcare Cheaper?", description: "A lot of people assume having insurance means cheaper healthcare — but that's not always the case. We break down why transparent, direct-pay care can actually save you money." },
  { id: "dx442mSgaQI", title: "We Work for You, Not Your Insurance", description: "No middleman. No surprise bills. No rushed visits. Just real relationships, transparent pricing, and care that's built around you — not your insurance company." },
];

function VideoCarousel({ items }: { items: typeof videos }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const w = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 320;
    el.scrollBy({ left: dir === "right" ? w : -w, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <button onClick={() => scroll("left")} aria-label="Scroll left" className="absolute left-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 -translate-x-2 lg:-translate-x-5" style={{ background: `linear-gradient(135deg, ${A.from}, ${A.to})` }}>
        <ChevronLeft className="w-5 h-5" style={{ color: "hsl(210,32%,12%)" }} />
      </button>
      <div ref={ref} className="flex gap-6 overflow-x-auto pb-4 px-2" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
        <style>{`.media-track::-webkit-scrollbar{display:none}`}</style>
        {items.map((v) => (
          <div key={v.id} className="flex-shrink-0 flex flex-col" style={{ width: "clamp(260px, 44%, 420px)", scrollSnapAlign: "start" }}>
            <GlassCard service="brand" className="mb-3 overflow-hidden" style={{ padding: 0 }}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            </GlassCard>
            <h3 className="text-base font-bold mb-1 leading-snug" style={{ color: "hsl(0,0%,92%)" }}>{v.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(0,0%,55%)" }}>{v.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => scroll("right")} aria-label="Scroll right" className="absolute right-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 translate-x-2 lg:translate-x-5" style={{ background: `linear-gradient(135deg, ${A.from}, ${A.to})` }}>
        <ChevronRight className="w-5 h-5" style={{ color: "hsl(210,32%,12%)" }} />
      </button>
    </div>
  );
}

export default function Media() {
  const [featured, ...rest] = videos;
  return (
    <div className="min-h-screen">
      <ServiceHero
        service="brand"
        compact
        eyebrow="Media"
        title="Get to Know"
        titleAccent="Us"
        subhead="Our story, our mission, and the collective we're building."
      />

      <div className="container mx-auto px-5 lg:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto mb-16">
          <GlassCard service="brand" className="overflow-hidden" style={{ padding: 0 }}>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${featured.id}`} title={featured.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </GlassCard>
          <div className="mt-5 px-1">
            <h2 className="text-xl font-bold mb-1" style={{ color: "hsl(0,0%,95%)" }}>{featured.title}</h2>
            <p className="text-base" style={{ color: "hsl(0,0%,60%)" }}>{featured.description}</p>
          </div>
        </div>

        {rest.length > 0 && (
          <div className="mb-12">
            <h2 className="text-center text-xl font-semibold mb-8" style={{ color: "hsl(0,0%,80%)" }}>More Videos</h2>
            <VideoCarousel items={rest} />
          </div>
        )}

        <div className="flex justify-center mt-10">
          <TrackedLink
            href="https://www.youtube.com/@coshealthcollective"
            event="cta_click"
            analytics={{ page: "media", source: "media-youtube", service: "brand" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm hover:opacity-85 transition-opacity"
            style={{ background: `rgba(${A.rgb},0.12)`, border: `1px solid rgba(${A.rgb},0.35)`, color: `rgb(${A.rgb})` }}
          >
            <SiYoutube className="w-5 h-5" /> See all our videos on YouTube <ExternalLink className="w-4 h-4 opacity-70" />
          </TrackedLink>
        </div>
      </div>

      <PageCtaFooter service="brand" heading="Media inquiries" />
    </div>
  );
}
