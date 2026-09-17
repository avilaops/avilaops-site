"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Brilho radial que segue o mouse sobre o card, só no hover. Técnica padrão
 * de card "premium" (ver referência pública: 21st.dev "Spotlight Card"),
 * reimplementada aqui sem Tailwind/shadcn — só CSS vars já existentes no
 * projeto (--blue) e a classe .catalog-card do globals.css.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="spotlight-card-glow"
        style={{ opacity, background: `radial-gradient(240px circle at ${position.x}px ${position.y}px, var(--blue-soft), transparent 75%)` }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
