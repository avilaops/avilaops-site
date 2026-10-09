---
num: 311
titulo: "Por que o certificado de segurança vence"
slug: "por-que-o-certificado-de-seguranca-vence"
title_seo: "Por que o certificado de segurança do site vence"
meta_description: "O certificado de segurança (o cadeado do site) tem prazo curto de propósito. Entenda por que vence, o que acontece quando expira e como evitar."
mes: "2027-07"
bloco: "basico"
puxa: "Segurança"
pilar: "Presença"
autor: "Nicolas Avila"
status: "aprovado"
data_publicacao: "2026-10-09"
data_prevista: "2026-10-09"
links_internos: ["/guias/o-que-e-monitoramento-de-site/", "/guias/o-que-e-hospedagem-e-o-que-ela-inclui/", "/contato/"]
---

# Por que o certificado de segurança vence

O certificado de segurança, que mostra o cadeado ao lado do endereço do site (HTTPS), vence porque tem prazo de validade curto de propósito. Um certificado é uma prova de que aquele site é quem diz ser. Quanto menor o prazo, menor o estrago se a chave vazar. Os certificados gratuitos mais usados valem 90 dias, e o Let's Encrypt já anunciou a redução para 64 dias em fevereiro de 2027 e para 45 dias em 2028. Por isso a renovação precisa ser automática.

Certificado vencido é um dos problemas mais visíveis e mais evitáveis de um site. O navegador abre uma tela vermelha dizendo que o site não é seguro. O cliente fecha a aba. E o motivo, quase sempre, é uma renovação automática que parou de funcionar sem ninguém perceber.

## O que acontece quando o certificado vence?

O site continua no ar, mas o navegador bloqueia a entrada com um aviso de risco. A maioria das pessoas não clica em "continuar mesmo assim". Para quem vende, é o mesmo que fechar a porta.

Uma loja de suplementos tinha renovação automática configurada pela antiga hospedagem. Trocou de servidor em abril, e a renovação não foi junto. Semanas depois, o último certificado emitido venceu num sábado. A loja passou o fim de semana com tela vermelha e só soube na segunda, quando um cliente avisou pelo WhatsApp. Não foi ataque; foi esquecimento.

## Como fazer o certificado nunca mais vencer?

A renovação precisa ser automática, feita pelo servidor, sem depender de alguém lembrar. Se ela falhar, alguém precisa ser avisado num e-mail que é lido. E alguém precisa monitorar o site de fora, como um cliente faria, e alertar quando a tela vermelha aparecer: https://avilaops.com/guias/o-que-e-monitoramento-de-site/.

Certificado vencido não é problema de segurança; é problema de manutenção. Um site sem dono técnico vence certificado, vence domínio e para de atualizar. Confira se a sua hospedagem inclui essa manutenção por escrito: https://avilaops.com/guias/o-que-e-hospedagem-e-o-que-ela-inclui/.

## O que fazer agora

Abra o seu site no celular, em rede móvel, e clique no cadeado. Veja a data de validade. Se vence em menos de 10 dias e você não sabe quem renova, descubra hoje. Diagnóstico do que está exposto, em uma conversa: https://avilaops.com/contato/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Certificado de segurança pago é melhor que o gratuito?**
Para site de empresa pequena, não. O cadeado é o mesmo e a proteção da conexão é a mesma. Certificados pagos oferecem validação estendida e garantias que fazem diferença para banco ou grande varejo, não para um site institucional ou uma loja de bairro.

**Site sem certificado aparece no Google?**
Aparece, mas em desvantagem. O Google usa HTTPS como sinal positivo há anos, e o Chrome marca sites sem certificado como "não seguro". Hoje não há motivo para ficar sem cadeado; o certificado básico é gratuito.

**Quanto tempo leva para renovar um certificado vencido?**
Minutos, se o acesso ao servidor estiver em mãos. Horas ou dias, se o acesso estiver com um fornecedor que não responde. O tempo de reparo depende menos da técnica e mais de quem tem a senha.
