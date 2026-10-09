---
num: 293
titulo: "Estoque em dois lugares: loja e site"
slug: "estoque-em-dois-lugares-loja-e-site"
title_seo: "Estoque em dois lugares: loja física e site"
meta_description: "Loja física e site vendendo o mesmo estoque sem integração é vender duas vezes o que só tem um. Veja as três formas de resolver e qual serve para você."
mes: "2027-06"
bloco: "pratica"
puxa: "Operação"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/sistema-para-pequenas-empresas/", "/guias/o-que-e-integracao-entre-dois-sistemas/", "/guias/contar-estoque-sem-parar-a-operacao/", "/guias/o-que-e-estoque-minimo/"]
---

# Estoque em dois lugares: loja e site

Quando a loja física e o site vendem o mesmo produto, o estoque precisa ser um só, atualizado pelos dois. Se cada um tem a sua contagem, você vende no site o que acabou no balcão às 15h e descobre à noite, cancelando pedido. A solução é um único registro de estoque que a loja e o site consultam e baixam.

Esse problema aparece justamente no mês bom. Na semana do Dia dos Namorados, a floricultura vende arranjo no balcão e no site. A loja de presentes vende a mesma caneca nos dois. Quanto mais vende, mais o estoque duplicado erra, e o cancelamento chega no pior dia.

## Por que dois estoques sempre divergem

Não é descuido. É matemática. Cada venda no balcão que não baixa o estoque do site deixa o site achando que tem um a mais. Cada venda no site que não baixa o estoque da loja deixa o vendedor prometendo o que já foi pago por outro.

Com poucos itens e pouca venda, a divergência é pequena e alguém corrige de manhã. Com 30 pedidos por dia, a divergência é diária, e a correção manual da manhã já está errada às 10h.

E existe o estoque "reservado": o pedido pago no site que ainda não foi separado. Ele não está mais disponível, mas ainda está na prateleira. Se o balcão não sabe disso, vende a última unidade para quem entrou na loja.

## As três formas de resolver

| Forma | Como funciona | Serve para |
|---|---|---|
| Estoque separado por canal | Você decide: 10 unidades para o balcão, 5 para o site. Cada canal vende só a sua parte. | Poucos produtos, muito estoque, sem sistema |
| Sincronização manual com hora marcada | Uma pessoa atualiza o site com a contagem do balcão duas vezes por dia | Até uns 10 pedidos por dia, produto sem giro rápido |
| Estoque único integrado | Venda em qualquer canal baixa o mesmo saldo, na hora, e reserva o pedido pago | Qualquer loja com giro diário nos dois canais |

A primeira funciona mas desperdiça: o site diz "esgotado" enquanto o balcão tem 8. A segunda funciona até a primeira semana cheia. A terceira é a única que continua funcionando em junho.

## O que muda com o estoque único

A venda no balcão é registrada no mesmo sistema que o site consulta. O caixa da loja física é uma tela do sistema, não um caderno. Quando o balcão vende, o site vê o saldo novo em segundos.

O pedido pago no site reserva a unidade. O vendedor do balcão vê "3 em estoque, 1 reservado" e sabe que só pode vender 2.

E o estoque mínimo passa a valer para a soma, não para cada canal. O alerta de reposição dispara olhando o que a empresa tem, não o que o site acha que tem.

Um limite: estoque único exige que a loja física registre toda venda no sistema, na hora. Se o balcão "anota depois", a divergência volta. É uma mudança de hábito antes de ser uma mudança de ferramenta.

## O que fazer agora

Conte hoje os cinco produtos que mais vendem, no balcão e no site, e compare com o que cada sistema diz que tem. Se algum número diverge, é provável que você já tenha cancelado pedido por isso, mesmo sem lembrar. Sair da planilha sem perder o histórico, com um estoque só para loja e site: https://avilaops.com/sistema-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Como integrar o estoque da loja física com a loja virtual?**
Com um único sistema de estoque que o caixa da loja e a loja virtual consultam. A venda em qualquer um dos dois baixa o mesmo saldo. Se o caixa físico é um sistema fechado sem porta de entrada (API), a integração pode não ser possível, e é o momento de trocar.

**O que fazer quando vendi no site um produto que acabou na loja?**
Avise o cliente na primeira hora, com opção: espera a reposição com prazo, troca por item similar, ou reembolso integral na hora. E registre o caso, porque ele é o sintoma do estoque duplicado.

**Vale reservar estoque só para o site?**
Vale como solução temporária para produto de alto giro em data comemorativa. Em vez de arriscar cancelamento, você separa fisicamente o que o site pode vender. É a primeira forma da tabela, e ela desperdiça, mas não cancela.
