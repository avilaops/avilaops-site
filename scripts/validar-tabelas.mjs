/**
 * Confere as tabelas dos guias em larguras de celular e de desktop.
 *
 * No celular, colunas espremidas quebravam palavras letra a letra; a correcao
 * da largura minima as colunas e deixa a tabela rolar dentro do proprio
 * contêiner, com uma orientacao para deslizar. Essa largura minima nao pode
 * vazar para o desktop: uma tabela de quatro colunas passaria a rolar dentro
 * de um artigo de 800px sem precisar. Nenhum build quebra por isso, entao a
 * conferencia e feita com um navegador de verdade.
 *
 *   node scripts/validar-tabelas.mjs
 *
 * Em 320px cada coluna respeita a largura minima e a orientacao aparece.
 * Em 600px, 768px e 1280px a orientacao some e nenhuma tabela rola.
 * PLAYWRIGHT_CHROMIUM_PATH aponta um Chromium ja instalado.
 */
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve, sep } from "node:path";
import { chromium } from "playwright";

const outDir = resolve(process.env.OUT_DIR || "out");

/** Larguras conferidas: celular estreito, limite do breakpoint, tablet e desktop. */
const LARGURAS = [320, 600, 768, 1280];
const CELULAR_MAXIMO = 599;

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

function listarGuias(dir = join(outDir, "guias")) {
  const paginas = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      paginas.push(...listarGuias(caminho));
    } else if (nome === "index.html") {
      paginas.push(`/${relative(outDir, dir).split(sep).join("/")}/`);
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

/** Roda no navegador: mede cada tabela do artigo na largura atual. */
function medir() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return [...document.querySelectorAll(".editorial-table")].map((caixa) => {
    const dica = caixa.previousElementSibling?.classList.contains("editorial-table-hint")
      ? caixa.previousElementSibling
      : null;
    const cabecalho = caixa.querySelector("tr");
    const larguras = cabecalho ? [...cabecalho.children].map((celula) => celula.getBoundingClientRect().width) : [];
    return {
      colunas: larguras.length,
      rola: caixa.scrollWidth > caixa.clientWidth,
      dicaVisivel: Boolean(dica && dica.offsetParent !== null),
      // Tolerancia de 1px para arredondamento de subpixel.
      espremida: larguras.some((largura, i) => largura + 1 < (i === 0 ? 10 : 14) * rem),
    };
  });
}

const paginas = listarGuias();
const servidor = await subirServidor();
const origem = `http://127.0.0.1:${servidor.address().port}`;
const navegador = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});

const problemas = [];
const colunasVistas = new Set();
let tabelas = 0;

try {
  for (const largura of LARGURAS) {
    const celular = largura <= CELULAR_MAXIMO;
    const contexto = await navegador.newContext({ viewport: { width: largura, height: 900 } });
    // So o proprio export interessa: tag de terceiro nao muda o layout do artigo.
    await contexto.route("**/*", (rota) =>
      rota.request().url().startsWith(origem) ? rota.continue() : rota.abort(),
    );
    const pagina = await contexto.newPage();
    for (const rota of paginas) {
      await pagina.goto(`${origem}${rota}`, { waitUntil: "load" });
      const medidas = await pagina.evaluate(medir);
      medidas.forEach((tabela, i) => {
        const onde = `${rota} tabela ${i + 1} (${tabela.colunas} colunas) em ${largura}px`;
        if (largura === LARGURAS[0]) {
          tabelas += 1;
          colunasVistas.add(tabela.colunas);
        }
        if (celular && tabela.espremida) problemas.push(`${onde}: coluna abaixo da largura minima`);
        if (celular && !tabela.dicaVisivel) problemas.push(`${onde}: orientacao para deslizar ausente`);
        if (!celular && tabela.dicaVisivel) problemas.push(`${onde}: orientacao para deslizar fora do celular`);
        if (!celular && tabela.rola) problemas.push(`${onde}: rolagem horizontal fora do celular`);
      });
    }
    await contexto.close();
  }
} finally {
  await navegador.close();
  servidor.close();
}

for (const problema of problemas) console.error(problema);

const colunas = [...colunasVistas].sort((a, b) => a - b);
console.log(JSON.stringify({ guias: paginas.length, tabelas, colunas, larguras: LARGURAS, problemas: problemas.length }));
// Sem tabelas de 3 e de 4 ou mais colunas no export, a conferencia nao cobre o caso que motivou o teste.
if (!colunas.includes(3) || !colunas.some((n) => n >= 4)) {
  console.error("export sem tabelas de 3 e de 4+ colunas para conferir");
  process.exit(1);
}
if (problemas.length > 0) process.exit(1);
