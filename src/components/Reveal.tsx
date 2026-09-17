"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Anima a entrada de qualquer bloco quando ele cruza a viewport, via
 * IntersectionObserver. Sem lib externa — mesma técnica usada por sites de
 * agência de referência (scroll reveal + easing customizado no CSS, ver
 * [data-reveal] em globals.css). Respeita prefers-reduced-motion pela regra
 * global já existente no CSS.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  fade = false,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const attr = fade ? "data-reveal-fade" : "data-reveal";

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      {...{ [attr]: visible }}
    >
      {children}
    </Tag>
  );
}
