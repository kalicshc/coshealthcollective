// ─── Types ────────────────────────────────────────────────────────────────────

export type GreeneScore = 0 | 1 | 2 | 3;
export type GreeneScores = Partial<Record<number, GreeneScore>>;
export type HormoneType = "progesterone" | "estrogen" | "testosterone";

// ─── Greene Climacteric Scale items ───────────────────────────────────────────

export const GREENE_ITEMS = [
  // Psychological — Progesterone signal (items 1–11)
  { id: 1,  label: "Heart beating quickly or strongly", section: "psychological" as const },
  { id: 2,  label: "Feeling tense or nervous",          section: "psychological" as const },
  { id: 3,  label: "Difficulty in sleeping",            section: "psychological" as const },
  { id: 4,  label: "Excitable",                         section: "psychological" as const },
  { id: 5,  label: "Attacks of anxiety or panic",       section: "psychological" as const },
  { id: 6,  label: "Difficulty in concentrating",       section: "psychological" as const },
  { id: 7,  label: "Feeling tired or lacking in energy",section: "psychological" as const },
  { id: 8,  label: "Loss of interest in most things",   section: "psychological" as const },
  { id: 9,  label: "Feeling unhappy or depressed",      section: "psychological" as const },
  { id: 10, label: "Crying spells",                     section: "psychological" as const },
  { id: 11, label: "Irritability",                      section: "psychological" as const },
  // Physical/Somatic — Estrogen signal (items 12–18)
  { id: 12, label: "Feeling dizzy or faint",            section: "physical" as const },
  { id: 13, label: "Pressure or tightness in head",     section: "physical" as const },
  { id: 14, label: "Parts of body feel numb",           section: "physical" as const },
  { id: 15, label: "Headaches",                         section: "physical" as const },
  { id: 16, label: "Muscle and joint pains",            section: "physical" as const },
  { id: 17, label: "Loss of feeling in hands or feet",  section: "physical" as const },
  { id: 18, label: "Breathing difficulties",            section: "physical" as const },
  // Vasomotor — Estrogen signal (items 19–20)
  { id: 19, label: "Hot flushes",                       section: "vasomotor" as const },
  { id: 20, label: "Sweating at night",                 section: "vasomotor" as const },
  // Sexual — Testosterone signal (item 21)
  { id: 21, label: "Loss of interest in sex",           section: "sexual" as const },
] as const;

// ─── Section definitions ───────────────────────────────────────────────────────

export const GREENE_SECTIONS = [
  {
    key: "section1" as const,
    eyebrow: "Section 1 of 3",
    title: "Psychological Symptoms",
    description: "Rate how much each has been bothering you recently.",
    hormone: "Progesterone" as const,
    itemIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    key: "section2" as const,
    eyebrow: "Section 2 of 3",
    title: "Physical Symptoms",
    description: "Rate how much each has been bothering you recently.",
    hormone: "Estrogen" as const,
    itemIds: [12, 13, 14, 15, 16, 17, 18],
  },
  {
    key: "section3" as const,
    eyebrow: "Section 3 of 3",
    title: "Vasomotor & Sexual Symptoms",
    description: "Rate how much each has been bothering you recently.",
    hormone: "Estrogen + Testosterone" as const,
    itemIds: [19, 20, 21],
  },
] as const;

export type SectionKey = "section1" | "section2" | "section3";

export const SECTION_IDS: Record<SectionKey, readonly number[]> = {
  section1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  section2: [12, 13, 14, 15, 16, 17, 18],
  section3: [19, 20, 21],
};

// ─── Hormone attribution weights ──────────────────────────────────────────────
// Each item distributes its severity across all three hormones via a weight
// vector that sums to 1.0.
//
// Calibration: literature-anchored on H-confidence items (palpitations, sleep,
// anxiety, depression, headaches, joint pain, hot flushes, night sweats, libido)
// per NAMS 2022, IMS 2019 (Davis), Wright 2024 (musculoskeletal syndrome),
// Schmidt/Joffe (perimenopausal depression), MacGregor 2018 (estrogen-withdrawal
// migraine). M/L-confidence items (excitable, fatigue, anhedonia, breathing,
// crying, irritability) carry a slight clinical lean within the literature's
// ambiguity range — clinical owner can adjust those rows.

type HormoneWeights = { progesterone: number; estrogen: number; testosterone: number };

export const HORMONE_WEIGHT_MATRIX: Record<number, HormoneWeights> = {
  // Section 1 — Psychological
  1:  { progesterone: 0.10, estrogen: 0.85, testosterone: 0.05 }, // palpitations — H (estrogen autonomic)
  2:  { progesterone: 0.50, estrogen: 0.40, testosterone: 0.10 }, // tense/nervous — M (P-GABA + E-serotonin)
  3:  { progesterone: 0.55, estrogen: 0.35, testosterone: 0.10 }, // sleep — H (micronized prog RCTs)
  4:  { progesterone: 0.50, estrogen: 0.40, testosterone: 0.10 }, // excitable — L (clinical lean P)
  5:  { progesterone: 0.50, estrogen: 0.40, testosterone: 0.10 }, // anxiety/panic — H (P-GABA strongest)
  6:  { progesterone: 0.20, estrogen: 0.70, testosterone: 0.10 }, // concentration — M (Maki 2019, brain fog estrogen)
  7:  { progesterone: 0.40, estrogen: 0.45, testosterone: 0.15 }, // fatigue — L (E primary, sleep-via-P, IMS rejects T)
  8:  { progesterone: 0.30, estrogen: 0.55, testosterone: 0.15 }, // anhedonia — L (E primary)
  9:  { progesterone: 0.20, estrogen: 0.70, testosterone: 0.10 }, // depression — H (transdermal E2 antidepressant)
  10: { progesterone: 0.40, estrogen: 0.50, testosterone: 0.10 }, // crying — M (E-serotonin + P-withdrawal)
  11: { progesterone: 0.40, estrogen: 0.50, testosterone: 0.10 }, // irritability — M
  // Section 2 — Physical / somatic
  12: { progesterone: 0.10, estrogen: 0.85, testosterone: 0.05 }, // dizziness — M
  13: { progesterone: 0.15, estrogen: 0.80, testosterone: 0.05 }, // head pressure — M
  14: { progesterone: 0.10, estrogen: 0.85, testosterone: 0.05 }, // numbness — M (E paresthesia)
  15: { progesterone: 0.10, estrogen: 0.85, testosterone: 0.05 }, // headaches — H (estrogen-withdrawal migraine)
  16: { progesterone: 0.05, estrogen: 0.90, testosterone: 0.05 }, // joint pain — H (Wright 2024 MSK syndrome)
  17: { progesterone: 0.10, estrogen: 0.85, testosterone: 0.05 }, // hand/foot numbness — M
  18: { progesterone: 0.35, estrogen: 0.55, testosterone: 0.10 }, // breathing — L (anxiety-driven)
  // Section 3 — Vasomotor + Sexual
  19: { progesterone: 0.05, estrogen: 0.92, testosterone: 0.03 }, // hot flushes — H
  20: { progesterone: 0.10, estrogen: 0.87, testosterone: 0.03 }, // night sweats — H
  21: { progesterone: 0.10, estrogen: 0.40, testosterone: 0.50 }, // libido — H (T for HSDD; E for GSM)
};

// Validate weight matrix at module load (rows must sum to ~1.0)
for (const [id, w] of Object.entries(HORMONE_WEIGHT_MATRIX)) {
  const sum = w.progesterone + w.estrogen + w.testosterone;
  if (Math.abs(sum - 1) > 0.001) {
    throw new Error(`HORMONE_WEIGHT_MATRIX row ${id} sums to ${sum}, expected 1.0`);
  }
}

// ─── Result types ─────────────────────────────────────────────────────────────

export type SeverityLevel = "low" | "moderate" | "significant" | "severe";

export type GreeneResult = {
  totalScore: number;
  progesteroneScore: number;
  estrogenScore: number;
  testosteroneScore: number;
  // Attribution shares — sum to 100 (or all 0 if user marked nothing).
  // "Of the hormone-driven symptom load, what share is each hormone responsible for?"
  progesteronePct: number;
  estrogenPct: number;
  testosteronePct: number;
  severity: SeverityLevel;
  severityLabel: string;
  primaryHormone: HormoneType | "combination";
  interpretation: string;
  topSymptoms: Array<{ id: number; label: string; score: GreeneScore }>;
  recommendedLabs: string[];
};

// ─── Scoring ──────────────────────────────────────────────────────────────────

export function scoreGreene(scores: GreeneScores): GreeneResult {
  const get = (id: number): GreeneScore => (scores[id] ?? 0) as GreeneScore;

  // Total raw score stays 0–63 (sum of 21 items × 3 max). Severity thresholds
  // unchanged. Each row of the weight matrix sums to 1.0, so weighted total = raw total.
  const totalScore = GREENE_ITEMS.reduce((sum, item) => sum + get(item.id), 0);

  // Weighted hormone scores — each item's severity gets distributed across
  // all three hormones via its weight vector.
  let progesteroneScore = 0;
  let estrogenScore = 0;
  let testosteroneScore = 0;
  for (const item of GREENE_ITEMS) {
    const score = get(item.id);
    if (score === 0) continue;
    const w = HORMONE_WEIGHT_MATRIX[item.id];
    progesteroneScore += score * w.progesterone;
    estrogenScore += score * w.estrogen;
    testosteroneScore += score * w.testosterone;
  }

  // Attribution shares (sum to 100). Round in a way that preserves exact 100.
  const totalWeighted = progesteroneScore + estrogenScore + testosteroneScore;
  let progesteronePct = 0;
  let estrogenPct = 0;
  let testosteronePct = 0;
  if (totalWeighted > 0) {
    progesteronePct = Math.round((progesteroneScore / totalWeighted) * 100);
    estrogenPct = Math.round((estrogenScore / totalWeighted) * 100);
    testosteronePct = Math.max(0, 100 - progesteronePct - estrogenPct);
  }

  let severity: SeverityLevel;
  let severityLabel: string;
  if (totalScore <= 12) { severity = "low"; severityLabel = "Mild"; }
  else if (totalScore <= 25) { severity = "moderate"; severityLabel = "Moderate"; }
  else if (totalScore <= 40) { severity = "significant"; severityLabel = "Significant"; }
  else { severity = "severe"; severityLabel = "Severe"; }

  // Primary hormone pattern — leader wins only if it's at least 8 percentage
  // points ahead of second place. Otherwise it's a combination pattern.
  // (≥8pt margin reliably distinguishes "lead" from "noise" given integer rounding.)
  let primaryHormone: GreeneResult["primaryHormone"];
  if (totalScore <= 12) {
    primaryHormone = "combination";
  } else {
    const ranked = (
      [
        ["progesterone", progesteronePct],
        ["estrogen", estrogenPct],
        ["testosterone", testosteronePct],
      ] as Array<[HormoneType, number]>
    ).sort((a, b) => b[1] - a[1]);
    primaryHormone = ranked[0][1] - ranked[1][1] >= 8 ? ranked[0][0] : "combination";
  }

  let interpretation: string;
  if (totalScore <= 12) {
    interpretation =
      "Your total score is on the lower end of the Greene scale. The threshold is a guide, not a hard line — questionnaires miss things that labs and a real conversation catch. If something feels off, that's worth taking seriously, and a consult is still the right next step.";
  } else if (primaryHormone === "combination") {
    // List hormones with at least a meaningful share (≥20%) for the copy
    const parts = [
      progesteronePct >= 20 && "progesterone",
      estrogenPct >= 20 && "estrogen",
      testosteronePct >= 20 && "testosterone",
    ].filter(Boolean).join(", ");
    interpretation = `Your symptoms point to a combination pattern involving ${parts || "multiple hormones"}. This is common — hormones work as a system, not in isolation. A personalized plan typically addresses the dominant driver first while keeping the full picture in view.`;
  } else if (primaryHormone === "progesterone") {
    interpretation =
      "Your symptoms lean toward progesterone. Often the first hormone to become erratic in perimenopause, its loss is most strongly tied to sleep disruption and anxiety via its calming effect on the nervous system. Oral micronized progesterone directly addresses sleep architecture and anxiety, and is typically well-tolerated.";
  } else if (primaryHormone === "estrogen") {
    interpretation =
      "Your symptoms lean toward estrogen. Estrogen loss drives the widest range of symptoms — hot flashes, night sweats, joint pain, brain fog, mood, and headaches — and carries long-term effects on cardiovascular and bone health. Estradiol replacement (typically transdermal patch, gel, or spray) is the most evidence-based approach for this pattern.";
  } else {
    interpretation =
      "Your symptoms lean toward testosterone — the hormone most overlooked in women's care. Testosterone is the only evidence-based therapy for low libido / decreased sexual interest in women, and declines gradually with age and sharply after surgical menopause. We can measure it directly with a simple blood test before deciding whether to add anything.";
  }

  // Top symptoms (scored ≥2), sorted highest first
  const topSymptoms = [...GREENE_ITEMS]
    .map(item => ({ id: item.id, label: item.label, score: get(item.id) }))
    .filter(s => s.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  // Lab recommendations
  const labs = new Set<string>(["Estradiol (E2)", "FSH"]);
  if (progesteronePct >= 25) labs.add("Progesterone (day 21 if cycling)");
  labs.add("Total testosterone");
  labs.add("Free testosterone");
  labs.add("SHBG");
  labs.add("TSH + free T3/T4");
  if (totalScore > 20) {
    labs.add("Lipid panel");
    labs.add("Vitamin D");
  }
  labs.add("CBC");
  labs.add("CMP");

  return {
    totalScore,
    progesteroneScore,
    estrogenScore,
    testosteroneScore,
    progesteronePct,
    estrogenPct,
    testosteronePct,
    severity,
    severityLabel,
    primaryHormone,
    interpretation,
    topSymptoms,
    recommendedLabs: [...labs],
  };
}

// ─── Hormone education content ────────────────────────────────────────────────

export const HORMONE_INFO: Record<HormoneType, { name: string; role: string; therapy: string }> = {
  progesterone: {
    name: "Progesterone",
    role: "The calming hormone. Regulates mood, sleep architecture, and the nervous system. Often the first to become erratic in perimenopause.",
    therapy:
      "Oral micronized progesterone (Prometrium) has a natural calming effect and improves sleep quality. It addresses anxiety, irritability, and mood instability directly — in ways that antidepressants and sleep aids cannot fully replicate.",
  },
  estrogen: {
    name: "Estradiol (Estrogen)",
    role: "The broad-spectrum hormone. Affects nearly every tissue — brain, heart, bone, joints, vaginal and urinary tract, and skin.",
    therapy:
      "Estradiol via patch, gel, or spray addresses hot flashes, night sweats, joint pain, and brain fog while protecting cardiovascular and bone health long-term. Transdermal routes bypass liver metabolism and are preferred for most women. The evidence base is strong.",
  },
  testosterone: {
    name: "Testosterone",
    role: "The drive hormone. Controls libido, sexual sensation, motivation, and sustained energy. Declines gradually with age — and sharply after surgical menopause.",
    therapy:
      "Decreased libido has many contributing factors — relationship dynamics, stress, sleep, mood, and other hormone imbalances all play a role. We'll work through those first. That said, testosterone deficiency is a real and measurable cause, and if it's part of the picture, low-dose testosterone cream is a well-supported option. We can test for it and know for certain before adding anything.",
  },
};

// ─── Booking URL ──────────────────────────────────────────────────────────────

export const WOMENS_BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";
