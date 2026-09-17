"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CircleAlert, LoaderCircle, Mic, Square } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  criarReconhecimento,
  ditadoDisponivel,
  formatoDeGravacao,
  gravacaoDisponivel,
  lerResultado,
  transcreverAudio,
  type ReconhecimentoDeFala,
} from "@/lib/speech";

type Modo = "ditado" | "gravacao";
type Estado = "ocioso" | "ouvindo" | "gravando" | "transcrevendo";

type Props = {
  /** Recebe cada trecho ja transcrito, para o campo decidir onde encaixar. */
  onTranscription: (texto: string) => void;
  /** Campo que o botao controla, para leitores de tela. */
  controls?: string;
  idioma?: string;
  disabled?: boolean;
};

/** Teto da gravacao enviada ao servico: audio longo demora a transcrever e
 *  quase sempre e microfone esquecido aberto. */
const limiteDeGravacaoSegundos = 120;

/**
 * Qual caminho o navegador aceita, decidido uma vez por sessao.
 *
 * Vem por `useSyncExternalStore` porque o site e export estatico: no HTML
 * gerado no build nao existe `window`, e o botao so pode aparecer depois da
 * hidratacao, sem piscar para quem nao tem microfone nenhum.
 */
let modoDetectado: Modo | null | undefined;

function modoNoCliente(): Modo | null {
  if (modoDetectado === undefined) {
    modoDetectado = ditadoDisponivel()
      ? "ditado"
      : siteConfig.transcriptionUrl && gravacaoDisponivel()
        ? "gravacao"
        : null;
  }
  return modoDetectado;
}

function modoNoServidor(): Modo | null {
  return null;
}

function semAssinatura(): () => void {
  return () => {};
}

function formatarDuracao(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${minutos}:${String(resto).padStart(2, "0")}`;
}

/**
 * Botao de ditado reutilizavel.
 *
 * Prefere o reconhecimento do proprio navegador (texto aparece enquanto a
 * pessoa fala, audio nao sai do aparelho) e cai para gravar + enviar ao
 * servico de transcricao da casa quando a API nao existe. Sem nenhum dos
 * dois caminhos o componente nao renderiza nada.
 */
export default function VoiceInput({
  onTranscription,
  controls,
  idioma = "pt-BR",
  disabled = false,
}: Props) {
  const modo = useSyncExternalStore(semAssinatura, modoNoCliente, modoNoServidor);

  const [estado, setEstado] = useState<Estado>("ocioso");
  const [parcial, setParcial] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [segundos, setSegundos] = useState(0);

  const reconhecimentoRef = useRef<ReconhecimentoDeFala | null>(null);
  const gravadorRef = useRef<MediaRecorder | null>(null);
  const pedacosRef = useRef<Blob[]>([]);
  const inicioRef = useRef(0);
  const ativoRef = useRef(false);

  const endpointTranscricao = siteConfig.transcriptionUrl;

  const encerrarGravador = useCallback(() => {
    const gravador = gravadorRef.current;
    if (!gravador) return;
    gravador.stream.getTracks().forEach((faixa) => faixa.stop());
    gravadorRef.current = null;
  }, []);

  const parar = useCallback(() => {
    ativoRef.current = false;
    setParcial("");

    if (reconhecimentoRef.current) {
      reconhecimentoRef.current.stop();
      reconhecimentoRef.current = null;
      setEstado("ocioso");
    }

    if (gravadorRef.current && gravadorRef.current.state !== "inactive") {
      // O `onstop` do gravador e quem envia o audio e limpa o stream.
      gravadorRef.current.stop();
    }
  }, []);

  // Microfone aberto nao sobrevive a troca de etapa nem a saida da pagina.
  useEffect(() => {
    return () => {
      ativoRef.current = false;
      reconhecimentoRef.current?.abort();
      reconhecimentoRef.current = null;
      if (gravadorRef.current && gravadorRef.current.state !== "inactive") {
        gravadorRef.current.stop();
      }
      encerrarGravador();
    };
  }, [encerrarGravador]);

  // Cronometro da gravacao, que tambem aplica o teto de duracao.
  useEffect(() => {
    if (estado !== "gravando") return;

    const intervalo = window.setInterval(() => {
      const decorrido = Math.round((Date.now() - inicioRef.current) / 1000);
      setSegundos(decorrido);
      if (decorrido >= limiteDeGravacaoSegundos) parar();
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [estado, parar]);

  function iniciarDitado() {
    const reconhecimento = criarReconhecimento(idioma);
    if (!reconhecimento) return;

    reconhecimento.onresult = (evento) => {
      const { final, parcial: emRevisao } = lerResultado(evento);
      if (final) onTranscription(final);
      setParcial(emRevisao);
    };

    reconhecimento.onerror = (evento) => {
      // Silencio e interrupcao sao rotina: o proprio `onend` reabre.
      if (evento.error === "no-speech" || evento.error === "aborted") return;

      ativoRef.current = false;
      reconhecimentoRef.current = null;
      setEstado("ocioso");
      setParcial("");

      if (evento.error === "not-allowed" || evento.error === "service-not-allowed") {
        setErro("Permita o acesso ao microfone no navegador para ditar.");
        return;
      }
      if (evento.error === "network") {
        setErro("Sem conexão para transcrever agora. Você pode escrever no campo.");
        return;
      }
      setErro("Não consegui ouvir agora. Tente de novo ou escreva no campo.");
    };

    reconhecimento.onend = () => {
      // O navegador encerra sozinho depois de alguns segundos de silencio.
      // Enquanto a pessoa nao apertar "parar", reabrimos.
      if (!ativoRef.current) {
        setEstado("ocioso");
        return;
      }
      try {
        reconhecimento.start();
      } catch {
        ativoRef.current = false;
        reconhecimentoRef.current = null;
        setEstado("ocioso");
      }
    };

    try {
      reconhecimento.start();
    } catch {
      setErro("Não consegui abrir o microfone. Tente de novo.");
      return;
    }

    reconhecimentoRef.current = reconhecimento;
    ativoRef.current = true;
    setErro(null);
    setEstado("ouvindo");
  }

  async function iniciarGravacao() {
    if (!endpointTranscricao) return;

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErro("Permita o acesso ao microfone no navegador para gravar.");
      return;
    }

    const formato = formatoDeGravacao();
    const gravador = new MediaRecorder(stream, formato ? { mimeType: formato } : undefined);
    pedacosRef.current = [];

    gravador.ondataavailable = (evento) => {
      if (evento.data.size > 0) pedacosRef.current.push(evento.data);
    };

    gravador.onstop = async () => {
      encerrarGravador();
      const audio = new Blob(pedacosRef.current, {
        type: formato ?? pedacosRef.current[0]?.type ?? "audio/webm",
      });
      pedacosRef.current = [];

      if (audio.size === 0) {
        setEstado("ocioso");
        return;
      }

      setEstado("transcrevendo");
      try {
        const texto = await transcreverAudio(audio, endpointTranscricao);
        if (texto) {
          onTranscription(texto);
        } else {
          setErro("Não entendi o áudio. Tente falar mais perto do microfone.");
        }
      } catch {
        setErro("Não consegui transcrever agora. Você pode escrever no campo.");
      } finally {
        setEstado("ocioso");
      }
    };

    gravador.start();
    gravadorRef.current = gravador;
    ativoRef.current = true;
    inicioRef.current = Date.now();
    setSegundos(0);
    setErro(null);
    setEstado("gravando");
  }

  function alternar() {
    if (estado === "ouvindo" || estado === "gravando") {
      parar();
      return;
    }
    if (modo === "ditado") {
      iniciarDitado();
      return;
    }
    void iniciarGravacao();
  }

  if (!modo) return null;

  const emCaptura = estado === "ouvindo" || estado === "gravando";
  const rotulo = emCaptura
    ? "Parar e usar o que falei"
    : estado === "transcrevendo"
      ? "Transcrevendo o áudio..."
      : "Falar em vez de escrever";

  const dica = emCaptura
    ? modo === "ditado"
      ? "Ouvindo — o texto aparece no campo enquanto você fala."
      : `Gravando ${formatarDuracao(segundos)} — toque em parar quando terminar.`
    : estado === "transcrevendo"
      ? "Transcrevendo o áudio, leva alguns segundos."
      : "Toque no microfone e conte com suas palavras. A gente transcreve para o campo acima.";

  return (
    <div className="brief-voice">
      <button
        type="button"
        className={`brief-voice-button${emCaptura ? " recording" : ""}`}
        onClick={alternar}
        disabled={disabled || estado === "transcrevendo"}
        aria-pressed={emCaptura}
        aria-controls={controls}
      >
        <span className="brief-voice-icon" aria-hidden="true">
          {estado === "transcrevendo" ? (
            <LoaderCircle size={18} strokeWidth={2} className="brief-voice-spinner" />
          ) : emCaptura ? (
            <Square size={16} strokeWidth={2.4} />
          ) : (
            <Mic size={18} strokeWidth={2} />
          )}
        </span>
        {rotulo}
      </button>

      <p className="brief-voice-hint" role="status" aria-live="polite">
        {dica}
      </p>

      {parcial && <p className="brief-voice-preview">{parcial}</p>}

      {erro && (
        <p className="brief-voice-error" role="alert">
          <CircleAlert size={15} strokeWidth={2} aria-hidden="true" />
          {erro}
        </p>
      )}
    </div>
  );
}
