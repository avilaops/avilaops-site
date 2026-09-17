/**
 * Ditado por voz do site, em duas camadas.
 *
 * 1. `SpeechRecognition` do proprio navegador: transcreve enquanto a pessoa
 *    fala, sem enviar audio para lugar nenhum e sem custo por minuto. Cobre
 *    Chrome, Edge, Android e Safari (iOS 14.5+), que e a maior parte de quem
 *    chega ao formulario pelo celular.
 * 2. Gravacao local + `POST` para o servico de transcricao da casa
 *    (`ferramentas/voz/servico-transcricao`, faster-whisper), usada quando o
 *    navegador nao tem a API — Firefox, por exemplo. So entra em cena se
 *    NEXT_PUBLIC_TRANSCRICAO_URL estiver configurada.
 *
 * Sem nenhuma das duas o componente de voz simplesmente nao aparece: o campo
 * de texto continua sendo o caminho padrao, nunca o plano B.
 */

interface AlternativaDeFala {
  transcript: string;
  confidence: number;
}

interface ResultadoDeFala {
  readonly length: number;
  readonly isFinal: boolean;
  [indice: number]: AlternativaDeFala;
}

interface ListaDeResultados {
  readonly length: number;
  [indice: number]: ResultadoDeFala;
}

interface EventoDeResultado {
  readonly resultIndex: number;
  readonly results: ListaDeResultados;
}

interface EventoDeErro {
  readonly error: string;
}

/** Superficie minima da API que o componente usa, tipada a mao porque o
 *  `lib.dom` do TypeScript ainda nao declara `SpeechRecognition`. */
export interface ReconhecimentoDeFala {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((evento: EventoDeResultado) => void) | null;
  onerror: ((evento: EventoDeErro) => void) | null;
  onend: (() => void) | null;
}

type ConstrutorDeReconhecimento = new () => ReconhecimentoDeFala;

function construtorDeReconhecimento(): ConstrutorDeReconhecimento | null {
  if (typeof window === "undefined") return null;

  const janela = window as Window & {
    SpeechRecognition?: ConstrutorDeReconhecimento;
    webkitSpeechRecognition?: ConstrutorDeReconhecimento;
  };

  return janela.SpeechRecognition ?? janela.webkitSpeechRecognition ?? null;
}

/** Se o navegador tem reconhecimento de fala nativo. */
export function ditadoDisponivel(): boolean {
  return construtorDeReconhecimento() !== null;
}

/** Cria o reconhecimento continuo, ja configurado, ou `null` se o navegador
 *  nao tiver a API. */
export function criarReconhecimento(idioma = "pt-BR"): ReconhecimentoDeFala | null {
  const Construtor = construtorDeReconhecimento();
  if (!Construtor) return null;

  const reconhecimento = new Construtor();
  reconhecimento.lang = idioma;
  // Continuo + parciais: a pessoa ve o texto aparecendo enquanto fala e o
  // reconhecimento nao morre na primeira pausa.
  reconhecimento.continuous = true;
  reconhecimento.interimResults = true;
  reconhecimento.maxAlternatives = 1;
  return reconhecimento;
}

/** Texto ja fechado e o trecho ainda em revisao de um evento de resultado. */
export function lerResultado(evento: EventoDeResultado): {
  final: string;
  parcial: string;
} {
  let final = "";
  let parcial = "";

  for (let i = evento.resultIndex; i < evento.results.length; i += 1) {
    const resultado = evento.results[i];
    const trecho = resultado[0]?.transcript ?? "";
    if (resultado.isFinal) {
      final += trecho;
    } else {
      parcial += trecho;
    }
  }

  return { final: final.trim(), parcial: parcial.trim() };
}

/** Formatos que o `MediaRecorder` aceita, do mais comum ao mais raro. */
const formatosDeGravacao = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/mp4",
];

export function gravacaoDisponivel(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

/** Primeiro formato suportado pelo navegador, ou `undefined` para deixar o
 *  proprio `MediaRecorder` escolher. */
export function formatoDeGravacao(): string | undefined {
  if (typeof window === "undefined" || !window.MediaRecorder) return undefined;
  return formatosDeGravacao.find((formato) => MediaRecorder.isTypeSupported(formato));
}

function extensaoDoFormato(tipo: string): string {
  if (tipo.includes("mp4")) return "m4a";
  if (tipo.includes("ogg")) return "ogg";
  return "webm";
}

/**
 * Envia o audio gravado para o servico de transcricao e devolve o texto.
 *
 * O contrato e o mesmo do `POST /transcrever` do faster-whisper da casa:
 * multipart com o campo `arquivo`, resposta `{ texto, idioma, trechos }`.
 */
export async function transcreverAudio(
  audio: Blob,
  endpoint: string,
  sinal?: AbortSignal,
): Promise<string> {
  const tipo = audio.type || "audio/webm";
  const formulario = new FormData();
  formulario.append("arquivo", audio, `ditado.${extensaoDoFormato(tipo)}`);

  const resposta = await fetch(endpoint, {
    method: "POST",
    body: formulario,
    signal: sinal,
  });

  if (!resposta.ok) {
    throw new Error(`Transcricao respondeu ${resposta.status}`);
  }

  const dados: unknown = await resposta.json();
  const texto = (dados as { texto?: unknown })?.texto;
  return typeof texto === "string" ? texto.trim() : "";
}
