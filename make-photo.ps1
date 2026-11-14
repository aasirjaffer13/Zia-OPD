$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Source: newly supplied photograph of Dr. Zia sitting in his clinic (clean file, no WhatsApp UI).
$src = Join-Path $env:USERPROFILE 'Downloads\WhatsApp Image 2026-11-14 at 8.42.34 PM.jpeg'
$img = [System.Drawing.Image]::FromFile($src)

# 4:5 portrait crop centred on the doctor (face ~x655, y430 in the 1600x1200 original).
# Keeps the wood-panelled clinic wall + "Blood Sugar Signal Board" as authentic context.
$rect = New-Object System.Drawing.Rectangle(215, 100, 880, 1100)
$crop = $img.Clone($rect, $img.PixelFormat)
$img.Dispose()

$outDir = Join-Path $PSScriptRoot 'public\images'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$out = Join-Path $outDir 'doctor.jpg'

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [long]82)
$crop.Save($out, $codec, $ep)
$crop.Dispose()

Write-Output "Saved: $out"
