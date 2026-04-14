"use client";

import Link from "next/link";
import { SiInstagram, SiYoutube, SiTiktok, SiFacebook, SiGoogle } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Phone, Mail } from "lucide-react";

const socialLinks = [
  { icon: SiGoogle, href: "https://share.google/A5V615VuXhaDQytso", label: "Google Business Profile", color: "#4285F4" },
  { icon: SiInstagram, href: "https://www.instagram.com/coshealthcollective/", label: "Instagram", color: "#E1306C" },
  { icon: SiYoutube, href: "https://www.youtube.com/@coshealthcollective", label: "YouTube", color: "#FF0000" },
  { icon: SiTiktok, href: "https://www.tiktok.com/@cos.health.collec", label: "TikTok", color: "#69C9D0" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/loganmcrist/", label: "LinkedIn", color: "#0A66C2" },
  { icon: SiFacebook, href: "https://www.facebook.com/profile.php?id=61579765478524", label: "Facebook", color: "#1877F2" },
];

const quickLinks = [
  { label: "Direct Primary Care", href: "/direct-primary-care" },
  { label: "Hormone & Weight Loss", href: "/hormone" },
  { label: "Hyperbaric", href: "/hyperbaric" },
  { label: "All Services", href: "/services" },
  { label: "A La Carte", href: "/a-la-carte" },
  { label: "About Us", href: "/about" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "Blog", href: "/blog" },
  { label: "Media", href: "/media" },
  { label: "FAQ", href: "/faq" },
  { label: "Free Resources", href: "/longevity-toolkit-download" },
  { label: "Member Resources", href: "/members" },
];

export function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ background: "hsl(210, 32%, 9%)", borderTop: "1px solid hsla(177, 70%, 59%, 0.15)" }}
    >
      <div className="container mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand column */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/logo-main.png" alt="Colorado Springs Health Collective" className="w-14 h-14 object-contain" />
            </Link>
            <div>
              <p className="font-bold text-base mb-1" style={{ color: "hsl(177, 70%, 65%)" }}>
                Colorado Springs Health Collective
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 50%)" }}>
                Mobile &amp; virtual Direct Primary Care.<br />
                Affordable care for longevity, wellness, and community.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+17198244716"
                className="inline-flex items-center gap-2 text-sm hover:opacity-75 transition-opacity"
                style={{ color: "hsl(0, 0%, 65%)" }}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                (719) 824-4716
              </a>
              <a
                href="mailto:dpc@coshealthcollective.com"
                className="inline-flex items-center gap-2 text-sm hover:opacity-75 transition-opacity"
                style={{ color: "hsl(0, 0%, 65%)" }}
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                dpc@coshealthcollective.com
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177, 70%, 55%)" }}>
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:opacity-75 transition-opacity"
                    style={{ color: "hsl(0, 0%, 65%)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177, 70%, 55%)" }}>
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "hsla(210, 22%, 22%, 0.9)",
                    border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${color}22`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}66`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}33`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "hsla(210, 22%, 22%, 0.9)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsla(0, 0%, 100%, 0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </a>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(0, 0%, 40%)" }}>
              Leave us a Google review — it helps other patients in Colorado Springs find us.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}
        >
          <p className="text-xs" style={{ color: "hsl(0, 0%, 35%)" }}>
            © {new Date().getFullYear()} Colorado Springs Health Collective. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs hover:opacity-75 transition-opacity" style={{ color: "hsl(0, 0%, 35%)" }}>
              Privacy Policy
            </Link>
            <Link href="/hipaa-notice" className="text-xs hover:opacity-75 transition-opacity" style={{ color: "hsl(0, 0%, 35%)" }}>
              HIPAA Notice
            </Link>
            <Link href="/terms-of-service" className="text-xs hover:opacity-75 transition-opacity" style={{ color: "hsl(0, 0%, 35%)" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
