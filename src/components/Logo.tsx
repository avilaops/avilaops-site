import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Logo({ size = 32 }: { size?: number }) {
  const markSize = Math.round(size * 1.2);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.round(size * 0.4),
      }}
    >
      {/*
        A marca e /logo.png. O /apple-touch-icon.png que estava aqui e a
        variante monocromatica para a tela de inicio do iOS: fundo preto,
        desenho branco, recortado em circulo pelo borderRadius. O header e o
        rodape do site mostravam essa versao, nao a marca colorida.
      */}
      <Image
        src="/logo.png"
        alt={siteConfig.logoAlt}
        width={markSize}
        height={markSize}
        priority
        style={{ display: "block" }}
      />
      <span
        style={{
          fontSize: Math.round(size * 0.64),
          fontWeight: 700,
          color: "var(--foreground)",
          letterSpacing: "-0.5px",
          whiteSpace: "nowrap",
        }}
      >
        Avila Ops
      </span>
    </span>
  );
}
