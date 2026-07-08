import Link from "next/link";
import { Dumbbell, ExternalLink, FileText } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";

const ACCENT = ACCENTS.brand;

const events = [
  {
    id: "community-movement",
    title: "Community Movement",
    description: "Join us for outdoor group fitness sessions. All fitness levels welcome. Activities vary by session and may include hiking, running, strength training, and more.",
    calendlyLink: "https://calendly.com/dpc-coshealthcollective/group-workout",
    icon: Dumbbell,
  },
];

export default function CommunityEvents() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Get Involved"
        title="Community"
        titleAccent="Events"
        subhead="Connect with your community through wellness activities. All events are free and open to everyone."
        compact
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{ background: "hsla(210,22%,22%,0.5)", color: "hsl(210,25%,78%)", border: `1px solid rgba(${ACCENT.rgb},0.2)` }}
        >
          <FileText className="w-4 h-4" />
          <span>By participating, you agree to our</span>
          <Link href="/waiver" className="underline hover:opacity-80" style={{ color: `rgb(${ACCENT.rgb})` }}>
            participation waiver
          </Link>
        </div>
      </ServiceHero>

      <div className="section-divider" />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-black mb-8 text-center text-white">
            Upcoming <span style={gradientTextStyle("brand")}>Events</span>
          </h2>
          <div className="space-y-5">
            {events.map((event) => (
              <GlassCard key={event.id} service="brand" className="lg:!p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
                  >
                    <event.icon className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1.75} style={{ color: "hsl(210,32%,10%)" }} aria-hidden />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">{event.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(210,25%,75%)" }}>{event.description}</p>
                    <TrackedLink
                      href={event.calendlyLink}
                      analytics={{ page: "community-events", source: "community-events-schedule", service: "brand", label: event.title }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-85 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
                    >
                      View Schedule &amp; Sign Up <ExternalLink className="w-4 h-4" />
                    </TrackedLink>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Want to bring an event idea?"
        body="We're always looking for new ways to get the community moving — reach out and tell us what you'd love to see."
      />
    </div>
  );
}
