---
num: 152
titulo: "Frente de caixa (PDV) e loja online falando a mesma língua"
slug: "pdv-e-loja-online-falando-a-mesma-lingua"
title_seo: "Frente de caixa (PDV) e loja online falando a mesma língua"
meta_description: "Loja física e online precisam do mesmo cadastro de produto e do mesmo estoque. Veja o que dá errado sem isso, os níveis de integração e por onde começar."
mes: "2027-01"
bloco: "pratica"
puxa: "Sistema"
pilar: "Operação"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-01-30"
links_internos: ["/guias/o-que-e-erp-financeiro-estoque-e-vendas-juntos/", "/loja-virtual/", "/sistema-para-pequenas-empresas/"]
---

# Frente de caixa (PDV) e loja online falando a mesma língua

Frente de caixa (PDV, ponto de venda) e loja online falam a mesma língua quando usam o mesmo cadastro de produto, com o mesmo código, e descontam do mesmo estoque. Se a loja física vende a última unidade de um item às 15h e a loja online continua mostrando "disponível" até alguém conferir à noite, elas falam línguas diferentes, e quem paga é o cliente que comprou o que não existe.

Isso vira problema no momento em que a loja pequena abre o canal online sem pensar no estoque. Nas primeiras semanas dá certo, porque o movimento é baixo. Depois de uma data forte, dezembro ou uma promoção, aparecem os pedidos de item que já tinha acabado no balcão. Cada um vira estorno, mensagem de desculpa e uma avaliação a menos.

## O que dá errado quando os dois não conversam?

Do mais frequente ao mais caro:

1. Venda do que não tem. Online vende o que o balcão já levou. Estorno, cliente perdido.
2. Preço diferente em cada canal. Reajustou no PDV, esqueceu no site. Cliente descobre e pede o menor.
3. Cadastro duplicado. O mesmo produto com dois nomes, dois códigos, duas fotos. Ninguém sabe qual é o estoque real.
4. Fechamento manual. Toda noite alguém soma o que vendeu nos dois lugares para saber o que repor. Uma hora por dia, todos os dias.

A quarta é a que menos dói e mais custa, porque é invisível.

## Quais são os níveis de integração?

Não precisa ir para o mais alto de uma vez. Cada nível resolve uma parte:

| Nível | Como funciona | Resolve | Serve para |
|---|---|---|---|
| 1. Mesmo cadastro | Um único código por produto, usado nos dois lugares. Estoque ainda é conferido à mão | Cadastro duplicado, preço diferente | Loja com até algumas dezenas de produtos e giro lento |
| 2. Estoque sincronizado | Venda em qualquer canal baixa o mesmo estoque, em minutos | Venda do que não tem | Loja com giro diário e produtos únicos ou de pouca quantidade |
| 3. Operação única | PDV, loja online, estoque, financeiro e nota fiscal no mesmo sistema | Fechamento manual, relatório separado por canal | Loja com mais de um vendedor, nota diária e reposição por curva de venda |

O nível 1 é grátis e é uma tarde de trabalho: padronizar código, nome e preço. O nível 2 depende de o PDV e a loja online conversarem, por integração pronta ou construída. O nível 3 é o sistema integrado descrito em https://avilaops.com/guias/o-que-e-erp-financeiro-estoque-e-vendas-juntos/, e só faz sentido quando os dois primeiros ficaram pequenos.

## Por onde começar em janeiro?

Pelo cadastro. Muita loja conta o estoque físico na virada do ano. Aproveite essa contagem para dar a cada produto um código único, o mesmo que vai para a loja online, e apagar as duplicatas. Se o produto tem código de barras do fabricante, use-o. Se não tem, crie um padrão simples e não mude mais.

Com o cadastro limpo, a pergunta seguinte é se o seu PDV consegue exportar ou sincronizar estoque. Se não consegue, a decisão é trocar um dos dois, não manter a conferência manual para sempre.

Uma loja online da Avila Ops entra no nível 1 no primeiro dia, com o cadastro de produtos feito por você ou pela gente no plano Loja Pro, e vai para o nível 2 ou 3 quando o PDV é integrado no diagnóstico. Loja no ar em um dia, sem comissão sobre a venda: https://avilaops.com/loja-virtual/.

## O que fazer agora

Conte quantos produtos têm cadastro diferente no balcão e no site. Se passar de dez, o inventário de janeiro é a hora de unificar. Anote quanto tempo por dia alguém gasta conferindo estoque entre os dois canais: esse número é o que a integração devolve. Para ligar o PDV, a loja online e o estoque num registro só, sair da planilha sem perder o histórico: https://avilaops.com/sistema-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Preciso trocar o meu PDV para vender online?**
Nem sempre. Se ele exporta o cadastro e o estoque, ou tem integração com a loja online escolhida, fica. Se ele é fechado e só imprime cupom, a integração vai exigir trabalho manual ou a troca. O diagnóstico responde isso em uma conversa.

**Vendo também no Mercado Livre e no Instagram. Entram na integração?**
Entram, como canais que puxam do mesmo estoque. A regra é a mesma: um cadastro, um estoque, todos os canais descontando dele. Quanto mais canais sem integração, mais rápido aparece a venda do que não tem.

**E a nota fiscal, sai dos dois lugares?**
No nível 3, sai do mesmo emissor, com o mesmo cadastro, para balcão e online. Nos níveis 1 e 2, cada canal emite do seu jeito e a contabilidade recebe dois relatórios. Funciona, mas é uma das razões de subir de nível.
