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
npm run links:validate
npm run headers:validate
npm run contraste:validate
```

`npm run verificar` roda os seis em sequencia.

`links:validate` recusa link interno sem a barra final (o site usa
`trailingSlash`; sem a barra cada clique paga um redirecionamento) e link para
pagina que nao existe no export. Ao escrever um caminho interno, termine com
`/`.

`contraste:validate` abre todas as paginas do export nos dois temas e mede o
contraste de cada texto contra o fundo. O tema troca pelo relogio (escuro das
18h as 6h), entao uma secao com fundo fixo em hex fica ilegivel em metade do
dia sem que ninguem veja: use as variaveis de `globals.css` (`--background`,
`--surface`, `--paper`, `--paper-cool`, `--card`) em vez de cor fixa.

## Cabecalhos HTTP

A politica de seguranca e de cache mora em `config/security-headers.mjs`, em
um lugar so. Tres servidores podem entregar o site — o Caddy do servidor de producao, o
nginx dentro da imagem publicada e o Cloudflare Pages, que le um arquivo
`_headers` — e cada um quer um formato diferente. O `postbuild` roda
`scripts/gerar-headers.mjs`, que traduz a mesma politica para os tres:

```text
caddy/avilaops-site.caddy    importado pelo Caddyfile do servidor (producao)
out/_headers                 Cloudflare Pages
nginx/security-headers.conf  incluido por nginx/avilaops.conf na imagem
```

Nenhum deles e versionado: sao consequencia da fonte, nao copias. O deploy
envia o arquivo do Caddy para `/etc/caddy/avilaops-site.caddy` e recarrega o
Caddy quando ele muda; `npm run headers:validate:public` confere se o endereco
publico responde com a politica.

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

1. `SpeechRecognition` do navegador — transcreve enquanto a pessoa fala.
   O audio pode ser enviado ao provedor do navegador para processamento;
   esta integracao nao garante transcricao local. A disponibilidade varia
   conforme navegador, sistema e permissoes.
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

`npm run deploy` (Windows) gera o export estatico, valida o resultado, publica
pelo script PowerShell e verifica o endereco publico. O destino remoto pode ser
alterado pelos parametros de `scripts/deploy-avilaops-com.ps1`.

`npm run deploy:linux` faz o mesmo a partir de Linux ou macOS, por
`scripts/deploy-avilaops-com.sh` (destino em `DEPLOY_SSH`, padrao
`applications`), e ainda envia os cabecalhos do Caddy. Os dois scripts publicam
do mesmo jeito: mudou um, muda o outro.

O workflow do GitHub Actions so constroi a imagem com nginx; ele nao publica o
avilaops.com. Push na `main` nao poe nada no ar: e preciso rodar o deploy.

No servidor, o Caddy serve `/var/www/avilaops.com`, que e um symlink para a
release ativa em `/var/www/.releases/avilaops.com/<data>-<commit>`. Cada deploy
extrai uma release nova e troca o link de uma vez; as cinco mais recentes ficam
no disco. Rollback e apontar o link para a anterior:

```bash
ln -sfn /var/www/.releases/avilaops.com/<release> /var/www/avilaops.com
```

Segredos e valores de ambiente nao devem ser versionados. Use `.env.local` ou
as variaveis configuradas no ambiente de deploy.

