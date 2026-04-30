/**
 * FedEx-friendly PDF Export
 * -------------------------
 * Re-saves print-export PDFs at page sizes FedEx's mobile uploader
 * + iOS Mail forwarding actually handle correctly:
 *   - Letter (8.5" × 11")
 *   - Tabloid (11" × 17")
 *
 * Reads the high-res PNGs already in print-exports/ and embeds them
 * into a fresh PDF at a standard sheet size. Also fixes the
 * business-card front/back PDF bug (the originals are 4-page files
 * with identical content).
 *
 * Usage:
 *   node scripts/export-fedex-pdfs.mjs
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const EXPORT_DIR = path.join(ROOT, 'print-exports');

// Each entry says: read this PNG, place it at `trim` size, save as a PDF
// at `sheet` size. trim==sheet means full-bleed at native size — the PDF
// is a raster image at high DPI. iOS Mail renders these reliably (vector
// PDFs with text-shadow blurs and gradient text-fills get mangled).
const JOBS = [
  // 5×7 flyers — native size, full bleed
  {
    pngPath: 'social-flyer/social-flyer.png',
    outPath: 'social-flyer/social-flyer-raster.pdf',
    trim:  { w: 5, h: 7 },
    sheet: { w: 5, h: 7 },
    cropMarks: false,
  },
  {
    pngPath: 'free-consult-flyer/free-consult-flyer.png',
    outPath: 'free-consult-flyer/free-consult-flyer-raster.pdf',
    trim:  { w: 5, h: 7 },
    sheet: { w: 5, h: 7 },
    cropMarks: false,
  },
  {
    pngPath: 'hbot-flyer/hbot-flyer.png',
    outPath: 'hbot-flyer/hbot-flyer-raster.pdf',
    trim:  { w: 5, h: 7 },
    sheet: { w: 5, h: 7 },
    cropMarks: false,
  },

  // 17×11 grip-strength sheets — native size, full bleed
  {
    pngPath: 'grip-strength-banner/grip-strength-banner.png',
    outPath: 'grip-strength-banner/grip-strength-banner-raster.pdf',
    trim:  { w: 17, h: 11 },
    sheet: { w: 17, h: 11 },
    cropMarks: false,
  },
  {
    pngPath: 'grip-strength-tiers/grip-strength-tiers.png',
    outPath: 'grip-strength-tiers/grip-strength-tiers-raster.pdf',
    trim:  { w: 17, h: 11 },
    sheet: { w: 17, h: 11 },
    cropMarks: false,
  },

  // Business cards — native size with bleed
  {
    pngPath: 'business-card/business-card-front.png',
    outPath: 'business-card/business-card-front-raster.pdf',
    trim:  { w: 3.75, h: 2.25 },
    sheet: { w: 3.75, h: 2.25 },
    cropMarks: false,
  },
  {
    pngPath: 'business-card/business-card-back.png',
    outPath: 'business-card/business-card-back-raster.pdf',
    trim:  { w: 3.75, h: 2.25 },
    sheet: { w: 3.75, h: 2.25 },
    cropMarks: false,
  },
];

function buildHtml({ pngDataUrl, trim, sheet, cropMarks }) {
  const showMarks = cropMarks && (sheet.w > trim.w || sheet.h > trim.h);
  const tickLen = 0.18;     // inches
  const tickGap = 0.06;     // inches between trim edge and tick start
  const tickWidth = 0.4;    // pt (visible but thin)

  const cropCss = showMarks ? `
    .mark {
      position: absolute;
      background: #000;
    }
    .mark.h { height: ${tickWidth}pt; width: ${tickLen}in; }
    .mark.v { width:  ${tickWidth}pt; height: ${tickLen}in; }
    /* Top-left corner */
    .tl-h { top: 0;                           left: -${tickLen + tickGap}in; }
    .tl-v { top: -${tickLen + tickGap}in;     left: 0; }
    /* Top-right corner */
    .tr-h { top: 0;                           right: -${tickLen + tickGap}in; }
    .tr-v { top: -${tickLen + tickGap}in;     right: 0; }
    /* Bottom-left corner */
    .bl-h { bottom: 0;                        left: -${tickLen + tickGap}in; }
    .bl-v { bottom: -${tickLen + tickGap}in;  left: 0; }
    /* Bottom-right corner */
    .br-h { bottom: 0;                        right: -${tickLen + tickGap}in; }
    .br-v { bottom: -${tickLen + tickGap}in;  right: 0; }
  ` : '';

  const cropMarkup = showMarks ? `
    <span class="mark h tl-h"></span><span class="mark v tl-v"></span>
    <span class="mark h tr-h"></span><span class="mark v tr-v"></span>
    <span class="mark h bl-h"></span><span class="mark v bl-v"></span>
    <span class="mark h br-h"></span><span class="mark v br-v"></span>
  ` : '';

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  @page { size: ${sheet.w}in ${sheet.h}in; margin: 0; }
  html, body { margin: 0; padding: 0; background: #fff; }
  .sheet {
    width: ${sheet.w}in;
    height: ${sheet.h}in;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .design {
    width: ${trim.w}in;
    height: ${trim.h}in;
    position: relative;
    background-image: url('${pngDataUrl}');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  ${cropCss}
</style></head>
<body>
  <div class="sheet">
    <div class="design">${cropMarkup}</div>
  </div>
</body></html>`;
}

async function exportJob(browser, job) {
  const pngAbsPath = path.join(EXPORT_DIR, job.pngPath);
  const outAbsPath = path.join(EXPORT_DIR, job.outPath);

  if (!existsSync(pngAbsPath)) {
    console.error(`  ✗ source PNG not found: ${job.pngPath}`);
    return;
  }

  const tab = await browser.newPage();
  try {
    const pngBuffer = readFileSync(pngAbsPath);
    const pngDataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
    const html = buildHtml({
      pngDataUrl,
      trim: job.trim,
      sheet: job.sheet,
      cropMarks: job.cropMarks,
    });

    await tab.setContent(html, { waitUntil: 'load' });
    // Pause so the image actually paints before PDF capture
    await new Promise(r => setTimeout(r, 400));

    mkdirSync(path.dirname(outAbsPath), { recursive: true });
    await tab.pdf({
      path: outAbsPath,
      width: `${job.sheet.w}in`,
      height: `${job.sheet.h}in`,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      preferCSSPageSize: true,
    });

    const sheetLabel =
      job.sheet.w === 8.5 && job.sheet.h === 11 ? 'Letter'
      : job.sheet.w === 11 && job.sheet.h === 17 ? 'Tabloid portrait'
      : job.sheet.w === 17 && job.sheet.h === 11 ? 'Tabloid landscape'
      : `${job.sheet.w}"×${job.sheet.h}"`;
    console.log(`  ✓ ${job.outPath}  (${sheetLabel}, design ${job.trim.w}"×${job.trim.h}")`);
  } finally {
    await tab.close();
  }
}

async function main() {
  console.log('\n📨 FedEx-friendly PDF export');
  console.log('─────────────────────────────────────────────');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const job of JOBS) {
      await exportJob(browser, job);
    }
  } finally {
    await browser.close();
  }

  console.log('─────────────────────────────────────────────');
  console.log('Done. Forward the *-fedex.pdf files to FedEx.\n');
}

main().catch(err => {
  console.error('\n✗ Export failed:', err);
  process.exit(1);
});
