/**
 * Confere as tabelas dos guias em larguras de celular e de desktop.
 *
 * Em colunas estreitas, celulas espremidas quebravam palavras letra a letra; a
 * correcao da largura minima as colunas e deixa a tabela rolar dentro do
 * proprio contêiner, com uma orientacao para deslizar. Essa largura minima nao
 * pode vazar para colunas largas: uma tabela de quatro colunas passaria a rolar
 * dentro de um artigo de 800px sem precisar. A regra segue a largura da coluna
 * do artigo, nao a da janela: em 900px a barra lateral deixa so ~500px.
 * Nenhum build quebra por isso, entao a conferencia e feita com um navegador.
 *
 *   node scripts/validar-tabelas.mjs
 *
 * Coluna estreita (ate 36rem): cada coluna respeita a largura minima. Coluna
 * larga: nenhuma celula tem largura minima e a tabela so rola se nem as
 * palavras inteiras couberem. Em qualquer largura, a orientacao para deslizar
 * aparece se, e somente se, a tabela transborda.
 * Em qualquer largura, nenhuma celula parte palavras no meio.
 * PLAYWRIGHT_CHROMIUM_PATH aponta um Chromium ja instalado.
 */
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve, sep } from "node:path";
import { chromium } from "playwright";

const outDir = resolve(process.env.OUT_DIR || "out");

/** Larguras de janela: celular, celular deitado, tablet, desktop com barra lateral estreita e desktop. */
const LARGURAS = [320, 600, 768, 900, 1280];

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
    const bloco = caixa.closest(".editorial-table-block");
    const dica = bloco?.querySelector(".editorial-table-hint");
    const tabela = caixa.querySelector("table");
    const cabecalho = caixa.querySelector("tr");
    const celulas = cabecalho ? [...cabecalho.children] : [];
    const larguras = celulas.map((celula) => celula.getBoundingClientRect().width);
    // Largura em que so as palavras inteiras cabem: abaixo disso a rolagem e necessaria.
    tabela.style.width = "min-content";
    const minimoConteudo = tabela.getBoundingClientRect().width;
    tabela.style.width = "";
    return {
      colunas: larguras.length,
      estreita: Boolean(bloco) && bloco.clientWidth <= 36 * rem,
      rola: caixa.scrollWidth > caixa.clientWidth + 1,
      rolaSemPrecisar: caixa.scrollWidth > caixa.clientWidth && minimoConteudo <= caixa.clientWidth + 1,
      dicaVisivel: Boolean(dica && dica.offsetParent !== null),
      // `overflow-wrap: anywhere` herdado do artigo parte palavras no meio quando a coluna aperta.
      partePalavra: celulas.some((celula) => {
        const estilo = getComputedStyle(celula);
        return estilo.overflowWrap !== "normal" || estilo.wordBreak !== "normal";
      }),
      larguraMinima: celulas.some((celula) => parseFloat(getComputedStyle(celula).minWidth) > 0),
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
    const contexto = await navegador.newContext({ viewport: { width: largura, height: 900 } });
    // So o proprio export interessa: tag de terceiro nao muda o layout do artigo.
    await contexto.route("**/*", (rota) =>
      rota.request().url().startsWith(origem) ? rota.continue() : rota.abort(),
    );
    const pagina = await contexto.newPage();
    for (const rota of paginas) {
      await pagina.goto(`${origem}${rota}`, { waitUntil: "load" });
      // A orientacao depende da medicao feita depois da hidratacao: espera ela
      // concordar com o transbordo; se nao concordar, a conferencia abaixo acusa.
      await pagina
        .waitForFunction(
          () => [...document.querySelectorAll(".editorial-table-block")].every((bloco) => {
            const caixa = bloco.querySelector(".editorial-table");
            return (caixa.scrollWidth > caixa.clientWidth + 1) === bloco.hasAttribute("data-rola");
          }),
          null,
          { timeout: 5000 },
        )
        .catch(() => {});
      const medidas = await pagina.evaluate(medir);
      medidas.forEach((tabela, i) => {
        const onde = `${rota} tabela ${i + 1} (${tabela.colunas} colunas) em ${largura}px`;
        if (largura === LARGURAS[0]) {
          tabelas += 1;
          colunasVistas.add(tabela.colunas);
        }
        if (tabela.rola && !tabela.dicaVisivel) problemas.push(`${onde}: tabela rola sem orientacao para deslizar`);
        if (!tabela.rola && tabela.dicaVisivel) problemas.push(`${onde}: orientacao para deslizar sem rolagem`);
        if (tabela.partePalavra) problemas.push(`${onde}: celula pode partir palavras no meio`);
        if (tabela.estreita) {
          if (tabela.espremida) problemas.push(`${onde}: coluna abaixo da largura minima`);
        } else {
          if (tabela.larguraMinima) problemas.push(`${onde}: largura minima de coluna em coluna larga`);
          if (tabela.rolaSemPrecisar) problemas.push(`${onde}: rolagem horizontal sem necessidade em coluna larga`);
        }
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
