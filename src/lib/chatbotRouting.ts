export type ChatCtaTag =
  // Bookings & high-intent flows
  | "dpc"
  | "dpc-membership"
  | "hormone"
  | "hormone-womens-quiz"
  | "hormone-mens-quiz"
  | "hbot"
  | "urgent"
  | "members"
  | "business"
  // Service pages
  | "iv-therapy"
  | "aesthetics"
  | "weight-loss"
  | "glp1"
  | "precision-medicine"
  | "health-coaching"
  | "personal-training"
  | "strength-wellness-coaching"
  | "allergy-slit"
  | "a-la-carte"
  | "longevity-toolkit"
  | "remote-monitoring"
  | "referrals"
  // HBOT info subpages
  | "hbot-evidence"
  | "hbot-why-2ata"
  // Info / nav pages
  | "home"
  | "services"
  | "faq"
  | "about"
  | "blog"
  | "media"
  | "community-events"
  | "resources"
  | "breast-cancer-risk"
  | "partner-network"
  | "legal"
  // Socials
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "linkedin";

export type ChatSuggestion = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatCtaFormType = "hbot";

export type ChatCta = {
  tag: ChatCtaTag;
  kind: "book" | "form";
  formType?: ChatCtaFormType;
  book: ChatSuggestion;
  learnMore?: ChatSuggestion;
};

const HINT_BASE = "https://colorado-springs-health-collective-direct-primary-care.hint.com";

const BOOK_MEET_GREET = `${HINT_BASE}/booking?appointment-type=appty-d2b5ee660e1e0207`;
const BOOK_HORMONE_CONSULT = `${HINT_BASE}/booking?appointment-type=appty-5688330a3b52e266`;
const BOOK_TELEHEALTH = `${HINT_BASE}/signup/telehealth`;
const DPC_MEMBERSHIP_SIGNUP = `${HINT_BASE}/signup/membership/contacts?=`;
const MEMBER_LOGIN = `${HINT_BASE}/login/request?redirectTo=%2Faccount%2Fbooking`;

const SOCIALS = {
  instagram: "https://www.instagram.com/coshealthcollective/",
  tiktok: "https://www.tiktok.com/@cos.health.collec",
  youtube: "https://www.youtube.com/@coshealthcollective",
  facebook: "https://www.facebook.com/profile.php?id=61579765478524",
  linkedin: "https://www.linkedin.com/in/loganmcrist/",
};

const CTA_BY_TAG: Record<ChatCtaTag, ChatCta> = {
  // ───────── Bookings & high-intent flows ─────────
  dpc: {
    tag: "dpc",
    kind: "book",
    book: { label: "Book Free Meet & Greet", href: BOOK_MEET_GREET, external: true },
    learnMore: { label: "Learn more about DPC", href: "/direct-primary-care" },
  },
  "dpc-membership": {
    tag: "dpc-membership",
    kind: "book",
    book: { label: "Join DPC ($100/mo)", href: DPC_MEMBERSHIP_SIGNUP, external: true },
    learnMore: { label: "Learn more about DPC", href: "/direct-primary-care" },
  },
  hormone: {
    tag: "hormone",
    kind: "book",
    book: { label: "Book Hormone Consult", href: BOOK_HORMONE_CONSULT, external: true },
    learnMore: { label: "Learn more", href: "/hormone" },
  },
  "hormone-womens-quiz": {
    tag: "hormone-womens-quiz",
    kind: "book",
    book: { label: "Take the Women's Hormone Quiz", href: "/hormone/womens-health/quiz" },
    learnMore: { label: "Women's hormone health", href: "/hormone/womens-health" },
  },
  "hormone-mens-quiz": {
    tag: "hormone-mens-quiz",
    kind: "book",
    book: { label: "Take the Men's Hormone Quiz", href: "/hormone/mens-health/quiz" },
    learnMore: { label: "Men's hormone health", href: "/hormone/mens-health" },
  },
  hbot: {
    tag: "hbot",
    kind: "form",
    formType: "hbot",
    book: { label: "Join HBOT Waitlist", href: "#hbot-form" },
    learnMore: { label: "Learn more", href: "/hyperbaric/why-2ata" },
  },
  urgent: {
    tag: "urgent",
    kind: "book",
    book: { label: "Book Telehealth Visit ($85)", href: BOOK_TELEHEALTH, external: true },
    learnMore: { label: "About urgent care", href: "/urgent-care" },
  },
  members: {
    tag: "members",
    kind: "book",
    book: { label: "Member Login", href: MEMBER_LOGIN, external: true },
    learnMore: { label: "Member resources", href: "/members" },
  },
  business: {
    tag: "business",
    kind: "book",
    book: { label: "Talk to Our Team", href: BOOK_MEET_GREET, external: true },
    learnMore: { label: "For businesses", href: "/for-businesses" },
  },

  // ───────── Service pages ─────────
  "iv-therapy": {
    tag: "iv-therapy",
    kind: "book",
    book: { label: "IV Therapy", href: "/iv-therapy" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  aesthetics: {
    tag: "aesthetics",
    kind: "book",
    book: { label: "Aesthetics", href: "/aesthetics" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "weight-loss": {
    tag: "weight-loss",
    kind: "book",
    book: { label: "Weight Loss", href: "/weight-loss" },
    learnMore: { label: "GLP-1 details", href: "/hormone/glp1" },
  },
  glp1: {
    tag: "glp1",
    kind: "book",
    book: { label: "GLP-1 / Semaglutide", href: "/hormone/glp1" },
    learnMore: { label: "Book a consult", href: BOOK_HORMONE_CONSULT, external: true },
  },
  "precision-medicine": {
    tag: "precision-medicine",
    kind: "book",
    book: { label: "Precision Medicine", href: "/precision-medicine" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "health-coaching": {
    tag: "health-coaching",
    kind: "book",
    book: { label: "Health Coaching", href: "/health-coaching" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "personal-training": {
    tag: "personal-training",
    kind: "book",
    book: { label: "Personal Training", href: "/personal-training" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "strength-wellness-coaching": {
    tag: "strength-wellness-coaching",
    kind: "book",
    book: { label: "Strength & Wellness Coaching", href: "/strength-wellness-coaching" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "allergy-slit": {
    tag: "allergy-slit",
    kind: "book",
    book: { label: "Allergy SLIT", href: "/allergy-slit" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  "a-la-carte": {
    tag: "a-la-carte",
    kind: "book",
    book: { label: "À La Carte Services", href: "/a-la-carte" },
    learnMore: { label: "All services", href: "/services" },
  },
  "longevity-toolkit": {
    tag: "longevity-toolkit",
    kind: "book",
    book: { label: "Download Longevity Toolkit", href: "/longevity-toolkit-download" },
  },
  "remote-monitoring": {
    tag: "remote-monitoring",
    kind: "book",
    book: { label: "Remote Monitoring", href: "/remote-monitoring" },
    learnMore: { label: "Book a Meet & Greet", href: BOOK_MEET_GREET, external: true },
  },
  referrals: {
    tag: "referrals",
    kind: "book",
    book: { label: "Referrals & Care Coordination", href: "/referrals-care-coordination" },
  },

  // ───────── HBOT info ─────────
  "hbot-evidence": {
    tag: "hbot-evidence",
    kind: "book",
    book: { label: "HBOT Evidence", href: "/hyperbaric/evidence" },
    learnMore: { label: "Hyperbaric overview", href: "/hyperbaric" },
  },
  "hbot-why-2ata": {
    tag: "hbot-why-2ata",
    kind: "book",
    book: { label: "Why 2.0 ATA", href: "/hyperbaric/why-2ata" },
    learnMore: { label: "Hyperbaric overview", href: "/hyperbaric" },
  },

  // ───────── Info / nav pages ─────────
  home: {
    tag: "home",
    kind: "book",
    book: { label: "Homepage", href: "/" },
  },
  services: {
    tag: "services",
    kind: "book",
    book: { label: "All Services", href: "/services" },
  },
  faq: {
    tag: "faq",
    kind: "book",
    book: { label: "FAQ", href: "/faq" },
  },
  about: {
    tag: "about",
    kind: "book",
    book: { label: "About CSHC", href: "/about" },
    learnMore: { label: "Meet the team", href: "/about" },
  },
  blog: {
    tag: "blog",
    kind: "book",
    book: { label: "Read the Blog", href: "/blog" },
  },
  media: {
    tag: "media",
    kind: "book",
    book: { label: "Media & Press", href: "/media" },
  },
  "community-events": {
    tag: "community-events",
    kind: "book",
    book: { label: "Community Events", href: "/community-events" },
  },
  resources: {
    tag: "resources",
    kind: "book",
    book: { label: "Resources", href: "/resources" },
    learnMore: { label: "Calculators", href: "/resources/calculators" },
  },
  "breast-cancer-risk": {
    tag: "breast-cancer-risk",
    kind: "book",
    book: { label: "Breast Cancer Risk Calculator", href: "/resources/calculators/breast-cancer-risk" },
  },
  "partner-network": {
    tag: "partner-network",
    kind: "book",
    book: { label: "Partner Network", href: "/partner-network" },
  },
  legal: {
    tag: "legal",
    kind: "book",
    book: { label: "Privacy Policy", href: "/privacy-policy" },
    learnMore: { label: "Terms of service", href: "/terms-of-service" },
  },

  // ───────── Socials ─────────
  instagram: {
    tag: "instagram",
    kind: "book",
    book: { label: "Follow on Instagram", href: SOCIALS.instagram, external: true },
  },
  tiktok: {
    tag: "tiktok",
    kind: "book",
    book: { label: "Follow on TikTok", href: SOCIALS.tiktok, external: true },
  },
  youtube: {
    tag: "youtube",
    kind: "book",
    book: { label: "Subscribe on YouTube", href: SOCIALS.youtube, external: true },
  },
  facebook: {
    tag: "facebook",
    kind: "book",
    book: { label: "Follow on Facebook", href: SOCIALS.facebook, external: true },
  },
  linkedin: {
    tag: "linkedin",
    kind: "book",
    book: { label: "Logan on LinkedIn", href: SOCIALS.linkedin, external: true },
  },
};

const VALID_TAGS = new Set<ChatCtaTag>(Object.keys(CTA_BY_TAG) as ChatCtaTag[]);

const CTA_MARKER = /<<\s*CTA\s*:\s*([a-z-]+)\s*>>/i;

export function extractCta(reply: string): { reply: string; cta: ChatCta | null } {
  const match = reply.match(CTA_MARKER);
  if (!match) return { reply: reply.trim(), cta: null };

  const tag = match[1].toLowerCase() as ChatCtaTag;
  const cleaned = reply.replace(CTA_MARKER, "").trim();

  if (!VALID_TAGS.has(tag)) {
    return { reply: cleaned, cta: null };
  }

  return { reply: cleaned, cta: CTA_BY_TAG[tag] };
}

export function getCtaByTag(tag: ChatCtaTag): ChatCta {
  return CTA_BY_TAG[tag];
}

export const ALL_CTA_TAGS: ChatCtaTag[] = Object.keys(CTA_BY_TAG) as ChatCtaTag[];
