import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/tshirt-back-services', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));
// Hide the site Navbar and the preview label so we capture only the artboard
await page.evaluate(() => {
  const inner = document.querySelector('.tbs-scale-inner');
  if (inner) inner.style.zoom = '1';
  const label = document.querySelector('.tbs-label');
  if (label) label.style.display = 'none';
  const nav = document.querySelector('header, nav');
  if (nav) nav.style.display = 'none';
  document.body.style.padding = '0';
  document.body.style.margin = '0';
  const page = document.querySelector('.tbs-page');
  if (page) page.style.padding = '0';
});
await new Promise(r => setTimeout(r, 200));
const ab = await page.$('.tbs-artboard');
await ab.screenshot({ path: '/tmp/tshirt-back-services.png' });
await browser.close();
console.log('ok');
