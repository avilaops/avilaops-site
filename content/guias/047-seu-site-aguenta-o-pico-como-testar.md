---
num: 47
titulo: "Seu site aguenta o pico? Como testar antes"
slug: "seu-site-aguenta-o-pico-como-testar"
title_seo: "Seu site aguenta o pico? Como testar antes"
meta_description: "Como saber se a loja aguenta o tráfego da Black Friday: o que medir, como simular acesso, o que perguntar à hospedagem e o que ter pronto se cair."
mes: "2026-10"
bloco: "pratica"
puxa: "Site"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/pagina-lenta-perde-venda-o-que-medir/", "/guias/imagem-pesada-erro-que-derruba-loja-no-celular/", "/dominio-e-hospedagem/", "/criacao-de-site-profissional/"]
---

# Seu site aguenta o pico? Como testar antes

Para saber se o site aguenta o pico, você precisa de três respostas: quanto tempo cada página leva para carregar hoje, quantos acessos simultâneos a hospedagem suporta, e o que acontece quando passa desse limite. Teste em outubro: a resposta pode ser "trocar de hospedagem", e isso leva dias, não horas.

Site que cai na Black Friday não avisa. Ele fica lento primeiro, o cliente desiste no carrinho, e só depois aparece a tela de erro. Por isso o teste começa pela velocidade, não pela queda.

## O que medir antes de qualquer teste?

O tempo de carregamento da página inicial, de uma página de produto e da tela de fechamento do pedido, no celular, em rede móvel. Use o PageSpeed Insights, do Google, que é gratuito e mostra o tempo até o maior elemento aparecer na tela. O Google considera bom quando esse tempo fica abaixo de 2,5 segundos. Acima de quatro, o Google classifica como ruim.

Meça também o peso de cada página, em megabytes. Página de produto acima de 3 MB no celular é sinal de imagem sem compressão; o guia sobre [imagem pesada](https://avilaops.com/guias/imagem-pesada-erro-que-derruba-loja-no-celular/) mostra como resolver. O guia sobre [página lenta](https://avilaops.com/guias/pagina-lenta-perde-venda-o-que-medir/) cobre os outros pontos.

## Como simular o pico?

Descubra primeiro o seu pico normal: no painel de análise do site, veja o maior número de visitantes em uma hora nos últimos três meses. Multiplique por cinco. É uma estimativa conservadora, não uma regra, para a Black Friday de uma loja pequena com anúncio ligado.

Pergunte à hospedagem, por escrito, quantos acessos simultâneos o seu plano aguenta e o que acontece quando passa: fica lento, mostra erro ou bloqueia. Se a resposta for vaga, considere que o limite é baixo.

Se você quiser testar de verdade, existem ferramentas gratuitas de teste de carga que simulam dezenas de acessos ao mesmo tempo. Avise a hospedagem antes e confirme que o plano permite teste de carga. Rode contra a página de produto, fora do horário comercial, e observe o tempo de resposta subir. O ponto em que ele dobra é o seu limite prático.

1. Meça o tempo das três páginas principais no celular.
2. Descubra o pico de uma hora nos últimos três meses e multiplique por cinco.
3. Pergunte à hospedagem o limite do plano por escrito.
4. Converta em acessos simultâneos pelo pico, não pela média: conte quantos visitantes chegam no intervalo mais cheio com a duração de uma visita média, em geral os primeiros minutos depois de um disparo de mensagem ou de anúncio. Esse número é o de acessos ao mesmo tempo: se a visita dura três minutos e 500 pessoas chegam no primeiro minuto, são cerca de 500 juntas, enquanto a média da hora daria 25. Some uma folga de 50% e compare com o limite do passo 3; se passar, mude o plano ou a hospedagem agora.
5. Teste a compra completa depois de qualquer mudança.

## O que ter pronto se o site cair mesmo assim?

Uma página estática de aviso, hospedada em outro lugar, com o WhatsApp e o link do Instagram, para o domínio apontar para ela. Para a troca valer em minutos, e não em horas, deixe o TTL do domínio em cinco minutos desde a semana anterior. O contato do suporte da hospedagem salvo no celular, com o número do contrato. E o catálogo dos produtos da oferta pronto para vender pelo WhatsApp, com link de pagamento, enquanto o site volta.

Uma loja de artigos de festa anuncia no Instagram às 9h de sexta-feira e o site, em hospedagem compartilhada de R$ 15 por mês, para de responder às 9h20. Sem página de aviso, o anúncio continua rodando e cada clique é dinheiro jogado fora. Com página de aviso e catálogo no WhatsApp, a manhã ainda vende.

## O que fazer agora

Rode o PageSpeed nas três páginas principais hoje e anote os números. Mande a pergunta do limite para a hospedagem. Se a resposta não convencer, domínio no seu nome e hospedagem com renovação automática, sem susto: https://avilaops.com/dominio-e-hospedagem/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Quantos acessos simultâneos uma loja pequena recebe na Black Friday?**
Depende do anúncio e da base. Uma estimativa conservadora é multiplicar por cinco o maior pico de uma hora dos últimos três meses. Se você nunca mediu, comece pelo painel de análise do site.

**Hospedagem compartilhada aguenta a Black Friday?**
Para loja com pouco tráfego e página leve, às vezes. O risco é o vizinho do mesmo servidor também ter Black Friday. Para quem vai anunciar, vale pelo menos um plano com recursos dedicados durante novembro.

**O que fazer se o site cair no meio da campanha?**
Apontar o domínio para a página de aviso, pausar o anúncio, acionar o suporte da hospedagem e vender pelo WhatsApp com link de pagamento até o site voltar. Tudo isso é preparado em outubro.
