import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import "./segmentos-comparativos.css";

const criteria = [
  {
    label: "O que está incluído",
    question: "Quais páginas, conteúdos e integrações fazem parte da entrega?",
    agreement: "Escopo escrito, com entregas e custos adicionais identificados.",
  },
  {
    label: "Como você aprova",
    question: "Em que momento posso ver, testar e pedir ajustes?",
    agreement: "Etapas de aprovação e quantidade de revisões combinadas antes de começar.",
  },
  {
    label: "O que fica com você",
    question: "Quem controla meu domínio, meus acessos e meu conteúdo?",
    agreement: "Titularidade, acessos e condições de transferência descritos na proposta.",
  },
  {
    label: "Depois da publicação",
    question: "Quem cuida das atualizações e quanto custa manter tudo funcionando?",
    agreement: "Suporte, manutenção, mensalidades e regras de cancelamento claros.",
  },
];

export default function Comparison() {
  return (
    <section className="sc-criteria" id="comparativo" aria-labelledby="sc-criteria-title">
      <div className="container">
        <div className="sc-section-heading">
          <span className="sc-eyebrow">Leve estas perguntas para qualquer proposta</span>
          <h2 id="sc-criteria-title">Compare o combinado. Escolha com clareza.</h2>
          <p>Agências, profissionais independentes e plataformas podem ser boas escolhas. O que importa é como cada proposta atende ao seu negócio.</p>
        </div>
        <div className="sc-criteria-list">
          {criteria.map((criterion, index) => (
            <article className="sc-criterion" key={criterion.label}>
              <div className="sc-criterion-name">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{criterion.label}</h3>
              </div>
              <p className="sc-criterion-question">{criterion.question}</p>
              <p className="sc-criterion-agreement"><Check size={17} aria-hidden="true" />{criterion.agreement}</p>
            </article>
          ))}
        </div>
        <div className="sc-criteria-bottom">
          <p>Na conversa com a Avila Ops, comece pelo que sua empresa precisa resolver. A proposta deve deixar o próximo passo claro.</p>
          <Link className="sc-text-link" href="/criar-meu-resumo/" prefetch={false}>
            Organizar minha ideia<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
