@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo  SYX - IMAGENES DE CATEGORIAS
 echo ========================================
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0ACTUALIZAR_CATEGORIAS.ps1"
echo.
if errorlevel 1 (
  echo HUBO UN ERROR. Mandame una foto de esta ventana.
) else (
  echo PROCESO TERMINADO.
)
pause
