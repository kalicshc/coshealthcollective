import { NextRequest, NextResponse } from "next/server";

const NCI_ENDPOINT = "https://bcrisktool.cancer.gov/calculate";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Map incoming JSON to NCI form-encoded fields
  const params = new URLSearchParams();
  params.set("age", String(body.age));
  params.set("race", body.race);
  if (body.sub_race) params.set("sub_race", body.sub_race);
  params.set("age_period", String(body.age_period));
  params.set("childbirth_age", String(body.childbirth_age));
  params.set("biopsy", String(body.biopsy));
  if (body.biopsy === 1) {
    params.set("biopsy_result", String(body.biopsy_result));
    params.set("biopsy_ah", String(body.biopsy_ah));
  }
  params.set("relatives", String(body.relatives));

  try {
    const nciRes = await fetch(NCI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!nciRes.ok) {
      return NextResponse.json({ error: "NCI calculation service returned an error." }, { status: 502 });
    }

    const data = await nciRes.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Could not reach the NCI calculation service. Please try again." },
      { status: 503 }
    );
  }
}
