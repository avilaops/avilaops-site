/**
 * Traduz a politica de `config/security-headers.mjs` para os dois formatos
 * que servem o site e grava os arquivos dentro do export.
 *
 *   out/_headers                -> lido pelo Cloudflare Pages
 *   nginx/security-headers.conf -> incluido pelo nginx da imagem
 *   caddy/avilaops-site.caddy   -> importado pelo Caddy do servidor, que e
 *                                  quem serve o avilaops.com em producao
 *
 * O arquivo do nginx fica fora de `out/` de proposito: tudo que cai dentro
 * do export vira endereco publico, e a politica nao precisa ser baixavel.
 *
 * Roda no `postbuild`, depois do `next build`, porque os dois arquivos
 * dependem do conteudo ja exportado. Nada aqui e versionado: o arquivo
 * gerado e sempre consequencia da fonte unica, nunca uma copia paralela que
 * pode divergir.
 *
 *   node scripts/gerar-headers.mjs
 *   node scripts/gerar-headers.mjs --conferir   (so valida, nao escreve)
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { montarCabecalhos, regrasDeCache } from "../config/security-headers.mjs";

const outDir = process.env.OUT_DIR || "out";
const confDir = process.env.NGINX_CONF_DIR || "nginx";
const caddyDir = process.env.CADDY_CONF_DIR || "caddy";
const conferir = process.argv.includes("--conferir");

// Mesmo default de src/lib/site.ts: a CSP precisa liberar exatamente o
// endpoint que o bundle chama, nem mais nem menos.
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

function gerarHeadersPages() {
  const linhas = ["# Gerado por scripts/gerar-headers.mjs. Nao editar a mao."];
  linhas.push("");
  linhas.push(cacheHtml.padraoPages);
  for (const [nome, valor] of Object.entries(cabecalhos)) {
    linhas.push(`  ${nome}: ${valor}`);
  }
  linhas.push(`  Cache-Control: ${cacheHtml.valor}`);
  linhas.push("");
  linhas.push(cacheHash.padraoPages);
  linhas.push(`  Cache-Control: ${cacheHash.valor}`);
  linhas.push("");
  return linhas.join("\n");
}

function gerarConfNginx() {
  const linhas = ["# Gerado por scripts/gerar-headers.mjs. Nao editar a mao."];
  for (const [nome, valor] of Object.entries(cabecalhos)) {
    // `always` faz o cabecalho valer tambem nas respostas de erro — sem ele
    // a pagina 404 sairia sem politica nenhuma.
    linhas.push(`add_header ${nome} "${valor}" always;`);
  }
  linhas.push("");
  return linhas.join("\n");
}

/**
 * Trecho importado pelo bloco `avilaops.com` do Caddyfile do servidor.
 *
 * O Caddy nao le `_headers` nem a configuracao do nginx: enquanto este
 * arquivo nao existia, a producao respondia sem nenhum cabecalho de
 * seguranca e sem `Cache-Control`, embora a politica estivesse pronta aqui.
 * O deploy envia o arquivo e recarrega o Caddy so quando ele muda.
 */
function gerarSnippetCaddy() {
  const midia = cacheMidia.extensoesNginx.map((ext) => `*.${ext}`).join(" ");
  const linhas = ["# Gerado por scripts/gerar-headers.mjs. Nao editar a mao."];
  linhas.push("header {");
  for (const [nome, valor] of Object.entries(cabecalhos)) {
    linhas.push(`\t${nome} "${valor}"`);
  }
  linhas.push("}");
  linhas.push("");
  linhas.push(`@avila_hash path ${cacheHash.padraoPages}`);
  linhas.push(`header @avila_hash Cache-Control "${cacheHash.valor}"`);
  linhas.push("@avila_midia {");
  linhas.push(`\tnot path ${cacheHash.padraoPages}`);
  linhas.push(`\tpath ${midia}`);
  linhas.push("}");
  linhas.push(`header @avila_midia Cache-Control "${cacheMidia.valor}"`);
  linhas.push("@avila_html {");
  linhas.push(`\tnot path ${cacheHash.padraoPages} ${midia}`);
  linhas.push("}");
  linhas.push(`header @avila_html Cache-Control "${cacheHtml.valor}"`);
  linhas.push("");
  linhas.push("# O _headers so existe para o Cloudflare Pages ler.");
  linhas.push("respond /_headers 404");
  linhas.push("");
  return linhas.join("\n");
}

const arquivos = [
  { caminho: join(outDir, "_headers"), conteudo: gerarHeadersPages() },
  { caminho: join(confDir, "security-headers.conf"), conteudo: gerarConfNginx() },
  { caminho: join(caddyDir, "avilaops-site.caddy"), conteudo: gerarSnippetCaddy() },
];

let divergiu = false;
for (const { caminho, conteudo } of arquivos) {
  if (conferir) {
    const atual = existsSync(caminho) ? readFileSync(caminho, "utf8") : null;
    if (atual !== conteudo) {
      divergiu = true;
      console.error(`divergente ${caminho}`);
    } else {
      console.log(`ok ${caminho}`);
    }
    continue;
  }
  mkdirSync(dirname(caminho), { recursive: true });
  writeFileSync(caminho, conteudo, "utf8");
  console.log(`escrito ${caminho}`);
}

if (conferir && divergiu) {
  console.error("Os arquivos no export nao batem com config/security-headers.mjs.");
  process.exit(1);
}

if (!conferir) {
  console.log(
    JSON.stringify({
      cabecalhos: Object.keys(cabecalhos).length,
      leadIntakeUrl,
      transcriptionUrl: transcriptionUrl || null,
      midia: cacheMidia.extensoesNginx.length,
    })
  );
}
