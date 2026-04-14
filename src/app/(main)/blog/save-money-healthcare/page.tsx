import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, DollarSign, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Save Money on Healthcare: 7 Smart Strategies | Colorado Springs Health Collective",
  description: "Learn practical ways to save money on healthcare—from cash-pay options and discount pharmacies to imaging price shopping and avoiding surprise bills.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogSaveMoneyHealthcare() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap pt-20">
            {["/direct-primary-care|Direct Primary Care", "/about|About Us", "/faq|FAQ", "/blog|Blog"].map((item) => {
              const [href, label] = item.split("|");
              return <Link key={href} href={href} className="hover:opacity-80 text-sm" style={{ color: "hsl(177, 70%, 59%)" }}>{label}</Link>;
            })}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(140, 70%, 55%), hsl(177, 70%, 59%))" }}>
                  <DollarSign className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(140, 70%, 55%)", color: "hsl(210, 32%, 12%)" }}>Smart Savings</span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                How to Save Money on Healthcare: 7 Smart Strategies Most People Don&apos;t Know
              </h1>
              <p style={{ color: "hsl(0, 0%, 60%)" }}>February 9, 2026 | By Colorado Springs Health Collective</p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
                If you&apos;ve ever opened a medical bill and thought, &ldquo;How is this possible?&rdquo;—you&apos;re not alone. Healthcare in the U.S. is expensive, confusing, and often feels like a system designed to keep you in the dark about what things actually cost. But there are real, practical ways to lower your costs.
              </p>
            </div>

            {[
              {
                title: "1. Ask for Cash-Pay Prices (Even If You Have Insurance)",
                content: "The cash price for a service is often lower than what you'd pay through insurance—especially if you haven't met your deductible. Ask: \"What's the cash price if I don't bill insurance?\" You'd be surprised how often the answer saves you real money.",
              },
              {
                title: "2. Use Prescription Discount Tools (Not Just Insurance)",
                content: "Your insurance copay isn't always the cheapest option. Check GoodRx (compares prices across local pharmacies, often beats insurance copays) and Cost Plus Drugs (transparent pricing, ships directly to you). Before filling any prescription, check both tools versus your insurance.",
              },
              {
                title: "3. Shop Imaging Prices (CT, MRI, Ultrasound)",
                content: "Hospital-based imaging is typically 2-5x more expensive than independent imaging centers—for the exact same scan. Call multiple facilities and ask for their cash price. You don't need to go where your doctor orders—just take the order to your chosen center.",
              },
              {
                title: "4. Labs Don't Have to Be Expensive",
                content: "Getting blood work done at a hospital lab can cost significantly more than using a direct-access or independent lab. Ask your provider for itemized lab pricing upfront, and ask about wholesale pricing options.",
              },
              {
                title: "5. Avoid Surprise Bills With Upfront Transparency",
                content: "Ask for CPT codes before any procedure. Request a written estimate. Confirm who is billing you—sometimes you'll get separate bills from the facility and the provider.",
              },
              {
                title: "6. Negotiate Bills and Ask About Payment Plans",
                content: "Don't assume your bill is final. Call the billing department and ask if there's a discount for paying in full. Ask about interest-free payment plans. Request an itemized bill and review for errors or duplicate charges.",
              },
              {
                title: "7. How Direct Primary Care (DPC) Helps Lower Costs Long-Term",
                content: "DPC is a membership-based model with flat monthly fees—no insurance billing, no copays, no surprise charges for primary care. Benefits include predictable monthly costs, wholesale pricing on labs and medications, and help navigating affordable care options.",
              },
            ].map((section, i) => (
              <div key={i} className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(140, 70%, 65%)" }}>{section.title}</h2>
                <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 85%)" }}>{section.content}</p>
              </div>
            ))}

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "hsl(140, 70%, 65%)" }}>The Bottom Line</h2>
              <ul className="space-y-3 mb-6">
                {["Ask for cash prices before any visit, lab, or procedure", "Compare medication costs using discount tools", "Shop imaging—the same scan can cost wildly different amounts", "Ask for estimates and CPT codes upfront", "Get help navigating the system from a provider not tied to insurance"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(140, 70%, 65%)" }} />
                    <span style={{ color: "hsl(0, 0%, 85%)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg leading-relaxed" style={{ color: "hsl(0, 0%, 92%)" }}>
                If you&apos;re in Colorado Springs and want help navigating affordable care, we offer{" "}
                <Link href="/direct-primary-care" className="underline font-semibold" style={{ color: "hsl(177, 70%, 65%)" }}>Direct Primary Care memberships</Link>{" "}
                and free meet-and-greets.
              </p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Related Articles</h3>
              <div className="space-y-3">
                <Link href="/blog/why-direct-primary-care" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>Why Direct Primary Care Is the Future of Health →</Link>
                <Link href="/blog/dpc-vs-concierge" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>Direct Primary Care vs. Concierge Medicine →</Link>
              </div>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Want help navigating affordable healthcare?</h3>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>Book a free meet and greet to see if DPC is right for you.</p>
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(140, 70%, 55%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                Book Free Meet &amp; Greet
              </a>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <a href="tel:+17198244716" className="flex items-center gap-3 hover:opacity-80">
                  <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span style={{ color: "hsl(0, 0%, 85%)" }}>(719) 824-4716</span>
                </a>
                <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-3 hover:opacity-80">
                  <Mail className="w-5 h-5" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span style={{ color: "hsl(0, 0%, 85%)" }}>dpc@coshealthcollective.com</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
