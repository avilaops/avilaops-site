export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDefinition: string;
  explanation: string;
  /** Uma situação ilustrativa, no dia a dia de uma pequena empresa. Não é caso de cliente. */
  example: string;
  /** Sinais de que o assunto já é problema da empresa. */
  signs: string[];
  faq: { question: string; answer: string }[];
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
    example:
      "Uma clínica com três recepcionistas atendia tudo em um celular só. Com a API, o mesmo número passa a ser atendido pelas três ao mesmo tempo, cada conversa fica registrada no CRM e a confirmação de consulta sai sozinha na véspera. O paciente continua falando com o número de sempre; o que muda é a organização por trás.",
    signs: [
      "Mais de uma pessoa precisa responder pelo mesmo número",
      "Conversas se perdem quando o celular da empresa muda de mão",
      "A empresa quer mandar lembrete, confirmação ou cobrança sem digitar um por um",
      "O atendimento precisa ficar registrado junto do cadastro do cliente",
    ],
    faq: [
      {
        question: "A WhatsApp Business API é paga?",
        answer:
          "Sim. Além da mensalidade do provedor ou do sistema que dá acesso à API, a Meta cobra pelas mensagens que a empresa inicia usando modelos aprovados. Responder a quem chamou dentro da janela de 24 horas de atendimento não tem essa cobrança.",
      },
      {
        question: "Preciso trocar de número para usar a API?",
        answer:
          "Não necessariamente. Um número que já está no aplicativo WhatsApp Business pode ser migrado para a API. O ponto de atenção é o que acontece com o aplicativo: conforme o provedor, o número continua no aplicativo em paralelo (modo de coexistência) ou passa a funcionar só pela plataforma integrada. Isso precisa ser confirmado antes de migrar.",
      },
      {
        question: "Qual a diferença para o WhatsApp Business comum?",
        answer:
          "O aplicativo comum é pensado para uma pessoa em um aparelho, com poucos dispositivos conectados. A API não tem aplicativo: ela liga o número a sistemas, o que permite vários atendentes, automações e registro das conversas.",
      },
    ],
    related: [
      { label: "Automatizar WhatsApp", href: "/automatizar-whatsapp/" },
      { label: "Como automatizar o WhatsApp da empresa", href: "/guias/como-automatizar-whatsapp-da-empresa/" },
      { label: "WhatsApp comum ou Business API", href: "/guias/whatsapp-comum-ou-business-api/" },
    ],
  },
  {
    slug: "crm",
    term: "CRM",
    shortDefinition:
      "Sistema para registrar contatos, histórico e etapa de venda de cada cliente ou lead.",
    explanation:
      "CRM significa Customer Relationship Management (gestão de relacionamento com o cliente). Na prática, é o sistema onde ficam registrados quem é o contato, de onde ele veio, o que já foi conversado, em que etapa do funil está, qual o próximo passo e quem é o responsável. Sem CRM, essas informações costumam ficar espalhadas entre WhatsApp, planilhas e memória da equipe, o que aumenta o risco de esquecimento e perda de oportunidade.",
    example:
      "Uma loja de móveis planejados recebe pedido de orçamento por WhatsApp, Instagram e indicação. Sem CRM, cada vendedor guarda os contatos no próprio celular e ninguém sabe quantos orçamentos estão sem resposta. Com CRM, todo pedido vira um cartão com dono, valor e próxima ação, e o gestor vê na segunda-feira o que está parado há mais de uma semana.",
    signs: [
      "Orçamentos enviados ficam sem retorno porque ninguém lembra de cobrar",
      "Quando um vendedor sai, os contatos vão embora com ele",
      "Não dá para dizer de onde vieram os clientes do mês",
      "A mesma pessoa é atendida duas vezes por vendedores diferentes",
    ],
    faq: [
      {
        question: "Planilha serve como CRM?",
        answer:
          "Serve para começar, enquanto há uma pessoa vendendo e poucos contatos por semana. Ela deixa de servir quando mais gente precisa atualizar ao mesmo tempo, quando é preciso lembrete de retorno ou quando o histórico da conversa precisa ficar junto do contato.",
      },
      {
        question: "CRM é só para empresa grande?",
        answer:
          "Não. Para empresa pequena o ganho costuma ser maior, porque cada venda perdida por falta de retorno pesa mais. O que muda é o tamanho da implantação: poucas etapas, poucos campos e uso diário.",
      },
      {
        question: "O CRM se conecta ao WhatsApp?",
        answer:
          "Sim, por integração. Com o WhatsApp ligado ao CRM, a conversa fica registrada no cadastro do cliente e a etapa da venda pode mudar a partir do que acontece no atendimento.",
      },
    ],
    related: [
      { label: "CRM para pequenas empresas", href: "/crm-para-pequenas-empresas/" },
      { label: "Como usar CRM com WhatsApp", href: "/guias/crm-para-pequenas-empresas-com-whatsapp/" },
    ],
  },
  {
    slug: "pixel-da-meta",
    term: "Pixel da Meta",
    shortDefinition:
      "Código instalado no site que registra ações dos visitantes para medir e otimizar campanhas da Meta.",
    explanation:
      "O Pixel da Meta é um trecho de código inserido no site que envia eventos (visita, clique, cadastro, compra) de volta para o Gerenciador de Anúncios da Meta. Ele permite medir quantas conversões vieram de cada campanha, montar públicos personalizados e criar públicos semelhantes (lookalike) para novas campanhas. Sem o Pixel configurado corretamente, o anúncio pode gerar alcance, mas a empresa perde a capacidade de saber quais campanhas realmente geraram resultado.",
    example:
      "Uma escola de idiomas anuncia no Instagram e leva as pessoas para uma página de matrícula. Sem o Pixel, o anúncio é otimizado para clique e a escola só sabe quantas pessoas visitaram a página. Com o Pixel registrando o envio do formulário, a campanha passa a buscar gente parecida com quem de fato se inscreveu, e o custo por matrícula aparece no relatório.",
    signs: [
      "A empresa anuncia na Meta e não sabe quais anúncios geraram contato",
      "As campanhas são otimizadas para clique ou alcance, não para conversão",
      "Não existe público de remarketing com quem visitou o site",
      "O número de leads do relatório não bate com o que chegou de verdade",
    ],
    faq: [
      {
        question: "O Pixel da Meta ainda funciona com as restrições de privacidade?",
        answer:
          "Funciona, mas enxerga menos do que antes, porque navegadores e sistemas bloqueiam parte do rastreamento. Por isso ele costuma ser usado junto com a API de Conversões, que envia os mesmos eventos a partir do servidor.",
      },
      {
        question: "Preciso avisar o visitante sobre o Pixel?",
        answer:
          "Sim. O Pixel trata dados de navegação, então a política de privacidade do site deve informar o uso e a finalidade, e o consentimento deve seguir o que a LGPD pede para esse tipo de dado.",
      },
      {
        question: "Dá para usar o Pixel sem site?",
        answer:
          "Não. O Pixel mede o que acontece em páginas da empresa. Quem vende só pelo WhatsApp ou pelo próprio Instagram usa outros sinais, como as conversas iniciadas e os eventos enviados pela API de Conversões.",
      },
    ],
    related: [
      { label: "Instagram e Meta Ads", href: "/instagram-meta-ads/" },
      { label: "Meta Ads para empresas", href: "/meta-ads-para-empresas/" },
      {
        label: "Como configurar o Pixel da Meta e medir conversões",
        href: "/guias/como-configurar-pixel-da-meta-e-medir-conversoes/",
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
    example:
      "Um escritório de contabilidade quer vender abertura de empresa para MEI. Em vez de mandar o anúncio para a página inicial, que fala de dez serviços, ele cria uma página só sobre abertura de MEI: o que está incluso, quanto custa, em quanto tempo fica pronto e um botão para chamar no WhatsApp. Quem clica no anúncio encontra exatamente o que foi prometido.",
    signs: [
      "Os anúncios levam para a página inicial do site",
      "A empresa tem uma oferta ou campanha com prazo",
      "O visitante precisa procurar no menu para achar o que o anúncio prometeu",
      "Não dá para medir quantos contatos cada campanha gerou",
    ],
    faq: [
      {
        question: "Landing page substitui o site?",
        answer:
          "Não. O site apresenta a empresa inteira e é encontrado por quem pesquisa o nome ou o serviço. A landing page serve a uma oferta específica, normalmente ligada a uma campanha. As duas coisas convivem.",
      },
      {
        question: "Quanto tempo leva para fazer uma landing page?",
        answer:
          "Menos que um site completo, porque é uma página e uma oferta. O que mais consome tempo é definir a oferta e o texto; com isso decidido, a construção é rápida.",
      },
      {
        question: "Landing page precisa de domínio próprio?",
        answer:
          "Não precisa de um domínio separado. O mais comum é ela ficar em um endereço do próprio site da empresa, o que mantém a marca e aproveita a confiança do domínio.",
      },
    ],
    related: [
      {
        label: "Site institucional, landing page ou loja virtual",
        href: "/guias/site-institucional-landing-page-ou-loja-virtual/",
      },
      { label: "Criação de site profissional", href: "/criacao-de-site-profissional/" },
    ],
  },
  {
    slug: "dominio",
    term: "Domínio",
    shortDefinition:
      "Endereço próprio da empresa na internet, como \"suaempresa.com.br\", usado no site e no e-mail profissional.",
    explanation:
      "O domínio é o nome único que identifica um site na internet (por exemplo, avilaops.com). Ele é registrado por um período determinado, junto a um registrador ou provedor, e precisa ser renovado para continuar ativo. O domínio próprio também é a base para o e-mail profissional (contato@suaempresa.com.br) e para configurações técnicas de DNS, como direcionamento do site e autenticação de e-mail.",
    example:
      "Uma padaria registra padariadobairro.com.br. A partir daí o site abre nesse endereço e o e-mail passa a ser contato@padariadobairro.com.br. Se um dia ela trocar de hospedagem ou de quem faz o site, o endereço continua o mesmo, porque o domínio é dela e só passa a apontar para outro lugar.",
    signs: [
      "O site da empresa está em um endereço gratuito de plataforma",
      "O e-mail comercial termina em gmail.com ou hotmail.com",
      "O domínio está registrado no nome de um ex-funcionário ou da agência",
      "Ninguém na empresa sabe quando o domínio vence",
    ],
    faq: [
      {
        question: "Quem deve ser o dono do domínio?",
        answer:
          "A própria empresa, com o CNPJ ou o CPF do responsável. Agência e desenvolvedor podem cuidar da parte técnica, mas o registro precisa estar em nome de quem é dono do negócio, para que a troca de fornecedor não coloque o endereço em risco.",
      },
      {
        question: "Quanto custa um domínio?",
        answer:
          "Um domínio .com.br é pago por ano ao Registro.br e custa pouco perto do resto do projeto. Domínios .com e outras terminações variam conforme a empresa registradora.",
      },
      {
        question: "O que acontece se o domínio vencer?",
        answer:
          "O site e os e-mails param de funcionar. Depois de um prazo de carência o endereço volta a ficar disponível e pode ser registrado por outra pessoa. Vale deixar a renovação automática e um e-mail de aviso que alguém realmente leia.",
      },
    ],
    related: [
      { label: "Domínio e hospedagem", href: "/dominio-e-hospedagem/" },
      { label: "DNS", href: "/glossario/dns/" },
      { label: "E-mail profissional", href: "/glossario/e-mail-profissional/" },
    ],
  },
  {
    slug: "dns",
    term: "DNS",
    shortDefinition:
      "Sistema que traduz o domínio da empresa para os endereços técnicos que apontam para o site, e-mail e outros serviços.",
    explanation:
      "DNS (Domain Name System) é o sistema que conecta o domínio da empresa aos servidores corretos: qual servidor entrega o site, quais servidores recebem o e-mail e quais registros autenticam o envio de mensagens (SPF, DKIM, DMARC). Uma configuração de DNS incorreta pode deixar o site fora do ar ou fazer o e-mail profissional cair na caixa de spam, mesmo que o conteúdo esteja correto.",
    example:
      "Uma empresa troca de hospedagem de site. O domínio continua o mesmo, mas alguém precisa alterar no DNS o registro que diz onde o site está. Se essa alteração apagar os registros de e-mail por engano, o site novo abre normalmente e os e-mails param de chegar, sem aviso. Por isso toda mudança de DNS começa por uma cópia dos registros atuais.",
    signs: [
      "O site abre, mas os e-mails da empresa caem no spam ou não chegam",
      "Ninguém sabe onde o DNS do domínio é administrado",
      "Uma troca de hospedagem deixou alguma coisa fora do ar",
      "O domínio precisa apontar para mais de um serviço, como site, e-mail e loja",
    ],
    faq: [
      {
        question: "Quanto tempo leva para uma mudança de DNS valer?",
        answer:
          "De alguns minutos a algumas horas. Cada registro tem um tempo de cache (TTL), e os provedores de internet só buscam a informação nova quando esse tempo acaba. Reduzir o TTL antes de uma migração encurta a espera.",
      },
      {
        question: "Quais registros de DNS uma empresa costuma ter?",
        answer:
          "Os mais comuns são A ou CNAME, que apontam o site, MX, que diz para onde vão os e-mails, e TXT, usado para SPF, DKIM e DMARC, que comprovam que o e-mail saiu de quem diz ter enviado.",
      },
      {
        question: "Onde fica o DNS do meu domínio?",
        answer:
          "No serviço indicado nos servidores de nome do domínio: pode ser o próprio registrador, a hospedagem ou um serviço como a Cloudflare. Uma consulta de WHOIS mostra quais servidores estão em uso.",
      },
    ],
    related: [
      { label: "Domínio", href: "/glossario/dominio/" },
      { label: "Domínio e hospedagem", href: "/dominio-e-hospedagem/" },
    ],
  },
  {
    slug: "e-mail-profissional",
    term: "E-mail profissional",
    shortDefinition:
      "Caixa de e-mail com o domínio próprio da empresa, como contato@suaempresa.com.br, em vez de um provedor genérico.",
    explanation:
      "E-mail profissional é a caixa de e-mail vinculada ao domínio da própria empresa, em vez de um endereço genérico. Ele transmite mais confiança em propostas, contratos e comunicação comercial, e depende de configuração correta de DNS (MX, SPF, DKIM e DMARC) para ser entregue de forma confiável e não cair em spam.",
    example:
      "Um corretor de imóveis manda propostas de corretor.joao@gmail.com. Ao passar para joao@imobiliariacentro.com.br, a proposta chega com o nome da imobiliária no endereço, o cliente reconhece de quem é e, se o João sair, a caixa e o histórico ficam com a empresa, não com ele.",
    signs: [
      "Propostas e boletos saem de um endereço gratuito",
      "Cada funcionário usa o e-mail pessoal para falar com clientes",
      "E-mails da empresa caem no spam do destinatário",
      "Quando alguém sai, o histórico de conversas vai junto",
    ],
    faq: [
      {
        question: "E-mail profissional é o mesmo que e-mail com domínio próprio?",
        answer:
          "Sim. É o endereço que termina no domínio da empresa, como contato@suaempresa.com.br, em vez de terminar no nome de um provedor gratuito.",
      },
      {
        question: "Por que meu e-mail profissional cai no spam?",
        answer:
          "Quase sempre por falta de autenticação. O domínio precisa de SPF, DKIM e DMARC configurados no DNS, que são os registros que Gmail e Outlook conferem antes de aceitar a mensagem.",
      },
      {
        question: "Posso ler o e-mail profissional no celular?",
        answer:
          "Sim. A caixa pode ser configurada no aplicativo de e-mail do iPhone e do Android, no Outlook e no navegador, com os dados de servidor fornecidos por quem hospeda o e-mail.",
      },
    ],
    related: [
      { label: "E-mail profissional (serviço)", href: "/email-profissional/" },
      { label: "DNS", href: "/glossario/dns/" },
    ],
  },
  {
    slug: "funil-de-vendas",
    term: "Funil de vendas",
    shortDefinition:
      "Sequência de etapas que um lead percorre desde o primeiro contato até a decisão de compra.",
    explanation:
      "O funil de vendas representa as etapas entre o primeiro contato de um potencial cliente e a conversão em venda: por exemplo, descoberta, interesse, contato (WhatsApp ou formulário), proposta, negociação e fechamento. Mapear o funil ajuda a identificar em qual etapa os leads estão travando e o que precisa mudar — atendimento, oferta, prazo de resposta ou material de apoio.",
    example:
      "Uma empresa de energia solar recebe 80 contatos por mês e fecha 4 contratos. Ao separar o caminho em etapas (contato, visita técnica, proposta, fechamento), descobre que 60 contatos nunca chegam à visita, porque o primeiro retorno demora dois dias. O problema não era a proposta nem o preço: era a velocidade da primeira resposta.",
    signs: [
      "A empresa sabe quantas vendas fez, mas não quantas oportunidades perdeu",
      "Não dá para dizer em que momento os clientes desistem",
      "Todo contato novo é tratado do mesmo jeito, esteja ele curioso ou pronto para comprar",
      "O gestor depende de perguntar a cada vendedor para saber como está o mês",
    ],
    faq: [
      {
        question: "Quantas etapas um funil de vendas deve ter?",
        answer:
          "Poucas: de quatro a seis costuma bastar. Cada etapa deve corresponder a algo que aconteceu de verdade, como proposta enviada ou visita feita, e não a uma impressão do vendedor.",
      },
      {
        question: "Funil de vendas serve para quem vende pelo WhatsApp?",
        answer:
          "Serve. O funil é o caminho do cliente, não a ferramenta. Em quem vende pelo WhatsApp, as etapas costumam ser primeiro contato, qualificação, proposta e fechamento, registradas em um CRM ligado às conversas.",
      },
      {
        question: "Qual a diferença entre funil de vendas e CRM?",
        answer:
          "O funil é o desenho das etapas; o CRM é o sistema onde cada contato é colocado em uma dessas etapas. Um funil sem CRM vira intenção, e um CRM sem funil vira agenda de contatos.",
      },
    ],
    related: [
      { label: "Funil de vendas WhatsApp", href: "/funil-de-vendas-whatsapp/" },
      {
        label: "Integrar Instagram, Meta Ads e WhatsApp em um funil",
        href: "/guias/instagram-meta-ads-whatsapp-funil/",
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
    example:
      "Uma oficina mecânica ligava para cada cliente quando o carro ficava pronto. Com automação, mudar o status da ordem de serviço para \"pronto\" dispara sozinho a mensagem no WhatsApp com o valor e o horário de retirada. O atendente deixa de fazer trinta ligações por dia e passa a cuidar de quem precisa de uma conversa de verdade.",
    signs: [
      "A mesma mensagem é digitada várias vezes por dia",
      "Informações são copiadas à mão de um sistema para outro",
      "Tarefas ficam esquecidas quando a pessoa responsável falta",
      "O volume de trabalho cresce junto com as vendas, na mesma proporção",
    ],
    faq: [
      {
        question: "O que automatizar primeiro em uma pequena empresa?",
        answer:
          "O que se repete todo dia e não exige decisão: confirmação de agendamento, aviso de pedido pronto, lembrete de cobrança e registro de contato novo. São tarefas simples, de volume alto e com resultado fácil de medir.",
      },
      {
        question: "Automação substitui funcionários?",
        answer:
          "Em empresa pequena, o efeito mais comum é outro: a mesma equipe atende mais gente sem acumular atraso. A automação tira a parte repetitiva e deixa para as pessoas o que depende de conversa e julgamento.",
      },
      {
        question: "Preciso trocar meus sistemas para automatizar?",
        answer:
          "Nem sempre. Muitas automações ligam os sistemas que a empresa já usa, como WhatsApp, planilha, CRM e meio de pagamento. A troca só entra quando um sistema não permite nenhuma integração.",
      },
    ],
    related: [
      { label: "Automação para pequenas empresas", href: "/automacao-para-pequenas-empresas/" },
      {
        label: "O que uma pequena empresa precisa para vender melhor no digital",
        href: "/guias/o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital/",
      },
    ],
  },
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((entry) => entry.slug === slug);
}
