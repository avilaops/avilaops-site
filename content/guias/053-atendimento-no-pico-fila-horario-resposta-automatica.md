---
num: 53
titulo: "Atendimento no pico: fila, horário e resposta automática"
slug: "atendimento-no-pico-fila-horario-resposta-automatica"
title_seo: "Atendimento no pico: fila, horário e resposta automática"
meta_description: "Como organizar o WhatsApp para a Black Friday: fila única, horário publicado, resposta automática para as cinco perguntas comuns e quem responde o resto."
mes: "2026-10"
bloco: "pratica"
puxa: "Automação"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/como-automatizar-whatsapp-da-empresa/", "/guias/whatsapp-comum-ou-business-api/", "/guias/mensagem-automatica-que-nao-parece-robo/", "/automatizar-whatsapp/"]
---

# Atendimento no pico: fila, horário e resposta automática

No pico, o atendimento aguenta quando estão definidos antes: uma fila única, para nenhuma mensagem se perder entre dois celulares; um horário publicado, para o cliente saber quando espera resposta de gente; e resposta automática para as perguntas que se repetem, para a pessoa responder só o que precisa de pessoa. Sem isso, a Black Friday vira 200 mensagens não lidas e um cliente reclamando em público que ninguém respondeu.

Monte isso em outubro: resposta automática precisa ser escrita e testada com calma, e em novembro não tem calma.

## Como organizar a fila?

Um número só para a empresa, no WhatsApp Business, e não o celular pessoal de quem atende. Se duas ou três pessoas respondem, o próprio app Business aceita até quatro aparelhos vinculados, pelo WhatsApp Web ou Desktop, no mesmo número. Para distribuir as conversas entre atendentes, com cada uma atribuída a alguém, há dois caminhos: a assinatura Meta Verified do próprio app Business, que em alguns planos amplia os aparelhos e permite atribuir conversas (confirme se ela está disponível para a sua empresa e se o plano oferecido inclui atribuição antes de contar com ela), ou o WhatsApp Business API, ou uma ferramenta em cima dele, quando também é preciso integrar com a loja. O guia sobre [WhatsApp comum ou Business API](https://avilaops.com/guias/whatsapp-comum-ou-business-api/) mostra quando cada um serve.

Etiquetas por estado da conversa: "novo", "aguardando pagamento", "pedido enviado", "problema". Toda manhã e todo fim de tarde, alguém percorre a fila do mais antigo ao mais novo, não do mais barulhento ao mais quieto. Conversa sem resposta há mais de duas horas no horário comercial é o primeiro número a olhar.

## Que horário publicar?

O que você cumpre. "Respondemos de segunda a sexta, das 9h às 18h, e sábado das 9h às 13h" é melhor do que "atendimento 24h" que responde às 10h do dia seguinte. Publique na descrição do WhatsApp Business, no rodapé do site e na mensagem automática de fora do horário.

Na semana da Black Friday, estenda o horário e publique a extensão. Quem compra à noite quer saber se a pergunta das 22h será respondida às 22h30 ou às 9h. As duas respostas são aceitáveis; o silêncio não é.

## O que responder automaticamente?

As cinco perguntas que mais chegam numa campanha, com resposta pronta e um caminho para pessoa quando a resposta não resolve:

1. Prazo e frete: "O prazo aparece na página do produto ao digitar o CEP. Na Black Friday, é de X dias úteis após o pagamento."
2. Cupom que não funcionou: "Confira se o cupom foi digitado sem espaço e se o pedido atinge o valor mínimo. Se ainda não funcionar, me mande o print que eu resolvo."
3. Pedido pago e sem confirmação: "Pix confirma na hora; boleto em até 3 dias úteis. Me mande o número do pedido que eu confiro."
4. Onde está o meu pedido: "O código de rastreio foi enviado por e-mail e por aqui. Se não recebeu, me mande o número do pedido."
5. Troca e devolução: "Você tem 7 dias, a contar do recebimento, para desistir da compra. Produto com defeito tem prazo maior. O passo a passo está em [link]."

A resposta automática responde a pergunta, não desvia dela. E cada uma termina com o que fazer se não resolveu. O guia sobre [mensagem automática que não parece robô](https://avilaops.com/guias/mensagem-automatica-que-nao-parece-robo/) mostra o tom, e o guia sobre [automatizar o WhatsApp](https://avilaops.com/guias/como-automatizar-whatsapp-da-empresa/) mostra como ligar isso ao pedido.

| Situação | Quem responde |
| --- | --- |
| Prazo, frete, rastreio, cupom, troca | Automático, com saída para pessoa |
| Fora do horário | Automático: horário e o que fazer enquanto isso |
| Pedido errado, produto quebrado, reclamação | Pessoa, em até duas horas |
| Cliente irritado ou ameaçando reclamação pública | Dono, no mesmo dia |

## O que fazer agora

Escreva as cinco respostas com os seus prazos e links, cadastre como resposta rápida no WhatsApp Business e teste com alguém de fora por uma semana. Defina o horário e publique. Se uma pessoa não dá conta e a API faz sentido, a gente configura para responder rápido sem ficar acordado: https://avilaops.com/automatizar-whatsapp/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Resposta automática no WhatsApp afasta cliente?**
Afasta quando não responde nada e só diz "em breve retornaremos". Quando responde a pergunta na hora e oferece pessoa se precisar, o cliente prefere: ele queria a informação, não a conversa.

**Quantas mensagens uma pessoa consegue atender por dia?**
Depende do tipo. Com as cinco perguntas comuns automatizadas, uma pessoa organizada resolve algumas dezenas de conversas que exigem gente por dia. Sem automação, o mesmo tempo vai em repetir prazo e frete.

**Preciso da API do WhatsApp para a Black Friday?**
Se uma pessoa atende de um celular, o WhatsApp Business com respostas rápidas e mensagem de ausência resolve. Se duas ou três pessoas atendem do mesmo número, o app Business com aparelhos vinculados também resolve. Para distribuir conversas entre atendentes, a assinatura Meta Verified do app Business pode atender, se o plano disponível para você incluir atribuição de conversas. Se você quer mensagem automática ligada ao pedido, a API é o caminho.
