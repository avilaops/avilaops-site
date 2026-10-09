---
num: 190
titulo: "O que é o cadeado do navegador, o certificado de segurança"
slug: "o-que-e-cadeado-do-navegador-certificado-ssl"
title_seo: "O que é o cadeado do navegador (certificado SSL)"
meta_description: "O cadeado indica que o site usa certificado de segurança (SSL/TLS): a conexão é cifrada. Veja o que ele garante, o que não garante e como ter no seu site."
mes: "2027-03"
bloco: "basico"
puxa: "Segurança"
pilar: "Operação"
autor: "Nicolas Avila"
status: "revisado"
data_prevista: "2027-03-09"
links_internos: ["/glossario/dominio/", "/glossario/dns/", "/dominio-e-hospedagem/"]
---

# O que é o cadeado do navegador, o certificado de segurança

O cadeado ao lado do endereço mostra que o site tem um certificado de segurança, chamado SSL ou TLS, e que a conexão entre o visitante e o site é cifrada. O que a pessoa digita no formulário viaja embaralhado e só o servidor lê. O endereço começa com https em vez de http. Sem o certificado, o navegador avisa "não seguro".

Cliente que vê "não seguro" ao abrir o site não digita o telefone e não compra. O Google também trata o https como padrão. E hoje o certificado é gratuito na maioria das hospedagens, então não ter é descuido, não economia.

## O que o cadeado garante e o que não garante?

Garante que ninguém no meio do caminho lê ou altera o que passa entre o visitante e o site. No Wi-Fi da padaria, a senha que o cliente digita na sua loja não fica visível para quem está na mesma rede.

Não garante que o site é honesto. Um site de golpe pode ter cadeado, e muitos têm. O cadeado diz "a conexão é segura", não "a empresa é séria". Por isso ele é o mínimo, não o suficiente: o resto vem do CNPJ no rodapé, do endereço real, dos termos e da política de privacidade.

## Como ter o certificado no site da empresa?

Na maioria dos casos a hospedagem emite e renova sozinha, com certificado gratuito. O que costuma dar errado:

- Certificado vence e ninguém renova. O site passa a mostrar aviso vermelho de um dia para o outro.
- Site tem https, mas uma imagem ou script carrega por http. O cadeado some ou fica com alerta de "conteúdo misto".
- O domínio com www tem certificado e o sem www não, ou o contrário.

Exemplo: um escritório de contabilidade migrou o site e o certificado antigo expirou. Por duas semanas, quem abria o endereço via alerta de perigo e desistia. O conserto levou 10 minutos.

## O que fazer agora

Abra o seu site com e sem www, no celular e no computador. Se aparecer aviso, ou se o cadeado tiver alerta, é assunto de hospedagem e DNS. Domínio no seu nome, hospedagem com certificado renovado sozinho e sem susto: https://avilaops.com/dominio-e-hospedagem/ ou chame no WhatsApp: https://wa.me/5517997811471.

## Perguntas frequentes

**Certificado SSL é pago?**
Existe versão paga, mas o certificado gratuito, do tipo emitido pela Let's Encrypt, cifra a conexão do mesmo jeito. Para site institucional e loja pequena, o gratuito com renovação automática resolve.

**Meu site mostra "não seguro" só em algumas páginas. Por quê?**
Quase sempre é conteúdo misto: uma imagem, fonte ou script daquela página carrega por http. Corrija o endereço do recurso para https.

**Cadeado tem a ver com domínio?**
Tem. O certificado é emitido para o nome do domínio, e o DNS precisa apontar certo. Veja https://avilaops.com/glossario/dominio/ e https://avilaops.com/glossario/dns/.
