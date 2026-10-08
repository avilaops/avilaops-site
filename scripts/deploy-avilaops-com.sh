#!/usr/bin/env bash
# Publica o export estatico (out/) no servidor, a partir de Linux ou macOS.
# E o mesmo deploy de scripts/deploy-avilaops-com.ps1, que continua valendo
# para o Windows; mudou um, muda o outro.
#
# O Caddy serve /var/www/avilaops.com, um symlink para a release ativa em
# /var/www/.releases/avilaops.com/<data>-<commit>. A release nova e extraida
# ao lado e o link troca de uma vez (ln + mv -T e atomico). Ficam as cinco
# mais recentes.
#
# Alem do site, este script envia caddy/avilaops-site.caddy — os cabecalhos
# de seguranca e de cache gerados no postbuild — e recarrega o Caddy quando
# o arquivo muda. O bloco do avilaops.com no Caddyfile precisa importar
# /etc/caddy/avilaops-site.caddy; sem o import o script avisa e segue.
#
#   DEPLOY_SSH   destino do ssh (padrao: applications, o alias do servidor)
set -euo pipefail

destino=${DEPLOY_SSH:-applications}
remoto=/var/www/avilaops.com
releases=/var/www/.releases/avilaops.com
snippet=/etc/caddy/avilaops-site.caddy

[[ -f out/index.html ]] || { echo "out/ nao encontrado. Rode npm run build antes do deploy." >&2; exit 1; }
[[ -f caddy/avilaops-site.caddy ]] || { echo "caddy/avilaops-site.caddy nao encontrado. O postbuild gera esse arquivo." >&2; exit 1; }

commit=$(git rev-parse --short HEAD 2>/dev/null || echo local)
release="$(date +%Y%m%d-%H%M%S)-$commit"

tar -czf - -C out . | ssh "$destino" "set -euo pipefail
test -L '$remoto'
mkdir -p '$releases/$release'
tar -xzf - -C '$releases/$release'
test -f '$releases/$release/index.html'
chmod 755 '$releases/$release'
echo \"anterior: \$(readlink '$remoto')\"
ln -sfn '$releases/$release' '$remoto.novo'
mv -T '$remoto.novo' '$remoto'
ativa=\$(readlink -f '$remoto')
ls -1dt '$releases'/*/ | sed 's:/\$::' | tail -n +6 | while read -r antiga; do
  [ \"\$antiga\" = \"\$ativa\" ] || rm -rf -- \"\$antiga\"
done
echo \"ativa: \$ativa\""

# Cabecalhos: so troca e recarrega se o conteudo mudou. Se o Caddy recusar a
# configuracao nova, o arquivo anterior volta e o deploy falha — o site ja
# publicado continua no ar com os cabecalhos de antes.
ssh "$destino" "set -euo pipefail
novo=\$(mktemp)
cat > \"\$novo\"
if ! grep -q 'import $snippet' /etc/caddy/Caddyfile; then
  echo 'AVISO: o Caddyfile nao importa $snippet; cabecalhos nao aplicados.' >&2
  rm -f \"\$novo\"; exit 0
fi
if [ -f '$snippet' ] && cmp -s \"\$novo\" '$snippet'; then
  rm -f \"\$novo\"; echo 'cabecalhos: sem mudanca'; exit 0
fi
[ -f '$snippet' ] && cp -p '$snippet' '$snippet.anterior'
install -m 644 \"\$novo\" '$snippet'; rm -f \"\$novo\"
if ! caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
  [ -f '$snippet.anterior' ] && cp -p '$snippet.anterior' '$snippet'
  echo 'Caddy recusou os cabecalhos novos; arquivo anterior restaurado.' >&2; exit 1
fi
systemctl reload caddy
echo 'cabecalhos: atualizados e Caddy recarregado'" < caddy/avilaops-site.caddy

echo "Deploy concluido: $remoto -> $releases/$release"
