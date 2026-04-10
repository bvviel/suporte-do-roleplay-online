@echo off
echo ==============================================
echo OBSIDIAN CODEX - SUPORTE DE ROLEPLAY ONLINE
echo ==============================================
echo.
echo Iniciando o grimorio...

IF NOT EXIST "node_modules\" (
    echo Instalando as dependencias magicas do node...
    call npm install
)

echo Ligando o servidor portal...
call npm run dev
pause
