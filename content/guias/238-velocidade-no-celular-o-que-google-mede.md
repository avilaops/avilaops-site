---
num: 238
titulo: "Velocidade no celular: o que o Google mede"
slug: "velocidade-no-celular-o-que-google-mede"
title_seo: "Velocidade no celular: o que o Google mede"
meta_description: "O Google mede três números no celular: quando o conteúdo principal aparece, a resposta ao toque e quanto a página pula. Os limites e o que corrigir."
mes: "2027-04"
bloco: "pratica"
puxa: "Site"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/search-console-relatorio-o-que-consertar/", "/guias/o-que-e-search-console/", "/dominio-e-hospedagem/", "/criacao-de-site-profissional/"]
---

# Velocidade no celular: o que o Google mede

O Google mede a velocidade do seu site em celular com três números, coletados de visitantes reais: quanto tempo o maior elemento da tela leva para aparecer (LCP, bom até 2,5 segundos), quanto a página demora para reagir a um toque (INP, bom até 200 milissegundos) e quanto o conteúdo pula enquanto carrega (CLS, bom até 0,1). Esses três, chamados Core Web Vitals, aparecem no Search Console e entram na avaliação da página junto com o conteúdo.

A maior parte da visita de pequena empresa vem do celular, muitas vezes em 4G, e uma página que demora 6 segundos perde o visitante antes de mostrar o telefone. Velocidade não faz uma página fraca subir, mas faz uma página boa perder para outra igual que carrega mais rápido. E o problema é quase sempre simples de corrigir.

## O que cada número mede?

LCP (Largest Contentful Paint) é o tempo até o maior bloco visível aparecer: em geral a foto de capa ou o título grande. Se a sua página inicial abre com uma imagem de 4 MB, o LCP é ruim, mesmo com o resto perfeito.

INP (Interaction to Next Paint) é o atraso entre o toque e a resposta da tela. Página que trava ao abrir o menu ou ao clicar num botão tem INP ruim. A causa costuma ser script demais rodando ao mesmo tempo: chat, pixel, mapa, vídeo, banner de cookies.

CLS (Cumulative Layout Shift) é o quanto o conteúdo se move depois de aparecer. Você vai clicar em "WhatsApp" e um banner carrega em cima, empurrando tudo para baixo, e você clica no anúncio. Isso é CLS. A causa é imagem ou bloco sem tamanho reservado.

Os limites que o Google usa, medidos no percentil 75 dos visitantes (ou seja, três em cada quatro visitas precisam estar dentro):

| Métrica | Bom | Precisa melhorar | Ruim |
|---|---|---|---|
| LCP | até 2,5 s | 2,5 a 4 s | acima de 4 s |
| INP | até 200 ms | 200 a 500 ms | acima de 500 ms |
| CLS | até 0,1 | 0,1 a 0,25 | acima de 0,25 |

## Como vejo os meus números?

O Search Console, em "Experiência" > "Core Web Vitals", mostra o site inteiro dividido em bom, precisa melhorar e ruim, com dados de visitantes reais dos últimos 28 dias. Site com pouca visita aparece como "sem dados suficientes"; nesse caso, use o PageSpeed Insights. A leitura do painel está no guia [Search Console: o relatório que diz o que consertar](https://avilaops.com/guias/search-console-relatorio-o-que-consertar/).

O PageSpeed Insights é gratuito, do Google: cole o endereço da página e ele mostra os números de visitantes reais, quando há dados, e um teste feito na hora, mais uma lista do que está pesando. O teste mede LCP e CLS; o INP só existe com toque de visitante real. Teste a página inicial e a página de serviço mais importante, no modo celular.

Não se prenda à nota de 0 a 100. Ela é uma simulação; o que o Google usa na avaliação são os três números de visitantes reais. Uma página com nota 60 e os três no verde está bem.

## O que corrigir primeiro?

Em site de pequena empresa, cinco causas explicam quase tudo:

1. Imagens pesadas. Foto tirada no celular tem 3 a 5 MB; no site, deve ter 100 a 300 KB. Redimensionar para a largura em que aparece e salvar em WebP resolve a maior parte dos LCP ruins. É a correção com mais retorno.
2. Scripts de terceiros. Cada chat, pixel, mapa incorporado e widget de avaliação é um script. Mantenha o que é usado; carregue o resto depois que a página aparece.
3. Hospedagem lenta. Se o servidor demora um segundo para começar a responder, nada do resto salva. Hospedagem compartilhada de R$ 10 por mês em servidor no exterior é uma causa comum. O que a Avila Ops entrega em [domínio e hospedagem](https://avilaops.com/dominio-e-hospedagem/) inclui servidor com resposta medida.
4. Fontes e vídeo de fundo. Quatro famílias de fonte e um vídeo em loop na capa é o kit da página lenta. Duas fontes, imagem estática.
5. Tamanho não reservado. Toda imagem e todo bloco de anúncio ou incorporação precisa ter largura e altura definidas no código, para o conteúdo não pular.

Depois de corrigir, os dados do Search Console levam 28 dias para refletir, porque são uma janela móvel. O PageSpeed mostra na hora.

## O que fazer agora

Teste a sua página inicial no PageSpeed Insights, no modo celular, e veja os números. Se o LCP está acima de 2,5 segundos, comece pelas imagens; é uma tarde de trabalho e resolve a maioria dos casos. Se você quer um site que já nasce dentro dos limites, em hospedagem medida, em 48h você vê o protótipo, grátis: https://avilaops.com/criacao-de-site-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Velocidade é o fator mais importante para aparecer no Google?**
Não. Conteúdo que responde à busca pesa muito mais. A velocidade desempata entre páginas parecidas e evita que o visitante vá embora antes de ler. Trate como higiene, não como estratégia.

**Meu site é rápido no meu celular. Por que o Google diz que é lento?**
Porque você tem o site em cache, Wi-Fi bom e celular recente. O Google mede o conjunto dos seus visitantes (o percentil 75, não o melhor caso), muitos em 4G e aparelho mais simples. O PageSpeed simula essa condição.

**Plugin de cache resolve?**
Ajuda na resposta do servidor e em parte do LCP. Não resolve imagem pesada, script demais nem CLS. Use, mas corrija as causas.
