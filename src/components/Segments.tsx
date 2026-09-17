import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./segmentos-comparativos.css";

const segments = [
  {
    name: "Serviços profissionais",
    image: "servicos",
    alt: "Profissionais conversando sobre o atendimento e a presença digital do negócio",
    opportunity: "Seu próximo cliente precisa confiar em você.",
    description: "Apresente sua especialidade, mostre seu trabalho e dê ao interessado um caminho simples para pedir um orçamento.",
    examples: ["Site profissional", "Portfólio", "Contato pelo WhatsApp"],
    href: "/presenca-digital-para-pequenas-empresas/",
    link: "Dar mais presença ao meu serviço",
  },
  {
    name: "Indústria e manutenção",
    image: "industria",
    alt: "Equipe de uma pequena indústria organizando o trabalho na oficina",
    opportunity: "Transforme conhecimento técnico em novos pedidos.",
    description: "Organize produtos, aplicações e serviços para o comprador encontrar o que precisa e chegar com um pedido mais claro.",
    examples: ["Catálogo técnico", "Pedido de orçamento", "Acompanhamento comercial"],
    href: "/automatizar-minha-empresa/",
    link: "Organizar minha operação comercial",
  },
  {
    name: "Logística regional",
    image: "logistica",
    alt: "Pessoas preparando encomendas para uma operação de entregas regional",
    opportunity: "Uma boa entrega começa no primeiro contato.",
    description: "Deixe claras as regiões atendidas, reúna os dados da cotação e facilite a conversa entre sua equipe e quem precisa enviar.",
    examples: ["Áreas de atendimento", "Solicitação de cotação", "Atualizações ao cliente"],
    href: "/automatizar-whatsapp/",
    link: "Facilitar cotações e atendimento",
  },
  {
    name: "Alimentação e fitness",
    image: "alimentacao",
    alt: "Empreendedores de alimentação apresentando produtos frescos em um ambiente acolhedor",
    opportunity: "Dê vontade de conhecer. E motivos para voltar.",
    description: "Valorize o que você oferece com boas imagens, informações fáceis de encontrar e um caminho direto para pedir ou agendar.",
    examples: ["Cardápio ou catálogo", "Pedidos e agendamentos", "Relacionamento"],
    href: "/servicos/",
    link: "Encontrar a solução para meu negócio",
  },
  {
    name: "Construção e consultoria",
    image: "construcao",
    alt: "Profissionais de construção e consultoria analisando um projeto juntos",
    opportunity: "Mostre o cuidado que existe em cada projeto.",
    description: "Apresente projetos, explique seu processo e ajude o cliente a entender o que precisa antes de começar uma conversa.",
    examples: ["Projetos e serviços", "Briefing inicial", "Proposta e acompanhamento"],
    href: "/presenca-digital-para-pequenas-empresas/",
    link: "Valorizar meus projetos no digital",
  },
  {
    name: "Comércio e e-commerce",
    image: "comercio",
    alt: "Empreendedores de comércio cuidando de produtos e pedidos da loja",
    opportunity: "Sua vitrine pode ir muito além da sua rua.",
    description: "Apresente seus produtos, facilite o pedido e conecte sua loja à rotina de quem compra pelo celular.",
    examples: ["Vitrine online", "Catálogo de produtos", "Pedidos pelo celular"],
    href: "/servicos/",
    link: "Levar minha loja para o digital",
  },
];

export default function Segments() {
  return (
    <section className="sc-segments" id="seu-segmento" aria-labelledby="sc-segments-title">
      <div className="container">
        <div className="sc-section-heading">
          <span className="sc-eyebrow">Encontre seu ponto de partida</span>
          <h2 id="sc-segments-title">O digital faz sentido quando faz parte da sua rotina.</h2>
          <p>Escolha o cenário mais próximo do seu negócio e veja o que podemos construir juntos.</p>
        </div>
        <div className="sc-segment-grid">
          {segments.map((segment, index) => (
            <article className="sc-segment" key={segment.name}>
              <div className="sc-segment-image">
                <Image
                  src={`/media/vida/segmento-${segment.image}-v2.webp`}
                  alt={segment.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <span className="sc-image-label">{String(index + 1).padStart(2, "0")} / {segment.name}</span>
              </div>
              <div className="sc-segment-copy">
                <h3>{segment.opportunity}</h3>
                <p>{segment.description}</p>
                <ul className="sc-tags" aria-label={`Possibilidades para ${segment.name.toLowerCase()}`}>
                  {segment.examples.map((example) => <li key={example}>{example}</li>)}
                </ul>
                <Link className="sc-text-link" href={segment.href}>
                  {segment.link}<ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="sc-next-step">
          <div>
            <span className="sc-eyebrow">A ideia começa com você</span>
            <h2>Seu negócio não cabe em uma categoria?</h2>
            <p>Conte o que você faz e o que quer melhorar. Esse é o melhor começo.</p>
          </div>
          <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>
            Contar minha ideia<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
