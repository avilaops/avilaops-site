---
num: 332
titulo: "Migrar de plataforma sem perder o Google"
slug: "migrar-de-plataforma-sem-perder-o-google"
title_seo: "Migrar de plataforma sem perder o Google"
meta_description: "Trocar de plataforma sem perder tráfego exige lista de páginas, redirecionamento 301, mesmo domínio e Search Console. Roteiro em cinco etapas."
mes: "2027-07"
bloco: "pratica"
puxa: "SEO"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-redirecionamento-e-por-que-salva-trafego/", "/guias/como-faco-para-minha-empresa-aparecer-no-google/", "/guias/meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google/", "/presenca-digital-para-pequenas-empresas/"]
---

# Migrar de plataforma sem perder o Google

Para migrar de plataforma sem perder o Google, você precisa de quatro coisas: manter o mesmo domínio, ter a lista de todas as páginas atuais com o tráfego de cada uma, criar um redirecionamento permanente (301) de cada página antiga para a equivalente na nova, e acompanhar no Search Console por 30 dias depois da troca. Quem faz isso costuma manter o tráfego. Quem pula a lista e o redirecionamento perde as posições que levou anos para ganhar, e a culpa vai para a plataforma nova.

O roteiro vale para sair de um construtor de sites para WordPress, de WordPress para outra plataforma, ou de uma loja para outra. O que muda é a ferramenta; a lógica é a mesma.

## Etapa 1: o que o Google já conhece do seu site?

Antes de construir qualquer coisa no novo, faça o inventário do velho. Abra o Search Console (se não está configurado, o guia sobre aparecer no Google mostra como: https://avilaops.com/guias/como-faco-para-minha-empresa-aparecer-no-google/). Exporte a lista de páginas com cliques e impressões dos últimos 12 meses.

Complete com o mapa do site (sitemap) e com uma varredura das páginas que existem, mesmo as que não recebem visita. O resultado é uma planilha com três colunas: endereço antigo, visitas no ano, endereço novo (vazio por enquanto).

Anote também, para as 20 páginas com mais tráfego, o título e a descrição que aparecem no Google. Eles vão ser reaproveitados.

## Etapa 2: o que muda e o que não pode mudar?

Não muda: o domínio. Trocar domínio e plataforma juntos é a receita mais comum para perder tudo. Se precisa trocar o domínio, faça em outra ocasião, com meses de distância.

Não muda, sempre que possível: os endereços das páginas. Se a página de serviços era suaempresa.com.br/servicos, mantenha /servicos na plataforma nova. Cada endereço mantido é um redirecionamento a menos e um risco a menos.

Não muda: título e descrição das páginas que mais trazem visita. Reescrever tudo na migração confunde o Google sobre o que a página é.

Pode mudar: aparência, estrutura interna, velocidade (para melhor), conteúdo das páginas que não trazem visita.

## Etapa 3: como montar os redirecionamentos?

Preencha a terceira coluna da planilha. Para cada endereço antigo, o endereço novo mais parecido. Página de serviço para página de serviço. Post de blog para o mesmo post. Produto para o mesmo produto ou, se saiu de linha, para a categoria.

Nunca mande tudo para a página inicial. Para o Google, isso equivale a dizer que as páginas sumiram. O guia sobre redirecionamento explica a diferença entre 301 e 302 e por que ela importa: https://avilaops.com/guias/o-que-e-redirecionamento-e-por-que-salva-trafego/.

Os redirecionamentos são configurados na plataforma nova ou no servidor, antes de o DNS ser trocado. Teste cada um dos 20 mais importantes abrindo o endereço antigo e conferindo que chega no lugar certo.

## Etapas 4 e 5: a troca e os 30 dias seguintes

| Etapa | Ação | Prazo |
|---|---|---|
| 1 | Inventário: lista de páginas com tráfego, títulos e descrições | Antes de começar |
| 2 | Site novo pronto em endereço temporário, com os mesmos caminhos de página | Semanas, conforme o projeto |
| 3 | Redirecionamentos configurados e testados | Antes da troca |
| 4 | Troca do DNS num dia de movimento baixo; envio do sitemap novo no Search Console | Dia da migração |
| 5 | Acompanhar erros de rastreamento e cliques por página no Search Console | 30 dias |

Nos 30 dias, espere alguma oscilação. O Google precisa revisitar cada página, ver o redirecionamento e atualizar o índice. O que não é normal: páginas com erro 404 listadas no Search Console (redirecionamento faltando) ou queda de mais da metade dos cliques que dura semanas (redirecionamento errado, robots bloqueando, ou site novo lento demais).

Se depois da migração o tráfego caiu e os redirecionamentos estão certos, a causa pode ser outra, como as respostas de IA do Google. O guia sobre isso ajuda a separar as duas coisas: https://avilaops.com/guias/meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google/.

## O que fazer agora

Se há uma migração planejada, faça o inventário esta semana, antes de contratar qualquer coisa. A planilha de endereços é o documento mais importante do projeto e o que ninguém pede. Site que o Google entende, com Search Console configurado: https://avilaops.com/presenca-digital-para-pequenas-empresas/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Mudar a plataforma do site afeta o SEO?**
Afeta se os endereços mudarem sem redirecionamento, se o site novo for mais lento ou se títulos e conteúdo forem reescritos de uma vez. Com o mesmo domínio, redirecionamento 301 por página e acompanhamento no Search Console, o efeito costuma ser pequeno e temporário.

**Quanto tempo o Google leva para reconhecer o site novo?**
Dias para as páginas principais, semanas para todas. Enviar o sitemap novo no Search Console acelera. Oscilação nas primeiras semanas é esperada; queda grande que persiste indica redirecionamento faltando ou errado.

**Preciso manter o site antigo no ar depois de migrar?**
O site antigo não, mas o domínio antigo sim, se houver troca de domínio. Se o domínio é o mesmo, o antigo pode ser desligado assim que os redirecionamentos estiverem no servidor novo e o DNS tiver propagado. Guarde uma cópia por alguns meses.
