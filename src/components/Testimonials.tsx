import { Quote } from "lucide-react";

// Depoimentos de clientes. `quote` só é preenchido com texto que o cliente
// realmente escreveu. Entradas ainda sem autorização não aparecem no site.
type Testimonial = {
  name: string;
  role: string;
  quote?: string;
};

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
        </div>

        <div className="testimonials-grid">
          {testimonials.filter((testimonial) => testimonial.quote).map((testimonial) => (
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
