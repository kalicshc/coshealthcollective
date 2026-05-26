// The PHONE posts navigation commands here; broadcast to the screen.
import { sendCommand, type RemoteCommand } from "../../../remoteBus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { type?: string; idx?: number };
  if (body.type === "next" || body.type === "prev") {
    sendCommand({ type: body.type });
  } else if (body.type === "goto" && typeof body.idx === "number") {
    sendCommand({ type: "goto", idx: body.idx } as RemoteCommand);
  } else {
    return Response.json({ ok: false, error: "bad command" }, { status: 400 });
  }
  return Response.json({ ok: true });
}
