/**
 * Dashboard ambient background — one dark, moody Colorado night ridge with a
 * teal-aqua aurora glow, generated via fal.ai FLUX 1.1 [pro] ultra (same
 * pipeline as the Critical Window deck). Replaces the hot-linked Unsplash
 * photo in dashboard/app/globals.css body::before.
 *
 *   node --env-file=.env.local scripts/gen-dashboard-bg.mjs
 *
 * Writes dashboard/public/bg-night.webp (1920×1080, heavily compressed —
 * it renders at 34% opacity under a soft-light blend, so quality can be low).
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "dashboard", "public", "bg-night.webp");
const ENDPOINT = "https://fal.run/fal-ai/flux-pro/v1.1-ultra";

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("\n✖ FAL_KEY not found in .env.local\n"); process.exit(1); }

const PROMPT =
  "Ultra-detailed, cinematic, photorealistic Colorado landscape photograph at night. " +
  "Jagged dark mountain ridgeline silhouetted against a deep navy night sky, a luminous " +
  "teal-and-aqua aurora band flowing above the peaks with a faint violet edge, dense field " +
  "of stars, subtle cool atmospheric haze in the valley, very dark and moody overall — " +
  "deep shadows dominate, the aurora is the only light source. Epic scale, awe-inspiring, " +
  "subtle film grain. Absolutely no text, no words, no people, no man-made structures, " +
  "no watermarks. Composition: ridgeline in the lower quarter, vast sky above.";

async function main() {
  console.log("→ generating dashboard night background…");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: PROMPT,
      aspect_ratio: "16:9",
      output_format: "png",
      safety_tolerance: "2",
    }),
  });
  if (!res.ok) throw new Error(`fal.run ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const url = data.images?.[0]?.url;
  if (!url) throw new Error(`no image url in response: ${JSON.stringify(data).slice(0, 300)}`);

  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  await sharp(buf)
    .resize(1920, 1080, { fit: "cover" })
    .webp({ quality: 62 })
    .toFile(OUT);
  const { size } = await import("node:fs").then((fs) => fs.promises.stat(OUT));
  console.log(`✓ wrote ${OUT} (${Math.round(size / 1024)}KB)`);
}

main().catch((err) => { console.error("✖", err.message); process.exit(1); });
