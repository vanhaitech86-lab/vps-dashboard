@echo off
chcp 65001 > nul
echo ========================================================
echo   HE THONG BAO CAO QUAN TRI TAP DOAN VPS GROUP
echo ========================================================
echo Dang kiem tra may chu VPS Dashboard tren Port 3000...

netstat -ano | findstr :3000 > nul
if %errorlevel% neq 0 (
    echo [THONG BAO] Khoi dong may chu Port 3000...
    start /b node server.js
    timeout /t 2 /nobreak > nul
)

echo [OK] Dang mo trinh duyet VPS Group Dashboard...
start http://localhost:3000
