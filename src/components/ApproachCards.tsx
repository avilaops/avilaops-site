import { Rocket, Sparkles, MessageCircle, type LucideIcon } from "lucide-react";

const items: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Rocket,
    title: "Protótipo grátis, sem compromisso",
    description:
      "Receba um protótipo funcional do seu site em 48h. Visualize o projeto antes de decidir.",
  },
  {
    icon: Sparkles,
    title: "Análise de mercado por IA",
    description:
      "Nossa IA estuda seu setor e concorrentes para otimizar seu posicionamento digital.",
  },
  {
    icon: MessageCircle,
    title: "Suporte personalizado",
    description:
      "Do protótipo ao lançamento, nosso time te acompanha em cada etapa do projeto.",
  },
];

export default function ApproachCards() {
  return (
    <section className="approach-section">
      <div className="container">
        <div className="section-heading approach-heading">
          <h2>Nosso jeito único de trabalhar.</h2>
          <p>
            Teste seu futuro site antes de se comprometer. Protótipo grátis,
            orçamento sob medida para a produção.
          </p>
        </div>

        <div className="approach-grid">
          {items.map((item) => (
            <article className="approach-card" key={item.title}>
              <span className="approach-card-icon">
                <item.icon size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
