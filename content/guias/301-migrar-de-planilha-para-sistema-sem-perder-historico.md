---
num: 301
titulo: "Migrar de planilha para sistema sem perder histórico"
slug: "migrar-de-planilha-para-sistema-sem-perder-historico"
title_seo: "Migrar de planilha para sistema sem perder histórico"
meta_description: "Migrar da planilha para um sistema sem perder histórico: congelar, limpar, importar e conferir. Veja o roteiro em quatro etapas e o que costuma dar errado."
mes: "2027-06"
bloco: "pratica"
puxa: "Sistema"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/sistema-para-pequenas-empresas/", "/guias/o-que-e-banco-de-dados-e-por-que-a-planilha-nao-e-um/", "/guias/importar-cadastro-antigo-o-que-limpar-antes/", "/comparativos/avila-ops-vs-ferramentas-saas/"]
---

# Migrar de planilha para sistema sem perder histórico

Migrar de planilha para sistema sem perder histórico é um roteiro de quatro etapas: congelar a planilha numa data, limpar o que vai ser importado, importar em blocos (clientes, produtos, pedidos) e conferir os totais antes de desligar a planilha. O histórico só se perde quando alguém pula a primeira ou a última etapa.

O medo da migração tem motivo: anos de pedidos, clientes e preços numa planilha que "funciona". O erro é achar que migrar é copiar e colar. É mais parecido com mudança de casa. Você não leva tudo, leva o que serve, e confere se chegou. Junho, apesar do movimento, é um mês bom para planejar a migração de julho, com a temporada registrada por inteiro.

## O que é histórico e o que não é

Nem tudo que está na planilha é histórico. Antes de migrar, separe:

- Histórico que vale: pedidos com data, cliente, produto e valor. Cadastro de clientes com contato. Cadastro de produtos com custo e preço. Movimentação de estoque, se você registrava.
- Histórico que parece valer mas não: colunas de "observação" livres, abas de rascunho, cálculos intermediários, versões antigas da mesma lista.
- O que não é histórico, é lixo: linhas duplicadas, clientes de teste, produtos que não existem mais e nunca venderam.

O sistema recebe o primeiro grupo. O segundo fica guardado como arquivo, a planilha original, congelada. O terceiro é apagado na limpeza.

Uma regra prática: se você não consultou aquela informação nos últimos 12 meses, ela não precisa entrar no sistema. Precisa estar guardada.

## As quatro etapas

1. Congelar. Escolha uma data e hora. A partir dela, ninguém edita a planilha. Faça uma cópia com o nome "planilha-final-AAAA-MM-DD" e guarde em dois lugares. Essa cópia é o seu seguro; toda dúvida futura volta nela.
2. Limpar. Padronizar nome de cliente (um cadastro por pessoa), unificar produto escrito de três jeitos, corrigir valor com texto no meio, preencher campo obrigatório que falta. Essa é a etapa mais longa, e é onde a migração é feita ou perdida.
3. Importar em blocos, nessa ordem: produtos, clientes, pedidos. Pedido aponta para cliente e produto, então os dois precisam existir antes. Cada bloco importado é conferido antes do próximo.
4. Conferir totais. Número de clientes na planilha e no sistema. Número de pedidos. Soma dos valores de pedido por mês, nos últimos 12 meses. Se bate, a migração está certa. Se não bate, o sistema ainda não é a fonte oficial.

| Etapa | Quem faz | Tempo típico para planilha de loja pequena |
|---|---|---|
| Congelar | Você | Uma hora |
| Limpar | Você, com apoio de quem migra | Alguns dias, em paralelo à operação |
| Importar | Quem faz a migração | Um dia |
| Conferir | Você e quem migra | Meio dia |

Os tempos dependem do estado da planilha. Uma planilha com cadastro limpo migra em uma semana. Uma com cinco anos de "observações" leva mais, e a diferença está toda na etapa 2.

## O que costuma dar errado

Operar nos dois ao mesmo tempo. Durante a migração, alguém continua lançando pedido na planilha "só hoje". Esses pedidos não entram no sistema, e o histórico perde exatamente a semana da migração. Congelar significa congelar.

Importar sem limpar. O cliente "Maria Silva", "maria silva" e "M. Silva" entram como três clientes. O sistema herda a sujeira, e a migração parece ter piorado tudo.

Não conferir. A importação "deu certo" porque não deu erro. Erro é diferente de estar certo. Uma linha com data no formato errado pode ter entrado como pedido de 1900.

Jogar a planilha fora. Ela é o seguro. Fica guardada, congelada, pelo tempo que o contador exigir, e serve para toda dúvida do tipo "mas em maio não era outro preço?".

## O que fazer agora

Abra a sua planilha e conte: quantos clientes, quantos produtos, quantos pedidos nos últimos 12 meses. Esses três números são o que você vai conferir depois da importação, e são o começo de qualquer conversa sobre migrar. Sair da planilha sem perder o histórico: https://avilaops.com/sistema-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Perco os dados antigos ao migrar da planilha para um sistema?**
Não, se a planilha for congelada e guardada, e se pedidos, clientes e produtos forem importados e conferidos por totais. O que se perde é o que ninguém conferiu. A planilha original fica como arquivo.

**Quanto tempo leva para migrar uma planilha para um sistema?**
De uma semana a um mês, dependendo do estado da planilha. A limpeza do cadastro é o que define o prazo. Uma planilha com cadastro consistente migra rápido; uma com anos de nomes repetidos e campos livres leva mais.

**Posso continuar usando a planilha depois da migração?**
Como arquivo, sim. Como registro ativo, não. Se dois lugares registram pedido, o histórico se divide de novo, e você volta ao problema que a migração resolveu. A partir da data de corte, o sistema é a única fonte.
