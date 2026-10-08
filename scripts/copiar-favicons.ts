import { copyFileSync } from "node:fs";

for (const nome of ["favicon.ico", "favicon-96x96.png", "apple-touch-icon.png", "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "site.webmanifest"]) {
  copyFileSync(`public/${nome}`, `out/${nome}`);
}
