---
num: 299
titulo: "Automação que quebra em silêncio"
slug: "automacao-que-quebra-em-silencio"
title_seo: "Automação que quebra em silêncio: como perceber"
meta_description: "Automação que para sem avisar é pior que não ter automação. Veja por que ela quebra, como perceber em horas, não semanas, e o que toda regra precisa ter."
mes: "2027-06"
bloco: "pratica"
puxa: "Automação"
pilar: "Operação"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-06-26"
links_internos: ["/automatizar-whatsapp/", "/guias/quando-a-automacao-precisa-avisar-uma-pessoa/", "/guias/para-que-serve-um-alerta-automatico/", "/guias/automatizar-o-que-primeiro-os-cinco-candidatos-obvios/"]
---

# Automação que quebra em silêncio

Automação quebra em silêncio quando a regra para de rodar e ninguém é avisado. A confirmação de pagamento deixou de sair na terça, e você descobre no sábado, por um cliente perguntando se o pedido existe. O problema não é a quebra. É o intervalo entre a quebra e a descoberta, e o que aconteceu com os pedidos nesse intervalo.

Esse é o custo escondido de automatizar: você para de olhar o que a automação faz, porque era isso mesmo que ela prometia. Quatro dias de confirmação parada na semana do Dia dos Namorados podem ser dezenas de clientes achando que a loja sumiu com o dinheiro.

## Por que automação quebra

Quase nunca é a regra. É o que está em volta dela:

| Causa | O que acontece | Frequência |
|---|---|---|
| Senha ou token expirou | O sistema de mensagens não aceita mais o envio | Muito comum; tokens têm validade |
| A plataforma mudou | Loja, WhatsApp ou pagamento alterou o formato do dado que envia | Comum, sem aviso |
| Campo vazio inesperado | Pedido sem telefone, produto sem nome; a regra trava naquele registro e nos seguintes | Comum em cadastro sujo |
| Limite atingido | Cota de mensagens, de chamadas ou de armazenamento esgotou | Aparece justamente no mês de pico |
| Alguém desligou | Um teste, uma limpeza, um "vou ver isso depois" | Mais comum do que se admite |

Nenhuma dessas faz barulho. A regra simplesmente não roda, e nenhum sistema comum grita quando algo não acontece. Ele grita quando algo dá erro, o que é diferente de nada acontecer.

## Como perceber em horas, não em semanas

Toda automação precisa de duas coisas além da regra: um registro de cada execução e um aviso quando a execução esperada não acontece.

1. Registro (log). Cada vez que a regra roda, fica uma linha: hora, pedido, o que fez, deu certo ou não. Sem isso, você não sabe se a automação parou ou se simplesmente não houve pedido.
2. Aviso de silêncio. Se a loja recebeu pedido pago e a confirmação não saiu em 10 minutos, alguém recebe um alerta. A regra vigia a regra.
3. Contagem diária. Uma mensagem de fim de dia: "Hoje: 23 pedidos confirmados, 23 mensagens enviadas, 0 falhas." Quando os dois números divergem, você vê no mesmo dia.
4. Teste de vida semanal. Um pedido de teste, feito de propósito, para ver a automação inteira rodar. Cinco minutos toda segunda.

O terceiro item é o mais barato e o mais eficiente. Uma linha por dia, lida em três segundos, mostra o silêncio antes de ele custar.

## O que toda automação precisa ter antes de ir para o ar

Um dono com nome. Se a automação quebra, quem recebe o aviso? "A gente" não é resposta.

Um caminho de falha. Se a mensagem não pode ser enviada, o pedido entra numa fila de "pendente de aviso manual", visível para alguém. Ele não desaparece.

Uma data de revisão. Tokens expiram, plataformas mudam. Uma revisão trimestral, 20 minutos, confere se tudo ainda roda e se as senhas ainda valem.

E uma forma de desligar sem quebrar o resto. Automação que, ao ser pausada, deixa pedidos sem confirmação e ninguém sabe, foi mal desenhada.

Nada disso torna a automação à prova de falha. Torna a falha visível em horas. Essa é a diferença entre um problema e um mês perdido.

## O que fazer agora

Para cada automação que você tem, responda: se ela parasse agora, em quanto tempo você saberia? Se a resposta é "quando um cliente reclamar", falta o registro e o aviso de silêncio. A Avila Ops entrega automação com registro, aviso de falha e dono definido: https://avilaops.com/automatizar-whatsapp/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Como saber se a automação do WhatsApp parou de funcionar?**
Com um resumo diário de quantos gatilhos aconteceram e quantas mensagens saíram, e com um alerta quando um pedido pago fica mais de 10 minutos sem confirmação. Sem isso, você descobre pelo cliente.

**Por que a automação parou sozinha?**
As causas mais comuns são senha ou token expirado, mudança na plataforma que envia o dado, um registro com campo vazio que travou a regra, ou limite de uso atingido. Todas são silenciosas. O registro de execução mostra qual foi.

**Vale a pena automatizar se pode quebrar?**
Vale, desde que a quebra seja visível. Uma automação com registro e aviso de silêncio falha por horas. Uma pessoa esquecendo de mandar mensagem falha todo dia, e também em silêncio. A questão não é se quebra, é em quanto tempo você fica sabendo.
