/**
 * "The Critical Window" deck — ALL backgrounds are mood-matched Colorado NATURE, generated via
 * fal.ai FLUX 1.1 [pro] ultra (far better at photoreal landscapes than gpt-image-1). The weird
 * physiology / body-interior / clinic / desk images are gone — the glass panel carries the idea,
 * the landscape carries the feeling. One consistent cinematographer's eye across the deck.
 *
 *   node --env-file=.env.local scripts/gen-deck-nature.mjs            # all ids below
 *   node --env-file=.env.local scripts/gen-deck-nature.mjs 10 21      # only these
 *   (or: npm run gen:nature)
 *
 * Overwrites the matching ids in public/deck/stills/ at 1920×1080 webp. Requires FAL_KEY.
 * NOTE: ids 01-aurora (title) and 25-sunrise (close + QR) are intentionally NOT here — they keep
 * the real site aurora/sunrise photos. Filenames keep their old semantic names; only pixels change.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "deck", "stills");
const ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1-ultra";

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("\n✖ FAL_KEY not found in .env.local\n"); process.exit(1); }

const PREFIX =
  "Ultra-detailed, cinematic, photorealistic Colorado landscape photograph. Dramatic natural " +
  "light, rich warm golden highlights with deep teal shadows, epic scale, awe-inspiring, shallow " +
  "atmospheric depth, subtle film grain. Absolutely no text, no words, no people, no man-made " +
  "structures unless specified, no watermarks. ";

// id → mood-matched Colorado nature prompt (composition leaves space for the slide's glass panel).
const PROMPTS = {
  // 2 — "HRT is dangerous" (the scary myth): ominous
  "02-newspaper":
    "A brooding storm gathering over dark jagged Colorado peaks, heavy low clouds swallowing the summits, the last cold light fading — an ominous sense of warning. Wide cinematic shot; the center is calmer sky to hold a text panel.",
  // 3 — setting the record straight: clarity after the storm
  "03-desk-journals":
    "Crisp clean first light breaking over snow-capped Colorado peaks just after a storm clears, sharp cool blue sky, fresh and clarifying air. Wide cinematic shot; the right two-thirds open sky to hold a text panel.",
  // 4 — the thesis / the window: a natural doorway of light
  "04-doorway-vista":
    "A wide Colorado mountain valley at golden hour, tall pines framing both sides, a natural gap in a distant ridgeline glowing with warm light like an open doorway, snow-dusted peaks beyond, symmetric and contemplative with deep emotional space for a centered text panel.",
  // 5 — what you'll walk away with: the path in
  "05-forest-path":
    "A winding trail leading into a stand of tall Colorado pines and golden aspens, warm sunbeams cutting through the canopy, dust motes glowing in the light, inviting, eye-level. Composition leaves the right third open for a text panel.",
  // 6 — vocabulary: the path opens
  "06-forest-open":
    "A forest trail opening into a clearing, a break in the canopy revealing glowing golden sky and a distant peak ahead, light particles in the air, symmetric. Centered space for a text panel.",
  // 7 — the wild ride (hormone chaos): clearing storm
  "07-woman-clearing":
    "A clearing mountain storm over jagged snow-dusted Colorado peaks — wind-torn clouds racing across a vast sky, dramatic shafts of golden light breaking onto the ridgeline, turbulent and alive. Wide cinematic shot; the lower third calmer open valley to hold a text panel.",
  // 8 — you may already be in it (hidden): fogged peak
  "08-temple":
    "A lone rugged Colorado peak half-swallowed by drifting fog at dawn, much of the mountain hidden in shifting mist, mysterious and atmospheric, moody teal shadows with a faint warm glow, a sense of something powerful just out of sight. Composition leaves the right half open for a text panel.",
  // 9 — the full symptom map: many layers
  "09-tissue-macro":
    "Endless layered Colorado mountain ridgelines receding into soft dawn haze, range after range fading to pale blue and gold, vast and intricate. Centered atmospheric space for a text panel.",
  // 10 — same hormone, different soil, different outcome: split land
  "10-lock-key":
    "A dramatic split Colorado landscape divided down the middle — on the left a lush green sunlit valley with a clear winding creek, on the right arid cracked rocky high-desert under a harder grey sky — the same land, two fates. Wide cinematic; lower third calmer for a text panel.",
  // 11 — what changes: a season turning
  "11-body-interior":
    "A sweeping Colorado mountainside caught mid-autumn transition, slopes shifting from deep evergreen into blazing gold and rust aspen, the visible turning of a season, late warm raking light. Wide cinematic; the left half calmer for a text panel.",
  // 12 — the brain: the cosmos / the mind (no longer used in deck; kept for reference)
  "12-brain":
    "A breathtaking Milky Way arcing over a lone silhouetted Colorado peak on a crystal-clear night, dense brilliant stars with faint warm airglow on the horizon, vast and luminous. Centered dark sky space for a text panel.",
  // 12 — the compounding cascade: water tumbling over ledge after ledge (the chain reaction)
  "12-cascade":
    "A dramatic multi-tiered Colorado mountain waterfall cascading down a rocky canyon, white water tumbling over ledge after ledge, mist rising, framed by pines in warm golden light — a powerful sense of unstoppable, compounding downward momentum. Wide cinematic; a calmer area for a centered text panel.",
  // exercise section backgrounds
  "ex-brain":
    "First light cresting a high Colorado alpine ridge, brilliant golden sun rays fanning out across crisp clear air, an invigorating sense of energy and mental clarity. Wide cinematic; a calmer area for a centered text panel.",
  "ex-metab":
    "A clear, lively alpine stream rushing and sparkling over smooth rocks through a green sunlit Colorado meadow, a strong sense of flow, energy, and vitality. Wide cinematic; a calmer area for a centered text panel.",
  "ex-bmm":
    "A sweeping grove of golden aspens on a Colorado mountainside, sunlight pouring through the trembling leaves, vibrant, alive, and uplifting. Wide cinematic; a calmer area for a centered text panel.",
  "ex-hrt":
    "A broad, solid granite shelf at golden hour with a clear trail leading up toward warmly sunlit peaks beyond — a grounded sense of foundation and forward progress. Wide cinematic; a calmer area for a centered text panel.",
  // 13 — why timing matters (thesis restated): the vista returns
  "13-vista":
    "A wide Colorado mountain valley at deep golden hour, no doorway, the light low and warm, the valley spreading out in contemplative beauty. Centered space for a text panel.",
  // 14 — so what do you do: looking down into the valley of action
  "14-vista-down":
    "From a high Colorado ridge looking slightly down into a green meadow valley with a faint trail winding through it, late golden hour, calm and anticipatory. Centered space for a text panel.",
  // 15 — exercise: the climb
  "15-runners":
    "An epic singletrack trail carving up a dramatic Colorado mountain ridgeline at golden hour, sweeping switchbacks climbing toward a high summit, a vast glowing valley far below, a powerful sense of momentum. Wide cinematic; the lower third calmer for a text panel.",
  // 16 — lift heavy / land hard: raw strength
  "16-deadlift":
    "A massive sheer granite monolith and alpine rock face glowing in raw golden-hour light, immense and immovable, deep dramatic shadows in the cracks, sheer strength and permanence against a moody sky. Composition leaves the right half calmer for a text panel.",
  // 17 — sleep: moonlit rest
  "17-bedroom":
    "A serene moonlit Colorado alpine lake at night, perfectly still water mirroring a star-filled sky and a soft snow-dusted peak, deep blues with a gentle glow, restful and quiet. Centered space for a text panel.",
  // 17b — fixing sleep: night lifting to first light, restoration
  "17b-firstlight":
    "A Colorado mountain ridgeline at the very first light of dawn, night softly lifting, warm golden sun just cresting the peaks and spilling across crisp clear air over a calm valley, a restorative sense of a new morning and rest restored. Wide cinematic; a calmer area for a centered text panel.",
  // 18 — nutrition: vitality / abundance
  "18-kitchen":
    "A vibrant high Colorado alpine meadow bursting with summer wildflowers in full warm morning light, lush and alive, a glowing peak beyond, a feeling of vitality and abundance. Wide cinematic; the right half calmer for a text panel.",
  // 18b — fuel like an athlete: vitality / robust abundance
  "18b-vitality":
    "A sun-drenched lush green Colorado river valley in peak summer, a clear vigorous river winding through deep green meadows and pine slopes, robust growth everywhere, warm vibrant midday light, a powerful sense of vitality, energy, and abundance. Wide cinematic; a calmer area for a centered text panel.",
  // 19a — stress is an accelerant: building pressure / tension
  "19a-pressure":
    "An exposed high Colorado ridgeline under a fast-building storm, wind-bent pines straining, dark pressure-laden clouds racing in and swallowing the light, a tense charged atmosphere of mounting pressure. Wide cinematic; a calmer band of sky for a centered text panel.",
  // 19b — pivot to HRT: cresting a pass into a new sunlit valley (threshold / new way forward)
  "19b-threshold":
    "A high Colorado mountain pass cresting to reveal a vast new sunlit valley opening beyond, a clear trail leading over the saddle toward warm golden light and distant peaks, a powerful sense of a threshold and a new way forward. Wide cinematic; a calmer area for a centered text panel.",
  // 19c — other lifestyle levers / foundation & connection: grounded, together
  "19c-foundation":
    "A broad solid granite shelf high in the Colorado mountains at warm golden hour, a small sheltered stand of pines growing close together rooted in the rock, grounded and enduring, a quiet sense of foundation and standing together. Wide cinematic; a calmer area for a centered text panel.",
  // 19 — stress: deep calm
  "19-porch":
    "A perfectly still Colorado alpine tarn at dawn, low mist drifting over glassy water, soft pastel light on distant peaks, profound calm and stillness. Centered space for a text panel.",
  // 20 — HRT options: balanced, considered
  "20-clinic-table":
    "A serene high alpine basin at golden hour holding several small still tarns scattered across the meadow, soft balanced light, calm and considered. Wide cinematic; the right half calmer for a text panel.",
  // 20b — sexual health, the problem / breaking the silence: light into a once-shadowed clearing
  "21b-openlight":
    "Early morning in a calm Colorado mountain meadow ringed by tall pines, soft warm light glowing low on the horizon off to the far right, the entire center and upper portion of the frame a calm, even, gently shaded sky and treeline with no bright sun glare — deliberately quiet and uniform in the middle so a centered text panel stays readable. Wide cinematic, muted soft light, no harsh highlights in the center.",
  // 20c — sexual health, what helps / connection & vitality: two aspens grown together
  "21c-intertwined":
    "Two slender Colorado aspen trees grown closely together, their pale trunks nearly intertwined, glowing in warm golden-hour light with vibrant trembling leaves, a tender sense of closeness, warmth, and vitality. Wide cinematic; a calmer area for a centered text panel.",
  // 21 — vaginal estrogen: the single thing
  "21-vaginal-estrogen":
    "A single delicate blue-and-white Colorado columbine wildflower in sharp focus in alpine tundra, soft mountain bokeh and warm light behind it, intimate and singular. Centered space for a text panel.",
  // 22 — finding a provider: the way forward
  "22-two-chairs":
    "A clear inviting trail winding gently upward through open Colorado high country toward warmly sunlit peaks, a sense of a good path forward, late golden light. Wide cinematic; the left half calmer for a text panel.",
  // 23 — what to ask your doctor: the planning vantage
  "23-notebook":
    "A high Colorado overlook at golden hour with a commanding view over layered ridgelines and a valley below, the vantage of someone planning a route, warm clear light. Wide cinematic; the right half calmer for a text panel.",
  // 24 — for the partners: two, together
  "24-couple-bench":
    "Two prominent Colorado mountain peaks rising side by side, catching the last warm golden light at sunset, standing together against a vast deepening sky with mist pooling in the valley between them, a quiet sense of partnership and permanence. Wide cinematic; the lower third calmer for a text panel.",
};

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
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await sharp(buf).resize(1920, 1080, { fit: "cover", position: "centre" }).webp({ quality: 84 }).toFile(join(OUT_DIR, `${id}.webp`));
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const jobs = Object.entries(PROMPTS).filter(([id]) => (args.length === 0 ? true : args.some((a) => id.startsWith(a) || id === a)));
  console.log(`\nColorado nature backgrounds via FLUX → ${OUT_DIR}\n`);
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
