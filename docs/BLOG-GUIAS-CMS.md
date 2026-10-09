# Blog e Guias — arquitetura e publicação

O Blog é a entrada cronológica/categorizada; Guias é a biblioteca de leitura.
Ambos apontam para o mesmo artigo canônico em `/guias/<slug>/`, preservando URLs
anteriores. Não duplicar o corpo do artigo em `/blog/<slug>/`.

## Componentes e fonte

- `src/lib/editorial/model.ts`: contrato `Post`, imagens, autor e paginação.
- `src/lib/editorial/repository.ts`: adaptador local; substituível por API de CMS no build.
- `src/components/editorial/RollTemplate.tsx`: listagem, categorias e paginação por links reais.
- `src/components/editorial/PostTemplate.tsx`: leitura, autoria, datas, índice e relacionados.
- `src/components/editorial/MarkdownBody.tsx`: parágrafos, listas, citações, tabelas GFM e links seguros.
- `src/lib/editorial/seo.ts`: metadata e snippet Article com Organization e ImageObject.
- `Breadcrumbs` fornece BreadcrumbList; o layout publica a identidade da Organization.
- `src/app/llms.txt/route.ts`: Markdown completo gerado apenas com URLs publicadas.

Os campos React `{post.title}`, `{post.markdown}`, `{post.author.name}` etc.
são os placeholders tipados para o CMS. Não inserir HTML bruto vindo da API.
Os componentes são Server Components: não adicionam estado ou JS de navegação
para listar, paginar ou ler conteúdo.

## Conteúdo recebido

366 arquivos Markdown foram copiados sem alterar o texto de
`marketing/conteudo/guias/` para `content/guias/`, dentro do repositório do site.
A pasta original permanece intacta. A cópia versionada é a fonte do build;
ao atualizar textos na pasta de marketing, sincronizar a cópia antes do commit.
O acervo legado em `seo-guides.ts` continua disponível e é convertido para o
mesmo contrato. Um guia aprovado de mesmo slug substitui a versão legada.

Status inicial: 343 revisados, 23 rascunhos, nenhum aprovado.
Um novo texto só é exportado quando `status: "aprovado"` e `data_prevista`
é igual ou anterior ao dia do build, no fuso America/Sao_Paulo.
Uma data agendada exige novo build: o export estático não muda sozinho à meia-noite.
Links para guias não liberados ficam como texto, sem links quebrados.
`/loja-virtual/` e `/comanda-digital/` continuam sem link até terem páginas.

As 79 imagens revisadas disponíveis foram anexadas em `public/editorial/guias/`
com seus atributos em `content/imagens.json`. O restante do inventário não foi
marcado como concluído. Aprovar texto sem capa revisada faz o build falhar.
As imagens internas são posicionadas após a seção informada pelo manifesto.
Arquivos públicos de imagem não são um mecanismo de proteção de conteúdo privado.

## Checklist do CMS

- [ ] Mapear título, título SEO (60 caracteres), descrição (155), slug único,
  corpo Markdown, categoria, tags, autor real, biografia e URL do autor.
- [ ] Registrar primeira publicação e última revisão separadamente; não usar
  a data do build como revisão editorial. O legado não tem primeira publicação
  comprovada: ela é omitida, não inventada, até conferência do responsável.
- [ ] Exigir capa, alt descritivo, largura e altura; conferir ilustrações e créditos.
- [ ] Validar hierarquia do Markdown: corpo começa em h2, subseções em h3.
- [ ] Aprovar textos e imagens antes da liberação; webhook autenticado deve
  disparar build/deploy, nunca expor token de CMS no navegador.
- [ ] Publicar apenas conteúdo aprovado, sem preview/rótulos de rascunho no export.
- [ ] Configurar redirecionamento permanente no servidor ao mudar um slug.
- [ ] Revisar intenção de busca, fontes e exemplos; evitar keyword stuffing.

## Checklist de indexação

- [ ] `robots.txt` deve permitir páginas e imagens públicas, CSS e JS; referenciar
  `https://avilaops.com/sitemap.xml`. Bloqueio de crawler não protege rascunhos.
- [ ] Sitemap deve conter URLs canônicas com `/`, imagens e datas editoriais reais.
- [ ] Paginação deve ter canonical próprio, sem apontar todas as páginas para a primeira.
- [ ] Verificar respostas HTTP 200, ausência de noindex e rastreamento pelo CDN/WAF.
- [ ] Enviar sitemap no Search Console e conferir amostras na Inspeção de URL
  e no Rich Results Test. Schema não garante rich results nem posicionamento.
- [ ] Conferir alt contextual, `src`/`srcset` rastreáveis, imagens WebP e dimensões
  reservadas para CLS. Todos os novos usos de imagens têm `loading="lazy"`,
  conforme o pedido. Avaliar LCP real: se a capa for o LCP, carregamento imediato
  é tecnicamente preferível e requer revisão dessa exigência.
- [ ] Medir LCP, CLS e INP em dados reais; testes locais não garantem Core Web Vitals.

Canonical é sinal de consolidação de versões; duplicação comum não implica
automaticamente uma penalidade. `llms.txt` é uma convenção complementar,
não um requisito de indexação nem garantia de citação por assistentes.

Fontes: https://developers.google.com/search/docs/appearance/google-images
e https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Publicação autorizada em 09/10/2026

Nicolas autorizou a publicação e a inclusão dos previews nesta conversa.
Foram aprovados os 40 textos revisados com data prevista até 09/10/2026.
Somente o frontmatter da cópia do site mudou: status e data_publicacao.
Os corpos dos artigos e os arquivos originais de marketing foram preservados.
A data_publicacao registra a publicação efetiva, sem retroagir ao calendário.
Textos futuros e rascunhos continuam fora do export.

A biblioteca passa a ter 68 artigos. As 17 capas que faltavam receberam
composição tipográfica própria, sem reutilizar as artes marcadas para refazer.
Foram gerados 28 previews exclusivos de listagens (Blog, Guias, categorias e
paginação), em JPEG 1200 x 630. OG e Twitter usam a mesma imagem de cada URL.

`npm run editorial:previews` cria os arquivos que faltam; os resultados e o
manifesto `content/previews-editoriais.json` são versionados. Ao alterar conteúdo
de uma imagem já publicada, criar nova versão de arquivo para evitar cache de
compartilhamento. Os 17 cards são composições tipográficas, não novas fotografias
nem substituição do projeto completo de ilustrações internas.

## Validação do contrato antes do export

O adaptador valida o contrato público de todos os artigos no build: campos
obrigatórios, slugs únicos, datas reais e não futuras, revisão posterior ou
igual à publicação, alt e dimensões positivas. A primeira publicação do
legado continua opcional porque não há data comprovada. Datas inexistentes
(como 30 de fevereiro) não liberam publicação. Duas entradas aprovadas com
o mesmo slug interrompem o build em vez de sobrescrever conteúdo silenciosamente.

`npm run editorial:test`, incluído em `npm run verificar`, cobre essas
regressões. Um futuro adaptador de CMS deve chamar `validatePosts` antes de
entregar os dados aos templates. Isto valida os dados; não substitui revisão
humana nem significa que um CMS externo já está conectado.

## Continuação das imagens — 09/10/2026

O lote `content/lotes-imagens/2026-10-09-060-062.json` retoma a sequência
do planejamento original: 060-2, 061-1, 061-2, 062-1 e 062-2. São cinco
artes de image_gen em diorama, composição geométrica e risografia, com
originais preservados, prompts, revisão, alt, dimensões e tamanho registrados.
Uma marca semelhante a bandeira de cartão foi removida na revisão da 061-2.
Os WebP finais e os recortes quadrados das duas capas foram conferidos.

As imagens estão integradas ao manifesto do site. Os guias 060–062 mantêm
suas datas e status: preparar imagens não aprova nem antecipa artigos.
O próximo ID ainda não produzido na sequência é 063-1; correções pendentes
dos lotes anteriores continuam no controle original de marketing.
Os lotes versionados do site complementam esse controle: consultá-los antes
de retomar a geração para não produzir novamente os mesmos IDs.

Para importar um próximo lote já revisado, usar
`node scripts/importar-imagens-editoriais.mjs <arquivo-do-lote.json>`.
O comando usa o sharp deste projeto, respeita os limites de peso e recusa
sobrescrever arquivos ou cadastros. `npm run editorial:validate` confere
também esses arquivos futuros e a existência da seção de inserção no Markdown.

## Símbolo nas imagens — lote 063–065

Em 09/10/2026 Nicolas pediu uma lembrança visual da marca e forneceu o
símbolo colorido e o favicon. Os arquivos recebidos foram preservados em
`resources/marca/`, sem substituir a identidade do cabeçalho do site.
O lote `2026-10-09-063-065.json` aplica o símbolo por referência: avental,
vitrine, etiqueta de bandeja e selos discretos. Os originais sem assinatura
e os prompts de edição ficam registrados para revisão.

O lote contém 063-1, 063-2, 064-1, 064-2 e 065-1, para os guias de 02 a
04/11/2026. A produção das imagens não altera status nem datas dos textos.
O próximo ID inédito é 065-2. Nas próximas artes, usar o símbolo fornecido
como referência, manter as quatro partes reconhecíveis e conferir sua
legibilidade na imagem final e no recorte quadrado das capas.

## Continuação — lote 065–066

O lote `2026-10-09-065-066.json` completa a imagem interna do relatório de
campanha (065-2) e a capa e imagem interna de logística reversa (066-1 e
066-2). As três artes usam o símbolo colorido por referência, com colagem
no relatório e cenas fotográficas geradas para recebimento e embalagem.
Não são fotografias de operações ou clientes reais da empresa.

WebP finais, textos alternativos, seções e recorte quadrado da capa foram
conferidos. Os guias mantêm status `revisado` e datas previstas de 04 e
05/11/2026. O próximo ID inédito da sequência é 067-1.

## Publicação antecipada — 09/10/2026

Nicolas pediu nesta data a publicação imediata dos guias que já tinham capa
e imagem interna revisadas. Foram aprovados 21 textos (041–043, 045, 047–049,
051–058 e 061–066), antes previstos para 11/10 a 05/11/2026. No frontmatter,
`status` passou a `aprovado`, `data_publicacao` registra 09/10/2026 e
`data_prevista` foi trazida para a mesma data, porque o export só libera
datas iguais ou anteriores ao build. As datas originais ficam no histórico.

Uma checagem de fatos antes da publicação corrigiu uma frase no guia 043:
o Pix não é isento de tarifa para quem recebe como pessoa jurídica. O guia
050 (Dia das Crianças) ficou fora: sua orientação de divulgar até 05/10 já
venceu e o texto precisa ser revisto antes de ir ao ar. Os guias 046, 059 e
060 continuam sem capa; 040 e 044 ainda não têm imagens.

A biblioteca passa a ter 89 artigos. Foram gerados os previews das novas
páginas de listagem (Blog e Guias 9 e 10, Operação página 3).
