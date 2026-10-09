---
num: 156
titulo: "O que é reputação de remetente"
slug: "o-que-e-reputacao-de-remetente"
title_seo: "O que é reputação de remetente de e-mail"
meta_description: "Reputação de remetente é a nota que Gmail e Outlook dão ao seu domínio pelo histórico de envios. Veja o que sobe, o que derruba e como proteger a sua."
mes: "2027-02"
bloco: "basico"
puxa: "E-mail"
pilar: "Presença"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-02-03"
links_internos: ["/guias/spf-dkim-dmarc-sem-termo-tecnico/", "/guias/lista-comprada-destroi-a-entrega/", "/email-profissional/"]
---

# O que é reputação de remetente

Reputação de remetente é a nota que cada provedor de e-mail atribui ao seu domínio e ao servidor que envia por você. Ela é calculada a partir do histórico: quantas pessoas abrem, quantas marcam como spam, quantos endereços não existem, se o volume muda de repente. Nota alta, caixa de entrada. Nota baixa, spam ou rejeição.

Quem envia pouco sente o peso de cada envio. Um mês de e-mails bem-recebidos constrói uma reputação sólida, e um único disparo descuidado para uma lista velha pode derrubá-la em um dia.

## O que sobe e o que derruba a reputação?

Sobe quando o destinatário demonstra que quer a mensagem: abre, responde, clica, tira do spam, adiciona aos contatos. Sobe também quando o volume é regular e o domínio tem SPF, DKIM e DMARC corretos, que a gente explica em https://avilaops.com/guias/spf-dkim-dmarc-sem-termo-tecnico/.

Derruba quando:

- alguém marca como spam. Uma marcação a cada 1.000 envios já é sinal amarelo para o Gmail.
- o endereço não existe e o servidor devolve a mensagem (bounce). Muitos endereços inválidos indicam lista comprada ou antiga.
- o volume salta. Domínio que manda 20 e-mails por dia e de repente manda 5.000 parece invadido.
- a mensagem cai numa armadilha: endereços mantidos por provedores e serviços antispam só para pegar quem envia sem permissão. Eles chegam a listas compradas, como mostramos em https://avilaops.com/guias/lista-comprada-destroi-a-entrega/.

## A reputação é do domínio ou do endereço?

Dos dois, e também do servidor. O Gmail avalia o domínio (suaempresa.com.br), o endereço de origem (IP) do servidor e o remetente específico. Se você usa um serviço de e-mail compartilhado, herda parte da reputação dos vizinhos. Se você usa e-mail gratuito, a reputação é do Google, não sua, e você não constrói nada.

Por isso ter domínio próprio importa além da aparência. É ali que fica guardado o histórico de confiança que você constrói a cada e-mail entregue.

## O que fazer agora

Comece com o e-mail no seu domínio, autenticado desde o primeiro dia. Depois cuide da lista e do ritmo. A Avila Ops entrega contato@suaempresa.com.br por R$ 10 por caixa/mês, pronto hoje, sem taxa de instalação: https://avilaops.com/email-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Como consultar a reputação do meu domínio?**
O Google oferece a ferramenta Postmaster Tools, gratuita, que mostra, para quem envia a contas Gmail, a taxa de marcação como spam, a autenticação e se o domínio cumpre as regras de envio. Desde 2025 ela não exibe mais a nota de reputação do domínio e do IP, e só mostra dados quando há volume relevante. Para empresa pequena, o teste prático de mandar para contas suas em Gmail, Outlook e Yahoo já diz muito.

**Reputação ruim tem conserto?**
Tem, mas leva semanas. O caminho é parar o que derrubou, limpar a lista, enviar só para quem interage e subir o volume aos poucos. Não existe atalho pago.

**Trocar de domínio resolve?**
Adia. Domínio novo começa sem histórico, o que também é ruim, e se o comportamento continuar o mesmo a nota cai de novo. Trocar de domínio só faz sentido quando o antigo foi comprometido por invasão.
