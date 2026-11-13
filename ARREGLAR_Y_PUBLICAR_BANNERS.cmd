@echo off
setlocal
cd /d "%~dp0"
title SYX - Arreglar y publicar banners PNG
 echo.
 echo ===========================================
 echo  SYX - CORREGIR Y PUBLICAR BANNERS PNG
 echo ===========================================
 echo.
if not exist "src\main.jsx" (
 echo ERROR: Copia este archivo y corregir-banners.mjs dentro de la carpeta syx-tienda-online.
 goto :error
)
node "corregir-banners.mjs"
if errorlevel 1 goto :error
call npm.cmd run build
if errorlevel 1 goto :error
call firebase.cmd deploy --only hosting --project tiendasyxonline
if errorlevel 1 goto :error
 echo.
 echo LISTO. Abri https://tiendasyxonline.web.app
 echo Para confirmar: https://tiendasyxonline.web.app/version.txt
 echo.
pause
exit /b 0
:error
 echo.
 echo No se publico. Copia o toma foto del mensaje de error y envialo.
pause
exit /b 1
