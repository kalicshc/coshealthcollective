/**
 * Public-site section imagery — same cinematic Colorado-nature style as the
 * Critical Window deck (see gen-deck-nature.mjs), generated via fal.ai FLUX
 * 1.1 [pro] ultra. Never people, never medical scenes.
 *
 *   node --env-file=.env.local scripts/gen-site-images.mjs              # all
 *   node --env-file=.env.local scripts/gen-site-images.mjs womens-hero  # one
 *
 * Writes webp into public/images/<dir>/ (per-image `dir`, default "hormone").
 * Requires FAL_KEY.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = join(__dirname, "..", "public", "images");
const outDirFor = (dir = "hormone") => {
  const out = join(IMAGES_ROOT, dir);
  mkdirSync(out, { recursive: true });
  return out;
};
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

  // ── DPC epic page scenes — cool royal-blue moods (ACCENTS.dpc) ──────────
  "dpc-hero": {
    dir: "dpc",
    prompt:
      "Blue-hour dawn over the Colorado Front Range, deep royal-blue and indigo sky over crisp " +
      "snow-lined ridgelines, the faintest cool pre-sunrise glow along the horizon on the far right. " +
      "The left half and lower third of the frame are calm, deep-shadowed, and uncluttered — near-dark " +
      "slate-blue tones with no highlights — deliberately dark to hold a large white headline. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "dpc-membership": {
    dir: "dpc",
    prompt:
      "A calm Colorado pine valley in steady early-morning light, soft cool blue tones with a hint " +
      "of warm gold on the highest treetops in the UPPER RIGHT only, gentle mist between the pines. " +
      "The left half and lower two-thirds of the frame are even, dark, and quiet with no highlights — " +
      "deliberately dark to hold white text and glass cards. Grounded, reassuring. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "dpc-final": {
    dir: "dpc",
    prompt:
      "An open high-country trail leading toward sunlit Colorado peaks at first light — a narrow band " +
      "of warm gold on the distant summits at the TOP of the frame only, a quiet sense of forward " +
      "motion and beginning. The lower two-thirds of the frame fall into deep, even, near-black " +
      "blue-shadow with soft haze and no highlights — deliberately dark to hold centered white text. Wide cinematic.",
    w: 2200, h: 1400,
  },

  // ── Hyperbaric epic page scenes — ice-blue / cyan moods (ACCENTS.hyperbaric) ──
  "hbot-hero": {
    dir: "hyperbaric",
    prompt:
      "A low-key, dark-exposure photograph of a glacial alpine lake beneath jagged Colorado peaks at " +
      "deep blue-hour dusk, still ice-blue and cyan-teal water barely catching the last cold light on " +
      "the FAR RIGHT only. Underexposed overall: the sky is deep dark teal-navy, the left half and " +
      "lower two-thirds of the frame are near-black shadow with zero highlights — deliberately very " +
      "dark to hold a large white headline and a form panel. Pristine, awe-inspiring. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "hbot-depth": {
    dir: "hyperbaric",
    prompt:
      "Deep turquoise water of a high mountain lake seen from just beneath the surface, shafts of " +
      "cool light breaking down into the depths in the UPPER RIGHT corner only, fading to profound " +
      "dark teal below. The left half and lower two-thirds of the frame are an even, very dark " +
      "blue-black with no highlights — a feeling of pressure and depth — deliberately dark to hold " +
      "white text. Near-abstract. Wide cinematic.",
    w: 2200, h: 1400,
  },
  "hbot-final": {
    dir: "hyperbaric",
    prompt:
      "A dark winter night photograph of a Colorado alpine valley under deep twilight, snow-dusted " +
      "pines in near-black silhouette, a cold cyan-teal glow of the last light hugging the distant " +
      "ridgeline at the very TOP of the frame, faint stars appearing in a deep navy sky. Night " +
      "exposure: the entire lower two-thirds of the frame are even, near-black blue shadow with zero " +
      "bright highlights — deliberately very dark to hold centered white text and a form. Still, " +
      "clean, expectant. Wide cinematic.",
    w: 2200, h: 1400,
  },
};

async function generateOne(id, { prompt, w, h, dir }) {
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
  await sharp(buf).resize(w, h, { fit: "cover", position: "centre" }).webp({ quality: 84 }).toFile(join(outDirFor(dir), `${id}.webp`));
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const jobs = Object.entries(IMAGES).filter(([id]) => (args.length === 0 ? true : args.some((a) => id.startsWith(a) || id === a)));
  console.log(`\nSite section imagery via FLUX → ${IMAGES_ROOT}/<dir>\n`);
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
