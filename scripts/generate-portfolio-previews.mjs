/**
 * Captura uma prévia (1280x960, 4:3) de cada site do portfólio em
 * public/portfolio/.
 *
 * Antes os cards embutiam o site num <iframe>. Dois problemas: o
 * saudepet.app.br responde X-Frame-Options: SAMEORIGIN e ficava em branco, e
 * a home carregava quatro sites de terceiros só para desenhar miniatura.
 * Imagem estática resolve os dois — e é ela que aparece também no modal de
 * prévia, onde o visitante decide entre visitar o site ou pedir algo parecido.
 *
 * A proporção 4:3 casa com o aspect-ratio do .portfolio-card-frame; mudar uma
 * sem a outra deixa barra vazia no card.
 *
 * Uso: node scripts/generate-portfolio-previews.mjs [--only=slug] [--force]
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "public/portfolio";
const WIDTH = 1280;
const HEIGHT = 960;
const QUALITY = 82;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const force = args.includes("--force");

const SITES = [
  { slug: "brilhax", url: "https://brilhax.com" },
  { slug: "cifra", url: "https://cifrainssdeobras.com.br" },
  { slug: "maprojetos", url: "https://maprojetos.com.br" },
  { slug: "saudepet", url: "https://saudepet.app.br" },
];

/**
 * Só desliga rolagem suave, que atrapalha o disparo dos reveals por scroll.
 *
 * Aqui já teve uma tentativa de zerar animation-duration para evitar captura
 * no meio do fade-in. Foi pior: animação sem `animation-fill-mode: forwards`
 * volta ao estado inicial quando a duração é zero, e o estado inicial de um
 * reveal é `opacity: 0` — o herói do cifrainssdeobras.com.br saía branco por
 * causa disto, não apesar disto. A abordagem certa é deixar a animação rodar
 * e esperar ela terminar (ver SETTLE_MS).
 */
const FREEZE_CSS = `html { scroll-behavior: auto !important; }`;

/** Folga para as animações de entrada terminarem antes da captura. */
const SETTLE_MS = 1_800;

/**
 * Prepara a página para a captura, resolvendo dois problemas reais:
 *
 * 1. Conteúdo revelado por IntersectionObserver começa invisível e só aparece
 *    quando entra na viewport. Sem rolar a página, o herói do
 *    cifrainssdeobras.com.br saía completamente em branco.
 * 2. Banner de cookies e bolha de chat cobrem o canto inferior. Em vez de
 *    caçar seletor de cada ferramenta, esconde o que é fixo/sticky e está
 *    ancorado na metade de baixo — que é a forma dessas duas coisas. O
 *    recorte pela metade preserva cabeçalho fixo, que fica no topo.
 */
async function revealAndClean(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.8);

    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await pause(120);
    }
    window.scrollTo(0, 0);
    await pause(250);

    const half = window.innerHeight / 2;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "sticky") continue;
      const box = el.getBoundingClientRect();
      if (box.height === 0 || box.top < half) continue;
      el.style.setProperty("display", "none", "important");
    }
  });
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const targets = SITES.filter((s) => !only || s.slug === only);
  if (!targets.length) {
    console.error(`nenhum site casa com --only=${only}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  // Sem reducedMotion: alguns sites implementam "reduzir movimento" só
  // removendo a transição e deixam o elemento no estado inicial invisível.
  // Capturar como um visitante comum vê, depois da animação, é mais fiel.
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  let written = 0;
  let skipped = 0;
  let failed = 0;

  for (const site of targets) {
    const out = join(OUT_DIR, `${site.slug}.jpg`);
    if (existsSync(out) && !force) {
      console.log(`-- ${out} já existe (use --force para refazer)`);
      skipped += 1;
      continue;
    }

    const page = await context.newPage();
    try {
      await page.goto(site.url, { waitUntil: "load", timeout: 45_000 });
      // networkidle é o ideal, mas site com conexão persistente (widget de
      // chat, analytics em polling) nunca chega lá — o cifrainssdeobras.com.br
      // estourava 45s assim. Espera o silêncio se vier, segue em frente se não.
      await page
        .waitForLoadState("networkidle", { timeout: 8_000 })
        .catch(() => {});
      await page.addStyleTag({ content: FREEZE_CSS });
      // Fontes carregadas: sem esperar, a prévia sai com a fonte de fallback.
      await page.evaluate(() => document.fonts.ready);
      await revealAndClean(page);
      await page.waitForTimeout(SETTLE_MS);
      await page.screenshot({ path: out, type: "jpeg", quality: QUALITY });
      const kb = Math.round(statSync(out).size / 1024);
      console.log(`ok ${out} (${kb} KB) — ${site.url}`);
      written += 1;
    } catch (error) {
      console.error(`ERRO ${site.slug} (${site.url}): ${error.message}`);
      failed += 1;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\n${written} prévia(s) gerada(s), ${skipped} preservada(s), ${failed} com erro`);
  if (failed) process.exit(1);
}

main();
