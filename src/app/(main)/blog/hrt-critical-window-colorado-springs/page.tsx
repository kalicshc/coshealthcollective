import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Critical Window Hypothesis for HRT: What the Research Actually Shows | CSHC Colorado Springs",
  description:
    "An evidence-based look at the 'critical window' or timing hypothesis for hormone replacement therapy — what the WHI, ELITE, DOPS, and KEEPS trials found, where the science is still unsettled, and what major medical bodies currently recommend. Colorado Springs Health Collective.",
  alternates: { canonical: "/blog/hrt-critical-window-colorado-springs" },
  openGraph: {
    title: "The Critical Window Hypothesis for HRT: What the Research Actually Shows",
    description:
      "How a single 2002 trial reshaped HRT prescribing — and why the timing hypothesis became one of the most consequential ongoing debates in women's medicine.",
    url: "https://coshealthcollective.com/blog/hrt-critical-window-colorado-springs",
    type: "article",
  },
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const toc = [
  { id: "the-shock", label: "The 2002 WHI Shock" },
  { id: "the-hypothesis", label: "The Critical Window Hypothesis" },
  { id: "the-evidence", label: "What the Trials Found" },
  { id: "what-studies-missed", label: "What the Studies Couldn't Capture" },
  { id: "where-it-stands", label: "Where the Science Stands Now" },
  { id: "what-this-means", label: "What This Means in Practice" },
  { id: "faq", label: "FAQ" },
];

const trials = [
  {
    name: "WHI (2002)",
    full: "Women's Health Initiative",
    citation: "Rossouw et al., JAMA 2002",
    population: "16,608 postmenopausal women, mean age 63 (estrogen + progestin arm)",
    formulation: "Oral conjugated equine estrogens + medroxyprogesterone",
    finding:
      "Trial stopped early. Small absolute increases in coronary heart disease, stroke, breast cancer, and venous thromboembolism over ~5 years. Decreased colorectal cancer and hip fracture.",
    color: "hsl(350, 70%, 65%)",
    colorBg: "hsla(350, 70%, 65%, 0.08)",
  },
  {
    name: "ELITE (2016)",
    full: "Early versus Late Intervention Trial with Estradiol",
    citation: "Hodis et al., NEJM 2016",
    population: "643 postmenopausal women, stratified by years since menopause (< 6 vs > 10)",
    formulation: "Oral estradiol (with vaginal progesterone gel for women with a uterus)",
    finding:
      "Carotid intima-media thickness — a marker of subclinical atherosclerosis — progressed more slowly in the estradiol group than the placebo group in women within 6 years of menopause, but not in women more than 10 years out.",
    color: "hsl(177, 70%, 59%)",
    colorBg: "hsla(177, 70%, 59%, 0.08)",
  },
  {
    name: "DOPS (2012)",
    full: "Danish Osteoporosis Prevention Study",
    citation: "Schierbeck et al., BMJ 2012",
    population: "1,006 recently postmenopausal women, mean age ~50, followed for ~10 years (open-label RCT)",
    formulation: "Oral estradiol ± norethisterone acetate",
    finding:
      "After ~10 years of treatment, the HRT group had a significantly lower combined endpoint of mortality, heart failure, or myocardial infarction. The trial was not powered to assess breast cancer with full confidence.",
    color: "hsl(200, 70%, 60%)",
    colorBg: "hsla(200, 70%, 60%, 0.08)",
  },
  {
    name: "KEEPS (2014)",
    full: "Kronos Early Estrogen Prevention Study",
    citation: "Harman et al., Annals of Internal Medicine 2014",
    population: "727 healthy women within 3 years of menopause",
    formulation: "Oral conjugated equine estrogens or transdermal estradiol, both with cyclic micronized progesterone",
    finding:
      "After 4 years, neither regimen significantly changed carotid intima-media thickness or coronary artery calcium versus placebo. Some symptom and mood improvements were noted.",
    color: "hsl(45, 90%, 60%)",
    colorBg: "hsla(45, 90%, 60%, 0.08)",
  },
  {
    name: "WHI 18-Year Follow-Up (2017)",
    full: "Long-term mortality analysis of WHI participants",
    citation: "Manson et al., JAMA 2017",
    population: "27,347 original WHI participants, followed cumulatively for ~18 years",
    formulation: "Same WHI regimens (CEE alone or CEE + MPA)",
    finding:
      "Neither hormone therapy regimen was associated with increased all-cause mortality, cardiovascular mortality, or total cancer mortality compared with placebo over long-term follow-up.",
    color: "hsl(280, 70%, 65%)",
    colorBg: "hsla(280, 70%, 65%, 0.08)",
  },
];

const faqs = [
  {
    q: "What is the 'critical window' for hormone therapy?",
    a: "It's a hypothesis — sometimes called the 'timing hypothesis' — proposing that estrogen's cardiovascular effects depend on when therapy is started relative to menopause. The general idea is that initiating estrogen in early postmenopausal women (typically under 60 or within 10 years of menopause onset), before significant atherosclerosis develops, may have a different risk-benefit profile than initiating it in late postmenopausal women with established vascular disease. It is a hypothesis, not a settled conclusion.",
  },
  {
    q: "Why did the 2002 WHI trial cause such alarm?",
    a: "WHI was the largest randomized placebo-controlled trial of hormone therapy ever conducted. When the estrogen + progestin arm was stopped early in 2002, the trial reported absolute increases in coronary heart disease, stroke, breast cancer, and venous thromboembolism. Those headlines shaped patient and physician perception for nearly two decades, and global hormone therapy prescribing dropped sharply.",
  },
  {
    q: "Did later analyses change the picture?",
    a: "They added nuance. Re-analyses of WHI data stratified by age and years since menopause showed that the women enrolled were, on average, in their early 60s — about a decade past menopause. Subgroup analyses suggested risk-benefit varied with age at initiation. The 2017 long-term WHI follow-up (Manson et al., JAMA) reported no increase in all-cause mortality from either regimen over ~18 years. Separate trials (ELITE, DOPS, KEEPS) were designed specifically to examine the timing question.",
  },
  {
    q: "Is the critical window hypothesis proven?",
    a: "No. It's supported by some data — most notably ELITE and DOPS — but reasonable experts disagree about how strong and how clinically actionable the evidence is. KEEPS, designed to detect cardiovascular benefit in early postmenopausal women, did not show a significant effect on the imaging endpoints it measured. The honest summary is: there's mechanistic plausibility and supporting evidence for a timing-dependent effect, but no single trial has definitively settled the question, and the relevant endpoints are difficult to study.",
  },
  {
    q: "Are all hormone therapies the same?",
    a: "No. Oral conjugated equine estrogens (used in WHI), oral estradiol, and transdermal estradiol have different metabolic and vascular profiles. Different progestogens (synthetic vs. micronized progesterone) also differ. Trials studied specific formulations, and findings from one regimen don't automatically generalize to another. Major medical societies generally consider transdermal estradiol to have a more favorable venous thromboembolism profile than oral preparations, though risks and benefits depend on the individual.",
  },
  {
    q: "What do major medical societies currently say?",
    a: "The North American Menopause Society's 2022 position statement concludes that for women under 60 or within 10 years of menopause onset who have bothersome vasomotor symptoms or elevated risk of bone loss, the benefit-risk ratio of hormone therapy is generally favorable in the absence of contraindications. The Endocrine Society and ACOG have issued broadly consistent guidance. None of these bodies recommend hormone therapy for the sole purpose of preventing cardiovascular disease.",
  },
];

export default function HRTCriticalWindowPost() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Critical Window Hypothesis for HRT: What the Research Actually Shows",
            description:
              "An evidence-based look at the timing hypothesis for hormone replacement therapy — what the WHI, ELITE, DOPS, and KEEPS trials found, and where the science remains unsettled.",
            datePublished: "2026-05-11",
            dateModified: "2026-05-11",
            author: { "@type": "Organization", name: "Colorado Springs Health Collective" },
            publisher: {
              "@type": "Organization",
              name: "Colorado Springs Health Collective",
              url: "https://coshealthcollective.com",
              logo: { "@type": "ImageObject", url: "https://coshealthcollective.com/logo-main.png" },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://coshealthcollective.com/blog/hrt-critical-window-colorado-springs",
            },
            image: "https://coshealthcollective.com/blog/hrt-critical-window-hero.jpg",
            about: [
              { "@type": "Thing", name: "Hormone Replacement Therapy" },
              { "@type": "Thing", name: "Menopause" },
              { "@type": "Thing", name: "Women's Health Initiative" },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        {/* Hero */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image
            src="/blog/hrt-critical-window-hero.jpg"
            alt="Hormone replacement therapy and the critical window hypothesis — Colorado Springs Health Collective"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(330, 70%, 65%)", color: "hsl(210, 32%, 10%)" }}>
                Women's Health
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                The Critical Window Hypothesis for HRT: What the Research Actually Shows
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>May 2026 · 14 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Key stat callout */}
            <div className="rounded-2xl p-8 mb-10 text-center" style={{ background: "linear-gradient(135deg, hsla(330,70%,55%,0.15), hsla(280,70%,55%,0.15))", border: "1px solid hsla(330,70%,55%,0.3)" }}>
              <div className="text-6xl font-black mb-2" style={{ color: "hsl(330, 70%, 70%)" }}>~63</div>
              <div className="text-lg font-semibold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>Mean Age of Women in the 2002 WHI Trial</div>
              <div className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>Roughly a decade past the average age of natural menopause — a detail that quietly reshaped the entire debate</div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { num: "2002", label: "Year WHI E+P arm stopped" },
                { num: "<60", label: "Age window in NAMS 2022 guidance" },
                { num: "~10 yr", label: "Years-since-menopause threshold" },
                { num: "18 yr", label: "WHI long-term follow-up duration" },
              ].map((s) => (
                <div key={s.num} className="rounded-2xl p-5 text-center" style={{ background: "hsla(330, 70%, 55%, 0.10)", border: "1px solid hsla(330, 70%, 55%, 0.22)" }}>
                  <div className="text-2xl font-black leading-none mb-1" style={{ color: "hsl(330, 70%, 72%)" }}>{s.num}</div>
                  <div className="text-xs leading-tight" style={{ color: "hsl(0, 0%, 65%)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table of contents */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.8)", border: "1px solid hsla(330,70%,55%,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>In This Article</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "hsl(210, 30%, 80%)" }}>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(330, 70%, 65%)" }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Intro */}
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsl(210, 25%, 85%)" }}>
              Few topics in modern medicine have moved as dramatically — and as confusingly — as hormone replacement therapy. A single high-profile trial in 2002 changed how an entire generation of clinicians prescribed estrogen, and an entire generation of women decided whether to take it. In the years since, a quieter conversation has been building around something called the <em>critical window hypothesis</em> — also known as the <em>timing hypothesis</em>. It's a useful idea to understand, especially if you live in Colorado Springs and are weighing perimenopause or postmenopause care. This article walks through what the hypothesis proposes, what the major trials actually showed, what the trials couldn't capture, and where the science currently stands. No outrageous claims. No marketing. Just the evidence and its limits.
            </p>

            {/* The 2002 shock */}
            <div id="the-shock" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>The 2002 WHI Shock</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                The Women's Health Initiative was the largest randomized, placebo-controlled trial of hormone therapy ever conducted. It enrolled tens of thousands of postmenopausal women across the United States in the 1990s and was designed to answer, among other things, whether long-term hormone therapy reduced cardiovascular disease in postmenopausal women — a hypothesis that observational studies up to that point had supported.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                In July 2002, the estrogen-plus-progestin arm was halted early. The published results (Rossouw et al., <em>JAMA</em> 2002) reported small but statistically significant absolute increases in coronary heart disease, stroke, breast cancer, and venous thromboembolism in the treatment group over approximately five years, alongside decreases in colorectal cancer and hip fracture. The headlines were stark, the prescribing change was immediate, and global use of hormone therapy fell sharply.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                But buried in the trial design was a detail that would take years to fully digest: the average woman in WHI was about 63 years old at enrollment — roughly a decade past the typical age of natural menopause. WHI was not, primarily, a trial of women starting hormone therapy <em>at</em> menopause. It was a trial of women starting hormone therapy long after.
              </p>
            </div>

            {/* The hypothesis */}
            <div id="the-hypothesis" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>What the Critical Window Hypothesis Actually Proposes</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                The critical window — or timing — hypothesis is straightforward in its outline: the cardiovascular effects of estrogen may depend on when therapy is initiated relative to the onset of menopause.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                The mechanistic argument, supported by preclinical and observational data, is that estrogen interacts with healthy endothelium (the lining of blood vessels) differently than it does with endothelium already affected by atherosclerosis. In young, healthy blood vessels, estrogen appears to support vasodilation, nitric oxide signaling, and a generally favorable lipid profile. In older vessels with established plaque, estrogen's effects may be neutral — or potentially destabilizing — depending on the specific receptor environment.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                If true, the hypothesis predicts that hormone therapy started shortly after menopause might have a different cardiovascular risk-benefit profile than hormone therapy started a decade or more later. It does <em>not</em> claim that estrogen prevents heart disease. It claims that timing of initiation is a relevant variable that earlier trial designs may have averaged over.
              </p>
            </div>

            {/* The evidence */}
            <div id="the-evidence" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "hsl(330, 70%, 72%)" }}>What the Trials Found</h2>
              <p className="leading-relaxed mb-8" style={{ color: "hsl(210, 25%, 72%)" }}>
                Several major trials are usually cited in this conversation. Each was designed differently, used different formulations, and measured different endpoints. Read together, they tell a more nuanced story than any single headline.
              </p>

              <div className="space-y-4">
                {trials.map((t) => (
                  <div key={t.name} className="rounded-2xl p-6" style={{ background: t.colorBg, border: `1px solid ${t.color}33` }}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-3">
                      <div className="flex-shrink-0 sm:w-44">
                        <div className="text-xl font-black leading-tight" style={{ color: t.color }}>{t.name}</div>
                        <div className="text-xs mt-1" style={{ color: "hsl(0, 0%, 60%)" }}>{t.citation}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>{t.full}</h3>
                        <p className="text-sm mb-2" style={{ color: "hsl(210, 25%, 72%)" }}>
                          <span className="font-semibold" style={{ color: t.color }}>Population: </span>{t.population}
                        </p>
                        <p className="text-sm mb-3" style={{ color: "hsl(210, 25%, 72%)" }}>
                          <span className="font-semibold" style={{ color: t.color }}>Regimen: </span>{t.formulation}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>{t.finding}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What studies missed */}
            <div id="what-studies-missed" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>What These Studies Couldn't Easily Capture</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Studying hormone therapy in the population that the timing hypothesis is most about — women in their early 50s, recently postmenopausal, often symptomatic — is genuinely difficult. The following constraints are worth naming because they explain why the picture remains incomplete:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  ["Long endpoints", "Cardiovascular events take years to accumulate. A trial designed to detect a difference in heart attack or stroke rates typically needs a decade or more of follow-up. Few funders sustain that horizon, and few participants stay enrolled."],
                  ["Symptomatic enrollment is hard to placebo-control", "Many recently postmenopausal women have significant vasomotor symptoms. Asking them to accept a 50% chance of receiving placebo for years is a real ethical and practical constraint. Drop-out and crossover blur trial results."],
                  ["Formulations vary", "WHI used oral conjugated equine estrogens with medroxyprogesterone acetate. ELITE used oral estradiol. KEEPS compared oral CEE to transdermal estradiol, both with micronized progesterone. Findings from one regimen do not transfer cleanly to another."],
                  ["Observational data carry healthy-user bias", "Women who chose hormone therapy historically tended to be healthier, wealthier, and more health-engaged than women who didn't. This biased observational studies toward favorable findings — one of the reasons WHI's randomized design was so consequential."],
                  ["Age-stratified analyses are post hoc", "WHI's age subgroups were defined after the fact. Re-analyses by age and years-since-menopause are scientifically reasonable but do not carry the same statistical weight as a trial pre-specified for the timing question."],
                  ["Surrogate endpoints aren't outcomes", "ELITE and KEEPS measured imaging surrogates — carotid intima-media thickness and coronary calcium. These are reasonable markers, but they aren't heart attacks. A change in a surrogate does not guarantee a change in clinical events."],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)" }}>
                    <div className="text-sm font-bold mb-1.5" style={{ color: "hsl(330, 70%, 72%)" }}>{label}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>{text}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                None of this means the trials weren't valuable. It means that "the data" on hormone therapy is a mosaic of imperfect studies — each illuminating part of the picture, none illuminating all of it. Reasonable specialists looking at the same evidence can land in different places.
              </p>
            </div>

            {/* Where it stands */}
            <div id="where-it-stands" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>Where the Science Stands Now</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Major medical bodies have updated their positions as the post-WHI evidence has matured. A few reference points worth knowing:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  ["North American Menopause Society (NAMS), 2022", "The position statement concludes that for women under 60 or within 10 years of menopause onset who have bothersome vasomotor symptoms or elevated risk of bone loss, the benefit-risk ratio for hormone therapy is generally favorable in the absence of contraindications. NAMS does not recommend hormone therapy for the sole purpose of preventing chronic disease."],
                  ["Endocrine Society", "Clinical practice guidance broadly aligns with NAMS — individualized assessment, attention to age and years since menopause, and a preference for the lowest effective dose for the shortest duration consistent with treatment goals."],
                  ["American College of Obstetricians and Gynecologists (ACOG)", "ACOG similarly supports individualized hormone therapy for symptomatic postmenopausal women within the standard treatment window, while emphasizing that hormone therapy is not indicated for primary or secondary prevention of cardiovascular disease."],
                  ["The 2017 WHI long-term follow-up", "Manson et al. in JAMA reported that, with approximately 18 years of cumulative follow-up, neither WHI hormone therapy regimen was associated with increased all-cause mortality, cardiovascular mortality, or total cancer mortality compared with placebo. This is one of the more important data points to surface in the long debate, and it tempers some of the earlier narrative."],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)", borderLeft: "3px solid hsl(330, 70%, 65%)" }}>
                    <div className="text-sm font-bold mb-1.5" style={{ color: "hsl(330, 70%, 72%)" }}>{label}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>{text}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                The shorthand version, fairly stated: the major specialty societies treat the "under 60 or within 10 years of menopause" window as the period in which hormone therapy can be reasonably considered for appropriate symptoms or fracture risk. They do not endorse it as a cardiovascular prevention strategy, and they continue to emphasize individualization.
              </p>
            </div>

            {/* What this means */}
            <div id="what-this-means" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(330, 70%, 72%)" }}>What This Means in Practice</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                The critical window hypothesis is most useful as a framework for asking better questions — not as a prescription. A few that come up often in Colorado Springs:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6" style={{ color: "hsl(210, 25%, 82%)" }}>
                <li>What does the current evidence actually support for someone like me — including my age, time since menopause, symptom burden, family history, and personal risk profile?</li>
                <li>If hormone therapy is being considered, which formulation is appropriate? Oral vs. transdermal estradiol have different metabolic and vascular profiles. Different progestogens have different profiles too.</li>
                <li>What is hormone therapy being prescribed <em>for</em> — vasomotor symptoms, bone protection, genitourinary symptoms, mood, sleep — and what is the realistic expectation for each?</li>
                <li>What is the plan for re-evaluating after the first 6–12 months, and what would change the plan?</li>
                <li>How does this fit alongside the rest of the cardiovascular, metabolic, and bone-health picture — sleep, strength training, protein intake, alcohol, blood pressure, lipids?</li>
              </ul>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                None of those questions have generic answers, and none of them are meant to be answered by a blog post. They're meant to be answered in a real conversation with a clinician who has time to look at the whole picture — which is the kind of visit our team in Colorado Springs is built around.
              </p>
            </div>

            {/* FAQ */}
            <div id="faq" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(330, 70%, 72%)" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.q} className="rounded-xl overflow-hidden group" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold list-none" style={{ color: "hsl(0, 0%, 95%)" }}>
                      {faq.q}
                      <ChevronRight className="w-4 h-4 flex-shrink-0 group-open:rotate-90 transition-transform" style={{ color: "hsl(330, 70%, 72%)" }} />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 78%)" }}>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Internal links */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.6)", border: "1px solid hsla(330, 70%, 55%, 0.15)" }}>
              <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(330, 70%, 72%)" }}>Explore More</p>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <Link href="/hormone/womens-health" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(330, 70%, 65%)" }} />
                  Women's Health Overview
                </Link>
                <Link href="/hormone" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(330, 70%, 65%)" }} />
                  Hormone & Metabolic Clinic
                </Link>
                <Link href="/direct-primary-care" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(330, 70%, 65%)" }} />
                  Direct Primary Care
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.5)", border: "1px solid hsla(0, 0%, 60%, 0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(0, 0%, 65%)" }}>Educational Information</p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 20%, 70%)" }}>
                This article is intended for educational purposes only and is not medical advice. Hormone therapy carries individual risks and benefits that depend on personal health history, family history, current medications, and symptoms. Nothing in this article should be interpreted as a recommendation to start, continue, or stop any medication. Please discuss any decisions about hormone therapy with a qualified clinician who knows your full medical history.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "linear-gradient(135deg, hsla(330,70%,55%,0.15), hsla(280,70%,55%,0.15))", border: "1px solid hsla(330,70%,55%,0.3)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(330, 70%, 72%)" }}>Colorado Springs Health Collective</p>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
                A Real Conversation About Your Options
              </h3>
              <p className="mb-6 max-w-lg mx-auto" style={{ color: "hsl(210, 30%, 80%)" }}>
                Our Colorado Springs hormone and metabolic clinic offers visits long enough to actually talk through your symptoms, your history, and what the current evidence does and doesn't support for you.
              </p>
              <a
                href={MEET_GREET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                style={{ background: "linear-gradient(135deg, hsl(330,70%,60%), hsl(280,70%,60%))", color: "hsl(0, 0%, 100%)", boxShadow: "0 8px 32px hsla(330,70%,50%,0.3)" }}
              >
                Book a Meet & Greet
              </a>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80">
                  <Phone className="w-4 h-4" style={{ color: "hsl(330, 70%, 72%)" }} />
                  <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>(719) 824-4716</span>
                </a>
                <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80">
                  <Mail className="w-4 h-4" style={{ color: "hsl(330, 70%, 72%)" }} />
                  <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>dpc@coshealthcollective.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
