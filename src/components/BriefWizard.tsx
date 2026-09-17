"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Wrench, MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/site";
import VoiceInput from "@/components/VoiceInput";

type Familiarity = "novo" | "basico" | "experiente";
type SiteType =
  | "Institucional"
  | "Loja virtual"
  | "Landing page para captar clientes"
  | "Sistema ou área de cliente"
  | "Não sei ainda";
type Moment =
  | "Começando a presença digital"
  | "Organizando uma operação existente"
  | "Querendo vender mais"
  | "Automatizando processos"
  | "Escalando o negócio";
type Timeline = "Preciso para ontem" | "Nas próximas semanas" | "Sem pressa, quero fazer certo";

type BriefState = {
  familiarity: Familiarity | null;
  siteType: SiteType | null;
  moment: Moment | null;
  challenge: string;
  timeline: Timeline | null;
  name: string;
  company: string;
  whatsapp: string;
};

const initialState: BriefState = {
  familiarity: null,
  siteType: null,
  moment: null,
  challenge: "",
  timeline: null,
  name: "",
  company: "",
  whatsapp: "",
};

const familiarityOptions: {
  value: Familiarity;
  icon: typeof Sparkles;
  title: string;
  description: string;
}[] = [
  {
    value: "novo",
    icon: Sparkles,
    title: "Sou novo nisso",
    description: "Nunca criei um site e não estou familiarizado com termos técnicos.",
  },
  {
    value: "basico",
    icon: BookOpen,
    title: "Tenho um pouco de conhecimento",
    description: "Já tive um site antes e entendo o básico da internet.",
  },
  {
    value: "experiente",
    icon: Wrench,
    title: "Tenho experiência",
    description: "Trabalho com digital e tenho uma sólida experiência técnica.",
  },
];

const siteTypeOptions: SiteType[] = [
  "Institucional",
  "Loja virtual",
  "Landing page para captar clientes",
  "Sistema ou área de cliente",
  "Não sei ainda",
];

const momentOptions: Moment[] = [
  "Começando a presença digital",
  "Organizando uma operação existente",
  "Querendo vender mais",
  "Automatizando processos",
  "Escalando o negócio",
];

const timelineOptions: Timeline[] = [
  "Preciso para ontem",
  "Nas próximas semanas",
  "Sem pressa, quero fazer certo",
];

const totalSteps = 6;

async function notifyLeadIntake(payload: Record<string, unknown>) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4000);

  try {
    await fetch(siteConfig.leadIntakeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch {
    // Best-effort: se a captura falhar, o WhatsApp continua sendo o caminho principal.
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function BriefWizard() {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<BriefState>(initialState);
  const [status, setStatus] = useState<"idle" | "opening" | "opened">("idle");

  function update<K extends keyof BriefState>(key: K, value: BriefState[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  /**
   * Encaixa o que foi ditado no que ja estava escrito, em vez de trocar o
   * texto: a pessoa pode alternar entre teclado e microfone na mesma
   * resposta, e o ditado chega em trechos conforme ela fala.
   */
  function appendChallenge(trecho: string) {
    const limpo = trecho.trim();
    if (!limpo) return;

    setBrief((current) => {
      const atual = current.challenge.trimEnd();
      return {
        ...current,
        challenge: atual ? `${atual} ${limpo}` : limpo,
      };
    });
  }

  function goNext() {
    setStep((current) => Math.min(current + 1, totalSteps));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return brief.familiarity !== null;
      case 2:
        return brief.siteType !== null;
      case 3:
        return brief.moment !== null;
      case 4:
        return brief.challenge.trim().length > 0;
      case 5:
        return brief.timeline !== null;
      default:
        return true;
    }
  }

  function handleSubmit() {
    setStatus("opening");

    const familiarityLabel =
      familiarityOptions.find((option) => option.value === brief.familiarity)?.title ?? "";

    const message = [
      "Olá, Avila Ops! Preparei meu resumo para começar o projeto.",
      "",
      `Nome: ${brief.name}`,
      `Empresa: ${brief.company}`,
      `WhatsApp: ${brief.whatsapp || "não informado"}`,
      "",
      `Familiaridade com sites: ${familiarityLabel}`,
      `Tipo de site: ${brief.siteType}`,
      `Momento do negócio: ${brief.moment}`,
      `Prazo: ${brief.timeline}`,
      "",
      "Principal desafio:",
      brief.challenge,
    ].join("\n");

    const dataLayerWindow = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
    };
    dataLayerWindow.dataLayer?.push({
      event: "generate_lead",
      lead_type: "criar_meu_resumo",
      familiarity: brief.familiarity,
      site_type: brief.siteType,
      business_moment: brief.moment,
      timeline: brief.timeline,
    });

    void notifyLeadIntake({
      source: "criar_meu_resumo",
      ...brief,
    });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setStatus("opened");
  }

  return (
    <section className="brief-section">
      <div className="container brief-layout">
        <div className="brief-progress" aria-label={`Etapa ${step} de ${totalSteps}`}>
          <div className="brief-progress-track">
            <span style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
          <span className="brief-progress-label">
            Etapa {step} de {totalSteps}
          </span>
        </div>

        {step === 1 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>Qual é o seu nível de familiaridade com a criação de sites?</h1>
              <p>O formulário se adapta automaticamente ao seu perfil.</p>
            </div>

            <div className="brief-options brief-options-cards">
              {familiarityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`brief-card${brief.familiarity === option.value ? " selected" : ""}`}
                  onClick={() => update("familiarity", option.value)}
                  aria-pressed={brief.familiarity === option.value}
                >
                  <span className="brief-card-icon">
                    <option.icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <strong>{option.title}</strong>
                  <p>{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>Que tipo de site você precisa?</h1>
              <p>Se ainda não sabe, sem problema — a gente ajuda a decidir.</p>
            </div>

            <div className="brief-options brief-options-list">
              {siteTypeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`brief-list-option${brief.siteType === option ? " selected" : ""}`}
                  onClick={() => update("siteType", option)}
                  aria-pressed={brief.siteType === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>Qual o momento atual do seu negócio?</h1>
              <p>Isso ajuda a priorizar o que realmente importa agora.</p>
            </div>

            <div className="brief-options brief-options-list">
              {momentOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`brief-list-option${brief.moment === option ? " selected" : ""}`}
                  onClick={() => update("moment", option)}
                  aria-pressed={brief.moment === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>O que hoje mais limita o seu negócio?</h1>
              <p>Conte com suas palavras — quanto mais detalhe, melhor a leitura.</p>
            </div>

            <textarea
              id="brief-challenge"
              className="brief-textarea"
              rows={6}
              value={brief.challenge}
              onChange={(event) => update("challenge", event.target.value)}
              placeholder="Ex.: perdemos contatos, fazemos muito trabalho manual, os sistemas não conversam..."
            />

            <VoiceInput controls="brief-challenge" onTranscription={appendChallenge} />
          </div>
        )}

        {step === 5 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>Qual o seu prazo?</h1>
              <p>Vamos organizar o ritmo do projeto de acordo com sua urgência.</p>
            </div>

            <div className="brief-options brief-options-list">
              {timelineOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`brief-list-option${brief.timeline === option ? " selected" : ""}`}
                  onClick={() => update("timeline", option)}
                  aria-pressed={brief.timeline === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="brief-step">
            <div className="brief-step-heading">
              <h1>Últimos dados para fechar o seu resumo</h1>
              <p>Vamos abrir o WhatsApp com tudo pronto para você enviar.</p>
            </div>

            <div className="brief-contact-grid">
              <label>
                <span>Seu nome *</span>
                <input
                  required
                  value={brief.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Como podemos chamar você?"
                />
              </label>
              <label>
                <span>Empresa *</span>
                <input
                  required
                  value={brief.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="Nome da empresa"
                />
              </label>
              <label>
                <span>WhatsApp</span>
                <input
                  value={brief.whatsapp}
                  onChange={(event) => update("whatsapp", event.target.value)}
                  placeholder="(17) 99999-0000"
                  inputMode="tel"
                />
              </label>
            </div>

            <button
              className="button button-large brief-submit"
              type="button"
              disabled={!brief.name.trim() || !brief.company.trim()}
              onClick={handleSubmit}
            >
              {status === "opening"
                ? "Preparando conversa..."
                : status === "opened"
                  ? "WhatsApp aberto ✓"
                  : "Enviar meu resumo"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}

        <div className="brief-footer">
          <p className="brief-direct-contact">
            <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
            Prefere conversar direto?{" "}
            <a href={whatsappUrl("Olá, Avila Ops! Quero conversar sobre o meu projeto.")}>
              Falar comigo diretamente
            </a>
          </p>

          <div className="brief-nav">
            {step > 1 ? (
              <button className="button button-secondary" type="button" onClick={goBack}>
                <span aria-hidden="true">←</span> Voltar
              </button>
            ) : (
              <Link className="button button-secondary" href="/">
                <span aria-hidden="true">←</span> Voltar ao início
              </Link>
            )}

            {step < totalSteps && (
              <button
                className="button"
                type="button"
                disabled={!canAdvance()}
                onClick={goNext}
              >
                Próximo <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
