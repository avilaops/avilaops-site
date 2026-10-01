import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade | Avila Ops",
  description:
    "Como o app Avila Ops e os sites, portais e integrações da Avila Ops coletam, usam, protegem e compartilham dados, incluindo dados recebidos pelo login com o Google.",
  alternates: { canonical: absoluteUrl("/politica-de-privacidade") },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacidade"
      title="Política de Privacidade"
      description="Esta política explica como o app Avila Ops e os sites, portais, integrações e serviços da Avila Ops tratam dados pessoais, incluindo os dados recebidos quando você entra com a sua conta Google."
      updatedAt="01/10/2026"
      sections={[
        {
          title: "1. Quem somos",
          body: [
            `A Avila Ops (${siteConfig.legalName}, Ribeirão Preto, SP, Brasil) é a controladora dos dados tratados nesta política. Operamos o site ${siteConfig.siteUrl}, o app Avila Ops, com login único em https://auth.avilaops.com, o painel de gestão ${siteConfig.appUrl}, o portal do cliente ${siteConfig.clientPortalUrl} e os sistemas que construímos e operamos para nossos clientes, como CRM, lojas virtuais e Saúde Pet.`,
            "Atuamos com presença digital, sites, automações, CRM, WhatsApp, Instagram, Meta Ads, pagamentos e suporte operacional para empresas.",
            `Para dúvidas sobre privacidade ou para falar com o responsável pelo tratamento de dados, escreva para ${siteConfig.email}.`,
          ],
        },
        {
          title: "2. O app Avila Ops",
          body: [
            "O app Avila Ops é a conta única que dá acesso aos nossos sistemas. Você cria a conta uma vez e entra em qualquer sistema da Avila Ops com ela, usando e-mail e senha ou um provedor de login, como o Google.",
            "O login serve para identificar você, abrir o sistema certo e aplicar as permissões da sua conta. Nenhum dado de login é usado para outra finalidade.",
          ],
        },
        {
          title: "3. Dados recebidos do Google",
          body: [
            "Quando você usa \"Fazer login com o Google\" no app Avila Ops, pedimos ao Google apenas os escopos openid, email e profile. Com eles recebemos o identificador da sua conta Google, seu nome, seu endereço de e-mail, a informação de que o e-mail foi verificado pelo Google e a sua foto de perfil.",
            "Não pedimos acesso a Gmail, Google Drive, Google Agenda, Contatos, YouTube ou qualquer outro dado ou serviço da sua conta Google, e não lemos, enviamos nem alteramos nada nela.",
          ],
        },
        {
          title: "4. Como usamos os dados do Google",
          body: [
            "Usamos esses dados somente para: autenticar você; criar sua conta no primeiro acesso ou vinculá-la a uma conta existente com o mesmo e-mail; mostrar seu nome e sua foto na interface dos sistemas; e enviar mensagens sobre a própria conta, como alertas de segurança e recuperação de acesso.",
            "Não usamos dados recebidos do Google para publicidade, para criar perfis de marketing, para vender a terceiros, para avaliar crédito nem para treinar modelos de inteligência artificial.",
            "O uso e a transferência, para qualquer outro aplicativo, de informações recebidas das APIs do Google pelo Avila Ops seguem a Política de Dados do Usuário dos Serviços de API do Google (https://developers.google.com/terms/api-services-user-data-policy), incluindo os requisitos de Uso Limitado. (Avila Ops's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.)",
          ],
        },
        {
          title: "5. Armazenamento e compartilhamento dos dados do Google",
          body: [
            "Guardamos o identificador da conta Google, o nome, o e-mail e o endereço da foto no banco de dados do serviço de contas, protegido por autenticação e acesso restrito. O token de acesso emitido pelo Google é usado uma única vez, no momento do login, para ler o seu perfil, e não é armazenado. Não guardamos tokens de atualização (refresh tokens).",
            "Esses dados só são repassados aos sistemas da Avila Ops em que você mesmo entra, que recebem seu nome, e-mail e foto para identificar a sua sessão, e aos provedores de hospedagem e banco de dados que operam a infraestrutura sob contrato. Não vendemos nem cedemos dados do Google a terceiros, exceto quando a lei ou uma ordem judicial exigir.",
          ],
        },
        {
          title: "6. Outros dados que podemos coletar",
          body: [
            "Dados fornecidos diretamente por você, como nome, e-mail, telefone, empresa, CPF/CNPJ quando necessário para cadastro operacional, mensagens enviadas por formulário, solicitações comerciais e informações de suporte.",
            "Quando uma integração é conectada por um cliente, podemos tratar dados técnicos autorizados por ele, como identificadores de páginas, contas do Instagram, contas de anúncio, formulários de lead, campanhas, métricas, eventos de webhook e dados necessários para executar a integração contratada.",
            "Dados técnicos de navegação, como endereço IP, páginas acessadas, origem de tráfego, eventos de conversão e informações de dispositivo, quando necessários para segurança, medição ou melhoria do serviço.",
          ],
        },
        {
          title: "7. Como usamos os dados em geral",
          body: [
            "Usamos os dados para prestar os serviços contratados, operar integrações, registrar solicitações, organizar o atendimento, processar pagamentos, medir resultados, prevenir fraude, manter a segurança e cumprir obrigações legais.",
            "Dados vindos de Meta, Facebook, Instagram, WhatsApp ou outros provedores são usados apenas para as finalidades autorizadas pelo usuário ou cliente, como sincronização de ativos, captação de leads, acompanhamento de campanhas e suporte operacional.",
            "As bases legais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), são a execução de contrato e de procedimentos preliminares, o cumprimento de obrigação legal, o legítimo interesse em manter os serviços seguros e funcionando e, quando aplicável, o seu consentimento.",
          ],
        },
        {
          title: "8. Compartilhamento",
          body: [
            "Podemos compartilhar dados com fornecedores essenciais para a operação, como provedores de hospedagem, banco de dados, e-mail transacional, pagamentos, análise e automação, e com APIs autorizadas pelo cliente. Esses fornecedores só tratam os dados para prestar o serviço contratado.",
            "Não vendemos dados pessoais e não usamos dados obtidos por integrações de terceiros para fins incompatíveis com a autorização concedida ou com o serviço contratado.",
            "Alguns fornecedores mantêm servidores fora do Brasil. Nesses casos a transferência segue as regras da LGPD para transferência internacional de dados.",
          ],
        },
        {
          title: "9. Cookies",
          body: [
            "O app Avila Ops usa um cookie de sessão no domínio avilaops.com para manter você conectado entre os nossos sistemas. Ele é necessário para o login funcionar e é apagado quando você sai da conta ou quando a sessão expira.",
            "O site pode usar ferramentas de medição, como o Google Analytics, para entender o uso das páginas de forma agregada. Você pode bloquear ou apagar cookies nas configurações do seu navegador.",
          ],
        },
        {
          title: "10. Segurança e retenção",
          body: [
            "Aplicamos controles técnicos e organizacionais proporcionais ao risco, incluindo conexão criptografada (HTTPS), autenticação, segundo fator opcional, criptografia de tokens sensíveis quando armazenados, registros de auditoria e restrição de acesso administrativo.",
            "Os dados da conta, incluindo os recebidos do Google, ficam guardados enquanto a conta existir. Quando a conta é excluída, apagamos esses dados em até 30 dias, mantendo apenas o que a lei obrigar a guardar, como registros de acesso exigidos pelo Marco Civil da Internet.",
            "Os demais dados são mantidos pelo tempo necessário para executar o serviço, cumprir obrigações legais, resolver disputas e atender solicitações legítimas de exclusão ou correção.",
          ],
        },
        {
          title: "11. Seus direitos e como excluir seus dados",
          body: [
            "Você pode pedir confirmação de tratamento, acesso, correção, atualização, portabilidade, revogação de consentimento e exclusão de dados, conforme a legislação aplicável.",
            `Para excluir sua conta do app Avila Ops e os dados recebidos do Google, envie um e-mail para ${siteConfig.email} com o assunto "Exclusão de dados" ou siga as instruções em ${absoluteUrl("/exclusao-de-dados")}.`,
            "Você também pode retirar o acesso do Avila Ops à sua conta Google a qualquer momento em https://myaccount.google.com/permissions. Depois disso, o login com o Google deixa de funcionar até que você autorize de novo.",
          ],
        },
        {
          title: "12. Crianças",
          body: [
            "Nossos serviços são voltados a empresas e a seus profissionais e não são direcionados a crianças. Não coletamos intencionalmente dados de crianças.",
          ],
        },
        {
          title: "13. Alterações nesta política",
          body: [
            "Esta política pode ser atualizada para refletir mudanças nos serviços, integrações, obrigações legais ou práticas de segurança. A versão vigente estará sempre nesta página, com a data da última atualização. Mudanças relevantes sobre o uso de dados do Google serão avisadas antes de entrarem em vigor.",
          ],
        },
      ]}
    />
  );
}
