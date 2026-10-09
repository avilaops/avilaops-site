---
num: 22
titulo: "Cálculo de frete por CEP: por que o valor errado espanta cliente"
slug: "calculo-de-frete-por-cep"
title_seo: "Cálculo de frete por CEP: por que o valor errado espanta"
meta_description: "Frete errado no site vem de peso e medidas mal cadastrados, não do CEP. Veja como o cálculo funciona, os erros que inflam o valor e como conferir."
mes: "2026-09"
bloco: "pratica"
puxa: "Loja"
pilar: "Vendas"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-09-22"
links_internos: ["/guias/embalagem-medida-custo-do-frete/", "/guias/o-que-e-frete-e-quem-paga/", "/guias/carrinho-abandonado-tres-motivos/", "/loja-virtual/"]
---

# Cálculo de frete por CEP: por que o valor errado espanta cliente

Quando o frete aparece caro demais no site, o problema quase nunca é o CEP. É o peso e as medidas cadastradas no produto. A loja manda para os Correios ou para a transportadora o CEP de destino, o peso e as dimensões da caixa; com um produto cadastrado com 2 kg e 40 cm de lado quando tem 300 g e cabe numa caixa pequena, o valor volta dobrado e o cliente vai embora achando que você cobra caro.

O frete por CEP é a primeira coisa que o cliente calcula e a última que o dono confere. Um cadastro feito às pressas erra o valor em todo pedido, e ninguém avisa. Conferir leva 15 minutos.

## Como o cálculo funciona?

A cada vez que alguém digita o CEP, a loja consulta a tabela da transportadora com quatro dados:

1. CEP de origem (o seu) e CEP de destino. Define a faixa de distância e a região.
2. Peso do pacote em gramas.
3. Dimensões da caixa: comprimento, largura e altura.
4. Serviço: PAC, SEDEX, Jadlog, Loggi e assim por diante.

Com dimensões, a transportadora calcula o peso cúbico (comprimento vezes largura vezes altura, em centímetros, dividido por um fator; nos Correios, 6.000). Nos Correios, quando o cúbico passa de 5 kg, a cobrança usa o maior entre o peso real e o cúbico; abaixo disso, vale o peso real. Outras transportadoras têm regra própria. Uma caixa grande e leve, acima desse limite, é cobrada como se fosse pesada. O guia [embalagem medida: o produto que sai mais caro sem precisar](https://avilaops.com/guias/embalagem-medida-custo-do-frete/) trata disso em detalhe.

Com mais de um produto no carrinho, a loja soma os pesos e estima uma caixa. Se cada produto está cadastrado com a caixa individual, o frete de dois itens explode.

## Onde o erro entra?

Seis causas cobrem quase todos os casos:

| Causa | Como reconhecer | Conserto |
|---|---|---|
| Peso ou medida padrão da plataforma | Todos os produtos com o mesmo peso (1 kg, por exemplo) | Pese e meça cada produto embalado e cadastre o real |
| Medida do produto, não da caixa | Frete diferente do que os Correios cobram no balcão | Cadastre as medidas da embalagem fechada |
| Caixa individual em pedido múltiplo | Frete de dois itens é o dobro do de um | Configure a regra de agrupamento da plataforma ou use caixas padrão |
| CEP de origem errado | Frete alto para quem mora perto de você | Confira o CEP de origem nas configurações de envio |
| Só um serviço ativo | Aparece só SEDEX, sem PAC | Ative o serviço econômico; o cliente escolhe |
| Taxa fixa somada ao frete | Valor sempre acima da cotação dos Correios | Mantenha pequena e informada, ou retire |

## Como conferir em 15 minutos?

1. Pegue os cinco produtos mais vendidos e pese cada um já embalado, numa balança de cozinha.
2. Meça a caixa fechada de cada um, em centímetros.
3. Compare com o que está cadastrado na loja. Corrija o que estiver diferente.
4. Simule o frete no site para três CEPs: um da sua cidade, um de capital distante e um do interior de outro estado.
5. Cote os mesmos três CEPs, com o mesmo peso e caixa, direto no site dos Correios ou na tabela que a sua loja usa (balcão, contrato ou intermediário de frete). Os valores precisam bater com essa tabela. Se não batem, o problema está no cadastro ou no CEP de origem.

Repita com dois produtos no carrinho e ajuste a regra de agrupamento se o valor disparar. Frete alto no carrinho é um dos motivos que aparecem em [carrinho abandonado: os três motivos mais comuns](https://avilaops.com/guias/carrinho-abandonado-tres-motivos/).

## O que mais fazer para o frete não espantar?

Mostre o frete cedo: um campo de CEP na ficha do produto e no carrinho evita a surpresa no checkout. Mostre o prazo em dias úteis junto com o valor. E deixe sempre a opção econômica: quem não tem pressa escolhe o PAC e sente que economizou. Quem paga o quê, e as três formas de dividir a conta, está em [o que é frete e quem paga o quê](https://avilaops.com/guias/o-que-e-frete-e-quem-paga/).

## O que fazer agora

Faça o teste dos cinco produtos e três CEPs hoje. Se algum valor não bater com os Correios, o seu frete está espantando cliente desde o dia em que a loja abriu. Loja no ar em um dia, com cálculo por CEP integrado aos Correios e transportadoras, sem comissão sobre a venda: https://avilaops.com/loja-virtual/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Por que o frete do meu site está mais caro que nos Correios?**
Quase sempre por peso ou medidas cadastradas maiores que as reais, ou por uma taxa fixa somada ao frete. Compare a cotação do site com a dos Correios usando o mesmo peso e caixa.

**O que é peso cúbico?**
É o peso calculado pelo volume da caixa: comprimento vezes largura vezes altura, dividido por um fator da transportadora (6.000 nos Correios). Nos Correios, ele só conta quando passa de 5 kg; aí a cobrança usa o maior entre o real e o cúbico. Caixa grande e leve, acima desse limite, paga como pesada.

**Preciso cadastrar peso e medida em cada produto?**
Precisa, ou a plataforma usa um valor padrão e o frete sai errado. Pese e meça o produto já embalado. Para produtos parecidos, cadastre uma vez e copie.
