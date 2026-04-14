"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Stethoscope, MapPin, Star, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import OurStoryCarousel from "@/components/OurStoryCarousel";
import PortalPillars from "@/components/PortalPillars";

const GOOGLE_REVIEWS_URL = "https://share.google/A5V615VuXhaDQytso";
const TELEHEALTH_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/signup/telehealth";
const INPERSON_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/signup/urgentcarevisit";

const reviewsData = [
  {
    name: "Samuel S.",
    avatarColor: "hsl(280, 60%, 45%)",
    text: "We had such a great experience with Logan! Our toddler woke up in the middle of a Saturday night with croup. We were looking at waiting around an emergency room to get him seen. Logan fixed that problem entirely. He came to our living room; conducted an exam (and was really awesome with our son); and got him rolling on meds quickly. Everything you hope for from a medical provider.",
  },
  {
    name: "Sheena S.",
    avatarColor: "hsl(330, 60%, 40%)",
    text: "Colorado Springs Health Collective is truly incredible. When my daughter Aspen was sick, their concierge team came directly to our home and took such amazing care of her. They were prompt, professional, and incredibly thorough. They didn't rush, they explained everything, and they followed up afterward to make sure she was continuing to improve.",
  },
  {
    name: "Jozlyn G.",
    avatarColor: "hsl(177, 60%, 35%)",
    text: "Such a great primary care experience! It's nice to talk to providers that truly take the time to ask in depth questions and seem compassionate and invested. Easeful booking and appointment and they were kind enough to follow up. I never feel rushed, and I always leave feeling confident about my care plan. Highly recommend!",
  },
  {
    name: "Kameron & Mikaela",
    avatarColor: "hsl(210, 60%, 40%)",
    text: "I can't say enough good things about Colorado Springs Health Collective. After breaking my leg and ankle, they were able to help me quickly through a telemedicine consultation, and the care was outstanding. They were incredibly attentive, compassionate, and thorough. They have followed up with me since and are so genuine. I highly recommend them to everyone.",
  },
  {
    name: "Michael R.",
    avatarColor: "hsl(45, 70%, 40%)",
    text: "Go to your regular doctor and they spend 10 minutes with you, throw you a pill, then hurry you out the door. Bam $150. Not with Colorado Springs Health Collective. Logan took his time, dove into my issue, ordering relevant labs, reviewing my medical history, nutrition, current lifestyle, and my goals. Logan kicked out a treatment plan that has already given me positive results. Highly recommend!",
  },
  {
    name: "Carley H.",
    avatarColor: "hsl(140, 55%, 35%)",
    text: "Colorado Springs Health Collective is top-notch. The care feels genuinely personal, with unrushed visits, thoughtful follow-ups, and quick, easy communication. Logan truly listened to my concerns and showed real professionalism and dedication. I always feel supported and cared for, like a human, not a time slot. Highly recommend for anyone considering direct primary care!",
  },
];


export default function Home() {
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const [reviewsAtStart, setReviewsAtStart] = useState(true);
  const [reviewsAtEnd, setReviewsAtEnd] = useState(false);

  const scrollReviews = (dir: "left" | "right") => {
    const el = reviewsScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -370 : 370, behavior: "smooth" });
  };

  const handleReviewsScroll = () => {
    const el = reviewsScrollRef.current;
    if (!el) return;
    setReviewsAtStart(el.scrollLeft <= 8);
    setReviewsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        style={{ background: "hsl(177, 70%, 59%)", color: "hsl(210, 32%, 12%)" }}
      >
        Skip to main content
      </a>

      {/* Hero */}
      <section
        id="main-content"
        className="hero-overlay relative min-h-screen flex items-center justify-center pt-28 lg:pt-36"
        style={{ background: "linear-gradient(to bottom, hsla(210, 32%, 8%, 0.45), hsla(210, 28%, 12%, 0.2) 60%, transparent)" }}
      >
        <div className="container mx-auto px-5 lg:px-8 text-center z-10">
          <div className="mb-8 flex justify-center">
            <img
              src="/logo-main.png"
              alt="Colorado Springs Health Collective Logo"
              className="w-24 h-24 lg:w-32 lg:h-32 object-contain drop-shadow-2xl"
            />
          </div>

          <h1
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "hsl(0, 0%, 100%)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            The Colorado Springs<br />
            <span style={{
              background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Health Collective
            </span>
          </h1>


          <div className="flex items-center justify-center mb-8">
            <MapPin className="w-5 h-5 mr-2" style={{ color: "hsl(177, 70%, 59%)" }} />
            <p className="text-lg" style={{ color: "hsl(210, 25%, 69%)" }}>Colorado Springs, Colorado</p>
          </div>

          <p
            className="font-semibold mb-4 max-w-2xl mx-auto"
            style={{ color: "hsl(0, 0%, 92%)", fontSize: "22px", letterSpacing: "-0.01em" }}
          >
            This is what modern healthcare looks like.
          </p>
          <p
            className="font-normal mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "hsl(210, 25%, 62%)", fontSize: "17px" }}
          >
            Three clinics. One collective. Built for people who know something better has to exist.
          </p>
        </div>
      </section>

      {/* Three Clinics */}
      <section className="py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <PortalPillars />

            {/* Urgent Care Strip */}
            <div
              className="mt-6 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              style={{
                background: "hsla(210, 22%, 22%, 0.5)",
                backdropFilter: "blur(12px)",
                borderLeft: "3px solid hsl(177, 70%, 59%)",
                border: "1px solid hsla(177, 70%, 59%, 0.2)",
                borderLeftWidth: "3px",
              }}
            >
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "hsl(0, 0%, 95%)" }}>
                    Mobile Urgent Care &amp; Telehealth — No membership needed
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(210, 25%, 65%)" }}>
                    Telehealth $85 · In-home visit $115 · Free for DPC members
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a
                  href={TELEHEALTH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-85"
                  style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                >
                  Book Telehealth →
                </a>
                <a
                  href={INPERSON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-85"
                  style={{ background: "hsla(210, 22%, 30%, 0.8)", color: "hsl(177, 70%, 65%)", border: "1px solid hsla(177, 70%, 59%, 0.3)" }}
                >
                  Book In-Home →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Our Story Carousel */}
      <OurStoryCarousel />

      <div className="section-divider" />

      {/* Google Reviews */}
      <section className="py-14 lg:py-16 relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "Colorado Springs Health Collective",
              aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "6", bestRating: "5" },
            }),
          }}
        />
        <div className="container mx-auto px-5 lg:px-8 mb-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: "hsl(45, 90%, 60%)" }} />
              ))}
              <span className="ml-2 font-bold text-lg" style={{ color: "hsl(0,0%,100%)" }}>5.0 on Google</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: "hsl(0,0%,100%)" }}>
              What Our Patients Are Saying
            </h2>
          </div>
        </div>

        {/* Arrow-scroll reviews */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollReviews("left")}
            disabled={reviewsAtStart}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
            style={{
              background: "hsla(210, 22%, 11%, 0.95)",
              border: "1px solid hsla(45, 90%, 60%, 0.4)",
              boxShadow: "0 0 16px hsla(45, 80%, 40%, 0.3)",
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "hsl(45, 90%, 65%)" }} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollReviews("right")}
            disabled={reviewsAtEnd}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
            style={{
              background: "hsla(210, 22%, 11%, 0.95)",
              border: "1px solid hsla(45, 90%, 60%, 0.4)",
              boxShadow: "0 0 16px hsla(45, 80%, 40%, 0.3)",
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "hsl(45, 90%, 65%)" }} />
          </button>

          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-16 z-[5] pointer-events-none" style={{ background: "linear-gradient(to right, hsl(210, 32%, 12%), transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-16 z-[5] pointer-events-none" style={{ background: "linear-gradient(to left, hsl(210, 32%, 12%), transparent)" }} />

          <div
            ref={reviewsScrollRef}
            onScroll={handleReviewsScroll}
            className="flex gap-4 overflow-x-auto pb-2 px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {reviewsData.map((review, i) => (
              <a
                key={i}
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 rounded-2xl overflow-hidden block transition-all duration-300 hover:scale-[1.02]"
                style={{
                  width: "340px",
                  background: "hsla(210, 22%, 11%, 0.98)",
                  border: "1px solid hsla(45, 90%, 60%, 0.18)",
                  boxShadow: "0 4px 24px hsla(45, 80%, 40%, 0.12)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsla(45, 90%, 60%, 0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px hsla(45, 90%, 60%, 0.15), 0 16px 48px hsla(45, 80%, 40%, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsla(45, 90%, 60%, 0.18)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px hsla(45, 80%, 40%, 0.12)";
                }}
              >
                <div style={{ height: "3px", background: "linear-gradient(90deg, hsl(45, 90%, 60%), hsl(177, 70%, 59%))" }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: review.avatarColor, color: "hsl(0,0%,100%)" }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "hsl(0,0%,95%)" }}>{review.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-current" style={{ color: "hsl(45, 90%, 60%)" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(0,0%,72%)" }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-80"
            style={{ color: "hsl(45, 90%, 65%)", border: "1px solid hsla(45, 90%, 60%, 0.35)" }}
          >
            Read all reviews on Google →
          </a>
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "hsla(210, 22%, 11%, 0.98)",
                border: "1px solid hsla(177, 70%, 59%, 0.35)",
                boxShadow: "0 0 0 1px hsla(177, 70%, 59%, 0.15), 0 24px 60px hsla(177, 60%, 35%, 0.25), 0 0 100px hsla(177, 70%, 30%, 0.15)",
              }}
            >
              {/* Teal top bar */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))" }} />

              {/* Radial glow overlay */}
              <div
                className="relative px-8 lg:px-12 py-10 lg:py-12 overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(177, 70%, 50%, 0.1) 0%, transparent 65%)" }}
                />

                <div className="relative text-center">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177, 70%, 59%)" }}>
                    Get in Touch
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-black mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
                    We&apos;re here when you need us
                  </h2>
                  <p className="text-base mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "hsl(210, 25%, 68%)" }}>
                    Text, call, or email — we respond like a real person, not a portal.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="tel:+17198244716"
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))",
                        color: "hsl(210, 32%, 12%)",
                        boxShadow: "0 8px 24px hsla(177, 70%, 40%, 0.35)",
                      }}
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <span>(719) 824-4716</span>
                    </a>
                    <a
                      href="mailto:dpc@coshealthcollective.com"
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: "hsla(210, 22%, 20%, 0.8)",
                        color: "hsl(177, 70%, 72%)",
                        border: "1px solid hsla(177, 70%, 59%, 0.35)",
                      }}
                    >
                      <Mail className="w-5 h-5 flex-shrink-0" />
                      <span>dpc@coshealthcollective.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Vision */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "hsla(210, 22%, 11%, 0.98)",
                border: "1px solid hsla(45, 90%, 60%, 0.3)",
                boxShadow: "0 0 0 1px hsla(45, 90%, 60%, 0.12), 0 24px 80px hsla(45, 80%, 40%, 0.2), 0 0 140px hsla(177, 70%, 30%, 0.15)",
              }}
            >
              {/* Gold → teal top bar */}
              <div style={{ height: "4px", background: "linear-gradient(90deg, hsl(45, 90%, 60%), hsl(177, 70%, 59%), hsl(210, 70%, 60%))" }} />

              <div className="relative px-8 lg:px-14 py-12 lg:py-16 overflow-hidden text-center">
                {/* Radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(45, 90%, 55%, 0.1) 0%, hsla(177, 70%, 40%, 0.06) 45%, transparent 70%)" }}
                />

                <div className="relative">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                    style={{ background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                  >
                    Our Journey Forward
                  </span>

                  <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                    Building the future<br />
                    <span style={{
                      background: "linear-gradient(135deg, hsl(45, 90%, 65%), hsl(177, 70%, 59%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      of wellness in Colorado Springs.
                    </span>
                  </h2>

                  <p className="text-lg leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: "hsl(210, 30%, 78%)" }}>
                    We started with direct primary care because the foundation of great health is a provider who actually knows you. Now we&apos;re building the rest — hormone optimization, GLP-1 therapy, and the only accessible 2.0 ATA hyperbaric chamber in Colorado Springs.
                  </p>

                  <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "hsl(210, 20%, 58%)" }}>
                    The goal is a full health campus where all of it lives under one roof. We&apos;re building toward that — one clinic at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
