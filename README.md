# avilaops.com

Site institucional da Avila Ops, construído com Next.js 16, React 19,
TypeScript e Tailwind CSS 4.

Este repositório é o site, e só o site. Até a separação ele era um workspace
que carregava também `marketing/`, `APK/`, `docs/`, `tv.avilaops.com/` e
quinze submódulos — tudo isso com repositório próprio na organização, e aqui
apenas duplicado. O site, que dá nome ao repositório, era 4% dos arquivos.

## Desenvolvimento

```bash
npm install
npm run dev
```

O ambiente local abre em `http://localhost:3000`.

## Estrutura

```text
src/app/       paginas, layouts, metadata, sitemap e robots
src/components componentes visuais reutilizaveis
src/lib/       conteudo estruturado, configuracao e utilitarios
public/        imagens e arquivos servidos diretamente
scripts/       build, SEO, imagens sociais, validacao e deploy
data/          estado das automacoes de publicacao
config/        configuracoes declarativas sem segredo
nginx/         configuracao do servidor da imagem publicada
resources/     arquivos-fonte e pacotes de identidade visual
```

## Verificacao

```bash
npm run lint
npm run build
npm run seo:validate:export
npm run headers:validate
```

## Cabecalhos HTTP

A politica de seguranca e de cache mora em `config/security-headers.mjs`, em
um lugar so. O site e servido por dois caminhos — nginx, dentro da imagem
publicada, e Cloudflare Pages, que le um arquivo `_headers` — e cada um quer
um formato diferente. O `postbuild` roda `scripts/gerar-headers.mjs`, que
traduz a mesma politica para os dois:

```text
out/_headers                 Cloudflare Pages
nginx/security-headers.conf  incluido por nginx/avilaops.conf na imagem
```

Nenhum dos dois e versionado: sao consequencia da fonte, nao copias.

`npm run headers:validate` sobe o export com esses cabecalhos e abre catorze
paginas em um Chromium de verdade, conferindo o valor de cada cabecalho, o
cache dos assets com hash e se a CSP bloqueou algum recurso. Uma CSP errada
nao quebra o build: ela falha calada no navegador do visitante. Por isso a
checagem roda tambem dentro do `npm run deploy`, antes de publicar.

A CSP e montada a partir de `NEXT_PUBLIC_LEAD_INTAKE_URL`, o endpoint que os
formularios chamam, e de `NEXT_PUBLIC_TRANSCRICAO_URL`, o servico que recebe
o audio do ditado por voz. Trocar o endereco de um deles sem rebuildar
deixaria o `connect-src` apontando para o lugar antigo e os envios parariam.

## Ditado por voz

A etapa "O que hoje mais limita o seu negocio?" do `/criar-meu-resumo/`
aceita voz alem do teclado (`src/components/VoiceInput.tsx`). Sao duas
camadas, nessa ordem:

1. `SpeechRecognition` do navegador — transcreve enquanto a pessoa fala, o
   audio nao sai do aparelho e nao ha custo por minuto. Cobre Chrome, Edge,
   Android e Safari do iOS 14.5 em diante.
2. Gravar e enviar para o servico de transcricao da casa
   (`ferramentas/voz/servico-transcricao`, faster-whisper), para navegadores
   sem a API — Firefox, por exemplo.

A segunda camada so aparece quando `NEXT_PUBLIC_TRANSCRICAO_URL` aponta para
o endpoint completo do servico, por exemplo
`https://transcricao.avilaops.com/transcrever`. Sem a variavel o site usa so
a primeira, e onde nem ela existe o botao simplesmente nao e renderizado: o
campo de texto continua sendo o caminho padrao, nunca o plano B.

O servico precisa liberar a origem do site por CORS — a chamada sai do
navegador do visitante, nao de um servidor. O `Permissions-Policy` do site
mantem `microphone=(self)` por causa dessa etapa.

## Deploy

`npm run deploy` gera o export estatico, valida o resultado, publica pelo script
PowerShell e verifica o endereco publico. O destino remoto pode ser alterado
pelos parametros de `scripts/deploy-avila-inc.ps1`.

Segredos e valores de ambiente nao devem ser versionados. Use `.env.local` ou
as variaveis configuradas no ambiente de deploy.
