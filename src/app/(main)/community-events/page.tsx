"use client";

import Link from "next/link";
import { Calendar, ArrowLeft, ExternalLink, FileText } from "lucide-react";

const events = [
  {
    id: "community-movement",
    title: "Community Movement",
    description: "Join us for outdoor group fitness sessions. All fitness levels welcome. Activities vary by session and may include hiking, running, strength training, and more.",
    calendlyLink: "https://calendly.com/dpc-coshealthcollective/group-workout",
    icon: "💪",
  },
];

export default function CommunityEvents() {
  return (
    <div className="page-bg">
      <div className="container mx-auto px-5 lg:px-8 py-32">

        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(177, 70%, 59%))" }}>
              <Calendar className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
            </div>
          </div>
          <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
            Get Involved
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>Community Events</h1>
          <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>
            Connect with your community through wellness activities. All events are free and open to everyone.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "hsla(210, 22%, 28%, 0.75)", color: "hsl(0, 0%, 85%)" }}>
            <FileText className="w-4 h-4" />
            <span>By participating, you agree to our </span>
            <Link href="/waiver" className="underline hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>participation waiver</Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center" style={{ color: "hsl(0, 0%, 100%)" }}>Upcoming Events</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="rounded-2xl p-6 lg:p-8" style={{ background: "hsla(210, 22%, 18%, 0.9)" }}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(177, 70%, 59%))" }}>
                    {event.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>{event.title}</h3>
                    <p className="text-base leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>{event.description}</p>
                    <button
                      onClick={() => window.open(event.calendlyLink, "_blank", "noopener,noreferrer")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
                      style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                    >
                      View Schedule &amp; Sign Up <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2" style={{ borderColor: "hsl(177, 70%, 59%)", color: "hsl(177, 70%, 59%)", background: "transparent" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="mt-16 pt-8 text-center" style={{ borderTop: "1px solid hsla(0, 0%, 100%, 0.1)" }}>
          <p className="text-sm" style={{ color: "hsl(0, 0%, 70%)" }}>Colorado Springs Health Collective</p>
          <p className="text-sm mt-1" style={{ color: "hsl(0, 0%, 60%)" }}>(719) 824-4716 | dpc@coshealthcollective.com</p>
        </div>

      </div>
    </div>
  );
}
