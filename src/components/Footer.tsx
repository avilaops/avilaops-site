import { siteConfig, whatsappUrl } from "@/lib/site";
import Logo from "./Logo";

const navigation = [
  ["Jornada", "/jornada"],
  ["Serviços", "/servicos"],
  ["Comparativos", "/comparativos"],
  ["Segmentos", "/segmentos"],
  ["Guias", "/guias"],
  ["Traduzindo", "/traduzindo"],
  ["Contato", "/contato"],
];

const authorityPages = [
  ["Automatizar minha empresa", "/automatizar-minha-empresa"],
  ["Automatizar WhatsApp", "/automatizar-whatsapp"],
  ["Instagram e Meta Ads", "/instagram-meta-ads"],
  ["Presença digital", "/presenca-digital-para-pequenas-empresas"],
  ["CRM para pequenas empresas", "/crm-para-pequenas-empresas"],
  ["Comparativos", "/comparativos"],
  ["Traduzindo", "/traduzindo"],
];

const legalPages = [
  ["Privacidade", "/politica-de-privacidade"],
  ["Termos", "/termos-de-servico"],
  ["Exclusão de dados", "/exclusao-de-dados"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo size={27} />
          <p>
            Sites e sistemas profissionais sob medida, com protótipo rápido e
            preço sem surpresa.
          </p>
        </div>

        <div className="footer-column">
          <span>NAVEGAÇÃO</span>
          {navigation.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <span>PRODUTOS</span>
          <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer">
            app.avilaops.com
          </a>
          <a
            href={siteConfig.clientPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            cliente.avilaops.com
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>

        <div className="footer-column">
          <span>GUIAS E SERVIÇOS</span>
          {authorityPages.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <span>CONTATO</span>
          <a
            href={whatsappUrl("Olá, Avila Ops! Quero meu protótipo grátis.")}
          >
            WhatsApp ↗
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p>{siteConfig.city} — {siteConfig.region}</p>
        </div>

        <div className="footer-column">
          <span>LEGAL</span>
          {legalPages.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} Avila Ops Tecnologia.</p>
        <p>Tecnologia que se adapta ao negócio.</p>
        {/*
          Ancora na propria pagina. Antes apontava para /#inicio, que so e o
          topo na home: em pagina interna o botao de "voltar ao topo" trocava
          de pagina. O #topo fica no <header>, que existe em toda pagina que
          tem rodape.
        */}
        <a href="#topo">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
