# 🚀 Photo Booth Pro - Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Automatic Script (Mac/Linux)
```bash
# Navigate to potobooth folder
cd /Users/adinatapranaja/Downloads/potobooth

# Run deployment script
./deploy.sh
```

### Option 2: Manual Deployment (All Platforms)

#### Step 1: Copy Files
**Windows:**
```cmd
copy potobooth C:\xampp\htdocs\photobooth-pro
```

**Mac:**
```bash
cp -r potobooth /Applications/XAMPP/htdocs/photobooth-pro
```

**Linux:**
```bash
sudo cp -r potobooth /opt/lampp/htdocs/photobooth-pro
```

#### Step 2: Set Permissions
**Mac/Linux:**
```bash
# Standard permissions
chmod -R 755 /path/to/htdocs/photobooth-pro

# Photos directory (writable)
chmod -R 777 /path/to/htdocs/photobooth-pro/photos
```

**Windows:**
- Right-click `photos` folder → Properties → Security
- Give "Everyone" Full Control permissions

#### Step 3: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Optionally start **MySQL** (not required for basic functionality)

#### Step 4: Access Application
Open browser and navigate to:
```
http://localhost/photobooth-pro
```

## 🔧 Verification Checklist

### ✅ Basic Functionality
- [ ] Page loads without errors
- [ ] Camera permission prompt appears
- [ ] Video preview shows (mirror effect)
- [ ] Photo count selection works
- [ ] Theme toggle (☀️/🌙) switches themes

### ✅ Advanced Features
- [ ] Background animations load (check top-left controls)
- [ ] Countdown animation works with color changes
- [ ] Layout selection shows animated previews
- [ ] Frame selection displays emoji previews
- [ ] 3D loading spinner appears during generation

### ✅ Final Output
- [ ] Polaroid-style preview appears
- [ ] Download button works
- [ ] Save to server creates file in photos/ folder
- [ ] Date appears in polaroid caption

## 🛠️ Troubleshooting

### Photos Not Saving
```bash
# Fix permissions
chmod 777 /path/to/htdocs/photobooth-pro/photos

# Check if folder exists
ls -la /path/to/htdocs/photobooth-pro/photos
```

### 3D Animations Missing
1. Check browser console for Three.js errors
2. Verify internet connection (loads from CDN)
3. Try different browser (Chrome/Firefox recommended)

### Camera Not Working
1. Check browser permissions (click lock icon in address bar)
2. Ensure no other app is using camera
3. Try accessing via HTTPS: `https://localhost/photobooth-pro`

### Performance Issues
1. Close other browser tabs
2. Disable other background animations
3. Use simpler animation mode (particles → waves → cubes)

## 🎯 Production Deployment

### For Public/Event Use

1. **Security Hardening:**
```php
// In save.php, add rate limiting
session_start();
if (!isset($_SESSION['last_save'])) $_SESSION['last_save'] = 0;
if (time() - $_SESSION['last_save'] < 5) {
    exit(json_encode(['error' => 'Rate limited']));
}
$_SESSION['last_save'] = time();
```

2. **Performance Optimization:**
```javascript
// Disable animations for better performance
document.querySelector('.bg-controls').style.display = 'none';
```

3. **Kiosk Mode:**
```javascript
// Auto-fullscreen and disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());
document.documentElement.requestFullscreen();
```

## 📱 Mobile Optimization

### iOS Safari Fix
Add to head of index.php:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

### Android Chrome Fix
Ensure HTTPS for camera access:
```bash
# Generate self-signed certificate for localhost
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## 🎊 Success!

If everything works correctly, you should see:
- 🎨 Beautiful glassmorphism interface
- 🌟 Smooth 3D background animations
- 📸 Professional photo capture experience
- 💫 Elegant transitions between screens
- 📱 Perfect mobile responsiveness

**Access your Photo Booth Pro at:**
# 🌐 http://localhost/photobooth-pro

Ready to create amazing memories! 📸✨