---
num: 302
titulo: "Importar cadastro antigo: o que limpar antes"
slug: "importar-cadastro-antigo-o-que-limpar-antes"
title_seo: "Importar cadastro antigo: o que limpar antes"
meta_description: "Cadastro antigo importado sem limpeza vira cliente em triplicado e produto sem preço. Veja os sete problemas mais comuns e a ordem certa de limpar cada um."
mes: "2027-06"
bloco: "pratica"
puxa: "Sistema"
pilar: "Operação"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-06-29"
links_internos: ["/sistema-para-pequenas-empresas/", "/guias/migrar-de-planilha-para-sistema-sem-perder-historico/", "/guias/o-que-e-banco-de-dados-e-por-que-a-planilha-nao-e-um/", "/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd/"]
---

# Importar cadastro antigo: o que limpar antes

Antes de importar um cadastro antigo, limpe sete coisas: duplicados, nomes escritos de jeitos diferentes, campos obrigatórios vazios, formatos misturados (telefone, CEP, valor), registros de teste, registros mortos e dados que você não tem mais motivo para guardar. Nessa ordem. Cadastro importado sujo é cadastro sujo com mais custo.

Para pequena empresa, o cadastro antigo é a soma de anos de pressa: o cliente anotado no WhatsApp, o produto cadastrado duas vezes com nomes diferentes, o telefone com e sem DDD. Nada disso doía na planilha porque a planilha aceita tudo. O sistema vai recusar ou, pior, aceitar e multiplicar.

## Os sete problemas, na ordem de limpar

| Ordem | Problema | Como aparece | O que fazer |
|---|---|---|---|
| 1 | Registros de teste e lixo | "Teste", "asdf", cliente com telefone 000 | Apagar |
| 2 | Registros mortos | Produto que não vende há 2 anos, cliente sem compra há mais de 2 | Arquivar fora do sistema, não importar |
| 3 | Duplicados exatos | Mesma linha repetida | Manter uma |
| 4 | Duplicados por escrita | "Maria Silva", "maria silva", "M. Silva", mesmo telefone | Unificar em um, mantendo o histórico de todos |
| 5 | Formato misturado | Telefone com e sem DDD, CEP com e sem hífen, valor "R$ 79,00" e "79" | Padronizar cada coluna para um formato só |
| 6 | Campo obrigatório vazio | Produto sem preço, cliente sem contato, pedido sem data | Preencher ou decidir que não entra |
| 7 | Dado sem motivo para guardar | CPF de quem comprou uma vez em 2022, data de nascimento que ninguém usa | Não importar |

A ordem importa porque cada etapa reduz o trabalho da seguinte. Apagar teste e arquivar morto antes de unificar duplicados pode cortar a lista pela metade.

## Como achar duplicado quando o nome é diferente

Nome não identifica pessoa. Telefone e e-mail identificam. Para cliente, ordene a lista por telefone: dois nomes com o mesmo número são a mesma pessoa. Depois por e-mail. O que sobrar sem telefone nem e-mail é cliente que você não consegue contatar, e a pergunta é se ele deve entrar.

Para produto, o identificador é o código de barras ou o código interno. Sem código, é nome mais variação. "Caneca branca 300ml" e "Caneca 300 ml branca" são o mesmo produto, e o sistema vai criar dois se você não unificar antes.

Um limite: unificar exige decidir qual registro é o principal e o que fazer com o histórico do outro. Pedidos da "M. Silva" precisam ir para a "Maria Silva" unificada, não sumir.

## O que não importar, e por que isso é uma decisão

O item 7 da tabela costuma ser pulado, e é o mais importante. A LGPD pede que todo dado pessoal tenha uma finalidade e que você guarde só o necessário para ela (art. 6º). CPF de quem comprou uma vez há três anos, sem nota fiscal a manter, dificilmente tem finalidade. Importar é aumentar o que você precisa proteger.

Regra prática: para cada coluna de dado pessoal, pergunte "para que uso isso hoje?". Se a resposta é "pode ser útil um dia", não importa. Guarde na planilha congelada, no arquivo, e importe só o que tem uso.

O mesmo vale para o registro morto. Cliente sem compra há mais de dois anos entra no sistema como um contato que você não vai usar, mas que aparece em toda busca e em toda contagem. Arquivar é mais honesto que importar.

## O que fazer agora

Exporte a sua lista de clientes e ordene por telefone. O número de linhas com telefone repetido é a medida da limpeza que falta. Se passa de 10%, a limpeza vem antes de qualquer importação. A Avila Ops faz a migração com a limpeza incluída no escopo, e o escopo vem em 48h: https://avilaops.com/sistema-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Como limpar cadastro de clientes duplicados?**
Ordene por telefone e por e-mail, não por nome. Registros com o mesmo contato são a mesma pessoa. Escolha um como principal, mova o histórico dos outros para ele e apague o resto. Faça isso antes de importar, na planilha.

**Preciso importar todos os clientes antigos para o sistema?**
Não. Importe quem comprou nos últimos 12 a 24 meses e quem tem relação ativa. O restante fica arquivado na planilha congelada. Cadastro menor e limpo é mais útil que cadastro grande e sujo.

**Posso importar CPF e dados pessoais do cadastro antigo?**
Só o que tem finalidade hoje: emitir nota, entregar, atender. CPF de quem não compra há anos e sem obrigação fiscal de guardar não deve ser importado. Pela LGPD, dado sem finalidade não deveria ficar guardado, e o sistema novo é o momento de reduzir esse risco.
