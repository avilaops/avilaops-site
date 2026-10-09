"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Tabela do artigo com rolagem horizontal própria.
 *
 * A orientação para deslizar aparece só quando a tabela de fato transborda:
 * a largura da coluna não basta para prever isso, porque depende do número de
 * colunas e do texto. Sem JavaScript a orientação fica oculta e a rolagem
 * continua funcionando.
 */
export default function EditorialTable({ children }: { children: ReactNode }) {
  const regiao = useRef<HTMLDivElement>(null);
  const [rola, setRola] = useState(false);

  useEffect(() => {
    const caixa = regiao.current;
    if (!caixa) return;
    const medir = () => setRola(caixa.scrollWidth > caixa.clientWidth + 1);
    const observador = new ResizeObserver(medir);
    observador.observe(caixa);
    const tabela = caixa.firstElementChild;
    if (tabela) observador.observe(tabela);
    return () => observador.disconnect();
  }, []);

  return (
    <div className="editorial-table-block" data-rola={rola || undefined}>
      <p className="editorial-table-hint">Deslize a tabela para os lados para ver todas as colunas.</p>
      <div ref={regiao} className="editorial-table" tabIndex={0} role="region" aria-label="Tabela do artigo">
        <table>{children}</table>
      </div>
    </div>
  );
}
