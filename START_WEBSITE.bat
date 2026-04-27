@echo off
title Malwa Gift and Toys - Website Launcher
color 0A
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║       MALWA GIFT AND TOYS - malwagiftandtoys.in          ║
echo  ║              Bathinda, Punjab, India                      ║
echo  ║           Website Local Development Launcher              ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: ── Check Node.js ──────────────────────────────────────
echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    color 0C
    echo  ❌ ERROR: Node.js not found!
    echo.
    echo  Please install Node.js from: https://nodejs.org/
    echo  Download the LTS version (18.x or higher)
    echo.
    pause
    exit /b 1
)
FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VER=%%i
echo  ✅ Node.js found: %NODE_VER%

:: ── Check npm ───────────────────────────────────────────
echo [2/5] Checking npm...
npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  ❌ npm not found. Please reinstall Node.js
    pause
    exit /b 1
)
FOR /F "tokens=*" %%i IN ('npm --version') DO SET NPM_VER=%%i
echo  ✅ npm found: v%NPM_VER%

:: ── Install Frontend Dependencies ───────────────────────
echo [3/5] Installing Frontend dependencies...
cd /d "%~dp0frontend"
IF NOT EXIST "node_modules\" (
    echo  📦 Installing packages (first time - may take 3-5 minutes)...
    call npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo  ❌ Frontend install failed!
        pause
        exit /b 1
    )
) ELSE (
    echo  ✅ Frontend packages already installed
)

:: ── Install Backend Dependencies ────────────────────────
echo [4/5] Installing Backend dependencies...
cd /d "%~dp0backend"
IF NOT EXIST "node_modules\" (
    echo  📦 Installing backend packages...
    call npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo  ❌ Backend install failed!
        pause
        exit /b 1
    )
) ELSE (
    echo  ✅ Backend packages already installed
)

:: ── Setup .env file ─────────────────────────────────────
echo [5/5] Checking environment setup...
IF NOT EXIST ".env" (
    echo  ⚙️  Creating .env from template...
    copy ".env.example" ".env" >nul
    echo  ⚠️  IMPORTANT: Edit backend\.env with your real values before going live!
)

:: ── Start Both Servers ──────────────────────────────────
echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  🚀 LAUNCHING MALWA GIFT AND TOYS WEBSITE...             ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo  📌 Frontend: http://localhost:3000
echo  📌 Backend:  http://localhost:5000
echo  📌 API:      http://localhost:5000/api/health
echo.
echo  ℹ️  Two windows will open. Keep both open while working.
echo  ℹ️  Press Ctrl+C in each window to stop the servers.
echo.

timeout /t 2 /nobreak >nul

:: Start Backend
start "🎁 Malwa GT - Backend API (Port 5000)" cmd /k "cd /d "%~dp0backend" && echo Backend starting... && npm run dev"

timeout /t 3 /nobreak >nul

:: Start Frontend  
start "🛍️ Malwa GT - Frontend Website (Port 3000)" cmd /k "cd /d "%~dp0frontend" && echo Frontend starting... && npm start"

timeout /t 5 /nobreak >nul

:: Open browser
echo  🌐 Opening website in browser...
start "" "http://localhost:3000"

echo.
echo  ✅ Website launched successfully!
echo  ✅ Admin Panel: http://localhost:3000 → click "Admin" in nav
echo  ✅ Demo Login: admin@malwa.in / Admin@123
echo.
pause
