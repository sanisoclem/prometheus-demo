function Expand-Tar($tarFile, $dest) {

    $pathToModule = "$PSScriptRoot\..\tools\7Zip4Powershell\1.8.0\7Zip4PowerShell.psd1"

    if (-not (Get-Command Expand-7Zip -ErrorAction Ignore)) {
        Import-Module $pathToModule
    }

    Expand-7Zip $tarFile $dest
    $tar = $dest + "/" +  [System.IO.Path]::GetFileNameWithoutExtension($tarfile)
    expand-7zip $tar $dest
}
function Expand-Zip($zip, $dest) {

    $pathToModule = "$PSScriptRoot\..\tools\7Zip4Powershell\1.8.0\7Zip4PowerShell.psd1"

    if (-not (Get-Command Expand-7Zip -ErrorAction Ignore)) {
        Import-Module $pathToModule
    }

    Expand-7Zip $zip $dest
}
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
ni -ItemType Directory -Force -Path "$PSScriptRoot\..\temp"
#iwr -outf "$PSScriptRoot\..\temp\prom.tar.gz" 'https://github.com/prometheus/prometheus/releases/download/v2.3.2/prometheus-2.3.2.windows-amd64.tar.gz'
#iwr -outf "$PSScriptRoot\..\temp\graf.zip"  'https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-5.2.1.windows-amd64.zip'

expand-tar "$PSScriptRoot\..\temp\prom.tar.gz" "$PSScriptRoot\..\temp"
expand-zip "$PSScriptRoot\..\temp\graf.zip" "$PSScriptRoot\..\temp"

start "$PSScriptRoot\..\temp\prometheus-2.3.2.windows-amd64\prometheus.exe" -argumentlist "--config.file=""$PSScriptRoot\prom.yml"""
start "$PSScriptRoot\..\temp\grafana-5.2.1\bin\grafana-server.exe" -argumentlist "-homepath ""$PSScriptRoot\..\temp\grafana-5.2.1"""