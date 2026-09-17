"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

export default function WhiteLabelTeaser() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      await fetch(siteConfig.leadIntakeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "white-label-waitlist", email }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="whitelabel-section">
      <div className="container whitelabel-inner">
        <span className="whitelabel-tag">Em breve</span>
        <h2>Você é uma agência ou freelancer?</h2>
        <p>
          Estamos preparando uma forma de agências e freelancers oferecerem a
          operação digital da Avila Ops sob a própria marca. Deixe seu e-mail
          para ser avisado quando abrir.
        </p>

        {status === "sent" ? (
          <p className="whitelabel-success">Recebido — você será avisado no lançamento.</p>
        ) : (
          <form className="whitelabel-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Avisar no lançamento"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="whitelabel-error">Não deu para enviar agora — tente novamente em instantes.</p>
        )}
      </div>
    </section>
  );
}
