# CoS Health Collective — Project Context

## What this project is

A rewrite of a hormone/telehealth clinic website originally built in Replit (`../hormonewebsite`).
The new version lives here in `coshealthcollective` and is built to be deployed on Vercel with a
Spring Boot backend on Railway.

## Architecture

| Layer    | Tech                          | Host    |
|----------|-------------------------------|---------|
| Frontend | Next.js 16 + TypeScript + Tailwind v4 | Vercel  |
| Backend  | Spring Boot 3 / Java 17       | Railway |
| Domain   | GoDaddy → Vercel              | —       |

- Frontend calls backend via `NEXT_PUBLIC_API_URL`
- Backend handles form submissions, any admin routes, CORS configured via env var

## Source site to port from (`../hormonewebsite`)

Brand name: **Vitality Clinic** (may be renamed to something CoS Health Collective-related — confirm with user)

### Pages
| Route | Content |
|---|---|
| `/` | Hero, stats bar (500+ patients, 98% satisfaction, 3-day Rx, 100% telehealth), 3 service cards, How It Works (4 steps), CTA banner |
| `/mens-health` | Hero, symptoms grid (8 items), treatment options (5 cards), CTA |
| `/womens-health` | Hero, symptoms grid (8 items), treatment options (5 cards), CTA |
| `/glp1` | Hero, benefits grid (4 cards), medications (Semaglutide + Tirzepatide), FAQ (4 items), CTA |
| `/get-started` | Hero, patient intake form, trust indicators (HIPAA, board-certified, telehealth) |

### Components
- `Navbar` — sticky, desktop + mobile hamburger, `"use client"`
- `Footer` — services links, get started links, legal disclaimer
- `IntakeForm` — full patient intake form, controlled state, `"use client"`
  - Fields: firstName, lastName, email, phone, dateOfBirth, sex, serviceInterest, primaryConcerns, currentMedications, heardAboutUs, consentToContact
  - POSTs to `NEXT_PUBLIC_API_URL/api/intake` — falls back to console.log if env var not set

### Color scheme (source)
- Primary: teal (teal-600 / teal-500)
- Men's Health: blue (blue-600 / blue-900)
- Women's Health: rose (rose-500 / rose-900)
- GLP-1: teal
- Dark hero gradients: `from-gray-900 via-teal-950 to-gray-900`

## Current project state (`coshealthcollective`)

- Fresh Create Next App scaffold — only default files exist
- Tailwind v4 setup: uses `@import "tailwindcss"` and `@theme inline` in `globals.css` (no `tailwind.config.ts`)
- Font: Geist Sans + Geist Mono (not Inter like the source)
- `src/app/layout.tsx` and `src/app/page.tsx` are placeholder defaults — need to be replaced

## Key tech differences from source

| | Source (`hormonewebsite`) | Destination (`coshealthcollective`) |
|---|---|---|
| Tailwind | v3 (`tailwind.config.ts`) | v4 (`@theme` in CSS) |
| Font | Inter | Geist |
| Backend | None (stub) | Spring Boot 3 on Railway |

## Tailwind v4 notes

- No `tailwind.config.ts` — configure via `@theme` in `globals.css`
- Import: `@import "tailwindcss"` at top of CSS
- Custom colors/tokens go in `@theme { }` block
- Utility class names are largely the same as v3

## Questions still outstanding (confirm with user before writing)

1. Brand name — keep "Vitality Clinic" or rename for CoS Health Collective?
2. Any content changes to pages/services?
3. Backend Spring Boot repo — separate repo or monorepo subfolder?
4. User is ready to provide code to use as reference (they said "ill tell you the code I want you to use")

## Deployment plan (from ai-babysitter-bundle guide)

1. Frontend repo → Vercel (this repo)
2. Backend repo → Railway
3. Vercel env vars: `NEXT_PUBLIC_API_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. Railway env vars: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ALLOWED_ORIGINS`, DB vars
5. GoDaddy DNS: A record `@` + CNAME `www` → Vercel targets
