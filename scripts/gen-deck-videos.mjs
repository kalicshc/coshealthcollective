/**
 * Generate the fal.ai fly-through TRANSITION clips for "The Critical Window" deck.
 *
 * Each clip flies the camera from slide N into slide N+1 while slide N's glass dissolves, and
 * LANDS on slide N+1's clean background (the live glass panel then fades in over it in the deck).
 *   • START frame = the composited screenshot of slide N (glass visible) → /tmp/cw-shots/slide-NN.png
 *   • END frame   = the clean background still of slide N+1 → public/deck/stills/<id>.webp
 *
 * Model: fal-ai/kling-video/v1.6/pro/image-to-video (image_url + tail_image_url, 16:9, 5s).
 * Output: public/deck/video/sNN.mp4  (NN = receiving slide number).
 *
 *   node --env-file=.env.local scripts/gen-deck-videos.mjs           # the demo set (s02, s03)
 *   node --env-file=.env.local scripts/gen-deck-videos.mjs s02 s03   # explicit
 *   (or: npm run gen:videos)
 *
 * Requires FAL_KEY and fresh composited frames in /tmp/cw-shots (run scripts/cw-shoot.mjs first).
 */

import { fal } from "@fal-ai/client";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const exec = promisify(execFile);
const KLING_SECONDS = 5.1;  // Kling's actual clip length
const TARGET_SECONDS = 1.5; // sped-up transition length for the deck

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const STILLS = join(ROOT, "public", "deck", "stills");
const SHOTS = "/tmp/cw-shots";
const OUT_DIR = join(ROOT, "public", "deck", "video");
const MODEL = "fal-ai/kling-video/v1.6/pro/image-to-video";

if (!process.env.FAL_KEY) { console.error("\n✖ FAL_KEY not found in .env.local\n"); process.exit(1); }
fal.config({ credentials: process.env.FAL_KEY });

// receiving-slide id → { fromShot (slide N composited), toStill (slide N+1 clean bg id), prompt }
const TRANSITIONS = {
  s02: {
    fromShot: "slide-01.png",
    toStill: "02-newspaper",
    prompt:
      "A single continuous downward plunge, no cuts. The camera tips over the aurora-lit ridge and " +
      "free-falls straight down through layers of cloud, the green aurora sweeping past and fading " +
      "as the sky darkens into a brooding storm over jagged black peaks below. Strong, smooth " +
      "vertical descent with real speed and parallax. The frosted-glass title card shatters " +
      "immediately and the shards scatter upward out of frame in the first half-second, leaving " +
      "clean sky. Cinematic, photoreal, deep teal-to-charcoal grade, dramatic and weighty.",
  },
  s03: {
    fromShot: "slide-02.png",
    toStill: "03-desk-journals",
    prompt:
      "Continuous cinematic shot: the camera holds steady as the brooding mountain storm clears, " +
      "heavy clouds pulling back to reveal crisp clean first light breaking over snow-capped peaks, " +
      "the air clarifying. The frosted-glass card fades to fully transparent in the first second. " +
      "Calm, settling motion, no cuts. Photorealistic cinematic grade.",
  },
  s04: {
    fromShot: "slide-03.png",
    toStill: "04-doorway-vista",
    prompt:
      "Continuous cinematic flight: the camera lifts and sweeps backward off the snow-capped peaks, " +
      "rising into open sky and then pulling back to reveal a wide golden-hour mountain valley framed " +
      "by tall pines, with a glowing gap in the distant ridge like an open doorway of light. The " +
      "frosted-glass card lifts gently up and out of frame, becoming transparent, in the first " +
      "second. Smooth, expansive pull-back, no cuts. Photorealistic warm cinematic grade.",
  },
  s05: {
    fromShot: "slide-04.png",
    toStill: "05-forest-path",
    prompt:
      "Continuous cinematic dolly: the camera glides forward through the glowing gap in the ridge " +
      "and into a sunlit forest trail lined with tall pines and golden aspens, soft sunbeams and " +
      "dust motes in the air. The frosted-glass card fades to fully transparent as we pass through. " +
      "Smooth forward motion, no cuts. Photorealistic warm cinematic grade.",
  },
};

async function uploadFrame(absPath, isShot) {
  const src = isShot ? join(SHOTS, absPath) : join(STILLS, `${absPath}.webp`);
  const buf = await sharp(await readFile(src)).resize(1280, 720, { fit: "cover" }).jpeg({ quality: 88 }).toBuffer();
  const blob = new Blob([buf], { type: "image/jpeg" });
  return fal.storage.upload(blob);
}

async function generateOne(id, t) {
  process.stdout.write(`• ${id}: uploading frames … `);
  const [image_url, tail_image_url] = await Promise.all([
    uploadFrame(t.fromShot, true),
    uploadFrame(t.toStill, false),
  ]);
  process.stdout.write("generating (Kling, ~1–3 min) … ");
  const res = await fal.subscribe(MODEL, {
    input: { prompt: t.prompt, image_url, tail_image_url, duration: "5", aspect_ratio: "16:9", cfg_scale: 0.5 },
    logs: false,
  });
  const url = res?.data?.video?.url ?? res?.video?.url;
  if (!url) throw new Error("no video url in response: " + JSON.stringify(res).slice(0, 200));
  const raw = join(OUT_DIR, `${id}-raw.mp4`);
  const out = join(OUT_DIR, `${id}.mp4`);
  await writeFile(raw, Buffer.from(await (await fetch(url)).arrayBuffer()));
  // Speed to TARGET_SECONDS and re-encode smoothly (faster, glidey transition).
  process.stdout.write("speeding … ");
  const pts = (TARGET_SECONDS / KLING_SECONDS).toFixed(3);
  await exec("ffmpeg", ["-y", "-i", raw, "-filter:v", `setpts=${pts}*PTS,fps=30`, "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]);
  await rm(raw, { force: true });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const ids = args.length ? args : Object.keys(TRANSITIONS);
  console.log(`\nDeck transitions via Kling → ${OUT_DIR}\n`);
  let ok = 0, failed = 0;
  for (const id of ids) {
    const t = TRANSITIONS[id];
    if (!t) { console.log(`• skip ${id} (no spec)`); continue; }
    try { await generateOne(id, t); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }
  console.log(`\nFinished: ${ok} generated, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
