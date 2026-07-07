import { ServiceHero } from "@/components/ServiceHero";
import { MemberPortals } from "@/components/MemberPortals";
import { PageCtaFooter } from "@/components/PageCtaFooter";

export default function Members() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="For CSHC Members"
        title="Member Resources"
        subhead="Everything you need to manage your care — all in one place."
        compact
      />

      <div className="section-divider" />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <MemberPortals />
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Need a hand with a portal?"
        body="Call, text, or email and we'll get you sorted."
      />
    </div>
  );
}
