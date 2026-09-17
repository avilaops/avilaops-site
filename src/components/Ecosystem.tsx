const products = [
  {
    index: "01",
    domain: "E-mail personalizado",
    label: "Comunicação",
    title: "Uma caixa de entrada com cara de empresa.",
    description:
      "Domínio próprio, endereços profissionais e uma presença mais confiável para cada conversa comercial.",
    href: "/contato",
    cta: "Quero entender",
    tone: "red",
  },
  {
    index: "02",
    domain: "CRM",
    label: "Relacionamento",
    title: "Menos memória solta. Mais oportunidade acompanhada.",
    description:
      "Centralize contatos, histórico e próximos passos para sua equipe vender e atender com contexto.",
    href: "https://crm.avilaops.com",
    cta: "Conhecer CRM",
    tone: "yellow",
  },
  {
    index: "03",
    domain: "E-Commerce",
    label: "Vendas",
    title: "Sua loja trabalhando enquanto você cuida do negócio.",
    description:
      "Catálogo, checkout e operação de vendas em uma experiência própria para sua marca.",
    href: "https://lojas.avilaops.com",
    cta: "Conhecer lojas",
    tone: "blue",
  },
  {
    index: "04",
    domain: "Engenharia BIM",
    label: "Projetos",
    title: "Coordenação digital para obras mais previsíveis.",
    description:
      "Ferramentas e fluxos BIM para visualizar, compatibilizar e decidir melhor em cada etapa.",
    href: "https://arxisbim.com.br",
    cta: "Conhecer BIM",
    tone: "red",
  },
  {
    index: "05",
    domain: "Saúde Pet",
    label: "Cuidado",
    title: "Tecnologia que aproxima clínicas, tutores e cuidado.",
    description:
      "Uma operação digital pensada para tornar o atendimento veterinário mais organizado e humano.",
    href: "https://saudepet.app.br",
    cta: "Conhecer Saúde Pet",
    tone: "yellow",
  },
  {
    index: "06",
    domain: "ERP",
    label: "Operação",
    title: "A empresa inteira falando a mesma língua.",
    description:
      "Processos, dados e rotinas conectados para ganhar clareza sem engessar o jeito de trabalhar.",
    href: "https://erp.avilaops.com",
    cta: "Conhecer ERP",
    tone: "blue",
  },
];

export default function Products() {
  return (
    <section className="ecosystem-section products-section" id="produtos">
      <div className="container">
        <div className="section-heading ecosystem-heading">
          <span className="section-index">Produtos / tecnologia aplicada</span>
          <h2>Produtos para a empresa respirar melhor.</h2>
          <p>
            Soluções com propósito claro para vender, atender, projetar e organizar
            a operação sem perder o jeito humano de fazer negócio.
          </p>
        </div>

        <div className="ecosystem-list">
          {products.map((item) => (
            <article
              className={`ecosystem-item ecosystem-${item.tone}`}
              key={item.domain}
            >
              <div className="ecosystem-index">{item.index}</div>
              <div className="ecosystem-domain">
                <span>{item.label}</span>
                <strong>{item.domain}</strong>
              </div>
              <div className="ecosystem-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {item.cta}
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
