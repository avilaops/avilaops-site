---
num: 4
titulo: "Quem é quem no pagamento: loja, banco, bandeira e intermediário"
slug: "quem-e-quem-no-pagamento-online"
title_seo: "Quem é quem no pagamento online da loja virtual"
meta_description: "Loja, banco do cliente, bandeira do cartão e intermediário: cada um faz uma parte e cobra por ela. Entenda o caminho do dinheiro da compra até a sua conta."
mes: "2026-09"
bloco: "basico"
puxa: "Pagamento"
pilar: "Vendas"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2026-09-04"
links_internos: ["/guias/o-que-e-gateway-de-pagamento-e-quanto-cobra/", "/guias/prazo-de-recebimento-do-cartao/", "/loja-virtual/"]
---

# Quem é quem no pagamento: loja, banco, bandeira e intermediário

Em uma compra online com cartão, quatro partes participam: a loja (você), o banco do cliente (quem emitiu o cartão), a bandeira (Visa, Mastercard, Elo, que faz a regra e a rede) e o intermediário de pagamento (quem conecta a sua loja a tudo isso e deposita na sua conta). Cada um faz uma parte e cobra por ela.

Quando algo dá errado, você precisa saber para quem ligar. Cartão recusado quase sempre é decisão do banco do cliente; às vezes, do antifraude do intermediário. Dinheiro que não caiu é conversa com o intermediário. Estorno forçado pelo banco (chargeback) passa pela bandeira.

## O que cada um faz na hora da compra?

Em segundos, acontece isto:

1. O cliente digita o cartão no checkout da sua loja.
2. O intermediário (Mercado Pago, PagSeguro, Pagar.me e outros) recebe os dados, passa pelo antifraude e pede autorização por meio da adquirente.
3. A bandeira leva o pedido até o banco do cliente.
4. O banco confere limite, senha, fraude e responde: aprovado ou negado.
5. A resposta volta pelo mesmo caminho e a sua loja marca o pedido como pago.

O dinheiro ainda não está com você. No crédito, o banco do cliente paga a adquirente cerca de 30 dias depois da compra; a adquirente repassa ao intermediário, que deposita na sua conta no prazo do contrato. No parcelado, o valor chega de uma vez ou parcela a parcela, conforme o contrato. É por isso que cartão de crédito costuma demorar; o guia [prazo de recebimento: por que o dinheiro do cartão demora](https://avilaops.com/guias/prazo-de-recebimento-do-cartao/) detalha esse ponto. No Pix, não há bandeira: o Banco Central mantém a rede e o dinheiro cai na hora.

## Quem cobra o quê?

O banco do cliente fica com uma fatia de cada transação, chamada de taxa de intercâmbio. A bandeira cobra a taxa dela pelo uso da rede. A adquirente e o intermediário somam a parte deles, e você paga um percentual único, que já inclui tudo.

A plataforma da loja pode cobrar uma comissão a mais; a Avila Ops não cobra. A taxa que existe é a do intermediário, conforme o contrato dele. Veja [o que é o intermediário de pagamento e quanto ele cobra](https://avilaops.com/guias/o-que-e-gateway-de-pagamento-e-quanto-cobra/).

## O que fazer agora

Abra o extrato do seu intermediário e separe, por venda: valor, taxa descontada e data do depósito. Se não dá para ver os três, está no lugar errado. Pix na hora, cartão e boleto sem comissão da plataforma: https://avilaops.com/loja-virtual/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Adquirente e intermediário são a mesma coisa?**
Quase. A adquirente (Cielo, Rede, Stone) tem contrato direto com as bandeiras e liquida as vendas. O intermediário, ou subadquirente, usa a estrutura de uma adquirente e simplifica o cadastro da loja pequena. Mercado Pago e PagSeguro hoje fazem os dois papéis. Para você, o efeito é o mesmo: uma taxa e um prazo.

**Preciso de conta em banco específico para receber?**
Não. O intermediário deposita em qualquer conta no nome do titular do cadastro. Use a conta da empresa para não misturar com o dinheiro pessoal.

**Quem responde quando o cartão é recusado?**
Quase sempre o banco do cliente; às vezes, o antifraude do intermediário. A loja só recebe "negado", quase sempre sem o motivo. Oriente o cliente a tentar outro cartão ou Pix.
