/**
 * Gera uma imagem Open Graph (1200x630) por guia em public/og/.
 *
 * Sem imagem própria, o preview de cada link no WhatsApp, LinkedIn e X cai no
 * logo do site — que é quadrado e aparece cortado no formato 1.91:1.
 *
 * Uso: node scripts/generate-og-images.mjs [--only=slug] [--force]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const OUT_DIR = "public/og";
const WIDTH = 1200;
const HEIGHT = 630;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const force = args.includes("--force");

/** Guias com imagem desenhada à mão, que o gerador não deve sobrescrever. */
const HAND_MADE = new Set(["como-faco-para-minha-empresa-aparecer-no-google"]);

/**
 * Etiqueta de categoria por guia. A primeira chave que casar com o slug vence,
 * então a ordem importa: termos mais específicos primeiro.
 */
const KICKERS = [
  [/^prompts-|^ia$/, "IA"],
  [/e-mail|email/, "E-MAIL PROFISSIONAL"],
  [/chatgpt|respostas-de-ia|aparecer-no-google/, "IA E BUSCA"],
  [/lgpd/, "DADOS E LGPD"],
  [/reforma-tributaria/, "OPERAÇÃO E FISCAL"],
  [/pix|quanto-custa/, "PAGAMENTOS"],
  [/instagram/, "INSTAGRAM E META ADS"],
  [/meta-ads|pixel/, "META ADS"],
  [/whatsapp/, "WHATSAPP"],
  [/crm|automatizar|automacao/, "AUTOMAÇÃO"],
  [/site|landing|presenca|checklist/, "PRESENÇA DIGITAL"],
];

/**
 * Headline em duas linhas explícitas por guia: `l1` sai em preto e `l2` em
 * azul. Quebra manual em vez de destaque por substring, porque o navegador
 * decidia sozinho onde quebrar e sobrava palavra solta colorida no fim da linha.
 */
const HEADLINES = {
  "como-automatizar-whatsapp-da-empresa": {
    l1: "Como automatizar o",
    l2: "WhatsApp da empresa",
  },
  "como-automatizar-minha-empresa": {
    l1: "Como automatizar",
    l2: "minha empresa",
  },
  "instagram-meta-ads-whatsapp-funil": {
    l1: "Instagram, Meta Ads e WhatsApp",
    l2: "em um funil só",
  },
  "como-automatizar-instagram-da-empresa": {
    l1: "Como automatizar o",
    l2: "Instagram da empresa",
  },
  "como-usar-meta-ads-para-gerar-leads-no-whatsapp": {
    l1: "Meta Ads para gerar",
    l2: "leads no WhatsApp",
  },
  "site-ou-instagram-para-pequena-empresa": {
    l1: "Sua empresa precisa de site",
    l2: "ou só Instagram?",
  },
  "crm-para-pequenas-empresas-com-whatsapp": {
    l1: "CRM com WhatsApp na",
    l2: "pequena empresa",
  },
  "whatsapp-comum-ou-business-api": {
    l1: "WhatsApp Business comum",
    l2: "ou API?",
  },
  "quanto-custa-criar-uma-presenca-digital-profissional": {
    l1: "Quanto custa uma presença",
    l2: "digital profissional?",
  },
  "como-configurar-pixel-da-meta-e-medir-conversoes": {
    l1: "Pixel da Meta e",
    l2: "medição de conversões",
  },
  "site-institucional-landing-page-ou-loja-virtual": {
    l1: "Site, landing page",
    l2: "ou loja virtual?",
  },
  "o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital": {
    l1: "O que sua empresa precisa",
    l2: "para vender no digital",
  },
  "checklist-de-presenca-digital-para-pequenas-empresas": {
    l1: "Checklist de",
    l2: "presença digital",
  },
  "como-trocar-o-numero-do-whatsapp-business-da-empresa": {
    l1: "Trocar o número do WhatsApp",
    l2: "sem perder cliente",
  },
  "como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias": {
    l1: "Sua empresa aparece",
    l2: "no ChatGPT?",
  },
  "meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google": {
    l1: "Perdeu tráfego para as",
    l2: "respostas de IA do Google?",
  },
  "agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa": {
    l1: "Vale a pena um agente",
    l2: "de IA no WhatsApp?",
  },
  "como-usar-pix-automatico-para-cobranca-recorrente": {
    l1: "Pix Automático para",
    l2: "cobrança recorrente",
  },
  "reforma-tributaria-o-que-muda-na-operacao-digital-da-empresa": {
    l1: "Reforma tributária: o que",
    l2: "muda na sua operação",
  },
  "como-aumentar-o-alcance-no-instagram-com-o-algoritmo-atual": {
    l1: "Como aumentar o alcance",
    l2: "no Instagram",
  },
  "como-usar-ia-no-atendimento-sem-violar-a-lgpd": {
    l1: "IA no atendimento",
    l2: "sem violar a LGPD",
  },
  "prompts-para-ia": {
    l1: "7 prompts de IA",
    l2: "prontos para copiar",
  },
  "como-configurar-o-e-mail-da-empresa-no-celular-e-no-outlook": {
    l1: "E-mail da empresa no",
    l2: "celular e no Outlook",
  },
  ia: {
    l1: "Guias de IA para",
    l2: "pequenas empresas",
  },
};

/**
 * Páginas que precisam de card mas não vivem em `seo-guides.ts` — rotas
 * próprias sob /guias. O `slug` tem de ser o ÚLTIMO segmento da rota: é assim
 * que `social-announce.mjs` procura a arte do post (`social/<slug>-quadrado.jpg`).
 */
const EXTRA_PAGES = [
  {
    slug: "prompts-para-ia",
    title: "Prompts para IA: 7 efeitos de imagem prontos para copiar",
    description:
      "Sete prompts de edição de imagem em português, prontos para copiar e colar.",
  },
  {
    slug: "ia",
    title: "Guias de inteligência artificial para pequenas empresas",
    description:
      "Prompts prontos, atendimento com IA dentro da LGPD e como aparecer nas respostas do ChatGPT.",
  },
];

/** Extrai slug, título e descrição direto da fonte de conteúdo dos guias. */
function readGuides() {
  const src = readFileSync("src/lib/seo-guides.ts", "utf8");
  const blocks = [
    ...src.matchAll(
      /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*description:\s*\n?\s*"([^"]+)"/g,
    ),
  ];
  return blocks.map(([, slug, title, description]) => ({
    slug,
    title,
    description,
  }));
}

function kickerFor(slug) {
  for (const [pattern, label] of KICKERS) {
    if (pattern.test(slug)) return label;
  }
  return "GUIA";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Divide um título sem headline definida em duas linhas, quebrando na palavra
 * mais próxima do meio para as linhas ficarem equilibradas.
 */
function autoSplit(title) {
  const words = title.split(" ");
  if (words.length < 3) return { l1: title, l2: "" };
  let best = 1;
  let bestDelta = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(i).join(" ").length;
    const delta = Math.abs(a - b);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = i;
    }
  }
  return { l1: words.slice(0, best).join(" "), l2: words.slice(best).join(" ") };
}

/** Dimensiona pela linha mais longa, para nenhuma das duas quebrar sozinha. */
function headlineSize(l1, l2) {
  const n = Math.max(l1.length, l2.length);
  if (n <= 20) return 82;
  if (n <= 26) return 74;
  if (n <= 30) return 66;
  return 58;
}

function truncate(value, max) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const logoDataUri = `data:image/png;base64,${readFileSync("public/logo.png").toString("base64")}`;

function buildHtml({ kicker, l1, l2, sub }) {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
    background: #f4f5f7;
    color: #080b11;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  /* Brilho diagonal suave, mesma linguagem do card principal do site. */
  .sheen {
    position: absolute; inset: 0;
    background:
      radial-gradient(900px 520px at 88% -12%, rgba(47,107,255,.14), transparent 60%),
      radial-gradient(620px 420px at -8% 108%, rgba(47,107,255,.10), transparent 62%);
  }
  /* Fica acima da primeira linha do título, para não cruzar com o texto. */
  .dots {
    position: absolute; top: 40px; right: 56px;
    width: 203px; height: 78px;
    background-image: radial-gradient(#2f6bff 2.6px, transparent 2.6px);
    background-size: 29px 29px;
    opacity: .38;
  }
  .rule { position: absolute; left: 0; top: 0; width: 10px; height: 100%; background: #2f6bff; }
  .wrap { position: relative; padding: 66px 74px 0 82px; height: 100%; display: flex; flex-direction: column; }
  .kicker {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 17px; font-weight: 700; letter-spacing: .16em;
    color: #2f6bff; text-transform: uppercase;
  }
  .kicker span.tag {
    background: #2f6bff; color: #fff; border-radius: 999px;
    padding: 7px 16px; letter-spacing: .12em; font-size: 15px;
  }
  h1 {
    margin-top: 40px;
    font-size: ${headlineSize(l1, l2)}px;
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: -.022em;
    max-width: 1040px;
  }
  h1 b { color: #2f6bff; font-weight: 800; display: block; }
  p.sub {
    margin-top: 26px;
    font-size: 27px; line-height: 1.42; color: #5f6878;
    max-width: 900px; font-weight: 400;
  }
  .foot {
    margin-top: auto; margin-bottom: 52px;
    display: flex; align-items: center; gap: 22px;
  }
  .foot img { width: 62px; height: 62px; }
  .brand { font-size: 37px; font-weight: 800; letter-spacing: -.02em; }
  .divider { width: 1px; height: 46px; background: #bcc4d1; margin: 0 6px; }
  .tagline {
    font-size: 14px; font-weight: 600; line-height: 1.6;
    letter-spacing: .19em; color: #687386; text-transform: uppercase;
  }
  .url { margin-left: auto; font-size: 21px; font-weight: 700; color: #2f6bff; }
</style></head>
<body>
  <div class="sheen"></div>
  <div class="dots"></div>
  <div class="rule"></div>
  <div class="wrap">
    <div class="kicker"><span class="tag">Guia</span>${escapeHtml(kicker)}</div>
    <h1>${escapeHtml(l1)}${l2 ? `<b>${escapeHtml(l2)}</b>` : ""}</h1>
    <p class="sub">${escapeHtml(sub)}</p>
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
  const fromLib = readGuides();
  if (fromLib.length === 0) throw new Error("nenhum guia lido de seo-guides.ts");
  const guides = [...fromLib, ...EXTRA_PAGES];

  mkdirSync(OUT_DIR, { recursive: true });

  const targets = guides.filter((g) => {
    if (only) return g.slug === only;
    if (HAND_MADE.has(g.slug) && !force) return false;
    return true;
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  for (const guide of targets) {
    const { l1, l2 } = HEADLINES[guide.slug] || autoSplit(guide.title);
    const html = buildHtml({
      kicker: kickerFor(guide.slug),
      l1,
      l2,
      sub: truncate(guide.description, 138),
    });

    await page.setContent(html, { waitUntil: "load" });
    const buffer = await page.screenshot({ type: "png" });
    const file = join(OUT_DIR, `${guide.slug}.png`);
    writeFileSync(file, buffer);
    console.log(`ok ${file} (${Math.round(buffer.length / 1024)} KB)`);
  }

  await browser.close();

  const skipped = guides.length - targets.length;
  console.log(`\n${targets.length} imagens geradas${skipped ? `, ${skipped} preservada(s)` : ""}`);
}

/**
 * Só roda quando chamado direto. O gerador de imagens sociais importa as peças
 * daqui (headlines, kicker, leitura dos guias) para os dois formatos nunca
 * divergirem de conteúdo — muda a proporção, não o texto.
 */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

export {
  readGuides,
  EXTRA_PAGES,
  kickerFor,
  autoSplit,
  escapeHtml,
  truncate,
  HEADLINES,
  logoDataUri,
};
