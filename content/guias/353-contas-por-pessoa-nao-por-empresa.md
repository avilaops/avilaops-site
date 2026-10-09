---
num: 353
titulo: "Contas por pessoa, não por empresa"
slug: "contas-por-pessoa-nao-por-empresa"
title_seo: "Contas por pessoa, não por empresa: por que e como"
meta_description: "Um login compartilhado é uma porta sem controle. Cada pessoa com a própria conta permite saber quem fez o quê e cortar acesso sem trocar senha. Veja como fazer."
mes: "2027-08"
bloco: "pratica"
puxa: "Segurança"
pilar: "Operação"
autor: "Nicolas Avila"
status: "rascunho"
data_prevista: "2027-08-19"
links_internos: ["/guias/gerenciador-de-senha-em-vez-de-papel/", "/guias/desligamento-revogar-acesso-no-mesmo-dia/", "/email-profissional/", "/contato/"]
---

# Contas por pessoa, não por empresa

Cada pessoa da equipe deve ter a própria conta em cada sistema que usa, com o próprio usuário e a própria senha, em vez de todo mundo entrar com "contato@empresa" e a senha que está na parede. A conta por pessoa permite saber quem fez o quê, dar a cada um só o que ele precisa e cortar o acesso de quem sai sem trocar a senha de todo mundo. O custo, quando existe, é de alguns reais por usuário ao mês; o ganho é controle.

O login compartilhado é o padrão em empresa pequena porque começou assim: era só o dono, depois o dono e mais um. O e-mail "contato@", o Instagram, o painel da loja, o sistema de nota, tudo com um usuário. Funciona até o dia em que um pedido some, uma mensagem errada sai para o cliente ou alguém vai embora, e ninguém sabe quem, nem como fechar a porta.

## O que muda com conta por pessoa?

Três coisas concretas.

Rastreio. O sistema registra que foi a Ana quem cancelou o pedido às 15h, e não "alguém". Isso não é vigilância; é o fim da conversa "não fui eu". Também protege quem não fez.

Permissão. O caixa vê o extrato do banco e não transfere. A atendente responde no WhatsApp e não apaga conversas. O vendedor cadastra produto e não muda preço. Com login único, todo mundo é administrador de tudo.

Revogação. Quando alguém sai, você desativa a conta dele em cinco minutos, e os outros continuam trabalhando. Com login único, sair significa trocar a senha em 15 sistemas e avisar todo mundo, e ninguém faz isso no mesmo dia.

## Como fazer em cada sistema?

| Sistema | Como dar conta por pessoa |
|---|---|
| E-mail | Uma caixa por pessoa no domínio da empresa (ana@empresa.com.br). "contato@" vira um grupo ou uma caixa compartilhada com acesso delegado, não uma senha passada de mão em mão. |
| WhatsApp Business | Com o aplicativo comum, até quatro aparelhos conectados, sem identificar quem escreveu. Com a API, cada atendente tem login próprio e o histórico mostra quem respondeu. |
| Instagram e Meta | Contas profissionais permitem adicionar pessoas com funções (administrador, editor, analista) pelo painel da Meta. Ninguém precisa da senha do perfil. |
| Loja virtual e sistema | Todo painel sério tem usuários com papéis: administrador, operador, financeiro, consulta. Crie um por pessoa e deixe o administrador só com o dono. |
| Banco | Usuários adicionais com limite de valor e permissão de consulta ou de pagamento com aprovação. Todo banco de empresa oferece. |
| Domínio e hospedagem | Conta no nome da empresa e do dono. Quem precisar mexer recebe acesso delegado, nunca a senha principal. |
| Gerenciador de senha | Uma conta por pessoa; o compartilhamento é por cofre de grupo. |

O único que resiste é o WhatsApp comum, que não foi feito para equipe. Se o atendimento é o coração da empresa e três pessoas revezam o celular, a API do WhatsApp Business é o caminho para ter login por atendente.

## Por onde começar sem parar a operação?

1. E-mail primeiro. É a chave de recuperação de todo o resto. Uma caixa por pessoa, no domínio da empresa, com confirmação em duas etapas.
2. Depois o que movimenta dinheiro: banco, painel da loja, emissor de nota. Crie os usuários, dê a permissão mínima, teste um dia com o antigo ainda ativo e então troque a senha do login compartilhado, que fica só com o dono.
3. Depois os canais: Meta, Google, marketplaces.
4. Por fim, escreva numa página quem tem acesso a quê. Essa página é o que você abre no dia em que alguém sai.

Cada etapa cabe numa manhã. O erro comum é tentar fazer tudo num fim de semana, não terminar e voltar para o login único "por enquanto".

## O que fazer agora

Crie hoje uma caixa de e-mail por pessoa no domínio da empresa; é o passo que destrava os outros e custa R$ 10 por caixa ao mês, pronto no mesmo dia: https://avilaops.com/email-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Conta por pessoa custa mais caro?**
Em alguns sistemas, sim, alguns reais por usuário ao mês. No e-mail, R$ 10 por caixa. No painel da Meta, no Google e na maioria dos bancos, usuários adicionais não custam nada. É mais barato que um acesso indevido.

**E o e-mail contato@ que todo mundo precisa ver?**
Vira uma caixa compartilhada ou um grupo: cada pessoa acessa com o próprio login e responde em nome de contato@. Ninguém precisa da senha dela.

**Como dar conta por pessoa no WhatsApp da empresa?**
Com o WhatsApp Business comum, não dá; só aparelhos conectados sem identificação. Com a API do WhatsApp Business, cada atendente tem login e o histórico mostra quem escreveu.
