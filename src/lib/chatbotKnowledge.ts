/**
 * Structured knowledge base for the website chatbot (Kali).
 *
 * This file holds the QUALITATIVE info — what's in a visit, who a service
 * is for, what we treat, common questions — organized by service. Prices
 * and contact details come from `clinicFacts.ts` (the quantitative source
 * of truth) and are interpolated below so a price change in one file
 * propagates everywhere.
 *
 * To add a new fact about a service: add it to the matching section here.
 * To change a price: change it in `clinicFacts.ts`, NOT here.
 *
 * `KNOWLEDGE_BASE` is the rendered prompt block injected into
 * `chatbotContext.ts`. The bot is instructed to draw from it as its
 * primary source of truth before falling back to general knowledge.
 */

import { clinicFacts, usd } from "@/lib/clinicFacts";

const { contact, dpc, urgentCare, hormone, hbot } = clinicFacts;

export const KNOWLEDGE_BASE = `
# Team

CSHC has two founder-providers — both are co-owners.

- **Sarah Crist (MSN, APRN, FNP-C, AGACNP-BC)** — Family Nurse Practitioner. Internal medicine focus. Colorado State University Pueblo grad; 9 years nursing experience, 5 years as a board-certified family NP.
- **Logan Crist (PA-C)** — Physician Assistant. University of Dayton grad; 9 years clinical experience across emergency medicine, internal medicine, and urgent care.

When a visitor asks "who would I see?" — it's Sarah or Logan, depending on what the visit is for.

# Modalities (how visits work)

Three options, mix and match per visit:
- **In-office** at the Colorado Springs clinic
- **Telehealth** (video or phone)
- **In-home** anywhere in the Colorado Springs area — common for urgent care

---

# Direct Primary Care (DPC)

Membership-based primary care. Flat monthly fee, unlimited visits, no copays, no surprise bills, no insurance hassles.

**Pricing**
- Individual: ${usd(dpc.individualMonthly)}/month
- Couples (2 adults, same household): ${usd(dpc.couplesMonthly)}/month
- Add ${usd(dpc.childAddOnMonthly)}/month per child over age ${dpc.childAgeMin}
- One-time ${usd(dpc.registrationFee)} household registration fee for new members
- No contracts — cancel anytime

**What's included**
- Unlimited office, telehealth, and in-home visits
- Direct text/call/video access to Sarah or Logan — no phone trees, no nurse triage
- Same-day or next-day appointments for most concerns
- Annual physicals, preventive care, chronic-condition management (diabetes, hypertension, thyroid, anxiety, ADHD, more)
- Care coordination with specialists and hospitals
- Labs and prescriptions at or near wholesale cost (often cheaper than insurance copays)
- Discounted access to in-clinic IV therapy, prescription skin care, wellness coaching, office procedures, precision medicine

**What DPC is NOT**
DPC is not insurance. It doesn't cover specialist visits, hospitalization, surgery, or ER. Many DPC members pair it with a high-deductible health plan, catastrophic plan, or health-sharing ministry to stay covered for the big stuff while keeping primary-care costs predictable.

**Common visitor questions**
- "Do you take insurance?" — No. DPC is cash-pay membership. That structure is what makes the no-copays and unlimited-visits piece work.
- "How fast can I get in?" — Same or next day for most things.
- "Can you handle my chronic conditions?" — Yes. Longer visits and direct provider access make chronic-condition management one of the strongest parts of DPC.
- "What about telehealth?" — Yes, included at no extra cost. Plus in-office and in-home.

**First step:** free Meet & Greet with Sarah or Logan — no commitment, no paperwork. Use the \`dpc\` CTA when a visitor wants to take the next step.

---

# Urgent Care (no membership required)

For acute, non-emergency issues. Anyone can book — DPC members get it free.

**Pricing**
- Telehealth: ${usd(urgentCare.telehealth)}
- In-person or in-home: ${usd(urgentCare.inPerson)}
- Free for DPC members

**What we treat**
- Skin & wounds: lacerations (stitches, glue, dressing), minor burns, rashes, abscesses, tick bites, mild allergic reactions
- Infections: UTIs, sinus infections, ear/throat infections, cold/flu/COVID/RSV, pink eye
- Pain: sprains, muscle strain, migraines, back pain
- GI: nausea, vomiting, diarrhea, mild dehydration (IV fluids available)
- Other: medication refills (non-controlled), work notes, simple physicals

**Go to the ER (NOT us) for:**
Chest pain, severe shortness of breath, stroke symptoms, heavy bleeding, deep/gaping wounds, major trauma or broken bones, severe allergic reactions / anaphylaxis, loss of consciousness. If a visitor describes any of these, tell them to call 911 or go to the ER. Don't soften it.

CTA: \`urgent\`.

---

# Hormone & Metabolic Care

Three branches. Pricing is the SAME across all three — they're variations of the same care model.

**Pricing (women's HRT, men's TRT, and GLP-1 — same for all three)**
- Initial consult: ${usd(hormone.initialConsult)} (one-time, includes labs ordering and a follow-up to review them)
- Ongoing monthly management: ${usd(hormone.monthlyManagement)}/month once established
- Lab costs and medications billed separately (not included)

When someone asks "how much is HRT" or "how much is TRT" or "how much is GLP-1," the answer is the same: ${usd(hormone.initialConsult)} initial consult, then ${usd(hormone.monthlyManagement)}/month for ongoing management.

## Women's Hormone Health (HRT, perimenopause, menopause)

The full hormone picture — estradiol, progesterone, AND testosterone — discussed together. Symptoms across all three categories belong in the conversation:
- **Brain/mood:** brain fog, sleep disruption, anxiety, feeling flat, irritability, attention issues
- **Body:** joint pain, fatigue, weight changes, muscle loss, slower recovery, hot flashes
- **Sexual/urinary:** low libido, dryness, pain with sex, recurrent UTIs, bladder irritation

Plans match stage of life — perimenopause is chaotic and hormone-swingy; post-menopause is a different baseline.

There's a free symptom quiz — no email required until the end. Use the \`hormone-womens-quiz\` CTA when it fits ("I've been having hot flashes," "could this be perimenopause," "I'm in my 40s and something's off," etc.).

## Men's Hormone Health & TRT

Comprehensive eval BEFORE deciding on TRT. Sometimes the answer isn't TRT at all — elevated estradiol, high SHBG, sleep apnea, thyroid dysfunction, or metabolic issues are common drivers of "low T" symptoms.

Full panel reviewed: total + free testosterone, SHBG, estradiol, LH, FSH, DHEA-S, thyroid, more. Fertility-aware — exogenous testosterone suppresses natural production, which matters if someone wants kids now or later.

Common reasons men start: fatigue, low libido, poor recovery, brain fog, strength loss, weight gain, low motivation, mood changes.

Free quiz available — no email required: \`hormone-mens-quiz\` CTA.

## GLP-1 Metabolic Care

Semaglutide (Ozempic / Wegovy) and tirzepatide (Mounjaro / Zepbound) for weight management. Metabolic review FIRST — thyroid, insulin resistance, cortisol patterns, hormone status — before any prescription. Body composition tracked through treatment because losing the wrong weight (muscle) isn't a win.

**Semaglutide** — most studied long-term. **Tirzepatide** — stronger weight loss on average in head-to-head trials.

**Not a fit if:**
- Active pancreatitis or personal/family history of MEN2 or medullary thyroid cancer
- Pregnancy or planning to become pregnant
- Severe kidney disease or certain GI conditions
- Looking for weight loss without engaging in lifestyle changes

CTA: \`glp1\` for the GLP-1 page, or \`hormone\` for general hormone consult booking.

---

# Hyperbaric Oxygen Therapy (HBOT)

Opening ${hbot.openingDate} at ${hbot.pressure} — currently a waitlist with a ${hbot.earlyAccessDiscountPercent}% early-access discount locked in for waitlist members.

**Why ${hbot.pressure} matters:** Most local providers run 1.3–1.6 ATA. The published clinical evidence on HBOT — wound healing, anti-inflammation, telomere lengthening, neurological recovery — was built at ${hbot.pressure}. CSHC will be the only accessible ${hbot.pressure} chamber in Colorado Springs outside of UC Health.

**Conditions with published evidence at clinical pressures** (don't overstate — these are areas of active research):
- Wound healing & surgical recovery (post-mastectomy, aesthetic surgery, skin grafts) — FDA-approved indication
- Anti-aging & longevity (senescent cell reduction, telomere lengthening)
- Autoimmune & inflammation (ulcerative colitis, RA, psoriasis)
- Muscle, tendon & athletic recovery
- Chronic pain & fibromyalgia
- Long COVID (microvascular damage, neuroinflammation)
- Brain & neurological recovery (stroke, TBI, concussion — even years after injury)
- Sudden sensorineural hearing loss — guideline-endorsed, time-sensitive

**Pricing:** Not announced yet. Waitlist signup secures the ${hbot.earlyAccessDiscountPercent}% early-access discount with no commitment and no payment up front.

CTA: \`hbot\` for the waitlist signup, \`hbot-evidence\` for the published research, \`hbot-why-2ata\` for the pressure deep-dive.

---

# Vision & philosophy

CSHC started with DPC because it was the fastest way to deliver primary care built around people, not billing codes. The longer plan: a full health campus where primary care, hormone optimization, and hyperbaric recovery work together under one roof — coordinated, affordable, and built for people who want to age well.

# Contact

- Phone / text: ${contact.phone}
- Email: ${contact.email}
- Site: ${contact.siteUrl}
`;
