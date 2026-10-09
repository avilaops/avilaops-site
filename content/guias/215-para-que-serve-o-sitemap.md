---
num: 215
titulo: "Para que serve o mapa do site (sitemap)"
slug: "para-que-serve-o-sitemap"
title_seo: "Para que serve o mapa do site (sitemap)"
meta_description: "O sitemap é a lista de páginas que você entrega ao Google para ele não perder nenhuma. Saiba o que ele faz, o que não faz e como enviar o seu."
mes: "2027-04"
bloco: "basico"
puxa: "SEO"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-indexacao-pagina-nao-existe-google/", "/guias/o-que-e-robots-txt/", "/presenca-digital-para-pequenas-empresas/"]
---

# Para que serve o mapa do site (sitemap)

O mapa do site (sitemap) é um arquivo que lista os endereços de todas as páginas que você quer que o Google conheça. Ele fica no seu domínio, em geral em `suaempresa.com.br/sitemap.xml`, e você o envia pelo Search Console. Serve para o robô do Google não depender só de links para descobrir o que existe no seu site.

O problema que ele resolve é comum: página nova que ninguém linka e que o Google demora semanas para achar. Com o sitemap, você avisa.

## O que o sitemap faz e o que ele não faz?

Faz: informa ao Google quais páginas existem e quando cada uma foi alterada pela última vez. Isso orienta o robô a voltar nas páginas que mudaram.

Não faz: não obriga o Google a indexar. Listar uma página no sitemap é um pedido, não uma ordem. O Google ainda decide se a página vale o índice. Também não melhora posição.

Numa loja de uniformes em Mirassol que cadastra 12 produtos novos para a volta às aulas, sem sitemap o Google acha os produtos quando resolver passar pela categoria. Com o sitemap atualizado automaticamente pela plataforma da loja, os 12 endereços entram no arquivo no mesmo dia e o Google os encontra na próxima vez que ler o sitemap.

## Como faço o meu sitemap?

Quase toda plataforma de site ou loja gera o sitemap sozinha e o mantém atualizado. Confira digitando `seudominio.com.br/sitemap.xml` no navegador. Se abrir uma lista de endereços, existe. Se abrir uma página de erro, o site não tem, e é preciso ativar na plataforma ou instalar um complemento que gere.

Depois de confirmar que existe, entre no Search Console, vá em "Sitemaps", cole o endereço e envie. O Google passa a ler o arquivo sozinho de tempos em tempos. O sitemap não deve listar páginas que você não quer no Google, como área de login ou página de obrigado; para tirá-las do Google existe a marcação noindex, e o [arquivo robots.txt](https://avilaops.com/guias/o-que-e-robots-txt/) serve para áreas que o robô nem precisa visitar.

## O que fazer agora

Abra `seudominio.com.br/sitemap.xml` agora e veja se existe e se as páginas importantes estão lá. Depois envie pelo Search Console. Todo site da Avila Ops sai com sitemap gerado, enviado e conferido; é parte do que chamamos de site que o Google entende: https://avilaops.com/presenca-digital-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Site pequeno precisa de sitemap?**
Precisa pouco, mas não custa nada. A partir do momento em que você publica conteúdo com frequência ou tem produtos, o sitemap passa a fazer diferença.

**Sitemap é o mesmo que o menu do site?**
Não. O menu é para pessoas; o sitemap XML é para robôs.

**Enviei o sitemap e a página continua fora do Google. Por quê?**
Porque o sitemap só avisa que a página existe. Se ela está bloqueada, duplicada ou com pouco conteúdo, o Google lê e decide não indexar. Veja o motivo no relatório "Páginas" do Search Console e o guia sobre [o que é indexação](https://avilaops.com/guias/o-que-e-indexacao-pagina-nao-existe-google/).
