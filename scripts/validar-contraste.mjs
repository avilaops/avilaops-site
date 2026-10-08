/**
 * Procura texto ilegivel no export, nos dois temas.
 *
 * O site troca de tema pelo relogio (escuro das 18h as 6h). Uma secao com
 * fundo fixo em hex herda a cor de texto do tema e some no outro: foi assim
 * que a vitrine de produtos da home ficou com titulo claro sobre fundo creme
 * no tema escuro, sem ninguem notar durante o dia. Nenhum build quebra por
 * isso, entao a conferencia e feita com um navegador de verdade.
 *
 * Para cada pagina do export e cada tema, o script mede o contraste entre a
 * cor de cada texto visivel e o fundo solido mais proximo. Texto sobre
 * imagem ou gradiente fica de fora: nao ha um fundo unico para comparar.
 *
 *   node scripts/validar-contraste.mjs
 *
 * CONTRASTE_MINIMO muda o piso (padrao 3, o limite da WCAG para texto
 * grande; abaixo disso o texto esta de fato sumindo, nao so discreto).
 * PLAYWRIGHT_CHROMIUM_PATH aponta um Chromium ja instalado.
 */
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve, sep } from "node:path";
import { chromium } from "playwright";

const outDir = resolve(process.env.OUT_DIR || "out");
const minimo = Number(process.env.CONTRASTE_MINIMO || 3);

/** Mesma chave de src/lib/tema-noturno: a escolha manual do visitante. */
const CHAVE_TEMA = "avilaops-tema";

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function listarPaginas(dir = outDir) {
  const paginas = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      if (nome !== "_next") paginas.push(...listarPaginas(caminho));
    } else if (nome === "index.html") {
      const rota = relative(outDir, dir).split(sep).join("/");
      paginas.push(rota ? `/${rota}/` : "/");
    }
  }
  return paginas.sort();
}

function resolverArquivo(urlPath) {
  const limpo = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const base = join(outDir, limpo);
  if (!base.startsWith(outDir)) return null;
  for (const candidato of [base, join(base, "index.html")]) {
    if (existsSync(candidato) && statSync(candidato).isFile()) return candidato;
  }
  return null;
}

function subirServidor() {
  const servidor = createServer((req, res) => {
    const arquivo = resolverArquivo(req.url);
    if (!arquivo) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": tipos[extname(arquivo).toLowerCase()] || "application/octet-stream" });
    createReadStream(arquivo).pipe(res);
  });
  return new Promise((ok) => servidor.listen(0, "127.0.0.1", () => ok(servidor)));
}

/** Roda dentro da pagina. Devolve os textos abaixo do piso de contraste. */
function medir(piso) {
  const cor = (texto) => {
    const m = texto.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = "1"] = m[1].split(/[,/ ]+/).filter(Boolean);
    return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
  };
  const sobre = (frente, fundo) => ({
    r: frente.r * frente.a + fundo.r * (1 - frente.a),
    g: frente.g * frente.a + fundo.g * (1 - frente.a),
    b: frente.b * frente.a + fundo.b * (1 - frente.a),
    a: 1,
  });
  const luminancia = ({ r, g, b }) => {
    const canal = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
  };
  const hex = ({ r, g, b }) =>
    `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

  /** Fundo solido atras do elemento, ou null se houver imagem ou gradiente. */
  const fundoDe = (el) => {
    const camadas = [];
    for (let no = el; no; no = no.parentElement) {
      const estilo = getComputedStyle(no);
      if (estilo.backgroundImage !== "none") return null;
      const c = cor(estilo.backgroundColor);
      if (c && c.a > 0) {
        camadas.push(c);
        if (c.a === 1) break;
      }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (const camada of camadas.reverse()) base = sobre(camada, base);
    return base;
  };

  const achados = [];
  const andarilho = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vistos = new Set();
  for (let no = andarilho.nextNode(); no; no = andarilho.nextNode()) {
    const texto = no.textContent.trim();
    const el = no.parentElement;
    if (!texto || !el || vistos.has(el)) continue;
    vistos.add(el);
    if (el.closest("script, style, noscript, svg, [aria-hidden='true']")) continue;
    const estilo = getComputedStyle(el);
    if (estilo.visibility === "hidden" || estilo.display === "none") continue;
    const caixa = el.getBoundingClientRect();
    if (caixa.width === 0 || caixa.height === 0) continue;

    const fundo = fundoDe(el);
    const frente = cor(estilo.color);
    if (!fundo || !frente) continue;
    const final = sobre(frente, fundo);
    const [clara, escura] = [luminancia(final), luminancia(fundo)].sort((a, b) => b - a);
    const razao = (clara + 0.05) / (escura + 0.05);
    if (razao < piso) {
      achados.push({
        onde: `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : ""}`,
        secao: el.closest("section, header, footer, main")?.className?.toString().trim() || "",
        texto: texto.slice(0, 50),
        cor: hex(final),
        fundo: hex(fundo),
        razao: Number(razao.toFixed(2)),
      });
    }
  }
  return achados;
}

const servidor = await subirServidor();
const origem = `http://127.0.0.1:${servidor.address().port}`;
const navegador = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});

const paginas = listarPaginas();
const problemas = new Map();

try {
  for (const tema of ["light", "dark"]) {
    const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 } });
    await contexto.addInitScript(
      ([chave, valor]) => window.localStorage.setItem(chave, valor),
      [CHAVE_TEMA, JSON.stringify({ tema, ate: Date.now() + 86_400_000 })],
    );
    // So o proprio export interessa: tag de terceiro nao muda cor de texto.
    await contexto.route("**/*", (rota) =>
      rota.request().url().startsWith(origem) ? rota.continue() : rota.abort(),
    );
    const pagina = await contexto.newPage();
    for (const rota of paginas) {
      await pagina.goto(`${origem}${rota}`, { waitUntil: "load" });
      for (const achado of await pagina.evaluate(medir, minimo)) {
        const chave = `${tema}|${achado.secao}|${achado.onde}|${achado.cor}|${achado.fundo}`;
        const atual = problemas.get(chave) || { tema, ...achado, paginas: [] };
        atual.paginas.push(rota);
        problemas.set(chave, atual);
      }
    }
    await contexto.close();
  }
} finally {
  await navegador.close();
  servidor.close();
}

for (const p of problemas.values()) {
  console.error(
    `contraste ${p.razao} [${p.tema}] ${p.cor} sobre ${p.fundo} — ${p.onde} em "${p.secao}" ("${p.texto}") — ${p.paginas.length} pagina(s), ex.: ${p.paginas[0]}`,
  );
}

console.log(JSON.stringify({ paginas: paginas.length, temas: 2, minimo, problemas: problemas.size }));
if (problemas.size > 0) process.exit(1);
