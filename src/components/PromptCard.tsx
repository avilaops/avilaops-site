"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { AiPrompt, PromptImage } from "@/lib/ai-prompts";

function CopyButton({ text, targetId }: { text: string; targetId: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Navegador sem permissão de clipboard: seleciona o texto para o
      // usuário copiar com Ctrl+C em vez de falhar em silêncio.
      const block = document.getElementById(targetId);
      if (block) {
        const range = document.createRange();
        range.selectNodeContents(block);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <button className="button button-small prompt-copy" type="button" onClick={copy}>
      {copied ? "Copiado" : "Copiar prompt"}
    </button>
  );
}

/**
 * Moldura de antes/depois. Fica vazia até `image` receber um arquivo real —
 * ver o comentário no topo de `src/lib/ai-prompts.ts`.
 */
function PromptFrame({
  label,
  image,
}: {
  label: string;
  image: PromptImage | null;
}) {
  return (
    <figure className={`prompt-frame ${image ? "has-image" : "is-empty"}`}>
      <span className="prompt-frame-label">
        {label}
        {image?.tool ? <em>{image.tool}</em> : null}
      </span>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.src} alt={image.alt} loading="lazy" />
      ) : (
        <span className="prompt-frame-empty" aria-hidden="true" />
      )}
    </figure>
  );
}

export default function PromptCard({
  prompt,
  index,
}: {
  prompt: AiPrompt;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const textId = `prompt-texto-${prompt.slug}`;

  return (
    <article className="prompt-card" id={prompt.slug}>
      <header className="prompt-card-head">
        <span className="prompt-index">{number}</span>
        <div>
          <h2>{prompt.title}</h2>
          <p className="prompt-tagline">{prompt.tagline}</p>
        </div>
      </header>

      {/* Sem nenhum resultado ainda, mostra uma moldura vazia de "Depois". */}
      <div
        className="prompt-media"
        style={{ "--frames": Math.max(prompt.after.length, 1) + 1 } as CSSProperties}
      >
        <PromptFrame label="Antes" image={prompt.before} />
        {prompt.after.length > 0 ? (
          prompt.after.map((image) => (
            <PromptFrame key={image.src} label="Depois" image={image} />
          ))
        ) : (
          <PromptFrame label="Depois" image={null} />
        )}
      </div>

      <p className="prompt-usecase">
        <strong>Quando usar:</strong> {prompt.useCase}
      </p>

      {prompt.variables ? (
        <dl className="prompt-vars">
          {prompt.variables.map((variable) => (
            <div key={variable.token}>
              <dt>{variable.token}</dt>
              <dd>{variable.hint}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="prompt-block">
        <div className="prompt-block-head">
          <span className="console-label">Prompt</span>
          <CopyButton text={prompt.prompt} targetId={textId} />
        </div>
        <pre className="prompt-text" id={textId}>
          {prompt.prompt}
        </pre>
      </div>

      {prompt.tips ? (
        <ul className="seo-checklist prompt-tips">
          {prompt.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
