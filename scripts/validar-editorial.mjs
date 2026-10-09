// Regressão do export real: publicação, paginação, SEO e imagens rastreáveis.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const read = file => readFileSync(join("out", file), "utf8");
const sitemap = read("sitemap.xml");
const llms = read("llms.txt");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const legacy = readFileSync("src/lib/seo-guides.ts", "utf8");
let blocked = 0;
for (const file of readdirSync("content/guias").filter(name => name.endsWith(".md"))) {
  const { data } = matter(readFileSync(join("content/guias", file), "utf8"));
  if ((data.status !== "aprovado" || data.data_prevista > today) && !legacy.includes(`slug: "${data.slug}"`)) {
    assert(!existsSync(join("out/guias", data.slug, "index.html")), `Rascunho exportado: ${data.slug}`);
    assert(!sitemap.includes(`/guias/${data.slug}/`), `Rascunho no sitemap: ${data.slug}`);
    assert(!llms.includes(`/guias/${data.slug}/`), `Rascunho no llms: ${data.slug}`);
    blocked++;
  }
}
const pages = ["blog/index.html", "guias/index.html", "blog/pagina/2/index.html", "guias/pagina/2/index.html"];
const articlePaths = [...sitemap.matchAll(/<loc>https:\/\/avilaops.com(\/guias\/[^/]+\/)\s*<\/loc>/g)].map(match => match[1]).filter(route => route !== "/guias/ia/");
for (const route of articlePaths) pages.push(`${route.slice(1)}index.html`);
for (const file of pages) {
  const html = read(file);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: h1`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && title.length <= 60, `${file}: título longo`);
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert(description && description.length <= 155, `${file}: descrição longa`);
  const canonical = `https://avilaops.com/${file.replace(/index.html$/, "")}`;
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${file}: canonical`);
  for (const match of html.matchAll(/<img\b[^>]*src="[^"]*editorial\/guias\/[^>]*>/g)) {
    const tag = match[0];
    assert(/alt="[^"]+"/.test(tag) && /width="\d+"/.test(tag) && /height="\d+"/.test(tag) && /loading="lazy"/.test(tag), `${file}: imagem sem atributos`);
    const src = tag.match(/src="([^"]+)"/)[1];
    assert(existsSync(join("out", src)), `${file}: imagem quebrada ${src}`);
  }
  for (const [, raw] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    const schema = JSON.parse(raw);
    if (schema["@type"] === "Article") {
      assert(schema.image.length && schema.author.name && schema.publisher["@id"], `${file}: Article incompleto`);
      assert(sitemap.includes(schema.image[0].url), `${file}: imagem fora do sitemap`);
    }
  }
}
const cards = html => [...html.matchAll(/<h3><a[^>]*href="([^"]+)"/g)].map(match => match[1]);
const first = cards(read("blog/index.html")), second = cards(read("blog/pagina/2/index.html"));
assert(first.length && second.length && first.every(url => !second.includes(url)), "Paginação repete artigos");
assert(read("robots.txt").includes("Sitemap: https://avilaops.com/sitemap.xml"));
console.log(JSON.stringify({ paginas: pages.length, artigos: articlePaths.length, rascunhosProtegidos: blocked, paginacao: "ok", imagens: "ok" }));
