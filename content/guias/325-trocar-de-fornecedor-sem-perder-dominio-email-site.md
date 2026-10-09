---
num: 325
titulo: "Trocar de fornecedor de tecnologia sem perder domínio, e-mail e site"
slug: "trocar-de-fornecedor-sem-perder-dominio-email-site"
title_seo: "Trocar de fornecedor sem perder domínio, e-mail e site"
meta_description: "A ordem para trocar de fornecedor: domínio no seu nome, cópia do e-mail e do site, depois o DNS. Roteiro para não ficar refém de quem está saindo."
mes: "2027-07"
bloco: "pratica"
puxa: "Domínio"
pilar: "Presença"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-07-22"
links_internos: ["/guias/o-que-e-transferencia-de-dominio/", "/guias/o-que-exigir-na-saida-de-um-fornecedor/", "/guias/o-que-e-dns-sem-termo-tecnico/", "/dominio-e-hospedagem/"]
---

# Trocar de fornecedor de tecnologia sem perder domínio, e-mail e site

Para trocar de fornecedor sem perder nada, a ordem é esta: primeiro confirme que o domínio está no seu nome (se não está, transfira antes de avisar que vai sair); depois faça cópia do e-mail e do site enquanto ainda tem acesso; só então mude o DNS para o fornecedor novo e cancele o antigo. Quem faz na ordem inversa, cancela primeiro e descobre depois que o domínio não era dele, fica sem site, sem e-mail e sem argumento.

O roteiro abaixo é o que a Avila Ops segue quando recebe um cliente vindo de outro fornecedor.

## Passo 1: o que está em nome de quem?

Antes de qualquer conversa, descubra em nome de quem estão o domínio, o e-mail e o site.

Domínio: consulte no Registro.br (para .br) quem é o titular e qual e-mail de contato está lá. Se o titular é o fornecedor ou um funcionário dele, você não é dono do seu endereço. O guia sobre transferência de domínio explica como corrigir: https://avilaops.com/guias/o-que-e-transferencia-de-dominio/.

E-mail: em qual serviço as caixas estão e quem é o administrador. Se você não consegue criar ou apagar uma caixa sozinho, o administrador é o fornecedor.

Site: onde está hospedado e se você tem acesso ao painel da hospedagem e ao administrador do site. Ter a senha do WordPress não basta; a hospedagem é o que guarda os arquivos.

Se qualquer um dos três está fora do seu controle, resolva isso antes de comunicar a saída. Fornecedor avisado de que vai perder o cliente tem pouco incentivo para colaborar.

## Passo 2: o que copiar antes de mudar?

Com os acessos em mãos, faça cópia de tudo. Não confie que o fornecedor vai entregar depois.

1. Site: exporte os arquivos e o banco de dados pelo painel da hospedagem, ou peça ao fornecedor novo que faça a cópia com o seu acesso. Guarde num lugar seu, não na hospedagem que vai ser cancelada.
2. E-mail: baixe as mensagens de cada caixa. A migração entre serviços de e-mail costuma ser feita pelo fornecedor novo, mas exige que as caixas antigas ainda existam. Não cancele antes de migrar.
3. DNS: tire uma foto ou exporte a lista completa de registros atuais. É ela que diz onde cada coisa aponta, e é o que você vai recriar no serviço novo. O guia sobre DNS explica a lista: https://avilaops.com/guias/o-que-e-dns-sem-termo-tecnico/.
4. Contas de terceiros: Perfil da Empresa no Google, Search Console, gerenciador de anúncios, pixel, Instagram. Confira que o administrador principal é um e-mail seu, não do fornecedor.

## Passo 3: em que ordem mudar?

A regra é: o novo precisa estar funcionando antes de o antigo ser desligado. Nada de "corta hoje e sobe amanhã".

| Ordem | Ação | Por quê |
|---|---|---|
| 1 | Fornecedor novo sobe o site numa hospedagem nova, com endereço temporário | Testar tudo sem afetar o site no ar |
| 2 | Fornecedor novo cria as caixas de e-mail e migra as mensagens | E-mail precisa existir nos dois lados durante a troca |
| 3 | Você muda o DNS: site aponta para a hospedagem nova, e-mail para o serviço novo | É o momento da troca. Propagação leva até 48h |
| 4 | Espera 48h com os dois no ar | Quem ainda vê o antigo continua funcionando |
| 5 | Confirma que site, e-mail, formulário e certificado funcionam no novo | Só depois disso o antigo pode sair |
| 6 | Cancela hospedagem e e-mail antigos | Domínio nunca é cancelado; é só o cadastro que muda |

Faça a troca de DNS num dia de movimento baixo, no começo da semana, para ter dias úteis de sobra se algo precisar de ajuste.

## O que fazer agora

Levante os três cadastros hoje: domínio, e-mail e hospedagem. Se algum não está no seu nome, esse é o passo zero, antes de cotar fornecedor novo. A lista do que exigir na saída está no guia seguinte: https://avilaops.com/guias/o-que-exigir-na-saida-de-um-fornecedor/. Domínio no seu nome, renovação automática, sem susto: https://avilaops.com/dominio-e-hospedagem/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Posso trocar de hospedagem sem mudar o domínio?**
Pode, e é o normal. O domínio fica onde está; você só muda o DNS para apontar para a hospedagem nova. O endereço do site continua o mesmo para o cliente.

**O fornecedor antigo pode reter meu site ou e-mail?**
Se o domínio e os acessos estão no seu nome, não. Se estão no nome dele, ele tem controle prático, mesmo que o contrato diga o contrário. Por isso a verificação de titularidade vem antes de qualquer aviso de saída.

**Quanto tempo leva para trocar de fornecedor de site e e-mail?**
Com acessos em mãos e o site pronto no novo lugar, a troca de DNS leva até 48 horas para valer em toda a internet. O prazo total depende de quanto o site precisa ser refeito. A parte que mais atrasa é conseguir acesso ao que está no nome do fornecedor antigo.
