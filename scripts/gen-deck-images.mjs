/**
 * Generate the photo-real background stills for "The Critical Window" deck (v2 — Journey Edition).
 *
 *   node --env-file=.env.local scripts/gen-deck-images.mjs            # all, skip existing
 *   node --env-file=.env.local scripts/gen-deck-images.mjs --force    # regenerate all
 *   node --env-file=.env.local scripts/gen-deck-images.mjs 16 20      # only these slide ids
 *   (or: npm run gen:images -- 16 20)
 *
 * Engine: OpenAI gpt-image-1 → 1536×1024 → sharp cover → 1920×1080 webp into public/deck/stills/.
 * Two slides reuse the real site aurora assets for the full-circle bookend (slide 1 = blue-hour
 * aurora, slides 25/26 = sunrise) — copied/cropped, not generated.
 *
 * Every prompt gets the Part-1 cinematic style spec appended and forbids baked-in text/labels so
 * the frosted-glass headlines stay clean. Prompts are verbatim from the build brief (Part 4).
 *
 * Requires OPENAI_API_KEY in .env.local. (gpt-image-1 may require OpenAI org verification; a 403
 * mentioning "verify organization" means that's the blocker — verify in the OpenAI dashboard.)
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "deck", "stills");
const PREVIEW_DIR = join(ROOT, "public", "preview");
const ENDPOINT = "https://api.openai.com/v1/images/generations";

const KEY = process.env.OPENAI_API_KEY;

// Part 1 — cinematic style spec, appended to every generated prompt.
const STYLE =
  " — Photo-realistic cinematic still. Shot on a high-end full-frame camera with a prime lens. " +
  "Color graded in a warm, contemplative palette — golden hour highlights, deep teal shadows, " +
  "soft fleshtones, muted terracotta accents. Subtle film grain. Shallow depth of field where " +
  "appropriate. Composition leaves room for a centered or off-center text panel. NOT illustration, " +
  "NOT cartoon, NOT 3D render. Reference aesthetic: Planet Earth documentary, Apple campaign films, " +
  "Terrence Malick cinematography. 16:9 widescreen. No legible text, words, letters, labels, logos, " +
  "or watermarks anywhere in the image.";

// Slides that reuse the existing site aurora photos (full-circle bookend). source → out id.
const AURORA = {
  "01-aurora": "aurora1.webp",   // blue-hour aurora over the ridge (title)
  "25-sunrise": "aurora6.webp",  // sunrise over the same ridge (close + QR)
};

// gpt-image-1 prompts, keyed by still id. Verbatim STILL IMAGE copy from Part 4.
const PROMPTS = {
  "02-newspaper":
    "A close-up overhead photo of a yellowed 2002 newspaper on a warm wooden desk, soft window light from the left, slight coffee ring near the page, a pair of reading glasses just out of focus at the edge. The visible headline area is intentionally blank to make room for a text panel. Shallow depth of field. Warm tones.",
  "03-desk-journals":
    "An overhead-angled photo of a warm wooden desk in soft window light. A 2002 newspaper on the left, a few scattered medical journal articles, an open researcher's notebook with handwriting. Composition leaves the right two-thirds available for a text panel. Shallow depth of field. Warm tones.",
  "04-doorway-vista":
    "A wide cinematic landscape photograph: a Colorado mountain valley at golden hour. Tall pines frame the foreground on either side. In the middle distance, a weathered stone doorway stands in a meadow, with warm golden light streaming through it from the far side. The mountains rise beyond, snow-dusted at the peaks. The composition is symmetric, contemplative, with deep emotional space.",
  "05-forest-path":
    "A winding dirt path leading into a forest of tall pines, golden sunlight beams cutting through the canopy, soft particles of dust illuminated in the light. Camera at standing eye level, path receding into middle distance. The composition leaves the right third available for a text panel.",
  "06-forest-open":
    "A continuation of a forest path, now slightly more open, with a break in the tree canopy revealing soft golden sky ahead. Camera at standing eye level, path leading forward. Light particles in the air. Composition is symmetric to hold a centered text panel.",
  "07-woman-clearing":
    "A woman in her late 40s stands at the edge of a forest clearing, facing away from the camera, looking out at the open sky. She wears a simple cream sweater. Soft warm light catches her hair. Camera is just behind her right shoulder. Composition leaves the bottom third available for a text panel. The mood is contemplative.",
  "08-temple":
    "Extreme close-up portrait of a woman in her late 40s, side profile, focused on her temple and eye. Soft warm light. Her expression is thoughtful, slightly weary. Shallow depth of field with the eye in sharp focus. Composition leaves the right half available for a text panel.",
  "09-tissue-macro":
    "A macro photograph aesthetic showing the soft warm interior of human tissue — diffuse capillaries glowing with amber backlight, soft pinks and golds, a sense of warm wet light. Abstract enough to feel beautiful, anatomically suggestive enough to feel like we have gone inside the body. Cinematic, not medical-textbook. Composition leaves the center available for a text panel.",
  "10-lock-key":
    "A cinematic close-up that looks photo-realistic but is clearly conceptual: two cell-membrane surfaces side by side, divided by a soft vertical glow. On the LEFT, the healthy side: a clean, well-formed lock embedded in the membrane, surrounded by calm teal particles, a small bronze key sliding smoothly into it. On the RIGHT, the inflamed side: the same lock distorted and surrounded by chaotic warm terracotta particles, the same key not quite fitting. The metaphor is clear without being cartoonish. Macro-cinematic quality. Composition leaves the bottom third for a text panel.",
  "11-body-interior":
    "A cinematic interior-of-the-body composition: seemingly inside the torso, with soft warm light revealing the silhouette of a rib cage, hints of vertebrae, a glimpse of vessel structure, all in soft focus and warm tones. Beautiful, not medical. Like an artful long exposure of a body interior. Composition leaves the left half available for a text panel.",
  "12-brain":
    "A cinematic interior view of the brain: soft amber light flowing through neural pathways, the texture of brain tissue rendered beautifully and abstractly, deep teal shadows in the folds, warm gold light through the architecture. Feels like flying through a glowing cathedral. Not medical-textbook. Composition leaves the center available for a text panel.",
  "13-vista":
    "A wide Colorado mountain valley vista at golden hour, with no doorway in frame. The light is a touch lower and warmer than midday. The valley spreads out in deep contemplative beauty. Composition leaves the center available for a text panel.",
  "14-vista-down":
    "A Colorado mountain vista where the camera looks slightly downward into a green meadow valley below, with a small distant trail winding through it. Late golden hour light. Composition is calm and anticipatory, with center space for a text panel.",
  "15-runners":
    "A wide cinematic shot of a couple in their late 40s running together along a dirt trail through a green Colorado meadow. Both in athletic wear, mid-stride, side view, mountains rising behind them, late golden hour light. Real and grounded, not glossy fitness-stock. Composition leaves the bottom third available for a text panel.",
  "16-deadlift":
    "A woman in her late 40s mid-deadlift outdoors in a meadow clearing, a simple barbell with bumper plates, her form strong and focused. Her partner stands behind her spotting, attentive but not intrusive. Late golden hour light. Mountains in the distant background. Real and gritty, not glossy. Composition leaves the right half available for a text panel.",
  "17-bedroom":
    "A softly lit bedroom at night. A person asleep on their side beneath warm covers, only their hair visible. A bedside lamp casts a warm amber glow. The window beyond shows a deep blue night sky with stars. The composition is quiet and restorative. Composition leaves the center available for a text panel.",
  "18-kitchen":
    "A warm kitchen in soft morning light, window light from the left. On a wooden cutting board: a fillet of salmon, fresh greens, a halved lemon, a small bowl of olive oil, a sprig of herbs. Hands lightly in frame at the edge, prepping. Shallow depth of field. The composition feels lived-in, not staged. Composition leaves the right half available for a text panel.",
  "19-porch":
    "A wooden porch facing a mountain view in soft morning light. A person sits in a simple chair facing the view, partially in silhouette, holding a warm cup. Soft mountain mist in the middle distance. The composition is quiet and meditative. Center space available for a text panel.",
  "20-clinic-table":
    "A warm consultation room with wood-paneled walls, soft window light from the left. A small clean side table with a few discreetly arranged items — a transdermal patch, a tube of gel, a blister pack of pills, a small bottle. Real but discreet, not advertising. Shallow depth of field with the patch in focus. Composition leaves the right half available for a text panel.",
  "21-vaginal-estrogen":
    "A warm consultation room, camera angle close in on a single small tube on a wooden table. Other items are softly out of focus in the background. Window light still from the left. Composition is intimate and focused, leaving the center available for a text panel.",
  "22-two-chairs":
    "A warm consultation room, camera pulled back. Two simple wooden chairs face each other across a small low table. Soft daylight through the window behind. No people in frame — the room is waiting. Warm and welcoming. Composition leaves the left half available for a text panel.",
  "23-notebook":
    "Close-up on an open blank notebook on a small wooden side table, a pen resting beside it. Soft warm light from the side. Shallow depth of field with the notebook in sharp focus. Composition leaves the right half available for a text panel.",
  "24-couple-bench":
    "A couple in their late 40s sits side by side on a wooden bench on a porch, facing away from the camera, looking out at a late-afternoon mountain landscape. They are close but not touching, two figures in soft silhouette against warm light. The composition is quiet, partnered, unforced. Composition leaves the bottom third available for a text panel.",
};

const fileExists = (p) => access(p).then(() => true).catch(() => false);

async function toWebp(buf, id) {
  await sharp(buf).resize(1920, 1080, { fit: "cover", position: "centre" }).webp({ quality: 84 }).toFile(join(OUT_DIR, `${id}.webp`));
}

async function generateOne(id, prompt) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: prompt + STYLE,
      size: "1536x1024",
      quality: "high",
      n: 1,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  const data = (await res.json())?.data?.[0];
  let buf;
  if (data?.b64_json) buf = Buffer.from(data.b64_json, "base64");
  else if (data?.url) buf = Buffer.from(await (await fetch(data.url)).arrayBuffer());
  else throw new Error("no image data in response");
  await toWebp(buf, id);
}

async function copyAurora(id, source) {
  const src = join(PREVIEW_DIR, source);
  if (!(await fileExists(src))) throw new Error(`source not found: ${src}`);
  const buf = await sharp(src).resize(1920, 1080, { fit: "cover", position: "centre" }).webp({ quality: 84 }).toBuffer();
  await writeFile(join(OUT_DIR, `${id}.webp`), buf);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const idArgs = args.filter((a) => !a.startsWith("--"));
  const match = (id) => (idArgs.length === 0 ? true : idArgs.some((a) => id.startsWith(a) || id === a));

  // Aurora copies (never need the OpenAI key).
  const auroraJobs = Object.entries(AURORA).filter(([id]) => match(id));
  // gpt-image-1 jobs.
  const genJobs = Object.entries(PROMPTS).filter(([id]) => match(id));

  if (genJobs.length && !KEY) {
    console.error("\n✖ OPENAI_API_KEY not found in .env.local. Add it, then re-run:\n  npm run gen:images\n");
    process.exit(1);
  }

  console.log(`\nDeck images → ${OUT_DIR}${force ? "  (--force)" : ""}\n`);
  let ok = 0, skipped = 0, failed = 0;

  for (const [id, source] of auroraJobs) {
    if (!force && (await fileExists(join(OUT_DIR, `${id}.webp`)))) { console.log(`• skip   ${id}`); skipped++; continue; }
    process.stdout.write(`• aurora ${id} ← ${source} … `);
    try { await copyAurora(id, source); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }

  for (const [id, prompt] of genJobs) {
    if (!force && (await fileExists(join(OUT_DIR, `${id}.webp`)))) { console.log(`• skip   ${id}`); skipped++; continue; }
    process.stdout.write(`• gen    ${id} … `);
    try { await generateOne(id, prompt); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }

  console.log(`\nFinished: ${ok} generated, ${skipped} skipped, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
