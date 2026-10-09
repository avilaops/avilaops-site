---
num: 48
titulo: "Página lenta perde venda: o que medir e o que cortar"
slug: "pagina-lenta-perde-venda-o-que-medir"
title_seo: "Página lenta perde venda: o que medir e o que cortar"
meta_description: "Página que demora mais de 2,5 segundos no celular perde quem veio de anúncio. Veja o que medir, o que costuma pesar e o que cortar antes da Black Friday."
mes: "2026-10"
bloco: "pratica"
puxa: "Site"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/imagem-pesada-erro-que-derruba-loja-no-celular/", "/guias/seu-site-aguenta-o-pico-como-testar/", "/guias/meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google/", "/criacao-de-site-profissional/"]
---

# Página lenta perde venda: o que medir e o que cortar

Página lenta perde venda porque o cliente que veio de anúncio, no celular, em rede móvel, não espera. Se a página de produto leva mais de 2,5 segundos para mostrar o que importa, parte das pessoas volta para o Instagram antes de ver o preço. Você pagou pelo clique e não teve a chance de vender.

O que medir são três números do PageSpeed Insights, do Google: o tempo até o maior elemento aparecer (LCP), a demora para responder aos toques durante a visita (INP) e o quanto a página pula enquanto carrega (CLS). O INP vem de dados de visitantes reais do Chrome e só aparece quando a página tem acessos suficientes; em loja pequena, e em especial no fechamento do pedido, ele costuma faltar. Nesse caso, meça com uma ferramenta instalada no próprio site que registra os toques dos visitantes, ou teste você mesmo tocando nos botões com o painel de desempenho do Chrome aberto. O que cortar, na maioria das lojas pequenas, são imagens sem compressão, aplicativos instalados e esquecidos, e fontes e scripts que carregam antes do conteúdo.

## Quais números olhar e o que eles significam?

O LCP mede quanto tempo o maior elemento visível, em geral a foto do produto ou o banner, leva para aparecer. O Google considera bom até 2,5 segundos. O INP mede quanto tempo a página demora para reagir quando o cliente toca em um botão; bom até 200 milissegundos. O CLS mede se o conteúdo pula de lugar enquanto carrega, o que faz o cliente clicar no botão errado; bom até 0,1.

Rode o teste na página inicial, numa página de produto e na tela de fechamento do pedido, sempre na aba "celular". O resultado de computador engana: o cliente de anúncio está no celular.

| Número | O que mede | Bom até |
| --- | --- | --- |
| LCP | Tempo até o maior elemento aparecer | 2,5 s |
| INP | Demora para responder ao toque | 200 ms |
| CLS | Quanto a página pula ao carregar | 0,1 |
| Peso da página | Total baixado no celular | Ideal abaixo de 2 MB |

## O que costuma pesar numa loja pequena?

Imagem, em primeiro lugar. Foto de produto enviada direto da câmera, com 4 MB e 4.000 pixels de largura, para aparecer em 400 pixels na tela. Uma página com oito fotos assim pesa mais de 30 MB. O guia sobre [imagem pesada](https://avilaops.com/guias/imagem-pesada-erro-que-derruba-loja-no-celular/) mostra como reduzir sem perder qualidade.

Aplicativos e extensões, em segundo. Cada aplicativo instalado na plataforma da loja, como o de avaliação, o de pop-up, o de chat e o de contador de visitas, carrega o próprio código em toda página. Metade deles foi instalada para testar e nunca removida.

Scripts de rastreamento duplicados, em terceiro: pixel da Meta instalado duas vezes, tag do Google três. E fontes personalizadas em excesso, cada uma baixada antes de o texto aparecer.

## O que cortar e em que ordem?

1. Comprima e redimensione todas as imagens dos produtos da campanha. É o corte de maior efeito e menor risco.
2. Remova todo aplicativo que você não sabe dizer para que serve. Anote o que removeu, para poder voltar.
3. Confira se cada pixel e tag está instalado uma vez só.
4. Reduza as fontes personalizadas a duas: uma para título, uma para texto.
5. Elimine o vídeo que carrega sozinho na página inicial, ou troque por uma imagem com botão de play.
6. Meça de novo. Repita até o LCP ficar abaixo de 2,5 segundos.

Uma loja de decoração tem LCP de 6,8 segundos no celular: fotos originais de 3 MB a 5 MB, 11 aplicativos instalados, pixel duplicado. Depois de comprimir as fotos e remover sete aplicativos, o LCP cai para 2,1 segundos, sem trocar de plataforma nem de hospedagem. O trabalho leva uma tarde.

Cuidado com o que não cortar: o cálculo de frete por CEP, a busca dentro da loja e a tela de fechamento não são peso, são venda. Se eles estão lentos, o problema é a hospedagem ou a plataforma, e a resposta está no guia sobre [testar o site antes do pico](https://avilaops.com/guias/seu-site-aguenta-o-pico-como-testar/).

## O que fazer agora

Rode o PageSpeed na página de produto mais vendida, no celular, e anote o LCP. Se passa de 2,5 segundos, comece pelas imagens hoje. Se você preferir um site construído para carregar rápido desde o começo, em 48h você vê o protótipo, grátis: https://avilaops.com/criacao-de-site-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Quanto tempo uma página pode demorar para carregar?**
O Google considera bom quando o maior elemento aparece em até 2,5 segundos. Acima de quatro segundos, o Google classifica como ruim.

**Velocidade do site influencia no Google?**
Sim, a velocidade no celular é um dos fatores usados pelo Google. Mas o efeito maior é direto: página lenta perde visitante antes de ele ver o produto, com ou sem Google.

**Trocar de hospedagem resolve página lenta?**
Só quando o problema é o servidor demorar para responder. Se o problema é imagem pesada e aplicativo demais, a página continua lenta em qualquer hospedagem. Meça antes de trocar.
