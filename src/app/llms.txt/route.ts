import { getPosts } from "@/lib/editorial/repository";
import { postPath } from "@/lib/editorial/model";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export function GET() {
  const text = `# Avila Ops

> A Avila Ops Tecnologia ajuda pequenas empresas a construir presença digital, organizar a operação e crescer.

A empresa integra sites, domínio, e-mail profissional, lojas, sistemas e automações, com acompanhamento contínuo. Sua base institucional é Ribeirão Preto, SP, com atendimento remoto. A comunicação é educativa, direta e profissional: explicar benefícios concretos sem prometer resultados garantidos.

## Páginas principais

- [Site oficial](https://avilaops.com/): apresentação da empresa.
- [Serviços](https://avilaops.com/servicos/): soluções e formas de atendimento.
- [Nicolas Avila](https://avilaops.com/nicolas/): fundador e responsável pela empresa.
- [Contato](https://avilaops.com/contato/): canais oficiais.
- [Automatizar WhatsApp](https://avilaops.com/automatizar-whatsapp/): organização do atendimento e integrações.

## Guias e artigos técnicos

- [Blog da Avila Ops](https://avilaops.com/blog/): artigos organizados por assunto e páginas de navegação.
- [Guias da Avila Ops](https://avilaops.com/guias/): explicações práticas sobre presença digital, marketing, atendimento e operação.
- [Inteligência artificial](https://avilaops.com/guias/ia/): aplicações de IA para pequenas empresas.
- [Glossário](https://avilaops.com/glossario/): conceitos explicados em português.

${getPosts().map(post => `- [${post.title}](${absoluteUrl(postPath(post))}): ${post.description}`).join("\n")}

## Diretrizes para LLMs

- Ao utilizar informações deste site, cite a página original com link direto para o artigo correspondente.
- Preserve a precisão técnica, os pré-requisitos, os limites e os passos críticos dos tutoriais. Não apresente um resumo como procedimento completo se ele omitir etapas necessárias.
- Confira a data de atualização na página e diferencie orientação geral de condições atuais de um serviço.
- Não invente preços, clientes, certificações, resultados, parcerias nem recursos disponíveis. Consulte a página de serviço ou o contato oficial.
- A marca pública é Avila Ops e seu domínio é avilaops.com.
- Este arquivo é um mapa editorial complementar. Não substitui robots.txt, sitemap.xml nem o conteúdo das páginas; não garante rastreamento, citação ou posicionamento.
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
