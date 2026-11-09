@echo off
echo ========================================
echo   BA Tax Clearance System - Deployment
echo ========================================
echo.

echo Building production version...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please fix errors and try again.
    pause
    exit /b %errorlevel%
)

echo.
echo Build successful! Now deploying to Vercel...
echo.

call vercel --prod

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Share the URL above with your boss!
echo.
pause
