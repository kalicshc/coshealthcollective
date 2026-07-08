# CoS Health Collective — Project Context

## What this project is

The production website for **Colorado Springs Health Collective** (coshealthcollective.com) — a
clinic run by Logan (PA-C) and Sarah (NP) offering direct primary care, hormone & metabolic
health, urgent care, and (opening Fall 2026) 2.0 ATA hyperbaric oxygen therapy.

Originally ported from a Replit build (`../hormonewebsite`); now a full custom site.

## Architecture

| Layer    | Tech                                  | Host    |
|----------|---------------------------------------|---------|
| Frontend | Next.js 16 + TypeScript + Tailwind v4 | Vercel  |
| Backend  | Spring Boot 3 / Java 17               | Railway |
| Domain   | GoDaddy → Vercel                      | —       |

- Frontend calls backend via `NEXT_PUBLIC_API_URL`
- The `dashboard/` folder is a SEPARATE internal Next.js app (auth-gated, not the public site)

## Key structure

- `src/app/(main)/` — public site pages (homepage flythrough, service pillars, blog, faq, about…)
- `src/app/(no-footer)/` — print/flyer/card pages (noindexed; exported via `scripts/export-print.mjs`)
- `src/app/(kiosk)/` — Critical Window presentation deck + kiosk signup pages (noindexed)
- `src/app/(referral)/` — partner referral landing pages (noindexed)
- `src/lib/clinicFacts.ts` — SINGLE SOURCE OF TRUTH for prices/contact/HBOT facts (see AGENTS.md)
- `src/lib/chatbotKnowledge.ts` + `chatbotContext.ts` — Kali chatbot knowledge & persona
- `src/lib/schema.ts` + `src/components/JsonLd.tsx` — shared JSON-LD builders for page-level
  structured data (Service/MedicalTherapy, FAQPage, BreadcrumbList)
- `src/app/(main)/preview/home/PhotoFlythrough.tsx` — the homepage aurora flythrough engine
  (scroll-driven, rAF-throttled; scenes near the active index are the only mounted layers)
- `public/llms.txt` — AI-search facts file; keep in sync with clinicFacts

## Hard content rules

- **Never call staff "doctor" or "physician"** — Logan is a PA-C, Sarah an NP; copy says
  "provider". Real credential titles and named external MDs/DPTs are exempt. Never use the
  schema.org `Physician` type.
- **HBOT opens Fall 2026** — never frame it as currently operating (waitlist/early-access only).
- **(440) 371-3063 on print cards is Logan's personal line — intentional, don't "fix" it.**
  The clinic line is (719) 824-4716 everywhere else.
- Medical copy stays evidence-neutral: cite real studies, no absolute/cure-like claims.

## Deployment

- Vercel project (production = coshealthcollective.com); `vercel deploy` for previews.
- Full-site review pass completed 2026-07-08 (content accuracy, SEO/structured data,
  performance) — see git history.
