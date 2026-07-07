// One-shot image optimizer for the public site's heaviest assets.
// Idempotent: re-running skips files already under their size budget.
// Usage: node scripts/optimize-images.mjs
import sharp from "sharp";
import { statSync, renameSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const pub = (p) => join(ROOT, "public", p);
const kb = (p) => Math.round(statSync(p).size / 1024);

async function replaceInPlace(path, pipeline, budgetKB) {
  if (kb(path) <= budgetKB) {
    console.log(`skip (under ${budgetKB}KB): ${path.replace(ROOT, "")} — ${kb(path)}KB`);
    return;
  }
  const before = kb(path);
  const tmp = path + ".tmp";
  await pipeline(sharp(path)).toFile(tmp);
  renameSync(tmp, path);
  console.log(`${path.replace(ROOT, "")}: ${before}KB -> ${kb(path)}KB`);
}

async function writeTo(src, dest, pipeline) {
  await pipeline(sharp(src)).toFile(dest);
  console.log(`${dest.replace(ROOT, "")}: ${kb(dest)}KB (from ${src.replace(ROOT, "")})`);
}

// --- Favicons (Next file conventions: src/app/icon.png, src/app/apple-icon.png)
await writeTo(pub("logo-main.png"), join(ROOT, "src/app/icon.png"), (s) =>
  s.resize(512, 512).png({ compressionLevel: 9, palette: true, quality: 90 })
);
await writeTo(pub("logo-main.png"), join(ROOT, "src/app/apple-icon.png"), (s) =>
  s.resize(180, 180).png({ compressionLevel: 9, palette: true, quality: 90 })
);

// --- Logos: recompress in place at native 1024px (referenced by ~28 files incl. print)
for (const name of ["logo-main.png", "logo.png"]) {
  await replaceInPlace(pub(name), (s) => s.png({ compressionLevel: 9, palette: true, quality: 95 }), 400);
}

// --- Chatbot avatar: raw <img> consumer, needs a small WebP (refs updated in ChatbotWidget.tsx)
await writeTo(pub("images/chatbot/kali-ai-dog.png"), pub("images/chatbot/kali-ai-dog.webp"), (s) =>
  s.resize(512, 512).webp({ quality: 82 })
);

// --- OG share image: fetched raw by scrapers, keep filename
await replaceInPlace(pub("share-aurora.png"), (s) => s.png({ compressionLevel: 9, palette: true, quality: 90 }), 300);

// --- Blog heroes: files are mislabeled PNGs with .jpg extensions; write real JPEG bytes back
const heroes = [
  "blog/dpc-hero.jpg",
  "blog/flu-shot-hero.jpg",
  "blog/hbot-hero.jpg",
  "blog/hrt-critical-window-hero.jpg",
  "blog/metabolic-health-hero.jpg",
  "blog/save-money-hero.jpg",
  "blog/skiing-hero.jpg",
  "blog/why-dpc-hero.jpg",
];
for (const rel of heroes) {
  if (!existsSync(pub(rel))) { console.log(`missing: ${rel}`); continue; }
  await replaceInPlace(pub(rel), (s) => s.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 75, mozjpeg: true }), 350);
}

// --- About/referral portrait: PNG photo, convert bytes to JPEG-quality PNG replacement is poor —
// served via next/image so delivery is optimized; still shrink the source for deploy weight.
await replaceInPlace(pub("logan-photo.png"), (s) => s.resize({ width: 1280, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 }), 600);

console.log("done");
