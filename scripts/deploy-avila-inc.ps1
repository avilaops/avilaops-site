param(
  [string]$HostName = "178.105.82.48",
  [string]$User = "root",
  [string]$KeyPath = "$env:USERPROFILE\.ssh\hetzner_avilaops",
  [string]$RemotePath = "/var/www/avila.inc"
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath "out")) {
  throw "Diretorio out/ nao encontrado. Rode npm run build antes do deploy."
}

if (!(Test-Path -LiteralPath $KeyPath)) {
  throw "Chave SSH nao encontrada em $KeyPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archive = "avila-inc-out-$timestamp.tar.gz"
$remoteArchive = "/tmp/$archive"
$remoteNew = "/tmp/avila-inc-new-$timestamp"
$backupPath = "/var/backups/avila.inc/avila.inc-before-$timestamp.tar.gz"

tar -czf $archive -C out .

try {
  scp -i $KeyPath $archive "${User}@${HostName}:$remoteArchive"

  $remoteCommand = @"
set -e
test -f '$remoteArchive'
test -d '$RemotePath'
test "`$(readlink -f '$RemotePath')" = '$RemotePath'
mkdir -p /var/backups/avila.inc
tar -czf '$backupPath' -C '$RemotePath' .
rm -rf '$remoteNew'
mkdir -p '$remoteNew'
tar -xzf '$remoteArchive' -C '$remoteNew'
find '$RemotePath' -mindepth 1 -maxdepth 1 -print0 | xargs -0 rm -rf --
cp -a '$remoteNew'/. '$RemotePath'/
chown -R www-data:www-data '$RemotePath'
rm -rf '$remoteNew' '$remoteArchive'
find '$RemotePath' -maxdepth 1 -mindepth 1 | wc -l
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
    throw "Deploy remoto falhou (ssh saiu com $LASTEXITCODE). O site em $RemotePath nao foi alterado."
  }

  Write-Host "Deploy concluido em $RemotePath. Backup: $backupPath"
}
finally {
  if (Test-Path -LiteralPath $archive) {
    Remove-Item -LiteralPath $archive -Force
  }
}
