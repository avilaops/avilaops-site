/**
 * Prova que a politica de `config/security-headers.mjs` nao quebra o site.
 *
 * Uma Content-Security-Policy errada nao derruba o build nem o deploy: ela
 * falha calada no navegador do visitante, e o sintoma aparece dias depois
 * como formulario que nao envia ou analytics que parou de contar. Por isso a
 * verificacao e feita com um navegador de verdade servindo o export com os
 * mesmos cabecalhos da producao.
 *
 * Para cada pagina da lista o script confere:
 *
 *   - que a resposta traz todos os cabecalhos, com o valor exato;
 *   - que o navegador nao emitiu nenhum `securitypolicyviolation`;
 *   - que o cache dos assets com hash veio como immutable;
 *   - que nenhum recurso da propria pagina falhou ao carregar.
 *
 *   node scripts/validar-headers.mjs
 *
 * PLAYWRIGHT_CHROMIUM_PATH aponta um Chromium ja instalado quando o
 * navegador do playwright nao esta na maquina.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";
import { montarCabecalhos, regrasDeCache } from "../config/security-headers.mjs";

const outDir = resolve(process.env.OUT_DIR || "out");

const leadIntakeUrl =
  process.env.NEXT_PUBLIC_LEAD_INTAKE_URL ||
  "https://avila-inc-lead-intake.nicolas-85b.workers.dev";

// Mesmo default de src/lib/site.ts: vazio enquanto o servico de
// transcricao nao estiver publicado, para nao liberar origem inexistente.
const transcriptionUrl = process.env.NEXT_PUBLIC_TRANSCRICAO_URL || "";

const cabecalhos = montarCabecalhos({ leadIntakeUrl, transcriptionUrl });
const cacheHash = regrasDeCache.find((r) => r.nome === "assets-com-hash");
const cacheMidia = regrasDeCache.find((r) => r.nome === "midia");
const cacheHtml = regrasDeCache.find((r) => r.nome === "html");

// Uma pagina de cada familia: home, landing, indice, guia, comparativo,
// glossario, formulario longo, cartao de contato, juridica e erro.
const paginas = [
  "/",
  "/servicos/",
  "/contato/",
  "/criar-meu-resumo/",
  "/jornada/",
  "/guias/",
  "/guias/como-automatizar-whatsapp-da-empresa/",
  "/guias/ia/prompts-para-ia/",
  "/comparativos/avila-ops-vs-agencia-tradicional/",
  "/glossario/whatsapp-business-api/",
  "/segmentos/",
  "/nicolas/",
  "/politica-de-privacidade/",
  "/pagina-que-nao-existe/",
];

const tipos = new Map(
  Object.entries({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".woff2": "font/woff2",
    ".vcf": "text/vcard; charset=utf-8",
  })
);

/** Mesma resolucao de caminho do `try_files` do nginx/avilaops.conf. */
function resolverArquivo(urlPath) {
  const limpo = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const base = join(outDir, limpo);
  if (!base.startsWith(outDir)) return null;
  const candidatos = [base, join(base, "index.html"), `${base.replace(/\/$/, "")}.html`];
  for (const candidato of candidatos) {
    if (existsSync(candidato) && statSync(candidato).isFile()) return candidato;
  }
  return null;
}

function cacheDe(arquivo) {
  if (arquivo.startsWith(join(outDir, "_next", "static"))) return cacheHash.valor;
  const ext = extname(arquivo).slice(1).toLowerCase();
  if (cacheMidia.extensoesNginx.includes(ext)) return cacheMidia.valor;
  return cacheHtml.valor;
}

function subirServidor() {
  const servidor = createServer((req, res) => {
    // Espelha o `location = /_headers { return 404; }` do nginx.
    if (req.url.split("?")[0] === "/_headers") {
      res.writeHead(404, cabecalhos).end("not found");
      return;
    }
    const arquivo = resolverArquivo(req.url);
    const alvo = arquivo ?? join(outDir, "404.html");
    const status = arquivo ? 200 : 404;
    res.writeHead(status, {
      ...cabecalhos,
      "Content-Type": tipos.get(extname(alvo).toLowerCase()) || "application/octet-stream",
      "Cache-Control": cacheDe(alvo),
    });
    createReadStream(alvo).pipe(res);
  });
  return new Promise((ok) => {
    servidor.listen(0, "127.0.0.1", () => ok({ servidor, porta: servidor.address().port }));
  });
}

const falhas = [];
function exigir(condicao, mensagem) {
  if (!condicao) falhas.push(mensagem);
}

async function validarPagina(navegador, base, caminho) {
  const page = await navegador.newPage();
  const violacoes = [];
  const recursosQuebrados = [];

  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      window.__cspViolations.push(`${e.violatedDirective} bloqueou ${e.blockedURI}`);
    });
  });
  page.on("requestfailed", (req) => {
    // So interessa recurso do proprio site barrado por politica. O
    // ERR_ABORTED fica de fora porque o Next cancela os prefetch de rota ao
    // trocar de pagina — e cancelamento normal, nao bloqueio.
    const erro = req.failure()?.errorText ?? "";
    const bloqueado = erro.includes("BLOCKED") || erro.includes("CSP");
    if (req.url().startsWith(base) && bloqueado) {
      recursosQuebrados.push(`${req.url()} (${erro})`);
    }
  });

  const resposta = await page.goto(new URL(caminho, base).toString(), { waitUntil: "load" });

  for (const [nome, valor] of Object.entries(cabecalhos)) {
    const recebido = resposta.headers()[nome.toLowerCase()];
    exigir(recebido === valor, `${caminho}: cabecalho ${nome} ausente ou diferente (${recebido ?? "ausente"})`);
  }

  const esperadoHtml = caminho === "/pagina-que-nao-existe/" ? 404 : 200;
  exigir(resposta.status() === esperadoHtml, `${caminho}: status ${resposta.status()}, esperado ${esperadoHtml}`);

  // Dá tempo do script do tema e das tags inline rodarem antes de ler.
  await page.waitForTimeout(400);
  violacoes.push(...new Set(await page.evaluate(() => window.__cspViolations || [])));

  exigir(violacoes.length === 0, `${caminho}: CSP bloqueou ${violacoes.join("; ")}`);
  exigir(recursosQuebrados.length === 0, `${caminho}: recurso proprio falhou ${recursosQuebrados.join(", ")}`);

  const titulo = await page.title();
  exigir(titulo.length > 0, `${caminho}: pagina sem titulo, provavel erro de render`);

  await page.close();
  return { violacoes: violacoes.length };
}

async function validarCacheDeAsset(base) {
  const page = await chromiumBrowser.newPage();
  const resposta = await page.goto(new URL("/", base).toString(), { waitUntil: "load" });
  const assets = await page.evaluate(() =>
    [...document.querySelectorAll("script[src]")].map((s) => s.getAttribute("src")).filter((s) => s?.startsWith("/_next/static/"))
  );
  exigir(assets.length > 0, "home nao carregou nenhum asset de /_next/static/");
  if (assets.length > 0) {
    const r = await page.request.get(new URL(assets[0], base).toString());
    exigir(
      r.headers()["cache-control"] === cacheHash.valor,
      `asset com hash veio com Cache-Control "${r.headers()["cache-control"]}", esperado "${cacheHash.valor}"`
    );
  }
  exigir(resposta.ok(), "home nao respondeu 200");
  await page.close();
}

let chromiumBrowser;

const { servidor, porta } = await subirServidor();
const base = `http://127.0.0.1:${porta}`;

try {
  chromiumBrowser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
  });
  for (const caminho of paginas) {
    await validarPagina(chromiumBrowser, base, caminho);
    console.log(`ok ${caminho}`);
  }
  await validarCacheDeAsset(base);
  console.log("ok cache immutable em /_next/static/");
} finally {
  await chromiumBrowser?.close();
  servidor.close();
}

if (falhas.length > 0) {
  console.error("\nFalhas:");
  for (const f of falhas) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`\nheaders validation passed (${paginas.length} paginas, ${Object.keys(cabecalhos).length} cabecalhos)`);
