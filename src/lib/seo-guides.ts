export type Guide = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  ogImage?: string;
  /** Data da última revisão editorial (YYYY-MM-DD). Sem valor, usa o padrão da página. */
  reviewedAt?: string;
  sections: { title: string; body: string; checklist?: string[] }[];
  related: string[];
};

export const guideCover = (slug: string) => `/editorial/guias/${slug}.webp`;

export function estimateGuideMinutes(guide: Guide) {
  const words = [guide.answer, ...guide.sections.flatMap((section) => [section.body, ...(section.checklist || [])])]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 190));
}

export const guides: Guide[] = [
  {
    slug: "como-faco-para-minha-empresa-aparecer-no-google",
    title: "Como faço para minha empresa aparecer no Google?",
    description:
      "Passos práticos para uma pequena empresa aparecer no Google com site, perfil comercial, SEO local, conteúdo, dados estruturados e medição.",
    // JPEG: a arte é feita à mão e, em PNG a 1200x630, passava de 600 KB —
    // peso em que o WhatsApp costuma desistir de baixar a imagem do card.
    ogImage: "/og/aparecer-no-google.jpg",
    answer:
      "Para sua empresa aparecer no Google, comece com uma base verificável: domínio próprio, site indexável, páginas claras de serviço, perfil comercial quando aplicável, dados de contato consistentes, sitemap, conteúdo útil e medição. O Google precisa entender quem é a empresa, o que ela oferece, onde atende e por que a página responde melhor à busca do cliente.",
    sections: [
      {
        title: "O que precisa existir primeiro",
        body: "A empresa precisa ter uma base pública confiável: site com domínio próprio, páginas acessíveis sem login, título e descrição claros, telefone ou WhatsApp visível, endereço ou área atendida quando fizer sentido e conteúdo que explique serviços reais. Rede social ajuda, mas não substitui uma base própria indexável.",
        checklist: [
          "Domínio próprio funcionando com HTTPS",
          "Site abrindo bem no celular",
          "Página inicial explicando o que a empresa faz",
          "Páginas específicas para os principais serviços",
          "Contato visível e consistente",
        ],
      },
      {
        title: "Como o Google encontra e entende a empresa",
        body: "O Google descobre páginas por links, sitemap, rastreamento e sinais externos. Depois tenta entender a intenção de cada página. Por isso, cada serviço importante deve ter uma página própria com pergunta direta, explicação objetiva, dados estruturados, links internos e uma chamada clara para contato.",
        checklist: [
          "robots.txt permitindo rastreamento",
          "sitemap.xml publicado",
          "títulos e descrições únicos por página",
          "links internos entre home, serviços, guias e contato",
          "Schema.org de Organization, LocalBusiness, Service, Article ou FAQ quando aplicável",
        ],
      },
      {
        title: "Google Maps e busca local",
        body: "Se a empresa atende localmente ou tem endereço comercial elegível, o Perfil da Empresa no Google pode ser decisivo. Ele deve usar nome, categoria, telefone, site, área de atendimento, horários, fotos e descrição coerentes com o site. Não vale inventar endereço ou categoria: inconsistência prejudica confiança.",
        checklist: [
          "Confirmar se a operação é elegível para Perfil da Empresa no Google",
          "Usar o mesmo nome público do site",
          "Conferir telefone, WhatsApp, cidade e área de atendimento",
          "Adicionar site oficial e serviços reais",
          "Coletar avaliações reais de clientes quando houver autorização",
        ],
      },
      {
        title: "Conteúdo que ajuda a ranquear",
        body: "Uma pequena empresa não precisa publicar texto genérico todos os dias. Ela precisa responder dúvidas reais de compra: preço, prazo, comparação, quando contratar, como funciona, problemas comuns e diferença entre alternativas. Esse tipo de conteúdo ajuda Google e LLMs a entenderem autoridade prática.",
        checklist: [
          "Responder perguntas que clientes já fazem no WhatsApp",
          "Criar guias para temas comerciais importantes",
          "Criar comparativos honestos entre alternativas",
          "Manter data de revisão nos conteúdos principais",
          "Evitar prometer primeira posição ou resultado garantido",
        ],
      },
      {
        title: "Como medir se está funcionando",
        body: "Aparecer no Google não é só estar indexado. O acompanhamento mínimo deve olhar impressões, cliques, posição média, páginas indexadas, termos buscados, cliques no WhatsApp e leads gerados. Sem medição, a empresa não sabe se precisa melhorar conteúdo, página, oferta ou autoridade externa.",
        checklist: [
          "Configurar Google Search Console",
          "Enviar o sitemap no Search Console",
          "Configurar analytics e eventos de conversão",
          "Acompanhar buscas que geram impressão e clique",
          "Revisar mensalmente páginas com potencial e baixa conversão",
        ],
      },
    ],
    related: [
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
      "checklist-de-presenca-digital-para-pequenas-empresas",
      "site-ou-instagram-para-pequena-empresa",
    ],
  },
  {
    slug: "como-automatizar-whatsapp-da-empresa",
    title: "Como automatizar o WhatsApp da empresa?",
    description:
      "Guia direto sobre automação de WhatsApp para atendimento, vendas, CRM e integração com Instagram, site e Meta Ads.",
    answer:
      "Para automatizar o WhatsApp da empresa, comece mapeando as perguntas repetidas, etapas de venda, responsáveis e dados que precisam entrar no CRM. Depois configure respostas, etiquetas, formulários, alertas, integração com site e, quando necessário, WhatsApp Business API.",
    sections: [
      {
        title: "O que automatizar primeiro",
        body: "Priorize saudação, qualificação do lead, perguntas frequentes, envio de links, coleta de dados, distribuição para atendentes e lembretes de follow-up. Isso reduz perda de oportunidades sem remover o atendimento humano.",
      },
      {
        title: "Quando usar WhatsApp Business API",
        body: "A API faz sentido quando a empresa precisa de múltiplos atendentes, integrações com CRM, disparos transacionais, histórico centralizado, métricas e fluxos mais controlados.",
      },
      {
        title: "Como a Avila Ops organiza",
        body: "A Avila Ops conecta WhatsApp, site, formulários, Instagram, Meta Ads, CRM e dados para transformar conversas em uma operação mensurável.",
      },
    ],
    related: ["automatizar-whatsapp", "whatsapp-business-api", "funil-de-vendas-whatsapp"],
  },
  {
    slug: "como-automatizar-minha-empresa",
    title: "Como automatizar minha empresa?",
    description:
      "Passos práticos para automatizar uma pequena empresa com processos, WhatsApp, Instagram, CRM, pagamentos, dados e métricas.",
    answer:
      "Para automatizar sua empresa, mapeie primeiro os processos repetitivos, escolha os fluxos com maior impacto comercial, conecte canais como WhatsApp, Instagram e site a um CRM, defina responsáveis, crie follow-ups automáticos e acompanhe métricas de atendimento, vendas e pagamento.",
    sections: [
      {
        title: "Mapeie antes de escolher ferramentas",
        body: "Automação sem processo costuma digitalizar a desorganização. Antes de contratar ferramentas, liste onde a empresa perde tempo: perguntas repetidas, demora no atendimento, propostas sem retorno, cobranças manuais, planilhas duplicadas e tarefas sem responsável.",
        checklist: [
          "Listar tarefas repetitivas da rotina",
          "Identificar onde leads e pedidos se perdem",
          "Separar processos de atendimento, vendas, financeiro e suporte",
          "Definir quem é responsável por cada etapa",
        ],
      },
      {
        title: "Priorize o que gera venda ou reduz perda",
        body: "O primeiro bloco de automação deve resolver algo visível no resultado: responder melhor, registrar leads, lembrar follow-up, cobrar no prazo, medir campanhas ou acionar a equipe certa. Evite começar por integrações grandes que não mudam o dia a dia.",
        checklist: [
          "Atendimento inicial no WhatsApp",
          "Qualificação de leads vindos do Instagram e Meta Ads",
          "Registro de contatos e oportunidades em CRM",
          "Follow-up de propostas abertas",
          "Avisos de cobrança, vencimento e agenda",
        ],
      },
      {
        title: "Conecte WhatsApp, Instagram, site e CRM",
        body: "A automação ganha força quando os canais deixam de funcionar isolados. O cliente pode chegar por anúncio, conteúdo, Google ou indicação, mas o histórico precisa entrar em uma rotina única de atendimento, venda e acompanhamento.",
        checklist: [
          "Botões e formulários do site enviando dados úteis",
          "Instagram e Meta Ads direcionando para oferta e WhatsApp",
          "CRM registrando origem, interesse, etapa e próximo passo",
          "Equipe recebendo alertas e tarefas no momento certo",
        ],
      },
      {
        title: "Use dados para melhorar o processo",
        body: "Automatizar não é apenas disparar mensagens. A empresa precisa medir tempo de resposta, volume de leads, origem das oportunidades, taxa de conversão, propostas abertas, pagamentos pendentes e gargalos de atendimento.",
        checklist: [
          "Acompanhar leads por canal",
          "Medir cliques no WhatsApp e envio de formulário",
          "Revisar oportunidades sem retorno",
          "Separar automações que economizam tempo das que geram receita",
        ],
      },
      {
        title: "Como a Avila Ops estrutura a automação",
        body: "A Avila Ops organiza domínio, site, e-mail, Instagram, Meta Ads, WhatsApp, CRM, pagamentos, dados e suporte em uma operação digital integrada. O objetivo é reduzir improviso e criar uma base escalável para pequenas empresas venderem e atenderem melhor.",
      },
    ],
    related: [
      "automatizar-minha-empresa",
      "automacao-para-pequenas-empresas",
      "automatizar-whatsapp",
      "crm-para-pequenas-empresas",
      "integrar-instagram-whatsapp",
    ],
  },
  {
    slug: "instagram-meta-ads-whatsapp-funil",
    title: "Como integrar Instagram, Meta Ads e WhatsApp em um funil?",
    description:
      "Estrutura para ligar conteúdo, anúncios da Meta, Pixel, landing pages e atendimento no WhatsApp.",
    answer:
      "A integração entre Instagram, Meta Ads e WhatsApp começa com uma oferta clara, conteúdo que gera demanda, campanha com objetivo definido, página ou clique para WhatsApp e registro do lead em uma rotina de atendimento e follow-up.",
    sections: [
      {
        title: "Funil básico",
        body: "O usuário vê conteúdo ou anúncio, entende a oferta, clica para página ou WhatsApp, responde perguntas de qualificação e entra em uma etapa de atendimento, proposta ou compra.",
      },
      {
        title: "O papel do Pixel da Meta",
        body: "O Pixel ajuda a medir visitas, eventos, conversões e públicos para remarketing. Sem medição, a empresa não sabe quais campanhas geram resultado real.",
      },
      {
        title: "Erro comum",
        body: "Rodar anúncio direto para conversa sem roteiro, sem tags, sem responsável e sem follow-up tende a gerar mensagens soltas, não vendas acompanháveis.",
      },
    ],
    related: ["instagram-meta-ads", "meta-ads-para-empresas", "integrar-instagram-whatsapp"],
  },
  {
    slug: "como-automatizar-instagram-da-empresa",
    title: "Como automatizar o Instagram da empresa?",
    description:
      "Guia prático para automatizar Instagram com conteúdo, mensagens, Meta Ads, WhatsApp, CRM e acompanhamento comercial.",
    answer:
      "Para automatizar o Instagram da empresa, organize o perfil e as ofertas, conecte anúncios e conteúdo a uma ação clara, use respostas rápidas ou automações permitidas, leve conversas importantes para WhatsApp ou CRM e acompanhe origem, interesse, etapa e resultado de cada lead.",
    sections: [
      {
        title: "O que automatizar no Instagram",
        body: "O Instagram pode automatizar parte da rotina comercial sem virar atendimento robótico. O foco deve ser reduzir repetição, responder mais rápido, organizar interessados e levar o lead para a próxima etapa com contexto.",
        checklist: [
          "Respostas rápidas para dúvidas frequentes",
          "Roteiros de qualificação para direct e comentários",
          "Links rastreáveis para WhatsApp, site e landing pages",
          "Registro de origem e interesse no CRM",
          "Alertas para a equipe quando uma conversa exigir atendimento humano",
        ],
      },
      {
        title: "Integração com WhatsApp e CRM",
        body: "Muitas pequenas empresas vendem pela conversa. Por isso, o Instagram precisa conversar com WhatsApp e CRM: o conteúdo atrai, o direct inicia a relação, o WhatsApp aprofunda e o CRM guarda histórico, etapa e próximo passo.",
        checklist: [
          "Bio com destino claro e mensurável",
          "Campanhas direcionadas para página ou WhatsApp",
          "Tags ou campos de origem para leads do Instagram",
          "Follow-up para quem pediu preço, orçamento ou catálogo",
        ],
      },
      {
        title: "Cuidados com automação",
        body: "Automação de Instagram deve respeitar as regras da plataforma e evitar spam, disparos agressivos ou promessas enganosas. O objetivo não é falar com todo mundo automaticamente, mas tratar melhor quem demonstrou interesse real.",
      },
      {
        title: "Como medir se funcionou",
        body: "Além de curtidas e alcance, a empresa deve medir cliques, conversas iniciadas, leads qualificados, propostas geradas, vendas e tempo de resposta. Esses dados mostram se conteúdo e campanha estão gerando operação comercial.",
      },
    ],
    related: [
      "instagram-meta-ads",
      "automacao-instagram",
      "integrar-instagram-whatsapp",
      "automatizar-whatsapp",
      "crm-para-pequenas-empresas",
    ],
  },
  {
    slug: "como-usar-meta-ads-para-gerar-leads-no-whatsapp",
    title: "Como usar Meta Ads para gerar leads no WhatsApp?",
    description:
      "Estrutura para campanhas da Meta levarem interessados ao WhatsApp com oferta, qualificação, CRM, follow-up e medição.",
    answer:
      "Para usar Meta Ads gerando leads no WhatsApp, defina uma oferta específica, configure campanha com objetivo coerente, direcione o clique para uma conversa ou página rastreável, use roteiro de qualificação, registre o lead no CRM e acompanhe conversas, propostas e vendas.",
    sections: [
      {
        title: "Comece pela oferta",
        body: "Campanha sem oferta clara costuma gerar mensagens soltas. Antes de subir anúncio, defina o problema, público, promessa permitida, condição comercial e próxima ação esperada: chamar no WhatsApp, pedir orçamento, agendar conversa ou baixar material.",
        checklist: [
          "Oferta específica por público",
          "Criativo alinhado com a página ou conversa",
          "CTA direto para WhatsApp, formulário ou landing page",
          "UTMs e eventos configurados antes da campanha",
        ],
      },
      {
        title: "WhatsApp precisa de processo",
        body: "O clique no anúncio é só o começo. Ao chegar no WhatsApp, o lead precisa receber saudação, perguntas de qualificação, próximo passo e follow-up. Sem isso, a campanha compra atenção, mas a operação perde venda.",
        checklist: [
          "Mensagem inicial com contexto da campanha",
          "Perguntas para entender necessidade, prazo e orçamento",
          "Responsável definido para cada conversa",
          "Registro no CRM com origem Meta Ads",
          "Rotina de retorno para quem não respondeu",
        ],
      },
      {
        title: "Medição e remarketing",
        body: "Meta Ads deve ser analisado por resultado comercial, não só por clique. Pixel, eventos, CRM e tags de WhatsApp ajudam a saber quais públicos e criativos geram leads aproveitáveis, propostas e venda. Esses sinais também alimentam remarketing quando houver consentimento e base adequada.",
      },
      {
        title: "Como a Avila Ops conecta",
        body: "A Avila Ops liga Instagram, Meta Ads, WhatsApp, site, CRM, pagamentos e dados para transformar campanha em processo acompanhável, com menos improviso e mais clareza sobre o que gera oportunidade real.",
      },
    ],
    related: [
      "instagram-meta-ads",
      "meta-ads-para-empresas",
      "integrar-instagram-whatsapp",
      "automatizar-whatsapp",
      "crm-para-pequenas-empresas-com-whatsapp",
    ],
  },
  {
    slug: "site-ou-instagram-para-pequena-empresa",
    title: "Pequena empresa precisa de site ou só Instagram?",
    description:
      "Comparativo entre site, Instagram, WhatsApp e presença digital completa para pequenas empresas.",
    answer:
      "Uma pequena empresa pode vender pelo Instagram, mas não deve depender só dele. O site dá autoridade, indexação no Google, páginas de oferta, domínio próprio, eventos de conversão e uma base mais estável para integrar WhatsApp, anúncios e CRM.",
    sections: [
      {
        title: "Quando o Instagram basta temporariamente",
        body: "Para validar uma ideia, divulgar rotina e manter relacionamento inicial, o Instagram pode ser suficiente por um período curto.",
      },
      {
        title: "Quando o site vira necessário",
        body: "O site passa a ser necessário quando a empresa quer ranquear no Google, explicar serviços com clareza, receber leads qualificados, usar domínio próprio e medir conversões.",
      },
      {
        title: "Modelo recomendado",
        body: "O ideal é site, Instagram e WhatsApp conectados: o Instagram atrai, o site explica e mede, o WhatsApp converte e o CRM organiza.",
      },
    ],
    related: [
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
      "instagram-meta-ads",
    ],
  },
  {
    slug: "crm-para-pequenas-empresas-com-whatsapp",
    title: "Como usar CRM com WhatsApp em pequenas empresas?",
    description:
      "Explicação prática sobre CRM, WhatsApp, follow-up, propostas e automação comercial.",
    answer:
      "CRM com WhatsApp serve para registrar contatos, origem do lead, etapa da venda, histórico, próximos passos e responsáveis. A empresa deixa de depender da memória dos atendentes e passa a acompanhar oportunidades com método.",
    sections: [
      {
        title: "Informações mínimas",
        body: "Nome, contato, origem, interesse, prazo, valor estimado, status, responsável e próxima ação já criam uma operação comercial mais controlada.",
      },
      {
        title: "Automação útil",
        body: "Alertas de retorno, mudança de etapa, registro automático de formulário e criação de tarefas reduzem esquecimento e perda de leads.",
      },
      {
        title: "Resultado esperado",
        body: "O objetivo é enxergar volume de leads, taxa de resposta, propostas abertas, vendas fechadas e gargalos no atendimento.",
      },
    ],
    related: ["crm-para-pequenas-empresas", "automatizar-whatsapp", "automacao-para-pequenas-empresas"],
  },
  {
    slug: "whatsapp-comum-ou-business-api",
    title: "WhatsApp Business comum ou WhatsApp Business API?",
    description:
      "Diferenças práticas entre o aplicativo WhatsApp Business e a WhatsApp Business API, e quando cada um faz sentido.",
    answer:
      "O WhatsApp Business comum é o aplicativo gratuito para um único atendente ou poucos dispositivos vinculados, com catálogo, respostas rápidas e mensagens automáticas simples. A WhatsApp Business API é acessada por integração ou provedor autorizado, permite múltiplos atendentes simultâneos, mensagens de template aprovadas e integração com CRM e automações mais avançadas.",
    sections: [
      {
        title: "Quando o aplicativo comum é suficiente",
        body: "Para negócios com poucos atendentes, volume de conversas administrável e necessidade de automações simples, o WhatsApp Business comum costuma resolver bem, com custo mínimo de implantação.",
      },
      {
        title: "Quando migrar para a API",
        body: "A migração faz sentido quando o volume de conversas exige mais de um atendente ao mesmo tempo, quando é preciso integrar o WhatsApp ao CRM ou a sistemas internos, ou quando mensagens transacionais (confirmações, lembretes, notificações) precisam ser disparadas automaticamente em escala.",
      },
      {
        title: "O que muda na prática",
        body: "Na API não existe um aplicativo de conversa próprio: o atendimento acontece por um sistema integrado (CRM, central de atendimento ou chatbot), o número fica vinculado a um provedor autorizado e mensagens fora da janela de 24 horas de atendimento seguem regras específicas de template.",
      },
    ],
    related: ["whatsapp-business-api", "automatizar-whatsapp", "crm-para-pequenas-empresas-com-whatsapp"],
  },
  {
    slug: "quanto-custa-criar-uma-presenca-digital-profissional",
    title: "Quanto custa criar uma presença digital profissional?",
    description:
      "Fatores que compõem o investimento em site, domínio, e-mail, identidade visual e automações para pequenas empresas.",
    answer:
      "Não existe um valor único para presença digital profissional: o investimento varia conforme escopo, número de páginas ou funcionalidades, integrações necessárias, conteúdo e nível de automação. O caminho mais confiável é entender os componentes que formam o custo e definir escopo a partir de um diagnóstico, em vez de comparar apenas preços soltos.",
    sections: [
      {
        title: "Componentes que compõem o investimento",
        body: "Domínio e hospedagem, desenvolvimento do site ou landing page, identidade visual, redação e produção de conteúdo, integrações (WhatsApp, formulários, analytics, Pixel da Meta) e manutenção recorrente costumam ser os principais componentes de custo.",
      },
      {
        title: "Por que dois orçamentos podem ser tão diferentes",
        body: "Um site institucional simples, uma landing page de campanha e um sistema com portal do cliente e automações têm complexidade e manutenção muito diferentes. Comparar apenas o valor final sem comparar escopo tende a gerar decisões ruins.",
      },
      {
        title: "Como decidir com mais segurança",
        body: "Antes de comparar propostas, vale mapear objetivo do negócio, canais já usados, integrações necessárias e prioridade entre lançar rápido ou lançar completo. Esse escopo é o que efetivamente define o investimento e o prazo.",
      },
    ],
    related: [
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
      "site-institucional-landing-page-ou-loja-virtual",
    ],
  },
  {
    slug: "como-configurar-pixel-da-meta-e-medir-conversoes",
    title: "Como configurar o Pixel da Meta e medir conversões?",
    description:
      "Passos práticos para instalar o Pixel da Meta, criar eventos e medir conversões de campanhas no Instagram e Facebook.",
    answer:
      "Configurar o Pixel da Meta envolve criar o pixel no Gerenciador de Eventos, instalar o código base no site, configurar eventos-padrão (visualização de página, contato, lead, compra) nos pontos certos e validar o disparo antes de rodar campanhas com otimização de conversão.",
    sections: [
      {
        title: "Passos principais",
        body: "Criar o pixel no Gerenciador de Eventos da Meta, instalar o código base em todas as páginas do site, adicionar eventos-padrão nos momentos relevantes (clique no WhatsApp, envio de formulário, página de obrigado) e testar com a ferramenta de diagnóstico de eventos antes de publicar campanhas.",
      },
      {
        title: "Erros comuns de configuração",
        body: "Pixel instalado apenas na home, eventos duplicados, eventos de conversão sem valor associado e falta de validação depois de mudanças no site são causas frequentes de dados incorretos ou campanhas mal otimizadas.",
      },
      {
        title: "Do dado à decisão",
        body: "Medir não basta: o objetivo é usar os eventos do Pixel para saber qual campanha, público e criativo geram mais leads ou vendas, e redistribuir orçamento com base nesse resultado, não apenas em alcance ou cliques.",
      },
    ],
    related: ["instagram-meta-ads", "meta-ads-para-empresas", "pixel-da-meta"],
  },
  {
    slug: "site-institucional-landing-page-ou-loja-virtual",
    title: "Site institucional, landing page ou loja virtual?",
    description:
      "Diferenças entre site institucional, landing page e loja virtual, e como escolher o formato certo para o momento do negócio.",
    answer:
      "Site institucional apresenta a empresa como um todo, landing page foca em uma única oferta e ação, e loja virtual existe para vender produtos diretamente online com carrinho e pagamento. A escolha depende do objetivo comercial principal do momento, não de preferência estética.",
    sections: [
      {
        title: "Site institucional",
        body: "Serve para explicar quem é a empresa, o que ela faz, com quem já trabalhou e como entrar em contato. É a base recomendada para autoridade, indexação no Google e páginas de serviço.",
      },
      {
        title: "Landing page",
        body: "Serve para converter tráfego de uma campanha específica em lead ou contato, com uma única oferta, um único público e uma única chamada para ação, sem os menus e distrações de um site completo.",
      },
      {
        title: "Loja virtual",
        body: "Faz sentido quando o modelo de negócio depende de vender produtos diretamente pelo site, com catálogo, carrinho, pagamento e, geralmente, integração com estoque e logística.",
      },
    ],
    related: [
      "criacao-de-site-profissional",
      "presenca-digital-para-pequenas-empresas",
      "quanto-custa-criar-uma-presenca-digital-profissional",
    ],
  },
  {
    slug: "o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital",
    title: "O que uma pequena empresa precisa para vender melhor no digital?",
    description:
      "Checklist prático de presença digital, atendimento, medição e automação para pequenas empresas venderem mais.",
    answer:
      "Para vender melhor no digital, uma pequena empresa costuma precisar de quatro frentes conectadas: uma base própria (site, domínio, e-mail), canais de relacionamento (Instagram, WhatsApp), um processo comercial organizado (CRM, follow-up) e medição real de resultado (Pixel, analytics).",
    sections: [
      {
        title: "Base própria",
        body: "Site ou landing page, domínio e e-mail profissional dão à empresa um endereço estável, que não depende do algoritmo de uma rede social e pode ser encontrado no Google.",
      },
      {
        title: "Canais de relacionamento",
        body: "Instagram e WhatsApp costumam ser onde o cliente pequeno já está. O ganho vem de conectar esses canais à base própria, em vez de tratá-los como vitrines isoladas.",
      },
      {
        title: "Processo e medição",
        body: "Sem CRM, follow-up e medição de conversão, a empresa não sabe quais canais e campanhas realmente geram venda, e tende a repetir o que já não funciona.",
      },
    ],
    related: [
      "automacao-para-pequenas-empresas",
      "crm-para-pequenas-empresas",
      "presenca-digital-para-pequenas-empresas",
    ],
  },
  {
    slug: "checklist-de-presenca-digital-para-pequenas-empresas",
    title: "Checklist de presença digital para pequenas empresas",
    description:
      "Lista prática para a empresa conferir sozinha o que já tem e o que falta em site, domínio, e-mail, redes sociais, atendimento e medição.",
    answer:
      "Este checklist serve para a empresa avaliar sozinha, em poucos minutos, o que já está resolvido e o que ainda falta na presença digital: base própria (site, domínio, e-mail), canais de relacionamento (Instagram, WhatsApp), processo comercial e medição de resultado.",
    sections: [
      {
        title: "Base própria",
        body: "O primeiro bloco confere se a empresa tem um endereço digital estável, que não depende de rede social para existir.",
        checklist: [
          "A empresa tem um domínio próprio (não depende só de @rede-social ou linktree)",
          "O site ou landing page abre corretamente no celular",
          "Existe e-mail profissional com o domínio da empresa (não apenas Gmail/Hotmail pessoal)",
          "O site explica com clareza o que a empresa faz e para quem",
          "Existe uma forma clara de contato (WhatsApp, formulário ou telefone) visível sem precisar rolar a página inteira",
        ],
      },
      {
        title: "Canais de relacionamento",
        body: "O segundo bloco confere se os canais onde o cliente já está conversam entre si, em vez de funcionarem isolados.",
        checklist: [
          "O Instagram (ou rede principal) tem link para o site ou WhatsApp na bio",
          "Existe um perfil comercial no WhatsApp Business, não um número pessoal sem estrutura",
          "As respostas do WhatsApp seguem um roteiro mínimo (saudação, qualificação, próximos passos)",
          "Quem anuncia (Meta Ads, Google Ads ou impulsionamento) sabe para onde está mandando o clique",
        ],
      },
      {
        title: "Processo comercial",
        body: "O terceiro bloco confere se existe um mínimo de processo entre o primeiro contato e a venda, em vez de depender só da memória da equipe.",
        checklist: [
          "Existe um lugar único onde ficam registrados os contatos e o histórico de conversa (CRM, planilha estruturada ou sistema)",
          "Cada lead tem um responsável e um próximo passo definido",
          "Existe algum lembrete ou rotina de follow-up para quem não respondeu",
          "A empresa sabe, sem precisar adivinhar, quantos leads chegaram no último mês",
        ],
      },
      {
        title: "Medição de resultado",
        body: "O último bloco confere se a empresa consegue enxergar o que está funcionando, em vez de decidir só pela impressão.",
        checklist: [
          "Existe alguma ferramenta de analytics instalada no site (não precisa ser sofisticada, mas precisa existir)",
          "O Pixel da Meta (ou equivalente) está instalado, se a empresa anuncia no Instagram/Facebook",
          "A empresa sabe dizer de onde vieram os últimos leads ou vendas (Instagram, Google, indicação, WhatsApp)",
          "Existe algum registro mensal simples de quantos leads viraram venda",
        ],
      },
    ],
    related: [
      "o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital",
      "presenca-digital-para-pequenas-empresas",
      "como-configurar-pixel-da-meta-e-medir-conversoes",
    ],
  },
  {
    slug: "como-trocar-o-numero-do-whatsapp-business-da-empresa",
    title: "Como trocar o número do WhatsApp Business da empresa sem perder atendimento?",
    description:
      "Passo a passo para migrar o número do WhatsApp Business (comum ou API) sem perder conversas, qualidade da conta ou leads em andamento.",
    answer:
      "Para trocar o número do WhatsApp Business da empresa, primeiro decida entre migrar a conta existente para o número novo (recomendado, preserva histórico e verificação) ou começar um número do zero. No WhatsApp Business API isso é feito pelo WhatsApp Manager, na opção de migração de número, com um período de coexistência entre o número antigo e o novo. Depois, atualize todos os pontos onde o número antigo está publicado: site, Google Perfil da Empresa, anúncios, assinatura de e-mail, CRM e automações.",
    sections: [
      {
        title: "O que muda quando o número troca",
        body: "O número é o identificador da conta no WhatsApp, então trocá-lo sem planejamento reseta parte do que a empresa construiu: histórico de conversa fica no aparelho antigo (no app comum) ou precisa ser tratado via API, o selo de verificação e a reputação/qualidade da conta podem levar tempo para se refazer, e qualquer link, anúncio, QR code ou automação apontando para o número antigo passa a falhar.",
        checklist: [
          "Definir se é migração (mesma conta, número novo) ou conta nova do zero",
          "Levantar todos os lugares onde o número atual está publicado",
          "Avisar a equipe de atendimento sobre a data da troca",
          "Planejar um período de sobreposição entre número antigo e novo, se possível",
        ],
      },
      {
        title: "Migrando no WhatsApp Business API",
        body: "Quem usa WhatsApp Business API (via Meta ou um provedor como Twilio, Zenvia, Gupshup etc.) migra o número dentro do WhatsApp Manager, na conta do Business Manager que administra o número. A Meta oferece um fluxo oficial de migração que preserva o registro do número de telefone associado à conta, sem precisar recriar templates de mensagem aprovados nem reconectar integrações do zero.",
        checklist: [
          "Acessar o WhatsApp Manager na conta do Business Manager responsável",
          "Selecionar o número atual e iniciar a migração para o novo número",
          "Confirmar o novo número por SMS ou chamada",
          "Aguardar a propagação (geralmente minutos, pode levar até algumas horas)",
          "Testar o envio e recebimento de mensagens no número novo antes de divulgar",
          "Avisar o provedor/CRM integrado (ex.: number ID pode mudar em alguns provedores)",
        ],
      },
      {
        title: "Se a empresa usa o app WhatsApp Business comum",
        body: "Sem a API, a troca depende do app: é possível migrar a conta para um novo aparelho/número usando a opção de transferência de conta do próprio WhatsApp Business, que copia o histórico de conversas via backup. Se o objetivo é só trocar o número mantendo o mesmo aparelho, existe a opção “Trocar Número” dentro de Configurações > Conta.",
        checklist: [
          "Fazer backup do WhatsApp antes de qualquer alteração",
          "Usar Configurações > Conta > Trocar número (se for o mesmo aparelho)",
          "Confirmar o número novo por SMS",
          "Reenviar o catálogo e as mensagens automáticas de saudação/ausência, se necessário",
        ],
      },
      {
        title: "O que atualizar fora do WhatsApp",
        body: "A troca de número só é indolor se todos os pontos de contato forem atualizados no mesmo momento. Deixar um canal com o número antigo gera leads perdidos, já que o cliente clica, cai em um número que não existe mais e não tenta de novo.",
        checklist: [
          "Botão de WhatsApp no site e nos links de bio (Instagram, Linkedin etc.)",
          "Google Perfil da Empresa e outros diretórios/listagens",
          "Anúncios ativos no Meta Ads que levam para o WhatsApp",
          "CRM, automações e integrações que disparam mensagem pelo número antigo",
          "Assinatura de e-mail, cartão de visita digital e materiais impressos",
          "Aviso fixado nas conversas antigas informando o número novo, enquanto o antigo ainda responder",
        ],
      },
      {
        title: "Como a Avila Ops ajuda",
        body: "A Avila Ops cuida da migração do número no WhatsApp Business API (ou orienta a troca no app comum), atualiza os links e integrações que dependem do número — site, Meta Ads, CRM, automações — e confere se nada ficou apontando para o número antigo antes de a troca ser divulgada aos clientes.",
      },
    ],
    related: [
      "whatsapp-business-api",
      "automatizar-whatsapp",
      "crm-para-pequenas-empresas",
    ],
  },
  {
    slug: "como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
    title: "Como fazer minha empresa aparecer no ChatGPT e nas outras IAs?",
    description:
      "O que uma pequena empresa precisa ter no site, nos dados e no conteúdo para ser citada por ChatGPT, Gemini, Perplexity e pelas respostas de IA do Google.",
    reviewedAt: "2026-08-13",
    answer:
      "Para aparecer nas respostas do ChatGPT, Gemini, Perplexity e nas respostas de IA do Google, a empresa precisa existir de forma verificável fora das redes sociais: site próprio rastreável, páginas que respondem perguntas em linguagem direta, dados estruturados (Schema.org), informações de contato e serviço consistentes em todos os lugares e menções em fontes externas confiáveis. Modelos de linguagem citam o que conseguem ler, entender e confirmar em mais de uma fonte — não o que tem mais seguidores.",
    sections: [
      {
        title: "Por que isso virou um problema comercial agora",
        body: "Uma parte crescente das buscas de compra não termina mais em uma lista de links: termina em uma resposta pronta, com poucas fontes citadas. Quem não é citado nessa resposta some da consideração do cliente, mesmo estando bem posicionado no Google tradicional. Para pequenas empresas, isso muda a pergunta: não é mais só “estou na primeira página?”, e sim “a IA sabe que eu existo, o que eu faço e onde eu atendo?”.",
        checklist: [
          "Testar hoje: perguntar ao ChatGPT, Gemini e Perplexity por empresas do seu segmento e cidade",
          "Anotar quem é citado e de quais páginas a resposta tira a informação",
          "Verificar se a sua empresa aparece, aparece errada ou não aparece",
          "Conferir se a descrição que a IA dá do seu negócio bate com a realidade",
        ],
      },
      {
        title: "O que os modelos conseguem ler da sua empresa",
        body: "Assistentes de IA leem HTML público, dados estruturados e fontes externas. Eles não leem prints, carrosséis de Instagram, PDFs em drive fechado nem texto dentro de imagem. Se a maior parte da informação comercial da empresa está apenas em rede social ou em conversa de WhatsApp, ela é praticamente invisível para esse tipo de busca.",
        checklist: [
          "Site com domínio próprio, HTTPS e páginas acessíveis sem login",
          "robots.txt permitindo rastreamento (inclusive dos crawlers de IA)",
          "Texto de verdade no HTML, não apenas imagens e vídeos",
          "sitemap.xml publicado e atualizado",
          "Arquivo llms.txt descrevendo a empresa em linguagem objetiva",
        ],
      },
      {
        title: "Escreva para perguntas, não para palavras-chave",
        body: "O conteúdo que é citado por IA costuma ter o mesmo formato: pergunta explícita no título, resposta direta no primeiro parágrafo e desenvolvimento logo abaixo. Enrolar antes de responder funcionava para tempo de permanência; hoje atrapalha, porque o modelo precisa encontrar o trecho que responde de forma autossuficiente.",
        checklist: [
          "Um H1 em forma de pergunta real do cliente",
          "Resposta completa nas primeiras três a cinco linhas",
          "Blocos curtos, listas e subtítulos que se sustentam fora do contexto",
          "Números, prazos, faixas de preço e critérios objetivos quando existirem",
          "Data de revisão visível na página",
        ],
      },
      {
        title: "Dados estruturados e consistência",
        body: "Schema.org é o que transforma texto em fato interpretável: quem é a empresa, que serviço presta, onde atende, qual o contato, qual pergunta a página responde. Junto disso vale a consistência: nome, telefone, endereço, área de atendimento e descrição precisam ser iguais no site, no Google Perfil da Empresa, nas redes e nos diretórios. Divergência gera desconfiança e o modelo prefere citar quem é coerente.",
        checklist: [
          "Schema Organization ou LocalBusiness na home",
          "Schema Service nas páginas de serviço",
          "Schema FAQPage e Article nos conteúdos",
          "Mesmo nome, telefone e área de atendimento em todos os canais",
          "Google Perfil da Empresa preenchido e coerente com o site",
        ],
      },
      {
        title: "Autoridade externa: você não se cita sozinho",
        body: "Modelos confirmam informação cruzando fontes. Uma empresa citada apenas no próprio site tende a ser tratada como afirmação não verificada. Menções em portais do setor, associações, imprensa local, marketplaces, diretórios sérios, LinkedIn da empresa e avaliações reais funcionam como confirmação. Não é sobre volume de links: é sobre coerência entre fontes independentes.",
        checklist: [
          "Perfil de empresa no LinkedIn atualizado e com o site oficial",
          "Cadastro em diretórios e associações relevantes do setor",
          "Avaliações reais de clientes, com autorização",
          "Conteúdo próprio que outros tenham motivo para citar",
          "Evitar redes de links artificiais e conteúdo duplicado",
        ],
      },
      {
        title: "Como medir se está funcionando",
        body: "Não existe Search Console para IA generativa, então a medição é indireta: monitorar perguntas de teste com frequência fixa, acompanhar tráfego de referência vindo de assistentes, observar se leads chegam dizendo que “o ChatGPT indicou” e comparar impressões do Search Console com cliques ao longo do tempo. O sinal mais confiável ainda é qualitativo: você está sendo citado corretamente ou não.",
        checklist: [
          "Rodar as mesmas perguntas de teste uma vez por mês e registrar o resultado",
          "Separar no analytics o tráfego vindo de chatgpt.com, perplexity.ai e similares",
          "Perguntar no atendimento como o cliente chegou até a empresa",
          "Corrigir rapidamente informação errada que a IA estiver repetindo",
        ],
      },
      {
        title: "Como a Avila Ops trabalha isso",
        body: "A Avila Ops estrutura o site para ser lido por buscadores e por modelos de linguagem: páginas em formato de pergunta e resposta, dados estruturados, llms.txt, sitemap, consistência entre site, Google Perfil da Empresa e redes, além de acompanhamento das citações. O objetivo não é enganar o algoritmo: é fazer com que a informação correta sobre a empresa esteja disponível de forma que a máquina consiga confirmar.",
      },
    ],
    related: [
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
      "sistema-para-pequenas-empresas",
    ],
  },
  {
    slug: "meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google",
    title: "Meu site perdeu tráfego com as respostas de IA do Google. O que fazer?",
    description:
      "Por que as respostas geradas por IA no Google reduzem cliques, como saber se foi isso que aconteceu com o seu site e o que ajustar na estratégia.",
    reviewedAt: "2026-08-13",
    answer:
      "Se o site mantém posição e impressões no Search Console mas perdeu cliques, provavelmente parte das buscas passou a ser respondida direto na página de resultados por IA. A correção não é produzir mais conteúdo informativo genérico: é reposicionar o site para as buscas que a IA não consegue resolver sozinha — decisão, comparação, preço, contratação e atendimento local — e passar a medir leads em vez de sessões.",
    sections: [
      {
        title: "Primeiro, confirme o diagnóstico",
        body: "Nem toda queda de tráfego vem de resposta gerada por IA. Antes de mudar a estratégia, separe as hipóteses: perda de posição, queda de demanda sazonal, problema técnico de indexação, mudança de URL ou aumento de buscas sem clique. O padrão típico da resposta por IA é específico: impressões estáveis ou em alta, posição média igual ou melhor, e cliques caindo.",
        checklist: [
          "Comparar impressões, cliques, CTR e posição média no Search Console em janelas iguais",
          "Isolar as consultas informativas (o que é, como funciona, para que serve)",
          "Comparar com as consultas comerciais (preço, contratar, perto de mim, melhor)",
          "Checar se houve mudança técnica, migração ou bloqueio no período",
        ],
      },
      {
        title: "Onde a IA tira o clique e onde ela não tira",
        body: "Respostas geradas resolvem bem perguntas fechadas e de definição. Elas resolvem mal decisões com risco, contexto local, orçamento real, prazo, garantia e responsabilidade. Por isso o tráfego que cai é justamente o de topo — que já convertia pouco — enquanto o tráfego de intenção comercial tende a se manter e chegar mais qualificado, porque a pessoa já passou pela etapa de entendimento.",
        checklist: [
          "Listar as páginas do site que só respondem “o que é”",
          "Listar as páginas que ajudam a decidir e contratar",
          "Verificar quais delas geram contato de fato",
          "Aceitar que parte do tráfego informativo não volta",
        ],
      },
      {
        title: "O que ajustar no conteúdo",
        body: "O conteúdo continua valendo, mas com outro objetivo: em vez de disputar o clique da definição, ele passa a disputar a citação e a decisão. Isso significa dar o que a IA não tem — número real, caso concreto, comparação honesta, critério de escolha, condição de atendimento e prazo. Conteúdo que só repete o consenso da internet é exatamente o que a resposta gerada substitui.",
        checklist: [
          "Transformar páginas de definição em páginas de decisão",
          "Incluir faixas de investimento, prazos e escopo real do serviço",
          "Criar comparativos honestos entre alternativas, incluindo quando não contratar",
          "Publicar experiência própria: casos, erros comuns, checklists de execução",
          "Manter Schema.org e data de revisão para aumentar a chance de citação",
        ],
      },
      {
        title: "Reduza a dependência de um único canal",
        body: "Uma operação que dependia quase toda de busca orgânica ficou mais frágil. A saída não é abandonar SEO, e sim distribuir: base própria de contatos, WhatsApp com processo, Instagram e Meta Ads para demanda que não busca ativamente, e Google Perfil da Empresa para intenção local, que continua sendo um dos poucos formatos com clique preservado.",
        checklist: [
          "Google Perfil da Empresa completo, com serviços, fotos e avaliações",
          "Lista própria de contatos (e-mail e WhatsApp) com autorização",
          "Campanhas de Meta Ads levando ao WhatsApp com qualificação",
          "Remarketing para quem já visitou páginas comerciais",
          "Conteúdo próprio publicado onde o público já está",
        ],
      },
      {
        title: "Mude a métrica antes de mudar a tática",
        body: "Enquanto o painel principal da empresa for “sessões”, qualquer ajuste vai parecer fracasso. A métrica que sustenta decisão agora é: leads qualificados por origem, custo por lead, taxa de resposta no WhatsApp e vendas fechadas. É comum ver queda de 30% em sessões com receita estável ou maior — e isso só fica visível se a medição for de negócio, não de audiência.",
        checklist: [
          "Definir evento de conversão para clique no WhatsApp e envio de formulário",
          "Registrar origem do lead no CRM",
          "Acompanhar leads por página de entrada, não só pageviews",
          "Revisar mensalmente páginas com muita impressão e pouco contato",
        ],
      },
      {
        title: "Como a Avila Ops ajuda",
        body: "A Avila Ops faz o diagnóstico separando queda técnica de queda por resposta gerada, reorganiza as páginas para intenção comercial, implementa dados estruturados e medição de lead ponta a ponta, e conecta site, WhatsApp, Meta Ads e CRM para que o resultado deixe de depender de um único canal de aquisição.",
      },
    ],
    related: [
      "presenca-digital-para-pequenas-empresas",
      "criacao-de-site-profissional",
      "meta-ads-para-empresas",
    ],
  },
  {
    slug: "agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
    title: "Vale a pena colocar um agente de IA no WhatsApp da empresa?",
    description:
      "Quando um agente de IA no WhatsApp resolve, quando atrapalha, o que ele precisa saber para funcionar e como implantar sem perder cliente no caminho.",
    reviewedAt: "2026-08-13",
    answer:
      "Vale a pena quando a empresa perde atendimento por demora ou volume repetitivo, e não vale quando o problema real é falta de processo comercial. Um agente de IA no WhatsApp funciona bem para responder dúvidas frequentes, qualificar quem chega, agendar, consultar status e passar o caso pronto para um humano. Ele funciona mal quando precisa negociar, decidir exceção ou lidar com cliente irritado — e todo agente precisa de uma saída para atendente humano em qualquer ponto da conversa.",
    sections: [
      {
        title: "O problema que o agente resolve de verdade",
        body: "A maior perda de venda no WhatsApp de pequena empresa não é resposta ruim: é resposta lenta e conversa esquecida. Mensagem que chega fora do horário, cliente que pergunta preço e some, orçamento pedido e nunca enviado, follow-up que ninguém fez. Um agente cobre exatamente essa faixa — primeira resposta imediata, coleta do essencial e encaminhamento — sem tentar substituir o vendedor.",
        checklist: [
          "Medir quantas mensagens chegam fora do horário comercial",
          "Medir o tempo médio até a primeira resposta",
          "Contar quantas conversas ficam sem próximo passo definido",
          "Listar as dez perguntas que mais se repetem",
        ],
      },
      {
        title: "O que um agente precisa saber para não falar besteira",
        body: "Agente de IA sem base de conhecimento vira gerador de promessa falsa. Antes de ligar qualquer automação, a empresa precisa escrever o que é verdade: serviços, o que está incluído, o que não está, faixas de preço, prazos, áreas atendidas, formas de pagamento, política de cancelamento e o que ele nunca deve afirmar. Essa base é o ativo — a ferramenta é substituível.",
        checklist: [
          "Documento de serviços com escopo, prazo e faixa de preço",
          "Lista explícita do que o agente não pode prometer",
          "Regras de desconto e negociação (ou proibição de tratá-las)",
          "Horários, áreas de atendimento e prazos reais de retorno",
          "Tom de voz e nível de formalidade da empresa",
        ],
      },
      {
        title: "Onde ele deve parar e chamar um humano",
        body: "O ponto que mais destrói confiança é o agente insistir quando já não dá conta. Defina gatilhos claros de transferência: pedido de desconto, reclamação, urgência, assunto fora do escopo, cliente pedindo pessoa, repetição da mesma pergunta ou frustração detectada. Transferir cedo custa menos do que perder o cliente.",
        checklist: [
          "Comando explícito para falar com atendente, sempre disponível",
          "Transferência automática após duas tentativas sem resolver",
          "Transferência imediata em reclamação, cobrança ou cancelamento",
          "Aviso claro de que o cliente está falando com um assistente virtual",
          "Passagem do histórico resumido para o atendente humano",
        ],
      },
      {
        title: "App comum, API ou plataforma de IA",
        body: "No app do WhatsApp Business dá para fazer mensagem de saudação, ausência e respostas rápidas — útil, mas não é agente. Um agente com contexto, memória de conversa, consulta a sistema e múltiplos atendentes exige WhatsApp Business API, com um provedor oficial. Existem também recursos nativos de IA oferecidos pela própria Meta para pequenos negócios, que resolvem o básico sem integração, mas com menos controle sobre regra, dado e histórico.",
        checklist: [
          "Um atendente, volume baixo, regras simples: app comum já resolve",
          "Vários atendentes, CRM, histórico e integração: WhatsApp Business API",
          "Necessidade de consultar pedido, agenda ou estoque: exige integração",
          "Considerar custo por conversa e mensalidade do provedor na conta",
        ],
      },
      {
        title: "Como implantar sem quebrar o atendimento",
        body: "Implantação em bloco costuma dar errado. O caminho seguro é começar pelo horário em que ninguém responde, com escopo pequeno e revisão diária das conversas na primeira semana. Só depois de o agente acertar o básico é que se amplia para horário comercial e para etapas mais próximas da venda.",
        checklist: [
          "Semana 1: só fora do horário, respondendo dúvidas frequentes",
          "Semana 2: qualificação de novos contatos e registro no CRM",
          "Semana 3: agendamento e follow-up de propostas paradas",
          "Ler todas as conversas do agente nos primeiros dias e corrigir a base",
          "Definir uma métrica de sucesso antes de ligar: tempo de resposta, leads registrados ou vendas",
        ],
      },
      {
        title: "Riscos que precisam ser tratados",
        body: "Agente de IA lida com dado pessoal e fala em nome da empresa, então entra no escopo da LGPD e da reputação da marca. É preciso informar que o atendimento é automatizado, registrar a base legal do tratamento, limitar o que é armazenado, restringir quem acessa o histórico e garantir revisão humana em decisões que afetem o cliente.",
        checklist: [
          "Aviso de atendimento automatizado no início da conversa",
          "Política de privacidade acessível e atualizada",
          "Coletar apenas o dado necessário para atender",
          "Não usar conversas de cliente para treinar modelo sem base legal",
          "Revisão humana em recusa, cobrança ou decisão relevante",
        ],
      },
      {
        title: "Como a Avila Ops implanta",
        body: "A Avila Ops monta a base de conhecimento junto com a empresa, configura o agente no WhatsApp Business API com regras de transferência para humano, integra ao CRM para que toda conversa vire registro comercial com responsável e próximo passo, e acompanha as primeiras semanas ajustando o que o agente errou. O agente entra como parte da operação, não como substituto do time.",
      },
    ],
    related: [
      "automatizar-whatsapp",
      "whatsapp-business-api",
      "automacao-de-atendimento",
    ],
  },
  {
    slug: "como-usar-pix-automatico-para-cobranca-recorrente",
    title: "Como usar o Pix Automático para cobrança recorrente na empresa?",
    description:
      "O que é o Pix Automático, para quais negócios ele faz sentido, o que muda em relação a boleto e cartão e o que precisa estar pronto na operação antes de ativar.",
    reviewedAt: "2026-08-13",
    answer:
      "O Pix Automático permite que a empresa faça cobranças recorrentes debitadas na conta do cliente após uma única autorização, sem boleto, cartão ou nova ação a cada vencimento. Ele faz sentido para mensalidade, assinatura, plano e contrato continuado com valor previsível. Para usar, a empresa precisa de um provedor (banco ou fintech) habilitado, um fluxo claro de autorização do cliente e uma rotina definida para falhas de débito e cancelamentos.",
    sections: [
      {
        title: "O que muda em relação ao que a empresa já usa",
        body: "Boleto tem custo por emissão, atraso e conciliação manual. Cartão recorrente tem taxa por transação, falha por limite e cartão vencido, além de disputa de chargeback. Pix Automático fica no meio: custo de transação baixo, liquidação rápida e autorização única — em troca de depender de saldo em conta no dia do débito e de um fluxo de autorização que o cliente precisa aceitar no banco dele.",
        checklist: [
          "Levantar quanto a empresa gasta hoje com emissão e cobrança",
          "Medir a inadimplência atual por atraso e esquecimento",
          "Contar quantas horas por mês vão para conciliação e cobrança manual",
          "Comparar taxas do provedor atual com as do Pix recorrente",
        ],
      },
      {
        title: "Para quem faz sentido",
        body: "Funciona melhor em cobrança previsível e repetida: mensalidade de escola, academia, clínica, curso, condomínio, software, manutenção, plano de suporte, assinatura e contrato B2B com fatura mensal. Faz menos sentido em venda avulsa, valor muito variável ou ticket único, onde o Pix comum com QR Code já resolve.",
        checklist: [
          "A cobrança se repete em intervalo fixo",
          "O valor é igual ou tem variação previsível",
          "O cliente é recorrente e tem relação contínua com a empresa",
          "Existe contrato ou termo que sustente a cobrança periódica",
        ],
      },
      {
        title: "O que precisa estar pronto antes de ativar",
        body: "A parte técnica é a menor. O que costuma travar é operacional: quem autoriza, o que acontece quando o débito falha, como o cliente cancela, quem confere o recebimento e como isso entra no sistema da empresa. Ativar cobrança automática sem esse desenho gera cliente irritado e conciliação bagunçada.",
        checklist: [
          "Escolher o provedor (banco ou fintech) e confirmar que oferece a modalidade",
          "Definir o fluxo de convite e autorização do cliente",
          "Definir a regra de retentativa quando não houver saldo",
          "Definir o canal e o prazo de aviso antes de cada débito",
          "Definir como o cliente cancela sem precisar ligar",
          "Definir onde o pagamento é registrado (sistema, CRM ou planilha estruturada)",
        ],
      },
      {
        title: "Comunicação com o cliente é parte da cobrança",
        body: "Débito automático que aparece sem aviso vira reclamação e cancelamento. O padrão que funciona é simples: aviso antes do débito, confirmação depois, recibo acessível e caminho óbvio para dúvida. Em pequena empresa, o WhatsApp costuma ser o canal certo para isso — desde que seja mensagem transacional, não disparo de marketing.",
        checklist: [
          "Aviso de cobrança alguns dias antes do débito",
          "Confirmação automática após o pagamento",
          "Mensagem específica e sem cobrança agressiva quando o débito falhar",
          "Recibo ou nota disponível sem precisar pedir",
          "Registro de tudo no histórico do cliente",
        ],
      },
      {
        title: "Cuidados jurídicos e de dados",
        body: "Cobrança recorrente exige consentimento demonstrável, informação clara sobre valor, periodicidade e forma de cancelamento, e respeito ao Código de Defesa do Consumidor. Guardar a autorização, o histórico de avisos e o registro de cancelamento é o que protege a empresa em caso de contestação. Trate os dados de pagamento com a mesma seriedade dos dados pessoais.",
        checklist: [
          "Termo de adesão com valor, periodicidade e regra de reajuste",
          "Registro de quando e como o cliente autorizou",
          "Cancelamento simples, sem barreira artificial",
          "Política de privacidade cobrindo o tratamento dos dados de cobrança",
          "Confirmar com o contador o tratamento fiscal e a emissão de nota",
        ],
      },
      {
        title: "Como a Avila Ops ajuda",
        body: "A Avila Ops conecta a cobrança ao resto da operação: página de adesão, autorização registrada, avisos automáticos no WhatsApp, atualização de status no CRM, alerta interno quando um débito falha e visão simples de receita recorrente. O ganho não está só na taxa menor — está em parar de perder mensalidade por esquecimento e em saber, sem planilha, quem está em dia.",
      },
    ],
    related: [
      "automacao-para-pequenas-empresas",
      "sistema-para-pequenas-empresas",
      "crm-para-pequenas-empresas",
    ],
  },
  {
    slug: "reforma-tributaria-o-que-muda-na-operacao-digital-da-empresa",
    title: "Reforma tributária: o que muda na operação digital da pequena empresa?",
    description:
      "O que a pequena empresa precisa ajustar em sistema, emissão de nota, cadastro de clientes e cobrança por causa de CBS, IBS e split payment — sem entrar no mérito contábil.",
    reviewedAt: "2026-08-13",
    answer:
      "A reforma tributária muda menos o marketing e mais a operação: emissão de nota, cadastro de cliente e fornecedor, descrição de produtos e serviços, sistema de vendas e conciliação de recebimento. Com CBS e IBS em implantação e o split payment previsto para os anos seguintes, o imposto passa a ser separado no momento do pagamento — o que exige dado limpo e sistema atualizado. As decisões de regime e enquadramento são do contador; o que cabe à empresa é chegar com a operação pronta.",
    sections: [
      {
        title: "O que a empresa precisa entender em uma frase",
        body: "A lógica está mudando de “apurar depois” para “separar na hora”. Com o split payment, parte do valor pago pelo cliente vai direto para o tributo no momento da liquidação financeira, em vez de ficar na conta da empresa para ser recolhido depois. Isso não muda só o cálculo: muda o fluxo de caixa e a exigência de que cada venda esteja corretamente identificada no sistema.",
        checklist: [
          "Entender que dado errado na nota vira imposto errado retido",
          "Assumir que o fluxo de caixa vai mudar quando o split entrar",
          "Tratar sistema e cadastro como assunto fiscal, não só administrativo",
          "Definir com o contador o calendário de adaptação da sua empresa",
        ],
      },
      {
        title: "Sistema e emissão de nota",
        body: "O primeiro impacto real chega pelo sistema. Emissores, ERPs, plataformas de venda e integrações precisam suportar os novos campos e as novas regras de nota. Empresa que emite nota em sistema desatualizado, ou que emite manualmente, é a que mais sofre — porque descobre o problema no momento da falha, com venda parada.",
        checklist: [
          "Confirmar com o fornecedor do sistema o cronograma de atualização",
          "Testar emissão em ambiente de homologação antes do prazo",
          "Verificar se a plataforma de vendas e o meio de pagamento acompanham",
          "Ter um plano B de emissão para o caso de indisponibilidade",
          "Guardar as notas e comprovantes em local organizado e acessível",
        ],
      },
      {
        title: "Cadastro limpo virou requisito",
        body: "Classificação de produto e serviço, CNPJ e CPF corretos, endereço completo, natureza da operação e descrição padronizada deixam de ser detalhe burocrático. Em um modelo com crédito e retenção automática, cadastro errado gera imposto pago a mais, crédito perdido e retrabalho — e o erro se espalha, porque o cliente do outro lado também precisa do dado certo.",
        checklist: [
          "Revisar o cadastro de produtos e serviços com o contador",
          "Padronizar descrições e classificações usadas nas notas",
          "Corrigir cadastros de clientes e fornecedores incompletos",
          "Eliminar cadastros duplicados",
          "Definir quem na empresa é responsável por manter isso em dia",
        ],
      },
      {
        title: "Preço, contrato e proposta",
        body: "Contratos longos, propostas com validade extensa e tabelas de preço fixas precisam prever o que acontece se a carga tributária mudar durante a vigência. Isso é decisão comercial, não contábil: definir cláusula de revisão, deixar claro se o preço é com ou sem tributo e alinhar com o cliente antes, não depois.",
        checklist: [
          "Cláusula de revisão tributária em contratos continuados",
          "Deixar explícito na proposta o que está incluído no valor",
          "Reduzir a validade de propostas antigas em aberto",
          "Revisar margem com o contador antes de repassar qualquer diferença",
        ],
      },
      {
        title: "Onde termina a sua responsabilidade e começa a do contador",
        body: "Escolha de regime, opção de apuração, aproveitamento de crédito e planejamento tributário são trabalho do contador, com prazos formais que não devem ser decididos por conta própria nem com base em conteúdo de internet. O que a empresa faz é diferente e igualmente decisivo: entregar dado correto, sistema atualizado e processo organizado para que a escolha do contador funcione na prática.",
        checklist: [
          "Marcar uma conversa específica com o contador sobre os prazos que afetam a empresa",
          "Levar para essa conversa faturamento, perfil de clientes e fornecedores",
          "Não tomar decisão de enquadramento com base em post ou vídeo",
          "Registrar por escrito o que ficou decidido e quem executa cada parte",
        ],
      },
      {
        title: "Como a Avila Ops ajuda",
        body: "A Avila Ops não faz contabilidade. O que a Avila Ops organiza é a camada operacional que a mudança exige: cadastro de clientes e produtos consistente, integração entre venda, emissão e cobrança, registro de contratos e propostas, automação de avisos e relatórios que mostram receita, recebimento e pendências sem depender de planilha paralela. Quanto mais limpa a operação, menos dolorosa a transição.",
      },
    ],
    related: [
      "sistema-para-pequenas-empresas",
      "automacao-para-pequenas-empresas",
      "portal-do-cliente",
    ],
  },
  {
    slug: "como-aumentar-o-alcance-no-instagram-com-o-algoritmo-atual",
    title: "Como aumentar o alcance no Instagram com o algoritmo atual?",
    description:
      "O que o Instagram passou a priorizar, por que contas pequenas conseguem alcance maior que antes e o que uma empresa deve mudar na rotina de conteúdo.",
    reviewedAt: "2026-08-13",
    answer:
      "O Instagram distribui conteúdo principalmente por recomendação, e não por número de seguidores. O que mais pesa hoje é retenção (quanto do vídeo a pessoa assiste), compartilhamento em conversas privadas, salvamentos e comentários com troca real. Na prática, uma conta pequena com conteúdo específico e boa retenção alcança mais que uma conta grande com conteúdo genérico — e, para empresa, o objetivo não é alcance solto: é alcance que vira conversa no WhatsApp.",
    sections: [
      {
        title: "O que o algoritmo passou a valorizar",
        body: "A distribuição virou majoritariamente por interesse: o Instagram entrega para quem tem histórico de consumir aquele tema, mesmo sem seguir a conta. Isso derrubou o peso do tamanho do perfil e subiu o peso do sinal de qualidade — principalmente tempo assistido, envio direto para outra pessoa e salvamento. Curtida virou o sinal mais fraco da lista.",
        checklist: [
          "Retenção: a pessoa assiste até o fim ou reassiste",
          "Envios em mensagem direta: o conteúdo é útil o bastante para ser encaminhado",
          "Salvamentos: alguém quer voltar naquilo depois",
          "Comentários com texto real, não emoji solto",
          "Tempo total gasto no perfil depois do primeiro contato",
        ],
      },
      {
        title: "Por que conteúdo genérico parou de funcionar",
        body: "Quando a entrega é por interesse, conteúdo amplo demais não encontra público específico e morre no teste inicial. Publicação de “bom dia”, frase motivacional e post institucional sem contexto competem com o feed inteiro e perdem. Conteúdo estreito — um problema específico, de um público específico, com uma resposta concreta — encontra o nicho e é entregue de novo.",
        checklist: [
          "Escolher três a cinco temas que a empresa domina e repetir com profundidade",
          "Falar de um problema por publicação, não de cinco",
          "Usar a linguagem que o cliente usa no WhatsApp, não jargão do setor",
          "Cortar publicação institucional que não responde nada",
        ],
      },
      {
        title: "Formato: o que produzir na prática",
        body: "Vídeo curto continua sendo o formato de descoberta, mas o que decide é o começo. Os primeiros segundos precisam dizer para quem é aquilo e o que a pessoa ganha assistindo. Carrossel funciona bem para o que precisa ser salvo (passo a passo, checklist, comparação). Stories quase não trazem gente nova, mas são o que converte quem já acompanha.",
        checklist: [
          "Abrir o vídeo com o problema, não com apresentação da empresa",
          "Manter o vídeo curto o bastante para ser assistido inteiro",
          "Legenda que se sustenta sozinha, para quem assiste sem som",
          "Carrossel com primeira imagem clara e última com próximo passo",
          "Stories para bastidor, prova e chamada direta para o WhatsApp",
        ],
      },
      {
        title: "Colaborações e distribuição",
        body: "Publicação em colaboração aparece para o público das duas contas, o que continua sendo a forma mais barata de alcançar gente nova sem anúncio. Para pequena empresa, o parceiro certo raramente é um influenciador grande: é outro negócio que atende o mesmo cliente sem competir — arquiteto e marcenaria, clínica e nutricionista, loja e prestador de serviço.",
        checklist: [
          "Listar cinco negócios que atendem o mesmo cliente sem competir",
          "Propor conteúdo em colaboração, não permuta de divulgação",
          "Fazer o conteúdo juntos, para os dois públicos fazerem sentido",
          "Repetir com quem funcionou, em vez de trocar de parceiro toda vez",
        ],
      },
      {
        title: "Alcance sem processo não vira venda",
        body: "O erro mais caro é otimizar tudo para alcance e não ter para onde mandar a pessoa. Quem chega por recomendação não conhece a empresa: precisa de bio clara, link direto, resposta rápida e um primeiro contato que não pareça formulário. Alcance alto com atendimento lento é dinheiro parado.",
        checklist: [
          "Bio dizendo o que a empresa faz, para quem e onde atende",
          "Link direto para WhatsApp com mensagem pronta",
          "Resposta rápida também fora do horário comercial",
          "Registro do lead no CRM com origem Instagram",
          "Destaques respondendo dúvidas de preço, prazo e como funciona",
        ],
      },
      {
        title: "Como a Avila Ops trabalha isso",
        body: "A Avila Ops trata Instagram como canal de entrada, não como fim: conteúdo ligado ao que a empresa vende, integração com WhatsApp e CRM, Meta Ads amplificando o que já funcionou organicamente e medição de quantos contatos e vendas vieram do canal. O objetivo é parar de postar no escuro e conseguir dizer o que o Instagram trouxe no mês.",
      },
    ],
    related: [
      "instagram-meta-ads",
      "automacao-instagram",
      "integrar-instagram-whatsapp",
    ],
  },
  {
    slug: "como-usar-ia-no-atendimento-sem-violar-a-lgpd",
    title: "Como usar IA no atendimento sem violar a LGPD?",
    description:
      "O que a empresa precisa fazer para usar inteligência artificial no atendimento e nas vendas sem problema com a LGPD: aviso, base legal, dados mínimos e revisão humana.",
    reviewedAt: "2026-08-13",
    answer:
      "Usar IA no atendimento é permitido, mas o tratamento de dados pessoais continua sob a LGPD. Na prática, a empresa precisa de quatro coisas: avisar que o atendimento é automatizado, ter base legal e finalidade definidas para os dados coletados, coletar o mínimo necessário e garantir revisão humana quando a decisão afetar o cliente. Também é preciso saber o que o fornecedor da ferramenta faz com as conversas — inclusive se as usa para treinar modelos.",
    sections: [
      {
        title: "O que muda quando entra IA",
        body: "A LGPD não trata IA como categoria à parte: o que ela regula é o tratamento de dado pessoal, e o assistente virtual trata dado o tempo todo — nome, telefone, endereço, histórico de compra, às vezes dado sensível como saúde. A diferença é que o volume cresce, o registro é automático e o dado passa por terceiros (provedor da IA, plataforma de WhatsApp, CRM). Isso amplia a superfície de responsabilidade, não cria uma exceção.",
        checklist: [
          "Mapear que dados o atendimento coleta hoje",
          "Identificar se há dado sensível envolvido (saúde, biometria, financeiro)",
          "Listar por quais fornecedores esses dados passam",
          "Definir por quanto tempo cada tipo de dado fica armazenado",
        ],
      },
      {
        title: "Transparência: o cliente precisa saber",
        body: "Esconder que o atendimento é automatizado não traz vantagem e cria risco. A boa prática é simples: informar no início da conversa que o cliente fala com um assistente virtual, deixar claro que ele pode pedir uma pessoa a qualquer momento, e ter política de privacidade acessível explicando o que é coletado e para quê — em linguagem que o cliente entenda.",
        checklist: [
          "Aviso de atendimento automatizado na primeira mensagem",
          "Opção explícita de falar com atendente humano",
          "Política de privacidade linkada e atualizada",
          "Canal para o titular pedir acesso, correção ou exclusão dos dados",
          "Responsável nomeado para responder essas solicitações",
        ],
      },
      {
        title: "Base legal e finalidade",
        body: "Cada dado coletado precisa de uma finalidade e de uma base legal. Atender uma solicitação do próprio cliente geralmente se sustenta por execução de contrato ou procedimento preliminar. Usar aquele contato depois para marketing é outra finalidade — e normalmente exige consentimento específico. Misturar as duas coisas é o erro mais comum e o mais fácil de evitar.",
        checklist: [
          "Separar dado coletado para atender de dado usado para marketing",
          "Pedir consentimento específico para envio de campanha",
          "Registrar quando e como o consentimento foi dado",
          "Oferecer descadastramento simples em toda comunicação",
          "Não reaproveitar base antiga sem verificar a origem",
        ],
      },
      {
        title: "Minimização e retenção",
        body: "Assistente virtual tende a coletar mais do que precisa, porque perguntar é barato. Cada campo a mais é risco a mais em caso de vazamento. Colete o necessário para resolver o atendimento, evite pedir documento sem motivo, e defina prazo de descarte — conversa de atendimento não precisa ficar guardada para sempre.",
        checklist: [
          "Revisar quais perguntas o agente faz e cortar as desnecessárias",
          "Não pedir CPF, documento ou dado de saúde sem finalidade clara",
          "Definir prazo de retenção por tipo de dado",
          "Restringir quem da equipe acessa o histórico completo",
          "Usar acesso individual, não conta compartilhada",
        ],
      },
      {
        title: "Decisão automatizada exige revisão humana",
        body: "A LGPD garante ao titular o direito de pedir revisão de decisão tomada apenas por tratamento automatizado quando ela afeta seus interesses. Em pequena empresa isso aparece em situações concretas: recusar orçamento, negar prazo, classificar cliente como inadimplente, priorizar ou descartar lead. Nesses pontos, o agente pode sugerir — quem decide é uma pessoa.",
        checklist: [
          "Listar quais decisões o sistema toma sozinho hoje",
          "Definir quais delas precisam de aprovação humana",
          "Registrar o critério usado, para poder explicar depois",
          "Ter caminho claro para o cliente contestar",
        ],
      },
      {
        title: "O fornecedor também é sua responsabilidade",
        body: "Contratar uma ferramenta não transfere a responsabilidade: perante o cliente, quem responde é a empresa. Antes de ligar qualquer solução de IA, verifique onde os dados ficam, se são usados para treinar modelo, quem tem acesso, o que acontece no encerramento do contrato e se existe contrato de tratamento de dados. Fiscalização sobre uso de IA e dados pessoais entrou na pauta prioritária da autoridade de proteção de dados — improviso aqui sai caro.",
        checklist: [
          "Contrato ou termo cobrindo tratamento de dados com o fornecedor",
          "Verificar se as conversas são usadas para treinar modelos",
          "Confirmar onde os dados são armazenados e por quanto tempo",
          "Garantir exportação e exclusão dos dados ao encerrar o contrato",
          "Preferir fornecedores que documentam segurança e conformidade",
        ],
      },
      {
        title: "Como a Avila Ops implanta",
        body: "A Avila Ops configura automação e agentes de IA já com o básico de conformidade resolvido: aviso de atendimento automatizado, política de privacidade publicada, coleta mínima, controle de acesso ao histórico, regra de transferência para humano e registro do que foi decidido. Isso não substitui orientação jurídica, mas evita que a empresa precise desmontar a operação depois para se adequar.",
      },
    ],
    related: [
      "automacao-de-atendimento",
      "automatizar-whatsapp",
      "sistema-para-pequenas-empresas",
    ],
  },
  {
    slug: "como-configurar-o-e-mail-da-empresa-no-celular-e-no-outlook",
    title: "Como configurar o e-mail da empresa no celular e no Outlook?",
    description:
      "Dados do servidor e passo a passo para ler o e-mail profissional da empresa no iPhone, no Android, no Outlook, no Mac e no navegador, com as portas certas e a solução dos erros mais comuns.",
    reviewedAt: "2026-09-04",
    answer:
      "Toda caixa de e-mail profissional hospedada pela Avila Ops funciona em qualquer programa de e-mail por IMAP. O usuário é sempre o endereço completo, a senha é a mesma do webmail, o servidor de entrada e de saída é mail.avilaops.com, com a porta 993 para receber e a 465 para enviar, ambas com SSL/TLS. Antes de configurar qualquer aparelho, entre uma vez em mail.avilaops.com: se a senha abre o webmail, ela vai funcionar em todos os programas.",
    sections: [
      {
        title: "Os dados que valem para qualquer programa",
        body: "Programas de e-mail perguntam as mesmas cinco coisas: usuário, senha, servidor de entrada, servidor de saída e o tipo de segurança. Nas caixas da Avila Ops, o usuário é o endereço inteiro, com o @ e o domínio da empresa, e a senha é a que você usa no webmail. Prefira IMAP em vez de POP3: com IMAP as mensagens ficam no servidor e o que você lê ou apaga no celular aparece igual no computador.",
        checklist: [
          "Usuário: o endereço completo, por exemplo voce@suaempresa.com.br",
          "Senha: a mesma do webmail em mail.avilaops.com",
          "Receber (IMAP): mail.avilaops.com, porta 993, SSL/TLS",
          "Enviar (SMTP): mail.avilaops.com, porta 465 com SSL/TLS, ou 587 com STARTTLS, com autenticação ligada",
          "POP3 só se o programa não aceitar IMAP: porta 995, SSL/TLS",
        ],
      },
      {
        title: "iPhone e iPad, no app Mail da Apple",
        body: "O iPhone descobre as portas sozinho quando o nome do servidor está certo. O único cuidado é escolher a opção Outra, e não Google, Outlook ou Exchange, porque essas opções tentam entrar em serviços que não são o seu.",
        checklist: [
          "Ajustes, Apps, Mail, Contas, Adicionar Conta (em versões antigas do iOS: Ajustes, Mail, Contas)",
          "Toque em Outra e depois em Adicionar Conta de E-mail",
          "Preencha nome, endereço completo, senha do webmail e uma descrição como Trabalho, e toque em Seguinte",
          "Deixe IMAP marcado e ponha mail.avilaops.com nos dois servidores, com o endereço completo como nome de usuário",
          "Toque em Seguinte e depois em Salvar; o aparelho testa a conexão e acha as portas 993 e 465",
          "Opcional: adicione contas CardDAV e CalDAV com o mesmo servidor, usuário e senha para ter contatos e agenda da caixa no celular",
        ],
      },
      {
        title: "Android, no app Gmail",
        body: "O app Gmail aceita contas de outros servidores, mas esconde essa opção atrás de Outro e Configuração manual. Sem passar por elas, ele tenta tratar a caixa como uma conta Google e falha.",
        checklist: [
          "Abra o Gmail, toque na sua foto e em Adicionar outra conta",
          "Escolha Outro, não Google nem Outlook, Hotmail e Live",
          "Digite o endereço completo e toque em Configuração manual",
          "Escolha Pessoal (IMAP) e digite a senha do webmail",
          "Servidor de entrada: mail.avilaops.com, porta 993, SSL/TLS, usuário igual ao endereço",
          "Servidor de saída: mail.avilaops.com, porta 465, SSL/TLS, com Exigir login ligado e o mesmo usuário e senha",
        ],
      },
      {
        title: "Outlook, no Windows, no Mac, no iPhone e no Android",
        body: "O Outlook tenta adivinhar a configuração e, quando não reconhece o domínio, sugere Exchange ou Não é IMAP. Ignore a sugestão e mantenha IMAP. No celular, os campos de servidor só aparecem depois de ligar Usar configurações avançadas. O erro mais comum aqui é digitar a senha diferente da do webmail em um dos dois campos de senha.",
        checklist: [
          "No computador: Arquivo, Adicionar Conta. No novo Outlook e no celular: Configurações, Adicionar conta, Adicionar conta de e-mail",
          "Digite o endereço completo, abra Opções avançadas e marque Configurar minha conta manualmente (no celular, Configurar conta manualmente)",
          "Escolha o tipo IMAP",
          "Entrada: mail.avilaops.com, porta 993, SSL/TLS. Saída: mail.avilaops.com, porta 465, SSL/TLS",
          "Nome de usuário igual ao endereço completo e a senha do webmail, por inteiro, nos dois servidores",
          "Se aparecer que não foi possível conectar, teste a senha no webmail antes de mexer nas portas",
        ],
      },
      {
        title: "Mac, no app Mail da Apple",
        body: "No Mac o caminho é o mesmo do iPhone, com uma etapa a mais: depois de entrar, o app pergunta quais serviços da conta você quer usar. Marque Mail. Contatos e Agenda entram por CardDAV e CalDAV em Ajustes do Sistema, Contas de Internet.",
        checklist: [
          "Mail, menu Mail, Adicionar Conta, Outra Conta do Mail",
          "Preencha nome, endereço completo e a senha do webmail, e clique em Iniciar Sessão",
          "Quando o app pedir os servidores: tipo IMAP, entrada e saída mail.avilaops.com, nome de usuário igual ao endereço",
          "Clique em Iniciar Sessão de novo e marque Mail",
        ],
      },
      {
        title: "No navegador, sem instalar nada",
        body: "O webmail em mail.avilaops.com funciona em qualquer navegador e pode ser instalado como aplicativo no celular, com aviso de mensagem nova. É também o lugar para testar a senha, trocar a senha e ligar a verificação em duas etapas.",
        checklist: [
          "Abra mail.avilaops.com",
          "Se a tela pedir uma conta Avila Ops e você não tem uma, toque em Entrar com a senha da caixa",
          "No Safari do iPhone: Compartilhar, Adicionar à Tela de Início. No Chrome do Android: menu, Instalar app",
          "Na primeira entrada com a senha que recebeu, o webmail pede para criar uma senha só sua, com pelo menos 12 caracteres",
        ],
      },
      {
        title: "Senha, recuperação e bloqueio",
        body: "A senha da caixa precisa ter pelo menos 12 caracteres. Uma frase curta com números é mais fácil de lembrar e mais segura do que uma senha curta cheia de símbolos. Ao trocar a senha no webmail, todos os programas de e-mail passam a pedir a nova. Depois de várias tentativas erradas em poucos minutos, a caixa bloqueia novas tentativas por um tempo, então espere alguns minutos antes de tentar de novo.",
        checklist: [
          "Trocar a senha: webmail, Conta, Senha",
          "Esqueceu a senha: mail.avilaops.com/recuperar envia um link para o e-mail de recuperação cadastrado, válido por 60 minutos",
          "Verificação em duas etapas: liga em Conta com um aplicativo autenticador e vale para o webmail",
          "Programas de e-mail continuam entrando com a senha da caixa mesmo com a verificação em duas etapas ligada",
        ],
      },
      {
        title: "Quando algo não funciona",
        body: "Quase todo problema de configuração cai em quatro casos. Antes de ligar para o suporte, confira a lista: na maioria das vezes é a senha digitada diferente ou o nome do servidor trocado pelo domínio da empresa.",
        checklist: [
          "Usuário ou senha inválidos: teste a senha no webmail e confira se o usuário é o endereço completo",
          "Não foi possível verificar o certificado: o servidor precisa ser exatamente mail.avilaops.com, não o seu domínio",
          "Recebe mas não envia: confira a porta de saída (465 com SSL/TLS ou 587 com STARTTLS) e se a autenticação do SMTP está ligada",
          "Alguém disse que enviou e nada chegou: olhe as pastas Spam e Lixeira no webmail antes de pedir para reenviar",
        ],
      },
    ],
    related: [
      "email-profissional",
      "dominio-e-hospedagem",
      "checklist-de-presenca-digital-para-pequenas-empresas",
    ],
  },
  {
    slug: "quanto-custa-um-site-profissional-para-pequena-empresa",
    title: "Quanto custa um site profissional para uma pequena empresa?",
    description: "Entenda o que muda o preço de um site, quais custos continuam depois da entrega e como comparar propostas sem cair no barato que sai caro.",
    answer: "O preço de um site profissional depende do objetivo, do volume de conteúdo, das integrações e do trabalho de estratégia, design e manutenção. Para uma pequena empresa, a comparação correta não é só entre valores: é entre o que cada proposta entrega, quem será dono dos ativos e como o site ajudará a gerar confiança, contatos ou vendas.",
    reviewedAt: "2026-09-11",
    sections: [
      { title: "O que realmente forma o preço", body: "Um site não é apenas a tela final. O investimento pode incluir diagnóstico, estrutura das páginas, texto, identidade visual, fotos, desenvolvimento, adaptação para celular, SEO, formulários, métricas, integrações e publicação. Quanto mais claro for o objetivo comercial, menor o risco de pagar por páginas que não ajudam o negócio.", checklist: ["Objetivo e público definidos", "Número e função de cada página", "Texto, fotos e identidade incluídos ou não", "Integrações com WhatsApp, formulário, agenda ou pagamento", "SEO, métricas e publicação previstos"] },
      { title: "Quais custos continuam depois", body: "Domínio, hospedagem, e-mail profissional, manutenção e ferramentas contratadas podem ter cobrança recorrente. A proposta deve separar criação, custos de terceiros e acompanhamento contínuo. Desconfie tanto de uma mensalidade sem escopo quanto da promessa de que um site nunca precisará de manutenção.", checklist: ["Renovação do domínio", "Hospedagem e certificado", "E-mail profissional", "Atualizações, segurança e backup", "Alterações de conteúdo e suporte"] },
      { title: "Como comparar duas propostas", body: "Coloque as propostas lado a lado por resultado e responsabilidade. Veja se ambas incluem as mesmas páginas, conteúdo, versão mobile, propriedade do domínio, medição e suporte. Um orçamento menor pode apenas ter transferido para você etapas essenciais que aparecerão como custo ou atraso depois." },
      { title: "O sinal de uma boa escolha", body: "A proposta certa explica o que será construído, por que cada parte existe, o que você precisa fornecer, quando cada etapa será aprovada e como o resultado será medido. Ela reduz surpresa e deixa claro o que pertence à sua empresa." },
    ],
    related: ["quanto-custa-criar-uma-presenca-digital-profissional", "o-que-pedir-em-um-orcamento-de-site", "site-pronto-ou-site-sob-medida-qual-escolher"],
  },
  {
    slug: "site-pronto-ou-site-sob-medida-qual-escolher",
    title: "Site pronto ou site sob medida: qual escolher?",
    description: "Compare velocidade, preço, diferenciação e flexibilidade para decidir entre modelo pronto e projeto sob medida.",
    answer: "Um site pronto costuma ser melhor quando a empresa precisa validar rapidamente uma oferta simples. Um site sob medida faz mais sentido quando diferenciação, integrações, conteúdo, SEO ou uma jornada específica influenciam a venda. A melhor escolha depende do estágio do negócio, não do formato que a agência prefere vender.",
    reviewedAt: "2026-09-11",
    sections: [
      { title: "Quando um modelo pronto resolve", body: "Um bom modelo pode colocar uma empresa no ar com rapidez quando existem poucos serviços, conteúdo enxuto e uma jornada de contato simples. Ele deixa de ser vantagem quando obriga a empresa a parecer igual aos concorrentes ou impede mudanças importantes.", checklist: ["Oferta simples e já validada", "Poucas páginas", "Prazo curto", "Poucas integrações", "Aceitação consciente das limitações"] },
      { title: "Quando vale construir sob medida", body: "O projeto sob medida é indicado quando o site precisa explicar uma oferta complexa, integrar sistemas, atender públicos diferentes, sustentar uma estratégia de conteúdo ou criar uma experiência reconhecível. O custo maior deve comprar resultado e flexibilidade, não complexidade desnecessária." },
      { title: "A alternativa mais inteligente", body: "Muitas pequenas empresas se beneficiam de uma base modular bem construída, personalizada naquilo que muda percepção e conversão. Essa abordagem preserva velocidade sem transformar a marca em um template genérico." },
    ],
    related: ["site-institucional-landing-page-ou-loja-virtual", "quanto-custa-um-site-profissional-para-pequena-empresa", "criacao-de-site-profissional"],
  },
  {
    slug: "o-que-pedir-em-um-orcamento-de-site",
    title: "O que pedir em um orçamento de site antes de contratar?",
    description: "Checklist para comparar escopo, propriedade, conteúdo, SEO, suporte, prazo e custos recorrentes antes de assinar.",
    answer: "Peça um orçamento que detalhe objetivo, páginas, entregáveis, conteúdo, integrações, versão mobile, SEO, métricas, propriedade dos acessos, prazo, suporte e custos recorrentes. Se não estiver escrito, não trate como incluído.",
    reviewedAt: "2026-09-11",
    sections: [
      { title: "Escopo que precisa estar escrito", body: "A proposta deve nomear as páginas e a função de cada uma, além de dizer quem escreve, quem fornece imagens, quantas revisões existem e quais integrações serão entregues.", checklist: ["Mapa de páginas", "Responsável por textos e imagens", "Formulários e integrações", "Adaptação para celular", "Número de revisões e critérios de aceite"] },
      { title: "Pergunte sobre propriedade", body: "O domínio, as contas principais, os dados e os acessos administrativos devem ficar em nome da empresa. O fornecedor pode operar e proteger esses recursos, mas a relação não deve depender de esconder credenciais ou impedir uma futura transferência." },
      { title: "Pergunte como o resultado será medido", body: "Um site comercial precisa permitir acompanhar visitas relevantes, cliques no WhatsApp, formulários e origem dos contatos. SEO e medição não devem aparecer como palavras soltas: peça para explicar o que será configurado e entregue." },
      { title: "Custos e suporte depois da publicação", body: "Confirme domínio, hospedagem, e-mail, licenças, manutenção, prazo de atendimento e valor de futuras alterações. Isso torna propostas diferentes realmente comparáveis." },
    ],
    related: ["quanto-custa-um-site-profissional-para-pequena-empresa", "quem-deve-ser-o-dono-do-dominio-e-da-hospedagem", "site-precisa-de-manutencao-depois-de-pronto"],
  },
  {
    slug: "quem-deve-ser-o-dono-do-dominio-e-da-hospedagem",
    title: "Quem deve ser o dono do domínio e da hospedagem do site?",
    description: "Saiba quais contas devem ficar em nome da empresa e como evitar perder o domínio, o site ou os acessos ao trocar de fornecedor.",
    answer: "O domínio e as contas principais do site devem ficar sob controle da empresa, com dados verdadeiros, recuperação segura e acesso administrativo. O fornecedor pode receber permissão para trabalhar, mas não deve ser o único dono dos ativos digitais do cliente.",
    reviewedAt: "2026-09-11",
    sections: [
      { title: "O que precisa ficar com a empresa", body: "A empresa deve controlar o registro do domínio, DNS, hospedagem ou plataforma, analytics, Search Console, perfis comerciais e contas de e-mail. Use um e-mail de recuperação que a empresa realmente acompanhe.", checklist: ["Domínio registrado com dados da empresa", "Dois responsáveis com acesso seguro", "Recuperação e autenticação em duas etapas", "Inventário das contas principais", "Contrato prevendo entrega e transferência"] },
      { title: "Como o fornecedor trabalha sem virar dono", body: "A forma profissional é conceder acesso por usuário ou permissão, mantendo a titularidade central com o cliente. Isso melhora segurança, auditoria e continuidade sem atrapalhar a operação técnica." },
      { title: "Sinais de risco", body: "Evite contratar quando o fornecedor se recusa a identificar onde o domínio está registrado, usa apenas contas pessoais próprias ou condiciona a entrega de acessos a pagamentos não previstos. Organize isso antes do lançamento, não apenas quando houver conflito." },
    ],
    related: ["dominio-e-hospedagem", "o-que-pedir-em-um-orcamento-de-site", "site-precisa-de-manutencao-depois-de-pronto"],
  },
  {
    slug: "site-precisa-de-manutencao-depois-de-pronto",
    title: "Um site precisa de manutenção depois de pronto?",
    description: "Entenda o que precisa ser atualizado, o que é suporte e como definir uma manutenção que proteja o site e ajude o negócio.",
    answer: "Sim. Depois de publicado, um site precisa de acompanhamento proporcional à sua complexidade: atualizações, segurança, backup, desempenho, formulários, conteúdo, métricas e renovações. Manutenção não é refazer o site todo mês; é evitar que um ativo importante fique desatualizado ou pare de gerar resultado.",
    reviewedAt: "2026-09-11",
    sections: [
      { title: "O mínimo operacional", body: "Mesmo um site simples depende de domínio, certificado, hospedagem e formulários funcionando. Também precisa de backup verificável e de uma rotina para aplicar atualizações sem quebrar a página.", checklist: ["Renovações acompanhadas", "Backup com teste de recuperação", "Atualizações e correções", "Formulários testados", "Monitoramento de disponibilidade"] },
      { title: "Manutenção comercial", body: "Preços, serviços, equipe, endereço, fotos e chamadas para ação mudam. Um site tecnicamente no ar pode continuar prejudicando vendas se a informação estiver antiga ou se ninguém acompanhar as páginas que recebem visitas." },
      { title: "Suporte não é a mesma coisa", body: "Suporte resolve falhas e dúvidas. Manutenção previne problemas e mantém o ativo útil. Evolução cria novas páginas, integrações e experiências. A proposta deve separar essas três responsabilidades." },
      { title: "Como escolher o acompanhamento", body: "Sites estáticos e enxutos podem ter uma rotina leve. Lojas, portais, integrações e conteúdo frequente exigem acompanhamento mais próximo. O plano deve seguir risco e ritmo do negócio, não uma mensalidade genérica." },
    ],
    related: ["o-que-pedir-em-um-orcamento-de-site", "quanto-custa-um-site-profissional-para-pequena-empresa", "checklist-de-presenca-digital-para-pequenas-empresas"],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
