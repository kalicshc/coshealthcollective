/**
 * Public-site section imagery — same cinematic Colorado-nature style as the
 * Critical Window deck (see gen-deck-nature.mjs), generated via fal.ai FLUX
 * 1.1 [pro] ultra. Never people, never medical scenes.
 *
 *   node --env-file=.env.local scripts/gen-site-images.mjs              # all
 *   node --env-file=.env.local scripts/gen-site-images.mjs womens-hero  # one
 *
 * Writes webp into public/images/hormone/. Requires FAL_KEY.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "hormone");
mkdirSync(OUT_DIR, { recursive: true });
const ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1-ultra";

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("\n✖ FAL_KEY not found in .env.local\n"); process.exit(1); }

const PREFIX =
  "Ultra-detailed, cinematic, photorealistic Colorado landscape photograph. Dramatic natural " +
  "light, rich warm golden highlights with deep teal shadows, epic scale, awe-inspiring, shallow " +
  "atmospheric depth, subtle film grain. Absolutely no text, no words, no people, no man-made " +
  "structures, no watermarks. ";

// id → { prompt, w, h } — compositions leave negative space for headlines/panels.
const IMAGES = {
  // women's health hero: warm, hopeful dawn — validation, not gloom
  "womens-hero": {
    prompt:
      "A warm hopeful Colorado dawn over layered mountain ridgelines, the first golden light " +
      "spilling into a broad calm valley, soft rose and violet tones in the lifting night sky, " +
      "gentle mist in the low ground. The left half and lower third of the frame are calm, dark, " +
      "and uncluttered to hold a large text headline. Wide cinematic.",
    w: 2200, h: 1400,
  },
  // backdrop behind the JourneyCurve section: muted, low contrast so SVG lines read
  "journey-backdrop": {
    prompt:
      "A muted, calm Colorado mountain panorama at dusk, soft violet and deep slate-blue tones, " +
      "very low contrast, gentle atmospheric haze, no bright highlights anywhere — a quiet, " +
      "even, near-abstract gradient of ridgelines. Entire frame deliberately subdued so overlaid " +
      "line graphics stay readable. Wide cinematic.",
    w: 1920, h: 1080,
  },
  // FULL-BLEED scene images: dark zones composed exactly where text sits.
  "journey-v2": {
    prompt:
      "A clearing mountain storm over jagged snow-dusted Colorado peaks at dusk — wind-torn clouds, " +
      "one shaft of golden light breaking onto a distant ridgeline in the UPPER RIGHT corner only. " +
      "The entire left half and lower two-thirds of the frame are deep dark shadow — near-black " +
      "slate and storm tones with no highlights — deliberately dark to hold white text and graphics. " +
      "Turbulent but restrained. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "reviews-v2": {
    prompt:
      "A Colorado mountain meadow at deep dusk, tall grasses and pines in rich dark silhouette, a " +
      "faint warm amber afterglow only along the far left and right edges of the frame. The entire " +
      "center of the frame is a wide, even, very dark band with gentle atmospheric haze and zero " +
      "highlights — deliberately dark to hold centered white text and cards. Calm, intimate. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "final-v2": {
    prompt:
      "First light kissing the very top edge of a high Colorado summit ridgeline — a thin band of " +
      "warm gold along the TOP of the frame only. Below it, the lower two-thirds of the frame fall " +
      "into deep, even, near-black mountain shadow with soft haze and no highlights — deliberately " +
      "dark to hold centered white text. A quiet sense of arrival and a new beginning. Wide cinematic.",
    w: 2200, h: 1400,
  },
  // backdrop behind the reviews section: warm, human-scale, belonging
  "reviews-backdrop-v1": {
    prompt:
      "A warm golden-hour Colorado mountain meadow, soft late light glancing across tall grass and " +
      "scattered wildflowers, gentle pine-ringed slopes beyond, inviting and human-scale — a feeling " +
      "of belonging and calm. The center of the frame is even, soft, and uncluttered with no bright " +
      "highlights, so overlaid cards stay readable. Wide cinematic.",
    w: 1920, h: 1080,
  },
  // backdrop behind the final CTA: first light cresting a summit — arrival, hope
  "final-backdrop-v1": {
    prompt:
      "First light cresting a high Colorado summit ridge, warm gold spilling over crisp snow-dusted " +
      "rock into a still-shadowed valley, vast clear sky above — a quiet sense of arrival and a new " +
      "beginning. The lower half of the frame stays dark and calm to hold a text panel; no sun disk " +
      "or bright glare in the center. Wide cinematic.",
    w: 1920, h: 1080,
  },
  // backdrop behind the CriticalWindowTimeline: dusk ridgelines, NO bright
  // center — the whole frame stays subdued so the timeline and text read.
  "window-backdrop": {
    prompt:
      "Layered Colorado mountain ridgelines at late dusk, deep slate-blue and muted violet tones, " +
      "a faint soft rose afterglow low on the far left horizon only, the center and right of the " +
      "frame uniformly dark and calm with gentle atmospheric haze — no sun, no bright glow, no " +
      "light rays anywhere in the middle. Quiet, contemplative, near-abstract. Wide cinematic.",
    w: 1920, h: 1080,
  },
};

async function generateOne(id, { prompt, w, h }) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: PREFIX + prompt,
      aspect_ratio: "16:9",
      output_format: "jpeg",
      num_images: 1,
      safety_tolerance: "5",
      enable_safety_checker: false,
    }),
  });
  if (!res.ok) throw new Error(`fal ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  const url = (await res.json())?.images?.[0]?.url;
  if (!url) throw new Error("no image url in response");
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await sharp(buf).resize(w, h, { fit: "cover", position: "centre" }).webp({ quality: 84 }).toFile(join(OUT_DIR, `${id}.webp`));
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const jobs = Object.entries(IMAGES).filter(([id]) => (args.length === 0 ? true : args.some((a) => id.startsWith(a) || id === a)));
  console.log(`\nSite section imagery via FLUX → ${OUT_DIR}\n`);
  let ok = 0, failed = 0;
  for (const [id, spec] of jobs) {
    process.stdout.write(`• flux   ${id} … `);
    try { await generateOne(id, spec); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }
  console.log(`\nFinished: ${ok} generated, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
