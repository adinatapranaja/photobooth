# Installing Three.js for Photo Booth Pro

## Option 1: Download Locally (Recommended for Production)

1. **Download Three.js**:
   - Visit: https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js
   - Save the file as `three.min.js` in this directory (`assets/libs/`)

2. **Update index.php**:
   - Replace the three-loader.js script with direct three.min.js reference
   - Change: `<script src="assets/libs/three-loader.js"></script>`
   - To: `<script src="assets/libs/three.min.js"></script>`

## Option 2: Use CDN Loader (Current Setup)

The project is currently configured to use the CDN loader (`three-loader.js`) which:
- Automatically loads Three.js from jsdelivr CDN
- Falls back to CSS animations if loading fails
- Provides console logging for debugging

## Option 3: Manual Download Command

If you have wget or curl available:

```bash
# Using wget
wget https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js -O three.min.js

# Using curl
curl https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js -o three.min.js
```

## Verification

After installation, verify Three.js is working by:
1. Opening browser developer console
2. Checking for "Three.js loaded successfully" message
3. Confirming 3D background animations are visible
4. Testing animation controls in top-left corner

## File Size Note

Three.js minified is approximately 600KB. For offline-only deployment or bandwidth concerns, consider:
- Using only essential Three.js modules
- Implementing purely CSS-based animations
- The current fallback system handles both scenarios automatically