$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$src = Join-Path $PSScriptRoot 'src\main.jsx'
$css = Join-Path $PSScriptRoot 'src\style.css'
$base = Join-Path $PSScriptRoot 'public\assets\categorias'
$files = @('televisores.png','controles-remotos.png','cables-accesorios.png','accesorios-celulares.png','computacion.png','soportes-tv.png','iluminacion-rgb.png','servicio-tecnico.png')
Write-Host 'Revisando los archivos de SYX...' -ForegroundColor Cyan
if (-not (Test-Path -LiteralPath $src) -or -not (Test-Path -LiteralPath $css)) { throw 'No encuentro src\main.jsx y src\style.css. Descomprimi los archivos en la carpeta principal syx-tienda-online.' }
$missing = @($files | Where-Object { -not (Test-Path -LiteralPath (Join-Path $base $_)) })
if ($missing.Count -gt 0) { throw ("Faltan imagenes en public\assets\categorias: " + ($missing -join ', ') + '. No se publico nada.') }
$utf8 = [System.Text.UTF8Encoding]::new($false)
$code = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8)
$style = [System.IO.File]::ReadAllText($css, [System.Text.Encoding]::UTF8)
$original = '<span className="emoji">{c.emoji}</span>'
$replacement = '<img className="category-image" src={"/assets/categorias/"+({tv:"televisores",remotes:"controles-remotos",cables:"cables-accesorios",mobile:"accesorios-celulares",computer:"computacion",supports:"soportes-tv",lighting:"iluminacion-rgb"}[c.id])+".png"} alt={c.name} loading="lazy"/>'
if ($code.Contains($original)) {
    $code = $code.Replace($original, $replacement)
    Write-Host 'Cambie los iconos de las siete categorias.' -ForegroundColor Green
} elseif (-not $code.Contains('className="category-image"')) {
    throw 'El codigo de categorias no coincide con la version esperada. No se modifico nada.'
} else { Write-Host 'Las categorias ya usan imagenes.' }
# Encontrar el enlace de Servicio tecnico por su ruta, sin depender del emoji o encoding.
$servicePattern = '<Link className="category-tile" to="/servicio-tecnico"><span className="emoji">[^<]*</span>'
$serviceReplacement = '<Link className="category-tile" to="/servicio-tecnico"><img className="category-image" src="/assets/categorias/servicio-tecnico.png" alt="Servicio tecnico" loading="lazy"/>'
if ([System.Text.RegularExpressions.Regex]::IsMatch($code, $servicePattern)) {
    $code = [System.Text.RegularExpressions.Regex]::Replace($code, $servicePattern, $serviceReplacement)
    Write-Host 'Cambie el icono de servicio tecnico.' -ForegroundColor Green
} elseif ($code.Contains('src="/assets/categorias/servicio-tecnico.png"')) {
    Write-Host 'Servicio tecnico ya usa su imagen.' -ForegroundColor Green
} else {
    throw 'No encontre la tarjeta de Servicio tecnico. No se modifico nada.'
}
if (-not $style.Contains('/* SYX categorias PNG */')) {
    $style += "`r`n/* SYX categorias PNG */`r`n.category-tile .category-image{display:block;width:70px;height:70px;object-fit:contain;margin:0 auto 4px;flex-shrink:0}`r`n.category-tile{min-height:148px}`r`n"
}
[System.IO.File]::WriteAllText($src,$code,$utf8)
[System.IO.File]::WriteAllText($css,$style,$utf8)
Write-Host 'Compilando la tienda...' -ForegroundColor Cyan
& npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'La compilacion fallo. No se publico nada.' }
$distImages = Join-Path $PSScriptRoot 'dist\assets\categorias'
$distMissing = @($files | Where-Object { -not (Test-Path -LiteralPath (Join-Path $distImages $_)) })
if ($distMissing.Count -gt 0) { throw ("Faltan imagenes en dist: " + ($distMissing -join ', ') + '. No se publico nada.') }
Write-Host 'Publicando la tienda en Firebase...' -ForegroundColor Cyan
& firebase.cmd deploy --only hosting --project tiendasyxonline
if ($LASTEXITCODE -ne 0) { throw 'Firebase no pudo publicar la tienda.' }
Write-Host 'LISTO: las ocho categorias ya estan publicadas.' -ForegroundColor Green
Write-Host 'Abri https://tiendasyx.com y actualiza con Ctrl + Shift + R' -ForegroundColor Cyan
Write-Host 'Nota: esto publica en Firebase; no sube cambios a GitHub.'
