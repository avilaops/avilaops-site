import Link from "next/link";
import { siteConfig } from "@/lib/site";

// Esta seção é o que o Google confere na verificação da tela de consentimento
// OAuth: o nome do app ("Avila Ops") e a finalidade dele precisam estar
// visíveis na página inicial, com o link para a política de privacidade.
const points = [
  {
    title: "Para que serve",
    text: "Identificar você e abrir o sistema certo, com os seus dados, permissões e histórico. Uma conta vale para todos os sistemas da Avila Ops.",
  },
  {
    title: "O que pedimos ao Google",
    text: "Apenas nome, e-mail e foto do perfil (escopos openid, email e profile). O app não acessa Gmail, Drive, Agenda, contatos ou qualquer outro dado da sua conta Google.",
  },
  {
    title: "Como usamos",
    text: "Só para criar e manter sua conta e sua sessão. Não vendemos esses dados, não usamos para anúncios e você pode pedir a exclusão quando quiser.",
  },
];

export default function HomeAppAccess() {
  return (
    <section className="vida-app" id="app" aria-labelledby="home-app-title">
      <div className="container vida-app-grid">
        <div className="vida-app-copy">
          <span className="vida-eyebrow"><i aria-hidden="true" /> O app Avila Ops</span>
          <h2 id="home-app-title">Avila Ops: uma conta para<br /><em>todos os seus sistemas.</em></h2>
          <p>
            O Avila Ops é a nossa plataforma de software. Clientes e equipe entram
            com uma conta só, inclusive pelo botão &quot;Fazer login com o Google&quot;, para acessar o painel
            de gestão ({siteConfig.appUrl.replace("https://", "")}), o portal do cliente
            ({siteConfig.clientPortalUrl.replace("https://", "")}), o CRM, as lojas virtuais, o Saúde Pet e os
            demais sistemas que construímos e operamos para nossos clientes.
          </p>
          <div className="vida-app-links">
            <Link className="vida-link" href="/politica-de-privacidade/" prefetch={false}>Política de Privacidade <span aria-hidden="true">↗</span></Link>
            <Link className="vida-link" href="/termos-de-servico/" prefetch={false}>Termos de Serviço <span aria-hidden="true">↗</span></Link>
            <Link className="vida-link" href="/exclusao-de-dados/" prefetch={false}>Exclusão de dados <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <ul className="vida-app-points">
          {points.map((point) => (
            <li key={point.title}>
              <strong>{point.title}</strong>
              <p>{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
