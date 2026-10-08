import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Exclusão de Dados do Usuário | Avila Ops",
  description:
    "Instruções para solicitar exclusão de dados pessoais e dados de integrações conectadas à Avila Ops.",
  alternates: { canonical: absoluteUrl("/exclusao-de-dados/") },
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      eyebrow="Dados do usuário"
      title="Exclusão de Dados do Usuário"
      description="Esta página informa como solicitar a exclusão de dados associados ao uso dos sites, portais e integrações da Avila Ops, incluindo integrações com Meta, Facebook e Instagram."
      updatedAt="30/07/2026"
      sections={[
        {
          title: "1. Como solicitar exclusão",
          body: [
            `Envie um e-mail para ${siteConfig.email} com o assunto "Exclusão de dados" e informe seu nome, e-mail de contato, empresa relacionada e, quando aplicável, a página, conta de Instagram, conta de anúncio ou integração que deseja remover.`,
            "Se a solicitação envolver uma empresa ou ativo administrado por terceiros, poderemos pedir comprovação de autorização antes de excluir ou desconectar dados operacionais.",
          ],
        },
        {
          title: "2. O que pode ser excluído",
          body: [
            "Podemos excluir ou anonimizar dados pessoais fornecidos em formulários, solicitações comerciais, registros de suporte, contas de portal e dados operacionais obtidos por integrações autorizadas.",
            "Em integrações Meta, Facebook e Instagram, podemos remover tokens de acesso, dados sincronizados de páginas, contas de Instagram, contas de anúncio, formulários, leads e eventos de webhook vinculados à autorização concedida.",
          ],
        },
        {
          title: "3. Prazo de atendimento",
          body: [
            "A solicitação será analisada e respondida em prazo razoável, conforme a complexidade técnica, necessidade de verificação de identidade e obrigações legais aplicáveis.",
            "Quando a exclusão completa não for possível por obrigação legal, segurança, auditoria, prevenção de fraude ou defesa de direitos, os dados serão restringidos, minimizados ou retidos apenas pelo período necessário.",
          ],
        },
        {
          title: "4. Revogação direta em plataformas terceiras",
          body: [
            "Além de solicitar a exclusão à Avila Ops, você também pode revogar permissões diretamente nas plataformas conectadas, como Meta, Facebook, Instagram, Google ou outros provedores.",
            "Quando uma autorização é revogada em uma plataforma externa, alguns recursos da Avila Ops podem parar de funcionar até que a integração seja conectada novamente.",
          ],
        },
        {
          title: "5. Confirmação",
          body: [
            "Após concluir a exclusão ou desconexão aplicável, enviaremos uma confirmação para o e-mail informado na solicitação, salvo quando houver impedimento legal ou técnico justificado.",
          ],
        },
      ]}
    />
  );
}
