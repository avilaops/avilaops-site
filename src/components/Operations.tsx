import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import "./jornada-servicos.css";

const journey = [
  {
    number: "01",
    title: "Conte sua ideia.",
    description:
      "O que você faz, quem quer alcançar e o que precisa melhorar. Seu resumo dá o ponto de partida para o projeto.",
    output: "Uma direção para o seu negócio",
  },
  {
    number: "02",
    title: "Veja e ajuste.",
    description:
      "Conheça o protótipo gratuito e participe dos ajustes. Escopo, investimento e próximos passos ficam combinados antes de seguir.",
    output: "Um protótipo para decidir",
  },
  {
    number: "03",
    title: "Publique e evolua.",
    description:
      "Com a proposta aprovada, colocamos o projeto em prática. Depois da publicação, você pode seguir com suporte e melhorias.",
    output: "Seu negócio pronto para o próximo passo",
  },
];

export default function Operations() {
  return (
    <>
      <section className="js-hero js-journey-hero" aria-labelledby="jornada-title">
        <div className="container js-hero-grid">
          <div className="js-hero-copy">
            <span className="js-eyebrow"><i aria-hidden="true" /> A sua próxima conquista começa aqui</span>
            <h1 id="jornada-title">Uma boa ideia.<br /><em>Um novo começo.</em></h1>
            <p>Colocar sua empresa no digital pode ser mais simples. Conte o que imagina e vamos dar forma ao próximo passo.</p>
            <div className="js-actions">
              <Link className="js-button" href="/criar-meu-resumo/" prefetch={false}>Contar minha ideia <ArrowUpRight size={19} aria-hidden="true" /></Link>
              <a className="js-text-link" href="#jornada">Como acontece <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="js-hero-art">
            <div className="js-image-wrap">
              <Image src="/media/vida/jornada-v2.webp" alt="Empreendedores construindo juntos o próximo passo de uma empresa, em um ambiente criativo e iluminado." width={1200} height={900} priority sizes="(max-width: 760px) 100vw, 52vw" />
            </div>
            <span className="js-image-note"><span aria-hidden="true">✳</span> A ideia é sua. A construção é com a gente.</span>
          </div>
        </div>
      </section>

      <section className="js-journey" id="jornada" aria-labelledby="jornada-steps-title">
        <div className="container">
          <div className="js-section-heading">
            <span className="js-eyebrow">A jornada, em três passos</span>
            <h2 id="jornada-steps-title">Do “e se?” ao <em>“está no ar”.</em></h2>
          </div>
          <ol className="js-step-list">
            {journey.map((item) => (
              <li className="js-step" key={item.number}>
                <span className="js-step-number" aria-hidden="true">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="js-step-output"><Check size={16} aria-hidden="true" />{item.output}</span>
              </li>
            ))}
          </ol>
          <div className="js-journey-close">
            <div><span className="js-eyebrow">Você já tem por onde começar</span><h3>Não precisa chegar com tudo pronto.</h3><p>Uma ideia, uma dificuldade ou um objetivo já abrem a conversa.</p></div>
            <Link className="js-button" href="/criar-meu-resumo/" prefetch={false}>Criar meu resumo <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
