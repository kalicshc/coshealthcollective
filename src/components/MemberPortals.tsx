import Link from "next/link";
import { ExternalLink, Calendar, FlaskConical, CheckCircle, Activity } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { hintLink } from "@/lib/bookingLinks";

/**
 * The three member portals (Hint billing, Guava records, remote monitoring),
 * rendered as the shared Accordion. Used by both /resources and /members so
 * the two pages can't drift apart. Server component.
 */

const HINT_URL = hintLink("memberLogin", "member-portals");
const GUAVA_URL = "https://guavahealth.com/login/coshealthcollective";

const portals = [
  {
    id: "appointments-billing",
    title: "Appointments and Billing Portal",
    description: "Book appointments, manage your membership, and handle billing through your secure member account.",
    icon: Calendar,
    bullets: ["Schedule appointments", "Manage billing & membership"],
    buttonLabel: "Open Portal",
    url: HINT_URL,
    internalLink: null as null | string,
  },
  {
    id: "health-records",
    title: "Health Records Portal",
    description: "Access your health records, lab results, and complete health history — securely stored and easy to share with any provider.",
    icon: FlaskConical,
    bullets: ["View lab results", "Complete health history"],
    buttonLabel: "Open Portal",
    url: GUAVA_URL,
    internalLink: null as null | string,
  },
  {
    id: "remote-monitoring",
    title: "AI-Integrated Remote Monitoring",
    description: "Connect clinician-recommended home health devices to your care. Your readings sync directly to Guava Health so your provider can monitor trends between visits.",
    icon: Activity,
    bullets: ["Blood pressure, oxygen, weight & more", "Data syncs to your Guava Health record"],
    buttonLabel: "Browse Recommended Devices",
    url: null as null | string,
    internalLink: "/remote-monitoring",
  },
];

function PortalBody({ portal }: { portal: (typeof portals)[number] }) {
  const ctaClass = "inline-flex items-center gap-2 py-3 px-7 rounded-full font-semibold text-sm transition-opacity hover:opacity-85";
  const ctaStyle = { background: "linear-gradient(135deg, hsl(45,90%,60%), hsl(36,90%,52%))", color: "hsl(210,32%,10%)" };
  const cta = (
    <>
      {portal.buttonLabel}
      <ExternalLink className="w-4 h-4" />
    </>
  );
  return (
    <div>
      <p className="text-sm leading-relaxed mb-4">{portal.description}</p>
      <ul className="space-y-2 mb-5">
        {portal.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(45,90%,60%)" }} />
            <span className="text-sm">{bullet}</span>
          </li>
        ))}
      </ul>
      {portal.internalLink ? (
        <Link href={portal.internalLink} className={ctaClass} style={ctaStyle}>{cta}</Link>
      ) : (
        <a href={portal.url!} target="_blank" rel="noopener noreferrer" className={ctaClass} style={ctaStyle}>{cta}</a>
      )}
    </div>
  );
}

export function MemberPortals() {
  return (
    <Accordion
      service="brand"
      allowMultiple
      items={portals.map((portal) => ({
        id: portal.id,
        question: portal.title,
        answer: <PortalBody portal={portal} />,
      }))}
    />
  );
}
