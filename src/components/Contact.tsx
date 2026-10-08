"use client";

import { useState } from "react";
import { enviarLead } from "@/lib/lead-intake";
import { siteConfig, whatsappUrl } from "@/lib/site";

type FormState = {
  name: string;
  company: string;
  whatsapp: string;
  moment: string;
  challenge: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  whatsapp: "",
  moment: "",
  challenge: "",
  website: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "opening" | "opened">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("opening");

    const message = [
      "Olá, Avila Ops! Quero mapear a operação digital da minha empresa.",
      "",
      `Nome: ${form.name}`,
      `Empresa: ${form.company}`,
      `WhatsApp: ${form.whatsapp || "não informado"}`,
      `Momento: ${form.moment}`,
      "",
      "Principal desafio:",
      form.challenge,
    ].join("\n");

    const dataLayerWindow = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
    };
    dataLayerWindow.dataLayer?.push({
      event: "generate_lead",
      lead_type: "diagnostico_operacao",
      business_moment: form.moment,
    });

    void enviarLead(form);
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setStatus("opened");
    window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <section className="contact-section" id="diagnostico">
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="section-index">Uma conversa para começar</span>
          <h1>Vamos transformar sua próxima ideia em uma operação digital.</h1>
          <p>
            Conte onde sua empresa está agora. A conversa começa pelo problema,
            pelos custos invisíveis e pelas oportunidades que já existem no
            negócio.
          </p>

          <div className="contact-promises">
            <div>
              <span>01</span>
              <p>Leitura inicial do cenário</p>
            </div>
            <div>
              <span>02</span>
              <p>Prioridades por impacto</p>
            </div>
            <div>
              <span>03</span>
              <p>Próximo passo sem pacote genérico</p>
            </div>
          </div>

          <div className="direct-contact">
            <span>Prefere falar direto?</span>
            <a href={whatsappUrl("Olá, Avila Ops! Quero conversar sobre minha operação digital.")}>
              WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>

        <form className="diagnostic-form" onSubmit={handleSubmit}>
          <div className="form-head">
            <span>DIAGNÓSTICO INICIAL</span>
            <i>
              <b />
              atendimento humano
            </i>
          </div>

          <label
            className="form-honeypot"
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              whiteSpace: "nowrap",
            }}
          >
            Não preencha este campo
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </label>

          <div className="form-grid">
            <label>
              <span>Seu nome *</span>
              <input
                required
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Como podemos chamar você?"
              />
            </label>
            <label>
              <span>Empresa *</span>
              <input
                required
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                placeholder="Nome da empresa"
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              <span>WhatsApp</span>
              <input
                value={form.whatsapp}
                onChange={(event) => update("whatsapp", event.target.value)}
                placeholder="(17) 99999-0000"
                inputMode="tel"
              />
            </label>
            <label>
              <span>Momento da empresa *</span>
              <select
                required
                value={form.moment}
                onChange={(event) => update("moment", event.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option>Começando a presença digital</option>
                <option>Organizando uma operação existente</option>
                <option>Querendo vender mais</option>
                <option>Automatizando processos</option>
                <option>Escalando o negócio</option>
              </select>
            </label>
          </div>

          <label>
            <span>O que hoje mais limita o negócio? *</span>
            <textarea
              required
              rows={5}
              value={form.challenge}
              onChange={(event) => update("challenge", event.target.value)}
              placeholder="Ex.: perdemos contatos, fazemos muito trabalho manual, os sistemas não conversam..."
            />
          </label>

          <button className="button button-large form-submit" type="submit">
            {status === "opening"
              ? "Preparando conversa..."
              : status === "opened"
                ? "WhatsApp aberto ✓"
                : "Mapear minha operação"}
            <span aria-hidden="true">↗</span>
          </button>
          <small>
            Seus dados serão usados apenas para preparar a conversa no
            WhatsApp. Nenhuma mensagem é enviada sem sua ação.
          </small>
        </form>
      </div>
    </section>
  );
}
