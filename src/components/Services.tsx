import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./jornada-servicos.css";

const solutionAreas = [
  {
    number: "01",
    title: "Quero ser encontrado.",
    description: "Uma marca que faz sentido, um site que apresenta bem a empresa e presença nas buscas de quem precisa de você.",
    items: "Identidade visual · Sites · SEO e presença local",
    href: "#catalogo-presenca",
    label: "Construir minha presença",
  },
  {
    number: "02",
    title: "Quero vender melhor.",
    description: "Um caminho claro entre conhecer seu negócio e comprar: da página de vendas ao catálogo, contato e pagamento.",
    items: "Landing pages · Lojas virtuais · WhatsApp",
    href: "#catalogo-site",
    label: "Preparar meus canais de venda",
  },
  {
    number: "03",
    title: "Quero ganhar tempo.",
    description: "Formulários, atendimento e sistemas conectados para sua equipe gastar menos energia com tarefas repetidas.",
    items: "Automações · Integrações · Atendimento",
    href: "#catalogo-automacoes",
    label: "Organizar minha rotina",
  },
  {
    number: "04",
    title: "Quero continuar crescendo.",
    description: "Cuidado com o que já está no ar e dados para entender quais melhorias merecem o próximo investimento.",
    items: "Manutenção · Métricas · Marketing",
    href: "#catalogo-crescimento",
    label: "Cuidar do próximo passo",
  },
];

export default function Services() {
  return (
    <>
      <section className="js-hero js-services-hero" aria-labelledby="servicos-title">
        <div className="container js-hero-grid">
          <div className="js-hero-copy">
            <span className="js-eyebrow"><i aria-hidden="true" /> Ideias boas merecem ganhar o mundo</span>
            <h1 id="servicos-title">Seu negócio tem<br /><em>muito pela frente.</em></h1>
            <p>Site, marca, vendas e atendimento. Escolha o que sua empresa precisa agora e encontre espaço para crescer.</p>
            <div className="js-actions">
              <Link className="js-button" href="/criar-meu-resumo/" prefetch={false}>Encontrar meu próximo passo <ArrowUpRight size={19} aria-hidden="true" /></Link>
              <a className="js-text-link" href="#solucoes">Explorar serviços <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="js-hero-art">
            <div className="js-image-wrap">
              <Image src="/media/vida/servicos-v2.webp" alt="Cena criativa de um pequeno negócio com produtos, identidade visual e ferramentas digitais em cores vivas." width={1200} height={900} priority sizes="(max-width: 760px) 100vw, 52vw" />
            </div>
            <span className="js-image-note"><span aria-hidden="true">✳</span> Mais presença. Mais possibilidades.</span>
          </div>
        </div>
      </section>
      <section className="js-solutions" id="solucoes" aria-labelledby="servicos-direcao-title">
        <div className="container js-solutions-layout">
          <div className="js-section-heading">
            <span className="js-eyebrow">Comece pelo que importa para você</span>
            <h2 id="servicos-direcao-title">O que você quer<br /><em>fazer acontecer?</em></h2>
            <p>Você não precisa saber o nome de cada ferramenta. O seu objetivo ajuda a escolher a solução.</p>
            <Link className="js-text-link" href="/criar-meu-resumo/" prefetch={false}>Me ajude a escolher <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="js-solution-list">
            {solutionAreas.map((solution) => (
              <article className="js-solution" key={solution.number}>
                <span className="js-solution-number" aria-hidden="true">{solution.number}</span>
                <div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <span className="js-solution-items">{solution.items}</span>
                  <a className="js-text-link" href={solution.href}>{solution.label}<ArrowDown size={15} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
