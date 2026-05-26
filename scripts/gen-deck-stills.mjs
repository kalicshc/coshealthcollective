/**
 * Generate the photoreal background stills for the "Critical Window" deck (v2).
 *
 *   node --env-file=.env.local scripts/gen-deck-stills.mjs            # all, skip existing
 *   node --env-file=.env.local scripts/gen-deck-stills.mjs --force    # regenerate all
 *   node --env-file=.env.local scripts/gen-deck-stills.mjs 14 15      # only these ids
 *
 * fal.ai FLUX 1.1 [pro] ultra → sharp → 1920×1080 webp into public/deck/stills/.
 *
 * Sequenced as ONE day-cycle journey (night → dawn → into the body → daylight →
 * golden hour → sunrise). Biology beats use photoreal MEDICAL-CINEMATIC direction
 * (high-end documentary / 3D medical visualization), not abstract fractal/stock.
 * Every prompt forbids baked-in text/faces so the glass headlines stay clean.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "deck", "stills");
const ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1-ultra";

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error("\n✖ FAL_KEY not found. Run: node --env-file=.env.local scripts/gen-deck-stills.mjs\n");
  process.exit(1);
}

const PREFIX =
  "Ultra-detailed, cinematic, photorealistic. Rich natural color, dramatic light, " +
  "shallow depth of field, balanced negative space for an overlay. Absolutely no text, " +
  "no words, no lettering, no logos, no watermarks, no captions. ";

// Shared style note for the body/biology beats — keeps them a consistent, premium,
// scientifically-grounded look (not particle-stock or fractal abstractions).
const BIO =
  "Hyperreal medical visualization in the style of a high-end science documentary " +
  "(volumetric light, true depth, subsurface scattering, microscopy realism), cinematic and beautiful, ";

const PROMPTS = {
  // ── NIGHT ──
  "01-aurora-human":
    "A lone person in warm winter gear seen from behind, small in frame, standing in a wide Colorado mountain valley at night, gazing up at a vivid aurora borealis with teal and violet curtains of light and a dense field of stars. A soft headlamp beam rises into the sky like a long-exposure photo. Snow-dusted pines, distant peaks, vast awe-inspiring sky. Silhouette, face not visible.",
  "02-night-sky":
    "A vast, dramatic deep-blue night sky thick with stars over a dark silhouetted Colorado mountain ridgeline, faint cool moonlight, a brooding and serious mood, cinematic wide shot, lots of open sky.",
  "03-night-ridge":
    "A moonlit Colorado mountain ridge at night under a deep starfield, cool blue tones, long shadows on snow, quiet and contemplative, cinematic, generous sky for an overlay.",
  "04-predawn-glow":
    "The blue hour just before sunrise over Colorado peaks — the first faint warm amber glow breaking on the horizon against a still-dark sky, hopeful, calm, cinematic wide landscape.",
  "05-firstlight-valley":
    "A broad Colorado mountain valley at the golden moment of first light, a single warm shaft of sun breaking through and lighting the valley floor, drifting mist, layered ridgelines, epic and hopeful, expansive sky.",
  "06-aspens":
    "Warm sunrise light filtering through a grove of golden aspen trees in autumn in Colorado, soft dappled light, gentle bokeh, serene and inviting, shallow depth of field, cinematic.",

  // ── DAWN — reach the woman ──
  "07-dawn-figure":
    "A woman seen from behind standing on a gentle alpine rise at warm dawn, looking out over Colorado mountains as light spills across the valley, calm and contemplative, winter-spring layers, cinematic wide shot, face not visible.",
  "08-dawn-into":
    BIO + "an ethereal transition where warm dawn light over a soft landscape dissolves into the luminous interior of the human body — golden light flowing into delicate living tissue and a faint glowing vessel network, dreamlike threshold, teal and amber, the world turning inward.",

  // ── DESCEND INTO THE BODY ──
  "09-descent-skin":
    BIO + "a cinematic macro descent toward and just beneath warm human skin, soft golden subsurface glow, fine detail, the camera beginning to travel inward, atmospheric and intimate.",
  "10-into-body":
    BIO + "a continuous flight through the warm luminous interior of the human body, soft glowing tissue and a delicate network of vessels receding into depth, gentle teal and amber bioluminescence, strong sense of travel and depth.",
  "11-cells-estrogen":
    BIO + "an elegant cluster of living human cells viewed up close, translucent membranes catching soft teal and violet light, organelles faintly glowing, pristine and harmonious, shallow depth of field.",
  "12-cells-two":
    BIO + "living human cells in soft focus with warm amber and teal interior light, a slightly different angle and warmer tone than before, delicate and detailed, the quiet beauty of biology.",
  "13-receptors":
    BIO + "an extreme close-up of a cell surface dotted with glowing receptor sites like tiny keyholes, a hormone molecule drifting toward one, soft teal light on a healthy membrane, refined scientific elegance, shallow depth of field.",
  "14-vessel":
    BIO + "flying down the inside of a healthy human blood vessel, warm red translucent walls catching light, smooth red blood cells drifting past, luminous depth and a strong sense of forward motion through the body.",
  "15-brain":
    BIO + "a human brain rendered as glowing neural tissue with warm amber energy flowing through its pathways like fuel, deep teal and gold against a dark background, intricate and beautiful, generous dark negative space.",
  "16-window-light":
    "A radiant shaft of warm sunlight breaking through a mountain pass at dawn, forming a luminous doorway of light in the Colorado landscape, hopeful and dramatic, a threshold of opportunity, cinematic, open sky.",

  // ── DAYLIGHT — what to do ──
  "17-summit-path":
    "A person seen from behind at the start of a trail looking toward sunlit Colorado peaks in clear morning light, a sense of decision and momentum, cinematic wide shot, face not visible.",
  "18-trail-run":
    "A fit woman in her late 40s trail running with energy and joy along a sunlit mountain path in the morning, dynamic and alive, warm light, editorial sports photography, three-quarter back view so the face isn't the focus.",
  "19-lifting":
    "A strong, capable woman in her early fifties lifting a loaded barbell with confident, powerful form in a sun-washed gym, warm natural light, determined, editorial sports photography, shallow depth of field, three-quarter back view.",
  "20-plate":
    "An overhead cinematic photograph of a nourishing Mediterranean whole-food meal — grilled salmon, leafy greens, olive oil, lemon, whole grains, a small bowl of berries — warm natural light on a rustic table, appetizing and wholesome, editorial food photography.",
  "21-protein":
    "A bright cinematic kitchen-counter still life of protein-rich whole foods — eggs, Greek yogurt, salmon, chicken, legumes, cottage cheese — arranged simply in warm daylight, fresh and wholesome, editorial food photography, shallow depth of field.",
  "22-calm-lake":
    "A person seen from behind sitting calmly at the edge of a still alpine lake in warm late-afternoon light, Colorado mountains mirrored in the water, peaceful and grounded, cinematic, serene, face not visible.",
  "23-night-rest":
    "A serene, softly lit bedroom at night with moonlight through sheer curtains, a calm and restful mood, cool blue tones with gentle warmth, peaceful and safe, cinematic, shallow depth of field, no people.",

  // ── transition back up ──
  "24-two-women":
    "Two women — one in her mid-forties, one in her late seventies — strong and confident in athletic wear, walking together on a mountain trail in warm morning light, vibrant and alive, a shared journey across a lifetime, editorial cinematic photography, faces soft and not the focus.",

  // ── GOLDEN HOUR — HRT ──
  "25-golden-figure":
    "A woman seen from behind standing on a hillside at golden hour, warm low sun across Colorado mountains, contemplative and hopeful, a moment of decision, cinematic, face not visible.",
  "26-provider":
    "A warm modern medical consultation room with two comfortable chairs facing each other near a window glowing with late-afternoon light and a few plants, calm and unhurried, inviting, editorial interior photography, no people.",
  "27-hrt":
    "A clean, warm, softly lit still life suggesting modern personalized medicine — a small skin patch and a little amber glass bottle on a calm neutral surface beside a sprig of greenery, golden-hour light, minimal and reassuring, editorial, no readable labels.",
  "28-warmth":
    "Warm golden-hour light falling across sheer curtains by a window, gentle and reassuring, soft warm neutral tones, comforting and safe, editorial, shallow depth of field, no people.",
  "29-appointment":
    "A calm warm doctor's-office desk by a window in golden afternoon light, an open notebook and pen, a small plant, uncluttered and inviting, editorial, shallow depth of field, no people, no readable text.",

  // ── SUNRISE — close ──
  "30-sunrise":
    "An expansive Colorado mountain sunrise, warm golden light flooding over layered peaks and valley mist, hopeful and triumphant, the full circle from night to dawn, cinematic wide landscape, vast open sky.",
  "31-summit":
    "A person standing relaxed on a mountain summit at sunrise looking out over a sea of peaks bathed in warm golden light, triumphant and hopeful, seen from behind as a silhouette, cinematic, Colorado, vast sky, face not visible.",
};

const fileExists = (p) => access(p).then(() => true).catch(() => false);

async function generateOne(id, prompt) {
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
  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`download failed ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await sharp(buf).resize(1920, 1080, { fit: "cover", position: "centre" }).webp({ quality: 82 }).toFile(join(OUT_DIR, `${id}.webp`));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const idArgs = args.filter((a) => !a.startsWith("--"));
  const entries = Object.entries(PROMPTS).filter(([id]) =>
    idArgs.length === 0 ? true : idArgs.some((a) => id.startsWith(a) || id === a),
  );
  console.log(`\nGenerating ${entries.length} still(s) → ${OUT_DIR}${force ? "  (--force)" : ""}\n`);
  let ok = 0, skipped = 0, failed = 0;
  for (const [id, prompt] of entries) {
    if (!force && (await fileExists(join(OUT_DIR, `${id}.webp`)))) { console.log(`• skip   ${id}`); skipped++; continue; }
    process.stdout.write(`• gen    ${id} … `);
    try { await generateOne(id, prompt); console.log("done"); ok++; }
    catch (err) { console.log(`FAILED — ${err.message}`); failed++; }
  }
  console.log(`\nFinished: ${ok} generated, ${skipped} skipped, ${failed} failed.\n`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
