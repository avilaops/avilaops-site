---
num: 333
titulo: "Cópia de segurança do site: com que frequência e onde"
slug: "copia-de-seguranca-do-site-frequencia-e-onde"
title_seo: "Cópia de segurança do site: frequência e onde guardar"
meta_description: "Backup do site: diário para quem vende ou publica, semanal para site parado, guardado fora do servidor. A regra 3-2-1 e como testar a cópia."
mes: "2027-07"
bloco: "pratica"
puxa: "Segurança"
pilar: "Operação"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/hospedagem-barata-o-que-voce-paga/", "/guias/o-que-e-monitoramento-de-site/", "/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd/", "/contato/"]
---

# Cópia de segurança do site: com que frequência e onde

A cópia de segurança (backup) do site deve ser feita todo dia se o site vende, recebe pedidos ou publica conteúdo; toda semana se ele é institucional e muda pouco; e sempre antes de qualquer atualização ou mudança. Deve ser guardada fora do servidor onde o site está, porque a cópia que mora no mesmo lugar morre junto com o original. E precisa ser testada: cópia que nunca foi restaurada é uma esperança, não um backup.

A regra que resume: frequência igual à quantidade de trabalho que você aceita perder. Se perder um dia de pedidos é inaceitável, a cópia é diária. Se perder uma semana de nada não muda a vida, semanal basta.

## O que precisa estar na cópia?

Um site tem duas partes, e a cópia precisa das duas. Os arquivos: tema, complementos, imagens, documentos enviados. E o banco de dados: textos das páginas, pedidos, cadastros, configurações. Cópia só dos arquivos restaura um site vazio. Cópia só do banco restaura textos sem imagem.

Para loja virtual, entra ainda o que está fora do site: histórico de pedidos na plataforma de pagamento, cadastro de produtos (se estiver numa planilha à parte), integrações. A plataforma da Avila Ops guarda isso por padrão; em plataforma própria, confira onde cada coisa mora.

Para e-mail, a cópia é separada do site. Caixas de e-mail profissional devem ter exportação periódica ou um serviço que guarde mensagens apagadas por um período.

## Onde guardar e por quanto tempo?

A regra 3-2-1, usada há anos em tecnologia: três cópias dos dados, em dois tipos de lugar diferentes, sendo uma fora do local principal. Para um site de empresa pequena, isso se traduz em:

| Cópia | Onde | Para quê |
|---|---|---|
| 1 | No próprio servidor, automática pela hospedagem | Restauração rápida de erro pequeno |
| 2 | Num serviço de armazenamento em nuvem separado, automático | Servidor invadido, hospedagem que sumiu |
| 3 | Num disco ou conta que só você acessa, mensal | Conta invadida, fornecedor que saiu, erro humano na nuvem |

Guarde várias versões, não só a última. Uma invasão pode ter acontecido há duas semanas; se a única cópia é de ontem, ela já contém o problema. Trinta dias de cópias diárias e 12 meses de cópias mensais é uma boa referência para site de empresa pequena.

Quem tem hospedagem barata deve conferir se a cópia prometida existe mesmo e se você consegue restaurar sem abrir chamado. O guia sobre hospedagem barata mostra onde isso costuma falhar: https://avilaops.com/guias/hospedagem-barata-o-que-voce-paga/.

## Como saber se a cópia funciona?

Restaurando. Uma vez por trimestre, pegue a cópia mais recente e suba num endereço de teste. Se o site aparece inteiro, com imagens e textos, a cópia funciona. Se dá erro, melhor descobrir agora do que no dia da invasão.

A cópia não serve quando o arquivo é muito menor do que o site, quando a última é de semanas atrás e deveria ser de ontem, ou quando restaurar depende de um suporte que não tem prazo.

Cópia de segurança e monitoramento andam juntos: um avisa que caiu, o outro permite voltar. O guia sobre monitoramento explica a primeira parte: https://avilaops.com/guias/o-que-e-monitoramento-de-site/. E se o site guarda dados de cliente, a cópia também é dado pessoal; ela precisa estar protegida e ter prazo de descarte, como pede a LGPD. O guia sobre IA no atendimento sem violar a LGPD tem os princípios que valem aqui também: https://avilaops.com/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd/.

## O que fazer agora

Pergunte a quem cuida do seu site: qual é a data da última cópia, onde ela está e quanto tempo leva para restaurar. Se alguma resposta demorar mais de um dia para chegar, você não tem cópia de segurança; tem uma promessa. Diagnóstico do que está exposto, em uma conversa: https://avilaops.com/contato/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Com que frequência fazer backup do site?**
Diária para site que vende, agenda ou publica. Semanal para site institucional que muda pouco. Sempre antes de atualizar plataforma, tema ou complementos. A frequência certa é a quantidade de trabalho que você aceita perder.

**A hospedagem já faz backup do meu site?**
Muitas fazem, mas confira se a cópia inclui banco de dados e arquivos, se fica fora do servidor do site, e se você consegue restaurar sozinho pelo painel. Cópia que mora no mesmo servidor e depende de chamado é meia cópia.

**Backup protege contra invasão do site?**
Não evita a invasão; permite voltar ao estado anterior a ela. Para isso é preciso ter cópias de várias datas, não só a última. Prevenir a invasão é outro trabalho: atualização, senha forte, acesso restrito.
