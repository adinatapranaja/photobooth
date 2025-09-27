#!/bin/bash

# Photo Booth Pro - Local Server Startup Script
# Starts the development server on localhost:3000

echo "🎉 Photo Booth Pro - Local Development Server"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "💡 Please install Node.js from: https://nodejs.org/"
    echo ""
    echo "Quick install options:"
    echo "• macOS: brew install node"
    echo "• Windows: Download from nodejs.org"
    echo "• Linux: sudo apt install nodejs npm"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js found: $NODE_VERSION"

# Create photos directory if it doesn't exist
if [ ! -d "photos" ]; then
    echo "📁 Creating photos directory..."
    mkdir -p photos
    chmod 755 photos
fi

# Start the server
echo "🚀 Starting Photo Booth Pro server..."
echo "📍 Server will be available at: http://localhost:3000"
echo ""
echo "🎯 Features:"
echo "• 🌟 3D Background Animations"
echo "• 🌙 Dark/Light Theme Toggle"
echo "• 📸 Professional Photo Capture"
echo "• 💾 Real-time Photo Saving"
echo "• 📱 Mobile Responsive Design"
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo ""

# Start Node.js server
node server.js