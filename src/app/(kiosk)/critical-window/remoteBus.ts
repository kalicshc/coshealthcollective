// In-memory realtime bus for the live presenter remote. Runs in the single Node process behind
// `next dev` / `next start` on the presenting laptop — so the phone and the screen sync with zero
// external services, fully offline over the laptop's hotspot. (Not for serverless/multi-instance.)
//
// Two message kinds flow over one SSE stream:
//   • "state" — the SCREEN publishes its current slide/step; the PHONE renders notes/timer/next.
//   • "cmd"   — the PHONE sends next/prev/goto; the SCREEN acts on it.
import { EventEmitter } from "events";

export type RemoteState = { idx: number; step: number; total: number; rev: number };
export type RemoteCommand =
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; idx: number };

type Bus = { emitter: EventEmitter; state: RemoteState };

// Survive HMR/module reloads in dev by stashing the singleton on globalThis.
const g = globalThis as unknown as { __cwRemoteBus?: Bus };
const bus: Bus =
  g.__cwRemoteBus ??
  (g.__cwRemoteBus = {
    emitter: new EventEmitter(),
    state: { idx: 0, step: 0, total: 0, rev: 0 },
  });
bus.emitter.setMaxListeners(50);

export function getState(): RemoteState {
  return bus.state;
}

export function publishState(partial: Partial<RemoteState>): void {
  bus.state = { ...bus.state, ...partial, rev: bus.state.rev + 1 };
  bus.emitter.emit("state", bus.state);
}

export function sendCommand(cmd: RemoteCommand): void {
  bus.emitter.emit("cmd", cmd);
}

export function subscribe(
  onState: (s: RemoteState) => void,
  onCmd: (c: RemoteCommand) => void,
): () => void {
  bus.emitter.on("state", onState);
  bus.emitter.on("cmd", onCmd);
  return () => {
    bus.emitter.off("state", onState);
    bus.emitter.off("cmd", onCmd);
  };
}
