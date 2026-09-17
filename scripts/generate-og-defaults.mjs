/**
 * Gera o card Open Graph padrão (1200x630) do avilaops.com.
 *
 * Enquanto `generate-og-images.mjs` cuida de uma imagem por guia da landing,
 * este script cuida da imagem de fallback do domínio — a que aparece quando
 * alguém manda o link da raiz no WhatsApp. Sem ela o card sai só com texto,
 * ou pior: com o favicon esticado.
 *
 * Até a separação do repositório este script gerava o card dos quinze
 * domínios da casa, escrevendo em pastas irmãs do monorepo. Com o
 * avilaops.com em repositório próprio, aquelas pastas não existem mais aqui;
 * sobrou o card deste site. Os outros quatorze precisam rodar de onde os
 * projetos moram.
 *
 * Uso: npm run og:defaults -- [--only=chave] [--list]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { escapeHtml, truncate } from "./generate-og-images.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WIDTH = 1200;
const HEIGHT = 630;

/** Acima disso o WhatsApp costuma desistir da imagem antes de renderizar. */
const MAX_KB = 300;

/**
 * Paletas. A `light` é a mesma linguagem dos cards de guia da landing; as
 * escuras saem do `globals.css` de cada produto, para o card não destoar da
 * primeira tela que a pessoa vê depois do clique.
 */
const THEMES = {
  light: {
    bg: "#f4f5f7",
    fg: "#080b11",
    accent: "#2f6bff",
    muted: "#5f6878",
    footMuted: "#687386",
    divider: "#bcc4d1",
    sheen: "rgba(47,107,255,.14)",
    sheenAlt: "rgba(47,107,255,.10)",
  },
  irlquest: {
    bg: "#08090c",
    fg: "#f5f7fa",
    accent: "#b4f133",
    muted: "#9aa3b2",
    footMuted: "#5e6675",
    divider: "#252a34",
    sheen: "rgba(180,241,51,.16)",
    sheenAlt: "rgba(255,122,26,.12)",
  },
  arxisvr: {
    bg: "#0b0f1a",
    fg: "#f8fafc",
    accent: "#3b82f6",
    muted: "#94a3b8",
    footMuted: "#64748b",
    divider: "#1e293b",
    sheen: "rgba(59,130,246,.20)",
    sheenAlt: "rgba(37,99,235,.12)",
  },
};

/**
 * Um card por domínio. `out` aceita mais de um caminho porque alguns projetos
 * versionam a pasta de build junto com a de origem — sem isso o deploy
 * publicaria a imagem antiga.
 */
const CARDS = [
  {
    key: "avilaops",
    out: ["public/og-default.png"],
    theme: "light",
    tag: "Avila Ops",
    kicker: "Tecnologia sob medida",
    l1: "Tecnologia que se adapta",
    l2: "ao seu negócio",
    sub: "Site, e-mail, atendimento, CRM, automações e dados em uma estrutura que a sua empresa opera.",
    url: "avilaops.com",
    brand: "Avila Ops",
    tagline: "Tecnologia<br>para pequenas empresas",
    logo: "public/logo.png",
  },
];

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function dataUri(relPath) {
  if (!relPath) return null;
  const file = resolve(ROOT, relPath);
  if (!existsSync(file)) {
    console.warn(`aviso: logo não encontrado, card sai sem marca — ${relPath}`);
    return null;
  }
  const mime = MIME[extname(file).toLowerCase()] ?? "image/png";
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
}

/**
 * Reduz o corpo do título conforme ele cresce, para a headline nunca invadir
 * a linha do subtítulo. Os limites saem do mesmo desenho dos cards de guia.
 */
function headlineSize(l1, l2) {
  const longest = Math.max(l1.length, l2?.length ?? 0);
  if (longest > 30) return 62;
  if (longest > 24) return 70;
  return 78;
}

/**
 * `theme` aceita o nome de uma paleta pronta ou um objeto com as cores da
 * marca do cliente — nesse caso o que faltar cai no tema claro.
 */
function resolveTheme(theme) {
  if (typeof theme === "string") return THEMES[theme] ?? THEMES.light;
  return { ...THEMES.light, ...theme };
}

function buildHtml(card) {
  const t = resolveTheme(card.theme);
  const logo = dataUri(card.logo);

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
    background: ${t.bg};
    color: ${t.fg};
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .sheen {
    position: absolute; inset: 0;
    background:
      radial-gradient(900px 520px at 88% -12%, ${t.sheen}, transparent 60%),
      radial-gradient(620px 420px at -8% 108%, ${t.sheenAlt}, transparent 62%);
  }
  .dots {
    position: absolute; top: 40px; right: 56px;
    width: 203px; height: 78px;
    background-image: radial-gradient(${t.accent} 2.6px, transparent 2.6px);
    background-size: 29px 29px;
    opacity: .38;
  }
  .rule { position: absolute; left: 0; top: 0; width: 10px; height: 100%; background: ${t.accent}; }
  /* Zona segura: 60px de margem, porque cada app corta a borda de um jeito. */
  .wrap { position: relative; padding: 66px 74px 0 82px; height: 100%; display: flex; flex-direction: column; }
  .kicker {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 17px; font-weight: 700; letter-spacing: .16em;
    color: ${t.accent}; text-transform: uppercase;
  }
  .kicker span.tag {
    background: ${t.accent}; color: ${t.tagFg ?? t.bg}; border-radius: 999px;
    padding: 7px 16px; letter-spacing: .12em; font-size: 15px;
  }
  h1 {
    margin-top: 40px;
    font-size: ${headlineSize(card.l1, card.l2)}px;
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: -.022em;
    max-width: 1040px;
  }
  h1 b { color: ${t.accent}; font-weight: 800; display: block; }
  p.sub {
    margin-top: 26px;
    font-size: 27px; line-height: 1.42; color: ${t.muted};
    max-width: 900px; font-weight: 400;
  }
  .foot {
    margin-top: auto; margin-bottom: 52px;
    display: flex; align-items: center; gap: 22px;
  }
  /* Raio pequeno para o ícone de app não entrar como quadrado colado no fundo. */
  .foot img { width: 62px; height: 62px; object-fit: contain; border-radius: 14px; }
  .brand { font-size: 37px; font-weight: 800; letter-spacing: -.02em; }
  .divider { width: 1px; height: 46px; background: ${t.divider}; margin: 0 6px; }
  .tagline {
    font-size: 14px; font-weight: 600; line-height: 1.6;
    letter-spacing: .19em; color: ${t.footMuted}; text-transform: uppercase;
  }
  .url { margin-left: auto; font-size: 21px; font-weight: 700; color: ${t.accent}; }
</style></head>
<body>
  <div class="sheen"></div>
  <div class="dots"></div>
  <div class="rule"></div>
  <div class="wrap">
    <div class="kicker"><span class="tag">${escapeHtml(card.tag)}</span>${escapeHtml(card.kicker)}</div>
    <h1>${escapeHtml(card.l1)}${card.l2 ? `<b>${escapeHtml(card.l2)}</b>` : ""}</h1>
    <p class="sub">${escapeHtml(truncate(card.sub, 138))}</p>
    <div class="foot">
      ${logo ? `<img src="${logo}" alt="">` : ""}
      <div class="brand">${escapeHtml(card.brand)}</div>
      <div class="divider"></div>
      <div class="tagline">${card.tagline}</div>
      <div class="url">${escapeHtml(card.url)}</div>
    </div>
  </div>
</body></html>`;
}

async function main() {
  const args = process.argv.slice(2);
  const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];

  if (args.includes("--list")) {
    for (const c of CARDS) console.log(`${c.key.padEnd(10)} ${c.out.join(", ")}`);
    return;
  }

  const targets = only ? CARDS.filter((c) => c.key === only) : CARDS;
  if (targets.length === 0) throw new Error(`nenhum card com a chave "${only}"`);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    // Fixo em 1: sem isso, uma máquina com escala de tela acima de 100%
    // gera screenshot ampliado e a imagem sai fora de 1200x630.
    deviceScaleFactor: 1,
  });

  let heavy = 0;

  for (const card of targets) {
    await page.setContent(buildHtml(card), { waitUntil: "load" });
    const buffer = await page.screenshot({ type: "png" });
    const kb = Math.round(buffer.length / 1024);

    for (const out of card.out) {
      const file = resolve(ROOT, out);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, buffer);
      console.log(`ok ${out} (${kb} KB)`);
    }

    if (kb > MAX_KB) {
      heavy++;
      console.warn(`  aviso: ${kb} KB passa do alvo de ${MAX_KB} KB`);
    }
  }

  await browser.close();
  console.log(`\n${targets.length} card(s) gerado(s) em ${WIDTH}x${HEIGHT}`);
  if (heavy) console.warn(`${heavy} acima de ${MAX_KB} KB — vale recomprimir`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
