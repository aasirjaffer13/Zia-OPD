$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.PixelOffsetMode = 'HighQuality'

# Background: primary navy
$navy = [System.Drawing.Color]::FromArgb(255, 20, 43, 69)
$forest = [System.Drawing.Color]::FromArgb(255, 23, 77, 58)
$gold = [System.Drawing.Color]::FromArgb(255, 197, 166, 106)
$white = [System.Drawing.Color]::White
$ivory = [System.Drawing.Color]::FromArgb(255, 247, 248, 245)

$g.Clear($navy)

# Subtle concentric arcs top-right (gold, low opacity)
$arcBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(26, 197, 166, 106))
$g.FillEllipse($arcBrush, 860, -280, 720, 720)
$arcPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 197, 166, 106), 2)
$g.DrawEllipse($arcPen, 900, -240, 640, 640)
$g.DrawEllipse($arcPen, 980, -160, 480, 480)

# Thin gold rule along the bottom
$rulePen = New-Object System.Drawing.Pen($gold, 4)
$g.DrawLine($rulePen, 0, 626, 1200, 626)

# Emblem: forest disc + gold ring + white cross (mirrors the SVG emblem)
$cx = 130; $cy = 315
$g.FillEllipse((New-Object System.Drawing.SolidBrush($forest)), $cx - 74, $cy - 74, 148, 148)
$ringPen = New-Object System.Drawing.Pen($gold, 4)
$g.DrawEllipse($ringPen, $cx - 64, $cy - 64, 128, 128)
$cross = New-Object System.Drawing.SolidBrush($white)
$g.FillRectangle($cross, ($cx - 8), ($cy - 47), 16, 57.3)
$g.FillRectangle($cross, ($cx - 28.5), ($cy - 26.7), 57, 16.3)
# gold pulse below the cross
$pulsePen = New-Object System.Drawing.Pen($gold, 5)
$pulsePen.StartCap = 'Round'; $pulsePen.EndCap = 'Round'
$pts = @(
  (New-Object System.Drawing.PointF(($cx - 44.4), ($cy + 35.8))),
  (New-Object System.Drawing.PointF(($cx - 30.5), ($cy + 35.8))),
  (New-Object System.Drawing.PointF(($cx - 25.3), ($cy + 24.9))),
  (New-Object System.Drawing.PointF(($cx - 17.7), ($cy + 46.1))),
  (New-Object System.Drawing.PointF(($cx - 9.4), ($cy + 20.2))),
  (New-Object System.Drawing.PointF(($cx - 2.0), ($cy + 45.4))),
  (New-Object System.Drawing.PointF(($cx + 3.4), ($cy + 34.0))),
  (New-Object System.Drawing.PointF(($cx + 44.4), ($cy + 34.0)))
)
$g.DrawLines($pulsePen, $pts)

# Text
$serif = New-Object System.Drawing.Font('Georgia', 54, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sans = New-Object System.Drawing.Font('Segoe UI', 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sansSemi = New-Object System.Drawing.Font('Segoe UI Semibold', 21, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$small = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$dot = [char]0x00B7

$brushWhite = New-Object System.Drawing.SolidBrush($white)
$brushGold = New-Object System.Drawing.SolidBrush($gold)
$brushIvory = New-Object System.Drawing.SolidBrush($ivory)

$x = 260
$g.DrawString("Dr. Zia's OPD Clinic", $serif, $brushWhite, $x, 200)
$g.DrawString("Medical Consultation  $dot  Kupwara, Jammu & Kashmir", $sans, $brushIvory, $x + 4, 285)
$g.DrawLine($rulePen, $x + 4, 345, $x + 164, 345)
$g.DrawString("MBBS  $dot  DNB General Medicine  $dot  MD", $sansSemi, $brushGold, $x + 4, 372)
$g.DrawString("Iqbal Market, Kupwara  $dot  +91 7889892181", $small, $brushIvory, $x + 4, 425)

$out = Join-Path $PSScriptRoot 'public\og-image.png'
$g.Dispose()
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Saved: $out"
