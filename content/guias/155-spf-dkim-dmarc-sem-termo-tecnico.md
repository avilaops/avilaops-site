---
num: 155
titulo: "O que são SPF, DKIM e DMARC, sem termo técnico"
slug: "spf-dkim-dmarc-sem-termo-tecnico"
title_seo: "SPF, DKIM e DMARC explicados sem termo técnico"
meta_description: "SPF, DKIM e DMARC são três registros que provam que o e-mail saiu da sua empresa. Entenda cada um em uma frase e confira se o seu domínio tem os três."
mes: "2027-02"
bloco: "basico"
puxa: "E-mail"
pilar: "Presença"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-02-02"
links_internos: ["/glossario/dns/", "/guias/o-que-e-caixa-de-spam/", "/email-profissional/"]
---

# O que são SPF, DKIM e DMARC, sem termo técnico

SPF, DKIM e DMARC são três anotações gravadas no seu domínio que respondem, para o Gmail e o Outlook, a pergunta "esse e-mail saiu mesmo da empresa dona do domínio?". SPF diz quem pode enviar. DKIM assina cada mensagem. DMARC diz o que fazer quando a resposta é "não". Sem os três, seu e-mail chega com cara de falsificação.

O filtro de spam confere a identidade antes de ler o texto. Uma empresa pequena com os três registros certos tende a entregar mais e-mail do que uma grande que esqueceu de configurar.

## O que cada um faz, em uma frase?

| Registro | O que faz | Analogia |
|---|---|---|
| SPF | Lista quais servidores têm permissão para enviar e-mail com o seu domínio | Lista de quem pode usar o papel timbrado |
| DKIM | Coloca uma assinatura digital em cada mensagem, que só o seu domínio consegue gerar | Assinatura com firma reconhecida |
| DMARC | Instrui o provedor: se nem SPF nem DKIM confirmarem o seu domínio, aceitar, mandar para o spam ou rejeitar, e para onde mandar o relatório | Regra do porteiro quando o crachá não bate |

Os três ficam gravados no DNS do domínio, que é a lista telefônica que diz onde cada serviço do seu domínio mora. A gente explica isso em https://avilaops.com/glossario/dns/.

## Como saber se o meu domínio tem os três?

No Gmail, abra um e-mail enviado pela sua empresa, clique nos três pontos e em "Mostrar original". No topo aparecem três linhas: SPF, DKIM e DMARC, cada uma com PASS ou FAIL. Três PASS é o cenário certo. Se aparecer FAIL ou "none", alguma anotação falta ou está errada.

Um erro comum: a empresa contratou um serviço de e-mail e depois passou a disparar promoções por outra ferramenta. O SPF só conhece o primeiro serviço. Cada ferramenta que envia em seu nome precisa estar na lista, senão as mensagens dela tendem a cair no spam. Veja os outros motivos em https://avilaops.com/guias/o-que-e-caixa-de-spam/.

## O que fazer agora

Se você tem domínio mas não sabe o que está gravado nele, peça o diagnóstico. Se ainda usa e-mail gratuito, o caminho é contato@suaempresa.com.br com os três registros configurados de fábrica, por R$ 10 por caixa/mês, pronto hoje: https://avilaops.com/email-profissional/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Preciso configurar SPF, DKIM e DMARC eu mesmo?**
Não. Quem administra o seu domínio e o seu e-mail faz isso em minutos, desde que tenha acesso ao DNS. O que você precisa é cobrar que os três estejam ativos.

**SPF, DKIM e DMARC funcionam para e-mail gratuito, como Gmail?**
Não do seu lado. Em um endereço @gmail.com, o domínio é do Google, e os registros são dele. Você só controla esses registros quando o e-mail está no seu próprio domínio.

**Configurei os três e ainda cai no spam. Por quê?**
Os registros resolvem a identidade. Sobram reputação (histórico de envios), conteúdo e lista, que derrubam a entrega mesmo com tudo verificado.
