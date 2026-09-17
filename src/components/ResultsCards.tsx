import { Users, ShieldCheck, Search, MousePointerClick, Clock, type LucideIcon } from "lucide-react";
import Link from "next/link";

const results: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Atraia mais clientes",
    description:
      "Esteja visível onde seus clientes já procuram você. Um site bem otimizado gera muito mais contato qualificado do que só um perfil de rede social.",
  },
  {
    icon: ShieldCheck,
    title: "Construa credibilidade",
    description:
      "Uma vitrine profissional que passa confiança antes da primeira conversa. A maioria dos clientes avalia a credibilidade de uma empresa pelo site.",
  },
  {
    icon: Search,
    title: "Apareça no Google",
    description:
      "Otimizado para SEO, pensado para aparecer bem posicionado nos resultados de busca — inclusive nas buscas com IA.",
  },
  {
    icon: MousePointerClick,
    title: "Converta visitantes",
    description:
      "Cada detalhe pensado para transformar uma visita em oportunidade de negócio: design, jornada e chamadas para ação.",
  },
  {
    icon: Clock,
    title: "Disponível 24 horas",
    description:
      "Seu melhor vendedor, que nunca dorme. Seu site mostra suas ofertas, responde dúvidas e capta contatos mesmo às 3 da manhã.",
  },
];

export default function ResultsCards() {
  return (
    <section className="results-section">
      <div className="container">
        <div className="section-heading results-heading">
          <h2>O que o seu site pode fazer por você</h2>
        </div>

        <div className="results-grid">
          {results.map((item) => (
            <article className="results-card" key={item.title}>
              <span className="results-card-icon">
                <item.icon size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <Link className="text-link" href="/servicos">
          Conhecer os serviços
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
