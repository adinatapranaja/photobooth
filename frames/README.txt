Frame Assets for Photo Booth
==============================

This folder should contain PNG frame images with transparency.

Recommended frame files:
- frame1.png (Classic brown border)
- frame2.png (Pink hearts border)
- frame3.png (Gold stars border)
- frame4.png (Green flowers border)
- frame5.png (Orange party border)
- frame6.png (Purple vintage border)

Frame Requirements:
- Format: PNG with transparency
- Size: 400x400 pixels (will be scaled automatically)
- Border design with transparent center
- Keep decorative elements away from center 80x80 pixel area

Sample Base64 Frame (minimal example):
You can replace the CSS-based frames in capture.js with actual PNG files by:

1. Place PNG files in this folder
2. Update the setupFrameImages() function in capture.js to load these files
3. Modify applyFrame() function to draw the loaded PNG images

Example code to load PNG frames:
```javascript
// In setupFrameImages() function:
this.frameImages = {};
const frameNames = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5', 'frame6'];

frameNames.forEach(name => {
    const img = new Image();
    img.onload = () => {
        this.frameImages[name] = img;
    };
    img.src = `frames/${name}.png`;
});

// In applyFrame() function:
if (this.frameImages[this.selectedFrame]) {
    this.finalCtx.drawImage(this.frameImages[this.selectedFrame], x, y, w, h);
}
```

Currently, the system uses CSS-based frames for demo purposes.
Replace with actual PNG files for production use.