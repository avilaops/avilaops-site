---
num: 67
titulo: "O que é rastreio e como ele reduz mensagem no atendimento"
slug: "o-que-e-rastreio-e-como-reduz-mensagem-no-atendimento"
title_seo: "O que é rastreio e como ele reduz mensagem no atendimento"
meta_description: "Rastreio é o código que mostra onde o pacote está. Veja como enviar pelo WhatsApp sem digitar e cortar o 'cadê meu pedido' da Black Friday."
mes: "2026-11"
bloco: "basico"
puxa: "Operação"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/como-automatizar-whatsapp-da-empresa/", "/guias/frete-atrasado-avisar-antes-de-o-cliente-perguntar/", "/sistema-para-pequenas-empresas/"]
---

# O que é rastreio e como ele reduz mensagem no atendimento

Rastreio é o código que a transportadora gera quando o pacote é postado e que mostra, etapa por etapa, onde ele está. O cliente vê "postado", "em trânsito", "saiu para entrega". Quando esse código chega ao cliente sem ele pedir, a pergunta "cadê meu pedido" quase some.

Na semana da Black Friday essa costuma ser a pergunta que mais se repete. Cada uma leva dois minutos para responder, e trinta por dia viram uma hora de trabalho que não vende nada.

## Por que o cliente pergunta mesmo tendo o código?

Porque o código foi mandado uma vez, num e-mail que ele não achou, ou porque o status parou de mudar. A resposta não é mandar o código de novo, é mandar o status.

Uma loja de calçados manda três mensagens por pedido: "pagamento confirmado, separando", "postado, código X, previsão dia 03/12" e "saiu para entrega hoje". Sem ninguém digitar. Quem recebe essas três tem pouco motivo para escrever.

## Como enviar o rastreio sem digitar?

A loja precisa gravar o código no pedido quando a etiqueta é gerada, e uma [automação](https://avilaops.com/guias/como-automatizar-whatsapp-da-empresa/) precisa disparar a mensagem quando esse campo é preenchido. Envio automático no WhatsApp só pela API oficial, com modelo de mensagem aprovado pela Meta e com o cliente tendo aceitado receber. O aplicativo WhatsApp Business não dispara sozinho a partir do pedido. Quem gera etiqueta por plataforma de frete costuma ter o código de volta no pedido sozinho. Quem posta no balcão precisa digitar o código no painel, e a mensagem sai a partir daí.

O segundo passo é consultar o status da transportadora de tempos em tempos e avisar quando muda, principalmente quando atrasa. O guia sobre [frete atrasado](https://avilaops.com/guias/frete-atrasado-avisar-antes-de-o-cliente-perguntar/) mostra como avisar antes de o cliente perguntar.

## O que fazer agora

Conte quantas mensagens de "cadê meu pedido" você recebeu ontem. Se passou de cinco, o rastreio automático tende a se pagar rápido. A Avila Ops liga loja, etiqueta e WhatsApp para o código sair sozinho, e o histórico fica no pedido: https://avilaops.com/sistema-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Todo envio tem código de rastreio?**
PAC, Sedex e as transportadoras principais têm. Carta registrada e alguns envios econômicos podem não ter atualização detalhada. Prefira sempre modalidade rastreável em campanha.

**Posso mandar o rastreio por WhatsApp sem o cliente autorizar?**
Mensagem sobre o próprio pedido é comunicação da compra, não propaganda. Mesmo assim, a política da Meta para a API oficial do WhatsApp exige que o cliente aceite receber mensagens da empresa: coloque essa opção na tela de fechamento, com o nome da loja, e use o número que ele informou.

**O código demora para atualizar. É normal?**
Sim, a primeira movimentação costuma levar até um dia útil depois da postagem. Avise isso na mensagem de "postado" para evitar a pergunta.
