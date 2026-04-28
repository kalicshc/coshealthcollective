/**
 * Legal PDF Generator
 * -------------------
 * Renders the three legal pages (privacy policy, terms of service, HIPAA notice)
 * to letter-size PDFs and writes them into /public/ so the "Download PDF"
 * buttons on those pages resolve.
 *
 * Usage:
 *   1. Start the dev server:  npm run dev
 *   2. In a second terminal:  node scripts/generate-legal-pdfs.mjs
 *
 * Re-run any time the legal page content is edited.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BASE_URL = process.env.EXPORT_BASE_URL || 'http://localhost:3000';

const PAGES = [
  { name: 'privacy-policy',   path: '/privacy-policy',   title: 'Privacy Policy' },
  { name: 'terms-of-service', path: '/terms-of-service', title: 'Terms of Service' },
  { name: 'hipaa-notice',     path: '/hipaa-notice',     title: 'Notice of Privacy Practices' },
];

// CSS injected into every page before printing — strips chrome, forces a clean
// print-ready palette (white background, black text), and hides the download
// button itself so it doesn't appear inside the PDF.
const PRINT_CSS = `
  /* Strip site chrome */
  nav, header, footer, .no-print { display: none !important; }
  nextjs-portal, [data-nextjs-dialog-overlay], [data-nextjs-toast],
  #__next-build-watcher, [data-next-mark],
  button[data-nextjs-build-indicator] { display: none !important; }

  /* Hide the in-page "Download PDF" button so it doesn't show inside the PDF */
  a[href$=".pdf"][download] { display: none !important; }

  /* Print-friendly palette */
  html, body, main, #__next, .min-h-screen, .container { background: #fff !important; }
  body { color: #111 !important; }

  /* Force every Tailwind/inline color we use on the legal pages to printable values */
  h1, h2, h3, h4, h5, h6 { color: #111 !important; }
  p, li, span, div, strong, em, a { color: #111 !important; }

  /* Section headings on the legal pages use teal — restore as a darker accent */
  h2, h2 * { color: #0f5e57 !important; }

  /* Effective-date line and other muted slate text */
  .text-sm { color: #444 !important; }

  /* Strip background tints on callout boxes; keep them visible with a border */
  [style*="background"] {
    background: transparent !important;
  }
  [class*="rounded-lg"][class*="p-4"] {
    border: 1px solid #ccc !important;
  }

  /* Tighten layout for print */
  body { padding-top: 0 !important; }
  .pt-12 { padding-top: 0.4in !important; }
  .pb-16 { padding-bottom: 0.4in !important; }
  .max-w-3xl { max-width: 100% !important; }

  /* Avoid splitting headings across pages */
  h1, h2, h3 { page-break-after: avoid; break-after: avoid; }
  section { page-break-inside: avoid; break-inside: avoid-page; }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;

async function exportLegalPdf(browser, config) {
  const tab = await browser.newPage();
  try {
    await tab.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });

    const url = `${BASE_URL}${config.path}`;
    process.stdout.write(`  → ${url} ... `);
    await tab.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    await tab.addStyleTag({ content: PRINT_CSS });
    await tab.emulateMediaType('print');

    // Settle a beat so any web fonts and layout shifts complete.
    await new Promise(r => setTimeout(r, 400));

    const outPath = path.join(PUBLIC_DIR, `${config.name}.pdf`);
    await tab.pdf({
      path: outPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.6in', right: '0.7in', bottom: '0.6in', left: '0.7in' },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size:9px; color:#666; width:100%; padding:0 0.7in;">
          <span style="float:left;">${config.title}</span>
          <span style="float:right;">Colorado Springs Health Collective</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size:9px; color:#666; width:100%; padding:0 0.7in; text-align:center;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    console.log(`✓ → public/${config.name}.pdf`);
  } finally {
    await tab.close();
  }
}

async function main() {
  console.log('\n📜 Legal PDF Generator');
  console.log(`📡 Server: ${BASE_URL}`);
  console.log(`📁 Output: public/\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const config of PAGES) {
      await exportLegalPdf(browser, config);
    }
  } finally {
    await browser.close();
  }

  console.log('\n✅ Done. Re-run after editing any legal page content.\n');
}

main().catch(err => {
  console.error('\n✗ Failed:', err.message);
  if (err.message.includes('ECONNREFUSED')) {
    console.error('  Is the dev server running? Start it with: npm run dev\n');
  }
  process.exit(1);
});
