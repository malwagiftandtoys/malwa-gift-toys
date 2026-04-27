@echo off
title Malwa Gift & Toys - Install and Run
color 0E
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║         MALWA GIFT AND TOYS - FIRST TIME SETUP           ║
echo  ║              malwagiftandtoys.in                         ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo  This will install all required software and launch your website.
echo.

:: Step 1 - Check Node.js
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  ❌ Node.js not installed!
    echo.
    echo  STEP 1: Download and install Node.js LTS:
    echo  👉 https://nodejs.org/en/download
    echo.
    echo  After installing Node.js, run this file again.
    echo.
    start "" "https://nodejs.org/en/download"
    pause
    exit /b 1
)
echo  ✅ Node.js: OK

:: Step 2 - Install all packages
echo.
echo  📦 Installing Frontend packages...
cd /d "%~dp0frontend"
call npm install --silent
echo  ✅ Frontend packages installed

echo.
echo  📦 Installing Backend packages...
cd /d "%~dp0backend"
call npm install --silent
echo  ✅ Backend packages installed

:: Step 3 - Create .env
IF NOT EXIST ".env" (
    copy ".env.example" ".env" >nul
    echo  ✅ Created backend\.env (edit before going live!)
)
cd /d "%~dp0frontend"
IF NOT EXIST ".env.local" (
    copy ".env.example" ".env.local" >nul
    echo  ✅ Created frontend\.env.local
)

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  ✅ INSTALLATION COMPLETE! Launching website...          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

timeout /t 2 /nobreak >nul

:: Start servers
cd /d "%~dp0"
start "Malwa GT Backend" cmd /k "cd backend && npm run dev"
timeout /t 4 /nobreak >nul
start "Malwa GT Frontend" cmd /k "cd frontend && npm start"
timeout /t 6 /nobreak >nul
start "" "http://localhost:3000"

echo  🌐 Opening http://localhost:3000
echo.
echo  Admin Panel → click "Admin" in navbar
echo  Login: admin@malwa.in / Admin@123
echo.
pause
