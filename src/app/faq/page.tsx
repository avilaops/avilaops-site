import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { absoluteUrl, ogImages, siteConfig } from "@/lib/site";

const reviewedAt = "2026-08-06";

type FaqItem = { question: string; answer: string };
type FaqGroup = { title: string; items: FaqItem[] };

const faqGroups: FaqGroup[] = [
  {
    title: "Sobre a Avila Ops",
    items: [
      {
        question: "O que a Avila Ops faz?",
        answer:
          "A Avila Ops é o sistema operacional digital de pequenas empresas: site, domínio, e-mail profissional, identidade visual, WhatsApp, Instagram, Meta Ads, CRM, pagamentos, automações e dados conectados em uma única operação, em vez de ferramentas soltas.",
      },
      {
        question: "A Avila Ops atende só clientes de Ribeirão Preto?",
        answer:
          "Não. A operação é remota e atende empresas em qualquer cidade do Brasil. Ribeirão Preto é a base da equipe, não um limite de atendimento.",
      },
      {
        question: "Preciso já ter site, WhatsApp Business ou CRM para contratar?",
        answer:
          "Não. A Avila Ops estrutura a operação do zero quando necessário — domínio, site, WhatsApp Business, Instagram comercial e CRM — ou conecta o que a empresa já usa, evitando recomeçar do nada.",
      },
    ],
  },
  {
    title: "WhatsApp, Instagram e Meta Ads",
    items: [
      {
        question: "Qual a diferença entre WhatsApp Business comum e WhatsApp Business API?",
        answer:
          "O WhatsApp Business comum é o aplicativo de celular, usado por um atendente por vez. A WhatsApp Business API é acessada por CRM, chatbot ou plataformas de atendimento, permite múltiplos atendentes simultâneos, mensagens automatizadas em escala e integrações — sem interface de conversa própria.",
      },
      {
        question: "Como faço se o número do WhatsApp Business da empresa vai mudar?",
        answer:
          "Existe um processo de migração — no WhatsApp Manager para quem usa API, ou pela opção “Trocar número” no app comum — que preserva histórico e verificação quando feito corretamente. O guia completo, com o passo a passo e tudo que precisa ser atualizado fora do WhatsApp (site, anúncios, CRM), está em /guias/como-trocar-o-numero-do-whatsapp-business-da-empresa.",
      },
      {
        question: "Automação de WhatsApp substitui o atendimento humano?",
        answer:
          "Não necessariamente. O uso mais comum é reduzir perguntas repetidas, qualificar o lead e acionar a pessoa certa no momento certo — o atendimento humano continua decidindo os pontos que exigem julgamento.",
      },
      {
        question: "Dá para integrar Instagram, WhatsApp e Meta Ads no mesmo funil?",
        answer:
          "Sim. A estrutura mais comum liga o anúncio ou o conteúdo no Instagram a um clique para o WhatsApp, que cai direto em um atendimento organizado e registrado no CRM, com follow-up automático para quem não responde.",
      },
    ],
  },
  {
    title: "Site, domínio e presença digital",
    items: [
      {
        question: "Quanto custa criar uma presença digital profissional?",
        answer:
          "Varia conforme domínio, hospedagem, complexidade do site, identidade visual e integrações necessárias. O comparativo completo de faixas de investimento está em /guias/quanto-custa-criar-uma-presenca-digital-profissional.",
      },
      {
        question: "Site institucional, landing page ou loja virtual: qual escolher?",
        answer:
          "Depende do objetivo comercial: site institucional para autoridade e múltiplos serviços, landing page para uma oferta única com foco em conversão, loja virtual quando existe catálogo de produtos com checkout próprio. O guia comparativo está em /guias/site-institucional-landing-page-ou-loja-virtual.",
      },
      {
        question: "Preciso de site se já tenho um Instagram forte?",
        answer:
          "Instagram ajuda em alcance e prova social, mas não substitui um site: domínio próprio, indexação no Google e controle total do conteúdo não dependem do algoritmo de terceiros. O comparativo está em /guias/site-ou-instagram-para-pequena-empresa.",
      },
    ],
  },
  {
    title: "CRM, automações e dados",
    items: [
      {
        question: "Uma pequena empresa realmente precisa de CRM?",
        answer:
          "Precisa quando os leads começam a se perder entre WhatsApp, Instagram e planilhas soltas. O CRM centraliza contato, histórico, responsável e etapa de venda em um único lugar rastreável.",
      },
      {
        question: "Preciso de inteligência artificial para automatizar minha empresa?",
        answer:
          "Não obrigatoriamente. O primeiro passo é organizar processos, dados e responsáveis; a IA entra depois, em atendimento, triagem, geração de conteúdo e análise, quando já existe uma base organizada para ela atuar.",
      },
      {
        question: "Meus dados e os dados dos meus clientes ficam seguros?",
        answer:
          "Sim. Tokens de integrações sensíveis são armazenados criptografados, o acesso administrativo é restrito e cada ação relevante gera um registro de auditoria. Os detalhes completos estão na Política de Privacidade.",
      },
    ],
  },
  {
    title: "Contrato, prazos e suporte",
    items: [
      {
        question: "Existe fidelidade ou contrato de longo prazo?",
        answer:
          "As condições comerciais são combinadas caso a caso conforme o escopo contratado. Fale com a Avila Ops para receber a proposta com prazos e condições específicas da sua operação.",
      },
      {
        question: "Como entro em contato com o suporte?",
        answer:
          `Pelo WhatsApp (${siteConfig.phoneDisplay}) ou pelo e-mail ${siteConfig.email}.`,
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Perguntas frequentes | Avila Ops",
  description:
    "Respostas diretas sobre WhatsApp Business API, site, CRM, Meta Ads, dados, contrato e suporte da Avila Ops.",
  alternates: { canonical: absoluteUrl("/faq/") },
  openGraph: {
    title: "Perguntas frequentes | Avila Ops",
    description:
      "Respostas diretas sobre WhatsApp Business API, site, CRM, Meta Ads, dados, contrato e suporte da Avila Ops.",
    url: absoluteUrl("/faq/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: ogImages(),
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Perguntas frequentes", href: "/faq/" }]} />
      <section className="seo-page-hero">
        <div className="container">
          <span className="section-index">Avila Ops / FAQ</span>
          <h1>Perguntas frequentes</h1>
          <p>
            Respostas diretas sobre WhatsApp, Instagram, Meta Ads, site, CRM, dados e suporte.
            Não encontrou o que precisa? Fale com a gente pelo WhatsApp.
          </p>
          <div className="seo-review-date">Revisado em {reviewedAt}</div>
        </div>
      </section>

      {faqGroups.map((group) => (
        <section className="seo-page-section" key={group.title}>
          <div className="container">
            <h2>{group.title}</h2>
            <div className="seo-faq-list">
              {group.items.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="seo-page-section">
        <div className="container">
          <h2>Próximos temas relacionados</h2>
          <div className="seo-related-links">
            {[
              "guias/como-trocar-o-numero-do-whatsapp-business-da-empresa",
              "guias/whatsapp-comum-ou-business-api",
              "glossario/whatsapp-business-api",
              "guias",
            ].map((slug) => (
              <a href={`/${slug}/`} key={slug}>
                {slug.split("/").pop()?.replaceAll("-", " ")}
              </a>
            ))}
          </div>
        </div>
      </section>

      <script
        id="schema-faq-general"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Footer />
    </main>
  );
}
