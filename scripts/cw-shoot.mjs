import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";

const OUT = "/tmp/cw-shots";
await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-webgl"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto("http://localhost:3210/critical-window", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1600));
for (let i = 0; i < 26; i++) {
  await new Promise((r) => setTimeout(r, 1100));
  const n = String(i + 1).padStart(2, "0");
  await page.screenshot({ path: `${OUT}/slide-${n}.png` });
  await page.keyboard.press("ArrowRight");
}
await browser.close();
console.log("done → " + OUT);
