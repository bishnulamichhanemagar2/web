# S&B Nexus Launcher
Write-Host "Starting S&B Nexus..." -ForegroundColor Cyan
Write-Host ""

# Change to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Start API Server
Write-Host "Starting API server on http://localhost:5174" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; npm run api"
Start-Sleep -Seconds 3

# Start Vite Dev Server
Write-Host "Starting Vite dev server on http://localhost:5173" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; npm run dev"
Start-Sleep -Seconds 5

# Open Browser
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "S&B Nexus is starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API Server: http://localhost:5174" -ForegroundColor White
Write-Host "Website: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Close both PowerShell windows to stop the servers." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this launcher..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
