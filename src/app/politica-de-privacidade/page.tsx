import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade | Avila Ops",
  description:
    "Como a Avila Ops coleta, usa, protege e compartilha dados em seus sites, portais e integrações.",
  alternates: { canonical: absoluteUrl("/politica-de-privacidade") },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacidade"
      title="Política de Privacidade"
      description="Esta política explica como tratamos dados pessoais e dados operacionais usados nos sites, portais, integrações e serviços da Avila Ops."
      updatedAt="30/07/2026"
      sections={[
        {
          title: "1. Quem somos",
          body: [
            `${siteConfig.legalName} opera o site ${siteConfig.siteUrl}, o app interno ${siteConfig.appUrl} e o portal ${siteConfig.clientPortalUrl}. Atuamos com presença digital, automações, CRM, WhatsApp, Instagram, Meta Ads, pagamentos e suporte operacional para empresas.`,
            `Para dúvidas sobre privacidade, entre em contato pelo e-mail ${siteConfig.email}.`,
          ],
        },
        {
          title: "2. Dados que podemos coletar",
          body: [
            "Podemos coletar dados fornecidos diretamente por você, como nome, e-mail, telefone, empresa, CPF/CNPJ quando necessário para cadastro operacional, mensagens enviadas por formulário, solicitações comerciais e informações de suporte.",
            "Quando uma integração é conectada, podemos tratar dados técnicos autorizados pelo usuário, como identificadores de páginas, contas do Instagram, contas de anúncio, formulários de lead, campanhas, métricas, eventos de webhook e dados necessários para executar a integração contratada.",
            "Também podemos coletar dados técnicos de navegação, como endereço IP, páginas acessadas, origem de tráfego, eventos de conversão e informações de dispositivo, quando isso for necessário para segurança, medição ou melhoria do serviço.",
          ],
        },
        {
          title: "3. Como usamos os dados",
          body: [
            "Usamos os dados para prestar serviços contratados, operar integrações, registrar solicitações, organizar atendimento, processar pagamentos, medir resultados, prevenir fraude, manter segurança e cumprir obrigações legais.",
            "Dados vindos de Meta, Facebook, Instagram, WhatsApp, Google ou outros provedores são usados apenas para as finalidades autorizadas pelo usuário ou cliente, como sincronização de ativos, captação de leads, acompanhamento de campanhas e suporte operacional.",
          ],
        },
        {
          title: "4. Compartilhamento",
          body: [
            "Podemos compartilhar dados com fornecedores essenciais para operação, como provedores de hospedagem, banco de dados, e-mail transacional, pagamentos, análise, automação e APIs autorizadas pelo cliente.",
            "Não vendemos dados pessoais. Também não usamos dados obtidos por integrações de terceiros para fins incompatíveis com a autorização concedida pelo usuário ou com o serviço contratado.",
          ],
        },
        {
          title: "5. Segurança e retenção",
          body: [
            "Aplicamos controles técnicos e organizacionais proporcionais ao risco, incluindo autenticação, variáveis de ambiente, criptografia de tokens sensíveis quando armazenados, registros de auditoria e restrição de acesso administrativo.",
            "Mantemos os dados pelo tempo necessário para executar o serviço, cumprir obrigações legais, resolver disputas, preservar evidências operacionais e atender solicitações legítimas de exclusão ou correção.",
          ],
        },
        {
          title: "6. Direitos do titular",
          body: [
            "Você pode solicitar confirmação de tratamento, acesso, correção, atualização, portabilidade, revogação de consentimento e exclusão de dados, conforme a legislação aplicável.",
            `Para exercer esses direitos, envie uma solicitação para ${siteConfig.email} informando o contexto da conta, empresa ou integração relacionada.`,
          ],
        },
        {
          title: "7. Alterações nesta política",
          body: [
            "Esta política pode ser atualizada para refletir mudanças nos serviços, integrações, obrigações legais ou práticas de segurança. A versão vigente será sempre publicada nesta página.",
          ],
        },
      ]}
    />
  );
}
