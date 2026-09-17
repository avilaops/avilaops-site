export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDefinition: string;
  explanation: string;
  related: { label: string; href: string }[];
};

export const glossaryCover = (slug: string) => `/og/paginas/glossario-${slug}-v1.jpg`;

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "whatsapp-business-api",
    term: "WhatsApp Business API",
    shortDefinition:
      "Versão do WhatsApp voltada a empresas com múltiplos atendentes, integrações e mensagens automatizadas em escala.",
    explanation:
      "A WhatsApp Business API é diferente do aplicativo WhatsApp Business comum: ela não tem interface própria de conversa e é acessada por meio de um provedor autorizado (Solution Provider) ou de sistemas integrados, como CRM, chatbot e plataformas de atendimento. Ela permite múltiplos atendentes simultâneos, mensagens de modelo (templates) aprovadas pela Meta, automações mais robustas e integração com outras ferramentas comerciais. Costuma fazer sentido quando o volume de conversas ou o número de atendentes já não cabe no aplicativo comum.",
    related: [
      { label: "Automatizar WhatsApp", href: "/automatizar-whatsapp" },
      { label: "Como automatizar o WhatsApp da empresa", href: "/guias/como-automatizar-whatsapp-da-empresa" },
      { label: "WhatsApp comum ou Business API", href: "/guias/whatsapp-comum-ou-business-api" },
    ],
  },
  {
    slug: "crm",
    term: "CRM",
    shortDefinition:
      "Sistema para registrar contatos, histórico e etapa de venda de cada cliente ou lead.",
    explanation:
      "CRM significa Customer Relationship Management (gestão de relacionamento com o cliente). Na prática, é o sistema onde ficam registrados quem é o contato, de onde ele veio, o que já foi conversado, em que etapa do funil está, qual o próximo passo e quem é o responsável. Sem CRM, essas informações costumam ficar espalhadas entre WhatsApp, planilhas e memória da equipe, o que aumenta o risco de esquecimento e perda de oportunidade.",
    related: [
      { label: "CRM para pequenas empresas", href: "/crm-para-pequenas-empresas" },
      { label: "Como usar CRM com WhatsApp", href: "/guias/crm-para-pequenas-empresas-com-whatsapp" },
    ],
  },
  {
    slug: "pixel-da-meta",
    term: "Pixel da Meta",
    shortDefinition:
      "Código instalado no site que registra ações dos visitantes para medir e otimizar campanhas da Meta.",
    explanation:
      "O Pixel da Meta é um trecho de código inserido no site que envia eventos (visita, clique, cadastro, compra) de volta para o Gerenciador de Anúncios da Meta. Ele permite medir quantas conversões vieram de cada campanha, montar públicos personalizados e criar públicos semelhantes (lookalike) para novas campanhas. Sem o Pixel configurado corretamente, o anúncio pode gerar alcance, mas a empresa perde a capacidade de saber quais campanhas realmente geraram resultado.",
    related: [
      { label: "Instagram e Meta Ads", href: "/instagram-meta-ads" },
      { label: "Meta Ads para empresas", href: "/meta-ads-para-empresas" },
      {
        label: "Como configurar o Pixel da Meta e medir conversões",
        href: "/guias/como-configurar-pixel-da-meta-e-medir-conversoes",
      },
    ],
  },
  {
    slug: "landing-page",
    term: "Landing page",
    shortDefinition:
      "Página única focada em uma oferta específica e em uma ação clara, como preencher um formulário ou falar no WhatsApp.",
    explanation:
      "Uma landing page é diferente de um site institucional completo: ela costuma ter uma única oferta, um único público e uma única chamada para ação, sem os menus e distrações de um site tradicional. É usada principalmente para receber tráfego de campanhas (Meta Ads, Google Ads, e-mail) e converter esse tráfego em lead ou venda, medindo a taxa de conversão daquela página específica.",
    related: [
      {
        label: "Site institucional, landing page ou loja virtual",
        href: "/guias/site-institucional-landing-page-ou-loja-virtual",
      },
      { label: "Criação de site profissional", href: "/criacao-de-site-profissional" },
    ],
  },
  {
    slug: "dominio",
    term: "Domínio",
    shortDefinition:
      "Endereço próprio da empresa na internet, como \"suaempresa.com.br\", usado no site e no e-mail profissional.",
    explanation:
      "O domínio é o nome único que identifica um site na internet (por exemplo, avilaops.com). Ele é registrado por um período determinado, junto a um registrador ou provedor, e precisa ser renovado para continuar ativo. O domínio próprio também é a base para o e-mail profissional (contato@suaempresa.com.br) e para configurações técnicas de DNS, como direcionamento do site e autenticação de e-mail.",
    related: [
      { label: "Domínio e hospedagem", href: "/dominio-e-hospedagem" },
      { label: "DNS", href: "/glossario/dns" },
      { label: "E-mail profissional", href: "/glossario/e-mail-profissional" },
    ],
  },
  {
    slug: "dns",
    term: "DNS",
    shortDefinition:
      "Sistema que traduz o domínio da empresa para os endereços técnicos que apontam para o site, e-mail e outros serviços.",
    explanation:
      "DNS (Domain Name System) é o sistema que conecta o domínio da empresa aos servidores corretos: qual servidor entrega o site, quais servidores recebem o e-mail e quais registros autenticam o envio de mensagens (SPF, DKIM, DMARC). Uma configuração de DNS incorreta pode deixar o site fora do ar ou fazer o e-mail profissional cair na caixa de spam, mesmo que o conteúdo esteja correto.",
    related: [
      { label: "Domínio", href: "/glossario/dominio" },
      { label: "Domínio e hospedagem", href: "/dominio-e-hospedagem" },
    ],
  },
  {
    slug: "e-mail-profissional",
    term: "E-mail profissional",
    shortDefinition:
      "Caixa de e-mail com o domínio próprio da empresa, como contato@suaempresa.com.br, em vez de um provedor genérico.",
    explanation:
      "E-mail profissional é a caixa de e-mail vinculada ao domínio da própria empresa, em vez de um endereço genérico. Ele transmite mais confiança em propostas, contratos e comunicação comercial, e depende de configuração correta de DNS (MX, SPF, DKIM e DMARC) para ser entregue de forma confiável e não cair em spam.",
    related: [
      { label: "E-mail profissional (serviço)", href: "/email-profissional" },
      { label: "DNS", href: "/glossario/dns" },
    ],
  },
  {
    slug: "funil-de-vendas",
    term: "Funil de vendas",
    shortDefinition:
      "Sequência de etapas que um lead percorre desde o primeiro contato até a decisão de compra.",
    explanation:
      "O funil de vendas representa as etapas entre o primeiro contato de um potencial cliente e a conversão em venda: por exemplo, descoberta, interesse, contato (WhatsApp ou formulário), proposta, negociação e fechamento. Mapear o funil ajuda a identificar em qual etapa os leads estão travando e o que precisa mudar — atendimento, oferta, prazo de resposta ou material de apoio.",
    related: [
      { label: "Funil de vendas WhatsApp", href: "/funil-de-vendas-whatsapp" },
      {
        label: "Integrar Instagram, Meta Ads e WhatsApp em um funil",
        href: "/guias/instagram-meta-ads-whatsapp-funil",
      },
    ],
  },
  {
    slug: "automacao",
    term: "Automação",
    shortDefinition:
      "Uso de sistemas e integrações para executar tarefas repetitivas sem depender de trabalho manual constante.",
    explanation:
      "Automação, no contexto comercial, é o uso de sistemas e integrações para reduzir tarefas manuais repetitivas: respostas padrão, distribuição de leads, criação de tarefas, lembretes de follow-up, atualização de status e geração de relatórios. O objetivo não é eliminar o atendimento humano, mas liberar tempo da equipe para as etapas que realmente exigem julgamento e relacionamento.",
    related: [
      { label: "Automação para pequenas empresas", href: "/automacao-para-pequenas-empresas" },
      {
        label: "O que uma pequena empresa precisa para vender melhor no digital",
        href: "/guias/o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital",
      },
    ],
  },
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((entry) => entry.slug === slug);
}
