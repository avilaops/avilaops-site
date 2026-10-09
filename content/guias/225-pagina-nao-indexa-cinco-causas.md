---
num: 225
titulo: "Sua página não indexa: as cinco causas comuns"
slug: "pagina-nao-indexa-cinco-causas"
title_seo: "Sua página não indexa: as cinco causas comuns"
meta_description: "Noindex esquecido, robots.txt bloqueando, página órfã, conteúdo repetido e site lento: as cinco causas que tiram uma página do Google e como corrigir."
mes: "2027-04"
bloco: "pratica"
puxa: "SEO"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-indexacao-pagina-nao-existe-google/", "/guias/o-que-e-robots-txt/", "/guias/duas-paginas-brigando-pela-mesma-busca/", "/presenca-digital-para-pequenas-empresas/"]
---

# Sua página não indexa: as cinco causas comuns

Quando uma página não aparece no Google, a causa está quase sempre numa lista de cinco: uma marcação noindex esquecida, um bloqueio no robots.txt, a página não receber nenhum link, o conteúdo ser repetido ou fraco demais, ou o site falhar quando o robô passa. O Search Console diz qual é.

O dono da empresa costuma descobrir tarde. Antes de qualquer trabalho de conteúdo, cheque as cinco causas: é uma hora de trabalho e resolve a maior parte dos casos. Se você quer entender o mecanismo antes, leia [o que é indexação](https://avilaops.com/guias/o-que-e-indexacao-pagina-nao-existe-google/).

## Causas 1 e 2: alguém mandou o Google não entrar

A marcação noindex é uma linha no código da página que diz "não guarde esta". É útil em página de obrigado, área de login e rascunho. O problema é quando fica ligada por engano. Plataformas de site têm uma opção do tipo "evitar que mecanismos de busca indexem este site" ou "ocultar da pesquisa", que alguém marcou durante a construção e esqueceu. No Search Console, aparece como "URL marcado como noindex". Correção: desmarcar a opção na página ou no site inteiro e pedir a indexação.

O [robots.txt](https://avilaops.com/guias/o-que-e-robots-txt/) é o segundo lugar onde alguém proíbe a entrada. A linha `Disallow: /` bloqueia tudo; `Disallow: /servicos/` bloqueia uma pasta inteira. No Search Console aparece como "URL bloqueado pelo arquivo robots.txt". Correção: abrir `seudominio.com.br/robots.txt`, achar a linha e removê-la ou restringir a pasta certa. Depois, "Validar correção".

## Causa 3: a página é órfã

Página órfã é a que nenhuma outra página linka. O robô do Google navega por links; se nada aponta para a página, ele só a encontra pelo sitemap, e mesmo assim dá pouca importância a ela. Isso acontece com páginas criadas para anúncio, páginas antigas que saíram do menu e produtos de loja que não estão em nenhuma categoria.

No Search Console, costuma aparecer como "Detectada, mas não indexada no momento" (o Google sabe que existe, mas não foi lá) ou simplesmente não aparece na lista. Correção: linkar a página a partir de pelo menos duas outras, com texto de link que descreva o destino. Uma página de serviço deve estar no menu ou numa página de categoria; um texto de blog deve ser linkado de outros textos relacionados.

## Causa 4: o conteúdo é repetido ou fraco

Esta é a causa que mais confunde, porque não há erro técnico. O Google leu a página e decidiu que não vale guardar. No painel aparece como "Rastreada, mas ainda não indexada" ou numa das linhas que começam com "Cópia" (por exemplo, quando o Google escolheu outra página sua como a principal, a canônica).

Os casos comuns: página de serviço com três frases e uma foto; 10 páginas de bairro com o mesmo texto trocando só o nome do bairro; produto com a descrição copiada do fornecedor, que existe em 200 outras lojas; página nova que repete o que outra página sua já diz. Correção: ou a página ganha conteúdo próprio que responda uma pergunta real, ou ela é unificada com a página que já responde. O caso de duas páginas concorrendo tem guia próprio: [duas páginas brigando pela mesma busca](https://avilaops.com/guias/duas-paginas-brigando-pela-mesma-busca/).

## Causa 5: o site falha quando o robô passa

Erro de servidor (5xx), tempo de resposta longo demais e página que redireciona em cadeia fazem o robô desistir. No Search Console aparece como "Erro no servidor (5xx)", "Erro de redirecionamento" ou "Erro soft 404" (a página abre, mas parece vazia ou de erro).

Correção: se é hospedagem barata compartilhada que cai à noite, o problema é a hospedagem. Se é redirecionamento, alguém configurou www para não-www que manda para http que manda para https; deve ser um salto só. Se é soft 404, a página está mostrando "nenhum produto encontrado" ou algo assim, e precisa de conteúdo ou de ser removida.

Checklist para uma hora de trabalho:

1. Buscar `site:seudominio.com.br` e listar o que falta.
2. No Search Console, abrir "Páginas" e anotar o motivo de cada endereço faltante.
3. Verificar a opção de "ocultar da pesquisa" na plataforma.
4. Abrir o robots.txt e procurar `Disallow`.
5. Para cada página faltante, contar quantos links internos ela recebe.
6. Comparar o texto das páginas "rastreadas, mas ainda não indexadas" com outras páginas suas.
7. Corrigir, validar no painel e esperar de duas a quatro semanas.

## O que fazer agora

Rode o checklist hoje. Se o motivo no Search Console for um que você não reconhece, ou se as páginas sumiram depois de uma troca de site, a gente faz o diagnóstico e corrige. Site da Avila Ops sai com indexação conferida página por página antes da entrega: https://avilaops.com/presenca-digital-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Corrigi e a página ainda não aparece. Quanto tempo espero?**
De duas a quatro semanas depois de validar a correção no Search Console. Se passou disso e o motivo mudou para "Rastreada, mas ainda não indexada", o problema agora é conteúdo, não técnica.

**Vale pedir indexação todo dia?**
Não. O pedido de indexação serve para o primeiro rastreio de uma página nova ou corrigida. Repetir não acelera e o Google limita a quantidade de pedidos por dia.

**Minha página inicial indexa, mas as internas não. O que é?**
Quase sempre causa 3 ou 4: as internas não são linkadas de lugar nenhum além do menu (que às vezes é montado sem link de verdade, e o robô não segue), ou têm pouco conteúdo. Confira o motivo no painel antes de mexer.
