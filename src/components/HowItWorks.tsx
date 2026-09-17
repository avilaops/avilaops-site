import Image from "next/image";
import Link from "next/link";

const steps = [
  { title: "Conte sua ideia.", description: "Seu negócio, seu público e o que você quer conquistar. Esse é o ponto de partida." },
  { title: "Veja e ajuste.", description: "Conheça o protótipo. Alinhamos o escopo e o investimento antes de seguir." },
  { title: "Publique e evolua.", description: "Com a proposta aprovada, construímos o projeto. Suporte e melhorias podem acompanhar a próxima fase." },
];

export default function HowItWorks() {
  return (
    <section className="vida-journey" aria-labelledby="home-journey-title">
      <div className="container vida-journey-grid">
        <div className="vida-journey-intro">
          <span className="vida-eyebrow">A jornada, sem complicação</span>
          <h2 id="home-journey-title">Uma boa conversa.<br /><em>Três passos.</em></h2>
          <Image src="/media/vida/jornada-v2.webp" alt="Cena ilustrativa de um projeto ganhando forma entre esboços, computador e conversa." width={1536} height={1024} sizes="(max-width: 800px) 100vw, 42vw" />
        </div>
        <div>
          <ol className="vida-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
          <Link className="vida-link" href="/jornada/" prefetch={false}>Ver como acontece <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
