# 🚀 Photo Booth Pro - Local Development Server (localhost:3000)

Deploy Photo Booth Pro as a local development server without XAMPP, running on `localhost:3000` with Node.js.

## ⚡ Quick Start

### Option 1: Automatic Startup (Recommended)

**Mac/Linux:**
```bash
cd /Users/adinatapranaja/Downloads/potobooth
./start-local.sh
```

**Windows:**
```cmd
cd C:\path\to\potobooth
start-local.bat
```

### Option 2: Manual Startup

```bash
# Navigate to project directory
cd /Users/adinatapranaja/Downloads/potobooth

# Start the server
node server.js
```

## 📋 Prerequisites

### Install Node.js (if not already installed)

**Mac (using Homebrew):**
```bash
brew install node
```

**Windows:**
- Download from: https://nodejs.org/
- Run the installer

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Verify Installation:**
```bash
node --version
npm --version
```

## 🌐 Access Your Photo Booth

Once the server starts, access your photo booth at:

### **🎯 http://localhost:3000**

## ✨ Features Available

### 🎨 **Full Modern UI**
- Glassmorphism design with blur effects
- Dark/Light theme toggle (top-right)
- 3D background animations (top-left controls)
- Smooth page transitions

### 📸 **Enhanced Photo Experience**
- Real-time camera preview with mirror effect
- Animated countdown with color transitions
- Professional photo capture and processing
- Multiple layout options with previews

### 💾 **Local Photo Storage**
- Photos automatically saved to `photos/` directory
- Unique filename generation with timestamps
- Real-time save confirmation
- No database required - file-based storage

### 📱 **Cross-Device Access**
- Works on desktop, tablet, and mobile
- Access from any device on your network
- Responsive design adapts to screen size

## 🔧 Server Features

### **Built-in Photo Processing**
- Base64 image decoding
- JPEG/PNG format support
- File validation and security
- Automatic directory creation

### **Development-Friendly**
- Hot-reload capability (restart server to update)
- Console logging for photo saves
- Error handling and graceful shutdown
- CORS enabled for development

### **Network Access**
Share with other devices on your network:
1. Find your IP address: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
2. Access from other devices: `http://YOUR_IP:3000`

## 📁 Project Structure

```
potobooth/
├── server.js              # Node.js development server
├── package.json            # Project configuration
├── start-local.sh          # Mac/Linux startup script
├── start-local.bat         # Windows startup script
├── index.php               # Main application (served as HTML)
├── capture.js              # Enhanced photo capture logic
├── background.js           # 3D animation system
├── styles.css              # Modern CSS with themes
├── photos/                 # Auto-created for photo storage
└── assets/                 # Static assets and libraries
```

## 🛠️ Development Tips

### **Live Development**
1. Make changes to any file
2. Press `Ctrl+C` to stop server
3. Run `./start-local.sh` again to restart
4. Refresh browser to see changes

### **Photo Management**
```bash
# View saved photos
ls -la photos/

# Clear all photos
rm -rf photos/*

# Check photo sizes
du -sh photos/*
```

### **Server Logs**
The server provides helpful console output:
- 📸 Photo save confirmations with file sizes
- 🌐 Request logging (GET/POST)
- ❌ Error messages with details
- 📊 Total photos count on shutdown

## 🔍 Troubleshooting

### **Port 3000 Already in Use**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID)
kill -9 PID

# Or use different port
PORT=3001 node server.js
```

### **Camera Not Working**
1. Ensure HTTPS not required (most browsers work with localhost)
2. Check camera permissions in browser
3. Verify no other app is using camera
4. Try different browser

### **Photos Not Saving**
1. Check console for error messages
2. Verify `photos/` directory permissions
3. Ensure sufficient disk space
4. Check if filename conflicts exist

### **3D Animations Missing**
1. Verify internet connection (loads Three.js from CDN)
2. Check browser console for JavaScript errors
3. Try different browser (Chrome/Firefox recommended)
4. Disable ad blockers if they block CDN

## 🎯 Production Considerations

### **For Event/Public Use**
1. **Disable Console Logs:**
   ```javascript
   // Comment out console.log statements in server.js
   ```

2. **Add Rate Limiting:**
   ```javascript
   // Add to server.js
   const clients = new Map();
   // Implement per-IP rate limiting
   ```

3. **Secure Photo Directory:**
   ```bash
   chmod 755 photos/
   # Prevent direct photo access if needed
   ```

## 🎊 Success!

If everything works correctly, you'll see:

```
🎉 Photo Booth Pro - Local Development Server
=============================================
🌐 Server running at: http://localhost:3000
📁 Serving files from: /path/to/potobooth
📸 Photos will be saved to: /path/to/potobooth/photos

🚀 Features Available:
• 3D Background Animations
• Dark/Light Theme Toggle
• Professional Photo Processing
• Real-time Photo Saving

📱 Access from any device on your network!
💡 Press Ctrl+C to stop the server

🎯 Ready to capture memories at: http://localhost:3000
```

## 🌟 Ready to Go!

Your Photo Booth Pro is now running on **localhost:3000** with full functionality:
- ✅ Modern glassmorphism UI
- ✅ 3D background animations
- ✅ Professional photo processing
- ✅ Real-time photo saving
- ✅ Cross-device compatibility

**Start capturing amazing memories! 📸✨**