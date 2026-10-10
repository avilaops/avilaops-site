/** Cards tipográficos: texto composto por código, conforme direção editorial.
 * Não sobrescreve ilustrações revisadas. Cada listagem recebe imagem própria.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
import { chromium } from "playwright";
import { PAGE_SIZE, listingPreviewPath } from "../src/lib/editorial/model";
import type { EditorialImage } from "../src/lib/editorial/model";

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const assets: (EditorialImage & { slug: string })[] = JSON.parse(fs.readFileSync("content/imagens.json", "utf8"));
const shortTitles: Record<string, string> = {
  "o-que-e-checkout-e-por-que-decide-a-venda": "O último passo da compra",
  "quem-e-quem-no-pagamento-online": "Quem participa do pagamento?",
  "pix-cartao-ou-boleto-o-que-custa": "Pix, cartão ou boleto?",
  "como-fotografar-produto-com-celular": "Produto, celular e luz natural",
  "titulo-de-produto-como-o-cliente-procura": "O nome que o cliente procura",
  "como-escolher-nome-da-loja": "Um nome para sua loja",
  "preco-de-e-por-quando-vira-mentira": "Desconto de verdade",
  "calculo-de-frete-por-cep": "O frete começa no CEP",
  "embalagem-medida-custo-do-frete": "Caixa grande, frete maior",
  "pedir-cadastro-antes-de-comprar": "Cadastro antes da compra?",
  "vender-no-instagram-e-entregar-pela-loja": "Da conversa ao pedido",
  "o-que-e-margem-de-lucro-desconto-sem-margem": "Desconto precisa caber na margem",
  "para-que-serve-politica-de-troca-e-devolucao": "Troca com regras claras",
  "o-que-e-nota-fiscal-eletronica-e-quando-emitir": "Nota fiscal na rotina",
  "o-que-e-chargeback-estorno-forcado-pelo-banco": "Quando o banco estorna a compra",
  "o-que-e-landing-page-e-quando-usar": "Uma página. Um objetivo.",
  "paguei-o-dominio-e-nunca-fiz-o-site": "Seu domínio ainda tem futuro",
};
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const logo = `data:image/png;base64,${fs.readFileSync("public/logo.png").toString("base64")}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const manifest: { path: string; title: string; kind: string; bytes: number }[] = [];
const recordPath = "content/previews-editoriais.json";
const existing: typeof manifest = fs.existsSync(recordPath) ? JSON.parse(fs.readFileSync(recordPath, "utf8")) : [];
const recorded = new Set(existing.map(item => item.path));
async function render(src: string, title: string, label: string, detail: string, variant: number, kind: string) {
  const dest = path.join("public", src);
  if (fs.existsSync(dest)) {
    // Arquivo gerado numa execução interrompida antes de gravar o manifesto: registra sem refazer.
    if (!recorded.has(src)) { manifest.push({ path: src, title, kind, bytes: fs.statSync(dest).size }); recorded.add(src); }
    return;
  }
  const themes = [ ["#f5f0e5", "#101827", "#0054fe"], ["#101827", "#ffffff", "#fdc401"], ["#eef3ff", "#101827", "#0054fe"] ];
  const [background, foreground, accent] = themes[variant % themes.length];
  // Começa no tamanho pela contagem de caracteres e reduz até o título caber.
  const start = title.length > 60 ? 60 : title.length > 38 ? 72 : 84;
  for (const size of [84, 72, 60, 52].filter(value => value <= start)) {
  await page.setContent(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><style>
    *{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;background:${background};color:${foreground};font-family:Arial,sans-serif;padding:58px 66px;position:relative}
    header{display:flex;align-items:center;gap:14px;font-size:26px;font-weight:700}header img{width:44px;height:44px;object-fit:contain}.label{font-size:18px;letter-spacing:2px;text-transform:uppercase;margin-top:40px;color:${accent};font-weight:700}
    h1{position:relative;z-index:2;width:850px;font-size:${size}px;line-height:1.04;letter-spacing:-2px;margin-top:22px;font-weight:800}p{position:relative;z-index:2;font-size:23px;line-height:1.4;width:810px;margin-top:22px}footer{position:absolute;bottom:44px;left:66px;font-size:18px;font-weight:700}
    .shapes{position:absolute;right:30px;top:130px;width:185px;height:350px}.triangle{width:0;height:0;border-left:70px solid transparent;border-right:70px solid transparent;border-bottom:125px solid #0054fe;transform:rotate(${variant % 2 ? 12 : -12}deg)}.pill{width:58px;height:150px;background:#f62a26;border-radius:40px;transform:rotate(35deg);margin:20px 0 0 70px}.arc{position:absolute;width:105px;height:105px;border:22px solid #fdc401;border-bottom-color:transparent;border-radius:50%;right:4px;bottom:0}
  </style><body><header><img src="${logo}" alt="">Avila Ops</header><div class="label">${escape(label)}</div><h1>${escape(title)}</h1><p>${escape(detail)}</p><div class="shapes"><div class="triangle"></div><div class="pill"></div><div class="arc"></div></div><footer>avilaops.com · Conhecimento aplicado</footer></body></html>`);
  const overflow = await page.locator("h1").evaluate(el => el.getBoundingClientRect().bottom > 440);
  if (!overflow) break;
  if (size === 52) throw new Error(`Título não cabe no preview: ${title}`);
  }
  const png = await page.screenshot();
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const output = src.endsWith(".webp") ? await sharp(png).webp({ quality: 88 }).toBuffer() : await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  if (output.length > 150 * 1024) throw new Error(`Preview excede 150 KB: ${src}`);
  fs.writeFileSync(dest, output);
  manifest.push({ path: src, title, kind, bytes: output.length });
}
try {
  // Capa tipográfica já cadastrada em imagens.json mas fora do manifesto (execução
  // interrompida entre as duas gravações): registra antes do laço, que a pula.
  for (const asset of assets) {
    const dest = path.join("public", asset.src);
    if (asset.position === 1 && asset.alt.startsWith("Cartaz editorial") && !recorded.has(asset.src) && fs.existsSync(dest)) {
      manifest.push({ path: asset.src, title: asset.alt.match(/“(.+)”/)?.[1] || asset.slug, kind: "capa tipográfica", bytes: fs.statSync(dest).size });
      recorded.add(asset.src);
    }
  }
  for (const file of fs.readdirSync("content/guias").filter(file => file.endsWith(".md"))) {
    const { data } = matter(fs.readFileSync(path.join("content/guias", file), "utf8"));
    if (data.status !== "aprovado" || data.data_prevista > today || assets.some(item => item.slug === data.slug && item.position === 1)) continue;
    const title = shortTitles[data.slug] || data.title_seo;
    const src = `/editorial/guias/${data.slug}.webp`;
    await render(src, title, `${data.pilar} / Guia prático`, "Entenda o que muda na rotina da sua pequena empresa.", data.num, "capa tipográfica");
    assets.push({ slug: data.slug, src, alt: `Cartaz editorial com o título “${title}” e formas azul, vermelha e amarela da Avila Ops.`, width: 1200, height: 630, position: 1, section: "Abertura do guia" });
  }
  fs.writeFileSync("content/imagens.json", JSON.stringify(assets, null, 2) + "\n");
  // Importação posterior: o adaptador já encontra as novas capas e seu manifesto.
  const { getPosts, getCategories } = await import("../src/lib/editorial/repository");
  const posts = getPosts();
  // Texto fixo por coleção: citar títulos de artigos deixaria a imagem desatualizada
  // a cada publicação, porque os artigos mudam de página e o arquivo não é refeito.
  const collections = [
    { base: "/blog/", title: "Blog da Avila Ops", detail: "Artigos práticos para pequenas empresas: presença digital, vendas, atendimento e operação.", posts },
    { base: "/guias/", title: "Guias para sua empresa", detail: "Guias práticos, com exemplos e passos, para decidir e operar melhor no digital.", posts },
    ...getCategories().map(category => ({ base: `/blog/categoria/${category.slug}/`, title: category.name, detail: `Guias de ${category.name.toLowerCase()} para pequenas empresas, com exemplos e passos práticos.`, posts: posts.filter(post => post.category === category.name) })),
  ];
  let index = 0;
  for (const collection of collections) {
    for (let number = 1; number <= Math.ceil(collection.posts.length / PAGE_SIZE); number++) {
      await render(listingPreviewPath(collection.base, number), collection.title, `Biblioteca / Página ${number}`, collection.detail, index++, "listagem");
    }
  }
  fs.writeFileSync(recordPath, JSON.stringify([...existing, ...manifest], null, 2) + "\n");
  console.log(JSON.stringify({ artigos: posts.length, previewsGerados: manifest.length }));
} finally { await browser.close(); }
