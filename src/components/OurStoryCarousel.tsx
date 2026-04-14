"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    eyebrow: "WHO WE ARE",
    title: "You're not a number here.",
    body: "We're a collective of providers building something different. Whether you're here for primary care, hormone optimization, or recovery — you're a whole human with strengths, stressors, habits, and goals. Our job is to help you move the needle.",
    image: "/images/story/01-who-we-are-opt.jpg",
    alt: "Logan and Sarah with their daughter in the Colorado mountains during fall",
  },
  {
    id: 2,
    eyebrow: "OUR LIFE",
    title: "We live for this.",
    body: "We mountain bike, hike, camp, and explore with Henry, Mila, our daughter, and each other. We care about the outdoors, wildlife, and building a life that stays strong as the years stack up.",
    image: "/images/story/02-colorado-life-opt.jpg",
    alt: "German Shepherds Henry and Mila at sunset on the beach",
  },
  {
    id: 3,
    eyebrow: "BEST FIT",
    title: "For people who refuse to slow down.",
    body: "Our members want to age with strength, clarity, and energy. Parents who want more years for their kids. Athletes who want to recover smarter. Adults who know something feels off and want real answers — not dismissals.",
    image: "/images/story/03-best-fit-opt.jpg",
    alt: "Family hiking at a waterfall",
  },
  {
    id: 4,
    eyebrow: "WHY WE LEFT",
    title: "We got tired of rushed medicine.",
    body: "In the traditional model, the incentive is volume: more visits, less time. That means shorter conversations, slower access, and worse follow-through—while costs keep climbing.",
    image: "/images/story/04-rushed-medicine-opt.jpg",
    alt: "Logan hiking in winter with daughter in carrier",
  },
  {
    id: 5,
    eyebrow: "THE PROBLEM",
    title: "The system fails people at every turn.",
    body: "We watched people pay more and get less. Women dismissed during menopause — told their labs were 'normal' while their quality of life collapsed. Men written off when testosterone was 'in range' but off. Recovery tools locked behind hospital programs most people can't access or afford. The system wasn't built for patients.",
    image: "/images/story/05-insurance-barriers-opt.jpg",
    alt: "Logan and Sarah mountain biking together",
  },
  {
    id: 6,
    eyebrow: "THE SOLUTION",
    title: "A collective built to fill the gaps.",
    body: "We built CSHC to cover what the system ignores. Direct primary care that puts your provider in your corner. Hormone optimization for the patients who've been dismissed — especially women navigating menopause and men told their numbers are 'fine.' And hyperbaric oxygen therapy at 2.0 ATA, coming to Colorado Springs because no one else was bringing it here at a price people can actually access.",
    image: "/images/story/06-why-dpc-opt.jpg",
    alt: "Logan and Sarah wedding photo by a mountain lake",
  },
  {
    id: 7,
    eyebrow: "THE VISION",
    title: "We're building the campus.",
    body: "We left careers in emergency medicine and hospital systems because we saw what's possible when care is built for people — not billing cycles. We started with direct primary care. We're adding hormone optimization, GLP-1 therapy, and the only accessible 2.0 ATA hyperbaric chamber in Colorado Springs. And we're working toward a full health campus where all of it lives under one roof.",
    image: "/images/story/07-the-leap-opt.jpg",
    alt: "Baby with German Shepherds Henry and Mila on the salt flats",
    cta: {
      primary: {
        text: "Book a Free Meet & Greet",
        href: "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207",
      },
      secondary: {
        text: "Learn if DPC is a fit",
        href: "/faq",
      },
    },
  },
];

export default function OurStoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const slideElements = container.querySelectorAll("[data-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-slide"));
            setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    slideElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 6s, pause on hover
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev < slides.length - 1 ? prev + 1 : 0;
        scrollToSlideImmediate(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, isPaused]);

  const scrollToSlideImmediate = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: container.offsetWidth * index, behavior: "smooth" });
  };

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handlePrev = () => { if (activeIndex > 0) scrollToSlide(activeIndex - 1); };
  const handleNext = () => { if (activeIndex < slides.length - 1) scrollToSlide(activeIndex + 1); };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <section id="our-story" className="py-16 lg:py-24">
      <div className="container mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
            Our Story
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>
            Why we built Colorado Springs Health Collective – Direct Primary Care
          </p>
        </div>

        <div
          className="relative"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          tabIndex={0}
          role="region"
          aria-label="Our Story carousel"
          aria-roledescription="carousel"
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {slides.map((slide, index) => {
              const isHovered = hoveredSlide === index;
              return (
                <div
                  key={slide.id}
                  data-slide={index}
                  className="flex-shrink-0 w-full snap-center px-2 lg:px-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.title}`}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "hsla(210, 22%, 11%, 0.98)",
                      border: `1px solid ${isHovered ? "hsla(177, 70%, 59%, 0.5)" : "hsla(177, 70%, 59%, 0.12)"}`,
                      boxShadow: isHovered
                        ? "0 0 0 1px hsla(177, 70%, 59%, 0.15), 0 24px 80px hsla(177, 60%, 35%, 0.35), 0 0 120px hsla(177, 70%, 30%, 0.2)"
                        : "0 4px 24px hsla(210, 30%, 5%, 0.4)",
                      transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                    }}
                    onMouseEnter={() => setHoveredSlide(index)}
                    onMouseLeave={() => setHoveredSlide(null)}
                  >
                    {/* Top gradient bar */}
                    <div style={{
                      height: "3px",
                      background: "linear-gradient(90deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%), hsl(45, 90%, 60%))",
                      opacity: isHovered ? 1 : 0.4,
                      transition: "opacity 0.35s ease",
                    }} />

                    <div className="relative flex flex-col lg:flex-row overflow-hidden">
                      {/* Radial glow on hover */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse at 60% 50%, hsla(177, 70%, 50%, 0.08) 0%, transparent 65%)",
                          opacity: isHovered ? 1 : 0,
                          transition: "opacity 0.35s ease",
                        }}
                      />

                      <div className="lg:w-1/2 flex items-center justify-center" style={{ background: "hsla(210, 32%, 7%, 0.7)" }}>
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="w-full h-80 lg:h-[450px] object-contain"
                          style={{
                            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isHovered ? "scale(1.03)" : "scale(1)",
                          }}
                        />
                      </div>

                      <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center relative">
                        <span
                          className="text-xs font-bold tracking-widest mb-3 uppercase"
                          style={{
                            color: isHovered ? "hsl(177, 70%, 70%)" : "hsl(177, 70%, 59%)",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {slide.eyebrow}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-black mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                          {slide.title}
                        </h3>
                        <p className="text-base lg:text-lg leading-relaxed mb-4" style={{ color: "hsl(210, 30%, 78%)" }}>
                          {slide.body}
                        </p>
                        {slide.cta && (
                          <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                              onClick={() => window.open(slide.cta!.primary.href, "_blank", "noopener,noreferrer")}
                              className="px-6 py-3 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
                              style={{
                                background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))",
                                color: "hsl(210, 32%, 12%)",
                                boxShadow: "0 8px 24px hsla(177, 70%, 40%, 0.35)",
                              }}
                            >
                              {slide.cta.primary.text}
                            </button>
                            <button
                              onClick={() => {
                                if (slide.cta!.secondary.href.startsWith("/")) {
                                  router.push(slide.cta!.secondary.href);
                                } else {
                                  window.open(slide.cta!.secondary.href, "_blank", "noopener,noreferrer");
                                }
                              }}
                              className="px-6 py-3 font-medium rounded-xl transition-all duration-200 hover:bg-white/10"
                              style={{
                                color: "hsl(210, 40%, 89%)",
                                border: "1px solid hsla(177, 70%, 59%, 0.3)",
                              }}
                            >
                              {slide.cta.secondary.text}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:translate-x-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={{
              background: "hsla(210, 22%, 11%, 0.95)",
              border: "1px solid hsla(177, 70%, 59%, 0.35)",
              boxShadow: "0 0 16px hsla(177, 70%, 40%, 0.25)",
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "hsl(177, 70%, 65%)" }} />
          </button>

          <button
            onClick={handleNext}
            disabled={activeIndex === slides.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={{
              background: "hsla(210, 22%, 11%, 0.95)",
              border: "1px solid hsla(177, 70%, 59%, 0.35)",
              boxShadow: "0 0 16px hsla(177, 70%, 40%, 0.25)",
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: "hsl(177, 70%, 65%)" }} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Slide indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 ${activeIndex === index ? "w-8" : "w-2.5"}`}
              style={{
                background:
                  activeIndex === index
                    ? "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))"
                    : "rgba(255, 255, 255, 0.3)",
              }}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
