export type Comparison = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  imageName: string;
  options: {
    name: string;
    bestFor: string;
    limitation: string;
  }[];
  recommendation: string;
  related: string[];
};

export const comparisons: Comparison[] = [
  {
    slug: "avila-ops-vs-agencia-tradicional",
    imageName: "comparativo-agencia-v2",
    title: "Avila Ops ou agência tradicional?",
    description:
      "Compare Avila Ops com agência tradicional para site, marketing, automação, WhatsApp, Instagram, Meta Ads e operação digital.",
    summary:
      "Uma agência e a Avila Ops podem apoiar sua presença digital de maneiras diferentes. Compare o escopo da proposta, a forma de aprovação, o controle dos seus acessos e o suporte depois da entrega para encontrar a opção adequada ao seu negócio.",
    options: [
      {
        name: "Agência tradicional",
        bestFor: "Quando a especialidade, o portfólio e a proposta da equipe combinam com seu projeto de marca, site ou comunicação.",
        limitation:
          "Confira se a proposta inclui as integrações e a manutenção de que você precisa. Esses serviços e suas condições variam entre fornecedores.",
      },
      {
        name: "Avila Ops",
        bestFor:
          "Pequenas empresas que querem organizar site, canais de contato e atendimento em uma jornada, começando pela prioridade do negócio.",
        limitation:
          "O escopo depende da sua necessidade. Confirme quais serviços, integrações, prazos e custos recorrentes estão incluídos na proposta.",
      },
    ],
    recommendation:
      "Peça propostas para a mesma necessidade e compare entregas, responsabilidades e custo de continuidade. Se você quer conectar a presença digital ao atendimento da sua pequena empresa, conte sua ideia à Avila Ops e avalie o caminho proposto.",
    related: ["presenca-digital-para-pequenas-empresas", "automatizar-whatsapp", "instagram-meta-ads"],
  },
  {
    slug: "avila-ops-vs-ferramentas-saas",
    imageName: "comparativo-ferramentas-v2",
    title: "Avila Ops ou ferramentas SaaS soltas?",
    description:
      "Compare ferramentas SaaS isoladas com uma operação digital integrada para pequenas empresas.",
    summary:
      "Ferramentas SaaS resolvem partes específicas. O problema aparece quando a empresa passa a depender de vários sistemas sem integração, sem dono claro e sem visão central.",
    options: [
      {
        name: "Ferramentas SaaS",
        bestFor: "Resolver uma tarefa específica rapidamente, como agenda, formulário ou disparo.",
        limitation:
          "Sem integração e processo, a empresa vira a ponte manual entre dados, clientes e decisões.",
      },
      {
        name: "Avila Ops",
        bestFor:
          "Criar uma arquitetura simples entre canais, CRM, automações, relatórios e atendimento.",
        limitation:
          "Nem toda ferramenta precisa ser substituída; algumas devem ser integradas e governadas.",
      },
    ],
    recommendation:
      "Escolha a Avila Ops quando as ferramentas existem, mas a rotina ainda depende de planilhas, mensagens soltas e conferência manual.",
    related: ["automacao-para-pequenas-empresas", "crm-para-pequenas-empresas", "portal-do-cliente"],
  },
  {
    slug: "site-profissional-vs-instagram",
    imageName: "comparativo-site-instagram-v2",
    title: "Site profissional ou só Instagram?",
    description:
      "Entenda quando pequena empresa precisa de site, Instagram, WhatsApp e Meta Ads trabalhando juntos.",
    summary:
      "Instagram ajuda descoberta e relacionamento, mas não substitui uma base própria. Site profissional melhora autoridade, SEO, campanhas, eventos de conversão e organização da oferta.",
    options: [
      {
        name: "Só Instagram",
        bestFor: "Validar oferta, mostrar bastidores e manter relacionamento com público existente.",
        limitation:
          "Depende do algoritmo, tem pouca profundidade comercial e não constrói a mesma autoridade no Google.",
      },
      {
        name: "Site profissional conectado",
        bestFor:
          "Explicar serviços, captar leads, medir conversões, ranquear no Google e integrar WhatsApp e Meta Ads.",
        limitation:
          "Precisa de estratégia de conteúdo e manutenção mínima para gerar autoridade contínua.",
      },
    ],
    recommendation:
      "O melhor modelo é site, Instagram e WhatsApp conectados: o Instagram atrai, o site explica e mede, o WhatsApp converte.",
    related: ["criacao-de-site-profissional", "instagram-meta-ads", "integrar-instagram-whatsapp"],
  },
];

export function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function comparisonImage(comparison: Comparison, format: "webp" | "jpg" = "webp") {
  return `/media/vida/${comparison.imageName}.${format}`;
}
