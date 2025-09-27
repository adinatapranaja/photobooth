@echo off
REM Photo Booth Pro - Local Server Startup Script (Windows)
REM Starts the development server on localhost:3000

echo 🎉 Photo Booth Pro - Local Development Server
echo ==============================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo 💡 Please install Node.js from: https://nodejs.org/
    echo.
    echo Quick install: Download from nodejs.org and run installer
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Create photos directory if it doesn't exist
if not exist "photos" (
    echo 📁 Creating photos directory...
    mkdir photos
)

REM Start the server
echo 🚀 Starting Photo Booth Pro server...
echo 📍 Server will be available at: http://localhost:3000
echo.
echo 🎯 Features:
echo • 🌟 3D Background Animations
echo • 🌙 Dark/Light Theme Toggle
echo • 📸 Professional Photo Capture
echo • 💾 Real-time Photo Saving
echo • 📱 Mobile Responsive Design
echo.
echo 💡 Press Ctrl+C to stop the server
echo.

REM Start Node.js server
node server.js

pause