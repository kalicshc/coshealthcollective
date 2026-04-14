import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Colorado Springs Health Collective",
  description: "Terms of Service for Colorado Springs Health Collective. Governing your use of our websites and non-clinical services.",
};

export default function TermsOfService() {
  const sections = [
    { heading: "1) Who We Are & How to Reach Us", content: <><p className="mb-2">COBC Brands Direct Primary Care LLC d/b/a Colorado Springs Health Collective – Direct Primary Care</p><p className="mb-2">1497 Solitaire St, Colorado Springs, CO 80905</p><p>Email: dpc@coshealthcollective.com</p></> },
    { heading: "2) What These Terms Cover (and Don't)", content: <p>These Terms cover use of our public websites, non-clinical communications, scheduling, and access to our patient portal/billing system (via Hint). Clinical care is governed by your Membership Agreement, Consent for Medical Treatment, and our Notice of Privacy Practices (NPP).</p> },
    { heading: "3) Our Services (Overview)", content: <p>We operate a direct primary care (DPC) practice for patients age 2 and older, focusing on preventive care, chronic disease management (stable), acute/minor illness care, care coordination, and appropriate orders for labs/imaging.</p> },
    { heading: "3A) Minors & Consent", content: <p>Patients under 18 must have a parent or legal guardian ("Responsible Party") enroll them, consent to care, and accept financial responsibility. The Responsible Party is granted proxy access in our Hint Health portal for scheduling, messaging, and record review, consistent with HIPAA and Colorado law.</p> },
    { heading: "4) Important DPC Disclosures", content: <ul className="list-disc pl-6 space-y-2"><li><strong>DPC is not insurance.</strong> A membership does not replace health insurance or other coverage.</li><li>We do not bill third-party payors for services covered under your membership.</li><li><strong>Medicaid:</strong> We cannot collect payment from Medicaid recipients for Medicaid-covered services.</li><li><strong>Medicare:</strong> Private contracting requires a formal Medicare "opt-out." Until a clinician's opt-out is effective, we do not accept private payment from Medicare beneficiaries for Medicare-covered services.</li></ul> },
    { heading: "5) Telehealth", content: <p>Telehealth visits are held to the same standard of care as in-person care and are used only when that standard can be met for your concern. Sessions are not recorded by either party without written consent. You may withdraw telehealth consent at any time without affecting access to in-person care.</p> },
    { heading: "6) Patient Portal & Messaging", content: <><p className="mb-2">We may provide secure online access via a patient portal (and secure app messaging) for non-urgent issues. You are responsible for:</p><ul className="list-disc pl-6 mb-4 space-y-1"><li>Maintaining confidentiality of your credentials</li><li>Keeping your contact information current</li><li>Using the portal/app for non-emergencies only (dial 911 for emergencies)</li></ul></> },
    { heading: "7) Privacy & Data Protection", content: <ul className="list-disc pl-6 space-y-2"><li><strong>HIPAA/PHI:</strong> Our use/disclosure of protected health information (PHI) is governed by our Notice of Privacy Practices (NPP); please review it carefully.</li><li><strong>Web privacy:</strong> Personal information collected on our public websites is governed by our Privacy Policy (separate from the NPP).</li><li><strong>Contact for privacy questions/rights:</strong> Privacy Officer at dpc@coshealthcollective.com.</li></ul> },
    { heading: "8) Website Use & Intellectual Property", content: <><p className="mb-2">Site content (text, logos, graphics, software) is owned by us or our licensors and is provided for personal, non-commercial use. You agree not to:</p><ul className="list-disc pl-6 space-y-1"><li>(a) copy/modify/distribute content without permission;</li><li>(b) attempt to gain unauthorized access;</li><li>(c) use automated scraping/crawling; or</li><li>(d) violate applicable laws.</li></ul></> },
    { heading: "9) Payments & Billing", content: <p>Membership fees, due dates, grace periods, late fees, add-on services, refunds, and cancellation terms are set forth in your Membership Agreement. You agree to keep a valid payment method on file and to promptly update billing information.</p> },
    { heading: "10) Limitations of the Service", content: <p>We do not provide emergency, specialty, hospital, or 24/7 emergency services or continuous monitoring. For urgent or life-threatening conditions, call 911 or go to the nearest emergency department immediately.</p> },
    { heading: "11) No Guarantees; Clinical Judgment", content: <p>While we aim for excellent outcomes, medicine has inherent uncertainty and no specific results are guaranteed. Clinicians may recommend in-person, urgent care, or emergency department evaluation when clinically indicated.</p> },
    { heading: "12) Your Responsibilities", content: <p>You agree to provide accurate information, disclose medications/allergies, follow agreed-upon care plans (or tell us when choosing otherwise), use communications appropriately, and adhere to scheduling and cancellation policies.</p> },
    { heading: "13) Third-Party Services & Technology", content: <p>We may use third-party vendors for hosting, forms, analytics, and communications. We aren't responsible for third-party outages or failures. Our Privacy Policy explains web-data practices; we do not sell/share personal data for targeted advertising.</p> },
    { heading: "14) Indemnification", content: <p>You agree to indemnify and hold harmless the Company and its clinicians/staff for claims arising from your breach of these Terms, unlawful use of the sites/services, or failure to seek appropriate emergency care when advised.</p> },
    { heading: "15) Limitation of Liability", content: <p>To the fullest extent permitted by Colorado law, our total liability for claims relating to these Terms or the sites/services is limited to the amount you paid to us for services in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p> },
    { heading: "16) Termination", content: <p>Either party may terminate the clinical relationship per the Membership Agreement. We may suspend or terminate site access for violations of these Terms.</p> },
    { heading: "17) Dispute Resolution; Governing Law", content: <p>Disputes arising from these Terms will be resolved by binding arbitration in Colorado Springs, Colorado under the rules of the American Arbitration Association. Colorado law governs.</p> },
    { heading: "18) Changes to These Terms", content: <p>We may update these Terms; changes take effect upon posting to our website(s). Continued use after posting constitutes acceptance.</p> },
    { heading: "19) Entire Agreement; Severability", content: <p>These Terms, together with our Privacy Policy, NPP, Membership Agreement, and Consent for Medical Treatment, form the entire agreement regarding site use and non-clinical services.</p> },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>Terms of Service</h1>
            <a href="/terms-of-service.pdf" download className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity" style={{ background: "hsla(210, 22%, 28%, 0.75)", color: "hsl(177, 70%, 65%)" }}>
              Download PDF
            </a>
          </div>
          <p className="text-lg mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>Colorado Springs Health Collective – Direct Primary Care</p>
          <p className="text-sm mb-8" style={{ color: "hsl(210, 25%, 69%)" }}>Effective Date: August 10, 2025</p>

          <div className="p-4 rounded-lg mb-8" style={{ background: "hsla(177, 70%, 59%, 0.1)", border: "1px solid hsla(177, 70%, 59%, 0.3)" }}>
            <p className="text-sm" style={{ color: "hsl(210, 40%, 89%)" }}>
              These Terms of Service ("Terms") govern your use of the websites and non-clinical services of COBC Brands Direct Primary Care LLC d/b/a Colorado Springs Health Collective – Direct Primary Care ("Company," "we," "us," or "our"). By using our sites or services, you agree to these Terms.
            </p>
          </div>

          <div style={{ color: "hsl(210, 40%, 89%)" }}>
            {sections.map((s) => (
              <section key={s.heading} className="mb-8">
                <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>{s.heading}</h2>
                {s.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
