---
num: 162
titulo: "Seu e-mail está caindo no spam e você não sabe"
slug: "email-caindo-no-spam-sem-saber"
title_seo: "Seu e-mail está caindo no spam e você não sabe"
meta_description: "Teste em 10 minutos se o e-mail da sua empresa cai no spam: três contas de teste, leitura do cabeçalho e os quatro reparos em ordem. Sem ferramenta paga."
mes: "2027-02"
bloco: "pratica"
puxa: "E-mail"
pilar: "Presença"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-02-09"
links_internos: ["/guias/o-que-e-caixa-de-spam/", "/guias/spf-dkim-dmarc-sem-termo-tecnico/", "/email-profissional/"]
---

# Seu e-mail está caindo no spam e você não sabe

Se cliente diz "não recebi" mais de uma vez por mês, ou responde dias depois com "estava no spam", parte dos seus e-mails está sendo filtrada. Você não é avisado quando isso acontece. O provedor do destinatário decide sozinho, em silêncio, e a mensagem some numa pasta que quase ninguém abre. Dá para descobrir em 10 minutos, sem ferramenta paga.

Em fevereiro isso pesa mais. É o mês do aviso de horário de Carnaval, da retomada do orçamento parado desde dezembro, da cobrança do primeiro boleto do ano. Cada um desses e-mails que cai no spam vira uma conversa que não acontece.

## Como testar se meu e-mail cai no spam?

1. Crie ou use três contas que você controle: uma no Gmail, uma no Outlook (ou Hotmail) e uma no Yahoo. Elas cobrem os filtros mais comuns.
2. Envie, do e-mail da empresa, uma mensagem real: um orçamento, uma confirmação, o texto que você normalmente manda. Não use "teste" como assunto.
3. Veja onde chegou em cada conta. Se caiu na caixa de entrada nas três, o problema é pontual e tem a ver com o destinatário. Se caiu no spam em uma ou mais, o problema é seu.
4. No Gmail, abra a mensagem, clique nos três pontos e em "Mostrar original". Anote o que aparece em SPF, DKIM e DMARC: PASS, FAIL ou "none".

Repita o teste com a ferramenta de disparo, se você usa uma para promoções. É comum o e-mail do dia a dia passar e o disparo cair, porque a ferramenta não está autorizada no domínio.

## O que corrigir, e em que ordem?

A ordem importa, porque cada reparo depende do anterior.

| Ordem | Sintoma | Reparo |
|---|---|---|
| 1 | SPF, DKIM ou DMARC com FAIL ou none | Configurar os três registros no DNS do domínio e incluir toda ferramenta que envia em seu nome |
| 2 | Registros PASS, mas envio de endereço @gmail.com ou @hotmail.com em nome da empresa | Migrar para e-mail no domínio próprio |
| 3 | Tudo PASS, e ainda cai | Olhar o conteúdo: assunto em caixa alta, link encurtado, só imagem, anexo .exe ou .zip |
| 4 | Conteúdo limpo, e ainda cai | Olhar a lista e a reputação: endereços velhos, disparo em volume, marcações de spam anteriores |

O que cada registro faz e por que o filtro olha para eles antes do texto está em https://avilaops.com/guias/spf-dkim-dmarc-sem-termo-tecnico/. Os motivos gerais de um e-mail ser filtrado estão em https://avilaops.com/guias/o-que-e-caixa-de-spam/.

## O que fazer quando o cliente já disse que não recebeu?

Não peça para ele "olhar no spam" e encerrar.

Primeiro, reenvie pelo WhatsApp o que era urgente. O cliente não precisa esperar você consertar o DNS. Segundo, peça para ele mover a mensagem para a caixa de entrada e adicionar o seu endereço aos contatos. Isso ensina ao provedor dele que você é legítimo. Terceiro, anote o caso: data, provedor do cliente, tipo de mensagem. Se três casos no mesmo mês forem do mesmo provedor, você sabe onde está o problema.

E se o e-mail que caiu tinha link de pagamento ou boleto, avise o cliente pelo WhatsApp que o e-mail é seu, antes de ele desconfiar de golpe. Nesse caso a desconfiança é boa para ele e ruim para a sua venda.

## O que fazer agora

Rode o teste das três contas hoje. Se qualquer registro der FAIL, ou se o seu e-mail de trabalho ainda é gratuito, o reparo é o mesmo: e-mail no seu domínio com SPF, DKIM e DMARC prontos, migração inclusa, por R$ 10 por caixa/mês, pronto hoje: https://avilaops.com/email-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Existe ferramenta gratuita para testar se meu e-mail cai no spam?**
Existem sites que dão uma nota ao seu e-mail a partir de uma mensagem enviada para um endereço temporário. Eles ajudam a ler o cabeçalho, mas o teste com contas reais em Gmail, Outlook e Yahoo continua sendo o mais próximo do que o seu cliente vê.

**Meu e-mail cai no spam só no Outlook. Por quê?**
O Outlook tem filtro próprio e costuma ser mais rígido com domínios sem DMARC e com servidores compartilhados. Se só ele filtra, verifique o DMARC primeiro e depois o histórico de envios para endereços @hotmail e @outlook.

**Quanto tempo leva para sair do spam depois de corrigir?**
Os registros SPF, DKIM e DMARC em geral passam a valer em poucas horas. A reputação leva mais: de uma a quatro semanas de envios regulares e bem-recebidos para o provedor atualizar a nota.
