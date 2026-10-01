param(
  [string]$HostName = "178.105.82.48",
  [string]$User = "root",
  [string]$KeyPath = "$env:USERPROFILE\.ssh\hetzner_avilaops",
  [string]$RemotePath = "/var/www/avilaops.com"
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath "out")) {
  throw "Diretorio out/ nao encontrado. Rode npm run build antes do deploy."
}

if (!(Test-Path -LiteralPath $KeyPath)) {
  throw "Chave SSH nao encontrada em $KeyPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$commit = (git rev-parse --short HEAD 2>$null)
if (!$commit) { $commit = "local" }
$release = "$timestamp-$commit"
$archive = "avilaops-com-out-$timestamp.tar.gz"
$remoteArchive = "/tmp/$archive"
$releasesPath = "/var/www/.releases/avilaops.com"
$remoteRelease = "$releasesPath/$release"

tar -czf $archive -C out .

try {
  scp -i $KeyPath $archive "${User}@${HostName}:$remoteArchive"

  # $RemotePath e um symlink para a release ativa em $releasesPath. A release
  # nova e extraida ao lado e o link troca de uma vez (ln + mv -T e atomico),
  # entao o Caddy nunca serve uma pasta pela metade. As cinco releases mais
  # recentes ficam no disco para rollback: basta apontar o link de volta.
  $remoteCommand = @"
set -e
test -f '$remoteArchive'
test -L '$RemotePath'
mkdir -p '$remoteRelease'
tar -xzf '$remoteArchive' -C '$remoteRelease'
test -f '$remoteRelease/index.html'
chmod 755 '$remoteRelease'
echo "anterior: `$(readlink '$RemotePath')"
ln -sfn '$remoteRelease' '$RemotePath.novo'
mv -T '$RemotePath.novo' '$RemotePath'
rm -f '$remoteArchive'
ativa=`$(readlink -f '$RemotePath')
ls -1dt '$releasesPath'/*/ | sed 's:/`$::' | tail -n +6 | while read -r antiga; do
  [ "`$antiga" = "`$ativa" ] || rm -rf -- "`$antiga"
done
echo "ativa: `$ativa"
"@

  # O here-string herda o fim de linha do arquivo. Com core.autocrlf=true este
  # .ps1 vem com CRLF, e o \r vira parte de cada argumento no bash remoto:
  # "set: -: invalid option", "tar: .\r: Cannot stat", "rm: unrecognized option".
  # Normalizar para LF antes de enviar.
  $remoteCommand = $remoteCommand -replace "`r`n", "`n"

  ssh -i $KeyPath "${User}@${HostName}" $remoteCommand

  # $ErrorActionPreference nao pega codigo de saida de executavel nativo: sem
  # este teste um deploy que falhou no servidor ainda imprimia "Deploy concluido".
  if ($LASTEXITCODE -ne 0) {
    throw "Deploy remoto falhou (ssh saiu com $LASTEXITCODE). O link $RemotePath so troca no fim, entao o site continua na release anterior."
  }

  Write-Host "Deploy concluido: $RemotePath -> $remoteRelease"
}
finally {
  if (Test-Path -LiteralPath $archive) {
    Remove-Item -LiteralPath $archive -Force
  }
}
