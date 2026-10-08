const siteUrl = process.env.SITE_URL || "https://avilaops.com";

const pages = [
  {
    path: "/",
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
    path: "/automatizar-whatsapp/",
    title: "Automatizar WhatsApp para empresas | Avila Ops",
    description:
      "Automatize WhatsApp Business, atendimento, funis de venda, formulários, CRM e follow-up com a Avila Ops.",
    type: "website",
    required: [
      "schema-service-automatizar-whatsapp",
      "schema-faq-automatizar-whatsapp",
      "schema-breadcrumbs",
      "Processo em etapas",
      "Benef",
      "Revisado",
    ],
  },
  {
    path: "/automatizar-minha-empresa/",
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
    path: "/guias/como-faco-para-minha-empresa-aparecer-no-google/",
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
    path: "/guias/como-automatizar-whatsapp-da-empresa/",
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
    path: "/guias/como-automatizar-minha-empresa/",
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
    path: "/guias/como-automatizar-instagram-da-empresa/",
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
    path: "/guias/como-usar-meta-ads-para-gerar-leads-no-whatsapp/",
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
    path: "/guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias/",
    title: "Como fazer minha empresa aparecer no ChatGPT e nas IAs?",
    description:
      "O que uma pequena empresa precisa ter no site, nos dados e no conteúdo para ser citada por ChatGPT, Gemini, Perplexity e pelas respostas de IA do Google.",
    type: "article",
    required: [
      "schema-article-como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
      "schema-guide-faq-como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
      "schema-breadcrumbs",
      "Revisado em",
      "2026-08-13",
    ],
  },
  {
    path: "/guias/agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa/",
    title: "Vale a pena colocar um agente de IA no WhatsApp da empresa?",
    description:
      "Quando um agente de IA no WhatsApp resolve, quando atrapalha, o que ele precisa saber para funcionar e como implantar sem perder cliente no caminho.",
    type: "article",
    required: [
      "schema-article-agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
      "schema-guide-faq-agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
      "schema-breadcrumbs",
      "Revisado em",
      "2026-08-13",
    ],
  },
  {
    path: "/comparativos/avila-ops-vs-agencia-tradicional/",
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
    path: "/glossario/whatsapp-business-api/",
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

const requiredSitemapPaths = [
  "/llms.txt",
  "/automatizar-minha-empresa",
  "/guias/como-automatizar-minha-empresa",
  "/guias/como-faco-para-minha-empresa-aparecer-no-google",
  "/automatizar-whatsapp",
  "/guias/como-automatizar-whatsapp-da-empresa",
  "/guias/como-automatizar-instagram-da-empresa",
  "/guias/como-usar-meta-ads-para-gerar-leads-no-whatsapp",
  "/guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
  "/guias/meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google",
  "/guias/agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
  "/guias/como-usar-pix-automatico-para-cobranca-recorrente",
  "/guias/quanto-custa-um-site-profissional-para-pequena-empresa",
  "/guias/site-pronto-ou-site-sob-medida-qual-escolher",
  "/guias/o-que-pedir-em-um-orcamento-de-site",
  "/guias/quem-deve-ser-o-dono-do-dominio-e-da-hospedagem",
  "/guias/site-precisa-de-manutencao-depois-de-pronto",
  "/guias/reforma-tributaria-o-que-muda-na-operacao-digital-da-empresa",
  "/guias/como-aumentar-o-alcance-no-instagram-com-o-algoritmo-atual",
  "/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd",
  "/comparativos/avila-ops-vs-agencia-tradicional",
  "/glossario/whatsapp-business-api",
];

async function fetchText(url, init) {
  const response = await fetch(url, init);
  const text = await response.text();
  return { response, text };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function titleOf(html) {
  return html.match(/<title>(.*?)<\/title>/)?.[1] || "";
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

function canonicalOf(html) {
  return html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] || "";
}

/**
 * Conta apenas tags <script type="application/ld+json"> realmente servidas no
 * HTML. Schema injetado por JavaScript não é lido por boa parte dos crawlers.
 */
function jsonLdTagCount(html) {
  return (html.match(/<script[^>]*type="application\/ld\+json"[^>]*>/g) || [])
    .length;
}

function normalizeUrl(value) {
  if (!value) return "";
  const url = new URL(value);
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString();
}

async function validatePage(page) {
  const url = new URL(page.path, siteUrl).toString();
  const { response, text } = await fetchText(url);

  assert(response.status === 200, `${url} returned ${response.status}`);
  assert(titleOf(text) === page.title, `${url} title mismatch: ${titleOf(text)}`);
  assert(metaContent(text, "description") === page.description, `${url} description mismatch`);
  assert(text.includes("index, follow"), `${url} is not index, follow`);
  assert(normalizeUrl(canonicalOf(text)) === normalizeUrl(url), `${url} canonical mismatch`);
  assert(propertyContent(text, "og:title") === page.title, `${url} og:title mismatch`);
  assert(propertyContent(text, "og:description") === page.description, `${url} og:description mismatch`);
  assert(normalizeUrl(propertyContent(text, "og:url")) === normalizeUrl(url), `${url} og:url mismatch`);
  assert(propertyContent(text, "og:type") === page.type, `${url} og:type mismatch`);
  assert(!text.includes("__next_error__"), `${url} contains __next_error__`);
  assert(
    jsonLdTagCount(text) >= 4,
    `${url}: JSON-LD ausente do HTML servido (${jsonLdTagCount(text)} tags)`,
  );

  for (const fragment of page.required) {
    assert(text.includes(fragment), `${url} missing ${fragment}`);

    // Um id de schema precisa ser uma tag servida no HTML, e não apenas uma
    // string dentro do payload do React.
    if (/^(schema-|avila-)/.test(fragment)) {
      assert(
        new RegExp(`<script id="${fragment}[^"]*" type="application/ld\\+json"`).test(text),
        `${url}: ${fragment} não é uma tag JSON-LD no HTML`,
      );
    }
  }

  console.log(`ok ${url}`);
}

async function validateRobots() {
  const url = new URL("/robots.txt", siteUrl).toString();
  const { response, text } = await fetchText(url);

  assert(response.status === 200, `${url} returned ${response.status}`);
  assert(text.includes("User-Agent: *"), "robots.txt missing User-Agent: *");
  assert(text.includes("Allow: /"), "robots.txt missing Allow: /");
  assert(text.includes(`Sitemap: ${new URL("/sitemap.xml", siteUrl)}`), "robots.txt missing sitemap");
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
    assert(text.includes(`User-Agent: ${bot}`), `robots.txt missing ${bot}`);
  }

  console.log(`ok ${url}`);
}

async function validateLlms() {
  const url = new URL("/llms.txt", siteUrl).toString();
  const { response, text } = await fetchText(url);

  assert(response.status === 200, `${url} returned ${response.status}`);
  assert(text.startsWith("# Avila Ops"), "llms.txt has unexpected heading");
  assert(text.includes("Como automatizar minha empresa"), "llms.txt missing automation company topic");
  assert(text.includes("Como automatizar o Instagram da empresa"), "llms.txt missing Instagram automation topic");
  assert(text.includes("Como usar Meta Ads para gerar leads no WhatsApp"), "llms.txt missing Meta Ads leads topic");
  assert(text.includes("Automatizar WhatsApp"), "llms.txt missing WhatsApp topic");
  assert(text.includes("aparecer no Google"), "llms.txt missing Google visibility topic");
  assert(text.includes("Meta Ads"), "llms.txt missing Meta Ads topic");
  assert(text.includes("aparecer no ChatGPT"), "llms.txt missing ChatGPT visibility topic");
  assert(text.includes("agente de IA no WhatsApp"), "llms.txt missing WhatsApp AI agent topic");
  assert(text.includes("Pix Automático"), "llms.txt missing Pix Automatico topic");
  assert(text.includes("LGPD"), "llms.txt missing LGPD topic");

  console.log(`ok ${url}`);
}

async function validateSitemap() {
  const url = new URL("/sitemap.xml", siteUrl).toString();
  const { response, text } = await fetchText(url);

  assert(response.status === 200, `${url} returned ${response.status}`);
  assert(!text.includes("cliente.avilaops.com"), "sitemap includes cliente.avilaops.com");
  assert(!text.includes("app.avilaops.com"), "sitemap includes app.avilaops.com");

  for (const path of requiredSitemapPaths) {
    assert(text.includes(new URL(path, siteUrl).toString()), `sitemap missing ${path}`);
  }

  const urlCount = (text.match(/<loc>/g) || []).length;
  assert(urlCount >= 45, `sitemap URL count too low: ${urlCount}`);

  console.log(`ok ${url} (${urlCount} urls)`);
}

async function validateNotFound() {
  const url = new URL("/pagina-inexistente-seo-check", siteUrl).toString();
  const response = await fetch(url, { redirect: "manual" });

  assert(response.status === 404, `${url} returned ${response.status}, expected 404`);
  console.log(`ok ${url}`);
}

async function main() {
  console.log(`validating ${siteUrl}`);
  await validateRobots();
  await validateSitemap();
  await validateLlms();
  await Promise.all(pages.map(validatePage));
  await validateNotFound();
  console.log("SEO public validation passed");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
