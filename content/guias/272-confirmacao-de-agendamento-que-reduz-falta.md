---
num: 272
titulo: "Confirmação de agendamento que reduz falta"
slug: "confirmacao-de-agendamento-que-reduz-falta"
title_seo: "Confirmação de agendamento que reduz falta"
meta_description: "Confirmação no WhatsApp um dia antes, com pergunta e ação para quem não responde, reduz a falta. Veja o texto, os horários e o que fazer com o não."
mes: "2027-05"
bloco: "pratica"
puxa: "Automação"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-no-show-e-quanto-custa/", "/guias/lista-de-espera-para-agenda-cheia/", "/guias/como-automatizar-whatsapp-da-empresa/", "/automatizar-whatsapp/"]
---

# Confirmação de agendamento que reduz falta

A confirmação que reduz falta tem quatro partes: chega no WhatsApp um dia antes, diz o serviço, o dia e a hora, faz uma pergunta que se responde com uma palavra ("confirma?") e tem alguém, ou algo, agindo sobre a resposta. Lembrete sem pergunta é aviso; o cliente lê e esquece. Pergunta sem ação é enfeite; o cliente responde "não" e ninguém libera a vaga. A confirmação funciona quando fecha o ciclo.

Quanto a falta custa por mês está em https://avilaops.com/guias/o-que-e-no-show-e-quanto-custa/.

## Por que o lembrete comum não resolve?

Porque ele é passivo. "Lembrando que você tem horário amanhã às 15h" é lido e arquivado. Quem ia faltar sem avisar, continua faltando sem avisar, porque a mensagem não pediu nada.

A pergunta muda isso. "Confirma?" exige resposta, e quem não vai aparecer tende a responder "não" em vez de sumir, porque a pergunta direta deixa o silêncio constrangedor. A vaga volta para você a tempo de oferecer a outra pessoa. E quem não responde nada vira um sinal: essa é a pessoa que merece uma ligação.

## O texto, o horário e a sequência

O texto:

"Oi, Ana. Seu horário de limpeza de pele é amanhã, quinta, às 15h, com a Carla. Confirma? Responde SIM para confirmar ou NÃO para remarcar."

Nome, serviço, dia, hora, profissional, pergunta com duas respostas possíveis. Sem link, sem imagem, sem "não esqueça". Adapte ao tom de voz da empresa, mas mantenha as duas palavras de resposta, porque elas permitem que a automação entenda.

A sequência:

| Quando | O quê | Quem faz |
|---|---|---|
| Na véspera, entre 9h e 11h | Mensagem de confirmação | Automático |
| Respondeu SIM | Registra como confirmado. Nada mais. | Automático |
| Respondeu NÃO | Oferece dois horários alternativos ou pede para escolher. Libera a vaga original para a lista de espera. | Automático na oferta; humano se o cliente não escolher |
| Não respondeu até as 17h | Segunda mensagem, mais curta: "Ana, consegue confirmar o horário de amanhã às 15h?" | Automático |
| Não respondeu até as 19h | Ligação ou mensagem pessoal de quem atende. Se não conseguir contato, a vaga entra como "provável falta" e a lista de espera é avisada. | Humano |
| 2 horas antes | Lembrete curto só para quem confirmou: "Te esperamos às 15h." | Automático |

A vaga liberada não tem valor se ninguém a preenche. A lista de espera é a outra metade desta rotina: https://avilaops.com/guias/lista-de-espera-para-agenda-cheia/.

## Como automatizar sem parecer robô?

Avise ao marcar que a confirmação vai pelo WhatsApp e registre o aceite: envio automático só pela API oficial do WhatsApp, com modelo de mensagem aprovado, e a política do WhatsApp exige que o cliente aceite receber mensagens. No aplicativo WhatsApp Business, as respostas rápidas ajudam, mas o envio é manual. Depois, cuide de:

1. Nome e profissional na mensagem. "Seu horário com a Carla" é diferente de "seu agendamento". A automação preenche a partir da agenda; o texto continua pessoal.
2. Resposta fora do SIM e do NÃO vai para uma pessoa. Se o cliente escreve "posso chegar 15 minutos atrasada?", a automação não tenta responder. Passa para quem atende, com a conversa inteira.
3. Uma pessoa lê a lista de "não respondeu" todo dia, depois da segunda mensagem. A automação avisa; a pessoa decide ligar ou não.

A confirmação é o primeiro fluxo automático que a maioria dos negócios de agenda deveria montar, porque costuma dar retorno já na primeira semana e é simples de testar. O que mais dá para automatizar no WhatsApp, e em que ordem, está em https://avilaops.com/guias/como-automatizar-whatsapp-da-empresa/.

Uma clínica de estética com quatro profissionais tinha faltas todo dia e ninguém mandava lembrete porque a recepção não dava conta. Montou a confirmação automática com SIM e NÃO. A recepção passou a olhar só a lista de quem não respondeu, no fim do dia, e a ligar para esses. As vagas liberadas com o NÃO foram para a lista de espera.

## O que fazer agora

Escreva hoje a sua mensagem de confirmação com nome, serviço, dia, hora, profissional e a pergunta com SIM e NÃO. Mande manualmente por uma semana para todos os horários do dia seguinte e conte quantos responderam NÃO. Esse número é a falta que você estava tendo sem saber. Responder rápido, confirmar sozinho e avisar quem precisa ligar, sem ficar acordado: https://avilaops.com/automatizar-whatsapp/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Confirmação por SMS ou e-mail funciona?**
Em geral, menos do que WhatsApp, porque a resposta é mais difícil e a leitura é menor. Se o seu cliente não usa WhatsApp, SMS com pergunta ainda é melhor do que nada.

**Devo mandar a confirmação dois dias antes em vez de um?**
Um dia antes é o ponto em que o cliente já sabe se vai e ainda dá tempo de preencher a vaga. Dois dias antes, ele confirma e depois surge imprevisto. Para serviço longo ou caro, mande dois avisos: três dias antes (informativo) e um dia antes (com pergunta).

**O cliente confirmou e faltou mesmo assim. E aí?**
Acontece, e é a falta que mais vale cobrar, porque a regra estava clara e ele confirmou. Antes de cobrar, ligue: às vezes houve emergência. Se repetir, aplique a regra de falta do seu contrato ou peça sinal via Pix nas próximas marcações.
