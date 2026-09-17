/**
 * Gera as imagens de post a partir dos guias, nos três formatos que o Instagram
 * usa — em public/social/<slug>-<formato>.png.
 *
 * A OG (1200x630) serve para prévia de link; no feed ela aparece cortada nas
 * laterais e em story nem chega perto. Aqui o mesmo desenho é reequilibrado
 * para cada proporção: o texto vem do mesmo lugar (`seo-guides.ts` e as
 * headlines do gerador de OG), só a composição muda.
 *
 * Uso:
 *   node scripts/generate-social-images.mjs --only=<slug>
 *   node scripts/generate-social-images.mjs                 (todos os guias)
 *   node scripts/generate-social-images.mjs --formato=story
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import {
  readGuides,
  EXTRA_PAGES,
  kickerFor,
  autoSplit,
  escapeHtml,
  truncate,
  HEADLINES,
  logoDataUri,
} from "./generate-og-images.mjs";

const OUT_DIR = "public/social";

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const formatoArg = args.find((a) => a.startsWith("--formato="))?.split("=")[1];

/**
 * `safeTop`/`safeBottom` são as faixas que a interface do Instagram cobre —
 * foto de perfil em cima, campo de resposta embaixo. No story elas são grandes;
 * ignorar isso é o erro clássico de colocar texto onde ninguém lê.
 */
const FORMATOS = {
  quadrado: {
    w: 1080, h: 1080, pad: 76, safeTop: 0, safeBottom: 0,
    kicker: 19, tag: 17, h1Base: 76, sub: 27, subMax: 132,
    logo: 60, brand: 34, url: 21, dots: { w: 174, h: 68, top: 44, right: 52, gap: 29 },
  },
  retrato: {
    w: 1080, h: 1350, pad: 78, safeTop: 0, safeBottom: 0,
    kicker: 20, tag: 18, h1Base: 82, sub: 29, subMax: 168,
    logo: 62, brand: 36, url: 22, dots: { w: 174, h: 68, top: 52, right: 54, gap: 29 },
  },
  story: {
    w: 1080, h: 1920, pad: 84, safeTop: 300, safeBottom: 320,
    kicker: 22, tag: 19, h1Base: 88, sub: 31, subMax: 190,
    logo: 68, brand: 40, url: 24, dots: { w: 203, h: 78, top: 40, right: 58, gap: 32 },
  },
};

/** Encolhe o título conforme o comprimento da linha mais longa, como na OG. */
function headlineSize(base, l1, l2) {
  const n = Math.max(l1.length, l2 ? l2.length : 0);
  if (n <= 18) return base;
  if (n <= 24) return Math.round(base * 0.9);
  if (n <= 30) return Math.round(base * 0.8);
  return Math.round(base * 0.7);
}

function buildHtml(f, { kicker, l1, l2, sub }) {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${f.w}px; height: ${f.h}px; }
  body {
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
    background: #f4f5f7;
    color: #080b11;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .sheen {
    position: absolute; inset: 0;
    background:
      radial-gradient(${Math.round(f.w * 0.8)}px ${Math.round(f.h * 0.42)}px at 88% -6%, rgba(47,107,255,.15), transparent 62%),
      radial-gradient(${Math.round(f.w * 0.6)}px ${Math.round(f.h * 0.34)}px at -8% 104%, rgba(47,107,255,.11), transparent 64%);
  }
  .dots {
    position: absolute; top: ${f.dots.top + f.safeTop}px; right: ${f.dots.right}px;
    width: ${f.dots.w}px; height: ${f.dots.h}px;
    background-image: radial-gradient(#2f6bff 2.6px, transparent 2.6px);
    background-size: ${f.dots.gap}px ${f.dots.gap}px;
    opacity: .38;
  }
  .rule { position: absolute; left: 0; top: 0; width: 10px; height: 100%; background: #2f6bff; }
  .wrap {
    position: relative; height: 100%;
    padding: ${f.pad + f.safeTop}px ${f.pad}px ${f.pad + f.safeBottom}px ${f.pad + 8}px;
    display: flex; flex-direction: column;
  }
  /* Centraliza o bloco no espaço acima do rodapé: sem isso o quadrado fica
     com um vão morto no meio, texto colado no topo e assinatura lá embaixo. */
  .body { margin-block: auto; }
  .kicker {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: ${f.kicker}px; font-weight: 700; letter-spacing: .16em;
    color: #2f6bff; text-transform: uppercase;
  }
  .kicker span.tag {
    background: #2f6bff; color: #fff; border-radius: 999px;
    padding: 7px 16px; letter-spacing: .12em; font-size: ${f.tag}px;
  }
  h1 {
    margin-top: 40px;
    font-size: ${headlineSize(f.h1Base, l1, l2)}px;
    line-height: 1.06;
    font-weight: 800;
    letter-spacing: -.022em;
  }
  h1 b { color: #2f6bff; font-weight: 800; display: block; }
  p.sub {
    margin-top: 28px;
    font-size: ${f.sub}px; line-height: 1.45; color: #5f6878; font-weight: 400;
  }
  .foot {
    display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
  }
  .foot img { width: ${f.logo}px; height: ${f.logo}px; }
  .brand { font-size: ${f.brand}px; font-weight: 800; letter-spacing: -.02em; }
  .divider { width: 1px; height: ${Math.round(f.logo * 0.74)}px; background: #bcc4d1; margin: 0 4px; }
  .tagline {
    font-size: ${Math.round(f.url * 0.66)}px; font-weight: 600; line-height: 1.6;
    letter-spacing: .19em; color: #687386; text-transform: uppercase;
  }
  .url { margin-left: auto; font-size: ${f.url}px; font-weight: 700; color: #2f6bff; }
</style></head>
<body>
  <div class="sheen"></div>
  <div class="dots"></div>
  <div class="rule"></div>
  <div class="wrap">
    <div class="body">
      <div class="kicker"><span class="tag">Guia</span>${escapeHtml(kicker)}</div>
      <h1>${escapeHtml(l1)}${l2 ? `<b>${escapeHtml(l2)}</b>` : ""}</h1>
      <p class="sub">${escapeHtml(sub)}</p>
    </div>
    <div class="foot">
      <img src="${logoDataUri}" alt="">
      <div class="brand">Avila Ops</div>
      <div class="divider"></div>
      <div class="tagline">Tecnologia<br>para pequenas empresas</div>
      <div class="url">avilaops.com</div>
    </div>
  </div>
</body></html>`;
}

async function main() {
  const guias = [...readGuides(), ...EXTRA_PAGES];
  const alvos = only ? guias.filter((g) => g.slug === only) : guias;
  if (alvos.length === 0) throw new Error(`nenhum guia encontrado${only ? ` para --only=${only}` : ""}`);

  const formatos = formatoArg
    ? { [formatoArg]: FORMATOS[formatoArg] }
    : FORMATOS;
  if (Object.values(formatos).some((v) => !v)) {
    throw new Error(`formato inválido. Use: ${Object.keys(FORMATOS).join(", ")}`);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  let total = 0;

  for (const [nome, f] of Object.entries(formatos)) {
    const page = await browser.newPage({
      viewport: { width: f.w, height: f.h },
      deviceScaleFactor: 1,
    });

    for (const guia of alvos) {
      const { l1, l2 } = HEADLINES[guia.slug] || autoSplit(guia.title);
      const html = buildHtml(f, {
        kicker: kickerFor(guia.slug),
        l1,
        l2,
        sub: truncate(guia.description, f.subMax),
      });

      await page.setContent(html, { waitUntil: "load" });
      const arquivo = join(OUT_DIR, `${guia.slug}-${nome}.png`);
      writeFileSync(arquivo, await page.screenshot({ type: "png" }));
      console.log(`  ${f.w}x${f.h}  ${arquivo}`);
      total += 1;

      /**
       * O PNG é a arte canônica — texto chapado em alto contraste é onde o
       * JPEG mais artefata. Mas a API de publicação do Instagram só aceita
       * JPEG em `image_url`, e é o quadrado que vai para o feed. Então esse
       * formato ganha uma cópia JPEG, usada só pela automação.
       */
      if (nome === "quadrado") {
        const jpeg = join(OUT_DIR, `${guia.slug}-${nome}.jpg`);
        writeFileSync(jpeg, await page.screenshot({ type: "jpeg", quality: 92 }));
        console.log(`  ${f.w}x${f.h}  ${jpeg}`);
        total += 1;
      }
    }

    await page.close();
  }

  await browser.close();
  console.log(`\n${total} imagem(ns) gerada(s) em ${OUT_DIR}/`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
