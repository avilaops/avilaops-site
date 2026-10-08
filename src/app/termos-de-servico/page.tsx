import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Serviço | Avila Ops",
  description:
    "Condições gerais de uso dos sites, portais, integrações e serviços da Avila Ops.",
  alternates: { canonical: absoluteUrl("/termos-de-servico/") },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Termos"
      title="Termos de Serviço"
      description="Estes termos definem as condições de uso dos sites, portais, integrações e serviços operacionais fornecidos pela Avila Ops."
      updatedAt="08/10/2026"
      sections={[
        {
          title: "1. Aceitação",
          body: [
            `Ao acessar ${siteConfig.siteUrl}, ${siteConfig.appUrl} ou contratar serviços da ${siteConfig.legalName}, você concorda com estes Termos de Serviço e com a Política de Privacidade.`,
            "Se você usa os serviços em nome de uma empresa, declara que possui autorização para aceitar estes termos em nome dessa empresa.",
          ],
        },
        {
          title: "2. Serviços",
          body: [
            "A Avila Ops fornece serviços de presença digital, sites, domínio, e-mail, identidade, automações, CRM, integrações, WhatsApp, Instagram, Meta Ads, pagamentos, dados e suporte operacional.",
            "Alguns recursos dependem de provedores externos, como Meta, Google, Efí, Cloudflare, serviços de hospedagem, APIs de mensagens e ferramentas de análise. A disponibilidade desses recursos pode depender das regras, permissões e estabilidade desses terceiros.",
          ],
        },
        {
          title: "3. Contas, acessos e integrações",
          body: [
            "O usuário é responsável por fornecer informações corretas, manter suas credenciais seguras e conceder apenas acessos compatíveis com o serviço contratado.",
            "Quando uma integração OAuth ou API é conectada, a Avila Ops usa os acessos autorizados apenas para executar as funções operacionais solicitadas, como sincronizar páginas, contas de anúncio, formulários, leads, métricas, pagamentos ou dados necessários ao serviço.",
            "O cliente pode solicitar a revogação de acesso e a exclusão de dados conforme a Política de Privacidade e a página de Exclusão de Dados do Usuário.",
          ],
        },
        {
          title: "4. Uso aceitável",
          body: [
            "Você não deve usar os serviços para spam, fraude, violação de direitos, engenharia reversa indevida, coleta não autorizada de dados, conteúdo ilegal ou qualquer atividade que prejudique terceiros, provedores integrados ou a infraestrutura da Avila Ops.",
            "A Avila Ops pode suspender integrações ou acessos em caso de uso abusivo, risco de segurança, solicitação legal, violação destes termos ou descumprimento de regras de provedores externos.",
          ],
        },
        {
          title: "5. Pagamentos e entregas",
          body: [
            "Preços, escopo, prazos, forma de pagamento e critérios de aceite devem ser definidos em proposta, contrato, pedido ou confirmação comercial específica.",
            "Recursos pagos, entregáveis, automações e integrações podem depender de confirmação de pagamento, disponibilidade técnica e informações fornecidas pelo cliente.",
          ],
        },
        {
          title: "6. Limitações",
          body: [
            "A Avila Ops trabalha para manter os serviços disponíveis e seguros, mas não garante resultado específico de vendas, ranqueamento, aprovação de anúncios, alcance orgânico, indexação automática ou aprovação por plataformas terceiras.",
            "Não nos responsabilizamos por indisponibilidades, mudanças de API, bloqueios, reprovações ou limitações impostas por terceiros quando estiverem fora do controle direto da Avila Ops.",
          ],
        },
        {
          title: "7. Contato",
          body: [
            `Dúvidas sobre estes termos podem ser enviadas para ${siteConfig.email}.`,
          ],
        },
      ]}
    />
  );
}
