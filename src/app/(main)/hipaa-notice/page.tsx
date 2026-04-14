import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices | Colorado Springs Health Collective",
  description: "Notice of Privacy Practices for Colorado Springs Health Collective. Learn how we use and protect your medical information.",
};

export default function HipaaNotice() {
  const sections = [
    { heading: "Who We Are", content: <><p className="mb-2">COBC Brands Direct Primary Care LLC d/b/a Colorado Springs Health Collective – Direct Primary Care ("the Practice")</p><p className="mb-2">1497 Solitaire St, Colorado Springs, CO 80905</p><p>Privacy Officer: Logan Crist, PA-C • Email: dpc@coshealthcollective.com</p></> },
    { heading: "Our Responsibilities", content: <><p className="mb-2">We are required by law to:</p><ul className="list-disc pl-6 mb-4 space-y-1"><li>Maintain the privacy and security of your protected health information (PHI).</li><li>Provide you this Notice of our legal duties and privacy practices.</li><li>Follow the terms of the Notice currently in effect.</li><li>Notify you following a breach of unsecured PHI.</li><li>For minors, the parent or guardian normally signs the NPP acknowledgment as the child's personal representative.</li></ul><p>We will not retaliate against you for filing a complaint.</p></> },
    { heading: "How We May Use and Disclose Your Information", content: <><p className="mb-2">We typically use or share your PHI in these ways:</p><ul className="list-disc pl-6 space-y-2"><li><strong>Treatment.</strong> To provide, coordinate, or manage your care and related services.</li><li><strong>Payment.</strong> To obtain or process payment for services you receive.</li><li><strong>Health Care Operations.</strong> For quality assurance, training, credentialing, legal/compliance, and business operations.</li></ul></> },
    { heading: "Minors and Adolescent Privacy", content: <p>We comply with Colorado and federal privacy rules regarding minors. Some health services may be confidential to a minor under Colorado law. In those cases, we may limit disclosures to parents or guardians and restrict proxy portal access to protect the minor's privacy.</p> },
    { heading: "Other Uses and Disclosures Permitted or Required by Law", content: <><p className="mb-4">We may use or disclose PHI without your authorization as allowed by law, including: public health activities; health oversight activities; required reporting; judicial/administrative proceedings; law enforcement purposes; to avert a serious threat to health or safety; coroners/medical examiners; organ/tissue donation; workers' compensation; and as otherwise required by federal or Colorado law.</p><p><strong>Note on fundraising/marketing/sale of PHI:</strong> We do not sell PHI and do not use PHI for fundraising. If we ever send forms of marketing that require authorization, we will obtain your written authorization first.</p></> },
    { heading: "Uses and Disclosures That Require Your Authorization", content: <p>We will not use or disclose your PHI for any purpose not described in this Notice unless you give us written authorization. Certain uses/disclosures always require your written authorization, including most marketing communications and any sale of PHI. If you authorize a use or disclosure, you may revoke that authorization at any time in writing.</p> },
    { heading: "Your Rights", content: <><p className="mb-2">You have the right to:</p><ul className="list-disc pl-6 mb-4 space-y-2"><li><strong>Get an electronic or paper copy of your record.</strong> Ask how to access or get copies; reasonable cost-based fees may apply.</li><li><strong>Ask us to correct your record</strong> if you think it is incomplete or inaccurate.</li><li><strong>Request confidential communications</strong> (for example, to contact you at a different address/phone).</li><li><strong>Request restrictions</strong> on how we use/share your PHI for treatment, payment, or operations.</li><li><strong>Out-of-pocket restriction (mandatory).</strong> If you pay in full for a service out-of-pocket, you may request that we not disclose information about that service to your health plan.</li><li><strong>Get a list ("accounting")</strong> of certain disclosures we've made in the past 6 years.</li><li><strong>Get a paper copy of this Notice</strong> at any time.</li><li><strong>Choose someone to act for you.</strong> If you have given someone medical power of attorney or have a legal guardian, that person can exercise your privacy rights.</li></ul><p>For minors, we generally treat a parent or legal guardian as the child's personal representative except where Colorado or federal law allows the minor to consent to care and limits parental access.</p></> },
    { heading: "Our Duties If There's a Breach", content: <p>We will promptly notify you following a breach of unsecured PHI, including what happened, what information was involved, steps you can take, and what we are doing to mitigate the harm.</p> },
    { heading: "Changes to This Notice", content: <p>We may change this Notice, and the changes will apply to PHI we already have as well as information we receive in the future. The current Notice will be posted at our office and on our website, and a copy will be available upon request.</p> },
    { heading: "Questions or Complaints", content: <p>If you have questions, want to exercise your rights, or believe your privacy rights have been violated, contact the Privacy Officer listed above. You can also file a complaint with the U.S. Department of Health and Human Services, Office for Civil Rights. We will not retaliate against you for filing a complaint.</p> },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>Notice of Privacy Practices</h1>
            <a href="/hipaa-notice.pdf" download className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity" style={{ background: "hsla(210, 22%, 28%, 0.75)", color: "hsl(177, 70%, 65%)" }}>
              Download PDF
            </a>
          </div>
          <p className="text-sm mb-8" style={{ color: "hsl(210, 25%, 69%)" }}>Effective Date: 11/13/2025</p>

          <div className="p-4 rounded-lg mb-8" style={{ background: "hsla(177, 70%, 59%, 0.1)", border: "1px solid hsla(177, 70%, 59%, 0.3)" }}>
            <p className="text-sm font-medium" style={{ color: "hsl(177, 70%, 65%)" }}>
              THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
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
