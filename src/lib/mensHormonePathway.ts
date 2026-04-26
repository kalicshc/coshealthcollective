// ─── Types ────────────────────────────────────────────────────────────────────

export type MensPathwayAnswerValue = string | number | boolean | string[] | undefined;
export type MensPathwayAnswers = Record<string, MensPathwayAnswerValue>;
export type ConditionOperator = "eq" | "neq" | "includes" | "includesAny" | "truthy" | "falsy";

export type QuestionCondition = {
  field: string;
  op: ConditionOperator;
  value?: string | number | boolean | string[];
};

export type QuestionShowIf = {
  all?: QuestionCondition[];
  any?: QuestionCondition[];
};

export type QuestionOption = {
  value: string;
  label: string;
  helper?: string;
};

export type MensHormoneQuestion = {
  id: string;
  tier: 1 | 2;
  prompt: string;
  description?: string;
  type: "single" | "multi" | "number";
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  showIf?: QuestionShowIf;
};

export type CauseCategory =
  | "primary_hypogonadism"
  | "secondary_hypogonadism"
  | "non_hormonal"
  | "trt_optimization";

export type PersonalizedCause = {
  id: string;
  category: CauseCategory;
  categoryLabel: string;
  title: string;
  triggerText: string;
  explanation: string;
  reversible: boolean | "partial";
};

export type ResultCategory = {
  id: CauseCategory;
  label: string;
  tagline: string;
  causes: PersonalizedCause[];
};

export type ResultBucketId =
  | "possible_primary"
  | "possible_secondary"
  | "possible_trt_optimization"
  | "fertility_first"
  | "possible_mixed";

export type PathwayResult = {
  leadBucket: ResultBucketId;
  supportingBuckets: ResultBucketId[];
  bucketScores: Record<ResultBucketId, number>;
  symptomLabels: string[];
  categories: ResultCategory[];
  allCauses: PersonalizedCause[];
  recommendedLabs: string[];
  treatmentDiscussionAreas: string[];
  ctaKeys: string[];
};

// ─── CTAs ─────────────────────────────────────────────────────────────────────

export const mensHormoneCtas = {
  scheduleConsult: {
    label: "Schedule a consult",
    href: "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266",
  },
  comprehensiveTesting: {
    label: "Talk with us about comprehensive hormone testing",
    href: "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266",
  },
  fertilityOptions: {
    label: "Talk with us about fertility-preserving options",
    href: "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266",
  },
  glp1Support: {
    label: "Ask about weight-loss / GLP-1 support",
    href: "/hormone/glp1",
  },
} as const;

// ─── Question Bank ─────────────────────────────────────────────────────────────

export const mensHormoneQuestionBank: MensHormoneQuestion[] = [
  // ── TIER 1: Always shown ───────────────────────────────────────────────────

  {
    id: "age_range",
    tier: 1,
    prompt: "How old are you?",
    type: "single",
    options: [
      { value: "18_29", label: "18–29" },
      { value: "30_39", label: "30–39" },
      { value: "40_49", label: "40–49" },
      { value: "50_59", label: "50–59" },
      { value: "60_plus", label: "60+" },
    ],
  },

  {
    id: "main_symptoms",
    tier: 1,
    prompt: "What's been bothering you most?",
    description: "Select everything that fits — even if you're not sure it's hormonal.",
    type: "multi",
    options: [
      { value: "low_libido", label: "Low sex drive" },
      { value: "fewer_morning_erections", label: "Fewer morning erections" },
      { value: "erection_quality", label: "Erection quality concerns" },
      { value: "fatigue", label: "Fatigue or low energy" },
      { value: "brain_fog", label: "Brain fog or poor focus" },
      { value: "low_motivation", label: "Low motivation or drive" },
      { value: "mood_change", label: "Low mood or irritability" },
      { value: "strength_loss", label: "Strength or muscle loss" },
      { value: "body_fat_gain", label: "More body fat, harder to lose weight" },
      { value: "poor_recovery", label: "Poor recovery from exercise" },
      { value: "fertility_concern", label: "Fertility concern" },
      { value: "sleep_issues", label: "Sleep issues" },
    ],
  },

  {
    id: "on_hormone_therapy",
    tier: 1,
    prompt: "Are you currently on testosterone or any hormone-related treatment?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },

  {
    id: "fertility_priority",
    tier: 1,
    prompt: "Is preserving or improving fertility important to you?",
    type: "single",
    options: [
      { value: "yes", label: "Yes — it matters now or soon" },
      { value: "unsure", label: "Maybe — I want to keep my options open" },
      { value: "no", label: "No" },
    ],
  },

  {
    id: "weight_category",
    tier: 1,
    prompt: "Which best describes your current body?",
    type: "single",
    options: [
      { value: "lean", label: "Lean or athletic", helper: "Low body fat, roughly BMI under 23" },
      { value: "healthy", label: "Healthy weight", helper: "Feels right for my height, BMI ~23–25" },
      { value: "slightly_over", label: "Slightly over", helper: "Carrying some extra, BMI ~25–29" },
      { value: "overweight", label: "Noticeably over", helper: "Heavier than ideal, BMI ~30–34" },
      { value: "obese", label: "Significantly over a healthy weight", helper: "BMI 35+" },
    ],
  },

  {
    id: "sleep_quality",
    tier: 1,
    prompt: "How's your sleep?",
    type: "single",
    options: [
      { value: "good", label: "Solid 7–9 hours, wake up rested" },
      { value: "fair", label: "OK but not great — light, fragmented, or 5–7 hours" },
      { value: "poor", label: "Poor — under 5 hours or very low quality most nights" },
      { value: "apnea_risk", label: "I've been told I stop breathing or snore loudly at night" },
      { value: "night_shift", label: "Night shifts or severely disrupted schedule" },
    ],
  },

  {
    id: "stress_level",
    tier: 1,
    prompt: "What's your stress level been like over the past 6 months?",
    type: "single",
    options: [
      { value: "low", label: "Low — life feels generally manageable" },
      { value: "moderate", label: "Moderate — some stress, I cope reasonably well" },
      { value: "high", label: "High — chronically stressed, overwhelmed, or burned out" },
      { value: "extreme", label: "Extreme — significant life, work, or personal crisis" },
    ],
  },

  {
    id: "medications_substances",
    tier: 1,
    prompt: "Any medications or substances that could affect hormones?",
    description: "Select all that apply.",
    type: "multi",
    options: [
      { value: "none", label: "None of these" },
      { value: "opioids", label: "Opioid pain medications", helper: "Oxycodone, hydrocodone, morphine, methadone, buprenorphine" },
      { value: "anabolic_steroids", label: "Anabolic steroids or exogenous testosterone", helper: "Including non-prescribed use" },
      { value: "glucocorticoids", label: "Chronic steroids / prednisone / cortisone" },
      { value: "antidepressants", label: "Antidepressants or antipsychotics" },
      { value: "finasteride", label: "Finasteride or dutasteride", helper: "For hair loss or prostate" },
      { value: "heavy_alcohol", label: "Heavy alcohol use", helper: "8+ drinks per week regularly" },
    ],
  },

  // ── TIER 2: Branched ────────────────────────────────────────────────────────

  {
    id: "therapy_type",
    tier: 2,
    prompt: "What treatment are you currently using?",
    description: "Select all that apply.",
    type: "multi",
    showIf: { all: [{ field: "on_hormone_therapy", op: "eq", value: "yes" }] },
    options: [
      { value: "testosterone_injections", label: "Testosterone injections" },
      { value: "testosterone_topical", label: "Testosterone gel or cream" },
      { value: "testosterone_pellets", label: "Pellets" },
      { value: "clomiphene_enclomiphene", label: "Clomiphene / enclomiphene" },
      { value: "hcg", label: "hCG" },
      { value: "other", label: "Other" },
    ],
  },

  {
    id: "therapy_response",
    tier: 2,
    prompt: "How's your current treatment working?",
    description: "Select all that fit.",
    type: "multi",
    showIf: { all: [{ field: "on_hormone_therapy", op: "eq", value: "yes" }] },
    options: [
      { value: "helped", label: "It's helped some" },
      { value: "not_helping", label: "Not helping enough" },
      { value: "wears_off", label: "I feel a wear-off before the next dose" },
      { value: "peaks_troughs", label: "Noticeable peaks and troughs" },
      { value: "libido_still_low", label: "Libido is still low" },
      { value: "energy_still_low", label: "Energy is still low" },
    ],
  },

  {
    id: "therapy_side_effects",
    tier: 2,
    prompt: "Any side effects or concerns on treatment?",
    description: "Select all that fit.",
    type: "multi",
    showIf: { all: [{ field: "on_hormone_therapy", op: "eq", value: "yes" }] },
    options: [
      { value: "none", label: "None of these" },
      { value: "acne", label: "Acne or oily skin" },
      { value: "breast_tenderness", label: "Breast tenderness or puffiness" },
      { value: "mood_swings", label: "Mood swings" },
      { value: "high_hematocrit_history", label: "High hematocrit / thick blood history" },
      { value: "fertility_worry", label: "Worried about fertility impact" },
    ],
  },

  {
    id: "medical_history",
    tier: 2,
    prompt: "Have you been diagnosed with any of the following?",
    description: "Select all that apply.",
    type: "multi",
    showIf: {
      any: [
        {
          field: "main_symptoms",
          op: "includesAny",
          value: [
            "low_libido", "fewer_morning_erections", "erection_quality", "fatigue",
            "brain_fog", "low_motivation", "mood_change", "strength_loss",
            "body_fat_gain", "poor_recovery", "fertility_concern", "sleep_issues",
          ],
        },
        { field: "weight_category", op: "eq", value: "overweight" },
        { field: "weight_category", op: "eq", value: "obese" },
        { field: "weight_category", op: "eq", value: "slightly_over" },
        { field: "sleep_quality", op: "eq", value: "apnea_risk" },
      ],
    },
    options: [
      { value: "none", label: "None of these" },
      { value: "diabetes_prediabetes", label: "Type 2 diabetes or prediabetes" },
      { value: "thyroid", label: "Thyroid condition (hypo or hyperthyroid)" },
      { value: "sleep_apnea", label: "Diagnosed sleep apnea" },
      { value: "depression_anxiety", label: "Depression or anxiety (diagnosed)" },
      { value: "metabolic_syndrome", label: "High blood pressure or high cholesterol" },
    ],
  },

  {
    id: "primary_history",
    tier: 2,
    prompt: "Any history that could affect the testes specifically?",
    description: "Select all that apply.",
    type: "multi",
    showIf: {
      any: [
        {
          field: "main_symptoms",
          op: "includesAny",
          value: [
            "low_libido", "fewer_morning_erections", "erection_quality", "fatigue",
            "brain_fog", "low_motivation", "mood_change", "strength_loss",
            "body_fat_gain", "poor_recovery", "fertility_concern", "sleep_issues",
          ],
        },
      ],
    },
    options: [
      { value: "none", label: "None of these" },
      { value: "testicular_injury", label: "Testicular injury, torsion, or surgery" },
      { value: "orchitis", label: "Mumps orchitis or serious testicular infection" },
      { value: "undescended", label: "Undescended testicle at birth" },
      { value: "chemo_radiation", label: "Chemo or pelvic / testicular radiation" },
      { value: "klinefelter", label: "Klinefelter syndrome or chromosomal condition" },
    ],
  },

  {
    id: "symptom_duration",
    tier: 2,
    prompt: "How long have these symptoms been going on?",
    type: "single",
    showIf: {
      any: [
        { field: "main_symptoms", op: "includesAny", value: ["low_libido", "fatigue", "brain_fog", "mood_change", "strength_loss", "erection_quality", "fewer_morning_erections"] },
      ],
    },
    options: [
      { value: "under_3mo", label: "Less than 3 months", helper: "Recent onset — more likely reversible or functional" },
      { value: "3_12mo", label: "3 to 12 months" },
      { value: "1_3yr", label: "1 to 3 years" },
      { value: "over_3yr", label: "More than 3 years", helper: "Gradual or long-standing — full workup warranted" },
      { value: "gradual", label: "Hard to say — came on slowly over time" },
    ],
  },

  {
    id: "fertility_timeline",
    tier: 2,
    prompt: "When does fertility matter most for you?",
    type: "single",
    showIf: {
      any: [
        { field: "fertility_priority", op: "eq", value: "yes" },
        { field: "fertility_priority", op: "eq", value: "unsure" },
      ],
    },
    options: [
      { value: "now", label: "Now — actively trying" },
      { value: "within_2yr", label: "Within the next 2 years" },
      { value: "someday", label: "Someday — not sure when" },
      { value: "just_options", label: "I just want to keep the option open" },
    ],
  },

  {
    id: "prior_androgen_exposure",
    tier: 2,
    prompt: "Any prior hormone or androgen exposure to be aware of?",
    description: "Select all that apply.",
    type: "multi",
    showIf: {
      any: [
        { field: "fertility_priority", op: "eq", value: "yes" },
        { field: "fertility_priority", op: "eq", value: "unsure" },
        { field: "main_symptoms", op: "includes", value: "fertility_concern" },
      ],
    },
    options: [
      { value: "none", label: "None of these" },
      { value: "prior_trt", label: "Prior TRT" },
      { value: "anabolic_cycles", label: "Prior anabolic steroid cycles" },
      { value: "prior_hcg_serm", label: "Prior hCG or SERM use" },
      { value: "known_infertility", label: "Known infertility history" },
    ],
  },

  {
    id: "glp1_interest",
    tier: 2,
    prompt: "Would you be open to weight-loss / GLP-1 support if it fits your picture?",
    type: "single",
    showIf: {
      any: [
        { field: "weight_category", op: "eq", value: "overweight" },
        { field: "weight_category", op: "eq", value: "obese" },
        { field: "medical_history", op: "includes", value: "diabetes_prediabetes" },
        { field: "medical_history", op: "includes", value: "metabolic_syndrome" },
      ],
    },
    options: [
      { value: "yes", label: "Yes, open to it" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "Not interested" },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getArray(answer: MensPathwayAnswerValue): string[] {
  return Array.isArray(answer) ? answer : [];
}

function getString(answer: MensPathwayAnswerValue): string {
  return typeof answer === "string" ? answer : "";
}

// ─── Question visibility ───────────────────────────────────────────────────────

function evaluateCondition(condition: QuestionCondition, answers: MensPathwayAnswers): boolean {
  const current = answers[condition.field];
  switch (condition.op) {
    case "eq": return current === condition.value;
    case "neq": return current !== condition.value;
    case "includes":
      return Array.isArray(current) && current.includes(String(condition.value));
    case "includesAny":
      return (
        Array.isArray(current) &&
        Array.isArray(condition.value) &&
        condition.value.some((v) => current.includes(String(v)))
      );
    case "truthy": return Boolean(current);
    case "falsy": return !current;
    default: return false;
  }
}

export function shouldShowQuestion(question: MensHormoneQuestion, answers: MensPathwayAnswers): boolean {
  if (!question.showIf) return true;
  const { all, any } = question.showIf;
  const allPass = !all || all.every((c) => evaluateCondition(c, answers));
  const anyPass = !any || any.some((c) => evaluateCondition(c, answers));
  return allPass && anyPass;
}

export function getVisibleMensHormoneQuestions(answers: MensPathwayAnswers): MensHormoneQuestion[] {
  return mensHormoneQuestionBank.filter((q) => shouldShowQuestion(q, answers));
}

// ─── Personalized cause definitions ───────────────────────────────────────────

type CauseDefinition = {
  id: string;
  category: CauseCategory;
  categoryLabel: string;
  title: string;
  getTriggerText: (answers: MensPathwayAnswers) => string;
  explanation: string | ((answers: MensPathwayAnswers) => string);
  reversible: boolean | "partial";
  priority: number;
  check: (answers: MensPathwayAnswers) => boolean;
};

const causeDefinitions: CauseDefinition[] = [
  // ── TRT Optimization ────────────────────────────────────────────────────────
  {
    id: "trt_not_optimized",
    priority: 95,
    check: (a) =>
      getString(a.on_hormone_therapy) === "yes" &&
      getArray(a.therapy_response).some((v) =>
        ["not_helping", "wears_off", "peaks_troughs", "libido_still_low", "energy_still_low"].includes(v),
      ),
    category: "trt_optimization",
    categoryLabel: "TRT Optimization",
    title: "Current treatment may need adjustment",
    getTriggerText: (a) => {
      const r = getArray(a.therapy_response);
      if (r.includes("wears_off")) return "You feel a wear-off before your next dose";
      if (r.includes("peaks_troughs")) return "You notice peaks and troughs on current therapy";
      if (r.includes("libido_still_low")) return "Libido is still low despite being on treatment";
      if (r.includes("energy_still_low")) return "Energy is still low despite being on treatment";
      return "Your current treatment isn't controlling symptoms well enough";
    },
    explanation:
      "More testosterone isn't always the answer. Delivery method, injection frequency, free testosterone vs. total, SHBG balance, and estradiol all determine how therapy actually works. Often the fix is optimizing what you're already on — not increasing the dose.",
    reversible: true,
  },
  {
    id: "trt_estrogen_excess",
    priority: 88,
    check: (a) =>
      getString(a.on_hormone_therapy) === "yes" &&
      getArray(a.therapy_side_effects).some((v) => ["breast_tenderness", "mood_swings"].includes(v)),
    category: "trt_optimization",
    categoryLabel: "TRT Optimization",
    title: "Possible estrogen excess on TRT",
    getTriggerText: (a) => {
      const se = getArray(a.therapy_side_effects);
      if (se.includes("breast_tenderness") && se.includes("mood_swings"))
        return "You reported breast tenderness and mood swings on current therapy";
      if (se.includes("breast_tenderness")) return "You reported breast tenderness or puffiness on current therapy";
      return "You reported mood swings on current therapy";
    },
    explanation:
      "Breast tenderness and mood swings on TRT are classic signs of elevated estradiol. Testosterone aromatizes into estrogen — too much conversion produces these symptoms. This is correctable through dose adjustment, injection frequency changes, or adding an aromatase inhibitor. It warrants checking estradiol before changing anything else.",
    reversible: true,
  },
  {
    id: "trt_hematocrit",
    priority: 87,
    check: (a) =>
      getString(a.on_hormone_therapy) === "yes" &&
      getArray(a.therapy_side_effects).includes("high_hematocrit_history"),
    category: "trt_optimization",
    categoryLabel: "TRT Optimization",
    title: "Elevated hematocrit on TRT",
    getTriggerText: () => "You reported a history of high hematocrit or thick blood on therapy",
    explanation:
      "Testosterone raises red blood cell production. When hematocrit climbs above roughly 54%, blood thickens and clot risk increases. This is manageable — dose reduction, switching delivery method, or therapeutic phlebotomy — but it requires active monitoring and should not be dismissed.",
    reversible: true,
  },

  // ── Primary Hypogonadism ─────────────────────────────────────────────────────
  {
    id: "anabolic_steroids",
    priority: 90,
    check: (a) => getArray(a.medications_substances).includes("anabolic_steroids"),
    category: "primary_hypogonadism",
    categoryLabel: "Primary Hypogonadism",
    title: "Anabolic steroid or exogenous testosterone history",
    getTriggerText: () => "You reported anabolic steroid or exogenous testosterone use",
    explanation:
      "Anabolic steroids shut down the HPG axis — your brain stops sending LH and FSH signals, and your testes stop producing testosterone. Recovery takes 6–24 months after stopping and isn't guaranteed. In some men the axis doesn't fully recover.",
    reversible: "partial",
  },
  {
    id: "testicular_damage",
    priority: 88,
    check: (a) =>
      getArray(a.primary_history).some((v) =>
        ["testicular_injury", "orchitis", "undescended", "chemo_radiation", "klinefelter"].includes(v),
      ),
    category: "primary_hypogonadism",
    categoryLabel: "Primary Hypogonadism",
    title: "Testicular damage or structural history",
    getTriggerText: (a) => {
      const h = getArray(a.primary_history);
      if (h.includes("chemo_radiation")) return "You reported chemotherapy or testicular/pelvic radiation";
      if (h.includes("testicular_injury")) return "You reported testicular injury, torsion, or surgery";
      if (h.includes("orchitis")) return "You reported mumps orchitis or serious testicular infection";
      if (h.includes("undescended")) return "You reported undescended testicle history";
      if (h.includes("klinefelter")) return "You reported Klinefelter syndrome or a chromosomal condition";
      return "You reported history that can directly affect testicular function";
    },
    explanation:
      "Physical damage to the testes limits their ability to produce testosterone even when the brain is sending the correct signals. In this pattern, LH and FSH are typically elevated — the brain is asking for more, but the testes can't respond. Labs confirm this clearly.",
    reversible: false,
  },

  // ── Secondary / Functional Hypogonadism ────────────────────────────────────
  {
    id: "opioid_suppression",
    priority: 87,
    check: (a) => getArray(a.medications_substances).includes("opioids"),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Opioid-induced suppression",
    getTriggerText: () => "You reported opioid pain medication use",
    explanation:
      "Opioids suppress the hormonal signal that starts testosterone production. All opioid classes cause this. Use beyond 6 months leads to significant suppression. It's a pharmacological side effect — not a personal failing — and it needs to be on the table before any hormone treatment begins.",
    reversible: "partial",
  },
  {
    id: "glucocorticoids",
    priority: 85,
    check: (a) => getArray(a.medications_substances).includes("glucocorticoids"),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Glucocorticoid suppression",
    getTriggerText: () => "You reported chronic steroid or prednisone use",
    explanation:
      "Glucocorticoids suppress testosterone at two points: they reduce LH signaling from the brain and directly impair testosterone synthesis in the testes. One of the most under-recognized drug causes of low testosterone.",
    reversible: true,
  },
  {
    id: "sleep_apnea",
    priority: 86,
    check: (a) =>
      getString(a.sleep_quality) === "apnea_risk" ||
      getArray(a.medical_history).includes("sleep_apnea"),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Sleep apnea",
    getTriggerText: (a) =>
      getArray(a.medical_history).includes("sleep_apnea")
        ? "You have a diagnosed sleep apnea"
        : "You've been told you stop breathing or snore loudly during sleep",
    explanation:
      "Testosterone is made primarily during deep sleep. Sleep apnea repeatedly fragments that window — oxygen drops, sleep stages get cut short, and testosterone production suffers. Up to 50% of men with untreated moderate-to-severe sleep apnea have clinically low testosterone. Treating the apnea often improves levels significantly on its own.",
    reversible: true,
  },
  {
    id: "weight_metabolic",
    priority: 82,
    check: (a) => ["slightly_over", "overweight", "obese"].includes(getString(a.weight_category)),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary / Functional Hypogonadism",
    title: "Body weight and metabolic suppression",
    getTriggerText: (a) => {
      const w = getString(a.weight_category);
      if (w === "obese") return "You reported being significantly above a healthy weight";
      if (w === "overweight") return "You reported being noticeably over your ideal weight";
      return "You reported carrying some extra weight";
    },
    explanation:
      "Body fat — especially around the abdomen — contains aromatase, an enzyme that converts testosterone into estrogen. The more fat present, the more testosterone gets converted, and the higher estrogen signals your brain to produce less. Men who lose 10–15% of body weight can see testosterone rise 100–400 ng/dL.",
    reversible: true,
  },
  {
    id: "diabetes_insulin",
    priority: 80,
    check: (a) => getArray(a.medical_history).includes("diabetes_prediabetes"),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Diabetes and insulin resistance",
    getTriggerText: () => "You reported type 2 diabetes or prediabetes",
    explanation:
      "Low testosterone and insulin resistance drive each other — low T worsens insulin resistance, and insulin resistance suppresses testosterone production. This bidirectional relationship is one of the most common and most correctable contributors to low testosterone.",
    reversible: true,
  },
  {
    id: "chronic_stress",
    priority: 72,
    check: (a) => ["moderate", "high", "extreme"].includes(getString(a.stress_level)),
    category: "secondary_hypogonadism",
    categoryLabel: "Functional Hypogonadism",
    title: "Elevated stress and cortisol",
    getTriggerText: (a) => {
      const s = getString(a.stress_level);
      if (s === "extreme") return "You reported extreme or crisis-level stress over the past 6 months";
      if (s === "high") return "You reported feeling chronically stressed, overwhelmed, or burned out";
      return "You reported moderate ongoing stress over the past 6 months";
    },
    explanation:
      "Cortisol directly suppresses testosterone at multiple points in the hormonal chain. Under sustained stress, your body redirects resources away from testosterone production. This is a real physiological effect — not just \"stress\" in the vague sense — and it's worth factoring into the workup.",
    reversible: true,
  },
  {
    id: "heavy_alcohol",
    priority: 65,
    check: (a) => getArray(a.medications_substances).includes("heavy_alcohol"),
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Heavy alcohol use",
    getTriggerText: () => "You reported heavy alcohol use (8+ drinks per week)",
    explanation:
      "Alcohol suppresses testosterone production at the hypothalamus, pituitary, and testes. Chronic heavy use also increases estrogen through aromatase activity. This is a reversible cause — and worth quantifying before attributing symptoms to low testosterone.",
    reversible: true,
  },
  {
    id: "prior_androgen_suppression",
    priority: 84,
    check: (a) =>
      getArray(a.prior_androgen_exposure).some((v) => ["prior_trt", "anabolic_cycles"].includes(v)),
    category: "primary_hypogonadism",
    categoryLabel: "Primary Hypogonadism",
    title: "Prior androgen exposure affecting HPG axis",
    getTriggerText: (a) => {
      const h = getArray(a.prior_androgen_exposure);
      if (h.includes("anabolic_cycles") && h.includes("prior_trt"))
        return "You reported prior TRT and prior anabolic steroid cycles";
      if (h.includes("anabolic_cycles")) return "You reported prior anabolic steroid cycles";
      return "You reported prior testosterone therapy";
    },
    explanation:
      "Prior exogenous testosterone and anabolic steroids suppress LH and FSH production — sometimes for years after stopping. The HPG axis may or may not fully recover. This is particularly relevant if fertility is a concern now. The recovery timeline and current hormonal picture need to be mapped before any treatment decisions are made.",
    reversible: "partial",
  },
  {
    id: "age_primary_decline",
    priority: 83,
    check: (a) => {
      const age = getString(a.age_range);
      const symptoms = getArray(a.main_symptoms);
      // At 60+, age alone is sufficient — testicular decline is a primary contributor regardless of which symptoms present
      if (age === "60_plus") return symptoms.length > 0;
      // At 50-59, any reported symptom qualifies
      return age === "50_59" && symptoms.length > 0;
    },
    category: "primary_hypogonadism",
    categoryLabel: "Primary Hypogonadism",
    title: "Age-related testicular decline",
    getTriggerText: (a) =>
      getString(a.age_range) === "60_plus"
        ? "You are 60+ with symptoms consistent with declining testicular function"
        : "You are in your 50s with symptoms consistent with declining testicular function",
    explanation:
      "After 50, the testes themselves become progressively less responsive to LH signaling — this is a primary contributor, not just a lifestyle issue. Testosterone production at the testicular level declines with age independent of what the brain is doing. This is one of the most common and most undertreated causes of low testosterone in older men.",
    reversible: "partial",
  },
  {
    id: "age_related_decline",
    priority: 60,
    check: (a) => getString(a.age_range) === "40_49" && getArray(a.main_symptoms).length > 0,
    category: "secondary_hypogonadism",
    categoryLabel: "Secondary Hypogonadism",
    title: "Age-related hormonal decline",
    getTriggerText: () => "You are in your 40s with symptoms consistent with early hormonal decline",
    explanation:
      "Testosterone declines roughly 1–2% per year after age 35. In your 40s this compounds alongside rising SHBG, lifestyle changes, and metabolic shifts. The result is often a gradual drift into symptomatic territory that gets dismissed as 'just getting older.' It warrants a proper evaluation.",
    reversible: "partial",
  },

  // ── Non-Hormonal Contributors ────────────────────────────────────────────────
  {
    id: "thyroid_dysfunction",
    priority: 78,
    check: (a) => getArray(a.medical_history).includes("thyroid"),
    category: "non_hormonal",
    categoryLabel: "Non-Hormonal Contributor",
    title: "Thyroid dysfunction",
    getTriggerText: () => "You reported a thyroid condition",
    explanation:
      "Hypothyroidism produces symptoms nearly identical to low testosterone — fatigue, low libido, brain fog, weight gain, low mood. It needs to be ruled out or treated before concluding that testosterone is the primary driver. TSH alone can mislead — a full thyroid panel is required.",
    reversible: true,
  },
  {
    id: "depression_anxiety",
    priority: 70,
    check: (a) =>
      getArray(a.medical_history).includes("depression_anxiety") &&
      getArray(a.main_symptoms).some((v) =>
        ["fatigue", "brain_fog", "low_motivation", "mood_change"].includes(v),
      ),
    category: "non_hormonal",
    categoryLabel: "Non-Hormonal Contributor",
    title: "Depression or anxiety",
    getTriggerText: () => "You reported depression or anxiety alongside mood and energy symptoms",
    explanation:
      "Depression and anxiety share almost every symptom with low testosterone. They can also suppress testosterone indirectly via cortisol. Many men have both simultaneously — and treating one without addressing the other produces incomplete results.",
    reversible: true,
  },
  {
    id: "poor_sleep_non_apnea",
    priority: 63,
    check: (a) =>
      ["fair", "poor", "night_shift"].includes(getString(a.sleep_quality)) &&
      !getArray(a.medical_history).includes("sleep_apnea") &&
      getString(a.sleep_quality) !== "apnea_risk",
    category: "non_hormonal",
    categoryLabel: "Contributing Factor",
    title: "Disrupted or insufficient sleep",
    getTriggerText: (a) => {
      const s = getString(a.sleep_quality);
      if (s === "night_shift") return "You work night shifts or have a severely disrupted sleep schedule";
      if (s === "poor") return "You reported consistently poor sleep — under 5 hours or very low quality";
      return "Your sleep is OK but not great — fragmented or 5–7 hours most nights";
    },
    explanation:
      "Even without sleep apnea, consistently poor or disrupted sleep reduces the nocturnal LH pulses that drive testosterone production. Your fatigue and low energy may be coming primarily from sleep quality — independent of, or compounding, any hormonal issue. This is worth separating before adding hormones.",
    reversible: true,
  },
  {
    id: "antidepressants_finasteride",
    priority: 60,
    check: (a) =>
      getArray(a.medications_substances).some((v) => ["antidepressants", "finasteride"].includes(v)) &&
      getArray(a.main_symptoms).some((v) => ["low_libido", "erection_quality", "mood_change", "brain_fog"].includes(v)),
    category: "non_hormonal",
    categoryLabel: "Medication Effect",
    title: "Medication side effects",
    getTriggerText: (a) => {
      const meds = getArray(a.medications_substances);
      if (meds.includes("finasteride") && meds.includes("antidepressants"))
        return "You reported finasteride and antidepressant use alongside libido or mood symptoms";
      if (meds.includes("finasteride")) return "You reported finasteride or dutasteride use alongside libido symptoms";
      return "You reported antidepressant or antipsychotic use alongside mood or libido symptoms";
    },
    explanation: (a) => {
      const meds = getArray(a.medications_substances);
      const hasFinasteride = meds.includes("finasteride");
      const hasAntidepressants = meds.includes("antidepressants");
      if (hasFinasteride && hasAntidepressants)
        return "Antidepressants (especially SSRIs) commonly reduce libido and sexual function independent of testosterone. Finasteride blocks DHT conversion and can cause persistent sexual and cognitive side effects in some men — including after stopping the drug. Both can cause these symptoms with completely normal testosterone levels.";
      if (hasFinasteride)
        return "Finasteride blocks DHT conversion and can cause persistent sexual and cognitive side effects in some men — including after stopping the drug. These effects can occur even when testosterone levels are completely normal.";
      return "Antidepressants (especially SSRIs) commonly reduce libido and sexual function independent of testosterone. These effects can occur even when testosterone levels are completely normal.";
    },
    reversible: "partial",
  },
];

// ─── Build personalized causes ─────────────────────────────────────────────────

export function buildPersonalizedCauses(answers: MensPathwayAnswers): PersonalizedCause[] {
  return causeDefinitions
    .filter((def) => def.check(answers))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6)
    .map((def) => ({
      id: def.id,
      category: def.category,
      categoryLabel: def.categoryLabel,
      title: def.title,
      triggerText: def.getTriggerText(answers),
      explanation: typeof def.explanation === "function" ? def.explanation(answers) : def.explanation,
      reversible: def.reversible,
    }));
}

// ─── Build result categories ───────────────────────────────────────────────────

const categoryMeta: Record<CauseCategory, { label: string; tagline: string }> = {
  primary_hypogonadism: {
    label: "Primary Hypogonadism",
    tagline: "The testes aren't producing enough testosterone despite the right brain signals",
  },
  secondary_hypogonadism: {
    label: "Secondary / Functional Hypogonadism",
    tagline: "The brain isn't sending strong enough signals — often lifestyle-driven and reversible",
  },
  non_hormonal: {
    label: "Other Contributing Factors",
    tagline: "Conditions that cause the same symptoms as low T — or make it significantly worse",
  },
  trt_optimization: {
    label: "TRT Optimization",
    tagline: "Current treatment may need adjustment rather than simply more therapy",
  },
};

function buildResultCategories(causes: PersonalizedCause[]): ResultCategory[] {
  const byCategory = new Map<CauseCategory, PersonalizedCause[]>();
  for (const cause of causes) {
    const existing = byCategory.get(cause.category) ?? [];
    byCategory.set(cause.category, [...existing, cause]);
  }
  const order: CauseCategory[] = ["trt_optimization", "primary_hypogonadism", "secondary_hypogonadism", "non_hormonal"];
  return order
    .filter((cat) => byCategory.has(cat))
    .map((cat) => ({
      id: cat,
      label: categoryMeta[cat].label,
      tagline: categoryMeta[cat].tagline,
      causes: byCategory.get(cat)!,
    }));
}

// ─── Lab recommendations ───────────────────────────────────────────────────────

const labsByCategory: Record<CauseCategory, string[]> = {
  primary_hypogonadism: [
    "Total testosterone (AM)",
    "Free testosterone",
    "SHBG",
    "LH / FSH",
    "Estradiol",
    "Prolactin",
    "CBC",
    "CMP",
  ],
  secondary_hypogonadism: [
    "Total testosterone (AM)",
    "Free testosterone",
    "SHBG",
    "LH / FSH",
    "Estradiol",
    "TSH + free T3/T4",
    "HbA1c + fasting glucose",
    "CBC",
    "CMP",
  ],
  non_hormonal: [
    "Total testosterone (AM)",
    "Free testosterone",
    "SHBG",
    "TSH + free T3/T4",
    "Estradiol",
    "Prolactin",
    "HbA1c + fasting glucose",
    "CBC",
    "CMP",
    "Vitamin D",
  ],
  trt_optimization: [
    "Total testosterone (AM)",
    "Free testosterone",
    "SHBG",
    "Estradiol",
    "CBC",
    "PSA (if age 40+)",
    "CMP",
  ],
};

function getRecommendedLabs(causes: PersonalizedCause[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  const categoriesToCheck =
    causes.length > 0
      ? [...new Set(causes.map((c) => c.category))]
      : (["secondary_hypogonadism"] as CauseCategory[]);

  for (const cat of categoriesToCheck) {
    for (const lab of labsByCategory[cat]) {
      if (!seen.has(lab)) {
        seen.add(lab);
        result.push(lab);
      }
    }
  }
  return result;
}

// ─── Bucket scoring (legacy, kept for routing logic) ──────────────────────────

function computeBucketScores(answers: MensPathwayAnswers): Record<ResultBucketId, number> {
  const scores: Record<ResultBucketId, number> = {
    possible_primary: 0,
    possible_secondary: 0,
    possible_trt_optimization: 0,
    fertility_first: 0,
    possible_mixed: 0,
  };

  const symptoms = getArray(answers.main_symptoms);
  const primaryHistory = getArray(answers.primary_history);
  const meds = getArray(answers.medications_substances);
  const medicalHistory = getArray(answers.medical_history);
  const therapyResponse = getArray(answers.therapy_response);
  const therapySideEffects = getArray(answers.therapy_side_effects);
  const sleepQuality = getString(answers.sleep_quality);

  if (getString(answers.on_hormone_therapy) === "yes") scores.possible_trt_optimization += 5;
  if (therapyResponse.some((v) => ["not_helping", "wears_off", "peaks_troughs", "libido_still_low", "energy_still_low"].includes(v)))
    scores.possible_trt_optimization += 3;
  if (therapySideEffects.some((v) => ["breast_tenderness", "mood_swings", "high_hematocrit_history", "fertility_worry"].includes(v)))
    scores.possible_trt_optimization += 2;

  if (["yes", "unsure"].includes(getString(answers.fertility_priority))) scores.fertility_first += 5;

  if (primaryHistory.some((v) => v !== "none")) scores.possible_primary += 5;
  if (meds.includes("anabolic_steroids")) scores.possible_primary += 3;
  if (symptoms.some((v) => ["low_libido", "fewer_morning_erections", "strength_loss", "fertility_concern"].includes(v)))
    scores.possible_primary += 1;

  if (["overweight", "obese"].includes(getString(answers.weight_category))) scores.possible_secondary += 3;
  if (getString(answers.weight_category) === "slightly_over") scores.possible_secondary += 1;
  if (["apnea_risk", "poor", "night_shift"].includes(sleepQuality)) scores.possible_secondary += 2;
  if (medicalHistory.includes("sleep_apnea")) scores.possible_secondary += 2;
  if (medicalHistory.includes("diabetes_prediabetes")) scores.possible_secondary += 2;
  if (meds.some((v) => ["opioids", "glucocorticoids"].includes(v))) {
    scores.possible_secondary += 3;
    scores.possible_mixed += 1;
  }
  if (["high", "extreme"].includes(getString(answers.stress_level))) scores.possible_secondary += 2;
  if (medicalHistory.includes("thyroid") || medicalHistory.includes("depression_anxiety")) scores.possible_mixed += 3;

  const sexualSymptomCount = symptoms.filter((v) => ["low_libido", "fewer_morning_erections", "erection_quality"].includes(v)).length;
  const fatigueDominant =
    symptoms.some((v) => ["fatigue", "brain_fog", "low_motivation", "mood_change"].includes(v)) &&
    sexualSymptomCount === 0;
  if (fatigueDominant) scores.possible_mixed += 3;

  return scores;
}

// ─── Main evaluation ───────────────────────────────────────────────────────────

export function evaluateMensHormonePathway(answers: MensPathwayAnswers): PathwayResult {
  const bucketScores = computeBucketScores(answers);
  const symptoms = getArray(answers.main_symptoms);

  const rankedBuckets = (Object.entries(bucketScores) as [ResultBucketId, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([bucket]) => bucket);

  const positiveBuckets = rankedBuckets.filter((b) => bucketScores[b] > 0);
  const leadBucket: ResultBucketId =
    positiveBuckets[0] ??
    (symptoms.some((v) => ["low_libido", "fewer_morning_erections", "erection_quality", "strength_loss"].includes(v))
      ? "possible_primary"
      : "possible_mixed");

  const supportingBuckets = rankedBuckets
    .filter((b) => {
      if (b === leadBucket || bucketScores[b] <= 0) return false;
      if (b === "possible_trt_optimization" && getString(answers.on_hormone_therapy) !== "yes") return false;
      if (b === "fertility_first" && !["yes", "unsure"].includes(getString(answers.fertility_priority))) return false;
      return bucketScores[b] >= 2;
    })
    .slice(0, 2);

  const allCauses = buildPersonalizedCauses(answers);
  const categories = buildResultCategories(allCauses);
  const recommendedLabs = getRecommendedLabs(allCauses);

  const symptomOptionMap = new Map(
    mensHormoneQuestionBank
      .find((q) => q.id === "main_symptoms")
      ?.options?.map((o) => [o.value, o.label]) ?? [],
  );
  const symptomLabels = symptoms.map((v) => symptomOptionMap.get(v) ?? v);

  const duration = getString(answers.symptom_duration);
  const treatmentDiscussionAreas = [
    "Morning testosterone testing — total, free, and SHBG",
    "LH and FSH to differentiate primary from secondary causes",
    ...(allCauses.some((c) => c.category === "non_hormonal") ? ["Ruling out non-hormonal causes before treatment decisions"] : []),
    ...(["yes", "unsure"].includes(getString(answers.fertility_priority)) ? ["Fertility goals and preservation options before any TRT discussion"] : []),
    ...(allCauses.some((c) => c.id === "weight_metabolic") && ["overweight", "obese"].includes(getString(answers.weight_category)) ? ["Weight, metabolic health, and whether GLP-1 support belongs in the plan"] : []),
    ...(duration === "over_3yr" || duration === "gradual" ? ["Long-standing symptom pattern — full hormonal workup including LH/FSH before any treatment decision"] : []),
    ...(duration === "under_3mo" ? ["Recent onset — rule out reversible causes (stress, sleep, medications) before pursuing hormones"] : []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const ctaKeys: string[] = ["scheduleConsult", "comprehensiveTesting"];
  if (allCauses.some((c) => c.id === "weight_metabolic") && ["overweight", "obese"].includes(getString(answers.weight_category))) ctaKeys.push("glp1Support");
  if (["yes", "unsure"].includes(getString(answers.fertility_priority))) ctaKeys.push("fertilityOptions");

  return {
    leadBucket,
    supportingBuckets,
    bucketScores,
    symptomLabels,
    categories,
    allCauses,
    recommendedLabs,
    treatmentDiscussionAreas,
    ctaKeys,
  };
}
