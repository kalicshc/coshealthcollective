// Exports tshirt-back-services as a print-ready PNG + PDF.
// Output: ~/Desktop/tshirt-back-services.{png,pdf}
//         dashboard/public/outreach/tshirts/tshirt-back-services-preview.png

import puppeteer from 'puppeteer';
import { mkdir, copyFile } from 'fs/promises';
import path from 'path';
import os from 'os';

const DESKTOP = path.join(os.homedir(), 'Documents');
const PREVIEW_DIR = path.resolve('./dashboard/public/outreach/tshirts');

await mkdir(PREVIEW_DIR, { recursive: true });

// Artboard is 1152 × 720 CSS px. Scale 3× → 3456 × 2160 ≈ 288 DPI for a 12" × 7.5"
// print area, well within DTG print specs.
const SCALE = 3;
const W = 1100;
const H = 420;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: W + 200, height: H + 200, deviceScaleFactor: SCALE });
await page.goto('http://localhost:3000/tshirt-back-services', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));

await page.evaluate(() => {
  const inner = document.querySelector('.tbs-scale-inner');
  if (inner) inner.style.zoom = '1';
  const label = document.querySelector('.tbs-label');
  if (label) label.style.display = 'none';
  const nav = document.querySelector('header, nav');
  if (nav) nav.style.display = 'none';

  // Kill anything that could bleed through behind the artboard:
  //  - body::before / body::after (mountain image overlay in globals.css)
  //  - all body / html / wrapper backgrounds
  const killBg = document.createElement('style');
  killBg.textContent = `
    html, body { background: transparent !important; }
    body::before, body::after { display: none !important; content: none !important; }
    .tbs-page, .tbs-scale-outer, .tbs-scale-inner, .tbs-artboard {
      background: transparent !important;
    }
  `;
  document.head.appendChild(killBg);

  document.body.style.padding = '0';
  document.body.style.margin = '0';
  const wrap = document.querySelector('.tbs-page');
  if (wrap) wrap.style.padding = '0';
});
await new Promise(r => setTimeout(r, 200));

// Hi-res PNG
const ab = await page.$('.tbs-artboard');
const pngPath = path.join(DESKTOP, 'tshirt-back-services.png');
await ab.screenshot({ path: pngPath, omitBackground: true });
console.log('PNG  →', pngPath);

// Print-ready PDF (12 × 7.5 inch). Set viewport to artboard size and print.
await page.setViewport({ width: W, height: H, deviceScaleFactor: SCALE });
await page.evaluate(() => {
  const ab = document.querySelector('.tbs-artboard');
  if (ab) {
    ab.style.position = 'fixed';
    ab.style.top = '0';
    ab.style.left = '0';
    ab.style.margin = '0';
  }
});
const pdfPath = path.join(DESKTOP, 'tshirt-back-services.pdf');
// 1100 × 420 CSS px ≈ 11.46" × 4.375". Round to clean 11" × 4.2".
await page.pdf({
  path: pdfPath,
  width: '11in',
  height: '4.2in',
  printBackground: false,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});
console.log('PDF  →', pdfPath);

// Mirror the PNG into the dashboard preview slot
const dashPath = path.join(PREVIEW_DIR, 'tshirt-back-services-preview.png');
await copyFile(pngPath, dashPath);
console.log('PNG copy →', dashPath);

await browser.close();
