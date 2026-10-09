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
