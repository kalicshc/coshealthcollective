/**
 * "The Critical Window" — presentation content (single source of truth), v3 "Teaching Edition".
 *
 * Rewritten so the SLIDES THEMSELVES TEACH the concept — what the window is, what is physically
 * happening during perimenopause, and why timing matters — instead of hiding it all in speaker
 * notes. The explanatory spine:
 *   myth → the study wasn't wrong, how we used it was (timing flip) → DEFINE THE WINDOW clearly →
 *   vocab → hormones lurch (not fade) → it gets misdiagnosed → ESTROGEN MAINTAINS THE WHOLE BODY →
 *   THE MECHANISM (healthy tissue answers, changed tissue doesn't → why "when" beats "whether") →
 *   the stakes (bone/heart/brain/metabolism) → brain → "so this is the window" → action levers
 *   (move, lift, sleep, eat, stress) → HRT → vaginal estrogen → provider → questions → partners → close.
 *
 * Design: light frosted glass + deep-ink text, deep-teal ACCENT for emphasis. **bold** spans render
 * in ACCENT. All imagery is mood-matched Colorado NATURE (see gen-deck-nature.mjs) — the glass
 * carries the idea, the landscape carries the feeling. Speaker notes (press N) are the deeper layer.
 *
 * Facts verified against the build brief's claim-integrity map + fact-check pass (protein 1.2 g/kg
 * ~0.55 g/lb, exercise "at least as effective as" antidepressants, glymphatic 60% = animal data,
 * brain glucose shift = emerging, perimenopause ~47, menopause ~51, WHI mean age 63, ELITE 2016,
 * SWAN ~10% spine BMD, LIFTMOR 2018, FDA boxed-warning removal Nov 2025). No alpha/beta jargon.
 */

import { clinicFacts } from "@/lib/clinicFacts";

export type GraphShape = "chaotic" | "declineEarly" | "declineGradual";
export type GlassTone = "light" | "dark";
export type PanelPos = "center" | "left" | "right" | "bottom";
export type DissolveKind = "lift" | "fragment" | "fade";

export type DeckScene = {
  id: string;
  num: number;
  navLabel: string;
  kind:
    | "title" | "statement" | "labelValue" | "bullets" | "twoCol" | "graphs"
    | "table" | "columns" | "markerList" | "rules" | "numbered" | "qr";

  glass: GlassTone;
  panel: PanelPos;
  still: string;
  suppressFooter?: boolean;
  notes: string;
  transition?: { dissolve: DissolveKind; durationS: number; motion: string };

  eyebrow?: string;
  headline?: string;
  subAccent?: string; // a prominent subheader in the warm secondary accent (markerList)
  subhead?: string;
  footer?: string;
  bigText?: string[];
  allCaps?: boolean;
  footnote?: string;
  bullets?: string[];
  bulletStyle?: "square" | "check" | "dot";
  labelValue?: { label: string; value: string }[];
  twoCol?: { term: string; lines: string[] }[];
  graphs?: { label: string; shape: GraphShape; note: string }[];
  table?: { headers: string[]; rows: string[][] };
  table2?: { headers: string[]; rows: string[][] };
  callout?: string;
  columns?: { header: string; items: string[] }[];
  band?: string;
  markerList?: { label: string; text: string }[];
  rules?: { n: string; title: string; body: string }[];
  numbered?: string[];
  qr?: { url: string; takeaways: string[]; socials?: { label: string; url: string }[] };
};

export const SCENES: DeckScene[] = [
  // ── ORIENT — the myth, the correction, the thesis ──────────────────────
  {
    id: "s01", num: 1, navLabel: "Title", kind: "title",
    glass: "light", panel: "left", still: "01-aurora", suppressFooter: true,
    headline: "The Critical Window",
    subhead: "The decade that defines your next 30–40 years",
    footer: "Logan Crist, PA-C — Colorado Springs Health Collective",
    notes:
      "Welcome, thank the host venue by name. ~30 seconds. Don't teach yet. \"Tonight's about " +
      "something that touches almost every woman in this room — and matters just as much for the " +
      "partners here. Let's get into it.\"",
  },
  {
    id: "s02", num: 2, navLabel: "The myth", kind: "statement",
    glass: "light", panel: "center", still: "02-newspaper", allCaps: true,
    eyebrow: "the headline that misled a generation",
    bigText: ["“HRT IS DANGEROUS”"],
    subhead: "— Women’s Health Initiative, 2002",
    transition: { dissolve: "fragment", durationS: 2.5, motion: "Camera dives from the aurora sky down through cloud and ridge to land on a brooding storm over dark peaks; the slide-1 glass cracks and scatters." },
    notes:
      "Open with the joke: \"Tonight's about why hormone therapy is dangerous… just kidding.\" " +
      "Beat. Pause for the laugh.\n\n\"That was the 2002 headline. And it scared an entire " +
      "generation of women — and their doctors — off the one thing that could've helped them. " +
      "We've been undertreating menopause for twenty years because of it.\" Don't dwell.",
  },
  {
    id: "s03", num: 3, navLabel: "Why WHI was wrong", kind: "labelValue",
    glass: "light", panel: "right", still: "03-desk-journals",
    headline: "The study wasn’t wrong. How we interpreted the data was.",
    labelValue: [
      { label: "AVERAGE AGE STUDIED", value: "63 — over a decade past menopause" },
      { label: "WHAT THEY GAVE", value: "An old synthetic formulation (Prempro)" },
      { label: "WHEN THEY STARTED IT", value: "Too late — in bodies where a fundamental physiologic shift had already occurred" },
    ],
    footnote: "Then we applied that to every 50-year-old in America. Flip it — start estrogen **early** instead — and a 2016 trial (ELITE) found it actually *slowed* artery disease. **Same drug. Opposite result. The only thing that changed was timing.**",
    transition: { dissolve: "fade", durationS: 2, motion: "Camera lingers as the storm clears to crisp first light on snow-capped peaks; slide-2 glass fades out." },
    notes:
      "\"The study wasn't wrong about what it looked at. It was wrong about how we applied it — to " +
      "every woman in the country.\"\n\n\"They studied women a decade past menopause, on an old " +
      "synthetic formulation. Today's data — transdermal estradiol, bioidentical progesterone, " +
      "started in the right window — tells the opposite story. ELITE, 2016: started early, estradiol " +
      "slowed atherosclerosis vs placebo. Started late, it didn't. Same drug. Different timing. " +
      "Different result.\" Plant the word 'timing' — the whole talk hangs on it.",
  },
  {
    id: "s05", num: 4, navLabel: "Roadmap", kind: "bullets",
    glass: "light", panel: "right", still: "05-forest-path", bulletStyle: "square",
    headline: "Where we’re going tonight",
    bullets: [
      "What’s actually happening to your body — and **why**",
      "How to tell if you’re in the **window**",
      "What to start this week — **with or without hormones**",
    ],
    footnote: "Partners — you’re not spectators tonight. By the end, you’ll know how to be in this **with** her.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera glides forward through the ridge-gap into a sunlit forest trail; the glass fades as we pass through." },
    notes:
      "\"My hope: you leave with a real understanding of your body, a clear picture of the window, " +
      "and a few things you can start this week.\"\n\n\"And to the partners — thank you for coming. " +
      "By the end you'll understand what she's going through and how to be in it with her, instead " +
      "of watching from the outside.\" Keep it brisk.",
  },
  {
    id: "s06", num: 5, navLabel: "Vocabulary", kind: "twoCol",
    glass: "light", panel: "center", still: "06-forest-open",
    headline: "Two words everyone mixes up",
    twoCol: [
      { term: "Menopause", lines: ["One single day", "12 months after your last period — average age ~51"] },
      { term: "Perimenopause", lines: ["The 4–10 years before it", "Starts mid-to-late 40s — this is where it all happens"] },
    ],
    footnote: "Most women are **in perimenopause for years** before anyone says the word.",
    transition: { dissolve: "fade", durationS: 2, motion: "Slow dolly deeper along the trail to where it opens toward sky; glass fades." },
    notes:
      "Engagement: \"Can anyone tell me the difference between perimenopause and menopause?\" Let a " +
      "couple try.\n\n\"Menopause is ONE day — 12 months after your last period; you only know in " +
      "hindsight. Perimenopause is the 4–10 years leading up to it, usually starting mid-to-late " +
      "40s, sometimes the late 30s. Average menopause is ~51. Tonight is mostly about perimenopause " +
      "— that's where the action is, and where most women don't realize they already are.\"",
  },

  // ── WHAT'S HAPPENING — the teaching core ───────────────────────────────
  {
    id: "s07", num: 6, navLabel: "Hormones lurch", kind: "graphs",
    glass: "light", panel: "bottom", still: "07-woman-clearing",
    headline: "Your hormones don’t fade quietly. They lurch.",
    graphs: [
      { label: "Progesterone", shape: "declineEarly", note: "falls first → anxiety, broken sleep" },
      { label: "Estrogen", shape: "chaotic", note: "swings high then low — the chaos is what you feel" },
      { label: "Testosterone", shape: "declineGradual", note: "slow age-related fade → libido, drive, muscle" },
    ],
    footnote: "Your ovaries are winding down **unevenly**. Progesterone — your calm, sleep hormone — usually drops **first**. So the first sign often isn’t a hot flash. It’s anxiety and 2 a.m. wake-ups.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Trail opens to a clearing storm over jagged peaks, shafts of light breaking through; glass fades." },
    notes:
      "\"Everyone pictures a smooth slope down. It's not. The ovaries wind down unevenly and " +
      "hormones lurch.\"\n\nEstrogen: \"Swings wildly — high one week, low the next. It's the CHAOS, " +
      "not the absolute level, that drives the worst symptoms. You can feel high AND low estrogen in " +
      "the same week.\"\n\nProgesterone: \"Your calming, sleep hormone — works on the same brain " +
      "system as anti-anxiety meds, via allopregnanolone on GABA. It usually drops FIRST. So the " +
      "first sign is often anxiety and insomnia, not hot flashes. That's why it gets missed.\"\n\n" +
      "Testosterone: \"A slow, age-related fade — not menopause specifically — but it still drives " +
      "libido, motivation, muscle. The most overlooked of the three; most providers never check it.\"",
  },
  {
    id: "s10", num: 7, navLabel: "The physiologic shift", kind: "statement",
    glass: "light", panel: "bottom", still: "10-lock-key",
    eyebrow: "the critical physiologic shift",
    bigText: ["Go long enough without estrogen,", "and the receptors themselves change."],
    subhead: "Your cells carry receptors these hormones bind to — a **key and lock**. But estrogen also maintains those very receptors, so the longer it’s gone, the more they **degrade, get silenced, or malfunction** — and the body slowly loses its ability to respond, **even if estrogen returns later.**",
    transition: { dissolve: "fragment", durationS: 3, motion: "From the clear snow peaks the camera sweeps down across a landscape that splits — lush green valley on one side, cracked arid earth on the other; glass shards drift apart." },
    notes:
      "THE ENGINE SLIDE — this is the whole reason timing matters. Slow down.\n\n\"Estrogen works by " +
      "binding receptors on your cells — think a key in a lock. Here's the part nobody explains: " +
      "estrogen also MAINTAINS those receptors. So the longer you go without it, the more they " +
      "degrade, get silenced, or stop working. The lock itself changes.\"\n\n\"That's why this is a " +
      "window. Reintroduce estrogen early, while the receptors still work, and it does its job. " +
      "Reintroduce it years later, to changed receptors, and the body has progressively lost the " +
      "ability to respond — the same key no longer fits the same way.\"",
  },
  {
    id: "s04", num: 8, navLabel: "The critical window", kind: "statement",
    glass: "light", panel: "center", still: "04-doorway-vista", suppressFooter: true,
    eyebrow: "the whole talk in one idea",
    bigText: ["And that’s the critical window —", "and it closes sooner than you think."],
    subhead: "From your **40s to 5–10 years after your last period**, your body is still **responsive to estrogen** — in a good way: bones stay healthy, arteries stay flexible, the brain still uses estrogen the way it’s meant to, and hormones still have a positive effect throughout the body. **This is the window where you shape the next 30 years.**",
    footnote: "Being told to just “deal with it” is some of the most dangerous advice in medicine — and **waiting has a cost.**",
    transition: { dissolve: "lift", durationS: 3, motion: "Camera lifts off the peaks and sweeps back to a wide golden valley framed by pines, a glowing gap in the ridge like a doorway; slide-3 glass lifts away." },
    notes:
      "SLOW DOWN. This is the thesis — read it out loud, then pause.\n\n\"This is the whole idea " +
      "tonight. There's a window — roughly your 40s to 5–10 years past your final period — " +
      "where your body is still RESPONSIVE. To movement, to lifting, to hormones if you need them. " +
      "Inside it, you can shape the next 30–40 years. Outside it, the tissue has already adapted to " +
      "low estrogen — same effort, different result. Tonight: where the window is, what's happening " +
      "inside it, and what to do about it — with or without hormones.\"",
  },
  {
    id: "s11", num: 9, navLabel: "Same hormone, different response", kind: "markerList",
    glass: "light", panel: "center", still: "11-body-interior",
    eyebrow: "metabolic syndrome",
    headline: "Same hormone. Different response.",
    markerList: [
      { label: "Wrong estrogen", text: "After menopause, fat tissue becomes the main estrogen factory — but it makes **estrone** (inflammatory) instead of **estradiol** (protective)." },
      { label: "Wrong delivery", text: "Obesity suppresses **SHBG**, the protein that controls hormone release — so hormones flood tissues unregulated instead of arriving in measured doses." },
      { label: "Wrong response", text: "Inflamed, insulin-resistant tissue **flips the receptor response** — the same hormone that would calm inflammation in healthy tissue now amplifies it." },
    ],
    footnote: "**The hormone hasn’t changed. The tissue has.**",
    transition: { dissolve: "fade", durationS: 3, motion: "Camera drifts across a mountainside mid-autumn, green turning to gold and rust; glass fades." },
    notes:
      "\"Here's why the same hormone can help or harm — it's not the hormone, it's the terrain.\"\n\n" +
      "Wrong estrogen: \"After menopause the ovaries stop, and fat tissue becomes the main estrogen " +
      "factory — but it pumps out estrone, a more inflammatory estrogen, instead of the protective " +
      "estradiol the ovaries made.\"\n\nWrong delivery: \"Obesity and insulin resistance suppress SHBG, " +
      "the carrier protein that doles hormones out in measured amounts — so what you do have floods " +
      "tissues unregulated.\"\n\nWrong response: \"And inflamed, insulin-resistant tissue flips the " +
      "receptor response — the same estrogen that calms inflammation in healthy tissue can amplify it " +
      "in damaged tissue.\"\n\n\"The hormone hasn't changed. The tissue has. That's why metabolic " +
      "health — lifting, sleep, food, stress — is what makes hormones, the ones you take and the ones " +
      "you make, actually work. It's why I check metabolic health before I ever prescribe.\"",
  },
  {
    id: "s08", num: 10, navLabel: "Why symptoms get dismissed", kind: "table",
    glass: "light", panel: "center", still: "08-temple",
    headline: "Why your symptoms get dismissed",
    table: {
      headers: ["What you feel", "What you’re told it is"],
      rows: [
        ["“I don’t feel like myself”", "Depression"],
        ["Can’t sleep, up at 2 a.m.", "Insomnia"],
        ["Brain fog, losing words", "Just getting older"],
        ["Weight creeping on, same habits", "“Eat less, move more”"],
        ["Libido’s gone", "Stress"],
      ],
    },
    band: "but it’s not five problems — it’s one",
    footnote: "It all traces to **one hormone shift** — and **progesterone usually drops first.** Fix the root, and the rest can follow.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera settles on a lone peak half-hidden in drifting fog; glass fades." },
    notes:
      "LET THIS LAND. Half the room will be nodding.\n\n\"Look at this list. Every one of these gets " +
      "blamed on something separate — you're depressed, you have insomnia, you're just getting " +
      "older, eat less and move more, you're stressed. Five different problems, five different dead " +
      "ends, five different prescriptions.\"\n\nPause: \"Sound familiar?\"\n\n\"But it's not five " +
      "problems. It's ONE — a hormone shift, and progesterone usually drops first. Treat the root " +
      "and the rest often falls into place: the sleep comes back, the mood lifts, the fog clears, " +
      "the weight gets easier. You don't chase five symptoms — you treat the cause.\"",
  },
  {
    id: "s09", num: 11, navLabel: "More than feeling bad", kind: "markerList",
    glass: "light", panel: "center", still: "09-tissue-macro",
    eyebrow: "what’s actually at stake",
    headline: "It’s more than just feeling bad",
    markerList: [
      { label: "Bone", text: "Estrogen guards your skeleton — once it’s gone, bone loss accelerates and fractures climb." },
      { label: "Muscle", text: "It helps you hold onto muscle and strength — the foundation of staying independent." },
      { label: "Heart", text: "**Heart disease is the #1 killer of postmenopausal women — more than every cancer combined.**" },
      { label: "Brain", text: "It fuels focus, memory, and mood." },
      { label: "Metabolism", text: "It holds the line on blood sugar and visceral fat." },
    ],
    footnote: "The hot flashes fade. What estrogen was quietly protecting — your **bones, your heart, your brain** — is what’s really on the line.",
    transition: { dissolve: "fragment", durationS: 3, motion: "Camera pushes through the fog into endless layered ridgelines fading to dawn haze; glass shards drift apart." },
    notes:
      "\"Here's the part that should get your attention: the hot flashes and the mood are the " +
      "SURFACE. Underneath, estrogen is quietly protecting the things that actually decide how you " +
      "age.\"\n\nBone: \"It guards your skeleton — once it's gone, bone loss accelerates and fracture " +
      "risk climbs.\"\n\nMuscle: \"It helps you hold onto muscle and strength — that's your " +
      "independence at 75.\"\n\nHeart: \"This is the big one, and almost no one knows it: heart " +
      "disease is the number-one killer of postmenopausal women — more than every cancer combined.\"" +
      "\n\nBrain: \"Focus, memory, and mood.\"\n\nMetabolism: \"Blood sugar and visceral fat.\"\n\n" +
      "\"The symptoms pass. What estrogen was protecting is what's really on the line — and that's " +
      "the case for acting in the window.\"",
  },
  {
    id: "s12", num: 12, navLabel: "It compounds", kind: "statement",
    glass: "light", panel: "center", still: "12-cascade",
    eyebrow: "a cascade that compounds",
    bigText: ["It compounds.", "Get in front of it."],
    subhead: "Low estrogen → more insulin resistance and belly fat → a **flipped receptor response** → less protection → faster decline. Each step feeds the next. Walk into menopause **already metabolically unhealthy** and the cascade is already rolling — an **uphill battle.** Not impossible — but far easier if you step in **now,** while the tissue still responds.",
    footnote: "It’s never too late to step in — but the higher up you catch it, the less there is to undo.",
    transition: { dissolve: "fade", durationS: 3, motion: "Camera rises alongside a Colorado mountain cascade, white water tumbling over ledge after ledge; glass fades." },
    notes:
      "\"Here's the part to really get: this isn't one event — it's a cascade that feeds itself.\"\n\n" +
      "\"Low estrogen worsens insulin resistance and visceral fat. That metabolic decline flips the " +
      "receptor response we just talked about, which blunts estrogen's protection — and that drives " +
      "even more decline. Round and round.\"\n\n\"So if you walk into menopause already metabolically " +
      "unhealthy, the cascade has a head start. It's an uphill battle — NOT impossible, I see people " +
      "turn it around all the time — but it's a lot harder than getting in front of it.\"\n\n\"The " +
      "move is to step in while your tissue still responds — break the chain near the top, instead of " +
      "chasing it all the way down.\"",
  },
  {
    id: "s14", num: 13, navLabel: "So what do you do?", kind: "statement",
    glass: "light", panel: "center", still: "14-vista-down", suppressFooter: true,
    eyebrow: "so what do you actually do?",
    bigText: ["Estrogen is powerful.", "That doesn’t mean you need HRT."],
    subhead: "Remember — **metabolic syndrome** is a huge driver of worse symptoms, and of worse outcomes for bone, muscle, heart, and brain. The good news? **Lifestyle is the most powerful medicine we have — not HRT.** We’ll get to why in a minute.",
    footnote: "But first — **who actually needs HRT?**",
    transition: { dissolve: "fade", durationS: 2, motion: "Camera tilts down toward a green meadow valley with a faint trail; glass fades." },
    notes:
      "\"I keep coming back to this: estrogen is SUPER helpful — but that does NOT mean everyone needs " +
      "HRT.\"\n\n\"Remember the cascade — metabolic syndrome is a huge driver of worse symptoms and " +
      "worse outcomes for bone, muscle, heart, and brain. And here's the good news: the most powerful " +
      "medicine we have isn't HRT — it's lifestyle. We'll get into exactly why in a minute.\"\n\n" +
      "\"But first, let's answer what everyone's really wondering: who actually needs hormones?\"",
  },
  {
    id: "s13", num: 14, navLabel: "Who needs HRT?", kind: "markerList",
    glass: "light", panel: "center", still: "13-vista",
    eyebrow: "the stepwise approach — per The Menopause Society & ACOG",
    headline: "Who needs HRT? (Not everyone.)",
    markerList: [
      { label: "Everyone", text: "Lifestyle is the foundation — for every woman, with or without hormones." },
      { label: "Mild symptoms", text: "Lifestyle first. Most get through with manageable symptoms — no HRT needed." },
      { label: "In the window", text: "Bothersome symptoms, under 60 / within 10 years: HRT is appropriate — **~75% fewer hot flashes**, paired with lifestyle." },
      { label: "Contraindicated", text: "Breast cancer, clots, stroke: lifestyle + non-hormonal meds (incl. **fezolinetant**). Vaginal estrogen often still fine." },
      { label: "Outside the window", text: "Past 10 years / over 60: lifestyle **is** the intervention; starting systemic HRT this late carries more risk." },
    ],
    footnote: "**HRT is a tool for symptoms, not a vitamin.** The foundation is always **lifestyle.**",
    transition: { dissolve: "lift", durationS: 3, motion: "Camera drifts low across the meadow valley to a wide golden vista; glass lifts away." },
    notes:
      "\"Quick framework for who actually needs hormones — because it's not everyone. This stepwise " +
      "structure — lifestyle first, HRT for the right people — is exactly what The Menopause Society " +
      "(formerly NAMS) and ACOG recommend; I'm not making it up.\"\n\nEveryone: " +
      "\"Lifestyle is the foundation, period — with or without HRT.\"\n\nMild: \"If symptoms are mild " +
      "and manageable, lifestyle alone may be all you need. Stepwise: lifestyle, then non-prescription, " +
      "then HRT only if still needed.\"\n\nIn the window: \"Moderate-to-severe symptoms, under 60 or " +
      "within 10 years, no contraindications — HRT is appropriate and excellent: about 75% fewer hot " +
      "flashes, far more than any non-hormonal option. Best as HRT PLUS lifestyle, not instead.\"\n\n" +
      "Contraindicated: \"Breast cancer, clot or stroke history, active liver disease — lifestyle plus " +
      "non-hormonal meds (SSRIs/SNRIs, gabapentin, fezolinetant). Vaginal estrogen is usually still " +
      "fine, with oncology coordination.\"\n\nOutside the window: \"Past 10 years or over 60 — " +
      "lifestyle is the primary tool; new systemic HRT has a worse risk-benefit. No arbitrary stop " +
      "date if you're already on it — individualize.\"\n\nBottom line: \"HRT is a tool for symptoms, " +
      "not a vitamin. The foundation is always lifestyle. In the window with quality-of-life symptoms? " +
      "It belongs on the table. Mild? Lifestyle may be enough. Outside the window? Lifestyle IS the " +
      "intervention.\"",
  },

  // ── WHAT TO DO — the levers ────────────────────────────────────────────
  {
    id: "s15", num: 15, navLabel: "Move", kind: "statement",
    glass: "light", panel: "bottom", still: "15-runners",
    eyebrow: "lever #1, and it’s not close",
    bigText: ["The most powerful drug we have is exercise."],
    subhead: "The single biggest lever you have — for your **brain, bones, heart, and metabolic health.** Almost everything that sounds scary about this transition, exercise can blunt — it largely **does what estrogen used to do.**",
    transition: { dissolve: "fade", durationS: 3, motion: "Camera swoops down to an epic singletrack trail carving up a ridgeline; glass fades." },
    notes:
      "\"Exercise is the closest thing we have to a miracle drug. It raises BDNF — you literally grow " +
      "new neurons — protects against dementia, lifts mood, sharpens thinking, builds bone and " +
      "metabolic health.\"\n\n\"Never exercised? A walk " +
      "counts — start there. But intensity is where the magic is.\"",
  },
  {
    id: "s16", num: 16, navLabel: "Lift heavy", kind: "columns",
    glass: "light", panel: "right", still: "16-deadlift",
    headline: "Lift heavy. Land hard.",
    columns: [
      { header: "Heavy resistance", items: ["Bones, muscle, metabolism"] },
      { header: "High-intensity intervals", items: ["Heart, insulin sensitivity"] },
      { header: "Impact / plyometrics", items: ["Bone density, balance, fewer falls"] },
    ],
    band: "LIFTMOR (2018): postmenopausal women lifting heavy **gained ~3% spine density (+2.9%)** in 8 months — the control group *lost* bone. And it’s **never too late**; people start in their 80s and transform.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Trail rises to a massive granite monolith glowing in golden light; glass fades." },
    notes:
      "\"Specifically: lift heavy. Deadlifts, squats, presses — real load, not pink dumbbells. Bone " +
      "is use-it-or-lose-it, and the signal to stay dense is LOAD. Walking is great; walking doesn't " +
      "build bone.\"\n\n\"LIFTMOR, 2018: postmenopausal women on a heavy 5x5 program at >85% of max " +
      "GAINED about 3% — +2.9% — of spine density in just 8 months; the control group LOST bone. " +
      "That's reversal, not maintenance. Add impact " +
      "— jumping, hopping, landing — that's the bone signal too. Strong and stable means fewer falls, " +
      "and fractures that don't happen. Never too late — we start people in their 80s.\"",
  },
  {
    id: "s16b", num: 17, navLabel: "Exercise & the brain", kind: "markerList",
    glass: "light", panel: "center", still: "ex-brain",
    eyebrow: "the BDNF story",
    headline: "Exercise is medicine for your brain",
    markerList: [
      { label: "BDNF", text: "Exercise raises **BDNF** — the protein that builds new neural connections, protects neurons, and helps clear amyloid. **Lifting drives it hardest** (35-trial meta-analysis)." },
      { label: "Less dementia", text: "More midlife activity, less future dementia. Estrogen loss lowers BDNF — exercise puts that signal back." },
      { label: "Timing, again", text: "Framingham (2025): mid- and late-life activity cut dementia risk **~40–45%** — early-adult activity alone didn’t. The window applies to exercise too." },
    ],
    footnote: "**Exercise does what estrogen used to do for your brain — no prescription required.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera climbs toward first light cresting a high alpine ridge; glass fades." },
    notes:
      "\"We said exercise is the most potent drug — here's the brain piece specifically.\"\n\nBDNF: " +
      "\"Exercise raises brain-derived neurotrophic factor — BDNF — the protein that builds new " +
      "neural connections, protects existing neurons, and helps fight amyloid plaque. A meta-analysis " +
      "of 35 randomized trials in older adults found exercise significantly raised BDNF, with " +
      "resistance training the largest effect (SMD 0.76), then combined, then aerobic.\"\n\nDementia: " +
      "\"A systematic review found more perimenopausal activity meant lower future dementia risk — " +
      "roughly 10 MET-hours a week for real reduction. And estrogen loss itself lowers BDNF, so " +
      "exercise directly replaces that signal.\"\n\nTiming: \"A 2025 Framingham analysis: midlife and " +
      "late-life activity were tied to 40–45% lower dementia risk — early-adult activity alone " +
      "wasn't. The critical window applies to exercise, not just hormones.\"\n\nBottom line: " +
      "\"Exercise does what estrogen used to do for your brain — and you don't need a prescription.\"",
  },
  {
    id: "s16c", num: 18, navLabel: "Exercise & metabolism", kind: "markerList",
    glass: "light", panel: "center", still: "ex-metab",
    eyebrow: "exercise is medicine for your metabolism",
    headline: "Exercise rebuilds your metabolism",
    markerList: [
      { label: "Every marker", text: "A 40-study meta-analysis (2,132 women): exercise improved **every** metabolic-syndrome marker — waist (−2.6 cm), glucose, triglycerides, HDL, blood pressure (−6/−4 mmHg)." },
      { label: "Insulin", text: "3–4 months of training dropped fasting insulin and **HOMA-IR** — fixing the insulin resistance that was breaking the receptors." },
      { label: "It mimics estrogen", text: "Exercise fires the **same nitric-oxide pathway** estrogen uses to keep arteries healthy — doing estrogen's vascular job at the molecular level." },
    ],
    footnote: "**Remember the metabolic dysfunction that breaks the receptors? Exercise is the fix.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera follows a clear alpine stream rushing through a green sunlit meadow; glass fades." },
    notes:
      "\"This one ties straight back to the receptor and metabolic-syndrome slides.\"\n\nEvery marker: " +
      "\"A meta-analysis of 40 studies, over 2,000 postmenopausal women: exercise improved EVERY " +
      "metabolic-syndrome risk factor — waist down 2.6 cm, fasting glucose, triglycerides, HDL, " +
      "systolic BP down 6, diastolic down 4. Combined aerobic plus resistance worked best.\"\n\n" +
      "Insulin: \"Just 3–4 months lowered fasting insulin and HOMA-IR — directly fixing the insulin " +
      "resistance that flips the receptor response.\"\n\nMimics estrogen: \"And the beautiful part — " +
      "exercise activates the same PI3K/Akt/nitric-oxide pathway estrogen uses to protect blood " +
      "vessels. It literally mimics estrogen's vascular effects.\"\n\nBottom line: \"The metabolic " +
      "dysfunction that breaks the receptor system? Exercise is the fix.\"",
  },
  {
    id: "s16d", num: 19, navLabel: "Hot flashes, mood", kind: "markerList",
    glass: "light", panel: "center", still: "ex-bmm",
    eyebrow: "exercise is medicine for the rest of you",
    headline: "Hot flashes, mood, and sleep",
    markerList: [
      { label: "Hot flashes", text: "Resistance training cut hot-flash frequency **~50%** in one trial — endorphins steadying the brain's thermostat." },
      { label: "Mood & sleep", text: "Big drops in depression (**SMD −1.04**) and anxiety — and better sleep across every kind of exercise." },
    ],
    footnote: "**No drug builds bone, burns fat, clears amyloid, steadies your thermostat, fixes sleep, and lifts mood — all at once. Exercise does.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera sweeps across a thriving wildflower meadow beneath a sunlit peak; glass fades." },
    notes:
      "\"Exercise keeps paying out across the board.\"\n\nHot flashes: \"One RCT cut hot-flash frequency " +
      "50% — the idea is exercise endorphins stabilize the hypothalamic thermostat, the same center " +
      "that goes haywire when estrogen drops. A 21-RCT meta-analysis confirmed improved vasomotor " +
      "severity.\"\n\nMood & sleep: \"16 RCTs: exercise dropped depressive symptoms with a large " +
      "effect — SMD −1.04 — biggest in perimenopausal women. And it improves sleep across aerobic, " +
      "yoga, resistance, Pilates.\"\n\nBottom line: \"There is no drug on earth that simultaneously " +
      "builds bone, burns fat, clears amyloid, stabilizes your thermostat, fixes sleep, and treats " +
      "depression. Exercise does all of it.\"",
  },
  {
    id: "s17", num: 19, navLabel: "Sleep — the cleaning crew", kind: "markerList",
    glass: "light", panel: "center", still: "17-bedroom",
    eyebrow: "the glymphatic system",
    headline: "Your brain has a cleaning crew — it only works at night",
    markerList: [
      { label: "The night rinse", text: "In deep sleep, fluid pulses through your brain and flushes out **beta-amyloid and tau** — the proteins that define Alzheimer's. A 2026 human trial confirmed it: a normal night cleared measurably more than a sleepless one." },
      { label: "One bad night counts", text: "PET imaging: a **single** night of lost sleep raised amyloid in the **hippocampus**, your memory center. The waste that should’ve cleared overnight simply didn’t." },
      { label: "The menopause trap", text: "**40–69%** of women sleep poorly in the transition. Less estrogen → worse sleep → less clearance → more amyloid → worse sleep. A self-feeding loop." },
    ],
    footnote: "**Every night you sleep poorly, the cleaning crew gets sent home early — and over the years, the waste piles up.**",
    transition: { dissolve: "fade", durationS: 3, motion: "Day fades to night; camera settles on a moonlit alpine lake mirroring the stars; glass fades." },
    notes:
      "\"Sleep isn't downtime — it's your brain's maintenance shift.\"\n\nThe night rinse: \"In deep, " +
      "slow-wave sleep, cerebrospinal fluid pulses along the brain's arteries — the glymphatic system — " +
      "and flushes out metabolic waste, including the beta-amyloid and tau that define Alzheimer's. In " +
      "rodents, clearance roughly doubles in sleep and glymphatic influx rises ~90% versus awake. And a " +
      "2026 randomized crossover trial in 39 people gave us the first direct human evidence: normal sleep " +
      "significantly raised morning plasma amyloid and tau — the brain offloading waste into the blood — " +
      "compared to sleep deprivation. [refs 1–3]\"\n\nOne bad night: \"A PET study found that just ONE " +
      "night of sleep deprivation raised beta-amyloid in the hippocampus and thalamus — memory regions. " +
      "Not a long-term trend. One night. [ref 4]\"\n\nThe menopause trap: \"Sleep disturbance hits " +
      "40–69% of women in the transition, up to 40% meeting criteria for insomnia disorder. Even after " +
      "accounting for hot flashes and mood, lower estradiol independently tracks with more nighttime " +
      "awakenings. So it becomes a vicious cycle: menopause disrupts sleep, disrupted sleep impairs " +
      "clearance, impaired clearance accelerates amyloid, which disrupts sleep further. [refs 5–7]\"\n\n" +
      "Bottom line: \"Every night you sleep poorly, the cleaning crew gets sent home early. Over years, " +
      "the waste piles up. JAMA Neurology (2021) showed a dose-response — shorter sleep, higher amyloid " +
      "burden. Next slide: what actually fixes it.\"",
  },
  {
    id: "s17b", num: 19, navLabel: "Sleep — what works", kind: "columns",
    glass: "light", panel: "center", still: "17b-firstlight",
    eyebrow: "first-line therapy is CBT-I",
    headline: "Sleep hygiene isn’t enough — here’s what works",
    columns: [
      { header: "CBT-I — the gold standard", items: [
        "Sleep restriction: match time in bed to actual sleep — it builds sleep pressure",
        "Stimulus control: bed is for sleep and sex only; can’t sleep, get up",
        "Reframe the worry — the anxiety about not sleeping is what keeps you awake",
      ] },
      { header: "Habits — necessary, not enough", items: [
        "Same wake time daily, even weekends — the #1 habit",
        "Morning bright light; cool room (60–67°F)",
        "No screens before bed, no caffeine after noon, no alcohol near bedtime",
      ] },
      { header: "The progesterone piece", items: [
        "Its metabolite calms the brain through the GABA system — what sleep meds target",
        "Micronized progesterone at bedtime can do double duty",
        "Worth asking your provider about — not a recommendation from the stage",
      ] },
    ],
    band: "**CBT-I beats sleeping pills — and the effects last.** In the MsFLASH trial, **84%** of women landed in the no-insomnia range at 24 weeks vs 43% on education alone. Pair it with good habits and your cleaning crew gets the full shift.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Night lifts to first light; camera rises to a Colorado ridgeline catching warm dawn sun; glass fades." },
    notes:
      "\"So how do you actually fix it? First, a myth to retire: sleep hygiene alone has NOT been shown " +
      "to work as a standalone treatment for insomnia — it's the foundation, not the cure. [ref 9] The " +
      "real first-line therapy is CBT-I — cognitive behavioral therapy for insomnia — recommended by the " +
      "American College of Physicians, the VA/DoD, and the AHA. [refs 10–11]\"\n\nCBT-I: \"It's the most " +
      "effective non-drug treatment for menopausal insomnia. In MsFLASH, telephone-based CBT-I cut " +
      "insomnia severity by 9.9 points versus 4.7 for education alone, and 84% of the CBT-I group were in " +
      "the no-insomnia range at 24 weeks vs 43% of controls — durable, and it also eased hot-flash " +
      "interference. A 2022 meta-analysis of 16 RCTs in 2,108 women confirmed CBT, exercise, and " +
      "mindfulness all improved sleep. [refs 12–13] Three core moves: sleep restriction — match time in " +
      "bed to real sleep, counterintuitive but powerful; stimulus control — bed is for sleep and sex " +
      "only, if you can't sleep get up and do something boring in dim light; and cognitive " +
      "restructuring — stop catastrophizing, the anxiety about not sleeping is what keeps you " +
      "awake.\"\n\nHabits (necessary but not sufficient): \"Consistent wake time every day — even " +
      "weekends — is the single most important habit. Morning bright light to reset the clock. No screens " +
      "1–2 hours before bed. Cool bedroom, 60–67°F, especially with night sweats. No caffeine after noon, " +
      "no alcohol within 3 hours of bed — it fragments sleep architecture. Exercise daily, just not " +
      "vigorously within 3 hours of bedtime. Awake more than 20 minutes? Get up, dim room, don't watch " +
      "the clock. [refs 9,14]\"\n\nThe progesterone callback: \"Ties back to the hormone slides — " +
      "progesterone's metabolite allopregnanolone acts on GABA-A receptors, the same system sleep meds " +
      "target. Declining progesterone in perimenopause impairs that natural sleep-promoting pathway. For " +
      "significant disruption, micronized progesterone at bedtime can do double duty — uterine protection " +
      "and sleep support. Frame it as 'talk to your provider,' not a stage recommendation. [ref 15]\"\n\n" +
      "Bottom line: \"CBT-I works better than sleeping pills, and the effects last. Combine it with good " +
      "habits and you give your brain's cleaning crew the full shift.\"",
  },
  {
    id: "s18", num: 18, navLabel: "Eat — fuel to build", kind: "markerList",
    glass: "light", panel: "center", still: "18-kitchen",
    eyebrow: "you can’t out-restrict menopause",
    headline: "Your body needs more fuel now, not less",
    markerList: [
      { label: "Don’t undereat", text: "Eat too little and the body fights back — it suppresses hormones, drops thyroid (T3), spikes cortisol, and burns **muscle**: the same shift menopause already causes. Hard training on 1,200 calories doesn’t burn fat — it teaches your metabolism to run slower." },
      { label: "Protein > the RDA", text: "The 0.8 g/kg RDA only prevents deficiency. Aim **1.2–1.5 g/kg/day** (~80–100 g for a 150-lb woman). A 2026 WHI trial: women at ≥1.5 g/kg had **less visceral fat and more lean tissue** over 3 years." },
      { label: "Leucine is the trigger", text: "**20–25 g of protein per meal**, spread across the day — leaning on leucine-rich foods (whey, eggs, chicken, fish, Greek yogurt). In older women, leucine-rich protein raised muscle-building **53% at rest, 87% after exercise.**" },
    ],
    footnote: "**The RDA was built to prevent deficiency, not build muscle. You need roughly 50% more protein than the government says — at every meal.**",
    transition: { dissolve: "fade", durationS: 3, motion: "From first light on the ridge, camera descends into a wildflower alpine meadow bursting with bloom; glass fades." },
    notes:
      "\"This is one of the most important reframes tonight: many women restrict calories because " +
      "they're gaining weight — but undereating in this transition is actively harmful.\"\n\nDon't " +
      "undereat: \"Drop energy intake too low and you trigger a survival cascade — the brain suppresses " +
      "reproductive hormones (lowering estrogen and progesterone further), thyroid T3 falls to conserve " +
      "energy, cortisol rises, and muscle protein synthesis shuts down. [refs 1–2] It's the same " +
      "mechanism as RED-S in athletes, and it produces the SAME adverse shift as menopause itself: more " +
      "insulin resistance, endothelial dysfunction, bone loss. [ref 3] Undereating mimics and " +
      "accelerates the very decline you're fighting. So: if you're training hard and eating 1,200 " +
      "calories, you're not losing fat — you're losing muscle and slowing your " +
      "metabolism.\"\n\nProtein: \"This is where the evidence is strongest. The 0.8 g/kg RDA is " +
      "insufficient for postmenopausal women — ESCEO, ESPEN, and PROT-AGE all recommend 1.0–1.2 g/kg as " +
      "a minimum, 1.2–1.5 for active or ill women. [refs 4–6] A 2026 WHI emulated target trial of 3,789 " +
      "women: those at ≥1.5 g/kg had ~13 cm² less visceral fat, 25 cm² less subcutaneous fat, 2.5 kg " +
      "lower weight, and higher lean percentage over 3 years — benefits already showing at ≥1.2 g/kg. " +
      "[ref 7] And anabolic resistance is real — older muscle responds less efficiently to the same " +
      "protein dose, which is exactly why you need MORE. [refs 8–9]\"\n\nLeucine: \"Leucine is the amino " +
      "acid that flips the mTORC1 switch for muscle building. In older women, a drink with ~4 g leucine " +
      "raised muscle protein synthesis 53% at rest and 87% after exercise — far beating the same protein " +
      "with less leucine. [refs 10–11] Practical: 1.2–1.5 g/kg/day; 20–25 g quality protein per meal " +
      "across 3 meals, not all at dinner; leucine-rich sources — whey, eggs, chicken, fish, Greek " +
      "yogurt, beef; and eat protein within 1–2 hours of training, when muscle is most sensitive to " +
      "amino acids. [refs 12–13]\"\n\nBottom line: \"The RDA prevents deficiency — it doesn't build " +
      "muscle. You need about 50% more than the government says, at every meal.\"",
  },
  {
    id: "s18b", num: 18, navLabel: "Eat — fuel like an athlete", kind: "columns",
    glass: "light", panel: "center", still: "18b-vitality",
    eyebrow: "eat like an athlete — because you are one",
    headline: "Fuel the workout, feed the recovery",
    columns: [
      { header: "Mediterranean — best evidence", items: [
        "EMAS endorses it for menopause: symptoms, heart, mood, bone, brain",
        "High adherence cut hot flashes ~20%; high-fat/high-sugar diets raised them 23%",
        "Low-insulin, plant-forward patterns = the least weight gain in the transition",
      ] },
      { header: "What’s on the plate", items: [
        "Protein at every meal — not just a salad at lunch",
        "Healthy fats: olive oil, avocado, nuts, fatty fish (omega-3s)",
        "Fiber & whole carbs: vegetables, legumes, whole grains",
        "Minimize ultra-processed food, refined sugar, alcohol",
        "Don’t skip meals — especially around training",
      ] },
      { header: "The alcohol talk", items: [
        "Fragments sleep even when it helps you fall asleep",
        "Triggers hot flashes; pro-inflammatory",
        "An independent breast-cancer risk factor",
      ] },
    ],
    band: "**You don’t need a diet — you need a fueling strategy.** Eat enough, eat real food, get protein at every meal, and stop being afraid of calories.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera sweeps from the meadow down into a sun-drenched green Colorado river valley alive with summer growth; glass fades." },
    notes:
      "\"If slide one was 'eat enough and prioritize protein,' this is the pattern that surrounds " +
      "it.\"\n\nMediterranean: \"EMAS — the European Menopause and Andropause Society — issued a " +
      "position statement specifically endorsing the Mediterranean diet for menopausal health: it may " +
      "improve hot flashes, cardiovascular risk, blood pressure, cholesterol, glucose, mood, bone " +
      "density, cognition, and breast-cancer risk. [ref 14] A cohort of 6,040 women: high adherence cut " +
      "the odds of vasomotor symptoms 20%, while a high-fat/high-sugar diet raised them 23%. [ref 15] " +
      "And a 2026 JAMA Network Open study found low-insulinemic, plant-forward patterns had the least " +
      "weight gain through menopause, while ultra-processed, refined-carb diets accelerated it. [ref " +
      "16]\"\n\nOn the plate: \"Protein at every meal — eggs and Greek yogurt at breakfast, not just a " +
      "salad at lunch. Healthy fats — olive oil, avocado, nuts, fatty fish; omega-3s are " +
      "anti-inflammatory and help mood and heart markers. [refs 14,17] Fiber and complex carbs — " +
      "vegetables, legumes, whole grains — to steady blood sugar and feed the gut. Minimize " +
      "ultra-processed food, refined sugar, and alcohol — all pro-inflammatory. And don't skip meals, " +
      "especially around training; the body needs fuel to adapt.\"\n\nAlcohol: \"Worth naming because " +
      "they're thinking about it. Alcohol disrupts sleep architecture even if it helps you fall asleep, " +
      "increases hot flashes, is pro-inflammatory, and is an independent breast-cancer risk factor. The " +
      "framing: it's not about never drinking — it's about knowing every glass is working against the " +
      "things you're trying to fix.\"\n\nBottom line: \"You don't need a diet. You need a fueling " +
      "strategy — eat enough, eat real food, protein at every meal, and stop being afraid of calories.\"",
  },
  {
    id: "s19", num: 19, navLabel: "Stress — the biology", kind: "markerList",
    glass: "light", panel: "center", still: "19a-pressure",
    eyebrow: "stress isn’t just in your head",
    headline: "Stress isn’t just in your head — it’s in your hormones",
    markerList: [
      { label: "It worsens symptoms", text: "SWAN, 2,718 women over 9 years: those upset by a stressful life event had **21% more hot flashes** — independent of age, smoking, and menopause stage. Stress severity tracks symptom severity even after accounting for hormone levels." },
      { label: "It rewires the response", text: "Chronic stress holds **cortisol** high → insulin resistance, visceral fat, inflammation — the exact triad that shifts estrogen receptors toward **pro-inflammatory** signaling. Stress changes how the body responds to its own hormones." },
      { label: "Trauma history counts", text: "PTSD symptoms carry **3× the odds** of sleep trouble, 1.7× hot flashes, 2.2× vaginal irritation. A history of abuse or instability tracks with a harder transition decades later — not imagined, biologically wired." },
    ],
    footnote: "**Stress isn’t a side issue — it’s a biological accelerant. Every lever in this talk works partly by lowering the stress load.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Warm light cools and tightens; camera climbs to an exposed wind-scoured ridge as weather builds; glass fades." },
    notes:
      "\"We've done move, eat, sleep. The fourth pillar is stress — and this is not soft science.\"\n\n" +
      "It worsens symptoms: \"SWAN — 2,718 women, nine years — women currently upset by a stressful " +
      "life event had 21% more vasomotor symptoms than women with no stressor, adjusted for age, " +
      "smoking, health, ethnicity, and menopause stage. [ref 1] A JACC review confirmed perceived " +
      "stress, anxiety, and depression each independently predict worse symptoms and worse physical " +
      "health after menopause — early-life adversity is even linked to earlier menopause onset. [ref 2] " +
      "And perceived stress tracked symptom severity even after controlling for FSH — so it works " +
      "through pathways beyond hormone decline alone. [ref 3]\"\n\nIt rewires the response: \"Ties " +
      "straight back to the receptor and metabolic slides. Chronic stress fires the HPA axis, raising " +
      "cortisol; sustained cortisol drives insulin resistance, visceral fat, and inflammation — the " +
      "exact triad that shifts estrogen-receptor signaling pro-inflammatory. Stress doesn't just make " +
      "menopause feel worse; it changes how the body responds to its own hormones. [ref 2]\"\n\nTrauma " +
      "(handle with care): \"A JAMA Internal Medicine study of 2,016 midlife women: PTSD symptoms meant " +
      "roughly 3× the odds of sleep difficulty, 1.7× hot flashes, 2.2× vaginal irritation — adjusted " +
      "for menopause status, BMI, and hormone use. Histories of intimate partner violence and assault " +
      "independently predicted worse symptoms. [refs 4–5] Say it gently: if a woman has a trauma " +
      "history, her transition is likely harder — not because she's imagining it, but because chronic " +
      "stress has literally rewired how her body processes hormonal change.\"\n\nBottom line: \"Stress " +
      "is a biological accelerant. Every lifestyle lever here works partly by lowering the stress " +
      "load.\"",
  },
  {
    id: "s19s2", num: 19, navLabel: "Stress — what works", kind: "markerList",
    glass: "light", panel: "center", still: "19-porch",
    eyebrow: "calm the system, change the trajectory",
    headline: "What actually works for stress",
    markerList: [
      { label: "Mindfulness", text: "19-RCT meta-analysis (1,670 women): meaningful drops in symptoms, **sleep, anxiety, depression, and stress** — and 79% stuck with it. Honest caveat: it won’t stop a hot flash, but it changes how much the hot flash runs your day." },
      { label: "Yoga & mind-body", text: "13 RCTs: yoga cut total, psychological, **and vasomotor** symptoms. A 24-month trial even found higher estrogen and testosterone in regular practitioners — modulating hormones, not just perception." },
      { label: "Your toolkit", text: "**10–15 min** of daily meditation; yoga 2–3×/week; box or 4-7-8 **breathwork** for real-time calm; time **outside**; and the hardest one — **boundaries.** Midlife women carry the heaviest caregiving load of their lives." },
    ],
    footnote: "**You can’t always lower the stressors — but you can change how your nervous system meets them.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "The wind settles; camera drifts down to a perfectly still alpine tarn at dawn, mist on glass water; glass fades." },
    notes:
      "\"So what actually moves the needle on stress?\"\n\nMindfulness: \"A 2025 meta-analysis of 19 " +
      "RCTs, 1,670 women: mindfulness significantly improved menopausal symptoms, sleep, anxiety, " +
      "depression, and stress — moderate-to-large effects, 79% adherence, 6% dropout. [ref 6] Across 30 " +
      "RCTs, both CBT and mindfulness helped mood, with mindfulness stronger on anxiety. [ref 7] The " +
      "honest caveat: CBT has data for hot flashes specifically; mindfulness and yoga don't stop the " +
      "hot flash itself — they help the psychological and sleep side. [ref 8] So: it won't stop the " +
      "flash, but it changes how much it disrupts your life.\"\n\nYoga & mind-body: \"13 RCTs, 1,306 " +
      "women: yoga cut total, psychological, vasomotor, and urogenital symptoms. [ref 9] Mind-body work " +
      "broadly — yoga, tai chi, Pilates, qigong — improved bone density, sleep, anxiety, depression, " +
      "fatigue. [ref 10] And a 24-month trial found regular yoga dropped Kupperman scores 12–16.5 " +
      "points AND was associated with higher estrogen and testosterone at 24 months — suggesting it " +
      "modulates hormonal output, not just perception. [ref 11]\"\n\nToolkit: \"Practical and " +
      "low-barrier: 10–15 minutes of daily meditation — Headspace, Calm, Insight Timer; yoga 2–3 times " +
      "a week; breathwork like box or 4-7-8 to flip on the parasympathetic system in real time; time " +
      "outdoors lowers cortisol; and the hardest, highest-yield one — boundaries and saying no. Midlife " +
      "women are usually carrying the most caregiving they ever will: kids plus aging parents.\"",
  },
  {
    id: "s19c", num: 19, navLabel: "Other levers", kind: "columns",
    glass: "light", panel: "center", still: "19c-foundation",
    eyebrow: "the small things that aren’t small",
    headline: "The other lifestyle levers",
    columns: [
      { header: "Connection — a biological buffer", items: [
        "Family support & resilience → fewer symptoms across domains",
        "Social groups → less severe climacteric and depressive symptoms",
        "The women who do best aren’t doing it alone",
        "You’re already doing this — by showing up tonight",
      ] },
      { header: "Don’t forget", items: [
        "Smoking → earlier menopause, worse hot flashes, faster bone loss",
        "The six pillars: eat, move, mind, sleep, substances, relationships",
        "Multidisciplinary approaches improve adherence and outcomes",
      ] },
    ],
    band: "**Sleep, stress, food, movement, connection — and cutting what works against you.** That’s the foundation. Everything else, HRT included, works better built on top of it.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera lifts from the tarn to a broad granite shelf where a stand of pines stands together in warm light; glass fades." },
    notes:
      "\"To round out the lifestyle section — the small things that aren't small. A 2025 Climacteric " +
      "review endorsed a six-pillar lifestyle-medicine framework: healthy eating, physical activity, " +
      "mental well-being, avoiding risky substances, restorative sleep, and healthy relationships — " +
      "multidisciplinary care improved adherence and outcomes. [ref 12]\"\n\nConnection: \"Family support and resilience independently predicted fewer " +
      "symptoms in 732 perimenopausal women; community social support meant less severe symptoms; women " +
      "in social groups were more active with milder climacteric and depressive symptoms. [refs 15–17] " +
      "Community isn't a luxury — it's a biological buffer. The women who do best aren't doing it alone " +
      "— which is exactly what you're doing by being here.\"\n\nSmoking: \"Brief — smoking means " +
      "earlier menopause, worse vasomotor symptoms, accelerated bone loss.\"\n\nBottom line: \"Sleep, " +
      "stress, food, movement, connection, and cutting the things that work against you — that's the " +
      "foundation. Everything else, HRT included, works better on top of it.\"",
  },

  // ── HORMONES & CARE ────────────────────────────────────────────────────
  {
    id: "s19b", num: 20, navLabel: "Still feel off?", kind: "statement",
    glass: "light", panel: "center", still: "19b-threshold",
    eyebrow: "doing everything right — and still off?",
    bigText: ["So you’re doing all of this —", "and you still feel “off.”"],
    subhead: "Moving, eating, sleeping, managing stress — that’s the foundation, and it’s powerful. But sometimes it isn’t enough on its own. When the symptoms don’t budge, it’s **not a willpower problem.** It usually means the missing piece is the hormones themselves.",
    footnote: "**This is where we talk about HRT — not as a last resort, but as the right tool at the right time.**",
    transition: { dissolve: "fade", durationS: 2.5, motion: "From the sheltered grove, the camera crests a high mountain pass, a new sunlit valley opening beyond; glass fades." },
    notes:
      "\"Here's the honest part. You can do everything we've talked about — move, eat, sleep, manage " +
      "stress — and still feel off. Still not sleeping. Still foggy, still flat, still having hot " +
      "flashes.\"\n\n\"If that's you, hear this clearly: it is NOT a willpower problem, and it is NOT " +
      "failure. Lifestyle is the foundation — but for a lot of women it isn't enough on its own, " +
      "because the thing that's actually missing is the hormone itself. No amount of protein or sleep " +
      "hygiene replaces estrogen.\"\n\n\"So this isn't giving up on the natural approach — it's " +
      "finishing it. That's where hormone therapy comes in, and it's the right tool at the right time. " +
      "Let's talk about what that actually looks like in 2026.\"",
  },
  {
    id: "s20", num: 20, navLabel: "HRT in 2026", kind: "table",
    glass: "light", panel: "right", still: "20-clinic-table",
    headline: "Hormones are a real option — and not all equal",
    callout: "Nov 2025: the FDA pulled the scary boxed warnings off menopausal hormone therapy.",
    table: {
      headers: ["Option", "What you should know"],
      rows: [
        ["Transdermal estradiol (patch / gel)", "No demonstrated clot risk. The modern default."],
        ["Oral estradiol", "Higher clot risk than transdermal."],
        ["Micronized progesterone (bioidentical)", "Better safety profile than synthetics. Also aids sleep."],
        ["Synthetic progestins", "The old WHI formulation. Worse profile."],
        ["Pellets", "Can’t titrate, can’t reverse quickly. Be cautious."],
        ["Fezolinetant (Veozah)", "Non-hormonal. Targets the brain mechanism of hot flashes."],
      ],
    },
    transition: { dissolve: "fade", durationS: 3, motion: "Camera glides to a serene high alpine basin dotted with still tarns at golden hour; glass fades." },
    notes:
      "\"If your gut says 'maybe it's hormones' — listen, and find someone who'll listen back. And " +
      "know that not all HRT is the same.\"\n\nTransdermal estradiol: \"Patch or gel bypasses the " +
      "liver; large studies show no increased clot risk — unlike oral. The modern default.\"\n\n" +
      "Micronized progesterone: \"Bioidentical, better breast-cancer profile than old synthetic " +
      "progestins, and it helps sleep.\"\n\nPellets: \"I'd avoid them — can't adjust the dose, can't " +
      "reverse it quickly.\"\n\nFezolinetant (Veozah): \"Non-hormonal, FDA-approved 2023, for hot " +
      "flashes — real option if hormones aren't right for you.\"\n\n\"And Nov 2025 the FDA finally " +
      "removed the boxed warnings — the science had changed; the label hadn't. Be wary of clinics " +
      "that start all three hormones day one, or push pellets.\"\n\n\"And remember: every medication " +
      "carries some risk — but so does doing nothing, and doing nothing is often the bigger risk.\"",
  },
  {
    id: "s20b", num: 21, navLabel: "What about sex?", kind: "markerList",
    glass: "light", panel: "center", still: "21b-openlight",
    eyebrow: "the question no one asks out loud",
    headline: "What about sex?",
    subAccent: "ACOG encourages clinicians to bring it up — since most patients and most clinicians won’t.",
    subhead: "Because low desire is **real, common, and treatable** — about **half** of midlife women feel it — yet almost no one says it out loud.",
    markerList: [
      { label: "First, the caveat", text: "Sometimes low desire is about the **relationship** — a real, separate conversation. But if you still love and want your partner and the spark *still* faded, that’s biology." },
      { label: "Good for you — and for you two", text: "On nights people have sex: **better sleep, lower blood pressure, less stress, more endorphins**, fewer heart events. And intimacy is connective tissue for the relationship — named and treated, it can **bring couples back together.**" },
    ],
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera lifts from the still tarns toward warm sun breaking through pines into a bright clearing; glass fades." },
    notes:
      "\"We're going to talk about this on purpose — because it's a real, common, treatable problem, " +
      "and yet almost nobody brings it up. ACOG actually tells us as clinicians to raise it with " +
      "patients, because if we don't, no one will. So: what about sex?\"\n\nThe caveat " +
      "(say it first, warmly): \"Sometimes desire drops because of the relationship itself — resentment, " +
      "disconnection, a partner you've stopped feeling safe with. That's real, and it's a whole " +
      "different conversation, often a counselor's. But if you genuinely still love and want your " +
      "partner and the spark faded anyway — that's biology, not a character flaw, and it's " +
      "fixable.\"\n\nWhy it's " +
      "worth fixing — sex is good for you: \"A study of 8,452 people: on nights " +
      "with sex, people had better sleep, lower blood pressure, less stress, more positive mood and " +
      "coping the next morning — regardless of gender or relationship status. It tracks with fewer " +
      "cardiovascular events and better self-reported health. [refs 15–17] It's a lifestyle " +
      "intervention nobody puts on a prescription pad.\"\n\nThe relationship: \"Intimacy is connective " +
      "tissue. Unspoken, a fading sex life strains a marriage; named and treated, addressing it can " +
      "genuinely bring couples back together.\"\n\nScope + ACOG: \"This is common — sexual complaints " +
      "rise from 42% to 88% across the transition; about half of midlife women have clinically " +
      "significant, treatable sexual dysfunction; and a third say sex stays very important to them. " +
      "[refs 1–2] One nuance: low desire rises with age, but the DISTRESS about it peaks in midlife — " +
      "this window is exactly when women are most bothered (NEJM 2024). And ACOG's practice bulletin " +
      "says the clinician should start this conversation, because patients won't. [ref 4] Say it " +
      "plainly: if your doctor never asked about your sex life, it's not that it doesn't matter — " +
      "they weren't trained to ask.\"\n\n(Mechanism, if asked — the 'triple hit': GSM thins and dries " +
      "tissue and it's progressive [refs 4–5]; low estrogen blunts nitric-oxide and dopamine desire " +
      "pathways [ref 1]; and pain drives an avoidance→atrophy cycle [ref 1].)",
  },
  {
    id: "s20c", num: 21, navLabel: "Sex — what helps", kind: "columns",
    glass: "light", panel: "center", still: "21c-intertwined",
    eyebrow: "this is fixable — here’s how",
    headline: "And almost all of it is treatable",
    columns: [
      { header: "Vaginal estrogen — start here", items: [
        "First-line for dryness, pain & recurrent UTIs (ACOG, Level A)",
        "Local & safe for nearly everyone — and wildly underused",
      ] },
      { header: "Testosterone — for desire", items: [
        "Best-evidence option for distressing low desire (HSDD)",
        "A modest but real benefit — and underused.",
      ] },
      { header: "Pelvic floor PT — if it hurts", items: [
        "21 RCTs: better arousal, orgasm & pain — no side effects",
        "ACOG first-line for painful sex",
        "If sex hurts, the answer isn’t to stop — it’s a pelvic floor PT",
      ] },
      { header: "Rethink desire — it’s responsive", items: [
        "Desire often shifts from spontaneous → responsive — start, and the wanting follows",
        "Scheduled sex isn’t lame — planning it works",
        "Mindfulness lifts desire & arousal — being present, not in your head",
        "Talk with your partner",
      ] },
    ],
    band: "**And don’t forget lifestyle — exercise and sleep move this too:** exercise improves desire, arousal, lubrication & blood flow (~15% gain in sexual-function scores), and poor sleep raises sexual-dysfunction risk ~50%.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera drifts to two slender aspens grown together, glowing in warm golden light; glass fades." },
    notes:
      "\"Here's the part that should leave you hopeful: almost all of this is fixable.\"\n\nVaginal " +
      "estrogen: \"First-line for GSM, ACOG Level A. Improves lubrication, blood flow, tissue, painful " +
      "sex, and recurrent UTIs. It's LOCAL — minimal absorption, no meaningful rise in serum estrogen — " +
      "safe for nearly everyone, including most breast-cancer survivors with oncology coordination; a " +
      "2025 review found no increased recurrence with low-dose vaginal estrogen. Cream, tablet, ring, " +
      "insert — all equally effective; it's a chronic condition, so ongoing use is appropriate. Hugely " +
      "underused — the FDA dropped its boxed warning in late 2025. One caveat: women on aromatase " +
      "inhibitors should coordinate with their oncologist. [refs 4,6–9]\"\n\nTestosterone: \"The " +
      "best-evidence drug for HSDD specifically. The 2019 Global Consensus Statement: transdermal " +
      "testosterone at premenopausal physiologic doses gives a moderate, meaningful benefit — about one " +
      "more satisfying sexual event a month, plus better desire, arousal, orgasm, pleasure, and less " +
      "distress. Transdermal ONLY — oral harms lipids. No FDA-approved female formulation in the US, so " +
      "it's off-label; Australia has a 1% female cream. Avoid pellets and compounded prep — " +
      "supraphysiologic risk. Side effects at proper doses are mild — maybe acne or a little extra hair, " +
      "no voice change or clitoromegaly. Trial 3–6 months, check levels at baseline and 3–6 weeks, stop " +
      "at 6 months if no response. Long-term data past 2 years are limited. [refs 3,4,8,10,11]\"\n\n" +
      "Pelvic floor PT: \"The underused gem. A 2024 meta-analysis of 21 RCTs: pelvic floor muscle " +
      "training improved arousal, orgasm, satisfaction, pain, and overall function — no side effects. A " +
      "2025 meta-analysis found moderate effects on sexual function and strong effects on genital " +
      "discomfort; 12-week programs work best. ACOG first-line for genito-pelvic pain. [refs 4,12–14] " +
      "The line: if sex hurts, the answer isn't to stop having sex — it's to see a pelvic floor PT.\"\n\n" +
      "Sex is good for you: \"A study of 8,452 people: on nights with sex, people had better sleep, " +
      "lower blood pressure, less stress, more positive mood and coping the next morning — regardless of " +
      "gender or relationship status. Sexual activity tracks with fewer cardiovascular events and better " +
      "self-reported health. [refs 15–17] It's a lifestyle intervention nobody puts on a prescription " +
      "pad.\"\n\nRethink desire (this one frees people): \"Two kinds of desire. Spontaneous desire — " +
      "wanting sex out of the blue — is the model we're all sold, and it fades for many women in " +
      "midlife. Responsive desire shows up AFTER intimacy begins: you start with closeness and " +
      "willingness, and the wanting follows. That's not broken — it's how most long-term desire works. " +
      "The shift: don't wait to feel in the mood; be open to starting and let desire catch up. So " +
      "scheduled sex isn't lame — planning intimacy is exactly how responsive desire gets going. " +
      "Mindfulness helps too: Lori Brotto's mindfulness-based sex therapy improves desire, arousal, and " +
      "satisfaction and lowers distress, mostly by getting women out of their heads and present in " +
      "their bodies during sex. And lubricants or moisturizers bridge the gap — water- or " +
      "silicone-based, avoid glycerin.\"\n\n" +
      "Bridge (great with partners present): \"Partners, hear this: if her desire has changed, " +
      "it is NOT about you, and not about the relationship. It's biology — the same hormones behind her " +
      "sleep, mood, bones, and brain. Like everything tonight, it's treatable — but she needs you to " +
      "understand it, not take it personally, and help her get care.\"\n\nDon't forget lifestyle: " +
      "\"This loops back to the whole talk. Exercise improves desire, arousal, lubrication, blood flow, " +
      "and body image and lowers sexual distress — about a 15% improvement in sexual-function scores; pelvic floor work " +
      "and yoga hit it most directly. And sleep matters — poor sleep raises sexual-dysfunction risk " +
      "around 50%, so fixing sleep removes a major barrier. The same foundation we've talked about all " +
      "night moves this too.\"\n\nPractical: start with vaginal " +
      "estrogen for any dryness/pain; pelvic floor PT if sex hurts; ask about testosterone if desire " +
      "dropped and it's distressing; lubricants/moisturizers as a bridge (water- or silicone-based, " +
      "avoid glycerin); and talk to your partner — it's a medical condition, not a verdict on the " +
      "relationship.",
  },
  {
    id: "s22", num: 22, navLabel: "Find a provider", kind: "bullets",
    glass: "light", panel: "left", still: "22-two-chairs", bulletStyle: "check",
    headline: "Find someone who actually listens",
    bullets: [
      "**Listens** — and personalizes, instead of running a protocol",
      "Will talk through the **lifestyle levers** — movement, sleep, nutrition, stress — not just hand you a prescription",
      "Checks your **metabolic health** first",
      "Won’t start all three hormones on day one",
      "Won’t reach for pellets without a real reason",
    ],
    footnote: "Menopause Society certified: **menopause.org**. Hormones take time — most 15-minute visits simply can’t do this well.",
    transition: { dissolve: "fade", durationS: 2.5, motion: "Camera rises to an inviting trail winding up toward sunlit peaks; glass fades." },
    notes:
      "\"Here's what to look for in a provider.\" Walk the list briefly.\n\n\"One sentence on me, then " +
      "I'll get out of my own way: I run a direct primary care clinic partly because this work needs " +
      "TIME — you can't do hormones well in a 15-minute visit. Find someone who has the time, whether " +
      "that's me or someone else.\"\n\n\"The Menopause Society has a directory at menopause.org — " +
      "certified menopause practitioners. That credential actually means something.\"",
  },
  {
    id: "s23", num: 23, navLabel: "Ask your doctor", kind: "numbered",
    glass: "light", panel: "right", still: "23-notebook",
    eyebrow: "take a photo of this one",
    headline: "Take these to your next visit",
    numbered: [
      "“Could my symptoms be **perimenopause**?”",
      "“Should we check a baseline **DEXA** (bone scan)?”",
      "“Is **transdermal estradiol** right for me?”",
      "“Is **vaginal estrogen** an option for me?”",
      "“What’s my **metabolic baseline** — fasting insulin, lipids, A1c?”",
    ],
    transition: { dissolve: "fade", durationS: 2, motion: "Camera arrives at a high overlook over layered ridgelines — the planning vantage; glass fades." },
    notes:
      "\"Most of you will talk to a doctor — or someone like me — about tonight. Five questions that " +
      "save time:\"\n\n1. 'Could this be perimenopause?' — forces the conversation; if they dismiss " +
      "it, that's your answer about staying.\n2. 'Baseline DEXA?' — know your starting bone density.\n" +
      "3. 'Transdermal estradiol?' — naming the formulation signals you've done your homework.\n4. " +
      "'Vaginal estrogen?' — most won't bring it up.\n5. 'Metabolic baseline?' — fasting insulin, " +
      "lipids, A1c. The soil decides how well everything else works.\n\n\"Take a photo now if it " +
      "helps — I'll leave it up at the end.\"",
  },
  {
    id: "s24", num: 24, navLabel: "For the partners", kind: "numbered",
    glass: "light", panel: "bottom", still: "24-couple-bench",
    headline: "Partners — your job",
    numbered: [
      "**Believe her** — even when the first provider doesn’t.",
      "**Ask “what are you noticing? what would help?”** — not *“you’ve changed.”*",
      "**Go to the appointment.** This is a team effort.",
    ],
    transition: { dissolve: "fade", durationS: 3, motion: "Camera lifts to twin peaks standing side by side in the last golden light; glass fades." },
    notes:
      "\"For the partners — you've sat through a lot. Here's what to do with it.\"\n\nBelieve her: " +
      "\"When she's told her labs are normal and it's all in her head — believe her, and help her " +
      "find the next person to ask. The system has had a 20-year blind spot here.\"\n\nAsk the right " +
      "question: \"Not 'you've changed.' Try 'what are you noticing? what would help?' Completely " +
      "different conversation.\"\n\nGo to the appointment: \"If she wants you there. My best outcomes " +
      "are couples in it together. Lift with her, cook the protein, protect her sleep — before she " +
      "has to convince you.\"",
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────
  {
    id: "s25", num: 25, navLabel: "The close", kind: "statement",
    glass: "light", panel: "center", still: "25-sunrise", suppressFooter: true,
    bigText: ["You don’t have to overhaul your life this week."],
    subhead: "Track your symptoms. Lift something heavy. Eat the protein. Protect your sleep. And if your gut says something’s off — **listen, and find someone who’ll listen back.**",
    transition: { dissolve: "lift", durationS: 3.5, motion: "Camera ascends through dusk and dawn back to the opening ridge, now at golden sunrise; glass lifts away." },
    notes:
      "\"You don't have to do anything dramatic this week. Track your symptoms for a month. Lift " +
      "something heavy. Eat more protein. Get to bed earlier. And if your gut says 'just manage it' " +
      "isn't the answer — listen to that.\"\n\n\"The window is real. The science is clearer than it's " +
      "ever been. What you do next is up to you. Thank you for being here.\" Pause for applause, then " +
      "Q&A.",
  },
  {
    id: "s26", num: 26, navLabel: "Take it home", kind: "qr",
    glass: "light", panel: "center", still: "25-sunrise", suppressFooter: true,
    headline: "Three things to take home",
    qr: {
      url: clinicFacts.contact.siteUrl,
      takeaways: [
        "There’s a **window** — and it closes sooner than you think.",
        "What’s happening is **real, physiological, and treatable**.",
        "Exercise, protein, and sleep change everything — **start today**.",
      ],
      socials: [
        { label: "Instagram", url: "https://www.instagram.com/coshealthcollective/" },
        { label: "TikTok", url: "https://www.tiktok.com/@cos.health.collec" },
      ],
    },
    footer: `Logan Crist, PA-C • Colorado Springs Health Collective • ${clinicFacts.contact.domain}`,
    transition: { dissolve: "fade", durationS: 1.5, motion: "Camera holds the sunrise ridge; old glass fades, the takeaways panel settles in." },
    notes:
      "\"I'll leave this up for Q&A — take a picture; it's the whole talk in three lines. Scan the QR " +
      "for the handout, a symptom tracker, my info, or to book — and follow us on Instagram or TikTok " +
      "for more.\"\n\nQ&A to expect: normal labs but " +
      "still perimenopausal; pellets; breast-cancer history + hormones; 'too late at 65?'; " +
      "testosterone for women (evidence in postmenopausal low libido per Global Consensus 2019; " +
      "weaker in peri); how long on HRT; skeptical partner; does diet really matter.\n\nRED FLAGS — " +
      "address and refer: postmenopausal bleeding (always evaluate); severe symptoms under 40 " +
      "(possible primary ovarian insufficiency); any suicidal ideation.",
  },
];
