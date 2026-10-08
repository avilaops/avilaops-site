import { Quote, Star } from "lucide-react";
import { siteConfig } from "@/lib/site";

// Depoimentos de clientes. `quote` só é preenchido com texto que o cliente
// realmente escreveu. Entradas ainda sem autorização não aparecem no site.
type Testimonial = {
  name: string;
  role: string;
  quote?: string;
};

// Avaliações do perfil "Avila Ops Tecnologia" no Google Maps, copiadas
// palavra por palavra em 08/10/2026 (siteConfig.googleReviews guarda a nota e
// o total). Só entram as que têm texto sobre o trabalho; a terceira do perfil
// é um agradecimento de uma linha e conta apenas no total.
const googleReviews: Testimonial[] = [
  {
    name: "Guilherme Rosa Avila Barros",
    role: "Avaliação no Google",
    quote:
      "Empresa sensacional, atendimento personalizado e contato efetivo para solucionar todas as demandas para a minha empresa. Muito satisfeito com o atendimento nota MIL do Nícolas, que esclareceu todas as minhas dúvidas, e já montou um plano de trabalho espetacular para a minha empresa. Super recomendo!!",
  },
  {
    name: "Abraão Pereira",
    role: "Avaliação no Google",
    quote:
      "Minha experiência foi muito positiva! Desde o primeiro contato, fui muito bem atendido, com atenção e respeito. Fiquei muito satisfeito com o atendimento e com a experiência como um todo. Recomendo muito, principalmente para quem procura uma empresa de tecnologia!",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Lucas",
    role: "Fundador / Responsável — Brilhax",
    quote:
      "Ô mano, o site eu só tinha visto pelo celular, mas quando entrei pelo PC agora... ficou brabo demais! Ficou top, mano. Obrigado pelo trabalho, satisfação total.",
  },
  {
    name: "Abraão Santos",
    role: "Fundador / Responsável — Saúde Pet Brasil",
    quote:
      "Trabalhar com a Avila.ops é sempre muito divertido e muito tranquilo. O desenvolvedor entendeu a ideia desde o começo, teve paciência com os ajustes e entregou um site do jeito que eu imaginava. O site está lindo. Recomendo demais!",
  },
  {
    name: "Vinicius Ciccarelli",
    role: "Cifra INSS de Obras",
  },
  {
    name: "Matheus Amarante",
    role: "M.A. Projetos",
  },
  {
    name: "Arthur Moretto",
    role: "Tui Tecnologia",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-heading testimonials-heading">
          <span className="section-index">Quem construiu com a gente</span>
          <h2>O melhor retorno vem de quem vive o projeto.</h2>
          <a
            className="testimonials-google"
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="testimonials-google-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star size={16} strokeWidth={0} fill="currentColor" key={index} />
              ))}
            </span>
            <span>
              <strong>{siteConfig.googleReviews.rating} no Google</strong>
              {" · "}
              {siteConfig.googleReviews.count} avaliações
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="testimonials-grid">
          {[...testimonials, ...googleReviews].filter((testimonial) => testimonial.quote).map((testimonial) => (
            <article
              className={
                testimonial.quote
                  ? "testimonial-card"
                  : "testimonial-card testimonial-placeholder"
              }
              key={testimonial.name}
            >
              <Quote size={20} strokeWidth={1.75} aria-hidden="true" />
              {testimonial.quote ? (
                <blockquote>{testimonial.quote}</blockquote>
              ) : (
                <p>Depoimento a publicar após autorização do cliente.</p>
              )}
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
