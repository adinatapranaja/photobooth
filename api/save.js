const fs = require('fs');
const path = require('path');

// Helper to parse multipart/form-data-ish fallback for Vercel (we expect a simple FormData with 'image')
module.exports = async (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Only POST allowed' });
    return;
  }

  try {
    // Vercel Node server exposes raw body as a stream; ensure body is collected
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString();

    // Try to extract image field from multipart/form-data or urlencoded form
    let imageData = null;

    // If content-type contains 'multipart/form-data', try a simple boundary parse
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
      // crude parse: find the base64 payload after the name="image" part
      const match = body.match(/name="image"[\s\S]*?\r\n\r\n([\s\S]*)\r\n--/);
      if (match) imageData = match[1].trim();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(body);
      imageData = params.get('image');
    } else {
      // As a fallback, try to find data:image in the whole body
      const match = body.match(/(data:image\/(?:jpeg|png);base64,[A-Za-z0-9+/=]+)/);
      if (match) imageData = match[1];
    }

    if (!imageData) {
      res.status(400).json({ success: false, error: 'No image data found in request' });
      return;
    }

    const m = imageData.match(/^data:image\/(jpeg|png);base64,(.+)$/);
    if (!m) {
      res.status(400).json({ success: false, error: 'Invalid data URL format' });
      return;
    }

    const imageType = m[1];
    const base64 = m[2];
    const extension = imageType === 'jpeg' ? 'jpg' : 'png';

    const buffer = Buffer.from(base64, 'base64');

    // Save to ephemeral /tmp/photos (Vercel has ephemeral filesystem; warn user)
    const photosDir = path.join('/tmp', 'photos');
    if (!fs.existsSync(photosDir)) fs.mkdirSync(photosDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `photobooth_${timestamp}.${extension}`;
    const filepath = path.join(photosDir, filename);

    fs.writeFileSync(filepath, buffer);

    // Return relative path (note: on Vercel this is ephemeral and will not persist across deployments)
    res.status(200).json({ success: true, url: `tmp/photos/${filename}`, filename, size: buffer.length, timestamp: Math.floor(Date.now()/1000) });

  } catch (err) {
    console.error('save.js error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
