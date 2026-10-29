import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";
import { validate } from "@/lib/validateForm";
import { clinicFacts } from "@/lib/clinicFacts";

/**
 * The single new-patient waitlist — the destination for every booking CTA
 * while ACCEPTING_NEW_PATIENTS is false (see src/lib/bookingLinks.ts).
 *
 * Notifies the clinic inbox and sends the visitor a plain confirmation. Tone
 * is deliberately matter-of-fact: we're full, we'll reach out when we aren't.
 * No urgency, no scarcity, no promised date.
 */

const INTEREST_LABELS: Record<string, string> = {
  dpc: "Direct Primary Care",
  hormone: "Hormone & Weight Loss",
  hyperbaric: "Hyperbaric Oxygen Therapy",
  "urgent-care": "Urgent Care",
  aesthetics: "Aesthetics / Rx Skincare",
  unsure: "Not sure yet",
};

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}));

  const v = validate(data, {
    firstName: "string",
    lastName: "string",
    email: "email",
  });
  if (!v.ok) {
    return NextResponse.json({ error: "Invalid form data", details: v.errors }, { status: 400 });
  }

  const firstName = v.data.firstName;
  const name = `${firstName} ${v.data.lastName}`;
  const interestKey = typeof data.interest === "string" ? data.interest : "unsure";
  const interest = INTEREST_LABELS[interestKey] ?? interestKey;

  try {
    const rows = formatFields({
      "Name": name,
      "Email": v.data.email,
      "Phone": typeof data.phone === "string" ? data.phone : undefined,
      "Interested in": interest,
      "Notes": typeof data.notes === "string" ? data.notes : undefined,
      "Source": typeof data.source === "string" ? data.source : undefined,
    });
    await sendNotification(
      `Waitlist — ${interest} — ${name}`,
      emailTemplate("New Patient Waitlist Signup", data.sourcePage ?? "/waitlist", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      v.data.email,
      firstName,
      "You're on our waitlist",
      `<p>Thanks for reaching out. You're on the waitlist for <strong>${interest}</strong>.</p>
       <p>We're not accepting new patients right now. We'll contact you as soon as we have availability — there's nothing else you need to do in the meantime.</p>
       <p>If something urgent comes up, call or text us at <strong>${clinicFacts.contact.phone}</strong>.</p>
       <p style="margin-top:24px">— The Colorado Springs Health Collective Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
