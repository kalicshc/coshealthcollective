"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Users, ArrowLeft } from "lucide-react";

const navLinks = [
  { label: "Direct Primary Care", href: "/direct-primary-care" },
  { label: "Hormone & Weight Loss", href: "/hormone" },
  { label: "Hyperbaric", href: "/hyperbaric" },
  { label: "Services", href: "/services" },
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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "hsla(210, 32%, 12%, 0.95)", backdropFilter: "blur(10px)" }}
    >
      {/* Row 1: Logo + name + Resources */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="hidden md:flex items-center justify-between py-2 border-b" style={{ borderColor: "hsla(177, 70%, 59%, 0.1)" }}>

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
              <img
                src="/logo-main.png"
                alt="Colorado Springs Health Collective"
                className="w-9 h-9 object-contain"
              />
              <div className="leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "hsl(177, 70%, 65%)" }}>
                  Colorado Springs
                </p>
                <p className="text-sm font-bold text-white">Health Collective</p>
              </div>
            </Link>
          </div>

          {/* Right: Resources */}
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

        {/* Row 2: Nav links centered (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-6 py-2">
          {navLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-6">
              <Link
                href={link.href}
                className="hover:opacity-70 transition-opacity text-sm font-medium"
                style={{
                  color: pathname === link.href ? "hsl(45, 90%, 60%)" : "hsl(177, 70%, 65%)",
                }}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span style={{ color: "hsl(0, 0%, 40%)" }}>|</span>
              )}
            </span>
          ))}
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: "hsl(177, 70%, 65%)" }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
