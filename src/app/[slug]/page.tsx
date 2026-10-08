import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { absoluteUrl, ogImages, siteConfig } from "@/lib/site";

type SeoPage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  audience: string[];
  deliverables: string[];
  process: string[];
  benefits: string[];
  related: string[];
  faq: { question: string; answer: string }[];
  /** Página que vende produto pronto leva direto para ele, não para o diagnóstico. */
  cta?: { label: string; href: string };
  reviewedAt?: string;
};

const reviewedAt = "2026-07-25";

const pages: Record<string, SeoPage> = {
  "presenca-digital-para-pequenas-empresas": {
    title: "Presença digital para pequenas empresas | Avila Ops",
    description:
      "Site, domínio, e-mail profissional, identidade visual, WhatsApp, Instagram e automações conectados para pequenas empresas.",
    h1: "Presença digital para pequenas empresas",
    intro:
      "Presença digital é o conjunto de canais, identidade, tecnologia e processos que fazem uma empresa ser encontrada, entendida e acionada com confiança. A Avila Ops organiza site, domínio, e-mail, marca, WhatsApp, Instagram e automações em uma jornada única.",
    audience: [
      "empresas que precisam parecer mais profissionais no digital",
      "negócios que dependem de WhatsApp, Instagram e indicação",
      "equipes que querem parar de improvisar site, domínio, e-mail e redes sociais",
    ],
    deliverables: [
      "site ou landing page profissional",
      "domínio, hospedagem e e-mail profissional",
      "identidade visual e comunicação de base",
      "integração com WhatsApp, formulários e analytics",
    ],
    process: [
      "mapear objetivo comercial, público e canais atuais",
      "organizar domínio, site, identidade, e-mail e pontos de contato",
      "conectar WhatsApp, formulários, redes sociais e medição",
      "validar publicação, rastreamento, conversões e próximos conteúdos",
    ],
    benefits: [
      "mais confiança para quem pesquisa a empresa antes de chamar",
      "menos dependência de apenas uma rede social ou indicação",
      "base própria para medir contatos, campanhas e oportunidades",
      "estrutura pronta para evoluir para CRM, automações e pagamentos",
    ],
    related: [
      "criacao-de-site-profissional",
      "email-profissional",
      "automatizar-whatsapp",
      "instagram-meta-ads",
    ],
    faq: [
      {
        question: "O que é presença digital para pequenas empresas?",
        answer:
          "É a estrutura que permite que uma empresa seja encontrada, transmita confiança e converta interessados em contatos ou vendas usando site, domínio, e-mail, redes sociais, WhatsApp e automações.",
      },
      {
        question: "A Avila Ops faz apenas o site?",
        answer:
          "Não. A Avila Ops conecta site, domínio, e-mail profissional, identidade, WhatsApp, Instagram, Meta Ads, CRM e automações conforme a necessidade do negócio.",
      },
    ],
  },
  "email-profissional": {
    title: "E-mail profissional com o domínio da empresa | Avila Ops",
    description:
      "contato@suaempresa.com.br no ar no mesmo dia, com webmail, celular e os e-mails antigos trazidos. R$ 10 por caixa, por mês, em real.",
    h1: "E-mail com o nome da sua empresa, pronto no mesmo dia",
    intro:
      "Orçamento que sai de um endereço @gmail.com passa a impressão de empresa improvisada, mesmo quando a empresa já tem site e domínio. Colocamos contato@suaempresa.com.br no ar, com webmail, celular e os e-mails antigos trazidos, por R$ 10 por caixa ao mês.",
    audience: [
      "empresa que já tem domínio e ainda responde cliente pelo Gmail ou pelo Hotmail",
      "escritório que paga Google Workspace por pessoa e só usa o e-mail",
      "quem está preso num provedor antigo, com caixa lotada e suporte por chamado",
      "equipe pequena que precisa de um endereço por pessoa e de um contato@ para todos",
    ],
    deliverables: [
      "caixas com o domínio da empresa, a R$ 10 por caixa ao mês, com 5 GB cada",
      "webmail no navegador e configuração no celular, no Outlook e no Mac",
      "registros MX, SPF, DKIM e DMARC, que são o que Gmail e Outlook conferem antes de aceitar uma mensagem",
      "e-mails antigos trazidos do Gmail, Titan, Zoho ou cPanel, pasta por pasta",
      "verificação em duas etapas, filtros, resposta automática e apelidos como vendas@ e financeiro@",
    ],
    process: [
      "você informa o domínio e mostramos exatamente o que configurar no DNS",
      "conferimos os registros e criamos a caixa de cada pessoa",
      "trazemos os e-mails antigos com data, pastas e marcação de lido",
      "o guia mostra como configurar cada aparelho, e quem travar fala com a gente",
    ],
    benefits: [
      "orçamento e nota saem de um endereço que o cliente reconhece como da empresa",
      "quando alguém sai da equipe, a caixa e o histórico continuam com a empresa",
      "preço em real e por caixa, sem pacote em dólar com recursos que ninguém usa",
      "SPF, DKIM e DMARC conferidos em todo domínio que hospedamos",
    ],
    related: [
      "dominio-e-hospedagem",
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
    ],
    faq: [
      {
        question: "Quanto custa?",
        answer:
          "R$ 10 por caixa, por mês, cobrado por domínio no Mercado Pago. Não tem taxa de configuração.",
      },
      {
        question: "Vou perder os e-mails antigos?",
        answer:
          "Não. As mensagens vêm pasta por pasta, com data e com a marcação de lido ou não lido, do Gmail, Titan, Zoho, cPanel ou qualquer provedor que aceite IMAP.",
      },
      {
        question: "Funciona no celular e no Outlook?",
        answer:
          "Sim. IMAP, POP3 e SMTP funcionam em qualquer programa de e-mail, e o guia de configuração mostra o passo a passo por aparelho.",
      },
      {
        question: "Meus e-mails vão cair no spam?",
        answer:
          "Todo domínio sai com SPF, DKIM e DMARC configurados, que é o que Gmail e Outlook conferem antes de aceitar uma mensagem. Nenhum provedor sério garante caixa de entrada, porque isso também depende de reputação e do que é enviado, e a gente não promete o que não controla.",
      },
      {
        question: "Preciso ter site?",
        answer:
          "Não. Basta ter o domínio registrado. O e-mail funciona com ou sem site.",
      },
      {
        question: "Quando não vale contratar?",
        answer:
          "Se a empresa tem mais de 30 pessoas ou precisa de Drive, Meet e agenda compartilhada no mesmo pacote, o Google Workspace ou o Microsoft 365 atende melhor, e a gente diz isso na conversa.",
      },
    ],
    cta: {
      label: "Ver o que configurar no meu domínio",
      href: "https://app.avilaops.com/email?utm_source=site&utm_medium=pagina&utm_campaign=email-profissional",
    },
    reviewedAt: "2026-09-11",
  },
  "automatizar-whatsapp": {
    title: "Automatizar WhatsApp para empresas | Avila Ops",
    description:
      "Automatize WhatsApp Business, atendimento, funis de venda, formulários, CRM e follow-up com a Avila Ops.",
    h1: "Automatizar WhatsApp para vender, atender e organizar clientes",
    intro:
      "Automatizar WhatsApp significa preparar respostas, fluxos, integrações e alertas para que a empresa responda mais rápido, registre oportunidades e conduza o cliente para a próxima etapa sem depender apenas de trabalho manual.",
    audience: [
      "empresas que perdem leads por demora no atendimento",
      "negócios que recebem pedidos e dúvidas pelo WhatsApp",
      "equipes que precisam organizar follow-up, orçamento e suporte",
    ],
    deliverables: [
      "diagnóstico do fluxo comercial atual",
      "respostas automáticas e roteamento de atendimento",
      "integração com site, formulários, CRM e Meta Ads",
      "funil WhatsApp com etapas, alertas e acompanhamento",
    ],
    process: [
      "mapear perguntas repetidas, horários críticos e etapas de venda",
      "definir roteiros de atendimento, qualificação e encaminhamento",
      "integrar WhatsApp com site, formulários, CRM e campanhas",
      "acompanhar gargalos, tempo de resposta, follow-up e conversões",
    ],
    benefits: [
      "menos leads perdidos por demora ou falta de retorno",
      "atendimento mais padronizado sem eliminar a intervenção humana",
      "histórico comercial mais organizado para orçamento e suporte",
      "maior controle sobre origem, etapa e próximo passo de cada contato",
    ],
    related: [
      "whatsapp-business-api",
      "funil-de-vendas-whatsapp",
      "integrar-instagram-whatsapp",
      "automacao-de-atendimento",
    ],
    faq: [
      {
        question: "Dá para automatizar o WhatsApp da minha empresa?",
        answer:
          "Sim. A automação pode começar com respostas e fluxos simples no WhatsApp Business e evoluir para integrações com WhatsApp Business API, CRM, site, Instagram e Meta Ads.",
      },
      {
        question: "Automação de WhatsApp substitui atendimento humano?",
        answer:
          "Não necessariamente. O melhor uso é reduzir repetição, organizar informações e acionar pessoas nos momentos importantes da venda ou do suporte.",
      },
    ],
  },
  "automatizar-minha-empresa": {
    title: "Como automatizar minha empresa | Avila Ops",
    description:
      "Automatize processos, WhatsApp, Instagram, CRM, pagamentos, dados e atendimento com uma operação digital integrada.",
    h1: "Como automatizar minha empresa",
    intro:
      "Para automatizar sua empresa, comece mapeando processos repetitivos, organize atendimento e vendas, conecte WhatsApp, Instagram, site, CRM, pagamentos e dados, defina responsáveis e automatize em etapas mensuráveis. A Avila Ops transforma ferramentas soltas em uma operação digital integrada.",
    audience: [
      "empresas que perdem tempo com tarefas repetitivas e controles manuais",
      "negócios que recebem leads por WhatsApp, Instagram, site e indicação",
      "operações que precisam organizar atendimento, vendas, pagamentos e dados",
      "equipes que querem crescer sem depender de improviso ou memória individual",
    ],
    deliverables: [
      "mapeamento dos processos repetitivos e gargalos comerciais",
      "integração de WhatsApp, Instagram, site, formulários e CRM",
      "automações de atendimento, follow-up, cobrança, agenda e tarefas",
      "painéis, métricas e rotinas para acompanhar oportunidades e resultado",
    ],
    process: [
      "listar tarefas repetitivas, canais de entrada e perdas de informação",
      "priorizar fluxos com impacto direto em atendimento, venda ou cobrança",
      "centralizar contatos, etapas, responsáveis e próximos passos em CRM",
      "conectar WhatsApp, Instagram, Meta Ads, site, pagamentos e relatórios",
      "medir tempo de resposta, leads, conversões, gargalos e recorrência",
    ],
    benefits: [
      "menos retrabalho e menos oportunidades perdidas por falta de retorno",
      "atendimento mais rápido sem perder controle humano nas decisões importantes",
      "visão clara de leads, propostas, pagamentos, tarefas e responsáveis",
      "base pronta para IA, remarketing, campanhas, newsletter e suporte recorrente",
    ],
    related: [
      "automacao-para-pequenas-empresas",
      "automatizar-whatsapp",
      "integrar-instagram-whatsapp",
      "crm-para-pequenas-empresas",
      "sistema-para-pequenas-empresas",
    ],
    faq: [
      {
        question: "Por onde começar para automatizar minha empresa?",
        answer:
          "Comece pelos processos que mais se repetem e mais afetam venda ou atendimento: captação de leads, respostas no WhatsApp, follow-up, propostas, cobrança, agenda, cadastro de clientes e relatórios.",
      },
      {
        question: "Preciso de IA para automatizar uma pequena empresa?",
        answer:
          "Não obrigatoriamente. Antes da IA, a empresa precisa organizar processos, dados e responsáveis. Depois disso, IA pode ajudar em atendimento, triagem, conteúdo, análise e suporte.",
      },
      {
        question: "Dá para automatizar WhatsApp, Instagram e Meta Ads juntos?",
        answer:
          "Sim. A melhor estrutura conecta campanha, conteúdo, clique para WhatsApp, formulário, CRM, follow-up e medição para que o lead não fique perdido entre canais.",
      },
      {
        question: "Quanto custa automatizar uma empresa?",
        answer:
          "O custo depende do número de processos, canais, integrações e nível de personalização. O ideal é começar por um diagnóstico e automatizar primeiro os fluxos com maior impacto comercial.",
      },
    ],
  },
  "instagram-meta-ads": {
    title: "Instagram e Meta Ads para empresas | Avila Ops",
    description:
      "Planejamento de Instagram, Meta Ads, Pixel da Meta, conteúdo, campanhas e integração com WhatsApp para pequenas empresas.",
    h1: "Instagram e Meta Ads conectados ao funil de vendas",
    intro:
      "Instagram e Meta Ads funcionam melhor quando conteúdo, campanha, pixel, WhatsApp e página de destino estão conectados. A Avila Ops organiza essa estrutura para transformar alcance em conversa, lead e venda mensurável.",
    audience: [
      "empresas que postam, mas não sabem o que gera venda",
      "negócios que anunciam sem medir conversões",
      "marcas que precisam integrar Instagram, site e WhatsApp",
    ],
    deliverables: [
      "organização do perfil profissional no Instagram",
      "planejamento de conteúdo comercial",
      "configuração de Meta Ads e Pixel da Meta",
      "integração de anúncios com WhatsApp e landing pages",
    ],
    process: [
      "revisar perfil, oferta, públicos e histórico de campanhas",
      "definir conteúdo, página de destino e chamada para WhatsApp",
      "configurar Pixel da Meta, eventos e estrutura de campanha",
      "medir conversas, leads, conversões e ajustes de verba",
    ],
    benefits: [
      "campanhas conectadas ao atendimento e nao apenas ao alcance",
      "melhor leitura do que gera conversa, lead e oportunidade",
      "menos desperdício com anúncios sem medição ou destino claro",
      "base para remarketing, públicos e otimização contínua",
    ],
    related: [
      "automacao-instagram",
      "meta-ads-para-empresas",
      "pixel-da-meta",
      "integrar-instagram-whatsapp",
    ],
    faq: [
      {
        question: "O que é Meta Ads?",
        answer:
          "Meta Ads é a plataforma de anúncios da Meta para Facebook, Instagram, Messenger e parceiros, usada para gerar alcance, leads, vendas e mensagens no WhatsApp.",
      },
      {
        question: "Por que integrar Instagram com WhatsApp?",
        answer:
          "Porque muitas pequenas empresas vendem pela conversa. A integração reduz atrito entre interesse no conteúdo, clique no anúncio e atendimento comercial.",
      },
    ],
  },
  "automacao-para-pequenas-empresas": {
    title: "Automação para pequenas empresas | Avila Ops",
    description:
      "Automação comercial, CRM, atendimento, integração de sistemas, alertas e operação digital para pequenas empresas.",
    h1: "Automação para pequenas empresas que precisam crescer com controle",
    intro:
      "Automação para pequenas empresas é o uso de sistemas, integrações e fluxos para reduzir tarefas repetitivas, organizar dados e garantir que vendas, atendimento e suporte não dependam de improviso.",
    audience: [
      "empresas que dependem de planilhas e mensagens soltas",
      "operações que precisam integrar site, WhatsApp, CRM e pagamento",
      "negócios que querem crescer sem aumentar trabalho manual na mesma proporção",
    ],
    deliverables: [
      "mapeamento de processos manuais",
      "integração entre canais, CRM e sistemas",
      "alertas, relatórios e automações de follow-up",
      "portais e sistemas sob medida quando necessário",
    ],
    process: [
      "identificar tarefas repetitivas, perdas de informação e retrabalho",
      "definir fluxo mínimo de dados, responsáveis e etapas operacionais",
      "conectar canais, CRM, pagamentos, relatórios e alertas",
      "acompanhar indicadores para remover gargalos progressivamente",
    ],
    benefits: [
      "menos dependência de planilhas soltas e mensagens perdidas",
      "mais previsibilidade no atendimento, vendas e suporte",
      "dados mais úteis para decidir prioridade, orçamento e equipe",
      "crescimento com menos aumento proporcional de trabalho manual",
    ],
    related: [
      "crm-para-pequenas-empresas",
      "portal-do-cliente",
      "sistema-para-pequenas-empresas",
      "automatizar-whatsapp",
    ],
    faq: [
      {
        question: "Que processos uma pequena empresa pode automatizar?",
        answer:
          "Atendimento, captação de leads, follow-up, envio de propostas, cobrança, cadastro de clientes, relatórios, alertas internos e integração entre site, WhatsApp e CRM.",
      },
      {
        question: "Automação serve para empresa pequena?",
        answer:
          "Sim. Empresas pequenas ganham mais quando automatizam tarefas repetitivas, porque reduzem perda de oportunidades e dependência de processos manuais.",
      },
    ],
  },
};

const aliases: Record<string, keyof typeof pages> = {
  "criacao-de-site-profissional": "presenca-digital-para-pequenas-empresas",
  "dominio-e-hospedagem": "presenca-digital-para-pequenas-empresas",
  "identidade-visual": "presenca-digital-para-pequenas-empresas",
  "whatsapp-business-api": "automatizar-whatsapp",
  "funil-de-vendas-whatsapp": "automatizar-whatsapp",
  "automacao-de-atendimento": "automatizar-whatsapp",
  "integrar-site-com-whatsapp": "automatizar-whatsapp",
  "automacao-instagram": "instagram-meta-ads",
  "meta-ads-para-empresas": "instagram-meta-ads",
  "integrar-instagram-whatsapp": "instagram-meta-ads",
  "pixel-da-meta": "instagram-meta-ads",
  "crm-para-pequenas-empresas": "automacao-para-pequenas-empresas",
  "portal-do-cliente": "automacao-para-pequenas-empresas",
  "sistema-para-pequenas-empresas": "automacao-para-pequenas-empresas",
};

function getPage(slug: string) {
  return pages[slug] ?? pages[aliases[slug]];
}

export function generateStaticParams() {
  return [...Object.keys(pages), ...Object.keys(aliases)].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(`/${slug}/`),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(`/${slug}/`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: ogImages(),
    },
  };
}

export default async function SeoServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: paramsSlug } = await params;
  const page = getPage(paramsSlug);
  if (!page) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed[0],
    description: page.intro,
    dateModified: page.reviewedAt ?? reviewedAt,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: page.h1, href: `/${paramsSlug}/` }]} />
      <section className="seo-page-hero">
        <div className="container">
          <span className="section-index">Avila Ops / Operação digital</span>
          <h1>{page.h1}</h1>
          <p>{page.intro}</p>
          <div className="seo-review-date">Revisado em {page.reviewedAt ?? reviewedAt}</div>
          {page.cta ? (
            <a href={page.cta.href}>{page.cta.label}</a>
          ) : (
            <Link href="/criar-meu-resumo/">Solicitar diagnóstico</Link>
          )}
        </div>
      </section>

      <section className="seo-page-section">
        <div className="container seo-page-grid">
          <article>
            <h2>Quando sua empresa precisa disso</h2>
            <ul>
              {page.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>O que a Avila Ops configura</h2>
            <ul>
              {page.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="seo-page-section">
        <div className="container seo-page-grid">
          <article>
            <h2>Processo em etapas</h2>
            <ol>
              {page.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article>
            <h2>Benefícios mensuráveis</h2>
            <ul>
              {page.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="seo-page-section">
        <div className="container">
          <h2>Perguntas frequentes</h2>
          <div className="seo-faq-list">
            {page.faq.map((item) => (
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
          <h2>Serviços relacionados</h2>
          <div className="seo-related-links">
            {page.related.map((slug) => (
              <a href={`/${slug}/`} key={slug}>
                {slug.replaceAll("-", " ")}
              </a>
            ))}
          </div>
        </div>
      </section>

      <script
        id={`schema-service-${paramsSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        id={`schema-faq-${paramsSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Footer />
    </main>
  );
}
