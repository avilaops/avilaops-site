import Image from "next/image";
import Link from "next/link";

const paths = [
  { href: "/comparativos/", tag: "Escolha com clareza", title: "Qual caminho combina com você?", description: "Entenda o que avaliar antes de escolher um site, uma plataforma ou um parceiro.", image: "comparativos-v2", alt: "Cena ilustrativa de empreendedoras comparando alternativas visuais para um projeto." },
  { href: "/segmentos/", tag: "O seu tipo de negócio", title: "Cada empresa tem seu jeito.", description: "Do comércio à indústria: veja como o digital pode ajudar na sua realidade.", image: "segmentos-v2", alt: "Cena ilustrativa de empreendedores de diferentes negócios em um espaço comercial." },
];

export default function HomeExplore() {
  return (
    <section className="vida-explore" aria-labelledby="home-services-title">
      <div className="container">
        <div className="vida-services-feature">
          <div className="vida-services-image">
            <Image src="/media/vida/servicos-v2.webp" alt="Composição ilustrativa de identidade visual, embalagens, site e catálogo de uma marca." width={1536} height={1024} sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="vida-services-copy">
            <span className="vida-eyebrow">Do primeiro site ao próximo salto</span>
            <h2 id="home-services-title">Comece pelo que<br /><em>faz diferença.</em></h2>
            <p>Uma vitrine para apresentar seu trabalho. Uma loja para vender. Uma identidade para ser lembrada. Você não precisa fazer tudo de uma vez.</p>
            <ul className="vida-service-list">
              <li><span>01</span> Sites, lojas e páginas de venda</li>
              <li><span>02</span> Identidade visual e presença digital</li>
              <li><span>03</span> Atendimento, integrações e suporte</li>
            </ul>
            <Link className="vida-link" href="/servicos/" prefetch={false}>Encontrar meu próximo passo <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="vida-paths">
          {paths.map((item) => (
            <Link className="vida-path" key={item.href} href={item.href} prefetch={false}>
              <div className="vida-path-image"><Image src={`/media/vida/${item.image}.webp`} alt={item.alt} width={1536} height={1024} sizes="(max-width: 680px) 100vw, 46vw" /></div>
              <div className="vida-path-copy"><span className="vida-eyebrow">{item.tag}</span><h3>{item.title}<span aria-hidden="true">↗</span></h3><p>{item.description}</p></div>
            </Link>
          ))}
        </div>
        <div className="vida-guides-link">
          <span aria-hidden="true">↳</span>
          <p><strong>Ainda está pesquisando?</strong> Nossos guias respondem às dúvidas de quem vai criar um site: tipo, custo, domínio e o que contratar.</p>
          <Link className="vida-link" href="/guias/" prefetch={false}>Ler os guias <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
