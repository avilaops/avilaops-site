import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const siteUrl = process.env.SITE_URL || "https://avilaops.com";
const screenshotDir = process.env.SCREENSHOT_DIR || "artifacts/visual";

const pages = [
  "/",
  "/guias/",
  "/blog/",
  "/guias/o-que-e-uma-loja-virtual/",
  "/guias/o-que-e-checkout-e-por-que-decide-a-venda/",
  "/blog/categoria/vendas/",
  "/blog/pagina/2/",
  "/blog/categoria/presenca-digital/",
  "/comparativos/",
  "/glossario/",
  "/guias/como-faco-para-minha-empresa-aparecer-no-google/",
  "/automatizar-whatsapp/",
  "/guias/como-automatizar-whatsapp-da-empresa/",
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
];

function pageName(path) {
  return path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replaceAll("/", "-");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function validatePage(browser, path, viewport) {
  const page = await browser.newPage({ viewport });
  const url = new URL(path, siteUrl).toString();

  await page.goto(url, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const body = document.body;
    const root = document.documentElement;
    const header = document.querySelector(".site-header");
    const h1 = document.querySelector("h1");
    const footer = document.querySelector(".site-footer");

    return {
      title: document.title,
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      bodyTextLength: body.innerText.trim().length,
      hasHeader: Boolean(header),
      hasH1: Boolean(h1 && h1.textContent?.trim()),
      hasFooter: Boolean(footer),
      h1Text: h1?.textContent?.trim() || "",
    };
  });

  assert(result.bodyTextLength > 500, `${url} rendered too little text`);
  assert(result.hasHeader, `${url} missing header`);
  assert(result.hasH1, `${url} missing h1`);
  assert(result.hasFooter, `${url} missing footer`);
  assert(result.scrollWidth <= result.clientWidth + 2, `${url} has horizontal overflow: ${result.scrollWidth}/${result.clientWidth}`);

  const screenshotPath = `${screenshotDir}/${viewport.name}-${pageName(path)}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await page.close();

  console.log(`ok ${viewport.name} ${url} (${result.h1Text})`);
}

async function main() {
  mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const viewport of viewports) {
      for (const path of pages) {
        await validatePage(browser, path, viewport);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`Visual validation passed. Screenshots: ${screenshotDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
