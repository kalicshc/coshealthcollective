/**
 * "The Critical Window" July 24 talk — square (1:1) social-post backgrounds, generated via
 * fal.ai FLUX 1.1 [pro] ultra (same engine + cinematographer's eye as gen-deck-nature.mjs).
 * The frosted-glass panel on /cw-social-post carries the words; the landscape carries the feeling.
 *
 *   node --env-file=.env.local scripts/gen-social-cw.mjs            # all ids
 *   node --env-file=.env.local scripts/gen-social-cw.mjs post-a     # only this id
 *
 * Writes 1080×1080 webp into public/social/cw/. Requires FAL_KEY.
 */

import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "social", "cw");
const ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1-ultra";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/images/generations";

const KEY = process.env.FAL_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!KEY && !OPENAI_KEY) { console.error("\n✖ Neither FAL_KEY nor OPENAI_API_KEY found in .env.local\n"); process.exit(1); }

const PREFIX =
  "Ultra-detailed, cinematic, photorealistic Colorado landscape photograph. Dramatic natural " +
  "light, rich warm golden highlights with deep teal shadows, epic scale, awe-inspiring, shallow " +
  "atmospheric depth, subtle film grain. Absolutely no text, no words, no people, no man-made " +
  "structures unless specified, no watermarks. ";

// id → square-composed prompt. The middle of the frame stays calm to hold the glass panel.
const PROMPTS = {
  // Post A — the deck's title mood: blue-hour aurora over a ridge, deep + contemplative
  "post-a":
    "A luminous green-and-violet aurora rippling across a deep blue-hour sky over a dark " +
    "snow-dusted Colorado ridgeline, the last ember of dusk glowing faintly warm on the horizon, " +
    "stars beginning to show, vast and contemplative. Square composition, ridgeline low in the " +
    "frame, the middle of the sky calm and even to hold a centered text panel.",
  // Post B — warm invitation: golden-hour valley with a path in, alive + welcoming
  "post-b":
    "A golden-hour Colorado mountain valley with a winding trail leading in through tall pines " +
    "and glowing aspens, warm sunbeams raking across a green meadow toward snow-dusted peaks, " +
    "inviting and alive. Square composition, the middle of the frame calm and softly lit to hold " +
    "a centered text panel.",
};

async function fluxOne(prompt) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: PREFIX + prompt,
      aspect_ratio: "1:1",
      output_format: "jpeg",
      num_images: 1,
      safety_tolerance: "5",
      enable_safety_checker: false,
    }),
  });
  if (!res.ok) throw new Error(`fal ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  const url = (await res.json())?.images?.[0]?.url;
  if (!url) throw new Error("no image url in response");
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

async function openaiOne(prompt) {
  const res = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt: PREFIX + prompt, size: "1024x1024", quality: "high", n: 1 }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  const b64 = (await res.json())?.data?.[0]?.b64_json;
  if (!b64) throw new Error("no image data in response");
  return Buffer.from(b64, "base64");
}

// FLUX first (better landscapes); fall back to gpt-image-1 if fal is down/out of balance.
async function generateOne(id, prompt) {
  let buf, engine = "flux";
  try {
    if (!KEY) throw new Error("no FAL_KEY");
    buf = await fluxOne(prompt);
  } catch (err) {
    if (!OPENAI_KEY) throw err;
    process.stdout.write(`(flux failed: ${err.message.slice(0, 80)}) → gpt-image-1 … `);
    engine = "gpt-image-1";
    buf = await openaiOne(prompt);
  }
  await sharp(buf).resize(1080, 1080, { fit: "cover", position: "centre" }).webp({ quality: 88 }).toFile(join(OUT_DIR, `${id}.webp`));
  return engine;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const jobs = Object.entries(PROMPTS).filter(([id]) => (args.length === 0 ? true : args.some((a) => id.startsWith(a) || id === a)));
  console.log(`\nCW social backgrounds via FLUX → ${OUT_DIR}\n`);
  let ok = 0, failed = 0;
  for (const [id, prompt] of jobs) {
    process.stdout.write(`• flux   ${id} … `);
    try { await generateOne(id, prompt); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }
  console.log(`\nFinished: ${ok} generated, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
