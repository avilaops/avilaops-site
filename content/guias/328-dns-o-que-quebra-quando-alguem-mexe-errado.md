---
num: 328
titulo: "DNS: o que quebra quando alguém mexe errado"
slug: "dns-o-que-quebra-quando-alguem-mexe-errado"
title_seo: "DNS: o que quebra quando alguém mexe errado"
meta_description: "Um registro de DNS apagado ou trocado por engano derruba site, e-mail ou os dois. Os cinco erros mais comuns, o que cada um quebra e como evitar."
mes: "2027-07"
bloco: "pratica"
puxa: "Domínio"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-dns-sem-termo-tecnico/", "/glossario/dns/", "/guias/o-que-e-monitoramento-de-site/", "/dominio-e-hospedagem/"]
---

# DNS: o que quebra quando alguém mexe errado

Um registro de DNS errado quebra uma coisa de cada vez, e a coisa quebrada diz qual registro foi: site fora do ar aponta para o registro do endereço (A ou CNAME); e-mail que parou de chegar aponta para o registro de correio (MX); e-mail que vai para spam aponta para os registros de autenticação (SPF, DKIM, DMARC); tudo fora do ar de uma vez aponta para os servidores de nome (NS) trocados. Saber isso reduz um dia de pânico a 15 minutos de conferência.

A lista de endereços que o DNS representa está explicada no guia básico: https://avilaops.com/guias/o-que-e-dns-sem-termo-tecnico/. O problema começa quando alguém edita essa lista sem saber o que cada linha faz.

## Quais são os cinco erros mais comuns?

Os casos abaixo são o que chega para a Avila Ops resolver.

1. Apagar o registro MX ao trocar de hospedagem. O fornecedor novo configura o site e "limpa" o DNS. O site sobe, o e-mail para. Ninguém percebe até um cliente avisar que o e-mail voltou.
2. Apontar o site para o servidor novo antes de o site existir lá. O DNS muda, o visitante chega numa página em branco ou numa tela padrão da hospedagem. Ordem certa: site pronto no novo, depois o DNS.
3. Trocar os servidores de nome (NS) inteiros para o novo fornecedor sem copiar os registros antigos. Todos os apontamentos somem de uma vez: site, e-mail, loja, subdomínios, verificação do Google.
4. Duplicar registro com o mesmo nome. Dois registros A para o mesmo endereço, um para o servidor velho e outro para o novo. O site abre para parte das pessoas e dá erro para as outras.
5. Esquecer os registros de autenticação de e-mail (SPF, DKIM) ao mudar de serviço de e-mail. O e-mail sai, mas cai em spam ou é recusado. Quando cai em spam, ninguém avisa o remetente.

## O que cada erro quebra e como reconhecer?

| Sintoma | Registro provável | Primeira conferência |
|---|---|---|
| Site fora do ar, e-mail funcionando | A ou CNAME do site | O endereço aponta para a hospedagem certa? |
| E-mail parou de chegar, site no ar | MX | Os servidores de correio do seu serviço de e-mail estão lá? |
| E-mail sai mas cai em spam | SPF, DKIM, DMARC | Os registros do serviço de e-mail existem e estão iguais ao que ele pede? |
| Site e e-mail fora do ar juntos | NS ou domínio vencido | Os servidores de nome são os esperados? O domínio está pago? |
| Site abre para uns e não para outros | Registro duplicado ou propagação em curso | Há dois registros com o mesmo nome? Faz menos de 48h da mudança? |
| Loja, blog ou subdomínio sumiu, resto normal | Registro do subdomínio apagado | O nome (loja., blog.) ainda está na lista? |

A definição de cada tipo de registro está no glossário: https://avilaops.com/glossario/dns/.

## Como mexer no DNS sem quebrar nada?

Exporte ou fotografe a lista atual. É a única forma de voltar atrás se algo der errado. Sem cópia, a lista antiga desaparece com o primeiro salvar.

Mude um registro por vez e teste. Trocou o do site, confira o site. Trocou o MX, mande um e-mail de teste de uma conta externa. Nunca mude cinco linhas de uma vez.

Nunca troque os servidores de nome (NS) sem antes recriar todos os registros no destino. O NS é o endereço da própria lista; trocar sem copiar é jogar a lista fora.

Reduza o tempo de vida (TTL) do registro um dia antes da mudança. Isso faz a internet consultar a lista com mais frequência e a troca valer mais rápido. Depois, volte ao valor normal.

Mexa em horário de movimento baixo e com alguém [monitorando](https://avilaops.com/guias/o-que-e-monitoramento-de-site/). E se o fornecedor de site pede acesso ao DNS para "só apontar", peça antes a lista do que ele vai mudar.

## O que fazer agora

Exporte a lista de DNS do seu domínio hoje e guarde num lugar seu. Se alguém vai mexer nela neste mês, peça a lista de mudanças por escrito e confira contra a tabela acima. Domínio no seu nome, renovação automática, sem susto: https://avilaops.com/dominio-e-hospedagem/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Mudei o DNS e o site saiu do ar. O que fazer?**
Compare a lista atual com a anterior. Se o registro do site (A ou CNAME) aponta para um lugar onde o site não existe, volte ao valor antigo. Se você não tem a lista anterior, peça à hospedagem antiga o endereço correto. A volta também leva até 48h para valer em todo lugar.

**Por que meu e-mail parou de funcionar depois de mudar o site?**
Quase sempre porque o registro MX foi apagado ou trocado junto com os do site. Recrie o MX com os valores que o seu serviço de e-mail informa e confira os registros SPF e DKIM. As mensagens enviadas no intervalo podem ter sido devolvidas ao remetente.

**Quanto tempo o DNS leva para propagar?**
De minutos a 48 horas, dependendo do tempo de vida (TTL) configurado antes da mudança. Reduzir o TTL um dia antes acelera a troca. Se passou de 48h e ainda não funciona, o problema não é propagação; é o registro.
