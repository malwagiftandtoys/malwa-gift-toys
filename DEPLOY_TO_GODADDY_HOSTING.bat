@echo off
title Malwa Gift & Toys - Deploy to GoDaddy Hosting
color 0D
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║   MALWA GIFT AND TOYS - DEPLOY TO GODADDY cPANEL        ║
echo  ║        malwagiftandtoys.in  ·  Bathinda, Punjab          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo  This creates a production build ready to upload to GoDaddy.
echo.

:: Build frontend
echo  🔨 Step 1: Building production website...
cd /d "%~dp0frontend"

IF NOT EXIST "node_modules\" (
    echo  📦 Installing packages first...
    call npm install
)

call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo  ❌ Build failed! Check the errors above.
    pause
    exit /b 1
)

echo  ✅ Build complete!

:: Copy build to deploy folder
echo.
echo  📁 Step 2: Preparing deploy package...
cd /d "%~dp0"
IF EXIST "GODADDY_UPLOAD\" rmdir /s /q "GODADDY_UPLOAD\"
mkdir "GODADDY_UPLOAD"
xcopy /E /I /Q "frontend\build\*" "GODADDY_UPLOAD\" >nul
echo  ✅ Files ready in GODADDY_UPLOAD\ folder

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  📁 UPLOAD THESE FILES TO GODADDY:                       ║
echo  ║                                                          ║
echo  ║  GODADDY_UPLOAD\ folder → public_html\ on GoDaddy       ║
echo  ║                                                          ║
echo  ║  HOW TO UPLOAD:                                          ║
echo  ║  1. Login → My Products → Hosting → Manage              ║
echo  ║  2. Click File Manager → Go to public_html               ║
echo  ║  3. Upload ALL files from GODADDY_UPLOAD\ folder         ║
echo  ║  4. OR use FTP: FileZilla (see docs\GODADDY_SETUP.md)    ║
echo  ║                                                          ║
echo  ║  ⚠️  DELETE old files in public_html before uploading!   ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Open the folder
echo  📂 Opening GODADDY_UPLOAD folder...
start "" "%~dp0GODADDY_UPLOAD\"

echo.
echo  📖 Read the complete GoDaddy guide:
start "" "%~dp0docs\GODADDY_SETUP.md"
echo.
pause
