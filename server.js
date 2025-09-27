/**
 * Photo Booth Pro - Local Development Server
 * Simple Node.js server for localhost:3000 deployment
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;
const HOST = 'localhost';

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.php': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Simple photo storage for development
const photos = [];
let photoCounter = 1;

function handlePhotoSave(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            // Parse form data (simple implementation)
            const formData = new URLSearchParams(body);
            const imageData = formData.get('image');

            if (!imageData || !imageData.startsWith('data:image/')) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid image data' }));
                return;
            }

            // Extract base64 data
            const matches = imageData.match(/^data:image\/(jpeg|png);base64,(.+)$/);
            if (!matches) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid image format' }));
                return;
            }

            const imageType = matches[1];
            const base64Data = matches[2];
            const extension = imageType === 'jpeg' ? 'jpg' : 'png';

            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `photobooth_${timestamp}_${photoCounter++}.${extension}`;
            const filepath = path.join(__dirname, 'photos', filename);

            // Ensure photos directory exists
            const photosDir = path.join(__dirname, 'photos');
            if (!fs.existsSync(photosDir)) {
                fs.mkdirSync(photosDir, { recursive: true });
            }

            // Save file
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(filepath, buffer);

            // Store in memory for development
            photos.push({
                filename,
                filepath: `photos/${filename}`,
                timestamp: new Date(),
                size: buffer.length
            });

            // Return success response
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                success: true,
                url: `photos/${filename}`,
                filename: filename,
                size: buffer.length,
                timestamp: Math.floor(Date.now() / 1000)
            }));

            console.log(`📸 Photo saved: ${filename} (${(buffer.length / 1024).toFixed(1)}KB)`);

        } catch (error) {
            console.error('Error saving photo:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Server error' }));
        }
    });
}

function serveStaticFile(filePath, res) {
    try {
        if (!fs.existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Handle PHP files (serve as HTML for development)
        if (ext === '.php') {
            const content = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
        }

        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stat.size,
            'Cache-Control': 'no-cache'
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

    } catch (error) {
        console.error('Error serving file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Add CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    console.log(`${req.method} ${pathname}`);

    // Handle photo save endpoint
    if (pathname === '/save.php' && req.method === 'POST') {
        handlePhotoSave(req, res);
        return;
    }

    // Handle root path
    if (pathname === '/') {
        const indexPath = path.join(__dirname, 'index.php');
        serveStaticFile(indexPath, res);
        return;
    }

    // Handle favicon request
    if (pathname === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        // Simple 16x16 camera icon as base64
        const favicon = Buffer.from('AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APr6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8PDw//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/6urq/+rq6v/q6ur/6urq/+rq6v/q6ur/6urq/+rq6v/q6ur/6urq/+rq6v/q6ur/6urq/+rq6v/q6ur/6urq/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/5ubm/+bm5v/m5ub/5ubm/+bm5v/m5ub/5ubm/+bm5v/m5ub/5ubm/+bm5v/m5ub/5ubm/+bm5v/m5ub/5ubm/+Tk5P/k5OT/5OTk/+Tk5P/k5OT/5OTk/+Tk5P/k5OT/5OTk/+Tk5P/k5OT/5OTk/+Tk5P/k5OT/5OTk/+Tk5P/i4uL/4uLi/+Li4v/i4uL/4uLi/+Li4v/i4uL/4uLi/+Li4v/i4uL/4uLi/+Li4v/i4uL/4uLi/+Li4v/i4uL/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/4ODg/93d3f/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==', 'base64');
        res.end(favicon);
        return;
    }

    // Handle static files
    const filePath = path.join(__dirname, pathname.substring(1));
    serveStaticFile(filePath, res);
});

server.listen(PORT, HOST, () => {
    console.log('🎉 Photo Booth Pro - Local Development Server');
    console.log('=============================================');
    console.log(`🌐 Server running at: http://${HOST}:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`📸 Photos will be saved to: ${path.join(__dirname, 'photos')}`);
    console.log('');
    console.log('🚀 Features Available:');
    console.log('• 3D Background Animations');
    console.log('• Dark/Light Theme Toggle');
    console.log('• Professional Photo Processing');
    console.log('• Real-time Photo Saving');
    console.log('');
    console.log('📱 Access from any device on your network!');
    console.log('💡 Press Ctrl+C to stop the server');
    console.log('');
    console.log(`🎯 Ready to capture memories at: http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down Photo Booth Pro server...');
    console.log(`📊 Total photos captured: ${photos.length}`);
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

// Error handling
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.log('💡 Try a different port or stop the existing server.');
    } else {
        console.error('❌ Server error:', error);
    }
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
});