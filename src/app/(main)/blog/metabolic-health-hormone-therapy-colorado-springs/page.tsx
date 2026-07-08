import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, ChevronRight } from "lucide-react";
import { clinicFacts } from "@/lib/clinicFacts";
import { BlogCtaBlock } from "@/components/BlogCtaBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Why Metabolic Health Is the Foundation of Safe, Effective Hormone Therapy | CSHC Colorado Springs",
  description:
    "Hormones don't act in isolation — they enter a complex system of enzymes, receptors, and metabolic pathways that decide whether therapy helps or harms. A clinical look at metabolic health, COMT and ApoE genetics, the brain–amyloid connection, and why men live in the same loop. Colorado Springs Health Collective.",
  alternates: { canonical: "/blog/metabolic-health-hormone-therapy-colorado-springs" },
  openGraph: {
    title: "Why Metabolic Health Is the Foundation of Safe, Effective Hormone Therapy",
    description:
      "Inflammation, COMT, ApoE, amyloid, and the 'healthy cell bias' — the upstream factors that decide whether hormone therapy heals or quietly causes harm.",
    url: "https://coshealthcollective.com/blog/metabolic-health-hormone-therapy-colorado-springs",
    type: "article",
  },
};


const toc = [
  { id: "whole-person", label: "The Whole-Person Approach" },
  { id: "inflammation", label: "Inflammation & Hormone Processing" },
  { id: "brain", label: "Brain, Estrogen & Amyloid" },
  { id: "genetics", label: "Genetics: COMT & ApoE" },
  { id: "men", label: "Men & Testosterone" },
  { id: "approach", label: "Our Approach: Optimize First" },
  { id: "bottom-line", label: "The Bottom Line" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    q: "Why test metabolic health before starting hormone therapy?",
    a: "Inflammation, insulin resistance, and body composition change how your body processes hormones. The same therapy can land very differently depending on the underlying metabolic terrain — so we assess that terrain before we prescribe. It's a personalization step, not an extra hurdle: it helps us pick the right formulation, the right starting dose, and the right monitoring plan for you.",
  },
  {
    q: "What is COMT genotype, and why does it matter for hormone therapy?",
    a: "COMT (catechol-O-methyltransferase) is the enzyme that safely clears estrogen breakdown products from the body and brain. People with the Val158Met 'Met/Met' variant have significantly lower enzyme activity, meaning estrogen and its byproducts linger longer. For these individuals, lower starting doses and stronger nutritional support for the methylation pathways that keep COMT functioning can make a meaningful difference.",
  },
  {
    q: "Does the timing of hormone therapy actually matter?",
    a: "The timing question is one of the most consequential ongoing debates in this field. Research on the 'healthy cell bias' suggests estrogen is broadly protective in healthy neurons and potentially burdensome in neurons already damaged by amyloid, oxidative stress, or mitochondrial dysfunction. We cover the nuance — what the WHI, ELITE, DOPS, and KEEPS trials actually showed, and where the science is still unsettled — in our companion article on the critical window hypothesis.",
  },
  {
    q: "Can men avoid testosterone replacement by fixing metabolism?",
    a: "Often, yes. Many men presenting with 'low testosterone' actually have functional hypogonadism driven by metabolic dysfunction. Visceral fat increases aromatase activity, converting testosterone into estrogen and suppressing the hormonal axis. Research has shown that weight loss alone can restore testosterone levels in a substantial percentage of these men. When metabolic health is addressed first, some men find they don't need replacement at all.",
  },
  {
    q: "Why transdermal estradiol and micronized progesterone?",
    a: "Oral estrogen passes first through the liver and carries a different inflammatory and clotting profile than transdermal. Synthetic progestins behave differently in the body than micronized (bio-identical) progesterone. The evidence supports the more physiologic forms — transdermal estradiol and micronized progesterone — for most patients, with dosing guided by symptoms and lab monitoring rather than a one-size protocol.",
  },
];

export default function MetabolicHealthHormonePost() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Why Metabolic Health Is the Foundation of Safe, Effective Hormone Therapy",
            description:
              "A clinical look at why metabolic health, inflammation, and genetics decide whether hormone therapy heals or harms — and what we test and treat before we prescribe.",
            datePublished: "2026-05-12",
            dateModified: "2026-05-12",
            author: { "@type": "Organization", name: "Colorado Springs Health Collective" },
            publisher: {
              "@type": "Organization",
              name: "Colorado Springs Health Collective",
              url: "https://coshealthcollective.com",
              logo: { "@type": "ImageObject", url: "https://coshealthcollective.com/logo-main.png" },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://coshealthcollective.com/blog/metabolic-health-hormone-therapy-colorado-springs",
            },
            about: [
              { "@type": "Thing", name: "Hormone Replacement Therapy" },
              { "@type": "Thing", name: "Metabolic Health" },
              { "@type": "Thing", name: "Testosterone" },
              { "@type": "Thing", name: "COMT" },
              { "@type": "Thing", name: "ApoE" },
            ],
            image: "https://coshealthcollective.com/blog/metabolic-health-hero.jpg",
          }),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: "Why Metabolic Health Is the Foundation of Hormone Therapy", path: "/blog/metabolic-health-hormone-therapy-colorado-springs" },
        ])}
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
            src="/blog/metabolic-health-hero.jpg"
            alt="Hormones flowing through a metabolic system — why metabolic health is the foundation of safe, effective hormone therapy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.55) 0%, hsla(210,32%,8%,0.92) 60%, hsl(210,32%,8%) 88%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(331, 95%, 78%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(331, 70%, 65%)", color: "hsl(210, 32%, 10%)" }}>
                Hormone Therapy
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Why Metabolic Health Is the Foundation of Safe, Effective Hormone Therapy
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>May 2026 · 9 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { num: "COMT", label: "Enzyme that clears estrogen byproducts" },
                { num: "ApoE", label: "Gene that shapes brain lipid handling" },
                { num: "CYP1B1", label: "Drives reactive estrogen metabolites" },
                { num: "17β-HSD-10", label: "Disrupted by amyloid in the brain" },
              ].map((s) => (
                <div key={s.num} className="rounded-2xl p-5 text-center" style={{ background: "hsla(331, 70%, 55%, 0.10)", border: "1px solid hsla(331, 70%, 55%, 0.22)" }}>
                  <div className="text-2xl font-black leading-none mb-1" style={{ color: "hsl(331, 70%, 75%)" }}>{s.num}</div>
                  <div className="text-xs leading-tight" style={{ color: "hsl(0, 0%, 65%)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table of contents */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.8)", border: "1px solid hsla(331,70%,55%,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>In This Article</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "hsl(210, 30%, 80%)" }}>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(331, 70%, 65%)" }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Intro */}
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsl(210, 25%, 85%)" }}>
              Hormone replacement therapy can be transformative — reducing hot flashes, protecting bones, improving mood, and supporting brain health. But hormones don&apos;t work in a vacuum. They enter a complex system of enzymes, receptors, and metabolic pathways that determine whether those hormones help or harm. That system is your metabolic health.
            </p>

            {/* Whole-person approach */}
            <div id="whole-person" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>The Whole-Person Approach: Why We Assess Before We Prescribe</h2>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                Before starting any hormone therapy — estrogen, progesterone, or testosterone — we evaluate the full metabolic picture. This includes inflammatory markers, insulin sensitivity, lipid profiles, micronutrient status, and in some cases, genetic testing. Here&apos;s why each matters.
              </p>
            </div>

            {/* Inflammation */}
            <div id="inflammation" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>Inflammation Changes How Your Body Processes Hormones</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                When chronic inflammation is present — from metabolic syndrome, poor sleep, excess visceral fat, or insulin resistance — the body&apos;s hormone-processing enzymes shift in ways that can make hormone therapy less effective or even counterproductive.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                One key enzyme, COMT (catechol-O-methyltransferase), is responsible for safely clearing estrogen breakdown products from the body and brain. Neuroinflammation has been shown to impair COMT function, allowing reactive estrogen byproducts to accumulate rather than being neutralized. Another enzyme, CYP1B1, converts estrogen into byproducts that require COMT to clear them. When inflammation pushes CYP1B1 up while impairing COMT, those reactive compounds can build up where they shouldn&apos;t — including in brain tissue.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                Put plainly: the same prescription can land very differently depending on the metabolic terrain it enters. That&apos;s why we look at the terrain first.
              </p>
            </div>

            {/* Brain connection */}
            <div id="brain" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>The Brain Connection: Estrogen, Amyloid, and the Tipping Point</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Estrogen is deeply neuroprotective — but the effect depends on the state of the brain receiving it. Research on the &quot;healthy cell bias&quot; has shown that estrogen supports mitochondrial function, promotes amyloid-beta clearance, and enhances synaptic plasticity in healthy neurons. In neurons that are already stressed by amyloid accumulation, oxidative stress, or mitochondrial dysfunction, the same signal interacts with a different system — and the response can be less predictable.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Inside the brain, a mitochondrial enzyme called 17β-HSD type 10 normally helps maintain neurosteroid balance. When amyloid-beta accumulates, it binds to this enzyme and disrupts mitochondrial regulation. That ties the brain&apos;s estrogen handling to its broader inflammatory and metabolic state — which is part of why &quot;the right hormone&quot; depends so much on the body it&apos;s entering.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                This is why timing matters in the research. Starting hormone therapy early — within 5 to 10 years of menopause, before these cascades take hold — has been associated with cognitive protection in several lines of evidence. Starting much later, when the underlying terrain has already shifted, produces more uncertain effects, which is why timing, formulation, and individual context all come into the conversation.
              </p>
              <p className="leading-relaxed text-sm" style={{ color: "hsl(210, 22%, 70%)" }}>
                For a deeper look at the trials and the debate behind the timing question, see our companion article on{" "}
                <Link href="/blog/hrt-critical-window-colorado-springs" className="underline" style={{ color: "hsl(331, 70%, 75%)" }}>
                  the critical window hypothesis
                </Link>.
              </p>
            </div>

            {/* Genetics */}
            <div id="genetics" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>Genetics: Why the Same Hormone Affects People Differently</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Two genetic tests can meaningfully inform hormone therapy decisions:
              </p>
              <div className="space-y-3 mb-4">
                <div className="rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)", borderLeft: "3px solid hsl(331, 70%, 65%)" }}>
                  <div className="text-sm font-bold mb-1.5" style={{ color: "hsl(331, 70%, 75%)" }}>COMT Val158Met</div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>
                    Determines how efficiently your body clears estrogen metabolites. People with the Met/Met variant have significantly lower enzyme activity, meaning estrogen and its breakdown products linger longer. These individuals may need lower hormone doses and stronger nutritional support for the methylation pathways that keep COMT functioning.
                  </p>
                </div>
                <div className="rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)", borderLeft: "3px solid hsl(271, 70%, 65%)" }}>
                  <div className="text-sm font-bold mb-1.5" style={{ color: "hsl(271, 70%, 78%)" }}>ApoE genotype</div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>
                    Influences blood-brain barrier integrity, lipid metabolism, and amyloid clearance. Carriers of the ApoE4 allele may have different responses to hormone therapy and benefit from more aggressive cardiovascular risk management alongside any hormonal treatment.
                  </p>
                </div>
              </div>
            </div>

            {/* Men + testosterone */}
            <div id="men" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>Men and Testosterone: The Same Principles Apply</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                In men, the relationship between metabolic health and hormones is equally important — and often overlooked. Testosterone deficiency and metabolic syndrome exist in a vicious cycle: low testosterone promotes visceral fat accumulation and insulin resistance, while obesity and metabolic dysfunction suppress testosterone production through increased aromatization (conversion of testosterone to estrogen in fat tissue), elevated inflammatory mediators, and reduced gonadotropin secretion.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Many men presenting with &quot;low testosterone&quot; actually have functional hypogonadism driven by metabolic dysfunction. Research has shown that weight loss alone can restore testosterone levels in a substantial percentage of these men, without requiring lifelong testosterone replacement. When metabolic health is addressed first — through nutrition, exercise, sleep optimization, and management of insulin resistance — some men find they no longer need testosterone therapy at all.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                For men who do have true hypogonadism requiring treatment, metabolic optimization still matters. Excess aromatase activity in visceral fat converts supplemental testosterone into estrogen, potentially shifting signaling toward pro-inflammatory estrogen receptor alpha pathways — the same problematic pattern seen in women with metabolic syndrome on estrogen therapy.
              </p>
            </div>

            {/* Our approach */}
            <div id="approach" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>Our Approach: Optimize First, Then Personalize</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Rather than simply prescribing hormones based on symptoms alone, we take a systematic approach:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  ["Assess metabolic health", "Checking inflammatory markers like high-sensitivity CRP, fasting insulin, hemoglobin A1c, and a comprehensive lipid panel. If metabolic syndrome or significant inflammation is present, we address those factors first through lifestyle optimization, nutritional support, and management of underlying conditions."],
                  ["Evaluate the enzymatic support system", "Checking magnesium, B vitamins, folate, homocysteine, and vitamin D levels. These nutrients are direct cofactors for the enzymes that safely process hormones. Deficiencies in any of them can compromise the body's ability to handle hormone therapy safely."],
                  ["Offer optional genetic testing", "COMT and ApoE genotyping for patients who want the most personalized approach. These results help guide dosing decisions, formulation choices, and monitoring strategies."],
                  ["Initiate evidence-based hormone therapy", "Transdermal estradiol rather than oral (to avoid inflammatory liver effects), micronized progesterone rather than synthetic progestins, and physiologic dosing guided by both symptoms and lab monitoring."],
                  ["Monitor ongoing metabolic health", "Rechecking inflammatory markers, hormone levels, and metabolic parameters regularly to ensure the body continues to process hormones safely over time."],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)" }}>
                    <div className="text-sm font-bold mb-1.5" style={{ color: "hsl(331, 70%, 75%)" }}>{label}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom line */}
            <div id="bottom-line" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(331, 70%, 75%)" }}>The Bottom Line</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Hormones are powerful tools, but they work best in a healthy system. Whether the goal is managing menopausal symptoms, protecting long-term brain and bone health, or optimizing testosterone in men, metabolic health is the foundation that determines whether hormone therapy delivers its full benefits safely.
              </p>
              <blockquote
                className="border-l-2 pl-5 italic text-lg leading-relaxed my-6"
                style={{ borderColor: "hsl(331, 70%, 65%)", color: "hsl(0, 0%, 92%)" }}
              >
                A whole-person approach — addressing inflammation, nutrition, genetics, and lifestyle alongside hormones — is not just good medicine. It&apos;s the difference between hormones that heal and hormones that may inadvertently cause harm.
              </blockquote>
            </div>

            {/* FAQ */}
            <div id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(331, 70%, 75%)" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.q} className="rounded-xl overflow-hidden group" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold list-none" style={{ color: "hsl(0, 0%, 95%)" }}>
                      {faq.q}
                      <ChevronRight className="w-4 h-4 flex-shrink-0 group-open:rotate-90 transition-transform" style={{ color: "hsl(331, 70%, 75%)" }} />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 78%)" }}>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Internal links */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.6)", border: "1px solid hsla(331, 70%, 55%, 0.15)" }}>
              <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(331, 70%, 75%)" }}>Explore More</p>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <Link href="/hormone" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(331, 70%, 65%)" }} />
                  Hormone &amp; Metabolic Clinic
                </Link>
                <Link href="/hormone/womens-health" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(331, 70%, 65%)" }} />
                  Women&apos;s Health Overview
                </Link>
                <Link href="/hormone/mens-health" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(331, 70%, 65%)" }} />
                  Men&apos;s Health + TRT
                </Link>
                <Link href="/blog/hrt-critical-window-colorado-springs" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(331, 70%, 65%)" }} />
                  The Critical Window Hypothesis
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.5)", border: "1px solid hsla(0, 0%, 60%, 0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(0, 0%, 65%)" }}>Educational Information</p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 20%, 70%)" }}>
                This article is intended for educational purposes only and is not medical advice. Hormone therapy carries individual risks and benefits that depend on personal health history, family history, current medications, and symptoms. Nothing here should be interpreted as a recommendation to start, continue, or stop any medication. Please discuss any decisions about hormone therapy with a qualified clinician who knows your full medical history.
              </p>
            </div>

            {/* CTA */}
            <BlogCtaBlock
              service="hormone"
              source="blog-metabolic-health-hormone-therapy-colorado-springs"
              appt="freeConsult"
              heading="Start With the System That Carries the Hormones"
              body="Book a free consult to talk through your symptoms, your metabolic picture, and what a personalized plan would look like — before any prescription."
            />

          </div>
        </div>
      </section>
    </div>
  );
}
