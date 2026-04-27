import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";
import { GREENE_ITEMS, HORMONE_INFO, type HormoneType } from "@/lib/womensHormonePathway";

const BACKEND = process.env.PLATFORM_API_URL ?? "";
const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function hormoneBlock(hormone: HormoneType, pct: number): string {
  const info = HORMONE_INFO[hormone];
  const colors: Record<HormoneType, { accent: string; bg: string; border: string }> = {
    progesterone: { accent: "#e879f9", bg: "#fdf4ff", border: "#f0abfc" },
    estrogen:     { accent: "#a78bfa", bg: "#f5f3ff", border: "#c4b5fd" },
    testosterone: { accent: "#fb7185", bg: "#fff1f2", border: "#fda4af" },
  };
  const c = colors[hormone];

  return `
    <div style="border:1px solid ${c.border};border-radius:12px;padding:20px 24px;margin:0 0 14px;background:${c.bg}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 10px">
        <p style="margin:0;font-weight:700;font-size:15px;color:#1e1b4b">${info.name}</p>
        <span style="font-weight:800;font-size:18px;color:${c.accent}">${pct}%</span>
      </div>
      <div style="height:6px;border-radius:999px;background:#e2e8f0;margin:0 0 14px;overflow:hidden">
        <div style="height:100%;width:${pct}%;border-radius:999px;background:${c.accent}"></div>
      </div>
      <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#475569">
        <strong style="color:#334155">What this hormone does:</strong> ${info.role}
      </p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#334155">
        <strong>How replacement therapy helps:</strong> ${info.therapy}
      </p>
    </div>`;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const scoreLabel = data.totalScore != null ? `${data.totalScore}/63` : "N/A";
  const severityLabel = data.severity ? cap(data.severity) : "N/A";
  const progPct: number = data.progesteronePct ?? 0;
  const estrPct: number = data.estrogenPct ?? 0;
  const testPct: number = data.testosteronePct ?? 0;
  const primaryConcerns =
    data.question?.trim()
    || data.mostBothersome?.trim()
    || "Completed women's hormone quiz";

  // ── Send to backend platform ─────────────────────────────────────────────
  if (BACKEND) {
    try {
      const backendRes = await fetch(`${BACKEND}/api/hormone/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          email: data.email ?? "",
          phone: "Not provided",
          dateOfBirth: "1900-01-01",
          sex: "female",
          serviceInterest: "HORMONE_WOMENS_QUIZ",
          primaryConcerns,
          currentMedications: "",
          heardAboutUs: "",
          consentToContact: true,
          sourcePage: "/hormone/womens-health/quiz",
          age: data.age ?? "",
          totalScore: scoreLabel,
          severity: severityLabel,
          progesteronePattern: `${progPct}%`,
          estrogenPattern: `${estrPct}%`,
          testosteronePattern: `${testPct}%`,
          primaryPattern: data.primaryHormone ?? "",
          mostBothersome: data.mostBothersome ?? "",
          question: data.question ?? "",
          interest: "Women's Hormone Quiz",
          scores: data.scores ?? {},
        }),
      });
      if (!backendRes.ok) {
        console.error("Women's hormone quiz backend save failed:", backendRes.status, await backendRes.text());
      }
    } catch (err) {
      console.error("Women's hormone quiz backend save failed:", err);
    }
  }

  // ── Notification email to clinic ─────────────────────────────────────────
  try {
    const rows = formatFields({
      "Name": fullName,
      "Email": data.email ?? "",
      "Age": data.age ?? "Not provided",
      "Total Score": `${scoreLabel} — ${severityLabel}`,
      "Progesterone Pattern": `${progPct}%`,
      "Estrogen Pattern": `${estrPct}%`,
      "Testosterone Pattern": `${testPct}%`,
      "Primary Pattern": data.primaryHormone ? cap(data.primaryHormone) : "N/A",
      "Most Bothersome": data.mostBothersome || "Not specified",
      "Question": data.question || "None",
    });
    await sendNotification(
      `Women's Hormone Quiz — ${fullName}`,
      emailTemplate("Women's Hormone Quiz Results", "/hormone/womens-health/quiz", rows),
    );
  } catch (err) {
    console.error("Notification email failed:", err);
  }

  // ── Confirmation email to patient ────────────────────────────────────────
  try {
    const firstName = data.firstName ?? "there";

    const severityContext: Record<string, string> = {
      low: "Your total score is on the lower end of the Greene scale, but a score is just one signal. Symptoms often show up before the questionnaire does, and labs can reveal what a self-report can't. A consult is still worth having — we'll look at the full picture, not just a number.",
      moderate: "Your score suggests moderate hormone involvement. This is a meaningful signal that a full evaluation is worth having.",
      significant: "Your score reflects a significant hormone deficiency pattern. This level of symptom burden responds well to treatment.",
      severe: "Your score reflects a severe hormone deficiency pattern with significant quality-of-life impact. This is exactly the kind of picture that responds to personalized hormone care.",
    };

    const context = severityContext[data.severity ?? ""] ?? "";

    const body = `
<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#1e293b">
  Here's a full breakdown of what your responses suggest — the same information from your results screen, now in your inbox.
</p>

<!-- Score summary -->
<div style="border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin:0 0 24px;background:#f8fafc">
  <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
    <div>
      <p style="margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8">Total Score</p>
      <p style="margin:4px 0 0;font-size:32px;font-weight:900;color:#0f172a;line-height:1">${data.totalScore ?? "—"}<span style="font-size:16px;font-weight:400;color:#94a3b8"> / 63</span></p>
    </div>
    <div style="border-left:1px solid #e2e8f0;padding-left:16px">
      <p style="margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8">Severity</p>
      <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#7c3aed">${severityLabel}</p>
    </div>
    ${data.mostBothersome ? `
    <div style="border-left:1px solid #e2e8f0;padding-left:16px">
      <p style="margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8">Most Bothersome</p>
      <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#1e293b">${data.mostBothersome}</p>
    </div>` : ""}
  </div>
  ${context ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#475569;border-top:1px solid #e2e8f0;padding-top:14px">${context}</p>` : ""}
</div>

<!-- Hormone breakdown heading -->
<p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#94a3b8">Hormone Pattern Breakdown</p>
<p style="margin:0 0 16px;font-size:12px;color:#94a3b8">% of symptoms linked to each hormone</p>

<!-- Hormone cards -->
${hormoneBlock("progesterone", progPct)}
${hormoneBlock("estrogen", estrPct)}
${hormoneBlock("testosterone", testPct)}

<!-- What's next -->
<div style="border:1px solid #e9d5ff;border-radius:12px;padding:20px 24px;margin:24px 0;background:linear-gradient(135deg,#fdf4ff,#f5f3ff)">
  <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7c3aed">What Comes Next</p>
  <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155">
    A member of our hormone care team will reach out to you personally. When we connect, we'll go through your symptom pattern, talk through what each hormone picture means for you specifically, and discuss what a personalized plan would look like.
  </p>
  <p style="margin:0;font-size:14px;line-height:1.7;color:#334155">
    Want to move faster? You can book a free consult directly:
  </p>
  <p style="margin:14px 0 0">
    <a href="${BOOKING_URL}" style="display:inline-block;background:linear-gradient(135deg,#e879f9,#a855f7);color:#fff;text-decoration:none;padding:13px 28px;border-radius:999px;font-weight:700;font-size:14px">
      Book a Free Consult →
    </a>
  </p>
</div>

<p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8">
  This assessment is educational and does not constitute medical advice or a diagnosis. Results are based on self-reported symptoms and should not replace a clinical evaluation.
</p>`;

    await sendConfirmation(
      data.email,
      firstName,
      "Your women's hormone assessment results",
      body,
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
