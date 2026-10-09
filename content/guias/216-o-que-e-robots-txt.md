---
num: 216
titulo: "O que é o arquivo robots.txt"
slug: "o-que-e-robots-txt"
title_seo: "O que é o arquivo robots.txt"
meta_description: "O robots.txt é o arquivo que diz aos robôs de busca por onde podem ou não passar no seu site. Saiba o que ele controla e o erro que tira você do Google."
mes: "2027-04"
bloco: "basico"
puxa: "SEO"
pilar: "Presença"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-04-04"
links_internos: ["/guias/para-que-serve-o-sitemap/", "/guias/o-que-e-llms-txt/", "/presenca-digital-para-pequenas-empresas/"]
---

# O que é o arquivo robots.txt

O robots.txt é um arquivo de texto simples, que fica na raiz do seu domínio (`suaempresa.com.br/robots.txt`), com instruções para os robôs de busca sobre quais partes do site eles podem ou não visitar. É a primeira coisa que o robô do Google lê ao chegar. Serve para poupar o robô de áreas inúteis, não para esconder páginas.

Ele importa mais pelo que pode dar errado do que pelo que faz de bom. Um único comando errado nesse arquivo bloqueia o site inteiro para o Google, e o site continua abrindo normalmente para você.

## O que o robots.txt controla e o que não controla?

Ele controla o rastreio: diz "não entre nessa pasta" ou "pode entrar em tudo". Uso comum: bloquear a área administrativa, resultados de busca interna, carrinho de compras, páginas de filtro que geram milhares de combinações inúteis.

Ele não controla a indexação. Se uma página bloqueada no robots.txt recebe links de fora, o Google pode indexá-la mesmo sem ler o conteúdo, mostrando só o endereço. Para tirar uma página do Google de verdade, o comando é outro: a marcação noindex dentro da própria página, que o robô precisa conseguir ler. Bloquear no robots.txt e colocar noindex ao mesmo tempo anula o noindex, porque o robô nunca chega a vê-lo.

Uma escola de idiomas em Rio Preto trocou de site em janeiro. O desenvolvedor deixou o site novo em ambiente de teste com `Disallow: /` (bloqueia tudo) e esqueceu de remover ao publicar. Em março, o site havia sumido do Google.

## Como confiro o meu?

Digite `seudominio.com.br/robots.txt` no navegador. Se abrir um texto curto, leia. A linha perigosa é `Disallow: /` logo abaixo de `User-agent: *`. Isso bloqueia tudo para todos.

É bom incluir no arquivo a linha `Sitemap:` com o endereço do seu [mapa do site](https://avilaops.com/guias/para-que-serve-o-sitemap/); assim o robô acha os dois de uma vez.

## O que fazer agora

Abra o seu robots.txt agora e procure por `Disallow: /`. Se estiver lá e o site é público, isso precisa sair hoje. Na Avila Ops, o robots.txt é revisado antes de todo site ir ao ar e depois de toda migração; faz parte do site que o Google entende: https://avilaops.com/presenca-digital-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Posso usar o robots.txt para esconder uma página do Google?**
Não com segurança. Ele impede a leitura, não a indexação. Para uma página não aparecer, use a marcação noindex e deixe o robô ler a página.

**O robots.txt vale para as inteligências artificiais também?**
Vale para os robôs que respeitam o padrão, e os principais coletores de IA declaram respeitar. Há um arquivo separado, o llms.txt, pensado para orientar IAs; a gente explica no guia sobre [o que é o llms.txt](https://avilaops.com/guias/o-que-e-llms-txt/).

**Meu site não tem robots.txt. Preciso criar?**
Não é obrigatório. Sem o arquivo, o Google rastreia tudo. Crie quando tiver algo a bloquear (área de login, filtros de loja) ou para apontar o sitemap.
