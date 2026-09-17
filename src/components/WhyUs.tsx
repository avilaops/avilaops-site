const deliverySteps = [
  {
    label: "Implantar",
    description: "A solução entra no ambiente correto com responsáveis definidos.",
  },
  {
    label: "Configurar",
    description: "Domínios, contas, integrações, permissões e regras são preparados.",
  },
  {
    label: "Validar",
    description: "Fluxos reais são testados do início ao fim com evidências.",
  },
  {
    label: "Documentar",
    description: "O cliente recebe acesso, manual, decisões e histórico organizados.",
  },
  {
    label: "Monitorar",
    description: "Disponibilidade, conversões, vencimentos e falhas viram sinais visíveis.",
  },
  {
    label: "Evoluir",
    description: "Dados e uso real orientam melhorias, automações e novas receitas.",
  },
];

export default function WhyUs() {
  return (
    <section className="method-section" id="metodo">
      <div className="container method-layout">
        <div className="section-heading method-copy">
          <span className="section-index">03 / Padrão de entrega</span>
          <h2>Funcionar é só o começo.</h2>
          <p>
            Um projeto só está entregue quando pode ser usado, medido,
            administrado e sustentado com clareza.
          </p>

          <blockquote>
            “Nada é considerado entregue apenas porque está funcionando.”
            <cite>Padrão operacional Avila Ops</cite>
          </blockquote>
        </div>

        <div className="method-steps">
          {deliverySteps.map((step, index) => (
            <article key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.description}</p>
              </div>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
