/**
 * Confere os links internos do export.
 *
 * Dois defeitos passam calados pelo build:
 *
 *   - link sem a barra final. O site usa `trailingSlash`, entao `/guias`
 *     responde com um redirecionamento para `/guias/`. O `<Link>` do Next
 *     acerta sozinho; o `<a>` comum nao, e o export chegou a sair com quase
 *     dois mil desses, cada clique pagando uma ida e volta a mais;
 *   - link para pagina que nao existe no export.
 *
 *   node scripts/validar-links.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const outDir = resolve(process.env.OUT_DIR || "out");

function listarHtml(dir = outDir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return nome === "_next" ? [] : listarHtml(caminho);
    return nome.endsWith(".html") ? [caminho] : [];
  });
}

const temExtensao = (caminho) => /\.[a-z0-9]+$/i.test(caminho.split("/").pop());

function existe(caminho) {
  const alvo = join(outDir, decodeURIComponent(caminho));
  if (temExtensao(caminho)) return existsSync(alvo);
  return existsSync(join(alvo, "index.html"));
}

const semBarra = new Map();
const quebrados = new Map();
let total = 0;

for (const arquivo of listarHtml()) {
  const pagina = relative(outDir, arquivo).split(sep).join("/");
  const html = readFileSync(arquivo, "utf8");
  for (const [, href] of html.matchAll(/<a\b[^>]*?\shref="(\/[^"]*)"/g)) {
    if (href.startsWith("//")) continue;
    total += 1;
    const caminho = href.split(/[?#]/)[0];
    if (caminho !== "/" && !caminho.endsWith("/") && !temExtensao(caminho)) {
      semBarra.set(caminho, [...(semBarra.get(caminho) || []), pagina]);
    }
    const normalizado = caminho.endsWith("/") || temExtensao(caminho) ? caminho : `${caminho}/`;
    if (!existe(normalizado)) {
      quebrados.set(caminho, [...(quebrados.get(caminho) || []), pagina]);
    }
  }
}

for (const [caminho, paginas] of semBarra) {
  console.error(`sem barra final: ${caminho} — ${paginas.length} ocorrencia(s), ex.: ${paginas[0]}`);
}
for (const [caminho, paginas] of quebrados) {
  console.error(`link quebrado: ${caminho} — ${paginas.length} ocorrencia(s), ex.: ${paginas[0]}`);
}

console.log(JSON.stringify({ links: total, semBarra: semBarra.size, quebrados: quebrados.size }));
if (semBarra.size > 0 || quebrados.size > 0) process.exit(1);
