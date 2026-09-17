import Link from "next/link";
import { Palette, Globe, Cloud, TrendingUp, Bot, LifeBuoy, Plus, ArrowUpRight, type LucideIcon } from "lucide-react";
import "./jornada-servicos.css";

const categoryLabels: Record<string, string> = {
  Marca: "Identidade da marca",
  Site: "Site na internet",
  Infraestrutura: "Domínio, e-mail e hospedagem",
  Marketing: "SEO e marketing",
  Automações: "Automações e WhatsApp",
  Suporte: "Suporte e manutenção",
};

const categorySummaries: Record<string, { id: string; description: string }> = {
  Marca: { id: "catalogo-presenca", description: "Uma identidade que dá personalidade à sua empresa." },
  Site: { id: "catalogo-site", description: "Apresente seu trabalho, receba contatos ou venda online." },
  Infraestrutura: { id: "catalogo-base", description: "O endereço e a estrutura para a sua presença digital." },
  Marketing: { id: "catalogo-crescimento", description: "Chegue a mais pessoas e entenda o que traz resultado." },
  Automações: { id: "catalogo-automacoes", description: "Facilite o contato e organize o atendimento." },
  Suporte: { id: "catalogo-suporte", description: "Cuide do que está no ar e acompanhe a evolução." },
};

const categoryIcons: Record<string, LucideIcon> = {
  Marca: Palette,
  Site: Globe,
  Infraestrutura: Cloud,
  Marketing: TrendingUp,
  Automações: Bot,
  Suporte: LifeBuoy,
};

const catalog: { categoria: string; itens: { nome: string; descricao: string }[] }[] = [
  {
    categoria: "Marca",
    itens: [
      {
        nome: "Pacote Essencial",
        descricao:
          "Identidade visual completa com logo principal, logo horizontal, versão reduzida, paleta de cores e arquivos em vetor.",
      },
      { nome: "Logo principal", descricao: "Design exclusivo da sua marca principal." },
      {
        nome: "Logo secundária/horizontal",
        descricao: "Versão secundária para cabeçalhos e aplicações horizontais.",
      },
      {
        nome: "Versão reduzida e símbolo",
        descricao: "Versão compacta e símbolo/ícone da marca.",
      },
      { nome: "Versões monocromáticas", descricao: "Versões em verde, preto e branco." },
      { nome: "Favicon para site", descricao: "Ícone da aba do navegador." },
      {
        nome: "Motion Logo",
        descricao: "Logotipo animado em vídeo para aberturas e apresentações.",
      },
      {
        nome: "Brandbook Completo",
        descricao: "Manual de identidade visual completo com todas as diretrizes de aplicação.",
      },
      {
        nome: "Cartão de Visitas Digital",
        descricao: "Cartão de visitas digital e interativo em formato PDF com links clicáveis.",
      },
      {
        nome: "Assinatura de E-mail Corporativa",
        descricao: "Design e exportação de assinatura profissional de e-mail em HTML.",
      },
      {
        nome: "Pack Social Media Templates",
        descricao: "Conjunto de 10 templates customizados no Canva para redes sociais.",
      },
    ],
  },
  {
    categoria: "Site",
    itens: [
      {
        nome: "Site Institucional",
        descricao: "Site institucional completo com múltiplas páginas e blog integrado.",
      },
      {
        nome: "Landing Page Profissional",
        descricao: "Página focada em apresentar sua oferta e facilitar o contato, preparada para celular e mecanismos de busca.",
      },
      {
        nome: "Loja Virtual / E-commerce",
        descricao:
          "Desenvolvimento de e-commerce completo com catálogo de produtos e meios de pagamento.",
      },
    ],
  },
  {
    categoria: "Infraestrutura",
    itens: [
      { nome: "Domínio .com", descricao: "Registro ou renovação anual de domínio internacional (.com)." },
      { nome: "Domínio .com.br", descricao: "Registro ou renovação anual de domínio nacional (.com.br)." },
      {
        nome: "Certificado SSL",
        descricao: "Certificado de segurança SSL para tráfego HTTPS criptografado.",
      },
      {
        nome: "Hospedagem Cloud Basic",
        descricao: "Hospedagem ideal para sites institucionais e landing pages de baixo tráfego.",
      },
      {
        nome: "Hospedagem Cloud Pro",
        descricao: "Mais performance e recursos para sites com tráfego médio.",
      },
      {
        nome: "E-mail Profissional Basic",
        descricao: "Até 2 contas de e-mail profissionais com 10GB de espaço.",
      },
      {
        nome: "E-mail Profissional Pro",
        descricao: "Até 5 contas de e-mail profissionais com 30GB de espaço.",
      },
      {
        nome: "E-mail Profissional Business",
        descricao: "Até 10 contas de e-mail profissionais com 50GB de espaço.",
      },
      {
        nome: "Google Workspace Business Starter",
        descricao: "Contas corporativas Google de produtividade com Gmail profissional.",
      },
      {
        nome: "Adequação Básica à LGPD",
        descricao: "Configuração de banner de cookies e elaboração de Termos de Uso e Política de Privacidade.",
      },
      {
        nome: "Migração de E-mails / Site",
        descricao: "Transferência de e-mails corporativos e banco de dados de outros servidores.",
      },
      {
        nome: "Integração de CRM / Automação",
        descricao: "Conexão dos formulários do site com CRMs como RD Station, ActiveCampaign ou Hubspot.",
      },
    ],
  },
  {
    categoria: "Marketing",
    itens: [
      {
        nome: "Configuração inicial de SEO",
        descricao: "Otimização on-page completa para melhorar o ranqueamento orgânico.",
      },
      {
        nome: "Google Analytics + Pixel + GTM",
        descricao: "Instalação de Google Analytics 4, Meta Pixel e Google Tag Manager.",
      },
      {
        nome: "Configuração de Campanhas de Tráfego",
        descricao: "Setup de contas e criação das primeiras campanhas no Google Ads e Meta Ads.",
      },
      {
        nome: "Gestão Mensal de Tráfego Pago",
        descricao: "Gestão continuada, otimização de orçamentos e relatórios de Google/Meta Ads.",
      },
    ],
  },
  {
    categoria: "Automações",
    itens: [
      {
        nome: "WhatsApp Business Setup",
        descricao: "Configuração do perfil comercial, mensagens automáticas e catálogo.",
      },
    ],
  },
  {
    categoria: "Suporte",
    itens: [
      {
        nome: "Plano de Manutenção Mensal",
        descricao: "Atualizações, backups semanais, monitoramento e suporte prioritário.",
      },
    ],
  },
];

export default function ServiceCatalog() {
  return (
    <section className="js-catalog" id="catalogo" aria-labelledby="catalogo-title">
      <div className="container">
        <div className="js-section-heading">
          <span className="js-eyebrow">Explore as possibilidades</span>
          <h2 id="catalogo-title">O que faz sentido <em>para o seu momento?</em></h2>
          <p>
            Abra uma categoria para conhecer os serviços. Você pode começar por uma necessidade e combinar outras depois.
          </p>
        </div>

        <div className="js-catalog-groups">
          {catalog.map((group) => {
            const Icon = categoryIcons[group.categoria];
            const summary = categorySummaries[group.categoria];
            return (
              <details className="js-catalog-group" key={group.categoria} id={summary.id}>
                <summary className="js-catalog-summary">
                  {Icon && (
                    <span className="js-catalog-icon">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  )}
                  <span className="js-catalog-summary-copy"><h3>{categoryLabels[group.categoria] ?? group.categoria}</h3><span>{summary.description}</span></span>
                  <Plus className="js-catalog-toggle" size={23} aria-hidden="true" />
                </summary>
                <div className="js-catalog-items">
                  {group.itens.map((item) => (
                    <article className="js-catalog-item" key={item.nome}>
                      <h4>{item.nome}</h4>
                      <p>{item.descricao}</p>
                    </article>
                  ))}
                </div>
                <Link className="js-text-link js-catalog-action" href="/criar-meu-resumo/" prefetch={false}>Incluir no meu projeto <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </details>
            );
          })}
        </div>
        <div className="js-catalog-close"><p>Gostou de mais de uma ideia? Vamos organizar a combinação para o seu negócio.</p><Link className="js-button" href="/criar-meu-resumo/" prefetch={false}>Montar meu projeto <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
