# S&B Nexus Network Launcher
# Allows access from other devices on your network

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting S&B Nexus (Network Mode)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get local IP
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*'}).IPAddress

# Change to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Start API Server
Write-Host "[1/3] Starting API server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; Write-Host 'API Server Starting...' -ForegroundColor Green; node server/index.js"
Start-Sleep -Seconds 3

# Start Vite Dev Server  
Write-Host "[2/3] Starting web server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; Write-Host 'Web Server Starting...' -ForegroundColor Green; node ./node_modules/vite/bin/vite.js"
Start-Sleep -Seconds 6

# Open Browser
Write-Host "[3/3] Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ S&B Nexus is ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access from THIS computer:" -ForegroundColor White
Write-Host "  → http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access from OTHER DEVICES:" -ForegroundColor White
Write-Host "  → http://${localIP}:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Instructions for other devices:" -ForegroundColor Yellow
Write-Host "  1. Make sure they are on the same WiFi network" -ForegroundColor White
Write-Host "  2. Open a browser on the device" -ForegroundColor White
Write-Host "  3. Go to: http://${localIP}:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop: Close both PowerShell server windows" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
