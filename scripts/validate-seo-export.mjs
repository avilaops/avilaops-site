import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.OUT_DIR || "out";
const siteUrl = process.env.SITE_URL || "https://avilaops.com";

const pages = [
  {
    file: "index.html",
    url: "/",
    title: "Avila Ops | tecnologia que se adapta ao seu negócio",
    description:
      "Organizamos a tecnologia da sua empresa: site, e-mail, atendimento, CRM, automações e integrações em uma estrutura que você consegue operar e evoluir.",
    type: "website",
    required: [
      "avila-organization-schema",
      "avila-website-schema",
      "avila-local-business-schema",
      "avila-service-schema",
    ],
  },
  {
    file: "automatizar-whatsapp/index.html",
    url: "/automatizar-whatsapp",
    title: "Automatizar WhatsApp para empresas | Avila Ops",
    description:
      "Automatize WhatsApp Business, atendimento, funis de venda, formulários, CRM e follow-up com a Avila Ops.",
    type: "website",
    required: [
      "schema-service-automatizar-whatsapp",
      "schema-faq-automatizar-whatsapp",
      "schema-breadcrumbs",
      "Como acontece",
      "O que muda na pr",
      "Revisado",
    ],
  },
  {
    file: "automatizar-minha-empresa/index.html",
    url: "/automatizar-minha-empresa",
    title: "Como automatizar minha empresa | Avila Ops",
    description:
      "Automatize processos, WhatsApp, Instagram, CRM, pagamentos, dados e atendimento com uma operação digital integrada.",
    type: "website",
    required: [
      "schema-service-automatizar-minha-empresa",
      "schema-faq-automatizar-minha-empresa",
      "schema-breadcrumbs",
      "WhatsApp",
      "Instagram",
      "CRM",
      "Revisado",
    ],
  },
  {
    file: "guias/como-faco-para-minha-empresa-aparecer-no-google/index.html",
    url: "/guias/como-faco-para-minha-empresa-aparecer-no-google",
    title: "Como faço para minha empresa aparecer no Google? | Avila Ops",
    description:
      "Passos práticos para uma pequena empresa aparecer no Google com site, perfil comercial, SEO local, conteúdo, dados estruturados e medição.",
    type: "article",
    required: [
      "schema-article-como-faco-para-minha-empresa-aparecer-no-google",
      "schema-guide-faq-como-faco-para-minha-empresa-aparecer-no-google",
      "schema-breadcrumbs",
      "/editorial/guias/como-faco-para-minha-empresa-aparecer-no-google.webp",
      "Google Search Console",
      "Perfil da Empresa no Google",
      "Revisado",
    ],
  },
  {
    file: "guias/como-automatizar-whatsapp-da-empresa/index.html",
    url: "/guias/como-automatizar-whatsapp-da-empresa",
    title: "Como automatizar o WhatsApp da empresa? | Avila Ops",
    description:
      "Guia direto sobre automação de WhatsApp para atendimento, vendas, CRM e integração com Instagram, site e Meta Ads.",
    type: "article",
    required: [
      "schema-article-como-automatizar-whatsapp-da-empresa",
      "schema-guide-faq-como-automatizar-whatsapp-da-empresa",
      "schema-breadcrumbs",
      "Revisado",
    ],
  },
  {
    file: "guias/como-automatizar-instagram-da-empresa/index.html",
    url: "/guias/como-automatizar-instagram-da-empresa",
    title: "Como automatizar o Instagram da empresa? | Avila Ops",
    description:
      "Guia prático para automatizar Instagram com conteúdo, mensagens, Meta Ads, WhatsApp, CRM e acompanhamento comercial.",
    type: "article",
    required: [
      "schema-article-como-automatizar-instagram-da-empresa",
      "schema-guide-faq-como-automatizar-instagram-da-empresa",
      "schema-breadcrumbs",
      "Integração com WhatsApp e CRM",
      "Cuidados com automação",
      "Revisado",
    ],
  },
  {
    file: "guias/como-usar-meta-ads-para-gerar-leads-no-whatsapp/index.html",
    url: "/guias/como-usar-meta-ads-para-gerar-leads-no-whatsapp",
    title: "Como usar Meta Ads para gerar leads no WhatsApp? | Avila Ops",
    description:
      "Estrutura para campanhas da Meta levarem interessados ao WhatsApp com oferta, qualificação, CRM, follow-up e medição.",
    type: "article",
    required: [
      "schema-article-como-usar-meta-ads-para-gerar-leads-no-whatsapp",
      "schema-guide-faq-como-usar-meta-ads-para-gerar-leads-no-whatsapp",
      "schema-breadcrumbs",
      "WhatsApp precisa de processo",
      "Medição e remarketing",
      "Revisado",
    ],
  },
  {
    file: "guias/como-automatizar-minha-empresa/index.html",
    url: "/guias/como-automatizar-minha-empresa",
    title: "Como automatizar minha empresa? | Avila Ops",
    description:
      "Passos práticos para automatizar uma pequena empresa com processos, WhatsApp, Instagram, CRM, pagamentos, dados e métricas.",
    type: "article",
    required: [
      "schema-article-como-automatizar-minha-empresa",
      "schema-guide-faq-como-automatizar-minha-empresa",
      "schema-breadcrumbs",
      "Mapeie antes de escolher ferramentas",
      "Conecte WhatsApp, Instagram, site e CRM",
      "Revisado",
    ],
  },
  {
    file: "guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias/index.html",
    url: "/guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
    title: "Como fazer minha empresa aparecer no ChatGPT e nas IAs?",
    description:
      "O que uma pequena empresa precisa ter no site, nos dados e no conteúdo para ser citada por ChatGPT, Gemini, Perplexity e pelas respostas de IA do Google.",
    type: "article",
    required: [
      "schema-article-como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
      "schema-guide-faq-como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
      "schema-breadcrumbs",
      "Dados estruturados e consist",
      "Revisado em",
      "2026-08-13",
    ],
  },
  {
    file: "guias/agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa/index.html",
    url: "/guias/agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
    title: "Vale a pena colocar um agente de IA no WhatsApp da empresa?",
    description:
      "Quando um agente de IA no WhatsApp resolve, quando atrapalha, o que ele precisa saber para funcionar e como implantar sem perder cliente no caminho.",
    type: "article",
    required: [
      "schema-article-agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
      "schema-guide-faq-agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
      "schema-breadcrumbs",
      "WhatsApp Business API",
      "Revisado em",
      "2026-08-13",
    ],
  },
  {
    file: "comparativos/avila-ops-vs-agencia-tradicional/index.html",
    url: "/comparativos/avila-ops-vs-agencia-tradicional",
    title: "Avila Ops ou agência tradicional? | Avila Ops",
    description:
      "Compare Avila Ops com agência tradicional para site, marketing, automação, WhatsApp, Instagram, Meta Ads e operação digital.",
    type: "article",
    required: [
      "schema-comparison-avila-ops-vs-agencia-tradicional",
      "schema-breadcrumbs",
      "Revisado",
    ],
  },
  {
    file: "glossario/whatsapp-business-api/index.html",
    url: "/glossario/whatsapp-business-api",
    title: "O que é WhatsApp Business API? | Glossário Avila Ops",
    description:
      "Versão do WhatsApp voltada a empresas com múltiplos atendentes, integrações e mensagens automatizadas em escala.",
    type: "article",
    required: [
      "schema-glossary-whatsapp-business-api",
      "schema-breadcrumbs",
      "Revisado",
    ],
  },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

/**
 * Conta apenas tags <script type="application/ld+json"> realmente presentes no
 * HTML estático. next/script injeta o schema via JavaScript, o que deixa os
 * dados estruturados invisíveis para crawlers que não executam JS.
 */
function jsonLdTagCount(html) {
  return (html.match(/<script[^>]*type="application\/ld\+json"[^>]*>/g) || [])
    .length;
}

function readExport(file) {
  return readFileSync(join(outDir, file), "utf8");
}

function metaContent(html, name) {
  return (
    html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`, "i"))?.[1] ||
    ""
  );
}

function propertyContent(html, property) {
  return (
    html.match(
      new RegExp(`<meta property="${property}" content="([^"]*)"`, "i"),
    )?.[1] || ""
  );
}

function titleOf(html) {
  return html.match(/<title>(.*?)<\/title>/)?.[1] || "";
}

function canonicalOf(html) {
  return html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] || "";
}

function canonicalUrl(path) {
  return new URL(path, siteUrl).toString();
}

function normalizeUrl(value) {
  if (!value) return "";
  const url = new URL(value);
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString();
}

for (const page of pages) {
  const html = readExport(page.file);
  const expectedUrl = canonicalUrl(page.url);

  assert(titleOf(html) === page.title, `${page.file}: title mismatch`);
  assert(metaContent(html, "description") === page.description, `${page.file}: description mismatch`);
  assert(metaContent(html, "robots") === "index, follow", `${page.file}: robots mismatch`);
  assert(normalizeUrl(canonicalOf(html)) === normalizeUrl(expectedUrl), `${page.file}: canonical mismatch`);
  assert(propertyContent(html, "og:title") === page.title, `${page.file}: og:title mismatch`);
  assert(propertyContent(html, "og:description") === page.description, `${page.file}: og:description mismatch`);
  assert(normalizeUrl(propertyContent(html, "og:url")) === normalizeUrl(expectedUrl), `${page.file}: og:url mismatch`);
  assert(propertyContent(html, "og:type") === page.type, `${page.file}: og:type mismatch`);
  assert(!html.includes("__next_error__"), `${page.file}: contains __next_error__`);
  assert(
    jsonLdTagCount(html) >= 4,
    `${page.file}: JSON-LD ausente do HTML estático (${jsonLdTagCount(html)} tags)`,
  );

  for (const fragment of page.required) {
    assert(html.includes(fragment), `${page.file}: missing ${fragment}`);

    // Um id de schema precisa ser uma tag servida no HTML, e não apenas uma
    // string dentro do payload do React.
    if (/^(schema-|avila-)/.test(fragment)) {
      assert(
        new RegExp(`<script id="${fragment}[^"]*" type="application/ld\\+json"`).test(html),
        `${page.file}: ${fragment} não é uma tag JSON-LD no HTML`,
      );
    }
  }

  console.log(`ok ${page.file}`);
}

/**
 * Toda página de guia precisa apontar para um arquivo de imagem que exista de
 * fato no export. Um og:image quebrado só aparece na hora de compartilhar o
 * link, quando já é tarde.
 */
const guideDirs = readdirSync(join(outDir, "guias"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  // O export cria diretórios internos do Next (ex.: __next.guias) sem página.
  .filter((name) => existsSync(join(outDir, "guias", name, "index.html")));

assert(guideDirs.length >= 22, `poucos guias no export: ${guideDirs.length}`);

for (const dir of guideDirs) {
  const html = readExport(join("guias", dir, "index.html"));
  const ogImage = propertyContent(html, "og:image");

  assert(ogImage, `guias/${dir}: og:image ausente`);
  assert(
    !ogImage.endsWith("/logo.png"),
    `guias/${dir}: og:image ainda usa o logo genérico`,
  );

  const assetPath = new URL(ogImage).pathname;
  assert(
    existsSync(join(outDir, assetPath)),
    `guias/${dir}: og:image aponta para arquivo inexistente (${assetPath})`,
  );
}

console.log(`ok og:image de ${guideDirs.length} guias`);

const sitemap = readExport("sitemap.xml");
assert(sitemap.includes(canonicalUrl("/llms.txt")), "sitemap missing llms.txt");
assert(!sitemap.includes("cliente.avilaops.com"), "sitemap includes cliente.avilaops.com");
assert(!sitemap.includes("app.avilaops.com"), "sitemap includes app.avilaops.com");
assert((sitemap.match(/<loc>/g) || []).length >= 45, "sitemap URL count too low");

const robots = readExport("robots.txt");
assert(robots.includes("User-Agent: *"), "robots missing User-Agent: *");
assert(robots.includes("Allow: /"), "robots missing Allow: /");
for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
  assert(robots.includes(`User-Agent: ${bot}`), `robots missing ${bot}`);
}

const llms = readExport("llms.txt");
assert(llms.startsWith("# Avila Ops"), "llms heading mismatch");
assert(llms.includes("Como automatizar minha empresa"), "llms missing automation company topic");
assert(llms.includes("Como automatizar o Instagram da empresa"), "llms missing Instagram automation topic");
assert(llms.includes("Como usar Meta Ads para gerar leads no WhatsApp"), "llms missing Meta Ads leads topic");
assert(llms.includes("Automatizar WhatsApp"), "llms missing WhatsApp topic");
assert(llms.includes("aparecer no Google"), "llms missing Google visibility topic");
assert(llms.includes("aparecer no ChatGPT"), "llms missing ChatGPT visibility topic");
assert(llms.includes("agente de IA no WhatsApp"), "llms missing WhatsApp AI agent topic");
assert(llms.includes("Pix Automático"), "llms missing Pix Automatico topic");
assert(llms.includes("LGPD"), "llms missing LGPD topic");

console.log("SEO export validation passed");
