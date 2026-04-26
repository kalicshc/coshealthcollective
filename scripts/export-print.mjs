/**
 * Print Export Script
 * -------------------
 * Renders each print page via Puppeteer and exports:
 *   - .jpg  (JPEG, 95% quality, 300 DPI metadata)
 *   - .png  (lossless, 300 DPI metadata — best for logos/text)
 *   - .pdf  (vector, print-ready — send this to the print shop)
 *
 * Usage:
 *   1. Start the dev server:  npm run dev
 *   2. In a second terminal:  npm run export
 *      Or a specific page:    npm run export -- gym-flyer
 *      Or multiple pages:     npm run export -- gym-flyer patient-flyer
 *
 * Output lands in:  print-exports/<page-name>/
 */

import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'print-exports');
const BASE_URL = process.env.EXPORT_BASE_URL || 'http://localhost:3000';

// ─── Page Catalog ───────────────────────────────────────────────────────────
// viewport: CSS pixel dimensions (1 CSS px = 1/96 inch)
// printSize: passed to Puppeteer's PDF generator (inches)
// SCALE 3 × viewport ≈ 288 DPI — acceptable by all print shops (300 DPI spec)
// ─────────────────────────────────────────────────────────────────────────────
const PRINT_PAGES = [
  {
    name: 'business-card',
    path: '/business-card',
    // 0.125" bleed on all sides → art file 3.75" × 2.25" (trim at 3.5" × 2")
    // CSS: 3.75in = 360px, 2.25in = 216px. Two cards stacked = 432px tall.
    viewport: { width: 360, height: 432 },
    printSize: { width: '3.75in', height: '2.25in' },
    description: '3.5" × 2" Business Card + 0.125" bleed (Front + Back)',
    clips: [
      { name: 'business-card-front', x: 0, y: 0,   width: 360, height: 216 },
      { name: 'business-card-back',  x: 0, y: 216, width: 360, height: 216 },
    ],
  },
  {
    name: 'patient-flyer',
    path: '/patient-flyer',
    viewport: { width: 576, height: 384 },   // 6" × 4" postcard
    printSize: { width: '6in', height: '4in' },
    description: '6" × 4" Postcard (Front + Back)',
  },
  {
    name: 'gym-flyer',
    path: '/gym-flyer',
    viewport: { width: 816, height: 1056 },  // 8.5" × 11"
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" Gym / Yoga Studio Flyer',
  },
  {
    name: 'iv-therapy-flyer',
    path: '/iv-therapy-flyer',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" IV Therapy Flyer',
  },
  {
    name: 'mailroom-flyer',
    path: '/mailroom-flyer',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" Mailroom Flyer',
  },
  {
    name: 'mailroom-flyer-2',
    path: '/mailroom-flyer-2',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" Mailroom Flyer v2',
  },
  {
    name: 'business-handout',
    path: '/business-handout',
    viewport: { width: 816, height: 2112 },  // 2-page letter document (tall)
    printSize: { width: '8.5in', height: '22in' },
    description: '8.5" × 11" Business Handout (2 pages)',
  },
  {
    name: 'business-handout-1',
    path: '/business-handout-1',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" Business Handout v1',
  },
  {
    name: 'business-handout-2',
    path: '/business-handout-2',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: '8.5" × 11" Business Handout v2',
  },
  {
    name: 'longevity-toolkit',
    path: '/longevity-toolkit',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: 'Longevity Toolkit',
  },
  {
    name: 'heart-healthy-guide',
    path: '/heart-healthy-guide',
    viewport: { width: 816, height: 1056 },
    printSize: { width: '8.5in', height: '11in' },
    description: 'Heart Healthy Guide',
  },
  {
    name: 'event-banner',
    path: '/event-banner',
    viewport: { width: 2880, height: 1152 }, // 30" × 12" scaled (half of 60"×24")
    printSize: { width: '60in', height: '24in' },
    description: '5\' × 2\' Event Banner (large format)',
  },
  {
    name: 'tshirt-back',
    path: '/tshirt-back',
    viewport: { width: 1152, height: 960 },
    printSize: { width: '12in', height: '10in' },
    description: '12" × 10" T-shirt Back Art (mountain DTG)',
    transparent: true,
    imageFormats: ['png'],
    pdf: false,
    clips: [
      { name: 'tshirt-back', x: 0, y: 0, width: 1152, height: 960 },
    ],
  },
  {
    name: 'tshirt',
    path: '/tshirt',
    viewport: { width: 1152, height: 3072 }, // Two 12" × 16" transparent upload artboards
    printSize: { width: '12in', height: '16in' },
    description: '12" × 16" T-shirt Art',
    transparent: true,
    imageFormats: ['png'],
    pdf: false,
    clips: [
      { name: 'tshirt-front', x: 0, y: 0, width: 1152, height: 1536 },
      { name: 'tshirt-back', x: 0, y: 1536, width: 1152, height: 1536 },
    ],
  },
];

// ─── CSS injected into every page before screenshotting ─────────────────────
const EXPORT_CSS = `
  nav, .no-print { display: none !important; }
  /* Hide Next.js dev overlay */
  nextjs-portal, [data-nextjs-dialog-overlay],
  [data-nextjs-toast], #__next-build-watcher,
  [data-next-mark], button[data-nextjs-build-indicator] { display: none !important; }
  body { padding-top: 0 !important; margin-top: 0 !important; }
  body::before { display: none !important; }
  /* Reset zoom-based preview scaling so card renders at real CSS dimensions */
  .bc-zoom-inner, .bc-scale-inner { zoom: 1 !important; }
  .bc-shell { padding: 0 !important; gap: 0 !important; min-height: auto !important; background: transparent !important; }
  .bc-zoom, .bc-scale-outer { display: block !important; }
  /* Bleed: expand card 0.125" on each side → 3.75" × 2.25" art file */
  .bc-card { width: 3.75in !important; height: 2.25in !important; border-radius: 0 !important; }
  /* Push content inward by the bleed amount so text stays inside the safety zone */
  .bc-f-content { padding: 0.215in 0.235in 0.205in 0.235in !important; }
  .bc-back { padding: 0.185in 0.205in 0.180in 0.205in !important; }
  /* tshirt-back */
  html, body, main, #__next { background: transparent !important; }
  .tbk-page { padding: 0 !important; min-height: auto !important; background: transparent !important; }
  .tbk-scale-outer { display: block !important; }
  .tbk-scale-inner { zoom: 1 !important; }
  .tbk-label { display: none !important; }
  .tbk-mtn img { mix-blend-mode: normal !important; }
  .tshirt-page { padding: 0 !important; min-height: auto !important; background: transparent !important; }
  .tshirt-export-wrap { padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; max-width: none !important; overflow: visible !important; }
  .tshirt-export { margin: 0 !important; }
  .tshirt-artboard { box-shadow: none !important; }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;

const SCALE = 4;

// ─── Save a PNG buffer as JPEG + PNG with 300 DPI metadata ──────────────────
async function saveImages(pngBuffer, basePath, formats = ['jpg', 'png']) {
  if (formats.includes('jpg')) {
    await sharp(pngBuffer)
      .withMetadata({ density: 300 })
      .jpeg({ quality: 95, mozjpeg: true })
      .toFile(`${basePath}.jpg`);
  }

  if (formats.includes('png')) {
    await sharp(pngBuffer)
      .withMetadata({ density: 300 })
      .png({ compressionLevel: 6 })
      .toFile(`${basePath}.png`);
  }
}

// ─── Export a single page ────────────────────────────────────────────────────
async function exportPage(browser, config) {
  const tab = await browser.newPage();

  try {
    await tab.setViewport({
      width: config.viewport.width,
      height: config.viewport.height,
      deviceScaleFactor: SCALE,
    });

    const url = `${BASE_URL}${config.path}`;
    process.stdout.write(`  → ${url} ... `);
    await tab.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Give canvas / QR code a moment to render
    await new Promise(r => setTimeout(r, 600));

    // Hide nav, reset any zoom-based preview scaling
    await tab.addStyleTag({ content: EXPORT_CSS });

    const pageDir = path.join(OUTPUT_DIR, config.name);
    await mkdir(pageDir, { recursive: true });

    if (config.clips) {
      // ── Multi-clip page (e.g. business card front + back) ─────────────────
      for (const clip of config.clips) {
        const pngBuffer = await tab.screenshot({
          type: 'png',
          omitBackground: Boolean(config.transparent),
          clip: { x: clip.x, y: clip.y, width: clip.width, height: clip.height },
        });
        await saveImages(pngBuffer, path.join(pageDir, clip.name), config.imageFormats);
        process.stdout.write(` ${clip.name.split('-').pop()}`);
      }

      if (config.pdf !== false) {
        // PDF: one page per clip
        for (const clip of config.clips) {
          await tab.pdf({
            path: path.join(pageDir, `${clip.name}.pdf`),
            width: config.printSize.width,
            height: config.printSize.height,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
          });
        }
      }
    } else {
      // ── Single-clip page ──────────────────────────────────────────────────
      const pngBuffer = await tab.screenshot({
        type: 'png',
        omitBackground: Boolean(config.transparent),
        clip: {
          x: 0,
          y: 0,
          width: config.viewport.width,
          height: config.viewport.height,
        },
      });

      await saveImages(pngBuffer, path.join(pageDir, config.name), config.imageFormats);

      if (config.pdf !== false) {
        await tab.pdf({
          path: path.join(pageDir, `${config.name}.pdf`),
          width: config.printSize.width,
          height: config.printSize.height,
          printBackground: true,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });
      }
    }

    console.log(' ✓');
  } finally {
    await tab.close();
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));

  const pagesToExport = args.length > 0
    ? PRINT_PAGES.filter(p => args.includes(p.name))
    : PRINT_PAGES;

  if (pagesToExport.length === 0) {
    console.error(`\n✗ No matching pages for: ${args.join(', ')}`);
    console.error(`  Available: ${PRINT_PAGES.map(p => p.name).join(', ')}\n`);
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log('\n🖨️  CoS Health Collective — Print Export');
  console.log(`📁 Output dir: print-exports/`);
  console.log(`📄 Pages: ${pagesToExport.map(p => p.name).join(', ')}`);
  console.log(`📡 Server: ${BASE_URL}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const config of pagesToExport) {
      console.log(`\n── ${config.description}`);
      await exportPage(browser, config);
      const formats = config.imageFormats || ['jpg', 'png'];
      const outputTypes = [...formats.map(format => `.${format}`), ...(config.pdf === false ? [] : ['.pdf'])];
      console.log(`   ${outputTypes.join('  ')} → print-exports/${config.name}/`);
    }
  } finally {
    await browser.close();
  }

  console.log('\n✅ Export complete!');
  console.log('─────────────────────────────────────────────');
  console.log('  Send .pdf  → print shop (vector, highest quality)');
  console.log('  Send .jpg  → when raster format is required');
  console.log('  Send .png  → when transparency needed (logos)');
  console.log('─────────────────────────────────────────────\n');
}

main().catch(err => {
  console.error('\n✗ Export failed:', err.message);
  if (err.message.includes('ECONNREFUSED')) {
    console.error('  Is the dev server running? Start it with: npm run dev\n');
  }
  process.exit(1);
});
