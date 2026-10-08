import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptCard from "@/components/PromptCard";
import { aiPrompts } from "@/lib/ai-prompts";
import { absoluteUrl, siteConfig, whatsappUrl, tituloDaPagina, dataPorExtenso } from "@/lib/site";

const path = "/guias/ia/prompts-para-ia/";
const reviewedAt = "2026-08-26";

const title = "Prompts para IA: 7 efeitos de imagem prontos para copiar";
/** Card 1200x630 gerado por scripts/generate-og-images.mjs (EXTRA_PAGES). */
const ogImage = "/og/prompts-para-ia.png";
const description =
  "Sete prompts de edição de imagem com IA em português, prontos para copiar e colar: efeito cromo, clone, boneco, pôster gráfico, halo, LEGO e comida Minecraft.";

export const metadata: Metadata = {
  title: tituloDaPagina(title),
  description,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: tituloDaPagina(title),
    description,
    url: absoluteUrl(path),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "article",
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: tituloDaPagina(title),
    description,
    images: [ogImage],
  },
};

const howTo = [
  {
    title: "1. Escolha a foto certa",
    body: "Comece por uma foto nítida, bem iluminada e com o enquadramento que você quer no resultado. Prompt bom não conserta foto ruim: ele preserva o que já está lá. Para efeitos de corpo inteiro, use foto de corpo inteiro.",
  },
  {
    title: "2. Envie a imagem antes do texto",
    body: "Todos os prompts abaixo pressupõem uma imagem de referência anexada. Envie a foto primeiro e só depois cole o prompt, para o modelo tratar o texto como instrução de edição, não como pedido de imagem nova.",
  },
  {
    title: "3. Troque o que está entre colchetes",
    body: "Trechos como [ROUPA] e [PALETA] são campos para preencher. Descrever roupa, cor e cenário com suas palavras é o que faz o modelo manter a identidade da pessoa em vez de inventar um rosto genérico.",
  },
  {
    title: "4. Repita o que não pode mudar",
    body: "As linhas de proibição no fim de cada prompt (sem texto, sem marca-d'água, sem pessoas extras) parecem redundantes e não são: é o que mais reduz retrabalho. Se algo saiu errado, repita a restrição em vez de reescrever o prompt inteiro.",
  },
];

const faq = [
  {
    question: "Em qual ferramenta de IA esses prompts funcionam?",
    answer:
      "Todos foram escritos para modelos de edição de imagem que aceitam uma foto de referência junto do texto, como Nano Banana (Gemini), ChatGPT com geração de imagem, Midjourney com imagem de referência e Adobe Firefly. O texto é o mesmo; o que muda é onde você anexa a foto.",
  },
  {
    question: "Preciso pagar para usar?",
    answer:
      "Não. Os prompts são gratuitos e podem ser copiados e adaptados. O custo é o da ferramenta de IA que você escolher usar — várias têm plano gratuito com limite diário de imagens.",
  },
  {
    question: "Posso usar essas imagens em anúncio pago da minha empresa?",
    answer:
      "Nos efeitos genéricos, sim. Nos efeitos que citam marcas registradas (LEGO e Minecraft), o recomendado é ficar no conteúdo orgânico e não usar em campanha paga nem em peça que venda um produto, porque o uso comercial de marca de terceiro pode gerar notificação.",
  },
  {
    question: "Por que o rosto da pessoa muda mesmo com o prompt pedindo para preservar?",
    answer:
      "Normalmente por dois motivos: a foto de referência tem pouca resolução no rosto, ou o prompt pede uma cena grande demais para o enquadramento original. Aproxime o corte, descreva a pessoa com mais detalhe e reforce o bloqueio de identidade logo na primeira linha.",
  },
  {
    question: "Dá para usar isso na comunicação da minha empresa de forma organizada?",
    answer:
      "Sim, e é o uso mais útil. Em vez de gerar imagem solta, vale montar um padrão: as fotos base da empresa, dois ou três efeitos aprovados e um calendário de publicação. É exatamente esse tipo de operação que a Avila Ops organiza junto com site, WhatsApp e Instagram.",
  },
];

export default function PromptsParaIaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: siteConfig.language,
    datePublished: reviewedAt,
    dateModified: reviewedAt,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: aiPrompts.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${absoluteUrl(path)}#${item.slug}`,
    })),
  };

  return (
    <main>
      <Header />
      <article>
        <Breadcrumbs
          items={[
            { name: "Guias", href: "/guias/" },
            { name: "IA", href: "/guias/ia/" },
            { name: "Prompts para IA", href: path },
          ]}
        />

        <section className="seo-page-hero">
          <div className="container">
            <span className="section-index">Avila Ops / Guias / IA</span>
            <h1>Prompts para IA: 7 efeitos de imagem prontos para copiar</h1>
            <p>
              Sete prompts de edição de imagem em português, testados em foto de
              pessoa real e escritos para preservar identidade, roupa e
              enquadramento. Copie, troque o que está entre colchetes e rode na
              ferramenta que você já usa.
            </p>
            <div className="seo-review-date">Revisado em <time dateTime={reviewedAt}>{dataPorExtenso(reviewedAt)}</time></div>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <span className="console-label">Índice</span>
            <nav className="prompt-toc" aria-label="Lista de prompts">
              {aiPrompts.map((item, index) => (
                <a key={item.slug} href={`#${item.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Como usar sem perder tempo</h2>
            <div className="seo-page-grid">
              {howTo.map((step) => (
                <article key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container prompt-list">
            {aiPrompts.map((item, index) => (
              <PromptCard key={item.slug} prompt={item} index={index} />
            ))}
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Perguntas frequentes</h2>
            <div className="seo-faq-list">
              {faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Quer transformar isso em rotina de conteúdo?</h2>
            <p className="prompt-cta-text">
              Prompt solto rende um post. O que sustenta presença digital é um
              padrão: fotos base da empresa, efeitos aprovados, calendário e
              medição. A Avila Ops organiza isso junto com site, e-mail,
              WhatsApp, Instagram e automações.
            </p>
            <div className="prompt-cta">
              <Link className="button" href="/criar-meu-resumo/">
                Quero meu protótipo grátis
              </Link>
              <a
                className="button button-secondary"
                href={whatsappUrl(
                  "Vi os prompts de IA no site e quero organizar o conteúdo da minha empresa.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Guias relacionados</h2>
            <div className="seo-related-links">
              <Link href="/guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias/">
                Como fazer minha empresa aparecer no ChatGPT e nas IAs
              </Link>
              <Link href="/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd/">
                Como usar IA no atendimento sem violar a LGPD
              </Link>
              <Link href="/guias/como-aumentar-o-alcance-no-instagram-com-o-algoritmo-atual/">
                Como aumentar o alcance no Instagram
              </Link>
              <Link href="/guias/como-automatizar-instagram-da-empresa/">
                Como automatizar o Instagram da empresa
              </Link>
            </div>
          </div>
        </section>
      </article>

      <script
        id="schema-article-prompts-para-ia"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        id="schema-faq-prompts-para-ia"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="schema-list-prompts-para-ia"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Footer />
    </main>
  );
}
