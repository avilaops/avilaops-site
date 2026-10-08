import type { NextConfig } from "next";
import imagens from "./config/imagens.json";

const larguras = imagens.larguras;

const nextConfig: NextConfig = {
  // Static output used by the VPS deploy and compatible with Cloudflare Pages.
  output: "export",
  trailingSlash: true,
  // Export estatico nao tem otimizador de imagem. O loader aponta cada largura
  // do srcset para um arquivo pre-gerado no prebuild (config/imagens.json).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: larguras.filter((l) => l >= 480),
    imageSizes: larguras.filter((l) => l < 480),
  },
};

export default nextConfig;
