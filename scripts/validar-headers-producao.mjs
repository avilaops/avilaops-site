/**
 * Confere se o endereco publico responde com a politica de
 * `config/security-headers.mjs`.
 *
 * `headers:validate` prova a politica contra o export, num servidor local.
 * Este script fecha a outra ponta: a producao e servida pelo Caddy, que so
 * aplica os cabecalhos se o Caddyfile importar o arquivo gerado. O site ficou
 * meses com a politica pronta no repositorio e nenhuma linha dela no ar.
 *
 *   node scripts/validar-headers-producao.mjs
 *   SITE_URL=https://avilaops.com node scripts/validar-headers-producao.mjs
 */
import { montarCabecalhos, regrasDeCache } from "../config/security-headers.mjs";

const siteUrl = (process.env.SITE_URL || "https://avilaops.com").replace(/\/$/, "");
const cabecalhos = montarCabecalhos({
  leadIntakeUrl:
    process.env.NEXT_PUBLIC_LEAD_INTAKE_URL ||
    "https://avila-inc-lead-intake.nicolas-85b.workers.dev",
  transcriptionUrl: process.env.NEXT_PUBLIC_TRANSCRICAO_URL || "",
});
const cache = Object.fromEntries(regrasDeCache.map((r) => [r.nome, r.valor]));

const erros = [];
const conferir = (resposta, nome, esperado, onde) => {
  const veio = resposta.headers.get(nome);
  if (veio !== esperado) erros.push(`${onde}: ${nome} veio ${JSON.stringify(veio)}, esperado ${JSON.stringify(esperado)}`);
};

const home = await fetch(`${siteUrl}/`);
const html = await home.text();
for (const [nome, valor] of Object.entries(cabecalhos)) conferir(home, nome, valor, "/");
conferir(home, "cache-control", cache.html, "/");

const asset = html.match(/\/_next\/static\/[^"']+\.(?:js|css)/)?.[0];
const imagem = html.match(/\/media\/[^"']+\.(?:webp|jpg|png)/)?.[0];
if (!asset) erros.push("nenhum asset de /_next/static/ encontrado na home");
if (asset) conferir(await fetch(`${siteUrl}${asset}`), "cache-control", cache["assets-com-hash"], asset);
if (imagem) conferir(await fetch(`${siteUrl}${imagem}`), "cache-control", cache.midia, imagem);

const inexistente = await fetch(`${siteUrl}/pagina-que-nao-existe/`);
if (inexistente.status !== 404) erros.push(`pagina inexistente respondeu ${inexistente.status}`);
conferir(inexistente, "x-content-type-options", cabecalhos["X-Content-Type-Options"], "404");

const politica = await fetch(`${siteUrl}/_headers`);
if (politica.status !== 404) erros.push(`/_headers respondeu ${politica.status}; devia ser 404`);

for (const erro of erros) console.error(erro);
console.log(JSON.stringify({ siteUrl, cabecalhos: Object.keys(cabecalhos).length, erros: erros.length }));
if (erros.length > 0) process.exit(1);
