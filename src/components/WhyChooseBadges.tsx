import {
  Zap,
  Gift,
  Sparkles,
  Eye,
  Layers,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const items: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Zap,
    title: "Rápido",
    description: "Protótipo em 48h.",
  },
  {
    icon: Gift,
    title: "Grátis",
    description: "Sem compromisso.",
  },
  {
    icon: Sparkles,
    title: "Inteligente",
    description: "Análise de mercado por IA.",
  },
  {
    icon: Eye,
    title: "Transparente",
    description: "Preço claro, sem surpresas.",
  },
  {
    icon: Layers,
    title: "Sob medida",
    description: "Feito para o que você precisa.",
  },
  {
    icon: MessageCircle,
    title: "Com suporte",
    description: "Contato dedicado.",
  },
];

export default function WhyChooseBadges() {
  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="section-heading why-choose-heading">
          <span className="section-index">08 / Por que escolher</span>
          <h2>Por que escolher a Avila Ops?</h2>
        </div>

        <div className="why-choose-grid">
          {items.map((item) => (
            <div className="why-choose-item" key={item.title}>
              <span className="why-choose-icon">
                <item.icon size={17} strokeWidth={2} aria-hidden="true" />
              </span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <Link className="button button-large" href="/criar-meu-resumo">
          Quero meu protótipo grátis
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
