"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import Logo from "./Logo";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Jornada", href: "/jornada/" },
  { label: "Serviços", href: "/servicos/" },
  { label: "Comparativos", href: "/comparativos/" },
  { label: "Segmentos", href: "/segmentos/" },
  { label: "Blog", href: "/blog/" },
  { label: "Guias", href: "/guias/" },
  { label: "Traduzindo", href: "/traduzindo/" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="icon-button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      type="button"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header id="topo" className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label="Avila Ops | início">
          <Logo size={27} />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="app-link desktop-only"
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar no app
          </a>
          <ThemeToggle />
          <Link className="button button-small desktop-only" href="/criar-meu-resumo/" prefetch={false}>
            Protótipo grátis
          </Link>
          <button
            className="menu-button mobile-only"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            <a
              className="button button-secondary"
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrar no app
            </a>
            <Link
              className="button"
              href="/criar-meu-resumo/"
              prefetch={false}
              onClick={() => setMenuOpen(false)}
            >
              Quero meu protótipo grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
