# Photo Booth Pro 🎉

A modern, feature-rich web-based photo booth application with stunning 3D animations, glassmorphism UI, and professional-grade effects. Built for XAMPP deployment with cutting-edge web technologies.

## ✨ Enhanced Features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Transparent cards with backdrop blur effects
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **3D Background Animations**: Three different animated backgrounds:
  - 🌟 Floating Particles
  - 🌊 Gradient Waves
  - 🧊 Rotating Cubes
- **Smooth Page Transitions**: Slide animations between screens
- **Interactive Elements**: Hover effects, glow buttons, and micro-interactions

### 📸 Photo Capture
- **Enhanced Countdown**: Animated circles with color transitions and flash effects
- **Real-time Preview**: Mirror-effect video with gradient overlays
- **Multiple Sessions**: Choose 1-4 photos with elegant selection cards
- **Professional Capture**: High-quality canvas-based photo processing

### 🖼️ Layout & Frames
- **Smart Layouts**: Auto-suggested layouts based on photo count
- **Frame Collection**: 6 beautifully designed frames with emoji previews
- **Live Preview**: Interactive layout and frame selection
- **Smooth Generation**: 3D loading spinner during collage creation

### 🖨️ Final Output
- **Polaroid Aesthetic**: Instagram-style photo presentation
- **Auto-dating**: Timestamps on photo captions
- **Multiple Export Options**: Download, server save, and direct printing
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### 🎭 Advanced Animations
- **GPU-Optimized**: Hardware-accelerated 3D graphics
- **Reduced Motion Support**: Accessibility-friendly fallbacks
- **Smooth Transitions**: Cubic-bezier easing for professional feel
- **Staggered Animations**: Elements appear with choreographed timing

## Quick Start

### 1. Deploy to XAMPP

1. **Copy files to XAMPP**:
   ```bash
   # Copy the entire potobooth folder to your XAMPP htdocs directory
   cp -r potobooth/ /Applications/XAMPP/htdocs/
   # or on Windows: copy potobooth C:\xampp\htdocs\
   ```

2. **Set folder permissions** (Linux/Mac):
   ```bash
   chmod 755 /Applications/XAMPP/htdocs/potobooth/
   chmod 777 /Applications/XAMPP/htdocs/potobooth/photos/
   ```

3. **Start XAMPP**:
   - Start Apache service
   - PHP module should be enabled

### 2. Access the Application

Open your browser and navigate to:
```
http://localhost/potobooth/
```

## File Structure

```
potobooth/
├── index.php              # Modern UI with glassmorphism and dark mode
├── capture.js             # Enhanced photo capture with smooth animations
├── background.js          # 3D animation system with Three.js
├── styles.css             # Advanced CSS with gradients and glassmorphism
├── save.php               # Secure backend for photo storage
├── assets/
│   └── libs/
│       ├── three-loader.js     # Three.js CDN loader with fallbacks
│       └── INSTALL_THREEJS.md  # Three.js installation guide
├── frames/                # Frame assets directory
│   └── README.txt         # PNG frame installation instructions
├── photos/                # Saved photos (auto-created, secured)
│   └── .htaccess          # Security protection
└── README.md              # Complete documentation
```

## How to Use

### 🚀 Getting Started
1. **Theme Selection**: Use the theme toggle (☀️/🌙) in top-right to switch between light/dark modes
2. **Background Animation**: Choose your preferred animation style with the controls in top-left:
   - 🌟 Floating Particles
   - 🌊 Gradient Waves
   - 🧊 Rotating Cubes

### 📸 Photo Session
1. **Camera Setup**:
   - Allow camera access when prompted
   - Select number of photos using elegant count cards (1-4)
   - Click "Start Photo Session"

2. **Photo Capture**:
   - Watch the enhanced countdown with color transitions
   - See the flash effect before each capture
   - Enjoy smooth transitions between photos

### 🎨 Customization
1. **Layout Selection**:
   - Layouts auto-suggest based on photo count
   - Choose from Single, Side by Side, Quad Grid, or Photo Strip
   - Preview each layout with animated cards

2. **Frame Selection**:
   - Browse 6 unique frame styles with emoji previews
   - See instant previews of each frame option
   - Select based on mood: Classic, Romance, Stellar, Nature, Party, or Vintage

3. **Generation**:
   - Click "Create Your Masterpiece"
   - Watch the 3D loading animation
   - See your collage appear with smooth transitions

### 💫 Final Result
1. **Preview**:
   - View your photo in a beautiful polaroid-style frame
   - Auto-dated with current timestamp
   - Smooth hover effects and animations

2. **Export Options**:
   - **Download**: Save as high-quality JPEG
   - **Save to Server**: Store on server with unique filename
   - **Print**: Direct browser printing with optimized layout
   - **New Session**: Start over with smooth transition back to beginning

## Technical Details

### Frontend Stack
- **HTML5**: Semantic markup with SVG icons and modern form elements
- **CSS3**: Advanced features including:
  - CSS Custom Properties for theming
  - Glassmorphism with backdrop-filter
  - 3D transforms and keyframe animations
  - Grid and Flexbox layouts
  - Responsive design with media queries
- **JavaScript ES6+**: Modern syntax with:
  - Classes and arrow functions
  - Async/await for camera handling
  - Canvas API for image processing
  - Animation timing with requestAnimationFrame
- **Three.js**: 3D graphics library for background animations
- **Google Fonts**: Poppins font family for modern typography

### Backend Stack
- **PHP 7+**: Server-side processing with:
  - Base64 image decoding
  - File validation and security
  - JSON API responses
  - Directory management
- **File System**: Secure local photo storage
- **Security**: Comprehensive protection including:
  - Input validation and sanitization
  - File type and size restrictions
  - .htaccess directory protection
  - CSRF-safe form handling

### Browser Requirements
- **Core Features**:
  - WebRTC support for getUserMedia
  - Canvas API for image manipulation
  - CSS Grid and Flexbox support
  - ES6+ JavaScript features
- **Enhanced Features**:
  - WebGL for 3D animations
  - CSS backdrop-filter for glassmorphism
  - CSS custom properties for theming
  - Hardware acceleration support

### Performance Features
- **GPU Acceleration**: Hardware-accelerated 3D graphics and CSS transforms
- **Reduced Motion**: Automatic detection and respect for accessibility preferences
- **Progressive Enhancement**: Graceful fallbacks for unsupported features
- **Efficient Animations**: RequestAnimationFrame-based smooth animations
- **Memory Management**: Proper cleanup of Three.js resources and event listeners

## Configuration

### Photo Storage
- Photos saved to `photos/` directory
- Automatic filename generation with timestamps
- Maximum file size: 5MB
- Supported formats: JPEG, PNG

### Security Features
- Input validation for image data
- File type restrictions
- Directory protection with .htaccess
- Size limits for uploads

### 🎨 Advanced Customization

#### Background Animations
**Enable/Disable Animations**:
```javascript
// In background.js, modify constructor:
this.isEnabled = true; // Set to false to disable all animations

// Or hide controls entirely:
document.querySelector('.bg-controls').style.display = 'none';
```

**Add New Animation Types**:
1. Add new button in `index.php`:
```html
<button class="bg-btn" data-animation="spiral" title="Spiral Pattern">
    <!-- SVG icon here -->
</button>
```

2. Add case in `background.js`:
```javascript
case 'spiral':
    this.createSpiralAnimation();
    break;
```

3. Implement the animation method following existing patterns

#### Theme Customization
**Add Custom Themes**:
```css
/* In styles.css, add new theme */
[data-theme="sunset"] {
    --background-gradient: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
    --glass-bg: rgba(255, 165, 0, 0.25);
    /* ... other theme variables */
}
```

**Dynamic Theme Colors**:
```javascript
// In capture.js, modify color schemes:
const themes = {
    'ocean': ['#667eea', '#764ba2'],
    'sunset': ['#ff6b6b', '#ffa500'],
    'forest': ['#11998e', '#38ef7d']
};
```

#### Frame System Enhancement
**Adding PNG Frames**:
1. Create 400x400px PNG files with transparency
2. Save as `frame1.png`, `frame2.png`, etc. in `frames/` folder
3. Update `setupFrameImages()` in `capture.js`:

```javascript
setupFrameImages() {
    this.frameImages = {};
    const frameNames = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5', 'frame6'];

    frameNames.forEach(name => {
        const img = new Image();
        img.onload = () => {
            this.frameImages[name] = img;
        };
        img.src = `frames/${name}.png`;
    });
}
```

4. Update `applyFrame()` method:
```javascript
applyFrame(x, y, w, h) {
    if (this.frameImages[this.selectedFrame]) {
        this.finalCtx.drawImage(this.frameImages[this.selectedFrame], x, y, w, h);
    }
}
```

#### Layout System Extension
**Custom Layout Patterns**:
```javascript
// Add to layouts object in generateCollage():
const layouts = {
    'custom': {
        width: 1000,
        height: 600,
        positions: [
            {x: 0, y: 0, w: 300, h: 300},      // Large main photo
            {x: 350, y: 0, w: 150, h: 150},    // Small top-right
            {x: 350, y: 175, w: 150, h: 150},  // Small bottom-right
            {x: 550, y: 75, w: 200, h: 200}    // Medium right
        ]
    }
};
```

#### Animation Timing Control
**Adjust Transition Speeds**:
```javascript
// In capture.js constructor:
this.transitionDuration = 800; // Slower transitions
this.animationDelay = 200;     // Stagger timing

// Or in CSS:
:root {
    --transition-fast: 0.15s ease;   // Faster micro-interactions
    --transition-medium: 0.5s ease;  // Standard transitions
    --transition-slow: 0.8s ease;    // Dramatic transitions
}
```

#### Accessibility Enhancements
**Enhanced Reduced Motion Support**:
```css
@media (prefers-reduced-motion: reduce) {
    .glass-card {
        transition: none !important;
    }

    .countdown-circle {
        animation: none !important;
    }
}
```

**High Contrast Mode**:
```css
@media (prefers-contrast: high) {
    :root {
        --glass-bg: rgba(255, 255, 255, 0.95);
        --text-primary: #000000;
        --shadow-color: rgba(0, 0, 0, 0.8);
    }
}
```

## Troubleshooting

### Common Issues

**🎥 Camera Not Working**:
- Check browser permissions in address bar
- Ensure HTTPS connection (required by some browsers)
- Verify camera isn't used by another application
- Try different browser (Chrome/Firefox/Edge recommended)
- Check browser console for getUserMedia errors

**💾 Photos Not Saving**:
- Verify `photos/` folder permissions: `chmod 777 photos/`
- Ensure Apache/PHP is running in XAMPP
- Check PHP error logs for server-side issues
- Verify browser console for fetch/network errors
- Confirm `save.php` is accessible directly

**🖼️ Animation Issues**:
- **3D animations not showing**: Check if Three.js loaded successfully in console
- **Glassmorphism not working**: Ensure backdrop-filter support in browser
- **Slow performance**: Check if hardware acceleration is enabled
- **Animations disabled**: Verify reduced motion settings in OS/browser

**🎨 Visual Problems**:
- **Blank photos**: Wait for camera initialization, check lighting
- **Distorted countdown**: Clear browser cache, check CSS loading
- **Theme not switching**: Verify localStorage access, check console errors
- **Responsive issues**: Test different viewport sizes, check CSS Grid support

**⚡ Performance Issues**:
- **Slow transitions**: Reduce animation complexity in preferences
- **Memory leaks**: Refresh page periodically during long sessions
- **High CPU usage**: Switch to simpler background animation or disable
- **Mobile lag**: Use reduced motion mode or disable 3D backgrounds

### Permission Commands

**Linux/Mac**:
```bash
sudo chmod 777 /path/to/xampp/htdocs/potobooth/photos/
```

**Windows**: Right-click photos folder → Properties → Security → Full Control

### Debugging

Enable PHP error reporting by adding to `save.php`:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

Check browser console for JavaScript errors.

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Browser | Core Features | 3D Animations | Glassmorphism | Performance |
|---------|---------------|---------------|---------------|-------------|
| Chrome 90+ | ✅ Full | ✅ Full | ✅ Full | ⭐ Excellent |
| Firefox 88+ | ✅ Full | ✅ Full | ✅ Full | ⭐ Excellent |
| Safari 14+ | ✅ Full | ✅ Full | ✅ Full | ⭐ Good |
| Edge 90+ | ✅ Full | ✅ Full | ✅ Full | ⭐ Excellent |
| Mobile Safari | ✅ Full | ⚠️ Limited | ✅ Full | ⭐ Good |
| Chrome Mobile | ✅ Full | ⚠️ Limited | ✅ Full | ⭐ Good |
| Older Browsers | ⚠️ Basic | ❌ Fallback | ❌ Fallback | ⭐ Basic |

**Legend:**
- ✅ Full support with all features
- ⚠️ Limited support or reduced functionality
- ❌ Not supported, graceful fallback provided

## 🎯 Performance Optimization

### For High-End Devices
```javascript
// Enable all features for smooth experience
document.body.dataset.performance = 'high';
```

### For Mobile/Low-End Devices
```javascript
// Disable intensive features
document.querySelector('.bg-controls').style.display = 'none';
document.body.classList.add('reduced-animations');
```

### Memory Management
- Automatic cleanup of Three.js resources
- Event listener removal on page unload
- Canvas memory optimization
- Reduced particle counts on mobile

## 🚀 Future Enhancements

### Planned Features
- **Social Sharing**: Direct integration with social media platforms
- **Video Recording**: Short video clips with the same styling system
- **Advanced Filters**: Real-time camera filters and effects
- **QR Code Sharing**: Generate QR codes for instant photo sharing
- **Multi-language**: International language support
- **Cloud Storage**: Integration with cloud storage services

### Customization Ideas
- **Event Branding**: Corporate logos and custom themes
- **Green Screen**: Background replacement capabilities
- **Face Detection**: Auto-cropping and face-centered layouts
- **AR Effects**: Augmented reality overlays and effects
- **Print Templates**: Professional print layout options

## 📄 License

MIT License - Open source and free to use, modify, and distribute.

## 🎉 Conclusion

Photo Booth Pro combines modern web technologies with stunning visual design to create a professional-grade photo booth experience. With its glassmorphism UI, 3D animations, and smooth transitions, it delivers a premium user experience that works seamlessly across all devices.

**Key Highlights:**
- 🎨 **Modern Design**: Glassmorphism and gradient aesthetics
- 🚀 **Smooth Performance**: GPU-accelerated animations
- 📱 **Universal Compatibility**: Works on desktop, tablet, and mobile
- 🔧 **Highly Customizable**: Easy to modify and extend
- 🛡️ **Secure & Reliable**: Production-ready with proper security measures

Ready to create amazing memories? **Deploy now and start capturing! 📸✨**

---

*Built with ❤️ using modern web technologies. For support, feature requests, or customization services, check the troubleshooting section above.*