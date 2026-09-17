# Imagens de compartilhamento por página

As 45 páginas que compartilhavam `og-default.png` receberam imagens próprias, relacionadas ao tema de cada página. Os arquivos finais estão em `public/og/paginas/`, em JPEG de 1200 × 630.

O mapa de URL para imagem fica em `scripts/page-previews.json`. O comando `postbuild` aplica o mapa ao HTML e aos arquivos de navegação do export estático. O script valida todas as páginas e imagens antes de alterar os arquivos e pode ser executado novamente sem produzir alterações adicionais.

```sh
node scripts/apply-page-previews.mjs out scripts/page-previews.json
node scripts/apply-page-previews.mjs out scripts/page-previews.json --apply
```

A publicação direta foi feita em `/var/www/avila.inc`. A verificação pública confirmou 45 páginas e 45 imagens com HTTP 200, `og:image` e `twitter:image` corretos, dimensões 1200 × 630 e 45 hashes distintos. O backup anterior está em `/var/backups/avilaops-previews-before-20260908.tgz`.

Originais e previews no Drive: https://drive.google.com/drive/folders/1ysguUWltCwl6cnFjPYcd74Q2f_q-qCNt

As imagens anteriores específicas dos guias foram preservadas.
