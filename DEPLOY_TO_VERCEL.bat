@echo off
title Malwa Gift & Toys - Deploy to Vercel (malwagiftandtoys.in)
color 0B
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║       MALWA GIFT AND TOYS - DEPLOY TO VERCEL             ║
echo  ║  This will publish your site to malwagiftandtoys.in      ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Check Node.js
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  ❌ Node.js required. Install from nodejs.org
    pause
    exit /b 1
)

:: Install Vercel CLI if not present
vercel --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  📦 Installing Vercel CLI...
    call npm install -g vercel
)
echo  ✅ Vercel CLI ready

:: Build frontend
echo.
echo  🔨 Building production frontend...
cd /d "%~dp0frontend"
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo  ❌ Build failed! Check errors above.
    pause
    exit /b 1
)
echo  ✅ Frontend built successfully!

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  📋 BEFORE DEPLOYING - CHECKLIST:                        ║
echo  ║                                                          ║
echo  ║  1. Have you updated frontend\.env.local ?               ║
echo  ║  2. Is your backend deployed? (Railway/Render)           ║
echo  ║  3. Do you have your Vercel account ready?               ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
set /p CONFIRM="Ready to deploy? (yes/no): "
IF /I NOT "%CONFIRM%"=="yes" (
    echo  Deployment cancelled.
    pause
    exit /b 0
)

:: Deploy to Vercel
echo.
echo  🚀 Deploying to Vercel...
echo  ℹ️  If prompted, login with your Vercel account (vercel.com)
echo.
call vercel --prod

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  ✅ DEPLOYMENT COMPLETE!                                  ║
echo  ║                                                          ║
echo  ║  NEXT STEP - Connect your GoDaddy domain:                ║
echo  ║  See docs\GODADDY_SETUP.md for step-by-step guide        ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo  📖 Open GODADDY_SETUP guide? (yes/no)
set /p OPEN_GUIDE=""
IF /I "%OPEN_GUIDE%"=="yes" (
    start "" "%~dp0docs\GODADDY_SETUP.md"
)
pause
