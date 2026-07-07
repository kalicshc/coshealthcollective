"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Users, ArrowLeft, CalendarCheck } from "lucide-react";
import { bookingUrl } from "@/lib/bookingLinks";
import { trackEvent } from "@/lib/analytics";

// The one always-available conversion action: a free Meet & Greet.
function BookButton({ compact, source, onNavigate }: { compact?: boolean; source: string; onNavigate?: () => void }) {
  return (
    <a
      href={bookingUrl("meetGreet", source)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("book_redirect", { source, appt: "meetGreet", label: "Book Free Meet & Greet" });
        onNavigate?.();
      }}
      className={`inline-flex items-center gap-2 rounded-full font-bold transition-opacity hover:opacity-85 ${
        compact ? "px-3.5 py-1 text-xs" : "px-4 py-1.5 text-sm"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(36, 90%, 52%))",
        color: "hsl(210, 32%, 10%)",
        boxShadow: "0 4px 18px hsla(45, 90%, 55%, 0.3)",
      }}
    >
      <CalendarCheck className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      Book Free Meet &amp; Greet
    </a>
  );
}

const navLinks = [
  { label: "Direct Primary Care", href: "/direct-primary-care" },
  { label: "Hormone & Weight Loss", href: "/hormone" },
  { label: "Hyperbaric", href: "/hyperbaric" },
  { label: "About Us", href: "/about" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  // On the cinematic flythrough (now the live homepage, plus the /preview/home
  // drafts) the bar melts into the photos: solid where the logo/links/buttons sit,
  // fading to transparent at its bottom edge (a "soft line"), and the top
  // logo/wordmark row collapses on scroll-down.
  const onFlythrough = isHome || (!!pathname && pathname.startsWith("/preview/home"));
  const navTextShadow = onFlythrough ? "0 1px 2px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.7)" : undefined;

  // On the preview, collapse the logo/wordmark row when scrolling DOWN, and bring
  // it back the moment the user scrolls UP (any reversal). Always shown at the top.
  const [collapsedState, setCollapsedState] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    if (!onFlythrough) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 60) setCollapsedState(false);
      else if (y > lastY.current + 4) setCollapsedState(true);   // scrolling down
      else if (y < lastY.current - 4) setCollapsedState(false);  // scrolling up
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onFlythrough]);
  const collapsed = onFlythrough && collapsedState;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={onFlythrough
        ? { background: "linear-gradient(to bottom, hsla(214,42%,8%,0.95) 0%, hsla(214,42%,8%,0.92) 72%, hsla(214,42%,8%,0.5) 90%, transparent 100%)" }
        : { background: "hsla(210, 32%, 12%, 0.95)", backdropFilter: "blur(10px)" }}
    >
      {/* Row 1: Logo + name + Resources */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="hidden md:flex items-center justify-between border-b" style={{
          borderColor: onFlythrough ? "transparent" : "hsla(177, 70%, 59%, 0.1)",
          overflow: "hidden",
          maxHeight: collapsed ? 0 : 60,
          opacity: collapsed ? 0 : 1,
          paddingTop: collapsed ? 0 : 8,
          paddingBottom: collapsed ? 0 : 8,
          transition: "max-height .35s ease, opacity .3s ease, padding .35s ease",
        }}>

          {/* Left: back arrow + logo + wordmark */}
          <div className="flex items-center gap-3">
            {/* Back button — faded on home, active elsewhere */}
            <button
              onClick={() => router.back()}
              disabled={isHome}
              aria-label="Go back"
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
              style={{
                color: isHome ? "hsl(0, 0%, 30%)" : "hsl(177, 70%, 65%)",
                background: isHome ? "transparent" : "hsla(177, 70%, 59%, 0.1)",
                border: `1px solid ${isHome ? "hsla(0,0%,100%,0.06)" : "hsla(177,70%,59%,0.2)"}`,
                cursor: isHome ? "default" : "pointer",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
              <Image
                src="/logo-main.png"
                alt="Colorado Springs Health Collective"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
              <div className="leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "hsl(177, 70%, 65%)", textShadow: navTextShadow }}>
                  Colorado Springs
                </p>
                <p className="text-sm font-bold text-white" style={{ textShadow: navTextShadow }}>Health Collective</p>
              </div>
            </Link>
          </div>

          {/* Right: Book + Resources */}
          <div className="flex items-center gap-3">
            <BookButton source="nav" />
            <Link
              href="/resources"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity text-sm font-medium"
              style={{
                background: "hsla(210, 22%, 28%, 0.75)",
                color: "hsl(177, 70%, 65%)",
              }}
            >
              <Users className="w-4 h-4" />
              Resources
            </Link>
          </div>
        </div>

        {/* Row 2: Nav links centered (desktop). When Row 1 collapses on the
            flythrough, a compact Book button appears here so the CTA persists. */}
        <div className="hidden md:flex items-center justify-center gap-6 py-2" style={{ marginTop: onFlythrough ? -6 : undefined }}>
          {navLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-6">
              <Link
                href={link.href}
                className="hover:opacity-70 transition-opacity text-sm font-medium"
                style={{
                  color: pathname === link.href ? "hsl(45, 90%, 60%)" : "hsl(177, 70%, 65%)",
                  textShadow: navTextShadow,
                }}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span style={{ color: "hsl(0, 0%, 40%)" }}>|</span>
              )}
            </span>
          ))}
          {collapsed && <BookButton compact source="nav-collapsed" />}
        </div>
      </div>

      {/* Mobile row */}
      <div className="md:hidden container mx-auto px-4 flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            disabled={isHome}
            aria-label="Go back"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0"
            style={{
              color: isHome ? "hsl(0, 0%, 28%)" : "hsl(177, 70%, 65%)",
              background: isHome ? "transparent" : "hsla(177, 70%, 59%, 0.1)",
              border: `1px solid ${isHome ? "hsla(0,0%,100%,0.05)" : "hsla(177,70%,59%,0.2)"}`,
              cursor: isHome ? "default" : "pointer",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
            <img
              src="/logo-main.png"
              alt="Colorado Springs Health Collective"
              className="w-9 h-9 object-contain"
            />
            <div className="leading-tight">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "hsl(177, 70%, 65%)" }}>
                Colorado Springs
              </p>
              <p className="text-xs font-bold text-white">Health Collective</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={bookingUrl("meetGreet", "nav-mobile")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("book_redirect", { source: "nav-mobile", appt: "meetGreet", label: "Book" })}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(36, 90%, 52%))",
              color: "hsl(210, 32%, 10%)",
            }}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            Book
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "hsl(177, 70%, 65%)" }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-4"
          style={{
            background: "hsla(210, 32%, 12%, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid hsla(177, 70%, 59%, 0.3)",
            boxShadow: "0 4px 30px hsla(177, 70%, 59%, 0.15)",
          }}
        >
          <div className="flex flex-col gap-3">
            <a
              href={bookingUrl("meetGreet", "nav-mobile-menu")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("book_redirect", { source: "nav-mobile-menu", appt: "meetGreet", label: "Book Free Meet & Greet" });
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-bold"
              style={{
                background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(36, 90%, 52%))",
                color: "hsl(210, 32%, 10%)",
              }}
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Free Meet &amp; Greet
            </a>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 px-4 rounded-lg text-base font-medium transition-all duration-200"
                style={{
                  color: pathname === link.href ? "hsl(45, 90%, 60%)" : "hsl(177, 70%, 65%)",
                  background:
                    pathname === link.href
                      ? "hsla(45, 90%, 60%, 0.1)"
                      : "hsla(210, 22%, 20%, 0.5)",
                  border: pathname === link.href
                    ? "1px solid hsla(45, 90%, 60%, 0.3)"
                    : "1px solid hsla(177, 70%, 59%, 0.15)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resources"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-medium mt-2"
              style={{
                background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(45, 90%, 60%))",
                color: "hsl(210, 32%, 12%)",
              }}
            >
              <Users className="w-4 h-4" />
              Resources
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
