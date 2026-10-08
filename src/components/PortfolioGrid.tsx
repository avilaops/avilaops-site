"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  ExternalLink,
  PawPrint,
  Ruler,
  ShoppingCart,
  X,
  type LucideIcon,
} from "lucide-react";

type Project = {
  slug: string;
  name: string;
  category: string;
  url: string;
  icon: LucideIcon;
  /** Uma linha para o card: o que foi entregue, em palavras de quem contrata. */
  delivered: string;
  description: string;
  /** O que o site realmente tem. Nada de métrica de resultado do cliente. */
  highlights: string[];
  /** Só texto que o cliente escreveu, o mesmo de Testimonials.tsx. */
  testimonial?: { quote: string; author: string };
};

const projects: Project[] = [
  {
    slug: "brilhax",
    name: "Brilhax",
    category: "E-commerce",
    url: "https://brilhax.com",
    icon: ShoppingCart,
    delivered: "Loja com catálogo e venda pelo WhatsApp",
    testimonial: {
      quote:
        "Quando entrei pelo PC agora... ficou brabo demais! Ficou top, mano. Obrigado pelo trabalho, satisfação total.",
      author: "Lucas, Brilhax",
    },
    description:
      "Loja de produtos para estética automotiva, com catálogo, alternância entre tema claro e escuro e a venda conduzida pelo WhatsApp.",
    highlights: [
      "Catálogo de produtos",
      "Venda pelo WhatsApp",
      "Tema claro e escuro",
    ],
  },
  {
    slug: "cifra",
    name: "CIFRA",
    category: "Consultoria tributária",
    url: "https://cifrainssdeobras.com.br",
    icon: Calculator,
    delivered: "Site que já abre no formulário de análise",
    description:
      "Consultoria de INSS de obra e regularização tributária. A primeira tela já abre o formulário de análise, e a calculadora roda em subdomínio próprio.",
    highlights: [
      "Formulário de análise na primeira tela",
      "Calculadora em subdomínio próprio",
      "Área de cliente",
    ],
  },
  {
    slug: "maprojetos",
    name: "M.A. Projetos",
    category: "Arquitetura e engenharia",
    url: "https://maprojetos.com.br",
    icon: Ruler,
    delivered: "Galeria de obras com página para cada projeto",
    description:
      "Arquitetura, construção e regularização de imóveis, com galeria de obras e uma página dedicada a cada projeto.",
    highlights: [
      "Galeria de obras",
      "Página por projeto",
      "Solicitação de orçamento",
    ],
  },
  {
    slug: "saudepet",
    name: "Saúde Pet",
    category: "Veterinária",
    url: "https://saudepet.app.br",
    icon: PawPrint,
    delivered: "Plataforma com acesso do cliente e painel",
    testimonial: {
      quote:
        "O desenvolvedor entendeu a ideia desde o começo, teve paciência com os ajustes e entregou um site do jeito que eu imaginava.",
      author: "Abraão Santos, Saúde Pet Brasil",
    },
    description:
      "Plataforma de atendimento veterinário domiciliar, com acesso do cliente, painel administrativo e conteúdo de apoio.",
    highlights: ["Acesso do cliente", "Painel administrativo", "Blog e FAQ"],
  },
];

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 960;

export default function PortfolioGrid() {
  const [active, setActive] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // O portal so pode ser criado depois da hidratacao, quando `document` existe.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // <dialog> nativo em vez de div: traz Escape, foco preso e ::backdrop de
  // graça, sem reimplementar acessibilidade de modal à mão.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  const close = useCallback(() => setActive(null), []);

  const dialog = (
    <dialog
      className="portfolio-dialog"
      ref={dialogRef}
      onClose={close}
      // Clique no ::backdrop chega aqui com target === o próprio <dialog>;
      // clique no conteúdo tem target interno. Comparar os dois é mais
      // robusto que parar a propagação no filho.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      aria-label={active ? `Prévia do site de ${active.name}` : undefined}
    >
      {active ? (
        <div className="portfolio-dialog-inner">
          <button
            type="button"
            className="portfolio-dialog-close"
            onClick={close}
            aria-label="Fechar prévia"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>

          <Image
            className="portfolio-dialog-preview"
            src={`/portfolio/${active.slug}.jpg`}
            alt={`Prévia do site de ${active.name}`}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            priority
          />

          <div className="portfolio-dialog-body">
            <div className="portfolio-dialog-identity">
              <span className="portfolio-dialog-icon">
                <active.icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <strong>{active.name}</strong>
                <small>{active.category}</small>
              </span>
            </div>

            <p>{active.description}</p>

            <ul className="portfolio-dialog-highlights">
              {active.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {active.testimonial ? (
              <figure className="portfolio-dialog-quote">
                <blockquote>{active.testimonial.quote}</blockquote>
                <figcaption>{active.testimonial.author}</figcaption>
              </figure>
            ) : null}

            <div className="portfolio-dialog-actions">
              <a
                className="portfolio-dialog-visit"
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                Visitar o site
              </a>
              <Link className="portfolio-dialog-similar" href="/contato/" prefetch={false}>
                Quero um projeto parecido
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );

  return (
    <section className="portfolio-section">
      <div className="container">
        <div className="section-heading portfolio-heading">
          <span className="section-index">Projetos reais, negócios de verdade</span>
          <h2>Ideias que já ganharam o mundo.</h2>
          <p>
            Quatro negócios que já estão no ar com a gente. Abra um deles para
            ver o que foi feito, visitar o site ou pedir algo parecido.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <button
              type="button"
              className="portfolio-card"
              key={project.slug}
              onClick={() => setActive(project)}
              aria-label={`Ver prévia do site de ${project.name}`}
            >
              <span className="portfolio-card-frame">
                <Image
                  src={`/portfolio/${project.slug}.jpg`}
                  alt={`Prévia do site de ${project.name}`}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  loading="lazy"
                />
              </span>
              <span className="portfolio-card-label">
                <span className="portfolio-card-text">
                  <small>{project.category}</small>
                  <strong>{project.name}</strong>
                  <span>{project.delivered}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/*
        Portal para o <body>: a home envolve cada seção em <Reveal>, que aplica
        `transform`. Transform diferente de `none` cria containing block para
        descendente `position: fixed`, e dentro da seção o dialog se posicionava
        contra o wrapper do Reveal em vez da viewport — aparecia grudado no
        canto superior esquerdo, com a largura errada.
      */}
      {mounted ? createPortal(dialog, document.body) : null}
    </section>
  );
}
