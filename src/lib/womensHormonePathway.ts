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

// ─── Result types ─────────────────────────────────────────────────────────────

export type SeverityLevel = "low" | "moderate" | "significant" | "severe";

export type GreeneResult = {
  totalScore: number;
  progesteroneScore: number;
  estrogenScore: number;
  testosteroneScore: number;
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

  const progesteroneScore = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce((s, id) => s + get(id), 0);
  const estrogenScore = [12, 13, 14, 15, 16, 17, 18, 19, 20].reduce((s, id) => s + get(id), 0);
  const testosteroneScore = get(21);
  const totalScore = progesteroneScore + estrogenScore + testosteroneScore;

  // Max scores: progesterone = 33, estrogen = 27, testosterone = 3
  const progesteronePct = Math.round((progesteroneScore / 33) * 100);
  const estrogenPct = Math.round((estrogenScore / 27) * 100);
  const testosteronePct = Math.round((testosteroneScore / 3) * 100);

  let severity: SeverityLevel;
  let severityLabel: string;
  if (totalScore <= 12) { severity = "low"; severityLabel = "Mild"; }
  else if (totalScore <= 25) { severity = "moderate"; severityLabel = "Moderate"; }
  else if (totalScore <= 40) { severity = "significant"; severityLabel = "Significant"; }
  else { severity = "severe"; severityLabel = "Severe"; }

  // Primary hormone pattern — "significant" if ≥33% of subscale max
  const progSig = progesteronePct >= 33;
  const estrSig = estrogenPct >= 33;
  const testSig = testosteronePct >= 33;
  const sigCount = [progSig, estrSig, testSig].filter(Boolean).length;

  let primaryHormone: GreeneResult["primaryHormone"];
  if (totalScore <= 12) {
    primaryHormone = "combination";
  } else if (sigCount >= 2) {
    primaryHormone = "combination";
  } else if (progesteronePct >= estrogenPct && progesteronePct >= testosteronePct) {
    primaryHormone = "progesterone";
  } else if (estrogenPct >= testosteronePct) {
    primaryHormone = "estrogen";
  } else {
    primaryHormone = "testosterone";
  }

  let interpretation: string;
  if (totalScore <= 12) {
    interpretation =
      "Your total score is on the lower end of the Greene scale. The threshold is a guide, not a hard line — questionnaires miss things that labs and a real conversation catch. If something feels off, that's worth taking seriously, and a consult is still the right next step.";
  } else if (primaryHormone === "combination") {
    const parts = [
      progSig && "progesterone",
      estrSig && "estrogen",
      testSig && "testosterone",
    ].filter(Boolean).join(", ");
    interpretation = `Your symptoms point to a combination pattern involving ${parts || "multiple hormones"}. This is common — hormones work as a system, not in isolation. A personalized plan typically addresses the dominant driver first while keeping the full picture in view.`;
  } else if (primaryHormone === "progesterone") {
    interpretation =
      "Your symptoms point most strongly toward progesterone. Often the first hormone to become erratic in perimenopause, its loss drives anxiety, sleep disruption, irritability, and mood instability. Oral micronized progesterone directly addresses this cluster and is typically well-tolerated.";
  } else if (primaryHormone === "estrogen") {
    interpretation =
      "Your symptoms point most strongly toward estrogen deficiency. Estrogen loss drives the widest range of symptoms — hot flashes, night sweats, joint pain, brain fog — and carries real long-term effects on cardiovascular and bone health. Estradiol replacement, particularly via a transdermal route, is the most evidence-based approach for this pattern.";
  } else {
    interpretation =
      "Your most prominent signal is testosterone — the hormone most overlooked in women's care. Testosterone affects libido, sexual sensation, motivation, and sustained energy. It declines gradually with age and sharply after surgical menopause. Testosterone therapy for women has a solid evidence base and is rarely discussed unless you ask.";
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
