"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const items = [
  {
    question: "O protótipo é realmente grátis?",
    answer:
      "Sim. O protótipo inicial é gratuito e ajuda você a visualizar a ideia. O desenvolvimento completo é contratado à parte, com escopo, valor e prazo combinados antes de começar.",
  },
  {
    question: "Quanto custa o desenvolvimento completo do site?",
    answer:
      "Varia pelo tipo de site e pela complexidade do projeto. Você recebe um orçamento fechado assim que aprova o protótipo — sem letra miúda.",
  },
  {
    question: "Como escolher o tipo de site certo para minha empresa?",
    answer:
      "Depende do seu objetivo. Para apresentar a empresa, um site institucional. Para uma campanha ou oferta específica, uma landing page. Para vender produtos, uma loja ou catálogo. Se precisa de acesso de clientes e processos próprios, avaliamos um portal ou software sob medida. Os guias e comparativos explicam essas escolhas.",
  },
  {
    question: "Depois que eu aprovo o protótipo, quanto tempo leva o desenvolvimento?",
    answer:
      "O prazo é combinado junto com o orçamento, conforme a complexidade do projeto — sem promessa genérica de prazo igual para todo mundo.",
  },
  {
    question: "A Avila Ops atende só Ribeirão Preto?",
    answer:
      "Não. O atendimento é remoto e cobre qualquer cidade do Brasil. Ribeirão Preto é a base da equipe, não um limite de atendimento.",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: `Pelo WhatsApp (${siteConfig.phoneDisplay}) ou pelo e-mail ${siteConfig.email}.`,
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="home-faq-section">
      <div className="container">
        <div className="section-heading home-faq-heading">
          <span className="section-index">Dúvidas de quem empreende</span>
          <h2>Boas decisões começam com boas respostas.</h2>
        </div>

        <div className="home-faq-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div className={`home-faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="home-faq-question"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`home-faq-answer-${index}`}
                >
                  {item.question}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                <p id={`home-faq-answer-${index}`} className="home-faq-answer" hidden={!isOpen}>{item.answer}</p>
              </div>
            );
          })}
        </div>

        <Link className="text-link" href="/traduzindo/" prefetch={false}>
          Conhecer o Traduzindo
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
