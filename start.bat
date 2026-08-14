@echo off
echo Starting S^&B Nexus...
echo.
echo Starting API server on http://localhost:5174
start "S&B Nexus API" cmd /k "cd /d "%~dp0" && npm run api"
timeout /t 3 /nobreak >nul

echo Starting Vite dev server on http://localhost:5173
start "S&B Nexus Web" cmd /k "cd /d "%~dp0" && npm run dev"
timeout /t 5 /nobreak >nul

echo Opening browser...
start http://localhost:5173

echo.
echo ========================================
echo S^&B Nexus is starting!
echo ========================================
echo API Server: http://localhost:5174
echo Website: http://localhost:5173
echo.
echo Close both command windows to stop the servers.
echo ========================================
