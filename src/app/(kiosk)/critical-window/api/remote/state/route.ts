// The SCREEN posts its current slide/step here whenever it changes; broadcast to phone(s).
import { publishState } from "../../../remoteBus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    idx?: number;
    step?: number;
    total?: number;
  };
  const partial: Record<string, number> = {};
  if (typeof body.idx === "number") partial.idx = body.idx;
  if (typeof body.step === "number") partial.step = body.step;
  if (typeof body.total === "number") partial.total = body.total;
  publishState(partial);
  return Response.json({ ok: true });
}
