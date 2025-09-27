#!/bin/bash

# Photo Booth Pro - Quick Start Script
# Auto-detects available port and starts server

echo "🎉 Photo Booth Pro - Quick Start"
echo "================================"

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port is in use
    else
        return 0  # Port is available
    fi
}

# Find available port starting from 3000
PORT=3000
while ! check_port $PORT; do
    echo "Port $PORT is in use, trying $((PORT + 1))..."
    PORT=$((PORT + 1))
    if [ $PORT -gt 3010 ]; then
        echo "❌ No available ports found (tried 3000-3010)"
        exit 1
    fi
done

echo "✅ Using port: $PORT"

# Export port and start server
export PORT=$PORT
node server.js